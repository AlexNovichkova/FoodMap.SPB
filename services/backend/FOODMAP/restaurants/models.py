from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    rating = models.FloatField(default=0.0)
    address = models.CharField(max_length=255)
    prices = models.CharField(max_length=50)
    cuisine_type = models.JSONField()
    photo_links = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name
