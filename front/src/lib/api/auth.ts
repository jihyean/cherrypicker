import { fetchWithoutAuth, fetchWithAuth } from "@/lib/request";
import { Response } from "@/lib/response";
import Cookies from 'js-cookie';
import exp from "constants";

export interface UserModel {
	user_id: string
	user_name: string
	user_email: string
	user_gender: boolean
	user_created_at: string
	password: string

	is_superuser: boolean
	is_active: boolean
	is_staff: boolean
}

/** Login */
export type LoginFormModel = {
	user_id: string
	password: string
}
type ResponseLoginUser = {
	user: UserModel | null
	access_token: string | null
	refresh_token: string | null
}
export const RequestLogin = async ({ user_id, password }: LoginFormModel): Promise<Response<ResponseLoginUser | null>> => {
	const data = await fetchWithoutAuth('/users/auth/', {
		method: 'POST',
		body: JSON.stringify({ user_id, password })
	})
	return {
		message: data.message,
		data: data.data,
		state: data.state,
		error: data.error
	}
}

/** Register */
export type RegisterFormModel = {
	user_id: string
	password: string
	user_name: string
	user_email: string
	user_gender: boolean
}
export type ResponseRegister = null
export const RequestRegister = async ({ user_id, password, user_name, user_email, user_gender }: RegisterFormModel): Promise<Response<ResponseRegister>> => {
	const data = await fetchWithoutAuth('/users/account/', {
		method: 'POST',
		body: JSON.stringify({ user_id, password, user_name, user_email, user_gender })
	})
	return {
		message: data.message,
		data: data.data,
		state: data.state,
		error: data.error
	}
}

export type ResponseLogout = null
export const RequestLogout = async (): Promise<Response<ResponseLogout>> => {
  const token = Cookies.get('access_token');  // JWT 토큰을 Cookies에서 가져옴
  const data = await fetchWithAuth('/users/auth/', {
		headers: {
			'Authorization': `Bearer ${token}`,  // JWT 토큰 추가
		},
		method: 'DELETE',
	})
	return {
		message: data.message,
		data: data.data,
		state: data.state,
		error: data.error
	}
}

/** Update */
// export type UpdateFormModel = {
// 	username: string
// 	email: string
// 	bio: string
// 	password: string
// }
// export type ResponseUpdate = null
// export const RequestUpdate = async ({ username, email, bio, password }: UpdateFormModel): Promise<Response<ResponseUpdate>> => {
// 	const data = await fetchWithoutAuth('/update', {
// 		method: 'PATCH',
// 		body: JSON.stringify({ username, email, bio, password })
// 	})
// 	return {
// 		message: data.message,
// 		data: data.data,
// 		status: data.status
// 	}
// }
