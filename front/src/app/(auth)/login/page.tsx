"use client";

import AuthForm from '@/components/auth/AuthForm'

export default function LoginPage() {
  const handleLogin = (data: Record<string, string | boolean>) => {
    // 로그인 로직 구현
    console.log('Login data:', data)
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />
}