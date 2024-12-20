import json

from django.core.management.base import BaseCommand

from cuisines.models import Cuisine

with open('data/cuisines_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)


def run():
    for item in data:
        cuisine = Cuisine(
            name=item['name'],
            photo_link=item['photo_link']
        )
        cuisine.save()
