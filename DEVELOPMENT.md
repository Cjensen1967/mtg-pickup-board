# Development Plan & Roadmap

This document outlines the technical implementation plan for the MTG Pickup Board & Trading Post.

## Phase 1: Core Structure & Trading Feature

1.  **Update HTML Structure (`index.html`):**
    *   Create a tabbed interface with "Find Games" and "Trade Cards" sections.
    *   Add a new form for creating trade posts.
    *   Add a new container for displaying trade post listings.

2.  **Update Database Schema (`setup.sql`):**
    *   Create a new `trade_posts` table with columns for `player_name`, `location`, `have`, `want`, `notes`, and `contact`.
    *   Add Row Level Security policies for `trade_posts` to allow anonymous read and insert access.

3.  **Update JavaScript Logic (`script.js`):**
    *   Implement tab switching logic to show/hide the correct content.
    *   Create a new function to handle the submission of trade posts.
    *   Create new functions to fetch and display trade posts.
    *   Update the real-time subscription to listen for changes to both `game_posts` and `trade_posts`.

## Phase 2: Professional Polish & UX

1.  **Improve UI/UX:**
    *   Add loading indicators while data is being fetched.
    *   Display user-friendly error messages for form submissions and data fetching.
    *   Implement basic, non-intrusive form validation with clear feedback.
    *   Add a "time posted" display (e.g., "posted 5 minutes ago") for all posts.
    *   Improve visual hierarchy, spacing, and mobile responsiveness.

2.  **Enhance Styling (`style.css`):**
    *   Refine the dark theme for better readability and aesthetics.
    *   Add subtle transitions for a smoother user experience.
    *   Ensure all new elements match the established style guide.

3.  **Add Quality-of-Life Features:**
    *   Add a favicon and meta tags for better sharing on social media.
    *   Pre-fill the "Preferred Time" input to a reasonable default (e.g., one hour from now).
    *   Add a simple "About" or "How to Use" section in the footer.

## Phase 3: Security & Data Management

1.  **Enhance Security:**
    *   **Crucial:** Abstract Supabase credentials. While we can't use traditional environment variables in a pure static site without a build step, we will add a separate, clearly marked `config.js` file and add it to `.gitignore` to keep credentials out of version control. The `README.md` will be updated to reflect this.
    *   Implement basic input sanitization on the client-side to prevent simple injection attacks.

2.  **Implement Data Management:**
    *   Create a Supabase database function (`cron job`) to automatically delete posts older than a specified duration (e.g., 7 days) to keep the board clean.

## Future Considerations (Post-MVP)

*   **Filtering & Sorting:** Allow users to filter posts by location or format.
*   **Search:** A simple text search for posts.
*   **Moderation:** A simple "report post" button that flags posts for manual review in the Supabase dashboard.
