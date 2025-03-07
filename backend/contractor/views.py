from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Company, BoomLift, Builder, Site
from .serializers import CompanySerializer, BoomLiftSerializer, BuilderSerializer, SiteSerializer

class CompanyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()  # Corrected from company_set
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

class BoomLiftListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()  # Corrected from company_set
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        boom_lifts = BoomLift.objects.filter(company=company)
        serializer = BoomLiftSerializer(boom_lifts, many=True)
        return Response(serializer.data)

class BuilderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()  # Corrected from company_set
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        builders = Builder.objects.filter(company=company)
        serializer = BuilderSerializer(builders, many=True)
        return Response(serializer.data)

class SiteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.companies.first()  # Corrected from company_set
        if not company:
            return Response({'error': 'No company assigned'}, status=status.HTTP_404_NOT_FOUND)
        sites = Site.objects.filter(company=company)
        serializer = SiteSerializer(sites, many=True)
        return Response(serializer.data)