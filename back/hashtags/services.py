from .models import Hashtag, ProductHashtag, OutfitHashtag

class HashTagService:
    @staticmethod
    # 해시태그 생성
    def create_hashtag(validated_data):
        return Hashtag.objects.create(**validated_data)
    
    def get_hashtag(hashtag_name):
        hashtag_instance = Hashtag.objects.filter(hashtag_name=hashtag_name).first()
        
        if hashtag_instance is None:
            return None
        return hashtag_instance


class HashTagProductService:
    @staticmethod
    # 상품에 해시태그 등록
    def create_product_hashtag(product_instance, hashtag_instance):
        return ProductHashtag.objects.create(product_id=product_instance, hashtag_id=hashtag_instance)