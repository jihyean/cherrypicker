from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import User

from users.serializers import UserSerializer
from users.serializers import RegisterSerializer

import re
import os

def validate_password(password):
    # 최소 9글자 이상, A-Z, a-z, 0-9, 특수문자 중 3종류 이상의 조합
    regex = (
        r'^(?=.*[A-Z])'     # 최소한 한 대문자
        r'(?=.*[a-z])'      # 최소한 한 소문자
        r'(?=.*\d)'         # 최소한 한 숫자
        r'(?=.*[^A-Za-z0-9])'  # 최소한 한 특수문자
        r'(?!.*\s)'         # 공백 없음
        r'.{9,}$'           # 최소 9글자 이상
    )
    if re.match(regex, password):
        return True
    else:
        return False


# /auth
class UserAPIView(APIView):
    # 로그인
    def post(self, request):
        # @INPUT: User(user_id, password)
        user_id = request.data['user_id']
        password = request.data['password']

        user = authenticate(request, user_id=user_id, password=password)


        is_valid_password = validate_password(password)
        if is_valid_password == False:
            res = Response(
                {
                    "data": None,
                    "state": 400,
                    "error": "비밀번호는 최소 9글자 이상, 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 조합이어야 합니다.",
                    "message": "회원가입 실패 - 비밀번호는 최소 9글자 이상, 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 조합이어야 합니다."
                },
                status=status.HTTP_400_BAD_REQUEST
                )
            return res

        # 인증 성공 -> JWT 발급 -> 쿠키에 토큰 저장
        if user is not None:
            token = TokenObtainPairSerializer.get_token(user)
            res = Response(
                {
                    "data": {
                        "user": UserSerializer(user).data,
                        "access_token": str(token.access_token),
                        "refresh_token": str(token),
                    },
                    "state": 200,
                    "error": None,
                    "message": "로그인 성공"
                },
                status=status.HTTP_200_OK
            )

            return res
        # 인증 실패 -> 에러 메시지 return
        res = Response(
            {
                "data": None,
                "state": 401,
                "error": "비밀번호가 일치하지 않습니다.",
                "message": "로그인 실패"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
        return res
    
    # 로그아웃
    def delete(self, request):
        # @INPUT: User(user_id)
        # 쿠키 삭제
        # 사용자 접속 기록 -> 해제날짜 기록
        return Response(
            {   "data": None, 
                "state": 200, 
                "message": "로그아웃 성공", 
                "error": None}, 
            status=status.HTTP_200_OK
        )
    
    # 사용자 정보 관리
    def put(self, request):
        # @INPUT: User()
        # 비밀번호 확인 -> 사용자 정보 수정
        # 수정된 사용자 정보 return 혹은 로그아웃 수행
        return Response(status=status.HTTP_200_OK)

# /edit 
class UserEditAPIView(APIView):
    # 사용자 정보 수정
    def put(self, request):
        mutable = {
            'user_id': request.data['user_id'],
            'user_name': request.data['user_name'],
            'user_email': request.data['user_email'],
            'user_gender': request.data['user_gender'],
            'user_created_at': request.data['user_created_at'],
            }
    
        try:
            user_id = mutable['user_id']
            user = User.objects.get(user_id=user_id)
            userSerializer = UserSerializer(user, data=mutable, partial=True)
            if userSerializer.is_valid():
                user = userSerializer.save()

                res = Response(
                    {
                        "data": UserSerializer(user).data,
                        "state": 200,
                        "error": None,
                        "message": "사용자 정보 수정 성공"
                    },
                    status=status.HTTP_200_OK
                )
                return res

            else:
                errors = userSerializer.errors
                first_error = next(iter(errors.values()))[0] if errors else "Invalid data"
                raise ValidationError(first_error)

        except ValidationError as e:

            res = Response(
                {
                    "data": None,
                    "state": 400,
                    "error": str(e),
                    "message": "사용자 정보 수정 실패 - " + str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            return res

        except Exception as e:
            res = Response(
                {
                    "data": None,
                    "state": 500,
                    "error": str(e),
                    "message": "사용자 정보 수정 실패"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            return res


# /account
class AccountAPIView(APIView):
    # 회원가입
    def post(self, request):
        mutable = {
            'user_id': request.data['user_id'],
            'user_name': request.data['user_name'],
            'user_email': request.data['user_email'],
            'user_gender': request.data['user_gender'],
            # 'user_created_at': request.data['user_created_at'],
            'password': request.data['password'],
        }

        try:
            registerSerializer = RegisterSerializer(data=mutable)
            if registerSerializer.is_valid():
                user_id = registerSerializer.validated_data['user_id']
                if User.objects.filter(user_id=user_id).exists():
                    raise ValidationError("이미 존재하는 사용자입니다.")

                if not validate_password(registerSerializer.validated_data['password']):
                    raise ValidationError("비밀번호는 최소 9글자 이상, 대문자, 소문자, 숫자, 특수문자 중 3종류 이상의 조합이어야 합니다.")

                user = registerSerializer.save()
                user = User.objects.get(user_id=user_id)


                res = Response(
                    {
                        "data": UserSerializer(user).data,
                        "state": 201,
                        "error": None,
                        "message": "회원가입 성공"
                    },
                    status=status.HTTP_201_CREATED
                )
                return res

            else:
                errors = registerSerializer.errors
                first_error = next(iter(errors.values()))[0] if errors else "Invalid data"
                raise ValidationError(first_error)

        except ValidationError as e:
            res = Response(
                {
                "data": None,
                "state": 400,
                "error": str(e),
                "message": "회원가입 실패 - " + str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            return res

        except Exception as e:
            res = Response(
                {
                "data": None,
                "state": 500,
                "error": str(e),
                "message": "회원가입 실패"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            return res    # 추후 구현(설계 XXX)


    # # 회원탈퇴
    # def delete(self, request):
    #     return Response(status=status.HTTP_200_OK)
    # # ID/PW 찾기
    # def put(self, request):
    #     return Response(status=status.HTTP_200_OK)

# /account/id-check
class AccountIDCheckAPIView(APIView):
    # 아이디 중복 확인
    def post(self, request):
        # @INPUT: User(user_id)
        user_id = request.data['user_id']
        if User.objects.filter(user_id=user_id).exists():
            res = Response(
                {
                    "data": None,
                    "state": 400,
                    "error": "이미 존재하는 사용자입니다.",
                    "message": "이미 존재하는 사용자입니다." # 문구 변경 예정
                },
                status=status.HTTP_400_BAD_REQUEST
            )
            return res
        res = Response(
            {
                "data": None,
                "state": 200,
                "error": None,
                "message": "사용 가능한 아이디입니다."
            },
            status=status.HTTP_200_OK
        )
        return res
