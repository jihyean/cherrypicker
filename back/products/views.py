from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


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