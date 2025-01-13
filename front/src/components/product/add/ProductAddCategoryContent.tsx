import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { CATEGPRY_FIELD } from "@/types/product"

function ProductAddCategoryContent({ setCategory }: { setCategory: (category: CATEGPRY_FIELD) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">카테고리</Label>
        <Select onValueChange={(value) => setCategory(value as CATEGPRY_FIELD)}>
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

export default ProductAddCategoryContent;