from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

import json

from common.utils import get_first_serializer_error, upload_file

from .serializers import ProductCreateSerializer, TopSizeCreateSerializer, BottomSizeCreateSerializer, SkirtSizeCreateSerializer
from hashtags.serializers import HashtagCreateSerializer

from .services import ProductService, SizeService
from hashtags.services import HashTagService, HashTagProductService



class ProductArchiveAPIView(APIView):
    # 옷 조회
    def get(self, request):
        return Response(
            {   "data": None, 
                "state": 200, 
                "message": "옷 조회 성공", 
                "error": None}, 
            status=status.HTTP_200_OK
        )
    
    # 옷 등록
    def put(self, request):
        request_data = request.data.copy()
        uploaded_file = request.FILES.get('product_image')
        hashtag_name_list = json.loads(request_data.get('hashtag_name_list'))
        
        # 이미지 업로드 경로 추가
        file_save_path = upload_file(uploaded_file, 'product_images')
        request_data['product_image'] = file_save_path
        
        # 사용자 ID 추가
        request_data['user_id'] = request.user.user_id
        
        #* 제품 insert
        product_serializer = ProductCreateSerializer(data=request_data)
        if product_serializer.is_valid():
            product_instance = ProductService.create_product(product_serializer.validated_data)
        else:
            return Response(
                {   "data": None, 
                    "state": 400, 
                    "message": "올바르지 않은 제품 정보입니다", 
                    "error": get_first_serializer_error(product_serializer.errors)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        size_flag = True
        #* 상세 사이즈 카테고리에 구분 / 유효성 검사
        product_category = product_instance.product_category
        if product_category == 'top':
            size_serializer = TopSizeCreateSerializer(data=request_data)
        elif product_category == 'bottom':
            size_serializer = BottomSizeCreateSerializer(data=request_data)
        elif product_category == 'skirt':
            size_serializer = SkirtSizeCreateSerializer(data=request_data)
        elif product_category == 'bag' or product_category == 'shoes' or product_category == 'etc':
            size_flag = False
        else:
            return Response(
                {   "data": None, 
                    "state": 400, 
                    "message": "올바르지 않은 카테고리입니다", 
                    "error": None}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        #* 상세 사이즈 정보 insert
        if not size_flag: # 상세 사이즈 정보가 없는 경우
            pass
        elif size_serializer.is_valid():
            size_instance = SizeService.create_size(product_instance, size_serializer.validated_data)
        else:
            return Response(
                {   "data": None, 
                    "state": 400, 
                    "message": "올바르지 않은 사이즈 정보입니다", 
                    "error": get_first_serializer_error(size_serializer.errors)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 해시태그 등록
        for hashtag_name in hashtag_name_list:
            hashtag_instance = HashTagService.get_hashtag(hashtag_name)
            if hashtag_instance is None:
                hashtag_serializer = HashtagCreateSerializer(data={'hashtag_name': hashtag_name})
                if hashtag_serializer.is_valid():
                    hashtag_instance = HashTagService.create_hashtag(hashtag_serializer.validated_data)
                else:
                    return Response(
                        {   "data": None, 
                            "state": 400, 
                            "message": "올바르지 않은 해시태그 정보입니다", 
                            "error": get_first_serializer_error(hashtag_serializer.errors)}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # 상품에 해시태그 등록
            HashTagProductService.create_product_hashtag(product_instance, hashtag_instance)
        
        return Response(
            {   "data": None, 
                "state": 201, 
                "message": "옷 등록 성공", 
                "error": None}, 
            status=status.HTTP_201_CREATED
        )
    
    # 옷 수정
    def patch(self, request):
        return Response(
            {   "data": None, 
                "state": 200, 
                "message": "옷 수정 성공", 
                "error": None}, 
            status=status.HTTP_200_OK
        )
    
    # 옷 onboard 수정
    def post(self, request):
        return Response(
            {   "data": None, 
                "state": 200, 
                "message": "옷 onboard 수정 성공", 
                "error": None}, 
            status=status.HTTP_200_OK
        )
    
    # 옷 삭제
    def delete(self, request):
        return Response(
            {   "data": None, 
                "state": 200, 
                "message": "옷 삭제 성공", 
                "error": None}, 
            status=status.HTTP_200_OK
        )