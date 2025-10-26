'use client'

import { memo } from 'react'
import Image from 'next/image'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  salePrice?: number
  image: string
  images: string[]
  averageRating: number
  reviewCount: number
  brand: string
  stock: number
  priority?: boolean
}

function ProductCard({
  id,
  name,
  slug,
  price,
  salePrice,
  image,
  images,
  averageRating,
  reviewCount,
  brand,
  stock,
  priority = false,
}: ProductCardProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      productId: id,
      name,
      price,
      salePrice,
      quantity: 1,
      image,
      images,
      brand,
      slug,
    })
    showToast(`${name} added to cart!`, 'success')
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/shop/${slug}`
  }

  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <a href={`/shop/${slug}`} className="block relative w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
        </a>

        {/* Badges */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            -{discount}%
          </div>
        )}
        {stock === 0 && (
          <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            Out of Stock
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex gap-2">
            <Button
              onClick={handleQuickView}
              variant="outline"
              size="sm"
              className="flex-1 bg-white hover:bg-gray-100"
            >
              Quick View
            </Button>
            <button
              className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <a href={`/shop/${slug}`} className="block">
          <p className="text-sm text-gray-600 mb-1">{brand}</p>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-14 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </a>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {salePrice ? (
              <>
                <span className="text-2xl font-bold text-blue-600">
                  GH₵ {salePrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  GH₵ {price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                GH₵ {price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(ProductCard)
