# playlists/urls.py

from django.urls import path
from playlists.views import music, index


urlpatterns = [
    path("", index, name="home-page"),
    path("musics/", music, name="musics-page"),
]
