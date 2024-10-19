"use client"

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (data:{user_id:string, password:string, confirmPassword:string, user_name: string, user_gender:boolean, user_email: string}) => void
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    confirmPassword: '',
    user_name: '',
    user_gender: '',
    user_email: '',
    user_email_verified: '' // 회원가입 시에만 사용하며, 인증 번호 입력을 위한 State
  })
  const [verifyEmailCode, setVerifyEmailCode] = useState<string>('1234') // 올바른 인증 번호
  const [isEmailVerified, setIsEmailVerified] = useState(false) // 이메일 인증 관련 State
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false) // 비밀번호 확인 관련 State

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, user_gender: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    //* 성별을 boolean으로 변환
    e.preventDefault();
    if (isEmailVerified && isPasswordConfirm || mode === 'login') {
      const genderBoolean = formData.user_gender === 'male' ? true : false;
      onSubmit({ ...formData, user_gender: genderBoolean });
    } else {
      alert('이메일 인증과 비밀번호 확인이 완료되어야 합니다.');
    }
  };

  const handlePasswordConfirm = () => {
    //* 비밀번호 확인 로직
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
    }
    else {
      alert('비밀번호가 일치합니다.')
      setIsPasswordConfirm(true)
    }
  }

  const sendEmail = () => {
    //* 이메일 전송 로직
    console.log('Sending email:', formData.user_email)
    alert('인증번호가 전송되었습니다.')
  }

  const verifyEmail = () => {
    //* 이메일 인증 로직
    console.log('Verifying email:', formData.user_email)
    
    const inpVerified =  formData.user_email_verified 
    if ( inpVerified != verifyEmailCode ) {
      alert('인증번호가 일치하지 않습니다.')
      return
    }
    alert('인증되었습니다.')
    setIsEmailVerified(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-transparent">
      <main className="container mx-auto mt-8 px-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <Label htmlFor="user_id">아이디</Label>
            <Input
              id="user_id"
              name="user_id"
              type="text"
              required
              className="mt-1"
              value={formData.user_id}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="password">비밀번호</Label>
            <div className="mt-1 relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="pr-10"
                value={formData.password}
                onChange={handleChange}
                disabled={isPasswordConfirm}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* 회원가입시에만 표시 */}
          {mode === 'signup' && (
            <>
              <div>
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="mt-1 flex">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="flex grow"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isPasswordConfirm}
                  />
                  <Button
                    type="button"
                    onClick={handlePasswordConfirm}
                    className="ml-2"
                    disabled={isPasswordConfirm}
                  >
                    {isPasswordConfirm ? '완료' : '확인'}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="user_name">이름</Label>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  className="mt-1"
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="user_gender">성별</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="성별 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">남성</SelectItem>
                    <SelectItem value="female">여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="user_email">이메일</Label>
                <div className="mt-1 flex">
                  <Input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    className="flex-grow"
                    value={formData.user_email}
                    onChange={handleChange}
                    disabled={isEmailVerified}
                  />
                  <Button
                    type="button"
                    onClick={sendEmail}
                    className="ml-2"
                    disabled={isEmailVerified}
                  >
                    {isEmailVerified ? '전송됨' : '전송'}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="user_email_verified">이메일 인증</Label>
                <div className="mt-1 flex">
                  <Input
                    id="user_email_verified"
                    name="user_email_verified"
                    type="text"
                    required
                    className="flex-grow"
                    value={formData.user_email_verified}
                    onChange={handleChange}
                    disabled={isEmailVerified}
                  />
                  <Button
                    type="button"
                    onClick={verifyEmail}
                    className="ml-2"
                    disabled={isEmailVerified}
                  >
                    {isEmailVerified ? '인증됨' : '인증'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-zinc-50">
                  만 14세 이상입니다. (필수)
                </Label>
              </div>
            </>
          )}
          <div>
            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-800">
              {mode === 'login' ? '로그인' : '가입하기'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}