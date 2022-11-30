from django.urls import path
from . import views

urlpatterns =[
    path('',views.index, name="index"),
    path('about/<str:type>',views.about, name="about"),
    path('contact/<str:type>',views.about, name="contact"),
    path('apikoh/<str:k>',views.apikoh, name="apikoh"),
    path('person',views.personkoh, name="personkoh"),
    path('login',views.loginkoh, name="loginkoh"),
    path('kohedit',views.kohedit, name="kohedit"),
    path('updatekoh', views.updatekoh, name="updatekoh")
]

