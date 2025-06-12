import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { supabaseUrl, supabaseKey } from './config.js';

// Supabase configuration
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
    gamesTab.classList.add('border-purple-500', 'text-white');
    gamesTab.classList.remove('text-gray-400');
    tradesTab.classList.remove('border-purple-500', 'text-white');
    tradesTab.classList.add('text-gray-400');
});

tradesTab.addEventListener('click', () => {
    tradesContent.classList.remove('hidden');
    gamesContent.classList.add('hidden');
    tradesTab.classList.add('border-purple-500', 'text-white');
    tradesTab.classList.remove('text-gray-400');
    gamesTab.classList.remove('border-purple-500', 'text-white');
    gamesTab.classList.add('text-gray-400');
});

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
        fetchPosts();
    }
    submitButton.disabled = false;
    submitButton.textContent = 'Post Game';
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
    submitButton.textContent = 'Post Trade';
});

// Fetch game posts from Supabase
async function fetchPosts() {
    gameListings.innerHTML = '<p>Loading games...</p>';
    const { data, error } = await supabase
        .from('game_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching game posts:', error);
        gameListings.innerHTML = '<p class="text-red-400">Could not load game posts. Please try refreshing.</p>';
    } else {
        displayPosts(data);
    }
}

// Fetch trade posts from Supabase
async function fetchTradePosts() {
    tradeListings.innerHTML = '<p>Loading trades...</p>';
    const { data, error } = await supabase
        .from('trade_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching trade posts:', error);
        tradeListings.innerHTML = '<p class="text-red-400">Could not load trade posts. Please try refreshing.</p>';
    } else {
        displayTradePosts(data);
    }
}

// Display game posts on the page
function displayPosts(posts) {
    if (posts.length === 0) {
        gameListings.innerHTML = '<p>No game posts yet. Be the first!</p>';
        return;
    }
    gameListings.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md');
        const formattedTime = new Date(post.preferred_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
        const timeAgo = timeSince(new Date(post.created_at));
        postElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-bold">${post.player_name}</p>
                <p class="text-xs text-gray-400">${timeAgo}</p>
            </div>
            <p class="text-sm"><strong>Location:</strong> ${post.location}</p>
            <p class="text-sm"><strong>Format:</strong> ${post.format}</p>
            <p class="text-sm"><strong>Time:</strong> ${formattedTime}</p>
            <p class="text-sm mt-2"><strong>Notes:</strong> ${post.notes}</p>
        `;
        gameListings.appendChild(postElement);
    });
}

// Display trade posts on the page
function displayTradePosts(posts) {
    if (posts.length === 0) {
        tradeListings.innerHTML = '<p>No trade posts yet. Be the first!</p>';
        return;
    }
    tradeListings.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md');
        const timeAgo = timeSince(new Date(post.created_at));
        postElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-bold">${post.player_name}</p>
                <p class="text-xs text-gray-400">${timeAgo}</p>
            </div>
            <p class="text-sm"><strong>Location:</strong> ${post.location}</p>
            <p class="text-sm"><strong>Contact:</strong> ${post.contact}</p>
            <p class="text-sm mt-2"><strong>Have:</strong><br>${post.have.replace(/\n/g, '<br>')}</p>
            <p class="text-sm mt-2"><strong>Want:</strong><br>${post.want.replace(/\n/g, '<br>')}</p>
            <p class="text-sm mt-2"><strong>Notes:</strong> ${post.notes}</p>
        `;
        tradeListings.appendChild(postElement);
    });
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