from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from common.utils import get_first_serializer_error, upload_file
from .serializers import ProductCreateSerializer, TopSizeCreateSerializer, BottomSizeCreateSerializer, SkirtSizeCreateSerializer
from .services import ProductService, SizeService


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
        
        #* 상세 사이즈 카테고리에 구분 / 유효성 검사
        product_category = product_instance.product_category
        if product_category == 'top':
            size_serializer = TopSizeCreateSerializer(data=request_data)
        elif product_category == 'bottom':
            size_serializer = BottomSizeCreateSerializer(data=request_data)
        elif product_category == 'skirt':
            size_serializer = SkirtSizeCreateSerializer(data=request_data)
        elif product_category == 'etc':
            pass
        else:
            return Response(
                {   "data": None, 
                    "state": 400, 
                    "message": "올바르지 않은 카테고리입니다", 
                    "error": None}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        #* 상세 사이즈 정보 insert
        if size_serializer.is_valid():
            size_instance = SizeService.create_size(product_instance, size_serializer.validated_data)
        else:
            return Response(
                {   "data": None, 
                    "state": 400, 
                    "message": "올바르지 않은 사이즈 정보입니다", 
                    "error": get_first_serializer_error(size_serializer.errors)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # TODO: hashtag insert
        # service
        # hashtags insert
        
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