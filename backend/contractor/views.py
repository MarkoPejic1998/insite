from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from .models import Company, BoomLift, Builder, Site
from .serializers import CompanySerializer, BoomLiftSerializer, BuilderSerializer, SiteSerializer
import pandas as pd

# Existing views remain unchanged
class CompanyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

class BoomLiftListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        boom_lifts = BoomLift.objects.filter(company=company)
        serializer = BoomLiftSerializer(boom_lifts, many=True)
        return Response(serializer.data)

class BuilderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        builders = Builder.objects.filter(company=company)
        serializer = BuilderSerializer(builders, many=True)
        return Response(serializer.data)

class SiteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        sites = Site.objects.filter(company=company)
        serializer = SiteSerializer(sites, many=True)
        return Response(serializer.data)

# New upload view
class UploadBoomLiftsView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        company = request.user.companies.first()
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Instead of deleting all records, we'll update existing ones or create new ones
            # This preserves historical inspection data
            
            df = pd.read_excel(file)
            df = df.replace({pd.NA: None})
            
            # Group by boom_lift_id and date to handle duplicates
            # For each group, we'll only keep the first entry
            processed_entries = set()
            
            # First, add a column to indicate if annual inspection is True
            df['has_annual_inspection'] = df['Annual Inspection'].apply(lambda x: bool(x) if pd.notnull(x) else False)
            
            # Sort dataframe by date (descending) and annual_inspection (True first) to ensure we process 
            # newest entries first and prioritize entries with annual_inspection=True
            df = df.sort_values(by=['Completion time', 'has_annual_inspection'], ascending=[False, False])
            
            # Debug: Print the sorted dataframe
            print("Sorted dataframe:")
            for index, row in df.iterrows():
                print(f"{row['Boom Lift ID']} on {pd.to_datetime(row['Completion time']).date()}: Annual Inspection = {row.get('Annual Inspection')}, has_annual_inspection = {row['has_annual_inspection']}")
            
            # Keep track of which boom lifts we've processed in this upload
            processed_boom_lifts = set()

            for index, row in df.iterrows():
                boom_lift_id = row['Boom Lift ID']
                subcontractor = row['Sub Contractor']
                completion_time = pd.to_datetime(row['Completion time'])
                
                # Convert to timezone-aware datetime to avoid warnings
                from django.utils import timezone
                if timezone.is_naive(completion_time):
                    completion_time = timezone.make_aware(completion_time)
                
                # Check if we've already processed this boom_lift_id and date combination
                entry_key = (boom_lift_id, completion_time.date())
                if entry_key in processed_entries:
                    print(f"Skipping duplicate entry for {boom_lift_id} on {completion_time.date()}")
                    continue
                
                processed_entries.add(entry_key)
                
                # Count total records and processed records
                if index == 0:
                    print(f"Total records in file: {len(df)}")
                    
                print(f"Processing record {index+1}/{len(df)}: {boom_lift_id} on {completion_time.date()}")
                
                hours = float(row['Hours']) if pd.notnull(row['Hours']) else 0.0
                builder_name = row['Builder']
                site_name = row['Site']
                oil_level = row.get('Oil Level')
                gas_level = row.get('Gas Level')
                general_issues = row.get('General Issues')
                # Ensure oil_change is False when blank or null
                oil_change_value = row.get('Oil Change')
                oil_change = bool(oil_change_value) if pd.notnull(oil_change_value) else False
                oil_change_cost = float(row.get('Oil Change Cost', 0.00)) if pd.notnull(row.get('Oil Change Cost')) else 0.00
                
                # Ensure annual_inspection is False when blank or null
                annual_inspection_value = row.get('Annual Inspection')
                annual_inspection = bool(annual_inspection_value) if pd.notnull(annual_inspection_value) else False
                annual_inspection_cost = float(row.get('Annual Inspection Cost', 0.00)) if pd.notnull(row.get('Annual Inspection Cost')) else 0.00
                
                # Print debug info for annual inspection
                print(f"Annual Inspection for {boom_lift_id} on {completion_time.date()}: {annual_inspection_value} -> {annual_inspection}")

                latitude, longitude = None, None
                location = row.get('Location')
                if location:
                    try:
                        # In the Excel file, format is "latitude,longitude"
                        latitude_str, longitude_str = map(str.strip, str(location).split(','))
                        latitude = float(latitude_str)
                        longitude = float(longitude_str)
                        print(f"Parsed {boom_lift_id}: lat={latitude}, lng={longitude}")
                    except (ValueError, AttributeError) as e:
                        print(f"Error parsing location for {boom_lift_id}: {e}")

                # Check if a record with this boom_lift_id and date already exists
                try:
                    existing_record = BoomLift.objects.get(
                        company=company,
                        boom_lift_id=boom_lift_id,
                        date=completion_time
                    )
                    
                    # Update the existing record
                    existing_record.subcontractor = subcontractor
                    existing_record.hours = hours
                    existing_record.latitude = latitude
                    existing_record.longitude = longitude
                    existing_record.builder = builder_name
                    existing_record.site = site_name
                    existing_record.phase = 'Active'
                    existing_record.oil_change = oil_change
                    existing_record.oil_change_cost = oil_change_cost
                    existing_record.annual_inspection = annual_inspection
                    existing_record.annual_inspection_cost = annual_inspection_cost
                    existing_record.oil_level = oil_level
                    existing_record.gas_level = gas_level
                    existing_record.other_maintenance = general_issues
                    existing_record.save()
                    
                    print(f"Updated existing record for {boom_lift_id} on {completion_time.date()}")
                    
                except BoomLift.DoesNotExist:
                    # Create a new record
                    BoomLift.objects.create(
                        company=company,
                        boom_lift_id=boom_lift_id,
                        date=completion_time,
                        subcontractor=subcontractor,
                        hours=hours,
                        latitude=latitude,
                        longitude=longitude,
                        builder=builder_name,
                        site=site_name,
                        phase='Active',
                        oil_change=oil_change,
                        oil_change_cost=oil_change_cost,
                        annual_inspection=annual_inspection,
                        annual_inspection_cost=annual_inspection_cost,
                        oil_level=oil_level,
                        gas_level=gas_level,
                        other_maintenance=general_issues,
                    )
                    print(f"Created new record for {boom_lift_id} on {completion_time.date()}")
            return Response({'message': 'Upload successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Upload error: {e}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
