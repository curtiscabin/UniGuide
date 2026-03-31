from django.contrib import admin
from django.urls import path

from main.views import index, building_detail, search

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', index),
    path("building/<int:number>/", building_detail, name="building"),
    path('search/', search, name='search'),
]
