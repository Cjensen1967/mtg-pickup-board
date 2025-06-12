# Troubleshooting Guide

This guide helps resolve common issues you might encounter with the MTG Pickup Board & Trading Post application.

## Common Issues & Solutions

### 🚫 Application Won't Load

**Symptoms:**
- Blank page or "Loading..." that never finishes
- Console errors about modules or CORS

**Solutions:**

1. **Check if you're running a local server:**
   ```bash
   # Use Python's built-in server
   python -m http.server 8000
   
   # Or use Node.js if you have it
   npx serve .
   
   # Or use PHP if available
   php -S localhost:8000
   ```
   Then visit `http://localhost:8000` (not `file://`)

2. **Verify config.js exists:**
   - Ensure you've created `config.js` from `config.example.js`
   - Check that it contains valid Supabase credentials

3. **Check browser console:**
   - Press F12 → Console tab
   - Look for red error messages
   - Common errors and fixes below

### 🔑 Supabase Connection Issues

**Symptoms:**
- "Could not load posts" messages
- Console errors mentioning Supabase or network
- Forms submit but nothing happens

**Solutions:**

1. **Verify Supabase credentials:**
   ```javascript
   // config.js should look like this:
   const supabaseUrl = 'https://your-project.supabase.co';
   const supabaseKey = 'your-anon-key-here';
   export { supabaseUrl, supabaseKey };
   ```

2. **Check Supabase project status:**
   - Go to your Supabase dashboard
   - Ensure project is not paused
   - Check if you've exceeded free tier limits

3. **Verify database setup:**
   - Go to Supabase → SQL Editor
   - Run this query to check if tables exist:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('game_posts', 'trade_posts');
   ```
   - Should return both table names

4. **Check RLS policies:**
   ```sql
   -- Verify policies exist
   SELECT schemaname, tablename, policyname 
   FROM pg_policies 
   WHERE tablename IN ('game_posts', 'trade_posts');
   ```

### 📝 Forms Not Submitting

**Symptoms:**
- Click "Post Game" or "Post Trade" but nothing happens
- Form validation errors that won't clear
- Button stays in "Posting..." state

**Solutions:**

1. **Check required fields:**
   - All fields except "Notes" are required
   - Ensure dropdown selections are properly made
   - Try refreshing and filling form again

2. **Browser console errors:**
   - Check for JavaScript errors
   - Look for network request failures

3. **Test with minimal data:**
   ```
   Name: Test
   Location: Seattle
   Format: Commander (for games)
   Time: Any future time
   Notes: (leave empty)
   ```

### 🔄 Real-time Updates Not Working

**Symptoms:**
- New posts don't appear automatically
- Need to refresh page to see updates
- Other users' posts don't show up

**Solutions:**

1. **Check WebSocket connection:**
   - Open browser console → Network tab
   - Look for WebSocket connections to Supabase
   - Should see successful WebSocket handshake

2. **Verify Supabase real-time is enabled:**
   - Go to Supabase dashboard → Settings → API
   - Ensure "Realtime" is enabled

3. **Test in incognito mode:**
   - Sometimes browser extensions block WebSockets
   - Try in private/incognito window

### 🎨 Styling Issues

**Symptoms:**
- Layout looks broken
- Missing styles or colors
- Mobile view doesn't work properly

**Solutions:**

1. **Check Tailwind CSS loading:**
   - Verify this line exists in `index.html`:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```

2. **Clear browser cache:**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache completely

3. **Check custom CSS:**
   - Verify `style.css` is loading
   - Look for CSS errors in browser console

### 📱 Mobile Issues

**Symptoms:**
- App doesn't work well on mobile
- Touch interactions not working
- Layout broken on small screens

**Solutions:**

1. **Check viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. **Test responsive design:**
   - Use browser dev tools → Device toolbar
   - Test various screen sizes

3. **Check touch events:**
   - Ensure buttons are large enough (44px minimum)
   - Test form interactions on actual mobile device

### 🕒 Time Display Issues

**Symptoms:**
- Times showing incorrectly
- "NaN" or invalid date displays
- Timezone problems

**Solutions:**

1. **Check date format:**
   - Ensure datetime-local input is properly formatted
   - Verify browser supports datetime-local

2. **Timezone considerations:**
   - All times stored in UTC in database
   - Display times converted to user's local timezone

### 🗄️ Database Issues

**Symptoms:**
- Old posts not being deleted
- Database growing too large
- Performance issues

**Solutions:**

1. **Verify cron job setup:**
   - Go to Supabase → Database → Cron Jobs
   - Check if `delete_old_posts` job exists and is running

2. **Manually clean old posts:**
   ```sql
   -- Run this in Supabase SQL Editor if needed
   SELECT delete_old_posts();
   ```

3. **Check post count:**
   ```sql
   SELECT 
     'game_posts' as table_name, 
     COUNT(*) as count,
     MIN(created_at) as oldest,
     MAX(created_at) as newest
   FROM game_posts
   UNION ALL
   SELECT 
     'trade_posts' as table_name, 
     COUNT(*) as count,
     MIN(created_at) as oldest,
     MAX(created_at) as newest
   FROM trade_posts;
   ```

## Deployment-Specific Issues

### Netlify/Vercel Issues

**Environment Variables:**
- Ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
- Check that build process isn't failing
- Verify domain configuration

**Build Errors:**
- This is a static site - no build process needed
- Ensure publish directory is set to `/` (root)

### GitHub Pages Issues

**HTTPS Required:**
- GitHub Pages enforces HTTPS
- Ensure Supabase allows HTTPS connections

**Path Issues:**
- If using a project page (not user page), check base paths
- Ensure all links are relative

## Getting Help

If you're still experiencing issues:

1. **Check browser console** for specific error messages
2. **Test in different browsers** to isolate browser-specific issues
3. **Verify Supabase dashboard** for any service issues
4. **Test locally first** before troubleshooting deployment issues

## Useful Commands

**Check if local server is running:**
```bash
# Check what's running on port 8000
netstat -an | grep 8000
```

**Test Supabase connection:**
```javascript
// Run this in browser console
fetch('https://your-project.supabase.co/rest/v1/game_posts?select=*', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': 'Bearer your-anon-key'
  }
}).then(r => r.json()).then(console.log);
```

**Clear all browser data for testing:**
- Chrome: Settings → Privacy → Clear browsing data
- Firefox: Settings → Privacy → Clear Data
- Safari: Develop → Empty Caches

## Performance Tips

- **Monitor Supabase usage** to avoid hitting free tier limits
- **Implement pagination** if you expect high post volume
- **Consider CDN** for faster global loading
- **Optimize images** if you add any in the future

Remember: Most issues are related to configuration rather than code bugs, since the application has been thoroughly tested.
