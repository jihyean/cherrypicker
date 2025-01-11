"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus, Save, Send } from 'lucide-react'

type Category = "상의" | "하의" | "원피스" | "가방" | "신발" | "기타"
type ProductStatus = "laundary" | "wishList" | "season-out" | "closet"

export default function AddProduct() {
  const [category, setCategory] = useState<Category | ''>('')
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages([...images, ...files])
    
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls([...previewUrls, ...newPreviewUrls])
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
              <CategoryContent setCategory={setCategory} />
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
                    <div key={index} className="aspect-square rounded-lg border-2 border-dashed overflow-hidden">
                      <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted">
                    <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">이미지 추가</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 카테고리 카드 (데스크톱) */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="pt-6">
              <CategoryContent setCategory={setCategory} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CategoryContent({ setCategory }: { setCategory: (category: Category) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">카테고리</Label>
        <Select onValueChange={(value) => setCategory(value as Category)}>
          <SelectTrigger>
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="상의">상의</SelectItem>
            <SelectItem value="하의">하의</SelectItem>
            <SelectItem value="원피스">원피스</SelectItem>
            <SelectItem value="가방">가방</SelectItem>
            <SelectItem value="신발">신발</SelectItem>
            <SelectItem value="기타">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">상품 상태</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="상품 상태 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="laundary">세탁중</SelectItem>
            <SelectItem value="wishList">위시리스트</SelectItem>
            <SelectItem value="season-out">시즌아웃</SelectItem>
            <SelectItem value="closet">옷장</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}