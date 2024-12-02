from rest_framework import viewsets
from .serializers import CuisineSerializer
from .models import Cuisine


class CuisineView(viewsets.ModelViewSet):
    serializer_class = CuisineSerializer
    queryset = Cuisine.objects.all()
