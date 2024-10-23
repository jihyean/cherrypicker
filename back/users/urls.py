"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  # include를 임포트
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView, TokenVerifyView
from .serializers import *


urlpatterns = [
    path('auth/', UserAPIView.as_view()),
    path('auth/token-refresh/', TokenRefreshView.as_view(), name='login_token_refresh'), # refresh_token 을 받아 새로운 access_token 발행
    path('auth/token-verify/', TokenVerifyView.as_view(), name='login_token_verify'), # access_token이 유효한지 확인
    path('account/', AccountAPIView.as_view(), name='account'), # 회원가입
    path('edit/', UserEditAPIView.as_view(), name='edit'), # 사용자 정보 수정
    path('account/id-check/', AccountIDCheckAPIView.as_view(), name='account_id_check'), # 아이디 중복 확인 
]
