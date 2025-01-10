from rest_framework import serializers

from .models import *
from users.models import User
from hashtags.models import Hashtag, ProductHashtag

from django.core.exceptions import ValidationError


# product 객체 생성
class ProductCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        error_messages={
            'blank': '사용자 ID는 비어있을 수 없습니다.', 
            'required': '사용자 ID는 필수 필드입니다.',
            'invalid': '사용자 ID입니다.'
        }
    )
    
    product_name = serializers.CharField( 
        error_messages={
            'blank': '제품 이름은 비어있을 수 없습니다', 
            'required': '제품 이름은 필수 필드입니다.', 
            'invalid': '잘못된 형식의 제품 이름입니다.', 
            'max_length': '제품 이름은 최대 30자 이하여야 합니다.'
        }
    )
    product_option = serializers.CharField(
        allow_null=True, allow_blank=True,
        error_messages={
            'invalid': '잘못된 형식의 제품 옵션입니다.', 
            'max_length': '제품 옵션은 최대 30자 이하여야 합니다.'
        }
    )
    product_comment = serializers.CharField(
        allow_null=True, allow_blank=True,
        error_messages={
            'invalid': '잘못된 형식의 제품 설명입니다.', 
            'max_length': '제품 설명은 최대 100자 이하여야 합니다.'
        }
    )
    product_image = serializers.CharField(
        allow_null=True, allow_blank=True,
        error_messages={
            'invalid': '잘못된 형식의 이미지 경로입니다.', 
            'max_length': '이미지 경로는 최대 1000자 이하여야 합니다.'
        }
    )
    product_state = serializers.CharField(
        error_messages={
            'blank': '제품 상태는 비어있을 수 없습니다', 
            'required': '제품 상태는 필수 필드입니다.', 
            'invalid': '잘못된 형식의 제품 상태입니다.', 
            'max_length': '제품 상태는 최대 15자 이하여야 합니다.'
        }
    )
    product_category = serializers.CharField(
        error_messages={
            'blank': '제품 카테고리는 비어있을 수 없습니다', 
            'required': '제품 카테고리는 필수 필드입니다.', 
            'invalid': '잘못된 형식의 제품 카테고리입니다.', 
            'max_length': '제품 카테고리는 최대 100자 이하여야 합니다.'
        }
    )
    product_is_onboard = serializers.BooleanField(
        error_messages={
            'required': '제품 등록 여부는 필수 필드입니다.',
            'invalid': '잘못된 형식의 제품 등록 여부입니다.'
        }
    )
    
    class Meta:
        model = Product
        fields = ['user_id', 'product_name', 'product_option', 'product_comment', 'product_image', 'product_state', 'product_category', 'product_is_onboard']


# top size 객체 생성
class TopSizeCreateSerializer(serializers.ModelSerializer):
    # product_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Product.objects.all(),
    #     error_messages={
    #         'blank': '제품 ID는 비어있을 수 없습니다.', 
    #         'required': '제품 ID는 필수 필드입니다.',
    #         'invalid': '제품 ID입니다.'
    #     }
    # )
    
    top_size_total = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 총장입니다.'
        }
    )
    top_size_shoulder = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 어깨너비입니다.'
        }
    )
    top_size_chest = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 가슴너비입니다.'
        }
    )
    top_size_sleeve = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 소매길이입니다.'
        }
    )
    
    class Meta:
        model = TopSize
        fields = ['top_size_total', 'top_size_shoulder', 'top_size_chest', 'top_size_sleeve']


# bottom size 객체 생성
class BottomSizeCreateSerializer(serializers.ModelSerializer):
    # product_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Product.objects.all(),
    #     error_messages={
    #         'blank': '제품 ID는 비어있을 수 없습니다.', 
    #         'required': '제품 ID는 필수 필드입니다.',
    #         'invalid': '제품 ID입니다.'
    #     }
    # )
    
    bottom_size_total = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 총장입니다.'
        }
    )
    bottom_size_waist = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 허리너비입니다.'
        }
    )
    bottom_size_hip = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 엉덩이너비입니다.'
        }
    )
    bottom_size_thigh = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 허벅지너비입니다.'
        }
    )
    bottom_size_rise = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 밑위 값입니다.'
        }
    )
    bottom_size_hem = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 밑단너비입니다.'
        }
    )
    
    class Meta:
        model = BottomSize
        fields = ['bottom_size_total', 'bottom_size_waist', 'bottom_size_hip', 'bottom_size_thigh', 'bottom_size_rise', 'bottom_size_hem']


# skirt size 객체 생성
class SkirtSizeCreateSerializer(serializers.ModelSerializer):
    # product_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Product.objects.all(),
    #     error_messages={
    #         'blank': '제품 ID는 비어있을 수 없습니다.', 
    #         'required': '제품 ID는 필수 필드입니다.',
    #         'invalid': '제품 ID입니다.'
    #     }
    # )
    
    skirt_size_total = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 총장입니다.'
        }
    )
    skirt_size_shoulder = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 어깨너비입니다.'
        }
    )
    skirt_size_chest = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 가슴너비입니다.'
        }
    )
    skirt_size_sleeve = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 소매길이입니다.'
        }
    )
    skirt_size_hip = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 엉덩이너비입니다.'
        }
    )
    skirt_size_waist = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 허리너비입니다.'
        }
    )
    skirt_size_hem = serializers.IntegerField(
        allow_null=True,
        error_messages={
            'invalid': '잘못된 형식의 밑단너비입니다.'
        }
    )
    
    class Meta:
        model = SkirtSize
        fields = ['skirt_size_total', 'skirt_size_shoulder', 'skirt_size_chest', 'skirt_size_sleeve', 'skirt_size_hip', 'skirt_size_waist', 'skirt_size_hem']
