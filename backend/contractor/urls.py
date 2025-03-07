from django.urls import path
from .views import CompanyProfileView, BoomLiftListView, BuilderListView, SiteListView

urlpatterns = [
    path('profile/', CompanyProfileView.as_view(), name='company_profile'),
    path('boom-lifts/', BoomLiftListView.as_view(), name='boom_lift_list'),
    path('builders/', BuilderListView.as_view(), name='builder_list'),
    path('sites/', SiteListView.as_view(), name='site_list'),
]