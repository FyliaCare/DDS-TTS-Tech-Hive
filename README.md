# DDS & TTS Tech Hive

A modern, full-stack e-commerce platform for tech sales and repair services in Accra, Ghana.

## 🚀 Features

### E-Commerce
- **Product Catalog**: Browse phones, laptops, game consoles, and accessories
- **Advanced Filtering**: Filter by category, brand, price range
- **Product Search**: Search functionality across all products
- **Shopping Cart**: Add items and manage your cart
- **Product Reviews**: Customer ratings and reviews
- **Stock Management**: Real-time stock tracking

### Payment Integration
- **Paystack Integration**: Secure online payments
- **Multiple Payment Methods**: Card payments through Paystack
- **Payment Verification**: Automatic payment confirmation
- **Order Tracking**: Track order status in real-time

### Repair Services
- **Online Booking**: Book device repairs online
- **Device Types**: Phones, laptops, tablets, game consoles
- **Repair Tracking**: Monitor repair status
- **Estimated Costs**: Get repair estimates

### Notifications
- **Email Notifications**: Order confirmations and updates
- **WhatsApp Integration**: Instant notifications via WhatsApp
- **Admin Alerts**: Real-time alerts for new orders and bookings

### Admin Dashboard
- **Inventory Management**: Add, edit, delete products
- **Order Management**: Process and track orders
- **Repair Management**: Handle repair bookings
- **Customer Management**: View customer information
- **Analytics**: Sales and performance metrics

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payment**: Paystack API
- **Email**: NodeMailer
- **WhatsApp**: WhatsApp Business API
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Paystack account (for payments)
- Email account (Gmail recommended)
- WhatsApp Business API account (optional)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "DDS&TTS TECH HIVE"
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dds_tts_tech_hive"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Paystack
PAYSTACK_SECRET_KEY="your-paystack-secret-key"
PAYSTACK_PUBLIC_KEY="your-paystack-public-key"

# Email (NodeMailer)
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="DDS & TTS Tech Hive <noreply@ddsttstechhive.com>"

# WhatsApp Business API
WHATSAPP_API_TOKEN="your-whatsapp-api-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"

# Admin
ADMIN_EMAIL="admin@ddsttstechhive.com"
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
DDS&TTS TECH HIVE/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── admin/            # Admin dashboard pages
│   │   ├── api/              # API routes
│   │   │   ├── products/     # Product APIs
│   │   │   ├── orders/       # Order APIs
│   │   │   ├── repairs/      # Repair APIs
│   │   │   └── payment/      # Payment verification
│   │   ├── repairs/          # Repair booking pages
│   │   ├── shop/             # Shop pages
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── product/          # Product components
│   │   └── ui/               # Reusable UI components
│   └── lib/
│       ├── prisma.ts         # Prisma client
│       ├── utils.ts          # Utility functions
│       ├── email.ts          # Email service
│       ├── whatsapp.ts       # WhatsApp integration
│       └── paystack.ts       # Payment integration
├── .env.local                # Environment variables
├── package.json
└── README.md
```

## 🔐 Authentication Setup

The application uses NextAuth.js for authentication. To set up:

1. Generate a secret:
```bash
openssl rand -base64 32
```

2. Add to `.env.local`:
```env
NEXTAUTH_SECRET="generated-secret-here"
```

## 💳 Payment Setup (Paystack)

1. Create a Paystack account at [paystack.com](https://paystack.com)
2. Get your API keys from the dashboard
3. Add to `.env.local`:
```env
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."
```

## 📧 Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the app password in `.env.local`

## 📱 WhatsApp Setup (Optional)

1. Set up WhatsApp Business API
2. Get your API token and phone number ID
3. Add to `.env.local`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Google Cloud

## 📊 Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (caution!)
npx prisma migrate reset
```

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Replace logo in Header component
- Modify metadata in `layout.tsx`

### Products
- Add categories in Prisma Studio or admin panel
- Upload product images
- Set pricing and specifications

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### Payment Issues
- Verify Paystack API keys
- Check test/live mode consistency
- Review Paystack dashboard for errors

### Email Not Sending
- Verify Gmail app password
- Check spam folder
- Review email server settings

## 📝 License

This project is proprietary software for DDS & TTS Tech Hive.

## 🤝 Support

For support or questions, contact: info@ddsttstechhive.com

## 🔄 Updates

- **Version**: 1.0.0
- **Last Updated**: October 2025

---

Built with ❤️ in Accra, Ghana
