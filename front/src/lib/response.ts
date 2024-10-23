export interface Response<T> {
	data: T,	// 데이터가 어떤 타입인지 제너릭을 통해 명시
	state: number,
	message: string,
	error: string | null
}
