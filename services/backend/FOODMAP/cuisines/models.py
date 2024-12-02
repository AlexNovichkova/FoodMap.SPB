from django.db import models


class Cuisine(models.Model):
    name = models.CharField(max_length=100)
    photo_link = models.CharField(max_length=255)

    def __str__(self):
        return self.name
