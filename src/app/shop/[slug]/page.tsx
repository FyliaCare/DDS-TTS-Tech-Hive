'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product/ProductCard'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'

// Mock product data - replace with API call
const mockProduct = {
  id: '1',
  name: 'iPhone 15 Pro Max 256GB',
  slug: 'iphone-15-pro-max-256gb',
  description: 'The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display, powered by the revolutionary A17 Pro chip. Experience professional-grade photography with the new 48MP main camera, 5x optical zoom, and advanced computational photography. Built with aerospace-grade titanium for incredible durability and a premium feel.',
  price: 8500,
  salePrice: 7999,
  brand: 'Apple',
  category: 'Phones',
  images: [
    'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800',
    'https://images.unsplash.com/photo-1695048064755-72d5e8797c9f?w=800',
    'https://images.unsplash.com/photo-1695048064050-7ffd11384fc0?w=800',
    'https://images.unsplash.com/photo-1695048064406-d19d7e7082a6?w=800',
  ],
  stock: 12,
  averageRating: 4.8,
  reviewCount: 156,
  specifications: {
    'Display': '6.7" Super Retina XDR',
    'Processor': 'A17 Pro chip',
    'Storage': '256GB',
    'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
    'Battery': 'Up to 29 hours video playback',
    'OS': 'iOS 17',
  },
  features: [
    'Titanium design with textured matte glass back',
    'Dynamic Island for Live Activities',
    'All-day battery life with USB-C charging',
    'Emergency SOS via satellite',
    'Crash Detection and Fall Detection',
    'Water resistant (IP68)',
  ],
}

const mockReviews = [
  { id: 1, author: 'John Doe', rating: 5, date: '2024-10-15', comment: 'Absolutely love this phone! The camera quality is outstanding and the battery lasts all day.' },
  { id: 2, author: 'Jane Smith', rating: 5, date: '2024-10-10', comment: 'Best iPhone yet! The titanium design feels premium and the performance is blazing fast.' },
  { id: 3, author: 'Mike Johnson', rating: 4, date: '2024-10-05', comment: 'Great phone overall. Only wish the price was a bit lower, but you get what you pay for.' },
]

const relatedProducts = [
  { id: '2', name: 'iPhone 15 Pro 128GB', slug: 'iphone-15-pro-128gb', price: 7500, salePrice: 6999, brand: 'Apple', images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500'], stock: 8, averageRating: 4.7, reviewCount: 89 },
  { id: '3', name: 'AirPods Pro 2nd Gen', slug: 'airpods-pro-2', price: 1800, salePrice: 1650, brand: 'Apple', images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'], stock: 25, averageRating: 4.8, reviewCount: 445 },
  { id: '4', name: 'iPhone 15 Silicone Case', slug: 'iphone-15-case', price: 350, salePrice: 299, brand: 'Apple', images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500'], stock: 50, averageRating: 4.6, reviewCount: 234 },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { showToast } = useToast()
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = mockProduct // In real app, fetch based on params.slug

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      quantity: quantity,
      image: product.images[0],
      images: product.images,
      brand: product.brand,
      slug: product.slug,
    })
    showToast(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`, 'success')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/checkout')
  }

  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-blue-600">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-blue-600">{product.category}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    -{discount}%
                  </div>
                )}
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Link href={`/shop?brand=${product.brand}`} className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  {product.brand}
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.averageRating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-900">
                    GH₵ {(product.salePrice || product.price).toLocaleString()}
                  </span>
                  {product.salePrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      GH₵ {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.salePrice && (
                  <p className="text-green-600 font-semibold mt-2">
                    You save GH₵ {(product.price - product.salePrice).toLocaleString()}!
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-semibold">In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="text-red-600 font-semibold">Out of Stock</div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-6 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-lg"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  variant="outline"
                  className="py-6"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" className="py-6">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs font-semibold">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-xs font-semibold">Warranty</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-xs font-semibold">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          {/* Tab Headers */}
          <div className="flex gap-6 border-b mb-6">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              <h3 className="font-bold text-xl mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700 min-w-[120px]">{key}:</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-6 w-6 ${i < Math.floor(product.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xl font-semibold">{product.averageRating} out of 5</span>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {mockReviews.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-semibold">{review.author}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>

              <Button className="mt-6">Write a Review</Button>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
