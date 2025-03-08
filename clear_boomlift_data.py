# Script to delete all BoomLift records
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append('backend')

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Import the BoomLift model
from contractor.models import BoomLift

# Delete all BoomLift records
count = BoomLift.objects.all().count()
BoomLift.objects.all().delete()

print(f"Deleted {count} BoomLift records.")
print("All BoomLift data has been cleared.")
