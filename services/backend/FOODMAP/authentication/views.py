from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from recommendations.models import RestaurantRecommender
from . import serializers

User = get_user_model()


class UserRegistrationAPIView(GenericAPIView):

    permission_classes = (AllowAny,)
    serializer_class = serializers.UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = {
            "success": True,  
            "accessToken": str(token.access_token),
            "refreshToken": str(token),
            "user": serializer.data,  
        }
        return Response(data, status=status.HTTP_201_CREATED)
        


class UserLoginAPIView(GenericAPIView):

    permission_classes = (AllowAny,)
    serializer_class = serializers.UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = serializers.UserSerializer(user)
        token = RefreshToken.for_user(user)
        
        data = {
            "success": True,  
            "accessToken": str(token.access_token),
            "refreshToken": str(token),
            "user": serializer.data,  
        }
        return Response(data, status=status.HTTP_200_OK)


class UserLogoutAPIView(GenericAPIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"success": True, "message": "Successful logout"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class UserAPIView(RetrieveUpdateAPIView):

    permission_classes = (AllowAny,)
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        if user.liked is None:
            user.recommended = None
        data = {
            "success": True,
            "user": serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)
    
    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        price_map = {
            "средние": 1,
            "выше среднего": 2,
            "высокие": 3
        }
        recommender = RestaurantRecommender('data/data_fixed.json', price_map)

        if serializer.is_valid():
            serializer.save()
            if user.liked and len(user.liked) > 0:
                recommendations = recommender.get_recommendations(user.liked)
                user.recommended = recommendations
            else:
                user.recommended = None
            user.save()

            data = {
                "success": True,
                "user": serializer.data
            }
            return Response(data, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
