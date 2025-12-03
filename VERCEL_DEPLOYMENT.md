# Vercel Deployment Guide

This guide will help you deploy the GhadeerFit frontend to Vercel.

## Prerequisites

1. A GitHub account with the frontend repository pushed
2. A Vercel account (sign up at https://vercel.com if you don't have one)
3. Your backend API URL (where your backend is deployed)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Find and select `ghadeerfit-frontend` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (keep as is)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add the following variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-api-url.com/api
     ```
   - Replace `https://your-backend-api-url.com/api` with your actual backend API URL
   - Make sure to add it for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at a URL like: `https://ghadeerfit-frontend.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name: `ghadeerfit-frontend` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings? **No**

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   - Select environments: Production, Preview, Development
   - Enter your backend API URL: `https://your-backend-api-url.com/api`

6. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.yourdomain.com/api` |

### Setting Environment Variables in Vercel Dashboard

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend API URL
   - **Environments**: Select all (Production, Preview, Development)

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### Update Backend CORS Settings

Make sure your backend allows requests from your Vercel domain:

1. Update your backend `.env` file:
   ```env
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

2. Or update CORS configuration in your backend code to include your Vercel domain.

## Troubleshooting

### Build Failures

If the build fails, check:

1. **Build Logs**: View detailed error messages in Vercel dashboard
2. **Environment Variables**: Ensure all required variables are set
3. **Node Version**: Check if your project requires a specific Node.js version
   - Add `engines` to `package.json`:
     ```json
     "engines": {
       "node": ">=18.0.0"
     }
     ```

### API Connection Issues

1. **Check API URL**: Verify `NEXT_PUBLIC_API_URL` is correct
2. **CORS Errors**: Ensure backend allows your Vercel domain
3. **HTTPS**: Make sure your backend API uses HTTPS in production

### Image Loading Issues

If images from the backend don't load:

1. Update `next.config.js` to include your backend domain in `remotePatterns`
2. Or update the image domain in Vercel dashboard → Settings → Next.js → Images

## Continuous Deployment

Vercel automatically deploys your app when you push to GitHub:

- **Production**: Deploys from `main` branch
- **Preview**: Creates preview deployments for pull requests

To configure branches:
1. Go to Settings → Git
2. Configure production branch (default: `main`)
3. Configure preview deployments

## Monitoring

Vercel provides built-in analytics and monitoring:

1. **Analytics**: View page views, performance metrics
2. **Logs**: Real-time function and build logs
3. **Speed Insights**: Performance monitoring

Access these from your project dashboard.

## Next Steps

After deployment:

1. ✅ Test all features on the production URL
2. ✅ Verify API connections work correctly
3. ✅ Check mobile responsiveness
4. ✅ Set up custom domain (optional)
5. ✅ Configure analytics (optional)

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- GitHub Issues: Create an issue in your repository

---

**Your frontend is now live on Vercel! 🚀**

