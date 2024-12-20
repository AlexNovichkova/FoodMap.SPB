from rest_framework import viewsets
from .serializers import CuisineSerializer
from .models import Cuisine
from rest_framework.response import Response
from rest_framework import status

class CuisineView(viewsets.ModelViewSet):
    serializer_class = CuisineSerializer
    queryset = Cuisine.objects.all()

    def list(self, request, *args, **kwargs):
        cuisines = self.get_queryset()
        serializer = self.get_serializer(cuisines, many=True)
        data = {
            "success": True,
            "cuisines": serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
