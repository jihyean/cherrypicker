from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models import CheckConstraint, Q
from django.core.exceptions import ValidationError

#* users 총 6개 테이블(정의: 정의 2개, 조인 3개, 관리 1개) +추상모델

# UserInfo() 클래스를 관리하는 추상모델(장고의 기본 유저모델을 상속받아 커스터마이징 및 인증)
class UserManager(BaseUserManager):
    # def create_user(self, user_id, password, user_name, user_birth, user_contact, user_email, user_register_date, **extra_fields):
    def create_user(self, user_id, password, user_name, user_email, user_gender, **extra_fields):
        if not user_email:
            raise ValueError('Users must have an email address')

        if not user_id:
            raise ValidationError('user_id를 입력해야 합니다.')
        if len(user_id) < 6 or len(user_id) > 12:
            raise ValidationError('user_id는 6자 이상 12자 이하여야 합니다.')
        if not password:
            raise ValidationError('비밀번호를 입력해야 합니다.')
        if len(password) < 8 or len(password) > 20:
            raise ValidationError('비밀번호는 8자 이상 20자 이하여야 합니다.')
        if not user_name:
            raise ValidationError('이름을 입력해야 합니다.')
        if user_gender is None or user_gender == "":
            raise ValidationError('성별을 입력해야 합니다.')
        # if not user_created_at:
        #     raise ValidationError('가입일을 입력해야 합니다.')
        if not user_email:
            raise ValidationError('이메일 주소를 입력해야 합니다.')

        user = self.model(           
            user_id=user_id,
            password=password,
            user_name=user_name,
            user_gender=user_gender,
            # user_created_at=user_created_at,
            user_email=self.normalize_email(user_email),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, user_id, password, user_name, user_email, user_gender, user_created_at, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(user_email, password, **extra_fields)

# users
class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(max_length=20, primary_key=True, unique=True, help_text='6-12자의 영문, 숫자, _만 사용가능')
    password = models.CharField(max_length=128, help_text='8-20자 이내 숫자, 특수문자, 영문자')
    user_name = models.CharField(max_length=30)
    user_email = models.EmailField(max_length=50)
    user_gender = models.BooleanField(default=True, help_text='True: 남성, False: 여성')
    user_created_at = models.DateTimeField(auto_now_add=True)
    # user_profile = models.CharField(max_length=1000, null=True, blank=True, help_text='이미지 경로 저장') # models.ImageField를 고려 가능
    
    # Default Fields ( AbstractBaseUser ) 
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    
    objects = UserManager()
    
    USERNAME_FIELD = 'user_id'
    # REQUIRED_FIELDS = ['user_email'] # create_user를 활용하여 요구필드 설정중
    
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return (
        f"User{{\n"
        f"\tuser_id='{self.user_id}',\n"
        f"\tpassword='{self.password}',\n"
        f"\tuser_name='{self.user_name}',\n"
        f"\tuser_email='{self.user_email}',\n"
        f"\tuser_gender='{self.user_gender}',\n"
        f"\tuser_created_at='{self.user_created_at}',\n"
        f"}}"
    )