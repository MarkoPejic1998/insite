from django.urls import path
from .views import ContactFormView, api_root

urlpatterns = [
    path('', api_root, name='api-root'),  # Root URL
    path('api/contact/', ContactFormView.as_view(), name='contact-form'),
]