'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { itemCount } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-xl">DDS</span>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold text-gray-900">DDS & TTS Tech Hive</div>
              <div className="text-xs text-gray-500">Your Trusted Tech Partner</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for phones, laptops, accessories..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="hidden md:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="h-6 w-6 text-gray-700" />
              <span className="text-sm font-medium">Account</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t border-gray-200">
          <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            All Products
          </Link>
          <Link href="/shop?category=phones" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Phones
          </Link>
          <Link href="/shop?category=laptops" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Laptops
          </Link>
          <Link href="/shop?category=consoles" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Game Consoles
          </Link>
          <Link href="/shop?category=accessories" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Accessories
          </Link>
          <Link href="/repairs" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Repair Services
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            About Us
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
            <nav className="flex flex-col space-y-3">
              <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                All Products
              </Link>
              <Link href="/shop?category=phones" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                Phones
              </Link>
              <Link href="/shop?category=laptops" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                Laptops
              </Link>
              <Link href="/shop?category=consoles" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                Game Consoles
              </Link>
              <Link href="/shop?category=accessories" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                Accessories
              </Link>
              <Link href="/repairs" className="text-sm font-medium text-blue-600 hover:text-blue-700 py-2">
                Repair Services
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                About Us
              </Link>
              <Link href="/account" className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
                My Account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
