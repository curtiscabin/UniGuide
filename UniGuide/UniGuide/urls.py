from django.contrib import admin
from django.urls import path

from main.views import index, building_detail

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', index),
    path("building/<int:number>/", building_detail, name="building"),
]
