from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.wallet_auth, name='wallet_auth'),
    path('wallet-info/', views.get_wallet_info, name='wallet_info'),
] 