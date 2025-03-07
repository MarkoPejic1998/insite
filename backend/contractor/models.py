from django.db import models
from django.contrib.auth.models import User

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    users = models.ManyToManyField(User, related_name='companies')
    subcontractor_count = models.IntegerField(default=0)
    boom_lift_count = models.IntegerField(default=0)
    builder_count = models.IntegerField(default=0)
    site_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class BoomLift(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='boom_lifts')
    boom_lift_id = models.CharField(max_length=100, unique=True)
    subcontractor = models.CharField(max_length=255)
    date = models.DateField()
    hours = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    builder = models.ForeignKey('Builder', on_delete=models.SET_NULL, null=True, related_name='boom_lifts')
    site = models.ForeignKey('Site', on_delete=models.SET_NULL, null=True, related_name='boom_lifts')
    phase = models.CharField(max_length=50, choices=[
        ('Planning', 'Planning'),
        ('Active', 'Active'),
        ('Completed', 'Completed'),
    ])
    oil_change = models.BooleanField(default=False)
    oil_change_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    annual_inspection = models.BooleanField(default=False)
    annual_inspection_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ndt = models.BooleanField(default=False)  # Non-destructive testing
    ndt_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    radiator_change = models.BooleanField(default=False)
    radiator_change_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    other_maintenance = models.TextField(blank=True, null=True)
    other_maintenance_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.boom_lift_id} - {self.company.name}"

class Builder(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='builders')
    name = models.CharField(max_length=255)
    contact_info = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=[
        ('Current', 'Current'),
        ('Past', 'Past'),
        ('Pending', 'Pending'),
    ], default='Pending')

    def __str__(self):
        return f"{self.name} ({self.company.name})"

class Site(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='sites')
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    builder = models.ForeignKey(Builder, on_delete=models.SET_NULL, null=True, related_name='sites')
    status = models.CharField(max_length=50, choices=[
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Planned', 'Planned'),
    ], default='Planned')

    def __str__(self):
        return f"{self.name} ({self.company.name})"