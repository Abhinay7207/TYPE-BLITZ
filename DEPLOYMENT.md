# Deployment Guide

## Step 1: Push to GitHub

### Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name your repository: `typeblitz` (or any name you prefer)
3. Keep it **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license
5. Click **Create repository**

### Push Your Code
Once you have the repository URL, run:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

Replace `YOUR_GITHUB_REPO_URL` with the URL from GitHub (e.g., `https://github.com/yourusername/typeblitz.git`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your `typeblitz` repository
5. Vercel will auto-detect Next.js
6. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://hawcvivpntlbvwprvzdk.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2N2aXZwbnRsYnZ3cHJ2emRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODcwNzUsImV4cCI6MjA3OTc2MzA3NX0.Qjefd_yFgKEYeTfdHYUc90mIlbDmvGLBDjwyboeiSpM`
7. Click **Deploy**
8. Wait 2-3 minutes
9. Your app will be live at `https://typeblitz-xxx.vercel.app`

### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add the environment variables when asked.

## Step 3: Update Supabase Settings

After deployment, update your Supabase project:

1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
4. Add to **Redirect URLs**: `https://your-app.vercel.app/**`

## Done! 🎉

Your TypeBlitz app is now:
- ✅ Pushed to GitHub
- ✅ Deployed to Vercel
- ✅ Accessible worldwide
- ✅ Auto-deploys on every push to main branch

Share your live URL with friends and compete on the leaderboard!
