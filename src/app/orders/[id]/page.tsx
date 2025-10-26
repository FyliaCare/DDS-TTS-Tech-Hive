'use client'

import { useParams } from 'next/navigation'
import { Package, Truck, CheckCircle2, MapPin, Phone, Mail, Copy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

// Mock data - replace with actual API call
const mockOrderData = {
  'ORD-2024-001': {
    id: 'ORD-2024-001',
    date: '2024-10-20',
    status: 'Delivered',
    total: 15999,
    trackingNumber: 'TRK-GH-789456123',
    estimatedDelivery: '2024-10-24',
    actualDelivery: '2024-10-23',
    shippingAddress: {
      name: 'John Doe',
      phone: '+233 24 123 4567',
      email: 'john.doe@example.com',
      address: '123 Main Street',
      city: 'Accra',
      region: 'Greater Accra',
    },
    items: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        image: 'https://images.unsplash.com/photo-1696446702183-cbd50c3987e9?w=400&h=400&fit=crop',
        quantity: 1,
        price: 12999,
      },
      {
        id: 2,
        name: 'AirPods Pro (2nd Gen)',
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop',
        quantity: 1,
        price: 3000,
      },
    ],
    timeline: [
      { status: 'Order Placed', date: '2024-10-20 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-10-20 10:31 AM', completed: true },
      { status: 'Processing', date: '2024-10-20 2:00 PM', completed: true },
      { status: 'Shipped', date: '2024-10-21 9:00 AM', completed: true },
      { status: 'Out for Delivery', date: '2024-10-23 8:00 AM', completed: true },
      { status: 'Delivered', date: '2024-10-23 3:45 PM', completed: true },
    ],
  },
  'ORD-2024-002': {
    id: 'ORD-2024-002',
    date: '2024-10-18',
    status: 'Shipped',
    total: 7999,
    trackingNumber: 'TRK-GH-456789321',
    estimatedDelivery: '2024-10-26',
    actualDelivery: null,
    shippingAddress: {
      name: 'John Doe',
      phone: '+233 24 123 4567',
      email: 'john.doe@example.com',
      address: '123 Main Street',
      city: 'Accra',
      region: 'Greater Accra',
    },
    items: [
      {
        id: 3,
        name: 'MacBook Air M2',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        quantity: 1,
        price: 7999,
      },
    ],
    timeline: [
      { status: 'Order Placed', date: '2024-10-18 3:15 PM', completed: true },
      { status: 'Payment Confirmed', date: '2024-10-18 3:16 PM', completed: true },
      { status: 'Processing', date: '2024-10-19 10:00 AM', completed: true },
      { status: 'Shipped', date: '2024-10-21 11:30 AM', completed: true },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false },
    ],
  },
}

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id as string
  const order = mockOrderData[orderId as keyof typeof mockOrderData]
  const [copied, setCopied] = useState(false)

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn&apos;t find an order with ID: {orderId}</p>
          <Button onClick={() => window.location.href = '/profile'}>View All Orders</Button>
        </div>
      </div>
    )
  }

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order.trackingNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600'
      case 'Shipped':
        return 'text-blue-600'
      case 'Processing':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/profile'}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Back to Orders
          </button>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Order {order.id}</h1>
              <p className="text-gray-600">
                Placed on {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${getStatusColor(order.status)}`}>{order.status}</p>
              {order.actualDelivery ? (
                <p className="text-gray-600">Delivered on {new Date(order.actualDelivery).toLocaleDateString()}</p>
              ) : (
                <p className="text-gray-600">Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Order Timeline</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-600' : 'bg-gray-200'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h3 className={`font-bold text-lg ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.status}
                        </h3>
                        {step.date && (
                          <p className="text-sm text-gray-600">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-xl font-bold mt-2">GH₵ {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">GH₵ {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tracking Number */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Tracking Number</h3>
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                <code className="flex-1 text-sm font-mono">{order.trackingNumber}</code>
                <button
                  onClick={copyTrackingNumber}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Copy tracking number"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold">{order.shippingAddress.name}</p>
                    <p className="text-gray-600 text-sm">{order.shippingAddress.address}</p>
                    <p className="text-gray-600 text-sm">{order.shippingAddress.city}, {order.shippingAddress.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-sm">{order.shippingAddress.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <p className="text-sm">{order.shippingAddress.email}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              {order.status === 'Delivered' && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Buy Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
