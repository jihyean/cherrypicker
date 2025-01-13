"use client"

import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus, Save, Send, SquareX } from 'lucide-react'

import HashtagContent from "@/components/product/common/ProductHashtagContent"
import ProductAddCategoryContent from "@/components/product/add/ProductAddCategoryContent"

import { CATEGPRY_FIELD } from '@/types/product'


export default function AddProduct() {
  const [category, setCategory] = useState<CATEGPRY_FIELD | ''>('')
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [productHashTags, setProductHashTags] = useState<string[]>([]) // 제품 해시태그


  const [value, setValue] = useState("") // 선택된 해시태그 값

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


  const renderSizeFields = () => {
    switch (category) {
      case "상의":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="top_size_total">총장</Label>
              <Input id="top_size_total" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="top_size_shoulder">어깨너비</Label>
              <Input id="top_size_shoulder" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="top_size_chest">가슴단면</Label>
              <Input id="top_size_chest" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="top_size_sleeve">소매길이</Label>
              <Input id="top_size_sleeve" type="number" />
            </div>
          </div>
        )
      case "하의":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bottom_size_total">총장</Label>
              <Input id="bottom_size_total" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottom_size_waist">허리단면</Label>
              <Input id="bottom_size_waist" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottom_size_hip">엉덩이단면</Label>
              <Input id="bottom_size_hip" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottom_size_thigh">허벅지단면</Label>
              <Input id="bottom_size_thigh" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottom_size_rise">밑위</Label>
              <Input id="bottom_size_rise" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottom_size_hem">밑단</Label>
              <Input id="bottom_size_hem" type="number" />
            </div>
          </div>
        )
      case "원피스":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="skirt_size_total">총장</Label>
              <Input id="skirt_size_total" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skirt_size_shoulder">어깨너비</Label>
              <Input id="skirt_size_shoulder" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skirt_size_chest">가슴단면</Label>
              <Input id="skirt_size_chest" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skirt_size_sleeve">소매길이</Label>
              <Input id="skirt_size_sleeve" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skirt_size_hip">엉덩이단면</Label>
              <Input id="skirt_size_hip" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skirt_size_waist">허리단면</Label>
              <Input id="skirt_size_waist" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skirt_size_hem">밑단</Label>
              <Input id="skirt_size_hem" type="number" />
            </div>
          </div>
        )
      default:
        return null
    }
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


  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">제품 등록</h1>
          <p className="text-muted-foreground">새로운 제품을 등록합니다</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            임시저장
          </Button>
          <Button>
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
              <ProductAddCategoryContent setCategory={setCategory} />
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
                  <Label htmlFor="name">제품명</Label>
                  <Input id="name" maxLength={30} placeholder="제품명을 입력하세요 (30자 이하)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="option">제품 옵션</Label>
                  <Input id="option" maxLength={30} placeholder="제품 옵션을 입력하세요 (30자 이하)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">제품 설명</Label>
                  <Textarea
                    id="description"
                    maxLength={1000}
                    placeholder="제품 설명을 입력하세요 (1000자 이하)"
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사이즈 정보 카드 */}
          {category && ["상의", "하의", "원피스"].includes(category) && (
            <Card>
              <CardContent className="pt-6">
                <Label className="mb-4 block">사이즈 정보</Label>
                {renderSizeFields()}
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
                        <SquareX size={20} className='text-red-400'/>
                      </button>
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
                <ProductAddCategoryContent setCategory={setCategory} />
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


