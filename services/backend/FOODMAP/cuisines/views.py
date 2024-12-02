from rest_framework import viewsets
from .serializers import CuisineSerializer
from .models import Cuisine
from rest_framework.response import Response
from rest_framework import status

class CuisineView(viewsets.ModelViewSet):
    serializer_class = CuisineSerializer
    queryset = Cuisine.objects.all()

    def get(self, request, *args, **kwargs):
        data = {
                    "success": True,
                    "cuisines": self.queryset
                }
        return Response(data, status=status.HTTP_200_OK)
