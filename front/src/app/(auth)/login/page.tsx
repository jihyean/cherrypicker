"use client";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import AuthForm from '@/components/auth/AuthForm'
import { login } from '@/store/authSlice';

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  // 로그인 함수
  const handleLogin = async(data: Record<string, string | boolean>) => {
    const {user_id, password} = data // 받아온 데이터 set

    console.log('Login data:', data)

    // 아이디와 비밀번호가 입력되지 않았을 때
    if (!user_id || !password) {
      await Swal.fire({
				icon: 'error',
				title: '로그인',
				text: '아이디와 비밀번호를 입력해주세요',
			})
			return
    }

    // 로그인 요청
    await dispatch(login({user_id: user_id as string, password: password as string})).unwrap()
    .then(async() => {
      // 로그인 성공
      await Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: '로그인 되었습니다',
      })
      router.push('/') // 성공시 메인 페이지로 이동
    })
    // 로그인 실패
    .catch((err) => {
      console.log(err.error)
      console.log(err.message)
      Swal.fire({
        icon: 'error',
        title: err.message,
        text: err.error,
      })
    })
    return
  }
  
  return <AuthForm mode="login" onSubmit={handleLogin} />
}