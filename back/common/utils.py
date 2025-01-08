import os
from datetime import datetime
from django.core.exceptions import ValidationError

# serializer의 에러 메시지 중 첫 번째 메시지를 반환
def get_first_serializer_error(errors):
    # first_error = next(iter(errors.values()))[0] if errors else None
    return next(iter(errors.values()))[0] if errors else None


def upload_file(uploaded_file, directory=None):
    """
    파일을 지정된 디렉토리에 업로드하고, 업로드된 파일의 경로를 반환
    
    @uploaded_file: 업로드된 파일 객체
    @directory: 저장할 디렉토리 이름 (기본값 None)
    *return: 저장된 파일의 경로
    !raises ValidationError: 파일 업로드 실패 시 예외 발생
    """
    if uploaded_file is None:
        return None
    try:
        # 디렉토리 생성
        file_directory = os.path.join('uploaded_files', directory)
        os.makedirs(file_directory, exist_ok=True)
        
        # 파일 저장 경로 설정
        file_save_path = os.path.join(file_directory, datetime.now().strftime('%Y%m%d%H%M%S%f') + '_' + uploaded_file.name)
        
        # 서버에 파일 저장(복사)
        with open(file_save_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)
        return file_save_path
    
    except Exception as e:
        raise ValidationError(f"파일 저장 중 오류 발생: {str(e)}")
