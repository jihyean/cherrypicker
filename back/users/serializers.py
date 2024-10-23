from rest_framework import serializers
from .models import *

from django.contrib.auth.password_validation import validate_password

# user 객체
class UserSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['user_id', 'password', 'user_name', 'user_email', 'user_gender', 'user_created_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        error_messages={
            'blank': 'Password는 비어있을 수 없습니다.',
            'required': 'Password는 필수 필드입니다.',
            'min_length': 'Password는 최소 {min_length}자 이상이어야 합니다.',
            'max_length': 'Password는 최대 {max_length}자까지 허용됩니다.'
        },
        min_length=9,
        max_length=20,
        validators=[validate_password]
        )
    user_id = serializers.CharField(error_messages={'blank': 'ID는 비어있을 수 없습니다.', 'required': 'ID는 필수 필드입니다.'})
    user_name = serializers.CharField(error_messages={'blank': '이름은 비어있을 수 없습니다', 'required': '이름은 필수 필드입니다.'})
    user_email = serializers.CharField(error_messages={'blank': '이메일은 비어있을 수 없습니다.', 'required': '이메일은 필수 필드입니다.'})
    user_gender = serializers.BooleanField(error_messages={'required': '성별은 필수 필드입니다.'})
    # user_created_at = serializers.DateTimeField(error_messages={'required': '가입일은 필수 필드입니다.'})
    
    class Meta:
        model = User
        fields = ['user_id', 'password', 'user_name', 'user_email', 'user_gender']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
