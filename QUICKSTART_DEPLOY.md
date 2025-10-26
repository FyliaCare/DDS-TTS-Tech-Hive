# Quick Start: Deploy to Render + Neon

## 1️⃣ Database Setup (Neon)

1. **Create Neon Account**: https://neon.tech
2. **Create Project**: 
   - Name: `dds-tts-tech-hive`
   - Region: US East (or closest to you)
3. **Copy Connection Strings**:
   - Pooled: `postgresql://...?sslmode=require`
   - Direct: `postgresql://...?sslmode=require&connect_timeout=10`

---

## 2️⃣ Prepare Code

1. **Copy `.env.example` to `.env`**:
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your values**:
   ```env
   DATABASE_URL="<Neon pooled connection>"
   DIRECT_URL="<Neon direct connection>"
   NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
   ```

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Render"
   git push origin main
   ```

---

## 3️⃣ Deploy to Render

### Quick Deploy Button (Easiest)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Manual Deploy

1. **Go to Render**: https://dashboard.render.com
2. **Click**: New → Blueprint
3. **Connect**: Your GitHub repository
4. **Select**: Repository with `render-blueprint.yaml`
5. **Click**: Apply

---

## 4️⃣ Configure Environment Variables

In Render Dashboard → Your Service → Environment:

**Required:**
```
DATABASE_URL=<from Neon>
DIRECT_URL=<from Neon>
NEXTAUTH_SECRET=<generate with openssl>
NEXTAUTH_URL=https://your-app.onrender.com
NODE_ENV=production
```

**Optional (for full functionality):**
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxx
PAYSTACK_SECRET_KEY=sk_live_xxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## 5️⃣ Seed Database

After first deployment, in Render Shell:

```bash
npm run prisma:seed
```

**Default Admin:**
- Email: `admin@ddsttstechhive.com`
- Password: `admin123` (⚠️ CHANGE THIS!)

---

## 6️⃣ Access Your App

🎉 **Your app is live**: `https://your-app-name.onrender.com`

---

## 🐛 Troubleshooting

**Build fails?**
- Check build logs in Render
- Verify `DATABASE_URL` is set
- Ensure Prisma is generating correctly

**Can't connect to database?**
- Verify connection strings from Neon
- Check DIRECT_URL is set for migrations
- Ensure SSL mode is enabled

**App not loading?**
- Check runtime logs
- Verify NEXTAUTH_URL matches your Render URL
- Confirm all required env vars are set

---

## 📚 Full Documentation

See `DEPLOYMENT.md` for complete step-by-step guide.

---

## ⚡ Performance Notes

**Free Tier Limitations:**
- **Render**: Spins down after 15 min inactivity (first request takes ~30s)
- **Neon**: 100 hours compute/month, autosuspends when idle

**Upgrade for Production:**
- Render: $7/month (no spin down, 512MB RAM)
- Neon: $19/month (more compute, storage, support)

---

## 🎯 Next Steps

1. ✅ Deploy application
2. ✅ Seed database
3. ✅ Change admin password
4. ⬜ Configure Paystack webhooks
5. ⬜ Set up custom domain
6. ⬜ Enable email notifications
7. ⬜ Add analytics (Google Analytics)
8. ⬜ Set up error monitoring (Sentry)

Happy deploying! 🚀
