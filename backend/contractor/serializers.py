from rest_framework import serializers
from .models import Company, BoomLift, Builder, Site

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class BuilderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builder
        fields = '__all__'

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'

class BoomLiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoomLift
        fields = '__all__'