'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

  const shipping = total > 500 ? 0 : 50
  const subtotal = total
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const finalTotal = subtotal - discount + shipping

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'FIRST50': 50,
    }

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: validCoupons[couponCode.toUpperCase()],
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
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
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-blue-100">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
              
              <div className="space-y-4">
                  {items.map((item) => (
                    <div
                    key={item.productId}
                    className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-all"
                  >
                    {/* Product Image */}
                    <Link href={`/shop/${item.slug || item.productId}`} className="shrink-0">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.slug || item.productId}`}
                        className="font-semibold text-lg hover:text-blue-600 line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{item.brand}</p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold">
                        GH₵ {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                      </div>
                      {item.salePrice && (
                        <div className="text-sm text-gray-500 line-through">
                          GH₵ {(item.price * item.quantity).toLocaleString()}
                        </div>
                      )}
                      <div className="text-sm text-gray-600 mt-1">
                        GH₵ {(item.salePrice || item.price).toLocaleString()} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 pt-6 border-t">
                <Link href="/shop">
                  <Button variant="outline">
                    ← Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Discount Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <Tag className="h-4 w-4" />
                    <span>{appliedCoupon.code} applied ({appliedCoupon.discount}% off)</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">GH₵ {subtotal.toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span className="font-semibold">-GH₵ {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `GH₵ ${shipping}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    Add GH₵ {(500 - subtotal).toLocaleString()} more to get FREE shipping!
                  </div>
                )}

                <div className="pt-4 border-t-2">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-blue-600">
                      GH₵ {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => router.push('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% authentic products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
