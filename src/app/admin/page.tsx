'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Wrench, 
  Users, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockStats = [
  { label: 'Total Revenue', value: 'GH₵ 245,890', change: '+12.5%', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Total Orders', value: '1,543', change: '+8.2%', icon: ShoppingCart, color: 'bg-blue-500' },
  { label: 'Products', value: '267', change: '+3', icon: Package, color: 'bg-purple-500' },
  { label: 'Repair Bookings', value: '89', change: '+15', icon: Wrench, color: 'bg-orange-500' },
]

const mockProducts = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Phones', price: 12999, stock: 15, status: 'In Stock' },
  { id: 2, name: 'MacBook Air M2', category: 'Laptops', price: 7999, stock: 8, status: 'In Stock' },
  { id: 3, name: 'AirPods Pro', category: 'Accessories', price: 3000, stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'iPad Pro 12.9"', category: 'Tablets', price: 9999, stock: 5, status: 'Low Stock' },
]

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 15999, status: 'Delivered', date: '2024-10-20' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 7999, status: 'Shipped', date: '2024-10-21' },
  { id: 'ORD-003', customer: 'Mike Johnson', total: 12999, status: 'Processing', date: '2024-10-22' },
  { id: 'ORD-004', customer: 'Sarah Williams', total: 3500, status: 'Pending', date: '2024-10-23' },
]

const mockRepairs = [
  { id: 'REP-001', customer: 'Alice Brown', device: 'iPhone 14 Pro', issue: 'Screen Replacement', status: 'In Progress', date: '2024-10-18' },
  { id: 'REP-002', customer: 'Bob Davis', device: 'MacBook Pro', issue: 'Battery Replacement', status: 'Completed', date: '2024-10-17' },
  { id: 'REP-003', customer: 'Carol White', device: 'Samsung Galaxy S23', issue: 'Water Damage', status: 'Pending', date: '2024-10-23' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'completed':
      case 'in stock':
        return 'bg-green-100 text-green-700'
      case 'shipped':
      case 'in progress':
        return 'bg-blue-100 text-blue-700'
      case 'processing':
      case 'low stock':
        return 'bg-yellow-100 text-yellow-700'
      case 'pending':
      case 'out of stock':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          </div>
          <nav className="px-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'repairs', label: 'Repairs', icon: Wrench },
              { id: 'customers', label: 'Customers', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {mockStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-green-600 font-semibold">{stat.change}</span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {mockOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">GH₵ {order.total.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Repairs</h3>
                  <div className="space-y-3">
                    {mockRepairs.map((repair) => (
                      <div key={repair.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-semibold">{repair.id}</p>
                          <p className="text-sm text-gray-600">{repair.device}</p>
                          <p className="text-xs text-gray-500">{repair.issue}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(repair.status)}`}>
                          {repair.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Products</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input className="pl-10" placeholder="Search products..." />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Product</th>
                      <th className="px-6 py-4 text-left font-semibold">Category</th>
                      <th className="px-6 py-4 text-left font-semibold">Price</th>
                      <th className="px-6 py-4 text-left font-semibold">Stock</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">GH₵ {product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="View">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Edit">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Orders Management</h2>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input className="pl-10" placeholder="Search orders..." />
                  </div>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Order ID</th>
                      <th className="px-6 py-4 text-left font-semibold">Customer</th>
                      <th className="px-6 py-4 text-left font-semibold">Date</th>
                      <th className="px-6 py-4 text-left font-semibold">Total</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-semibold">GH₵ {order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="View">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Edit">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Repairs Tab */}
          {activeTab === 'repairs' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Repair Bookings</h2>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input className="pl-10" placeholder="Search repairs..." />
                  </div>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              {/* Repairs Table */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Repair ID</th>
                      <th className="px-6 py-4 text-left font-semibold">Customer</th>
                      <th className="px-6 py-4 text-left font-semibold">Device</th>
                      <th className="px-6 py-4 text-left font-semibold">Issue</th>
                      <th className="px-6 py-4 text-left font-semibold">Date</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockRepairs.map((repair) => (
                      <tr key={repair.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{repair.id}</td>
                        <td className="px-6 py-4">{repair.customer}</td>
                        <td className="px-6 py-4">{repair.device}</td>
                        <td className="px-6 py-4">{repair.issue}</td>
                        <td className="px-6 py-4">{new Date(repair.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(repair.status)}`}>
                            {repair.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="View">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Update Status">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Customers</h2>
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Users className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2">Customer Management</h3>
                <p className="text-gray-600">Customer management features coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
