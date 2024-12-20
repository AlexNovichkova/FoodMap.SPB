from django.urls import include, path
from django.contrib import admin
from restaurants.views import RestaurantView
from cuisines.views import CuisineView
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'restaurants', RestaurantView, 'restaurant')
router.register(r'cuisines', CuisineView, 'cuisine')

urlpatterns = [
    path("api/", include("authentication.urls", namespace="authentication")),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    ]
