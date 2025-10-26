import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">DDS & TTS Tech Hive</h3>
            <p className="text-sm mb-4">
              Your trusted tech partner in Accra for all phone, laptop, and gaming needs.
              Quality products and expert repair services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white">Shop All Products</Link></li>
              <li><Link href="/repairs" className="hover:text-white">Repair Services</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/admin" className="hover:text-white">Admin Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=phones" className="hover:text-white">Mobile Phones</Link></li>
              <li><Link href="/shop?category=laptops" className="hover:text-white">Laptops</Link></li>
              <li><Link href="/shop?category=consoles" className="hover:text-white">Game Consoles</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-white">Accessories</Link></li>
              <li><Link href="/shop?category=parts" className="hover:text-white">Computer Parts</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-blue-500" />
                <span>Accra, Ghana</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span>+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <span>info@ddsttstechhive.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} DDS & TTS Tech Hive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
