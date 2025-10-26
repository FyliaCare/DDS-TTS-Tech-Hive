# 🚀 Deployment Guide: Render + Neon

## Overview
This guide will help you deploy the DDS & TTS Tech Hive e-commerce platform to production using:
- **Render** - Web hosting (Free tier available)
- **Neon** - Serverless PostgreSQL database (Free tier available)

---

## 📋 Prerequisites

1. **GitHub Account** - Code repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **Neon Account** - Sign up at [neon.tech](https://neon.tech)
4. **Paystack Account** - For payment processing
5. **Gmail/SMTP** - For email notifications

---

## Part 1: Database Setup (Neon)

### Step 1: Create Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Click **"Create Project"**
3. Configure:
   - **Project Name**: `dds-tts-tech-hive`
   - **Region**: Choose closest to your users (e.g., US East)
   - **PostgreSQL Version**: 16 (latest)
4. Click **"Create Project"**

### Step 2: Get Database Connection Strings

1. In your Neon project, go to **"Connection Details"**
2. Copy **two** connection strings:
   
   **Pooled Connection** (for application):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   
   **Direct Connection** (for migrations):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require&connect_timeout=10
   ```

3. Save these for later (you'll add them to Render)

### Step 3: Enable Connection Pooling (Recommended)

1. In Neon Console, go to **Settings** → **Connection Pooling**
2. Enable **"Connection Pooling"**
3. Note the pooled connection string

---

## Part 2: Application Setup

### Step 1: Update Prisma Schema

Your `prisma/schema.prisma` should already have:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Step 2: Prepare Environment Variables

Create a `.env.production` file locally (don't commit):
```bash
# Database
DATABASE_URL="postgresql://..." # Pooled connection from Neon
DIRECT_URL="postgresql://..."   # Direct connection from Neon

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-app-name.onrender.com"

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_live_xxxxx"
PAYSTACK_SECRET_KEY="sk_live_xxxxx"

# Email (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="DDS & TTS Tech Hive <noreply@ddsttstechhive.com>"

# App
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://your-app-name.onrender.com"
```

---

## Part 3: Deploy to Render

### Option A: Using Render Blueprint (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Select the repository: `DDS&TTS TECH HIVE`
   - Render will detect `render-blueprint.yaml`
   - Click **"Apply"**

3. **Configure Environment Variables**
   
   Render will create the service. Now add environment variables:
   - Go to your service → **"Environment"**
   - Add each variable from your `.env.production`
   
   **Required Variables:**
   ```
   DATABASE_URL=<Neon pooled connection>
   DIRECT_URL=<Neon direct connection>
   NEXTAUTH_SECRET=<generate with openssl>
   NEXTAUTH_URL=https://your-app.onrender.com
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxx
   PAYSTACK_SECRET_KEY=sk_live_xxx
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_FROM=DDS & TTS Tech Hive <noreply@ddsttstechhive.com>
   NODE_ENV=production
   ```

### Option B: Manual Deployment

1. **Create Web Service**
   - Go to Render Dashboard
   - Click **"New +"** → **"Web Service"**
   - Connect GitHub repository
   - Configure:
     - **Name**: `dds-tts-tech-hive`
     - **Region**: Oregon (free tier)
     - **Branch**: `main`
     - **Runtime**: `Node`
     - **Build Command**: 
       ```bash
       npm install && npx prisma generate && npx prisma migrate deploy && npm run build
       ```
     - **Start Command**: 
       ```bash
       npm run start
       ```
     - **Plan**: Free

2. Add all environment variables as shown above

---

## Part 4: Database Migration & Seeding

### Step 1: Run Migrations

Render will automatically run migrations during build if configured correctly.

To manually run migrations:
1. Go to Render Dashboard → Your Service
2. Click **"Shell"** tab
3. Run:
   ```bash
   npx prisma migrate deploy
   ```

### Step 2: Seed Database

In Render Shell:
```bash
npm run prisma:seed
```

This will create:
- 4 product categories
- 5 sample products
- Admin user (email: `admin@ddsttstechhive.com`, password: `admin123`)

**⚠️ IMPORTANT**: Change admin password after first login!

---

## Part 5: Post-Deployment Configuration

### 1. Configure Custom Domain (Optional)

1. In Render, go to **Settings** → **Custom Domains**
2. Add your domain (e.g., `www.ddsttstechhive.com`)
3. Update DNS records as shown by Render
4. Update `NEXTAUTH_URL` environment variable

### 2. Set up SSL Certificate

Render provides automatic SSL certificates via Let's Encrypt. No action needed!

### 3. Configure Paystack Webhooks

1. Go to [Paystack Dashboard](https://dashboard.paystack.com)
2. Navigate to **Settings** → **Webhooks**
3. Add webhook URL:
   ```
   https://your-app.onrender.com/api/webhooks/paystack
   ```

### 4. Enable Email Notifications

**For Gmail:**
1. Go to Google Account → Security
2. Enable **2-Step Verification**
3. Generate **App Password**
4. Use app password in `SMTP_PASSWORD` env variable

**Alternative: Use SendGrid**
- Sign up at [sendgrid.com](https://sendgrid.com)
- Get API key
- Update SMTP settings in env variables

---

## Part 6: Monitoring & Maintenance

### Check Application Health

1. Visit: `https://your-app.onrender.com`
2. Check Render Dashboard for:
   - Build logs
   - Deploy logs
   - Runtime logs

### Monitor Database

1. Go to Neon Console
2. Check **Monitoring** tab for:
   - Connection count
   - Query performance
   - Storage usage

### View Logs

In Render Dashboard:
- Click **"Logs"** tab
- Filter by error level
- Set up log drains for production monitoring

---

## Part 7: Optimization Tips

### 1. Enable Render Autoscaling (Paid plans)
- Handles traffic spikes automatically

### 2. Set up Neon Autoscaling
- Free tier includes autoscaling
- Automatically adjusts compute resources

### 3. Configure Caching
- Already implemented in application
- Consider adding Redis (Upstash) for session storage

### 4. Set up CDN
- Use Cloudflare for static assets
- Improve global performance

---

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong `NEXTAUTH_SECRET`
- [ ] Enable Neon IP allowlist (optional)
- [ ] Set up Render environment groups
- [ ] Enable 2FA on admin accounts
- [ ] Configure CSP headers (already done)
- [ ] Use production Paystack keys
- [ ] Set up error monitoring (Sentry)

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Prisma client not generated`
```bash
# Add to build command:
npx prisma generate
```

**Error**: `Database connection failed`
- Check `DATABASE_URL` is correct
- Verify Neon database is running
- Check IP allowlist settings

### Runtime Issues

**Error**: `NEXTAUTH_URL is not set`
- Add `NEXTAUTH_URL` to environment variables
- Restart service

**Error**: `Database connection timeout`
- Use `DIRECT_URL` for migrations
- Use `DATABASE_URL` (pooled) for application

### Email Not Sending

- Verify SMTP credentials
- Check Gmail app password
- Enable less secure apps (if not using app password)

---

## 📊 Free Tier Limits

### Render Free Tier
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic SSL
- ✅ Auto-deploys from Git
- ⚠️ Spins down after 15 min inactivity
- ⚠️ 512MB RAM

### Neon Free Tier
- ✅ 3 projects
- ✅ 0.5GB storage per project
- ✅ Autoscaling and autosuspend
- ✅ Connection pooling
- ⚠️ 100 hours compute/month

---

## 🚀 Going to Production Checklist

- [ ] Push code to GitHub
- [ ] Create Neon database
- [ ] Deploy to Render
- [ ] Add all environment variables
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Test payment flow
- [ ] Configure webhooks
- [ ] Set up monitoring
- [ ] Change admin password
- [ ] Test email notifications
- [ ] Add custom domain (optional)
- [ ] Set up analytics

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma + Neon**: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-neon

---

## 🎉 Success!

Your application is now live at: `https://your-app-name.onrender.com`

**Default Admin Credentials:**
- Email: `admin@ddsttstechhive.com`
- Password: `admin123` (CHANGE THIS!)

Enjoy your production deployment! 🚀
