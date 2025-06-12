import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase configuration - use environment variables in production, fallback to config.js for local development
let supabaseUrl, supabaseKey;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local development - import from config.js
    const config = await import('./config.js');
    supabaseUrl = config.supabaseUrl;
    supabaseKey = config.supabaseKey;
} else {
    // Production - use environment variables injected by build process
    supabaseUrl = window.ENV?.SUPABASE_URL || 'https://hcxvxqcbnyioofqymffe.supabase.co';
    supabaseKey = window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHZ4cWNibnlpb29mcXltZmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTgyODEsImV4cCI6MjA2NTI5NDI4MX0.UA1_Q3OzTji61JesUVHps5W1lwnOPPkidqVB8F8xkSg';
}

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const gamesTab = document.getElementById('gamesTab');
const tradesTab = document.getElementById('tradesTab');
const gamesContent = document.getElementById('gamesContent');
const tradesContent = document.getElementById('tradesContent');
const postForm = document.getElementById('postForm');
const tradeForm = document.getElementById('tradeForm');
const gameListings = document.getElementById('gameListings');
const tradeListings = document.getElementById('tradeListings');

// Filter Elements
const locationFilter = document.getElementById('locationFilter');
const formatFilter = document.getElementById('formatFilter');
const sortBy = document.getElementById('sortBy');
const clearFilters = document.getElementById('clearFilters');
const tradeLocationFilter = document.getElementById('tradeLocationFilter');
const tradeSortBy = document.getElementById('tradeSortBy');
const clearTradeFilters = document.getElementById('clearTradeFilters');

// Data storage
let allGamePosts = [];
let allTradePosts = [];

// Set default time for game post form
function setDefaultTime() {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const defaultValue = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById('preferredTime').value = defaultValue;
}

// Initial data fetch
fetchPosts();
fetchTradePosts();
setDefaultTime();

// Tab switching logic
gamesTab.addEventListener('click', () => {
    gamesContent.classList.remove('hidden');
    tradesContent.classList.add('hidden');
    gamesTab.classList.add('active');
    tradesTab.classList.remove('active');
});

tradesTab.addEventListener('click', () => {
    tradesContent.classList.remove('hidden');
    gamesContent.classList.add('hidden');
    tradesTab.classList.add('active');
    gamesTab.classList.remove('active');
});

// Filter event listeners
locationFilter.addEventListener('change', filterAndDisplayPosts);
formatFilter.addEventListener('change', filterAndDisplayPosts);
sortBy.addEventListener('change', filterAndDisplayPosts);
clearFilters.addEventListener('click', clearGameFilters);

tradeLocationFilter.addEventListener('change', filterAndDisplayTradePosts);
tradeSortBy.addEventListener('change', filterAndDisplayTradePosts);
clearTradeFilters.addEventListener('click', clearTradeFiltersFunc);

// Listen for game post submissions
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = postForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Posting...';

    const playerName = document.getElementById('playerName').value;
    const location = document.getElementById('location').value;
    const format = document.getElementById('format').value;
    const preferredTime = document.getElementById('preferredTime').value;
    const notes = document.getElementById('notes').value;

    const { error } = await supabase
        .from('game_posts')
        .insert([{ player_name: playerName, location, format, preferred_time: preferredTime, notes }]);

    if (error) {
        console.error('Error inserting game post:', error);
        alert('Error submitting post. Please try again.');
    } else {
        postForm.reset();
        setDefaultTime();
        fetchPosts();
    }
    submitButton.disabled = false;
    submitButton.textContent = '🎲 Let\'s Find Players!';
});

// Listen for trade post submissions
tradeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = tradeForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Posting...';

    const playerName = document.getElementById('tradePlayerName').value;
    const location = document.getElementById('tradeLocation').value;
    const contact = document.getElementById('tradeContact').value;
    const have = document.getElementById('tradeHave').value;
    const want = document.getElementById('tradeWant').value;
    const notes = document.getElementById('tradeNotes').value;

    const { error } = await supabase
        .from('trade_posts')
        .insert([{ player_name: playerName, location, contact, have, want, notes }]);

    if (error) {
        console.error('Error inserting trade post:', error);
        alert('Error submitting trade post. Please try again.');
    } else {
        tradeForm.reset();
        fetchTradePosts();
    }
    submitButton.disabled = false;
    submitButton.textContent = '📤 Submit Trade';
});

// Fetch game posts from Supabase
async function fetchPosts() {
    gameListings.innerHTML = '<div class="loading">Loading games...</div>';
    const { data, error } = await supabase
        .from('game_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching game posts:', error);
        gameListings.innerHTML = '<div class="empty-state"><h3>Error Loading Posts</h3><p>Could not load game posts. Please try refreshing.</p></div>';
    } else {
        allGamePosts = data;
        filterAndDisplayPosts();
    }
}

