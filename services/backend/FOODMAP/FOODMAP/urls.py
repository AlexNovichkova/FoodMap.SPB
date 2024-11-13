from django.urls import include, path
from django.contrib import admin


from restaurants import views
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'restaurants', views.RestaurantView, 'restaurant')

urlpatterns = [
    path("api/", include("authentication.urls", namespace="authentication")),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    ]
