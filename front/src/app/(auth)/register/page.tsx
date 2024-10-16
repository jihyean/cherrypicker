"use client";

import AuthForm from '@/components/auth/AuthForm'

export default function SignupPage() {
  const handleSignup = (data:{user_id:string, password:string, confirmPassword:string, user_gender:boolean, user_email: string}) => {
    // 회원가입 로직 구현
    console.log('Signup data:', data)
  }

  return <AuthForm mode="signup" onSubmit={handleSignup} />
  
}