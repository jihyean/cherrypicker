import { fetchWithAuth } from "@/lib/request";
import { Response } from "@/lib/response";

export interface ProductModel {
  product_id: string; // 제품 ID
  product_name: string; // 제품명
  product_option: string; // 제품 옵션 (예: 색상, 사이즈 등)
  product_comment: string; // 제품 설명
  product_category: string; // 카테고리 (예: 상의, 하의, 원피스 등)

  // 사이즈 정보 (카테고리에 따라 다름)
  top_size_total?: number; // 상의 - 총장
  top_size_shoulder?: number; // 상의 - 어깨
  top_size_chest?: number; // 상의 - 가슴
  top_size_sleeve?: number; // 상의 - 소매

  bottom_size_total?: number; // 하의 - 총장
  bottom_size_waist?: number; // 하의 - 허리
  bottom_size_hip?: number; // 하의 - 엉덩이
  bottom_size_thigh?: number; // 하의 - 허벅지
  bottom_size_rise?: number; // 하의 - 밑위
  bottom_size_hem?: number; // 하의 - 밑단

  skirt_size_total?: number; // 원피스/치마 - 총장
  skirt_size_shoulder?: number; // 원피스 - 어깨
  skirt_size_chest?: number; // 원피스 - 가슴
  skirt_size_sleeve?: number; // 원피스 - 소매
  skirt_size_hip?: number; // 원피스/치마 - 엉덩이
  skirt_size_waist?: number; // 원피스/치마 - 허리
  skirt_size_hem?: number; // 원피스/치마 - 밑단

  hashtag_name_list: string[]; // 해시태그 목록
  images: File[]; // 업로드된 이미지 배열

  product_state: string; // 상태 (예: wishlist, archive)
  product_created_at: string; // 생성 일자
  product_updated_at?: string; // 수정 일자 (옵션)
}


/** Product Form Model */
export type ProductFormModel = {
  formData: FormData;
};

export type ResponseProduct = null

/** API Request Function */
export const RequestProductSubmission = async ({formData} : ProductFormModel): Promise<Response<ResponseProduct>> => {
    const data = await fetchWithAuth("/products/archive/", {
      method: "PUT",
      body: formData,
    })
    console.log(data)
    return {
      message: data.message,
      data: data.data,
      state: data.state,
      error: data.error
    }
};

