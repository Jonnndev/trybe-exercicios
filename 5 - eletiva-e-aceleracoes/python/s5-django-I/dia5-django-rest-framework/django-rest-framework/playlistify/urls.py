from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import SingerViewSet, MusicViewSet, PlaylistViewSet

router = routers.DefaultRouter()
router.register(r"singers", SingerViewSet)
router.register(r"musics", MusicViewSet)
router.register(r"playlists", PlaylistViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("", include(router.urls)),
]
