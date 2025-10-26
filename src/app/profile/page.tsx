'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Package, MapPin, Lock, Bell, CreditCard, LogOut, Edit2, Check, X } from 'lucide-react'

const mockUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+233 24 123 4567',
  address: '123 Main Street',
  city: 'Accra',
  region: 'Greater Accra',
}

const mockOrders = [
  { id: 'ORD-2024-001', date: '2024-10-20', total: 15999, status: 'Delivered', items: 2 },
  { id: 'ORD-2024-002', date: '2024-10-18', total: 7999, status: 'Shipped', items: 1 },
  { id: 'ORD-2024-003', date: '2024-10-15', total: 3500, status: 'Processing', items: 3 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders')
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(mockUserData)
  const [editedData, setEditedData] = useState(mockUserData)

  const handleSave = () => {
    setUserData(editedData)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700'
      case 'Shipped':
        return 'bg-blue-100 text-blue-700'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
              {userData.firstName[0]}{userData.lastName[0]}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userData.firstName} {userData.lastName}</h1>
              <p className="text-blue-100">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <nav className="space-y-2">
                {[
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'profile', label: 'Profile Info', icon: User },
                  { id: 'addresses', label: 'Addresses', icon: MapPin },
                  { id: 'security', label: 'Security', icon: Lock },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all">
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* My Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
                          <p className="text-xl font-bold">GH₵ {order.total.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {order.status === 'Delivered' && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Buy Again</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name</label>
                      <Input
                        type="text"
                        value={isEditing ? editedData.firstName : userData.firstName}
                        onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name</label>
                      <Input
                        type="text"
                        value={isEditing ? editedData.lastName : userData.lastName}
                        onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <Input
                        type="email"
                        value={isEditing ? editedData.email : userData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <Input
                        type="tel"
                        value={isEditing ? editedData.phone : userData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">Add New Address</Button>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-blue-600 rounded-lg p-6 bg-blue-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Default</span>
                        <h3 className="font-bold text-lg mt-2">{userData.firstName} {userData.lastName}</h3>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <p className="text-gray-700">{userData.address}</p>
                    <p className="text-gray-700">{userData.city}, {userData.region}</p>
                    <p className="text-gray-700 mt-2">{userData.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Current Password</label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">New Password</label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  {[
                    { title: 'Order Updates', description: 'Get notified about your order status' },
                    { title: 'Promotions & Deals', description: 'Receive exclusive offers and discounts' },
                    { title: 'New Arrivals', description: 'Be the first to know about new products' },
                    { title: 'Price Drops', description: 'Get alerts when items in your wishlist go on sale' },
                  ].map((notif) => (
                    <div key={notif.title} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{notif.title}</h3>
                        <p className="text-sm text-gray-600">{notif.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Payment Methods</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">Add Card</Button>
                </div>

                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No saved payment methods</h3>
                  <p className="text-gray-600 mb-6">Add a payment method for faster checkout</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Card</Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
