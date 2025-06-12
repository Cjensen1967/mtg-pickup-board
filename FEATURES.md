# Feature Specifications

This document provides detailed specifications for the features of the MTG Pickup Board & Trading Post.

## Core Features

### 1. Find Games

*   **User Story:** As a player, I want to post a request for a game so that other local players can see it and connect with me.
*   **Functionality:**
    *   A form to submit game requests.
    *   Fields: `Player Name/Handle`, `Location`, `Format`, `Preferred Time`, `Notes`.
    *   All fields are required except for `Notes`.
    *   A real-time, reverse chronological feed of all game posts.

### 2. Trade Cards

*   **User Story:** As a player, I want to post a list of cards I have and want, so I can find local trading partners.
*   **Functionality:**
    *   A form to submit trade listings.
    *   Fields: `Player Name/Handle`, `Location`, `Contact Info` (e.g., Discord username), `Have` (cards for trade), `Want` (cards sought), `Notes`.
    *   All fields are required except for `Notes`.
    *   A real-time, reverse chronological feed of all trade posts.

## Professional Polish & UX Features

### 1. Loading & Error States

*   **User Story:** As a user, I want to see that the app is working (loading) and receive clear messages if something goes wrong.
*   **Functionality:**
    *   A loading spinner or message will be displayed while initial posts are being fetched.
    *   If fetching fails, a user-friendly error message will be shown (e.g., "Could not load posts. Please check your connection and try again.").
    *   On form submission, the submit button will be disabled to prevent multiple submissions.
    *   If a submission fails, an alert will notify the user.

### 2. Time Formatting

*   **User Story:** As a user, I want to know when a post was made to judge its relevance.
*   **Functionality:**
    *   Each post will display a relative timestamp (e.g., "posted 10 minutes ago", "posted 2 hours ago").
    *   The `preferred_time` for games will be formatted in a user-friendly way (e.g., "June 12, 2025, 7:30 PM").

### 3. Favicon & Meta Tags

*   **User Story:** As a user, I want to see a proper icon in my browser tab and have links share nicely on social media.
*   **Functionality:**
    *   A custom favicon will be added.
    *   HTML meta tags (`og:title`, `og:description`, etc.) will be added to `index.html` for better link previews.

## Security & Data Management

### 1. Credential Security

*   **User Story:** As the site owner, I want to ensure my Supabase credentials are not publicly visible in the GitHub repository.
*   **Functionality:**
    *   Supabase URL and anon key will be moved to a `config.js` file.
    *   `config.js` will be added to `.gitignore`.
    *   The `README.md` will instruct users to create their own `config.js` file.

### 2. Automated Post Deletion

*   **User Story:** As a user, I want the board to stay relevant and not be cluttered with old, expired posts.
*   **Functionality:**
    *   A scheduled database function will run daily to delete any posts older than 7 days.

## Future Considerations (Maybe Later)

*   **Filtering:** Dropdown menus to filter posts by `Location` or `Format`.
*   **Search:** A simple input field to search post content.
*   **Reporting:** A "Report" button on each post that flags it for admin review in the Supabase dashboard.