// Fetch trade posts from Supabase
async function fetchTradePosts() {
    tradeListings.innerHTML = '<div class="loading">Loading trades...</div>';
    const { data, error } = await supabase
        .from('trade_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching trade posts:', error);
        tradeListings.innerHTML = '<div class="empty-state"><h3>Error Loading Posts</h3><p>Could not load trade posts. Please try refreshing.</p></div>';
    } else {
        allTradePosts = data;
        filterAndDisplayTradePosts();
    }
}

// Filter and display game posts
function filterAndDisplayPosts() {
    let filteredPosts = [...allGamePosts];
    
    // Apply location filter
    const locationValue = locationFilter.value;
    if (locationValue) {
        filteredPosts = filteredPosts.filter(post => post.location === locationValue);
    }
    
    // Apply format filter
    const formatValue = formatFilter.value;
    if (formatValue) {
        filteredPosts = filteredPosts.filter(post => post.format === formatValue);
    }
    
    // Apply sorting
    const sortValue = sortBy.value;
    filteredPosts.sort((a, b) => {
        switch (sortValue) {
            case 'oldest':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'soonest':
                return new Date(a.preferred_time) - new Date(b.preferred_time);
            case 'newest':
            default:
                return new Date(b.created_at) - new Date(a.created_at);
        }
    });
    
    displayPosts(filteredPosts);
}

// Display game posts on the page
function displayPosts(posts) {
    if (posts.length === 0) {
        gameListings.innerHTML = '<div class="empty-state"><h3>No Games Found</h3><p>No game posts match your filters. Try adjusting your search or be the first to post!</p></div>';
        return;
    }
    
    gameListings.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');
        const formattedTime = new Date(post.preferred_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
        const timeAgo = timeSince(new Date(post.created_at));
        
        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-author">${escapeHtml(post.player_name)}</div>
                <div class="post-time">${timeAgo}</div>
            </div>
            <div class="post-details">
                <div class="post-detail">
                    <strong>Location:</strong>
                    <span>${escapeHtml(post.location)}</span>
                </div>
                <div class="post-detail">
                    <strong>Format:</strong>
                    <span>${escapeHtml(post.format)}</span>
                </div>
                <div class="post-detail">
                    <strong>Time:</strong>
                    <span>${formattedTime}</span>
                </div>
            </div>
            ${post.notes ? `<div class="post-notes">${escapeHtml(post.notes)}</div>` : ''}
        `;
        gameListings.appendChild(postElement);
    });
}

// Filter and display trade posts
function filterAndDisplayTradePosts() {
    let filteredPosts = [...allTradePosts];
    
    // Apply location filter
    const locationValue = tradeLocationFilter.value;
    if (locationValue) {
        filteredPosts = filteredPosts.filter(post => post.location === locationValue);
    }
    
    // Apply sorting
    const sortValue = tradeSortBy.value;
    filteredPosts.sort((a, b) => {
        switch (sortValue) {
            case 'oldest':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'newest':
            default:
                return new Date(b.created_at) - new Date(a.created_at);
        }
    });
    
    displayTradePosts(filteredPosts);
}

// Display trade posts on the page
function displayTradePosts(posts) {
    if (posts.length === 0) {
        tradeListings.innerHTML = '<div class="empty-state"><h3>No Trades Found</h3><p>No trade posts match your filters. Try adjusting your search or be the first to post!</p></div>';
        return;
    }
    
    tradeListings.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');
        const timeAgo = timeSince(new Date(post.created_at));
        
        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-author">${escapeHtml(post.player_name)}</div>
                <div class="post-time">${timeAgo}</div>
            </div>
            <div class="post-details">
                <div class="post-detail">
                    <strong>Location:</strong>
                    <span>${escapeHtml(post.location)}</span>
                </div>
                <div class="post-detail">
                    <strong>Contact:</strong>
                    <span>${escapeHtml(post.contact)}</span>
                </div>
                <div class="post-detail">
                    <strong>Have:</strong>
                    <span>${escapeHtml(post.have).replace(/\n/g, '<br>')}</span>
                </div>
                <div class="post-detail">
                    <strong>Want:</strong>
                    <span>${escapeHtml(post.want).replace(/\n/g, '<br>')}</span>
                </div>
            </div>
            ${post.notes ? `<div class="post-notes">${escapeHtml(post.notes)}</div>` : ''}
        `;
        tradeListings.appendChild(postElement);
    });
}

// Filter management functions
function clearGameFilters() {
    locationFilter.value = '';
    formatFilter.value = '';
    sortBy.value = 'newest';
    filterAndDisplayPosts();
}

function clearTradeFiltersFunc() {
    tradeLocationFilter.value = '';
    tradeSortBy.value = 'newest';
    filterAndDisplayTradePosts();
}

// Utility function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Listen for real-time updates
supabase
    .channel('game_posts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'game_posts' }, payload => {
        fetchPosts();
    })
    .subscribe();

supabase
    .channel('trade_posts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'trade_posts' }, payload => {
        fetchTradePosts();
    })
    .subscribe();

// Utility function to calculate time since a date
function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}
