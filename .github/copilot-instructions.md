# DDS & TTS Tech Hive - Copilot Instructions

## Project Overview
Full-stack e-commerce platform for tech sales and repair services in Accra, Ghana.

**Tech Stack**: Next.js 16, TypeScript, Tailwind CSS, Prisma, PostgreSQL
**Features**: E-commerce, Paystack payments, Email/WhatsApp notifications, Repair bookings

## ✅ Project Setup Complete

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Next.js TypeScript e-commerce platform
- [x] Scaffold the Project - Next.js with App Router, TypeScript, Tailwind CSS
- [x] Customize the Project - Added all components, API routes, and integrations
- [x] Install Required Extensions - No additional extensions needed
- [x] Compile the Project - Dependencies installed successfully
- [x] Create and Run Task - Development server task created
- [x] Launch the Project - Server running
- [x] Ensure Documentation is Complete - README.md and SETUP_GUIDE.md created

## Key Implementation Details

### Database Schema (Prisma)
- User management with roles (Customer, Admin, Super Admin)
- Product catalog with categories, reviews, stock tracking
- Order management with Paystack integration
- Repair booking system
- Shopping cart functionality

### API Routes Created
- `/api/products` - Product listing and filtering
- `/api/products/[slug]` - Product details
- `/api/orders` - Order creation and management
- `/api/repairs` - Repair booking
- `/api/payment/verify` - Paystack payment verification

### Integration Services
- **Paystack**: Payment processing
- **NodeMailer**: Email notifications
- **WhatsApp Business API**: WhatsApp notifications

### Components
- Responsive Header with search and cart
- Footer with contact information
- Product cards with ratings
- Reusable UI components (Button, Input, Card)

## Next Steps for Development

1. **Database Setup**: Configure PostgreSQL and run migrations
2. **Add Sample Data**: Create categories and products
3. **Create Remaining Pages**: Shop, Cart, Checkout, Admin dashboard
4. **Setup Authentication**: Configure NextAuth.js
5. **Image Storage**: Set up Cloudinary or similar
6. **Testing**: Test payment flow and notifications

## Development Commands

```bash
npm run dev                 # Start development server
npm run prisma:generate     # Generate Prisma Client
npm run prisma:migrate      # Run database migrations
npm run prisma:studio       # Open database GUI
```

## Important Files

- `.env.local` - Environment variables (configure API keys)
- `prisma/schema.prisma` - Database schema
- `src/lib/paystack.ts` - Payment integration
- `src/lib/email.ts` - Email service
- `src/lib/whatsapp.ts` - WhatsApp integration

## Coding Guidelines

- Use TypeScript for all new files
- Follow Next.js 16 App Router conventions
- Use Tailwind CSS for styling
- Keep components in `src/components/`
- API routes in `src/app/api/`
- Use Prisma for all database operations

---
Last Updated: October 26, 2025
Status: ✅ Core infrastructure complete, ready for feature development