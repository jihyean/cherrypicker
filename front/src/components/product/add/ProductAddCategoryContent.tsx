import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { CATEGPRY_FIELD } from "@/types/product"

type ProductAddCategoryContentProps = {
  handleChangeCategory: (category: CATEGPRY_FIELD) => void
  setProductState: (state: string) => void
}

function ProductAddCategoryContent({ handleChangeCategory, setProductState }: ProductAddCategoryContentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">카테고리</Label>
        <Select onValueChange={(value) => handleChangeCategory(value as CATEGPRY_FIELD)}>
          <SelectTrigger>
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">상의</SelectItem>
            <SelectItem value="bottom">하의</SelectItem>
            <SelectItem value="skirt">원피스</SelectItem>
            <SelectItem value="bag">가방</SelectItem>
            <SelectItem value="shoes">신발</SelectItem>
            <SelectItem value="etc">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">상품 상태</Label>
        <Select onValueChange={(value) => setProductState(value as string)}>
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