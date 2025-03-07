from rest_framework import serializers
from .models import Company, BoomLift, Builder, Site

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'subcontractor_count', 'boom_lift_count', 'builder_count', 'site_count']

class BoomLiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoomLift
        fields = ['boom_lift_id', 'subcontractor', 'date', 'hours', 'latitude', 'longitude', 'builder', 'site', 'phase']

class BuilderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builder
        fields = ['name', 'contact_info', 'status']

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['name', 'location', 'builder', 'status']