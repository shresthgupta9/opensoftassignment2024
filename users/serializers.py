# from rest_framework.serializers import ModelSerializer
# from rest_framework import serializers
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth.models import User


class UserMySerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'password', 'date_joined', 'is_active',)


class UserNewSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'date_joined', 'is_active',)
