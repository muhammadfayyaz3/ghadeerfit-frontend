# Quick Vercel Deployment Steps

## 🚀 Deploy Now (5 minutes)

### Step 1: Go to Vercel
Visit: https://vercel.com/new

### Step 2: Import Repository
1. Sign in with GitHub
2. Click "Import" next to `ghadeerfit-frontend` repository
   - Or search for: `muhammadfayyaz3/ghadeerfit-frontend`

### Step 3: Configure
- **Framework Preset**: Next.js (auto-detected) ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

### Step 4: Add Environment Variable
Click "Environment Variables" and add:

**Key**: `NEXT_PUBLIC_API_URL`  
**Value**: `https://your-backend-api-url.com/api`

⚠️ **Important**: Replace with your actual backend API URL

Select environments: ✅ Production ✅ Preview ✅ Development

### Step 5: Deploy!
Click "Deploy" button

### Step 6: Wait for Build
- Build will take 2-3 minutes
- Watch the logs for any errors

### Step 7: Your App is Live! 🎉
You'll get a URL like: `https://ghadeerfit-frontend.vercel.app`

---

## 📝 After Deployment

1. **Test your app**: Visit the deployment URL
2. **Check API connection**: Make sure backend is accessible
3. **Set up custom domain** (optional): Project Settings → Domains

## 🔧 Troubleshooting

**Build fails?**
- Check environment variables are set
- Check build logs in Vercel dashboard

**API not working?**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Make sure backend allows CORS from Vercel domain

**Need help?** Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide

