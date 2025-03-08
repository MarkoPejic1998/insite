from django.contrib import admin
from .models import Company, BoomLift, Builder, Site

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'subcontractor_count', 'boom_lift_count', 'builder_count', 'site_count')

@admin.register(BoomLift)
class BoomLiftAdmin(admin.ModelAdmin):
    list_display = ('boom_lift_id', 'date', 'subcontractor', 'hours', 'site', 'builder', 
                   'latitude', 'longitude', 'phase', 'oil_change', 'oil_change_cost', 
                   'annual_inspection', 'annual_inspection_cost', 'ndt', 'ndt_cost',
                   'radiator_change', 'radiator_change_cost', 'other_maintenance',
                   'other_maintenance_cost', 'oil_level', 'gas_level')
    list_filter = ('company', 'date', 'phase', 'annual_inspection', 'oil_change')
    search_fields = ('boom_lift_id', 'subcontractor', 'site', 'builder')
    list_per_page = 50

@admin.register(Builder)
class BuilderAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'status')
    list_filter = ('company', 'status')

@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'status')
    list_filter = ('company', 'status')
