'use client'

import Link from 'next/link'
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { useState } from 'react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    salePrice?: number | null
    brand: string
    images: string[]
    stock: number
    averageRating?: number
    reviewCount?: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  
  const displayPrice = product.salePrice || product.price
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: displayPrice,
      quantity: 1,
      image: product.images[0] || '',
      brand: product.brand,
    })
    
    showToast(`${product.name} added to cart!`, 'success')
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    showToast(
      isFavorite ? 'Removed from wishlist' : 'Added to wishlist',
      isFavorite ? 'info' : 'success'
    )
  }

  return (
    <div 
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/shop/${product.slug}`} className="block absolute inset-0 z-0">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={`object-cover w-full h-full transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {hasDiscount && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
              -{discountPercent}% OFF
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
              OUT OF STOCK
            </div>
          )}
          {product.stock > 0 && product.stock < 5 && (
            <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              ONLY {product.stock} LEFT
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleToggleFavorite}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = `/shop/${product.slug}`
            }}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">{product.brand}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 mb-2 min-h-10 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.averageRating && product.reviewCount ? (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.averageRating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount})
            </span>
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-3">
          <div>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </p>
            )}
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(displayPrice)}
            </p>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            disabled={product.stock === 0}
            className="gap-2 transition-all hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
