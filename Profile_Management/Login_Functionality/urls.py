from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login, name='login'), 
    path('register/', register, name='register'),
    path('update/', update, name='update'),
    path('search/', search, name='search'),
    path('request_reset/', request_reset, name='request_reset'),
    path('reset_password/', reset_password, name='reset_password'),
    path('activate/<uidb64>/<token>', activate, name='activate'),
    
]
