from rest_framework import serializers
from .models import Cuisine


class CuisineSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cuisine
        fields = '__all__'