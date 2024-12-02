import json

from django.core.management.base import BaseCommand

from restaurants.models import Restaurant

with open('data/data_fixed.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

def run():
    for item in data:
        restaurant = Restaurant(
            name=item['name'],
            description=item['description'],
            rating=item['rating'],
            address=item['address'],
            prices=item['prices'],
            cuisine_type=item['cuisine_type'],
            photo_links=item['photo_links']
        )
        restaurant.save()
