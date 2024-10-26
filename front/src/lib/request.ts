import Cookies from 'js-cookie';

export interface FetchOptions {
	headers?: {[key: string]: any};
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: string;
}

// 로그인이 필요하지 않은 API 요청을 보낼 때 사용하는 함수
export const fetchWithoutAuth = async (url: string, options: FetchOptions = {} ) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	};

	const mergedOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

  const response = await fetch("http://localhost:8000" + url, mergedOptions);
	return await response.json();
}

// 로그인이 필요한 API 요청을 보낼 때 사용하는 함수
export const fetchWithAuth = async (url: string, options: FetchOptions = {} ) => {
  const token = Cookies.get('token');  // JWT 토큰을 Cookies에서 가져옴

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,  // JWT 토큰 추가
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch("http://localhost:8000" + url, mergedOptions);
  return await response.json();
};
