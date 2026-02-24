from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker import models as octo_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create Users
        users = [
            User(email='tony@stark.com', username='IronMan', team=marvel),
            User(email='steve@rogers.com', username='CaptainAmerica', team=marvel),
            User(email='bruce@wayne.com', username='Batman', team=dc),
            User(email='clark@kent.com', username='Superman', team=dc),
        ]
        for user in users:
            user.set_password('password')
            user.save()

        # Create Activities
        Activity.objects.create(user=users[0], type='Run', duration=30, calories=300)
        Activity.objects.create(user=users[1], type='Swim', duration=45, calories=400)
        Activity.objects.create(user=users[2], type='Bike', duration=60, calories=500)
        Activity.objects.create(user=users[3], type='Yoga', duration=50, calories=200)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio for all')
        Workout.objects.create(name='Strength Training', description='Strength for all')

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=700)
        Leaderboard.objects.create(team=dc, points=700)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
