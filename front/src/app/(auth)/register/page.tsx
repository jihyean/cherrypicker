"use client";

import Swal from 'sweetalert2';
import AuthForm from '@/components/auth/AuthForm'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { register } from '@/store/authSlice';

export default function SignupPage() {
  const router = useRouter()
	const dispatch = useDispatch<AppDispatch>();

  const handleSignup = async(data: Record<string, string | boolean>) => {
    const {user_id, password, confirmPassword, user_name, user_gender, user_email} = data
    // 회원가입 로직 구현
    console.log('Signup data:', data)

    if (!user_id || !user_name || !user_email || !password || !confirmPassword ) {
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		if (password !== confirmPassword) {
			await Swal.fire({
				icon: 'error',
				title: 'Passwords do not match',
				text: 'Please ensure that both passwords match',
			})
			return
		}

		await dispatch(register({user_id: user_id as string, password: password as string, user_email: user_email as string, user_name: user_name as string, user_gender: user_gender as boolean})).unwrap() 
		.then(async() => {
			await Swal.fire({
				icon: 'success',
				title: 'Account created successfully',
				text: 'You can now login to your account',
			})
      router.push('/login')
		})
		.catch((err) => {
			Swal.fire({
				icon: 'error',
				title: 'An error occurred',
				text: err.message,
			})
		})
		return


  }

  return <AuthForm mode="signup" onSubmit={handleSignup} />
  
}