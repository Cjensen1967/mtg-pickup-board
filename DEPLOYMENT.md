# Deployment Guide

This guide provides step-by-step instructions for deploying the MTG Pickup Board & Trading Post to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:
- ✅ A working Supabase project with the database schema set up
- ✅ Your `config.js` file configured with valid Supabase credentials
- ✅ Tested the application locally and verified all features work

## Deployment Options

### Option 1: Netlify (Recommended)

Netlify is ideal for static sites and provides easy deployment from GitHub.

#### Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your MTG Pickup Board repository

3. **Configure Build Settings:**
   - Build command: Leave empty (static site)
   - Publish directory: `/` (root directory)
   - Click "Deploy site"

4. **Configure Environment Variables:**
   - Go to Site settings → Environment variables
   - Add the following variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_ANON_KEY`: Your Supabase anonymous key

5. **Update config.js for Production:**
   - Modify your `script.js` to use environment variables in production
   - Or create a production `config.js` with your credentials

#### Custom Domain (Optional):
- Go to Site settings → Domain management
- Add your custom domain
- Configure DNS settings as instructed

### Option 2: Vercel

Vercel is another excellent option for static site deployment.

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure Environment Variables:**
   - Go to your Vercel dashboard
   - Select your project → Settings → Environment Variables
   - Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### Option 3: GitHub Pages

For a completely free option using GitHub Pages.

#### Steps:

1. **Create gh-pages branch:**
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Select `/ (root)` folder

3. **Configure Supabase Credentials:**
   - Since GitHub Pages doesn't support environment variables, you'll need to:
   - Create a production `config.js` with your credentials
   - **Important:** Only do this for public, non-sensitive projects

### Option 4: Traditional Web Hosting

For shared hosting or VPS deployment.

#### Steps:

1. **Build the site:**
   - No build step required - it's a static site

2. **Upload files:**
   - Upload all files except `node_modules` (if any)
   - Ensure `config.js` contains your production credentials

3. **Configure web server:**
   - Ensure your web server serves the `index.html` file
   - Configure HTTPS (recommended)

## Post-Deployment Checklist

After deploying, verify the following:

### ✅ Functionality Tests
- [ ] Site loads correctly
- [ ] Both "Find Games" and "Trade Cards" tabs work
- [ ] Forms submit successfully
- [ ] Posts display correctly
- [ ] Real-time updates work
- [ ] Time formatting displays properly

### ✅ Supabase Configuration
- [ ] Database connection works
- [ ] Posts are being saved to the database
- [ ] RLS policies are working (anonymous access)
- [ ] Cron job for post deletion is set up

### ✅ Performance & SEO
- [ ] Site loads quickly
- [ ] Meta tags display correctly
- [ ] Favicon appears in browser tab
- [ ] Mobile responsiveness works

## Supabase Cron Job Setup

Don't forget to set up the automated post deletion:

1. **Go to your Supabase dashboard**
2. **Navigate to Database → Cron Jobs**
3. **Create a new cron job:**
   - Name: `Delete Old Posts`
   - Schedule: `0 0 * * *` (daily at midnight)
   - Function: `delete_old_posts`

## Troubleshooting

### Common Issues:

**CORS Errors:**
- Ensure you're serving the site from a web server, not opening files directly
- Check that your Supabase project allows your domain

**Environment Variables Not Working:**
- Verify environment variables are set correctly in your hosting platform
- Check that your code is reading them properly

**Database Connection Issues:**
- Verify your Supabase URL and anon key are correct
- Check that RLS policies are properly configured
- Ensure your Supabase project is not paused

**Real-time Updates Not Working:**
- Check browser console for WebSocket errors
- Verify Supabase real-time is enabled for your project

## Security Considerations

### Production Security:
- ✅ Never commit `config.js` with real credentials to public repositories
- ✅ Use environment variables when possible
- ✅ Enable HTTPS on your domain
- ✅ Regularly monitor your Supabase usage and logs
- ✅ Consider implementing rate limiting if needed

### Supabase Security:
- ✅ RLS policies are properly configured
- ✅ Anonymous access is limited to read/insert only
- ✅ No sensitive data is exposed through the API

## Monitoring & Maintenance

After deployment:
- Monitor Supabase usage and costs
- Check that the cron job is running daily
- Periodically test all functionality
- Monitor for any error reports from users

## Support

If you encounter issues during deployment:
1. Check the browser console for errors
2. Verify Supabase connection and credentials
3. Test locally first to isolate deployment-specific issues
4. Check your hosting platform's documentation for static site deployment
