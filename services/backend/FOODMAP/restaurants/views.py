from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RestaurantSerializer
from .models import Restaurant
from rest_framework.response import Response
from rest_framework import status


class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

    def list(self, request, *args, **kwargs):
        restaurants = self.get_queryset()
        serializer = self.get_serializer(restaurants, many=True)
        data = {
            "success": True,
            "restaurants": serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)

