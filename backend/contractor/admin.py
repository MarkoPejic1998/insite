from django.contrib import admin
from .models import Company, BoomLift, Builder, Site

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'subcontractor_count', 'boom_lift_count', 'builder_count', 'site_count')
    filter_horizontal = ('users',)  # Makes it easier to assign multiple users

@admin.register(BoomLift)
class BoomLiftAdmin(admin.ModelAdmin):
    list_display = ('boom_lift_id', 'company', 'subcontractor', 'date', 'hours')
    list_filter = ('company', 'phase')

@admin.register(Builder)
class BuilderAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'status')
    list_filter = ('company', 'status')

@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'location', 'status')
    list_filter = ('company', 'status')