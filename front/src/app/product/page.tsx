"use client"

import { useState } from 'react'
import { Search, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 제품 타입 정의
interface Product {
  product_id: number
  product_name: string
  product_option: string
  product_comment: string
  product_state: string
  product_image: string
  product_hashtags: string[]
  product_is_onboard: boolean
}

// 카테고리 타입 정의
type Category = '전체' | '상의' | '아우터' | '바지' | '원피스/스커트' | '가방' | '신발' | '패션소품' 

// 더미 제품 데이터
const products: Product[] = [
  { product_id: 1, product_name: "후드티", product_option: "M gray", product_state: "closet", product_comment: "겨울철 입는 아우터", product_image: "https://efairplay.img2.kr/EZ/24FW/6829/6829_color_black.jpg", product_hashtags: ["회색", "그래피티", "기모"], product_is_onboard: true },
  { product_id: 2, product_name: "점퍼", product_option: "XL", product_state: "laundry",  product_comment: "겨울철 입는 아우터", product_image: "https://cdn5-aka.makeshop.co.kr/shopimages/efairplay/0170030022692.jpg?1676442650", product_hashtags: ["나일론", "자켓"], product_is_onboard: false },
  { product_id: 3, product_name: "럭비 카라 맨투맨", product_option: "Brown", product_state: "wishlist",  product_comment: "겨울철 입는 아우터", product_image: "https://cdn5-aka.makeshop.co.kr/shopimages/efairplay/0060010001972.jpg?1707182953", product_hashtags: ["기모", "카라", "신상"], product_is_onboard: false },
  { product_id: 4, product_name: "데님 스트로크 자켓", product_option: "진청", product_state: "season-out",  product_comment: "겨울철 입는 아우터", product_image: "https://cdn5-aka.makeshop.co.kr/shopimages/efairplay/0170010213632.jpg?1660801185", product_hashtags: ["데님", "청자켓", "포켓"], product_is_onboard: true },
  // 더 많은 제품 추가...
]

export default function ProductListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  // 검색어와 카테고리에 따라 제품 필터링
  const filteredProducts = products.filter(product => 
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '전체' || product.product_name.includes(selectedCategory))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 바 */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div>
        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          {['전체', '상의', '아우터', '바지', '원피스/스커트', '가방', '신발', '패션소품'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              onClick={() => setSelectedCategory(category as Category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 제품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.product_id}
            className="bg-white p-4 rounded-lg shadow-md relative dark:bg-black dark:shadow-slate-950 w-full flex flex-col justify-between"
            onMouseEnter={() => setHoveredProduct(product.product_id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            
            <div className="w-full h-0 pb-[100%] relative mb-3">
              <img src={product.product_image} alt={product.product_name} className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
            </div>
            
            
            <div className='overflow-x-hidden'>
              <h3 className="whitespace-nowrap text-lg font-semibold mb-2 text-black dark:text-white">{product.product_name} {product.product_option}</h3>
              <p className="text-gray-600">{product.product_state.toLocaleString()}</p>
              <p className="text-black dark:text-white">{product.product_comment.toLocaleString()}</p>
            </div>

            <div className="mt-4">
              {/* Tags */}
              <div className='flex justify-start items-center gap-2'>
                {product.product_hashtags.map((tag, index) => (
                  <span key={index} className="border hover:border-current hover:font-bold hover:cursor-pointer bg-blue-100 text-blue-800 dark:bg-black dark:text-white rounded-full p-1.5 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              {/* 액션 버튼 */}
              <div className="mt-2 flex justify-start space-x-2">
                {product.product_is_onboard ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                {/* <Button size="icon" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 (간단한 버전) */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="mx-1">이전</Button>
        <Button variant="outline" className="mx-1">1</Button>
        <Button variant="outline" className="mx-1">2</Button>
        <Button variant="outline" className="mx-1">3</Button>
        <Button variant="outline" className="mx-1">다음</Button>
      </div>
    </div>
  )
}