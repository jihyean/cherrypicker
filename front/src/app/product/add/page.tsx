"use client"

import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus, Send, SquareX, Crown } from 'lucide-react'

import HashtagContent from "@/components/product/common/ProductHashtagContent"
import ProductAddCategoryContent from "@/components/product/add/ProductAddCategoryContent"

import { CATEGPRY_FIELD } from '@/types/product'
import { RequestProductSubmission } from '@/lib/api/product'


export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]) // 제품 이미지
  const [previewUrls, setPreviewUrls] = useState<string[]>([]) // 제품 미리보기 이미지

  const [value, setValue] = useState("") // 선택된 해시태그 값
  const [productHashTags, setProductHashTags] = useState<string[]>([]) // 제품 해시태그

  const [category, setCategory] = useState<CATEGPRY_FIELD | ''>('') // 해당 제품이 어떤 카테고리에 속하는 지
  const [prouductState, setProductState] = useState<string>('') // 제품의 상태 
  const [prouductData, setProductData] = useState<Record<string, string>>({}) // 제품의 데이터
  
  const handleChangeCategory = (value: CATEGPRY_FIELD) => {
    setCategory(value)
    // setProductData name, option, comment를 제외하고 초기화
    setProductData({
      product_name: prouductData.product_name,
      product_option: prouductData.product_option,
      product_comment: prouductData.product_comment
    })
  }

  const handleChangeProudctData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    console.log(id, value)
    setProductData({
      ...prouductData,
      [id]: value
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이미지 파일은 3개까지만 업로드 가능
    if (File.length >= 3) {
      return
    }

    const files = Array.from(e.target.files || [])
    setImages([...images, ...files])
    
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls([...previewUrls, ...newPreviewUrls])
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index)
    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }

  // Button : Mouse Event
  // Input : Change Event

  // 해시태그 셀랙트박스 선택 혹은 엔터 입력시에 값 추가
  const handleHashTagChange = (tag: string) => {
    // 이미 추가된 태그인지 확인
    if (productHashTags.includes(tag)) {
      return
    }
    setProductHashTags([...productHashTags, tag])
  }

  const handleRemoveHashTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget
    setProductHashTags(productHashTags.filter(tag => tag !== value))
  }

  const hashtags = [
    {
      value: "casual",
      label: "캐주얼",
    },
    {
      value: "formal",
      label: "포멀",
    },
    {
      value: "sporty",
      label: "스포티",
    },
    {
      value: "vintage",
      label: "빈티지",
    },
    {
      value: "modern",
      label: "모던",
    },
    {
      value: "chic",
      label: "시크",
    },
    {
      value: "minimal",
      label: "미니멀",
    },
    {
      value: "retro",
      label: "레트로",
    },
    {
      value: "streetwear",
      label: "스트릿웨어",
    },
    {
      value: "summer",
      label: "여름",
    },
    {
      value: "winter",
      label: "겨울",
    },
    {
      value: "spring",
      label: "봄",
    },
    {
      value: "fall",
      label: "가을",
    },
    {
      value: "office",
      label: "오피스룩",
    },
    {
      value: "party",
      label: "파티룩",
    },
    {
      value: "daily",
      label: "데일리룩",
    },
    {
      value: "korean",
      label: "한국 스타일",
    },
    {
      value: "luxury",
      label: "럭셔리",
    },
    {
      value: "preppy",
      label: "프레피",
    },
    {
      value: "eco",
      label: "에코 패션",
    },
  ];

  const handleSubmit = async () => {
    // FormData 생성
    const formData = new FormData();
  
    // 폼 데이터 추가
    formData.append("product_name", prouductData.product_name); // 제품명
    formData.append("product_option", prouductData.product_option); // 제품 옵션
    formData.append("product_state", prouductState); // 제품 상태 (예제 값 사용)
    formData.append("product_comment", prouductData.product_comment); // 제품 설명
    formData.append("product_category", category); // 카테고리
  
    // 사이즈 정보 추가
    if (category === "top") {
      formData.append("top_size_total", prouductData.top_size_total.toString());
      formData.append("top_size_shoulder", prouductData.top_size_shoulder.toString());
      formData.append("top_size_chest", prouductData.top_size_chest.toString());
      formData.append("top_size_sleeve", prouductData.top_size_sleeve.toString());
    } else if (category === "bottom") {
      formData.append("bottom_size_total", prouductData.bottom_size_total.toString());
      formData.append("bottom_size_waist", prouductData.bottom_size_waist.toString());
      formData.append("bottom_size_hip", prouductData.bottom_size_hip.toString());
      formData.append("bottom_size_thigh", prouductData.bottom_size_thigh.toString());
      formData.append("bottom_size_rise", prouductData.bottom_size_rise.toString());
      formData.append("bottom_size_hem", prouductData.bottom_size_hem.toString());
    } else if (category === "skirt") {
      formData.append("skirt_size_total", prouductData.skirt_size_total.toString());
      formData.append("skirt_size_shoulder", prouductData.skirt_size_shoulder.toString());
      formData.append("skirt_size_chest", prouductData.skirt_size_chest.toString());
      formData.append("skirt_size_sleeve", prouductData.skirt_size_sleeve.toString());
      formData.append("skirt_size_hip", prouductData.skirt_size_hip.toString());
      formData.append("skirt_size_waist", prouductData.skirt_size_waist.toString());
      formData.append("skirt_size_hem", prouductData.skirt_size_hem.toString());
    }
  
    // 해시태그 리스트 추가
    formData.append("hashtag_name_list", JSON.stringify(productHashTags));
    
    // 이미지 추가
    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData);

    // 제품 등록 API 호출
    const response = await RequestProductSubmission({formData});
    if (response.error || response.state != 201) {
      alert(response.error);
      return;
    }
    alert(response.message);
  };
  


  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">제품 등록</h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
          >
            <Send className="w-4 h-4 mr-2" />
            등록하기
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-2">
          {/* 카테고리 카드 (모바일) */}
          <Card className="md:hidden">
            <CardContent className="pt-6">
              <ProductAddCategoryContent 
                handleChangeCategory={handleChangeCategory}
                setProductState={setProductState}
              />
            </CardContent>
          </Card>

          {/* 해시태그 카드 (모바일) */}
          <Card className="md:hidden">
            <CardContent className="flex flex-col gap-2 pt-6">
              {/* Tags */}
              <div className='grid grid-cols-4 items-center gap-2'>
                  {productHashTags.map((tag, index) => (
                    <button 
                      key={index}
                      value={tag}
                      onClick={handleRemoveHashTag}
                      className="border hover:border-current hover:font-bold hover:cursor-pointer bg-blue-100 text-blue-800 dark:bg-black dark:text-white rounded-full p-1.5 text-xs"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              <HashtagContent
                hashtags={hashtags}
                value={value}
                setValue={setValue}
                className='md:hidden'
                handleHashTagChange={handleHashTagChange}
              />
            </CardContent>
          </Card>


          {/* 상품 정보 카드 */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product_name">제품명</Label>
                  <Input id="product_name" maxLength={30} placeholder="제품명을 입력하세요 (30자 이하)" onChange={handleChangeProudctData} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product_option">제품 옵션</Label>
                  <Input id="product_option" maxLength={30} placeholder="제품 옵션을 입력하세요 (30자 이하)" onChange={handleChangeProudctData} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product_comment">제품 설명</Label>
                  <Textarea
                    id="product_comment"
                    maxLength={1000}
                    placeholder="제품 설명을 입력하세요 (1000자 이하)"
                    className="min-h-[200px]"
                    onChange={handleChangeProudctData}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사이즈 정보 카드 */}
          {category && ["top", "bottom", "skirt"].includes(category) && (
            <Card>
              <CardContent className="pt-6">
                <Label className="mb-4 block">사이즈 정보</Label>
                {renderSizeFields({category, prouductData, handleChangeProudctData})}
              </CardContent>
            </Card>
          )}

          {/* 제품 이미지 카드 */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Label>제품 이미지</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="aspect-square rounded-lg border-2 border-dashed overflow-hidden relative">
                      <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover peer" />
                      <button 
                        onClick={() => handleRemoveImage(index)}
                        className='absolute top-1 right-1 opacity-80 text-slate-600 hidden peer-hover:block hover:block'>
                        <SquareX size={32} className='text-red-400'/>
                      </button>
                      {index === 0 && (
                        <button 
                          onClick={() => handleRemoveImage(index)}
                          className='absolute top-1 left-1 text-slate-600'>
                          <Crown size={32} className='text-amber-500' fill='#FFC107'/>
                        </button>
                      )}
                    </div>
                  ))}
                  {images.length < 3 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted">
                      <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">이미지 추가</span>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col gap-2">
          {/* 카테고리 카드 (데스크톱) */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="pt-6">
                <ProductAddCategoryContent 
                  handleChangeCategory={handleChangeCategory}
                  setProductState={setProductState}
                />
              </CardContent>
            </Card>
          </div>

          {/* 해시태그 카드 (데스크톱) */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="flex flex-col gap-2 pt-6">
                {/* Tags */}
                <div className='grid grid-cols-4 items-center gap-2'>
                  {productHashTags.map((tag, index) => (
                    <button 
                      key={index}
                      value={tag}
                      onClick={handleRemoveHashTag}
                      className="border hover:border-current hover:font-bold hover:cursor-pointer bg-blue-100 text-blue-800 dark:bg-black dark:text-white rounded-full p-1.5 text-xs"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <HashtagContent
                  hashtags={hashtags}
                  value={value}
                  setValue={setValue}
                  className="hidden md:block"
                  handleHashTagChange={handleHashTagChange}
                />
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}

type SizeFieldsProps = {
  category: CATEGPRY_FIELD
  prouductData: Record<string, string>
  handleChangeProudctData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const renderSizeFields = ({category, prouductData, handleChangeProudctData}: SizeFieldsProps) => {
  switch (category) {
    case "top":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="top_size_total">총장</Label>
            <Input id="top_size_total" type="number" value={prouductData.top_size_total || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="top_size_shoulder">어깨너비</Label>
            <Input id="top_size_shoulder" type="number" value={prouductData.top_size_shoulder || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="top_size_chest">가슴단면</Label>
            <Input id="top_size_chest" type="number" value={prouductData.top_size_chest || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="top_size_sleeve">소매길이</Label>
            <Input id="top_size_sleeve" type="number" value={prouductData.top_size_sleeve || ''} onChange={handleChangeProudctData} />
          </div>
        </div>
      )
    case "bottom":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bottom_size_total">총장</Label>
            <Input id="bottom_size_total" type="number" value={prouductData.bottom_size_total || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottom_size_waist">허리단면</Label>
            <Input id="bottom_size_waist" type="number" value={prouductData.bottom_size_waist || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottom_size_hip">엉덩이단면</Label>
            <Input id="bottom_size_hip" type="number" value={prouductData.bottom_size_hip || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottom_size_thigh">허벅지단면</Label>
            <Input id="bottom_size_thigh" type="number" value={prouductData.bottom_size_thigh || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottom_size_rise">밑위</Label>
            <Input id="bottom_size_rise" type="number" value={prouductData.bottom_size_rise || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bottom_size_hem">밑단</Label>
            <Input id="bottom_size_hem" type="number" value={prouductData.bottom_size_hem || ''} onChange={handleChangeProudctData} />
          </div>
        </div>
      )
    case "skirt":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="skirt_size_total">총장</Label>
            <Input id="skirt_size_total" type="number" value={prouductData.skirt_size_total || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skirt_size_shoulder">어깨너비</Label>
            <Input id="skirt_size_shoulder" type="number" value={prouductData.skirt_size_shoulder || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skirt_size_chest">가슴단면</Label>
            <Input id="skirt_size_chest" type="number" value={prouductData.skirt_size_chest || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skirt_size_sleeve">소매길이</Label>
            <Input id="skirt_size_sleeve" type="number" value={prouductData.skirt_size_sleeve || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skirt_size_hip">엉덩이단면</Label>
            <Input id="skirt_size_hip" type="number" value={prouductData.skirt_size_hip || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skirt_size_waist">허리단면</Label>
            <Input id="skirt_size_waist" type="number" value={prouductData.skirt_size_waist || ''} onChange={handleChangeProudctData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skirt_size_hem">밑단</Label>
            <Input id="skirt_size_hem" type="number" value={prouductData.skirt_size_hem || ''} onChange={handleChangeProudctData} />
          </div>
        </div>
      )
    default:
      return null
  }
}