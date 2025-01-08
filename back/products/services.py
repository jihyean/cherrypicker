from .models import Product, TopSize, BottomSize, SkirtSize

class ProductService:
    @staticmethod
    # 제품 등록
    def create_product(validated_data):
        return Product.objects.create(**validated_data)


class SizeService:
    @staticmethod
    def create_size(product_instance, validated_data):
        # 상의/아우터
        if product_instance.product_category == 'top':
            return TopSize.objects.create(product_id=product_instance, **validated_data)
        # 바지
        elif product_instance.product_category == 'bottom':
            return BottomSize.objects.create(product_id=product_instance, **validated_data)
        # 원피스/치마
        elif product_instance.product_category == 'skirt':
            return SkirtSize.objects.create(product_id=product_instance, **validated_data)
        # 기타 -> 에러 처리
        else:
            raise ValidationError('product_category는 top, bottom, skirt 중 하나여야 합니다.')