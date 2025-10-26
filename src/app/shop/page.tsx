'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useDebounce } from '@/hooks/usePerformance'

const categories = ['All', 'Phones', 'Laptops', 'Gaming', 'Accessories']
const brands = ['All', 'Apple', 'Samsung', 'Dell', 'HP', 'Sony', 'Microsoft', 'Lenovo', 'Asus']
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
]

// Mock products - replace with API call
const mockProducts = [
  { id: '1', name: 'iPhone 15 Pro Max 256GB', slug: 'iphone-15-pro-max-256gb', price: 8500, salePrice: 7999, brand: 'Apple', images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500'], stock: 12, averageRating: 4.8, reviewCount: 156, category: 'Phones' },
  { id: '2', name: 'MacBook Pro 14" M3 Pro', slug: 'macbook-pro-14-m3-pro', price: 15000, salePrice: 14200, brand: 'Apple', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'], stock: 8, averageRating: 4.9, reviewCount: 89, category: 'Laptops' },
  { id: '3', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', price: 7200, salePrice: 6800, brand: 'Samsung', images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'], stock: 3, averageRating: 4.7, reviewCount: 234, category: 'Phones' },
  { id: '4', name: 'PlayStation 5 Console', slug: 'playstation-5-console', price: 4500, salePrice: 4200, brand: 'Sony', images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'], stock: 15, averageRating: 4.9, reviewCount: 567, category: 'Gaming' },
  { id: '5', name: 'Dell XPS 15 Laptop', slug: 'dell-xps-15', price: 12000, salePrice: 11500, brand: 'Dell', images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'], stock: 6, averageRating: 4.6, reviewCount: 92, category: 'Laptops' },
  { id: '6', name: 'AirPods Pro 2nd Gen', slug: 'airpods-pro-2', price: 1800, salePrice: 1650, brand: 'Apple', images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'], stock: 25, averageRating: 4.8, reviewCount: 445, category: 'Accessories' },
  { id: '7', name: 'HP Pavilion Gaming Laptop', slug: 'hp-pavilion-gaming', price: 9500, salePrice: 8999, brand: 'HP', images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'], stock: 10, averageRating: 4.5, reviewCount: 78, category: 'Laptops' },
  { id: '8', name: 'Xbox Series X', slug: 'xbox-series-x', price: 5000, salePrice: 4700, brand: 'Microsoft', images: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500'], stock: 7, averageRating: 4.8, reviewCount: 342, category: 'Gaming' },
  { id: '9', name: 'Samsung Galaxy Buds 2', slug: 'samsung-galaxy-buds-2', price: 1200, salePrice: 1050, brand: 'Samsung', images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'], stock: 20, averageRating: 4.4, reviewCount: 289, category: 'Accessories' },
  { id: '10', name: 'Lenovo ThinkPad X1', slug: 'lenovo-thinkpad-x1', price: 13500, salePrice: null, brand: 'Lenovo', images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'], stock: 5, averageRating: 4.7, reviewCount: 123, category: 'Laptops' },
  { id: '11', name: 'iPhone 14 Pro 128GB', slug: 'iphone-14-pro-128gb', price: 6500, salePrice: 5999, brand: 'Apple', images: ['https://images.unsplash.com/photo-1663499482523-1c0d8a69b759?w=500'], stock: 15, averageRating: 4.7, reviewCount: 203, category: 'Phones' },
  { id: '12', name: 'ASUS ROG Gaming Laptop', slug: 'asus-rog-gaming', price: 16000, salePrice: 15200, brand: 'Asus', images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'], stock: 4, averageRating: 4.9, reviewCount: 156, category: 'Laptops' },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Debounce search query for better performance
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Memoize filtered products to avoid recalculation
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand
        const matchesPrice = (product.salePrice || product.price) >= priceRange[0] && (product.salePrice || product.price) <= priceRange[1]
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.salePrice || a.price) - (b.salePrice || b.price)
        if (sortBy === 'price-desc') return (b.salePrice || b.price) - (a.salePrice || a.price)
        if (sortBy === 'popular') return b.reviewCount - a.reviewCount
        return 0
      })
  }, [debouncedSearch, selectedCategory, selectedBrand, priceRange, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    )
  }, [filteredProducts, currentPage])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedBrand('All')
    setPriceRange([0, 20000])
    setSortBy('newest')
  }, [])

  const activeFiltersCount = useMemo(() => {
    return [
      selectedCategory !== 'All',
      selectedBrand !== 'All',
      priceRange[0] !== 0 || priceRange[1] !== 20000,
    ].filter(Boolean).length
  }, [selectedCategory, selectedBrand, priceRange])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Products</h1>
          <p className="text-blue-100 text-lg">Discover the latest tech at unbeatable prices</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <X className="h-4 w-4" /> Clear
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedBrand === brand
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">GH₵ {priceRange[0].toLocaleString()}</span>
                    <span className="font-medium">GH₵ {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Mobile Filter Toggle */}
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                    variant="outline"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    {activeFiltersCount > 0 && (
                      <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? 'default' : 'outline'}
                        className="min-w-10"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
