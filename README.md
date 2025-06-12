# MTG Pickup Board & Trading Post - Pacific NW

A simple, professional, and mobile-friendly community board for Magic: The Gathering players in the Pacific Northwest to find pickup games and trade cards locally.

## Project Status: ✅ COMPLETED & FULLY FUNCTIONAL

This project has been successfully implemented and is ready for deployment. All core features are working, including real-time updates, form validation, and database integration.

## Project Mission

To provide a trustworthy, no-frills platform that strengthens the local MTG community by connecting players for games and trades through word-of-mouth sharing.

## Features

*   **✅ Game Finder:** Post and view pickup game requests with location, format, and time.
*   **✅ Trade Board:** Post and view trade/buy/sell listings for cards and accessories.
*   **✅ Real-Time Feed:** See new posts instantly without refreshing.
*   **✅ Anonymous & Simple:** No accounts or logins required.
*   **✅ Mobile-First:** Designed for use on the go.
*   **✅ Professional UI:** Clean, responsive design with loading states and error handling.
*   **✅ Auto-Cleanup:** Posts automatically deleted after 7 days to keep content fresh.

## Guiding Principles

*   **Simple but Professional:** Clean, reliable, and trustworthy.
*   **Community-Focused:** Built for local connections.
*   **No Over-Engineering:** Essential features only.

## Tech Stack

*   **Frontend:** HTML, Tailwind CSS, JavaScript (ES6 Modules)
*   **Backend:** Supabase (PostgreSQL Database, Real-time Subscriptions)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mtg-pickup-board.git
    ```
2.  **Create a Supabase project:**
    *   Go to [supabase.com](https://supabase.com/) and create a new project.
    *   In your Supabase project, go to the **SQL Editor** and run the entire SQL query in `setup.sql`. This will create the necessary tables, enable Row Level Security, and create the function for cleaning up old posts.
3.  **Configure Supabase credentials:**
    *   Create a new file named `config.js` in the root of the project.
    *   In your Supabase project, go to **Settings** -> **API**.
    *   Copy the **Project URL** and **anon key** into your `config.js` file, like this:
        ```javascript
        // config.js
        const supabaseUrl = 'YOUR_SUPABASE_URL';
        const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
        export { supabaseUrl, supabaseKey };
        ```
    *   The `config.js` file is included in the `.gitignore` to prevent you from accidentally committing your credentials.
4.  **Set up Automated Post Deletion:**
    *   In your Supabase project, go to **Database** -> **Cron Jobs**.
    *   Create a new cron job.
    *   Set the schedule (e.g., once a day at midnight: `0 0 * * *`).
    *   In the "Function to run" dropdown, select `delete_old_posts`.
5.  **Run the application locally:**
    *   This project uses ES6 modules, so you'll need to run it on a local server to avoid CORS issues.
    *   If you have Python installed, you can run the following command in the project directory:
        ```bash
        python -m http.server
        ```
    *   Then, open your browser and go to `http://localhost:8000`.

## Deployment

This project is ready to be deployed to various hosting platforms. For detailed deployment instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

### Quick Deployment Options:
- **Netlify** (Recommended) - Easy GitHub integration with environment variables
- **Vercel** - Excellent performance and developer experience  
- **GitHub Pages** - Free option for public repositories
- **Traditional Hosting** - Any web server that serves static files

### Key Deployment Steps:
1. Push your code to a GitHub repository
2. Choose a hosting platform and connect your repository
3. Configure Supabase credentials (via environment variables or production config)
4. Set up the Supabase cron job for automated post cleanup
5. Test all functionality in production

**📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions for each platform.**

## Documentation

- **[README.md](README.md)** - Project overview and setup instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide for all platforms
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[FEATURES.md](FEATURES.md)** - Feature specifications and implementation status
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development status and maintenance guide
- **[GOALS.md](GOALS.md)** - Project goals and vision

## Project Structure

```
MTG_Pickup/
├── index.html          # Main application interface
├── style.css           # Custom styling and responsive design
├── script.js           # Application logic and Supabase integration
├── setup.sql           # Database schema and security policies
├── config.js           # Supabase configuration (user-created)
├── config.example.js   # Configuration template
├── README.md           # Project overview and setup
├── DEPLOYMENT.md       # Detailed deployment guide
├── TROUBLESHOOTING.md  # Common issues and solutions
├── DEVELOPMENT.md      # Development status and maintenance
├── FEATURES.md         # Feature specifications and status
├── GOALS.md            # Project goals and vision
└── .gitignore          # Git ignore rules
```

## Need Help?

- **Setup Issues:** Follow the setup steps above carefully
- **Deployment Problems:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Technical Issues:** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Feature Questions:** Review [FEATURES.md](FEATURES.md)
