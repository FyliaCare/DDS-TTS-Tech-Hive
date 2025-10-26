'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product/ProductCard'
import { Heart, ShoppingBag, Trash2, Share2 } from 'lucide-react'

// Mock wishlist data - in production, fetch from localStorage or API
const mockWishlistItems = [
  { id: '1', name: 'iPhone 15 Pro Max 256GB', slug: 'iphone-15-pro-max-256gb', price: 8500, salePrice: 7999, brand: 'Apple', images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500'], stock: 12, averageRating: 4.8, reviewCount: 156, addedAt: '2024-10-20' },
  { id: '2', name: 'MacBook Pro 14" M3 Pro', slug: 'macbook-pro-14-m3-pro', price: 15000, salePrice: 14200, brand: 'Apple', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'], stock: 8, averageRating: 4.9, reviewCount: 89, addedAt: '2024-10-18' },
  { id: '3', name: 'AirPods Pro 2nd Gen', slug: 'airpods-pro-2', price: 1800, salePrice: 1650, brand: 'Apple', images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'], stock: 25, averageRating: 4.8, reviewCount: 445, addedAt: '2024-10-15' },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const shareWishlist = () => {
    // In production, generate shareable link
    navigator.clipboard.writeText(window.location.href)
    alert('Wishlist link copied to clipboard!')
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-16 w-16 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Save items you love to your wishlist and shop them later!
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-pink-600 to-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">My Wishlist</h1>
              <p className="text-pink-100">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
            </div>
            <Heart className="h-20 w-20 fill-white/20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
            </div>

            <div className="flex gap-2">
              <Button onClick={shareWishlist} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={clearWishlist} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Wishlist Items - Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all"
                  title="Remove from wishlist"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Items - List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {wishlistItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <Link href={`/shop/${item.slug}`} className="shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="text-xl font-bold hover:text-pink-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 hover:bg-red-50 rounded-full transition-all"
                        title="Remove"
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(item.averageRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.averageRating} ({item.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price & Stock */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          GH₵ {(item.salePrice || item.price).toLocaleString()}
                        </span>
                        {item.salePrice && (
                          <span className="text-lg text-gray-500 line-through">
                            GH₵ {item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link href={`/shop/${item.slug}`} className="flex-1">
                        <Button className="w-full bg-pink-600 hover:bg-pink-700">
                          View Product
                        </Button>
                      </Link>
                      <Button
                        disabled={item.stock === 0}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>

                    {/* Added Date */}
                    <p className="text-xs text-gray-500 mt-3">
                      Added on {new Date(item.addedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockWishlistItems.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
