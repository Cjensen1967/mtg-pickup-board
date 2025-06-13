# MTG Pickup Board & Trading Post - Pacific NW

A simple, professional, and mobile-friendly community board for Magic: The Gathering players in the Pacific Northwest to find pickup games and trade cards locally.

## Project Status: ✅ COMPLETED & FULLY FUNCTIONAL

This project has been successfully implemented and is ready for deployment. All core features are working, including real-time updates, form validation, and database integration.

## Features

*   **✅ Game Finder:** Post and view pickup game requests with location, format, and time.
*   **✅ Trade Board:** Post and view trade/buy/sell listings for cards and accessories.
*   **✅ Real-Time Feed:** See new posts instantly without refreshing.
*   **✅ Anonymous & Simple:** No accounts or logins required.
*   **✅ Mobile-First:** Designed for use on the go.
*   **✅ Professional UI:** Clean, responsive design with loading states and error handling.
*   **✅ Auto-Cleanup:** Posts automatically deleted after 7 days to keep content fresh.

## Tech Stack

*   **Frontend:** HTML, Tailwind CSS, JavaScript (ES6 Modules)
*   **Backend:** Supabase (PostgreSQL Database, Real-time Subscriptions)

## Quick Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mtg-pickup-board.git
    ```

2.  **Create a Supabase project:**
    *   Go to [supabase.com](https://supabase.com/) and create a new project.
    *   In your Supabase project, go to the **SQL Editor** and run the entire SQL query in `setup.sql`.

3.  **Configure Supabase credentials:**
    *   Create `config.js` from `config.example.js`
    *   Add your Supabase URL and anon key from **Settings** -> **API**

4.  **Set up automated post deletion:**
    *   In Supabase: **Database** -> **Cron Jobs**
    *   Create daily job: `delete_old_posts` at `0 0 * * *`

5.  **Run locally:**
    ```bash
    python -m http.server
    ```
    Then visit `http://localhost:8000`

## Deployment

This project is ready for deployment to any static hosting platform.

**📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions for Netlify, Vercel, GitHub Pages, and other platforms.**

## Support

**📖 See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.**

## Project Structure

```
MTG_Pickup/
├── index.html          # Main application interface
├── style.css           # Custom styling and responsive design
├── script.js           # Application logic and Supabase integration
├── setup.sql           # Database schema and security policies
├── config.js           # Supabase configuration (user-created)
├── config.example.js   # Configuration template
├── DEPLOYMENT.md       # Detailed deployment guide
├── TROUBLESHOOTING.md  # Common issues and solutions
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This means you're free to use, modify, and distribute this code for any purpose, including commercial use. The only requirement is to include the original copyright notice and license text.
