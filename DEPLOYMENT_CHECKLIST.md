# 🚀 Deployment Checklist

## Pre-Deployment

### Code Preparation
- [x] All pages built and tested
- [x] Performance optimizations implemented
- [x] Security headers configured
- [x] Environment variables documented
- [x] Database schema finalized
- [x] Seed data script created
- [ ] Run production build locally: `npm run build`
- [ ] Test production build: `npm run start`

### Configuration Files
- [x] `.env.example` created with all variables
- [x] `.gitignore` updated (excludes .env files)
- [x] `render-blueprint.yaml` configured
- [x] `render.yaml` created
- [x] `prisma/schema.prisma` uses directUrl
- [x] `package.json` has all deployment scripts
- [x] Health check endpoint created

---

## Database Setup (Neon)

- [ ] Create Neon account: https://neon.tech
- [ ] Create new project: `dds-tts-tech-hive`
- [ ] Select region (US East recommended)
- [ ] Copy **Pooled Connection String** → `DATABASE_URL`
- [ ] Copy **Direct Connection String** → `DIRECT_URL`
- [ ] Enable connection pooling
- [ ] Note database credentials securely

---

## Application Deployment (Render)

### Initial Setup
- [ ] Push code to GitHub repository
- [ ] Create Render account: https://render.com
- [ ] Connect GitHub account to Render
- [ ] Create new Web Service (or use Blueprint)

### Service Configuration
**Build Settings:**
- [ ] Runtime: `Node`
- [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
- [ ] Start Command: `npm run start`
- [ ] Branch: `main`
- [ ] Region: `Oregon` (free tier)

**Environment Variables:**
- [ ] `DATABASE_URL` = <Neon pooled connection>
- [ ] `DIRECT_URL` = <Neon direct connection>
- [ ] `NEXTAUTH_SECRET` = <generate: `openssl rand -base64 32`>
- [ ] `NEXTAUTH_URL` = https://your-app.onrender.com
- [ ] `NODE_ENV` = production
- [ ] `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` = pk_live_xxx (if ready)
- [ ] `PAYSTACK_SECRET_KEY` = sk_live_xxx (if ready)
- [ ] `SMTP_HOST` = smtp.gmail.com
- [ ] `SMTP_PORT` = 587
- [ ] `SMTP_USER` = your-email@gmail.com
- [ ] `SMTP_PASSWORD` = your-app-password
- [ ] `EMAIL_FROM` = "DDS & TTS Tech Hive <noreply@ddsttstechhive.com>"

---

## Post-Deployment

### Database
- [ ] Wait for first successful deploy
- [ ] Open Render Shell
- [ ] Run: `npm run prisma:seed`
- [ ] Verify admin user created
- [ ] Test database connection via health check: `/api/health`

### Application Testing
- [ ] Visit: https://your-app.onrender.com
- [ ] Homepage loads correctly
- [ ] Shop page displays products
- [ ] Product detail pages work
- [ ] Add to cart functionality
- [ ] Cart persists on refresh
- [ ] Checkout form displays
- [ ] Profile page accessible
- [ ] Admin dashboard loads

### Admin Access
- [ ] Login with: `admin@ddsttstechhive.com` / `admin123`
- [ ] ⚠️ **IMMEDIATELY CHANGE PASSWORD**
- [ ] Test admin product management
- [ ] Test order viewing
- [ ] Test repair booking management

---

## Third-Party Integrations

### Paystack (Payment)
- [ ] Sign up: https://dashboard.paystack.com
- [ ] Get test keys (for testing)
- [ ] Get live keys (for production)
- [ ] Add webhook URL: `https://your-app.onrender.com/api/webhooks/paystack`
- [ ] Test payment flow with test card
- [ ] Switch to live keys when ready

### Email (Gmail/SMTP)
- [ ] Enable 2-Step Verification on Gmail
- [ ] Generate App Password
- [ ] Add to `SMTP_PASSWORD` env variable
- [ ] Send test email (order confirmation)
- [ ] Verify email delivery

### WhatsApp Business API (Optional)
- [ ] Sign up for WhatsApp Business API
- [ ] Get credentials
- [ ] Add to environment variables
- [ ] Test notification sending

---

## Optimization & Monitoring

### Performance
- [ ] Test with Google Lighthouse (target: >90)
- [ ] Check loading speed
- [ ] Verify images are optimized (AVIF/WebP)
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals

### Monitoring
- [ ] Set up Render auto-deploy from main branch
- [ ] Configure log drains (optional)
- [ ] Set up error monitoring (Sentry - optional)
- [ ] Add Google Analytics (optional)
- [ ] Monitor database usage in Neon dashboard

### Security
- [ ] SSL certificate auto-enabled (Render does this)
- [ ] Security headers verified
- [ ] Admin password changed
- [ ] API keys secured
- [ ] No sensitive data in logs

---

## Domain & SSL (Optional)

- [ ] Purchase custom domain
- [ ] Add domain in Render settings
- [ ] Update DNS records (A/CNAME)
- [ ] Update `NEXTAUTH_URL` to custom domain
- [ ] SSL certificate auto-provisions
- [ ] Verify domain is working

---

## Maintenance

### Regular Tasks
- [ ] Monitor Render free tier hours (750/month)
- [ ] Monitor Neon compute hours (100/month free)
- [ ] Check database storage usage
- [ ] Review application logs weekly
- [ ] Update dependencies monthly: `npm update`
- [ ] Backup database (Neon has auto-backups)

### Scaling Considerations
**When to Upgrade:**
- Traffic exceeds free tier limits
- Need faster response times (no spin down)
- Require more database storage
- Need better support

**Render Paid Plans:**
- Starter: $7/month (512MB RAM, no spin down)
- Standard: $25/month (2GB RAM)

**Neon Paid Plans:**
- Pro: $19/month (more compute, storage, support)

---

## Troubleshooting Reference

### Build Fails
```bash
# Check these in Render logs:
- Prisma client generation
- Database connection
- Environment variables set
- Dependencies installed
```

### Runtime Errors
```bash
# Check health endpoint:
GET https://your-app.onrender.com/api/health

# Should return:
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "...",
  "uptime": 123
}
```

### Database Issues
- Verify connection strings
- Check Neon dashboard (database running?)
- Ensure SSL mode enabled
- Use DIRECT_URL for migrations

---

## Success Criteria ✅

Your deployment is successful when:

- ✅ Application loads at your Render URL
- ✅ Database connected (check /api/health)
- ✅ Products display on shop page
- ✅ Cart functionality works
- ✅ Admin login successful
- ✅ No errors in Render logs
- ✅ Lighthouse score >90
- ✅ Payment flow tested (with test keys)
- ✅ Email notifications working

---

## 🎉 Going Live Checklist

Before announcing to users:

- [ ] All features tested
- [ ] Payment flow verified (with live keys)
- [ ] Email notifications working
- [ ] Admin password secured
- [ ] Custom domain configured (optional)
- [ ] Analytics tracking (optional)
- [ ] Error monitoring setup (optional)
- [ ] Backup strategy confirmed
- [ ] Support channels ready (email/phone)
- [ ] Terms of Service & Privacy Policy pages
- [ ] GDPR compliance (if applicable)

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs/introduction
- **Prisma Deploy**: https://www.prisma.io/docs/guides/deployment
- **Next.js Deploy**: https://nextjs.org/docs/deployment

**Your Deployment URLs:**
- App: `https://your-app-name.onrender.com`
- Health: `https://your-app-name.onrender.com/api/health`
- Admin: `https://your-app-name.onrender.com/admin`

---

**Good luck with your deployment! 🚀**
