# Netlify Deployment Steps for MTG Pickup Board

Your project is now ready for deployment! Follow these steps to get it live on Netlify.

## ✅ What's Already Done

- ✅ Git repository initialized and committed
- ✅ Code modified to use environment variables in production
- ✅ Netlify configuration file (`netlify.toml`) created
- ✅ Build script (`build-env.js`) created for environment injection
- ✅ Sensitive credentials excluded from git (config.js is gitignored)

## 🚀 Deployment Steps

### Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it something like `mtg-pickup-board` or `cardconnect-nw`
   - Make it **public** (required for free Netlify)
   - **Don't** initialize with README (we already have one)

2. **Connect your local repo to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Netlify

1. **Go to [netlify.com](https://netlify.com) and sign up/login**

2. **Click "New site from Git"**

3. **Connect to GitHub and select your repository**

4. **Configure build settings:**
   - Build command: `node build-env.js` (should auto-populate from netlify.toml)
   - Publish directory: `.` (should auto-populate from netlify.toml)
   - Click "Deploy site"

### Step 3: Configure Environment Variables

1. **In your Netlify dashboard, go to:**
   - Site settings → Environment variables

2. **Add these environment variables:**
   - Key: `SUPABASE_URL`
   - Value: `https://hcxvxqcbnyioofqymffe.supabase.co`
   
   - Key: `SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHZ4cWNibnlpb29mcXltZmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTgyODEsImV4cCI6MjA2NTI5NDI4MX0.UA1_Q3OzTji61JesUVHps5W1lwnOPPkidqVB8F8xkSg`

3. **Trigger a new deploy:**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

### Step 4: Test Your Live Site

Once deployed, test these features:
- [ ] Site loads correctly
- [ ] Both "Let's Play" and "Trade Cards" tabs work
- [ ] Forms submit successfully
- [ ] Posts display correctly
- [ ] Real-time updates work
- [ ] Filters work properly

### Step 5: Set Up Custom Domain (Optional)

1. **In Netlify dashboard:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Follow the DNS configuration instructions

## 🔧 Troubleshooting

**If the site doesn't work:**
1. Check the deploy logs in Netlify for errors
2. Verify environment variables are set correctly
3. Check browser console for JavaScript errors
4. Ensure your Supabase project is active and accessible

**If real-time updates don't work:**
1. Check that your Supabase project has real-time enabled
2. Verify the database tables exist and have proper RLS policies

## 📱 Next Steps After Deployment

1. **Set up Supabase cron job** (if not already done):
   - Go to your Supabase dashboard
   - Database → Cron Jobs
   - Create job: `delete_old_posts` running daily at `0 0 * * *`

2. **Share your site:**
   - Your site will be live at `https://YOUR_SITE_NAME.netlify.app`
   - Share with your MTG community!

3. **Monitor usage:**
   - Check Netlify analytics
   - Monitor Supabase usage and costs

## 🎉 You're Done!

Your MTG Pickup Board is now live and ready for your community to use!
