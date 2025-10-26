'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/contexts/ToastContext'
import { Smartphone, Laptop, Tablet, Watch, Headphones, Wrench, Calendar, Clock, CheckCircle } from 'lucide-react'

const deviceTypes = [
  { id: 'phone', name: 'Phone', icon: Smartphone },
  { id: 'laptop', name: 'Laptop', icon: Laptop },
  { id: 'tablet', name: 'Tablet', icon: Tablet },
  { id: 'watch', name: 'Smartwatch', icon: Watch },
  { id: 'accessory', name: 'Accessory', icon: Headphones },
]

const commonIssues = {
  phone: ['Screen Crack', 'Battery Issue', 'Charging Port', 'Water Damage', 'Software Issue', 'Camera Problem'],
  laptop: ['Screen Issue', 'Keyboard Problem', 'Battery Replacement', 'Overheating', 'Software Issue', 'Hard Drive'],
  tablet: ['Screen Crack', 'Battery Issue', 'Charging Port', 'Software Issue', 'Button Problem'],
  watch: ['Screen Crack', 'Battery Issue', 'Strap Replacement', 'Software Issue'],
  accessory: ['Not Working', 'Connection Issue', 'Battery Problem', 'Physical Damage'],
}

export default function RepairsPage() {
  const { showToast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    issue: '',
    description: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDeviceTypeSelect = (deviceType: string) => {
    setFormData({ ...formData, deviceType, issue: '' })
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceType: formData.deviceType,
          brand: formData.brand,
          model: formData.model,
          issueType: formData.issue,
          description: formData.description,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showToast('Repair booking submitted successfully! We\'ll contact you soon.', 'success')
        setStep(5)
      } else {
        showToast(data.error || 'Failed to submit repair booking', 'error')
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Wrench className="h-20 w-20 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Device Repair Service</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Expert technicians, genuine parts, and quick turnaround. Get your device back to life!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Device Type' },
              { num: 2, label: 'Issue Details' },
              { num: 3, label: 'Contact Info' },
              { num: 4, label: 'Schedule' },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      step >= s.num
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="h-6 w-6" /> : s.num}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${step >= s.num ? 'text-green-600' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 flex-1 transition-all ${
                      step > s.num ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Device Type */}
            {step === 1 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">What device needs repair?</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {deviceTypes.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => handleDeviceTypeSelect(device.id)}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all group"
                    >
                      <device.icon className="h-12 w-12 mx-auto mb-3 text-gray-600 group-hover:text-green-600" />
                      <span className="font-semibold">{device.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Issue Details */}
            {step === 2 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Tell us about the issue</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Brand *</label>
                      <Input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Apple, Samsung"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Model *</label>
                      <Input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., iPhone 15 Pro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Common Issues</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonIssues[formData.deviceType as keyof typeof commonIssues]?.map((issue) => (
                        <button
                          key={issue}
                          type="button"
                          onClick={() => setFormData({ ...formData, issue })}
                          className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                            formData.issue === issue
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Describe the Problem *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Please provide more details about the issue..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!formData.brand || !formData.model || !formData.description}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Your Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name *</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name *</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+233 24 123 4567"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold mb-6">Preferred Schedule</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Preferred Date *
                      </label>
                      <Input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      >
                        <option value="">Select Time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Our team will contact you to confirm the appointment and provide a quote.
                    </p>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button type="button" onClick={() => setStep(3)} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? 'Submitting...' : 'Book Repair'}
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for choosing our repair service. We'll contact you shortly to confirm your appointment
                  and provide a repair quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => window.location.href = '/'} className="bg-green-600 hover:bg-green-700">
                    Back to Home
                  </Button>
                  <Button onClick={() => { setStep(1); setFormData({ deviceType: '', brand: '', model: '', issue: '', description: '', firstName: '', lastName: '', email: '', phone: '', preferredDate: '', preferredTime: '' }) }} variant="outline">
                    Book Another Repair
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Why Choose Us */}
          {step < 5 && (
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">Expert Technicians</h3>
                <p className="text-sm text-gray-600">Certified professionals with years of experience</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">Genuine Parts</h3>
                <p className="text-sm text-gray-600">Only original and high-quality replacement parts</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Quick Turnaround</h3>
                <p className="text-sm text-gray-600">Most repairs completed within 24-48 hours</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
