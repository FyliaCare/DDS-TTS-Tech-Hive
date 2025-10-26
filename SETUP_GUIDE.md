# DDS & TTS Tech Hive - Setup Guide

## 🎉 Project Created Successfully!

Your full-stack e-commerce platform is now set up and ready for development.

## ✅ What's Been Created

### Core Features Implemented:
- ✅ Next.js 16 with TypeScript and App Router
- ✅ Tailwind CSS for responsive design
- ✅ Prisma ORM with PostgreSQL schema
- ✅ Complete database schema for products, orders, repairs, users
- ✅ Paystack payment integration
- ✅ Email notification system (NodeMailer)
- ✅ WhatsApp Business API integration
- ✅ API routes for products, orders, repairs
- ✅ Payment verification system
- ✅ Responsive Header and Footer
- ✅ Homepage with hero section and categories
- ✅ Product card components
- ✅ UI components (Button, Input, Card)

### Project Structure:
```
✅ Database schema with 10+ models
✅ API routes for all major features
✅ Reusable UI components
✅ Layout components (Header, Footer)
✅ Utility functions and helpers
✅ Integration services (Email, WhatsApp, Paystack)
```

## 🚀 Next Steps to Get Running

### 1. Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL if not installed
# Then create a database:
createdb dds_tts_tech_hive
```

**Option B: Cloud Database (Recommended)**
- Use [Supabase](https://supabase.com) (Free tier available)
- Use [Railway](https://railway.app)
- Use [Neon](https://neon.tech)

Update `.env.local` with your database URL:
```env
DATABASE_URL="postgresql://user:password@host:5432/dds_tts_tech_hive"
```

### 2. Initialize the Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# (Optional) Open Prisma Studio to view/edit data
npm run prisma:studio
```

### 3. Configure Payment (Paystack)

1. Sign up at [https://paystack.com](https://paystack.com)
2. Get your test API keys from the dashboard
3. Add to `.env.local`:
```env
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxx"
PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxx"
```

### 4. Configure Email Notifications

For Gmail (recommended for development):
```env
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="DDS & TTS Tech Hive <noreply@ddsttstechhive.com>"
```

**How to get Gmail App Password:**
1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate an App Password
4. Use that password (not your regular password)

### 5. Configure WhatsApp (Optional)

WhatsApp Business API setup:
1. Apply for WhatsApp Business API access
2. Get API token and phone number ID
3. Add to `.env.local`:
```env
WHATSAPP_API_TOKEN="your-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-id"
```

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📝 Important Tasks to Complete

### A. Add Sample Data
Use Prisma Studio to add:
- **Categories**: Phones, Laptops, Consoles, Accessories, Parts
- **Products**: Add sample products with images and details
- **Admin User**: Create an admin account

### B. Create Additional Pages

Pages you'll want to create:
```
src/app/shop/page.tsx                 - Shop listing page
src/app/shop/[slug]/page.tsx          - Product detail page
src/app/cart/page.tsx                 - Shopping cart
src/app/checkout/page.tsx             - Checkout flow
src/app/repairs/page.tsx              - Repair booking form
src/app/admin/page.tsx                - Admin dashboard
src/app/admin/products/page.tsx       - Product management
src/app/admin/orders/page.tsx         - Order management
src/app/admin/repairs/page.tsx        - Repair management
```

### C. Authentication Setup

Set up NextAuth.js:
1. Generate secret: `openssl rand -base64 32`
2. Create `src/app/api/auth/[...nextauth]/route.ts`
3. Configure providers and database adapter

### D. Image Storage

Set up image hosting:
- **Cloudinary** (Free tier: 25GB)
- **Uploadthing** (Easy Next.js integration)
- **AWS S3** (Production scale)

### E. Mobile App (Future)

The TypeScript/Next.js backend can be reused with:
- **React Native** (Expo)
- **Flutter** (use the same API routes)

## 🔧 Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:reset       # Reset database (caution!)
```

## 📱 Testing Payment Integration

### Paystack Test Cards
```
Card Number: 4084 0840 8408 4081
CVV: 408
Expiry: Any future date
PIN: 0000
OTP: 123456
```

## 🐛 Common Issues

### "Can't connect to database"
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env.local`
- Ensure database exists

### "Prisma Client not generated"
```bash
npm run prisma:generate
```

### "Module not found" errors
```bash
npm install --legacy-peer-deps
```

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Paystack API Docs](https://paystack.com/docs/api/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎨 Customization

### Brand Colors
Edit in your components or `tailwind.config.ts`:
- Primary: Blue (#2563eb)
- Change to match your brand

### Logo
- Update Header component: `src/components/layout/Header.tsx`
- Add logo image to `public/` folder

### Contact Information
- Update Footer: `src/components/layout/Footer.tsx`
- Update `.env.local` with real contact info

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect GitHub repo to Vercel dashboard.

### Environment Variables for Production
Remember to add all `.env.local` variables to your hosting platform:
- DATABASE_URL (production database)
- NEXTAUTH_SECRET
- NEXTAUTH_URL (production URL)
- PAYSTACK keys (use LIVE keys)
- Email credentials
- WhatsApp API credentials

## 📞 Support

For questions or issues:
- Check the README.md
- Review the code comments
- Contact: info@ddsttstechhive.com

---

**Current Status**: ✅ All core infrastructure complete
**Next Step**: Set up database and add sample data
**Estimated Setup Time**: 30-60 minutes

Good luck with your tech business! 🚀
