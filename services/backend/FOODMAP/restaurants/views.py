from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RestaurantSerializer
from .models import Restaurant
from rest_framework.response import Response
from rest_framework import status


class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

    def get(self, request, *args, **kwargs):
        data = {
                    "success": True,
                    "restaurants": self.queryset
                }
        return Response(data, status=status.HTTP_200_OK)

