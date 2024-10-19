"use client";

import AuthForm from '@/components/auth/AuthForm'

export default function LoginPage() {
  const handleLogin = (data:{user_id:string, password:string}) => {
    // 로그인 로직 구현
    console.log('Login data:', data)
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />
}