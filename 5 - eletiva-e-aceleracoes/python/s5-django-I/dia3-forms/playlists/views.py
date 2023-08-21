# playlists/views.py

from django.shortcuts import render, redirect
from playlists.forms import CreateMusicModelForm
from playlists.models import Music


def index(request):
    context = {"musics": Music.objects.all()}
    return render(request, "home.html", context)


def music(request):
    # form = CreateMusicForm()
    form = CreateMusicModelForm()

    if request.method == "POST":
        # form = CreateMusicForm(request.POST)
        form = CreateMusicModelForm(request.POST)

        if form.is_valid():
            Music.objects.create(**form.cleaned_data)
            return redirect("home-page")

    context = {"form": form}

    return render(request, "index.html", context)
