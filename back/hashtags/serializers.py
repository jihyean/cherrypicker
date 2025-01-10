from rest_framework import serializers

from .models import *
from hashtags.models import Hashtag, ProductHashtag

from django.core.exceptions import ValidationError


# hashtag 객체 생성
class HashtagCreateSerializer(serializers.ModelSerializer):
    hashtag_name = serializers.CharField(
        error_messages={
            'blank': '해시태그 이름은 비어있을 수 없습니다', 
            'required': '해시태그 이름은 필수 필드입니다.', 
            'invalid': '잘못된 형식의 해시태그 이름입니다.', 
            'max_length': '해시태그 이름은 최대 30자 이하여야 합니다.'
        }
    )
    
    class Meta:
        model = Hashtag
        fields = ['hashtag_name']