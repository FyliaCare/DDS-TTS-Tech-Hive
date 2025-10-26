'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Smartphone, Laptop, Gamepad2, Wrench, ShoppingBag, Shield, Zap, TrendingUp, Award, Clock, Star, ChevronRight, Percent, Package, Headphones, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/product/ProductCard'

const mockProducts = [
  { id: '1', name: 'iPhone 15 Pro Max 256GB', slug: 'iphone-15-pro-max-256gb', price: 8500, salePrice: 7999, brand: 'Apple', images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500'], stock: 12, averageRating: 4.8, reviewCount: 156 },
  { id: '2', name: 'MacBook Pro 14" M3 Pro', slug: 'macbook-pro-14-m3-pro', price: 15000, salePrice: 14200, brand: 'Apple', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'], stock: 8, averageRating: 4.9, reviewCount: 89 },
  { id: '3', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', price: 7200, salePrice: 6800, brand: 'Samsung', images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'], stock: 3, averageRating: 4.7, reviewCount: 234 },
  { id: '4', name: 'PlayStation 5 Console', slug: 'playstation-5-console', price: 4500, salePrice: 4200, brand: 'Sony', images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'], stock: 15, averageRating: 4.9, reviewCount: 567 },
  { id: '5', name: 'Dell XPS 15 Laptop', slug: 'dell-xps-15', price: 12000, salePrice: 11500, brand: 'Dell', images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'], stock: 6, averageRating: 4.6, reviewCount: 92 },
  { id: '6', name: 'AirPods Pro 2nd Gen', slug: 'airpods-pro-2', price: 1800, salePrice: 1650, brand: 'Apple', images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'], stock: 25, averageRating: 4.8, reviewCount: 445 },
]

const brands = ['Apple', 'Samsung', 'Dell', 'HP', 'Sony', 'Microsoft', 'Lenovo', 'Asus']

const testimonials = [
  { name: 'Kwame Mensah', role: 'Business Owner', image: 'https://i.pravatar.cc/150?img=12', comment: 'Best tech store in Accra! Got my MacBook here and the service was exceptional. Highly recommended!', rating: 5 },
  { name: 'Ama Serwaa', role: 'Student', image: 'https://i.pravatar.cc/150?img=5', comment: 'Affordable prices and genuine products. They repaired my phone in just 2 hours. Amazing!', rating: 5 },
  { name: 'Kofi Adjei', role: 'Entrepreneur', image: 'https://i.pravatar.cc/150?img=8', comment: 'Professional service and great warranty. My go-to place for all tech needs in Ghana.', rating: 5 },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState({ products: 0, customers: 0, repairs: 0 })
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        products: prev.products < 500 ? prev.products + 10 : 500,
        customers: prev.customers < 2000 ? prev.customers + 50 : 2000,
        repairs: prev.repairs < 1500 ? prev.repairs + 30 : 1500,
      }))
    }, 50)
    setTimeout(() => clearInterval(timer), 2000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % 3), 5000)
    return () => clearInterval(timer)
  }, [])

  const heroSlides = [
    { title: 'Flash Sale: Up to 50% Off', subtitle: 'Limited time offers on premium gadgets', bg: 'from-rose-600 via-pink-600 to-purple-600', cta: 'Shop Flash Sale', link: '/shop?sale=true' },
    { title: 'New iPhone 15 Series', subtitle: 'The most powerful iPhone yet', bg: 'from-blue-600 via-indigo-600 to-purple-600', cta: 'Pre-Order Now', link: '/shop?category=phones' },
    { title: 'Gaming Laptops from GHS 8,000', subtitle: 'High-performance machines for pros', bg: 'from-green-600 via-teal-600 to-blue-600', cta: 'View Collection', link: '/shop?category=laptops' },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      <section className={`relative bg-linear-to-r ${heroSlides[currentSlide].bg} text-white transition-all duration-1000 overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-60 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-bounce">
                <Percent className="h-4 w-4" />
                <span className="text-sm font-semibold">🔥 Limited Time Offer</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">{heroSlides[currentSlide].title}</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">{heroSlides[currentSlide].subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={heroSlides[currentSlide].link}>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-all text-lg px-8 py-6 shadow-2xl">
                    {heroSlides[currentSlide].cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/repairs">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all text-lg px-8 py-6">
                    <Wrench className="mr-2 h-5 w-5" /> Book Repair
                  </Button>
                </Link>
              </div>
              <div className="flex gap-3 mt-12">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-12 bg-white' : 'w-8 bg-white/50 hover:bg-white/75'}`} />
                ))}
              </div>
            </div>
            <div className="hidden md:block animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600" alt="Featured" className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-xl animate-bounce">Save 40%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-orange-500 to-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-pulse" />
              <span className="font-bold">FLASH SALE ENDS IN:</span>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>
            <Link href="/shop?sale=true">
              <Button size="sm" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
                Shop Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-8 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package, text: 'Free Delivery', sub: 'Orders over GHS 500' },
              { icon: Shield, text: '100% Authentic', sub: 'Genuine products' },
              { icon: Headphones, text: '24/7 Support', sub: 'Expert assistance' },
              { icon: Zap, text: 'Fast Repair', sub: 'Same-day service' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-blue-100 p-3 rounded-full">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{item.text}</div>
                  <div className="text-sm text-gray-600">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-3"><span className="text-red-500">⚡</span> Flash Sale</h2>
              <p className="text-gray-600">Grab these deals before they're gone!</p>
            </div>
            <Link href="/shop?sale=true" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View All <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProducts.map((product, index) => (
              <div key={product.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Smartphone, name: 'Mobile Phones', count: '150+ Products', link: '/shop?category=phones', gradient: 'from-blue-500 to-blue-600', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
              { icon: Laptop, name: 'Laptops', count: '80+ Products', link: '/shop?category=laptops', gradient: 'from-purple-500 to-purple-600', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
              { icon: Gamepad2, name: 'Gaming', count: '45+ Products', link: '/shop?category=consoles', gradient: 'from-green-500 to-green-600', image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400' },
              { icon: Headphones, name: 'Accessories', count: '200+ Products', link: '/shop?category=accessories', gradient: 'from-orange-500 to-orange-600', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
            ].map((cat, i) => (
              <Link key={cat.name} href={cat.link} className="group relative overflow-hidden rounded-2xl animate-scale-in transform hover:scale-105 transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="aspect-square relative">
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <cat.icon className="h-12 w-12 mb-4 transform group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-xl mb-1 text-center">{cat.name}</h3>
                    <p className="text-sm text-white/90">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-500" /> Trending Now
              </h2>
              <p className="text-gray-600">Most popular products this week</p>
            </div>
            <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View All <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product, index) => (
              <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Authorized Retailer For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {brands.map((brand, i) => (
              <div key={brand} className="flex items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="font-bold text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-5xl font-bold mb-2">{stats.products}+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold mb-2">{stats.customers}+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-2">{stats.repairs}+</div>
              <div className="text-blue-100">Repairs Done</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8 text-lg">Subscribe to get special offers, free giveaways, and exclusive deals</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-lg" />
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg rounded-full">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-green-600 to-teal-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Wrench className="h-20 w-20 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Device Broken? We Fix It!</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">Expert technicians, genuine parts, and quick turnaround. Get your device back to life today.</p>
          <Link href="/repairs">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all text-lg px-12 py-6 shadow-2xl">Book Repair Service →</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
