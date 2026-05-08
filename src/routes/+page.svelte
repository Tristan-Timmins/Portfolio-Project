<script>
    import { fade } from 'svelte/transition';
    import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';
    import { CatalogueCard, Modal } from '$lib/components';
    import { catalogue } from '$lib/stores/catalogueStore.js';
    
    /**
     * Select a few featured items — e.g., first 4 items
     * @type {any[]}
     */
    let featuredItems = [];

    $: $catalogue && (featuredItems = $catalogue.slice(0, 4));

    // State for 2000s styling
    let showRetroStyle = true;
    
    // Visitor counter (classic 2000s feature)
    let visitorCount = 18472;
    
    // Current time display
    let currentTime = new Date().toLocaleString();
    
    // Update time every second
    setInterval(() => {
        currentTime = new Date().toLocaleString();
    }, 1000);
    
    // Marquee text
    let marqueeText = "★ Welcome to Blog N' Log! ★ Sign up now! ★ Best viewed in 800x600! ★ Under construction! ★";
    
    // Random color generator
    let bgColor = "#ffffff";
    
    function randomizeColors() {
        const colors = ["#ffffff", "#ffffcc", "#ffccff", "#ccffff", "#ffcc99"];
        bgColor = colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Guestbook
    let showGuestbook = false;
    let guestbookEntries = [
        { name: "Xx_BigManJimmy_xX", message: "I'm here, and I'm staying", date: "05.20.03" },
        { name: "EmoGothCyberWoman", message: "Love the aesthetic! So nostalgic!", date: "05.19.03" },
        { name: "CoolDude99", message: "First!", date: "05.18.03" }
    ];
    
    let newEntry = { name: "", message: "" };
    
    function addGuestbookEntry() {
        if (newEntry.name && newEntry.message) {
            guestbookEntries.unshift({
                ...newEntry,
                date: new Date().toLocaleDateString()
            });
            newEntry = { name: "", message: "" };
            showGuestbook = false;
        }
    }
</script>

<!-- Page Container -->
<div class="home-container" class:retro-style={showRetroStyle} style="background-color: {bgColor}">
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="visitor-counter">
            <span class="counter-label">Visitors:</span>
            <span class="counter-number">{visitorCount}</span>
        </div>
        <div class="current-time">
            {currentTime}
        </div>
    </div>
    
    <!-- Marquee -->
    <div class="marquee-container">
        <div class="marquee">
            {marqueeText}
        </div>
    </div>
    
    <!-- About Teaser Section - Full Width at Top -->
    <section class="about-teaser">
        <h2>✦ Welcome to Blog N' Log!! ✦</h2>
        <p>
            Feel free to hang out here. This site is best viewed with Internet Explorer 5+ at 800x600 resolution.
        </p>
        <a href="{resolve('/aboutus/')}" class="learn-more">
            ≫ Want to know more? Check out The Founders ≪
        </a>
    </section>
    
    <!-- Three Column Layout Starts Here -->
    <!-- Left Column: Friends Section -->
    <div class="friends-section">
        <div class="section-header">
            <h3>My Friends</h3>
        </div>
        <div class="friends-list">
            <div class="friend-card">
                <!-- ADD YOUR FRIEND AVATAR HERE -->
                <a href="/friend1/">☆ xX_Frog_Gamer_Xx ☆</a>
            </div>
            <div class="friend-card">
                <!-- ADD YOUR FRIEND AVATAR HERE -->
                <a href="/friend2/">★ DarkEagle36 ★</a>
            </div>
            <div class="friend-card">
                <!-- ADD YOUR FRIEND AVATAR HERE -->
                <a href="/friend3/">♦ EmoGothCyberWoman ♦</a>
            </div>
            <div class="friend-card">
                <!-- ADD YOUR FRIEND AVATAR HERE -->
                <a href="/friend4/">♥ Trololololo94 ♥</a>
            </div>
        </div>
    </div>

    <!-- Middle Column: Recent Posts -->
    <div class="recent-posts">
        <div class="section-header">
            <h3>Latest Updates</h3>
        </div>
        <div class="posts-list">
            <div class="post-entry">
                <span class="post-date">[05.18.03]</span>
                <span class="post-title">Updated my links page</span>
            </div>
            <div class="post-entry">
                <span class="post-date">[05.15.03]</span>
                <span class="post-title">New background pattern!</span>
            </div>
        </div>
    </div>

    <!-- Right Column: Friends Posts -->
    <div class="friends-posts">
        <div class="section-header">
            <h3>Friend's Recent Updates</h3>
        </div>
        <div class="posts-list">
            <div class="post-entry">
                <span class="post-date">[05.19.03]</span>
                <span class="post-title">Joe: New game reviews!</span>
            </div>
            <div class="post-entry">
                <span class="post-date">[05.18.03]</span>
                <span class="post-title">Sarah: Episode 25 summary</span>
            </div>
            <div class="post-entry">
                <span class="post-date">[05.17.03]</span>
                <span class="post-title">Mike: Weekend gaming results</span>
            </div>
        </div>
    </div>
    
    <!-- Random Color Button -->
    <div class="randomizer">
        <button on:click={randomizeColors} class="random-btn">
            🎨 Click for Random Colors! 🎨
        </button>
    </div>
    
    <!-- Footer -->
    <div class="footer">
        <div class="footer-links">
            <a href="#">✦ Home ✦</a> |
            <a href="/aboutus/">✦ About ✦</a> |
            <a href="/trending/">✦ Trending ✦</a> |
            <a href="/signup/">✦ SignUp ✦</a>
        </div>
        <div class="copyright">
            © 2003-2004 Blog N' Log Team | Last Updated: May 20, 2003
        </div>
        <div class="browser-logos">
        </div>
    </div>
    
    <!-- Guestbook Button -->
    <button on:click={() => showGuestbook = true} class="guestbook-btn">
        ✍️ Sign My Guestbook! ✍️
    </button>
    
    <!-- Guestbook Modal -->
    {#if showGuestbook}
        <div class="guestbook-modal">
            <div class="guestbook-content">
                <div class="guestbook-header">
                    <h3>✧✧✧ Guestbook ✧✧✧</h3>
                    <button on:click={() => showGuestbook = false} class="close-btn">✖</button>
                </div>
                
                <div class="guestbook-entries">
                    <h4>Recent Signatures:</h4>
                    {#each guestbookEntries as entry}
                        <div class="guestbook-entry">
                            <div class="entry-header">
                                <strong>{entry.name}</strong>
                                <span class="entry-date">[{entry.date}]</span>
                            </div>
                            <p>{entry.message}</p>
                        </div>
                    {/each}
                </div>
                
                <div class="guestbook-form">
                    <h4>Sign Your Name:</h4>
                    <input bind:value={newEntry.name} placeholder="Your cool name here..." />
                    <textarea bind:value={newEntry.message} placeholder="Leave a message!" rows="3"></textarea>
                    <button on:click={addGuestbookEntry}>✍️ Sign Guestbook ✍️</button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* ============================================
       GLOBAL STYLES
    ============================================ */
    .home-container {
        max-width: 1024px;
        margin: 0 auto;
        background-color: #ffffff;
        border-left: 1px solid #c0c0c0;
        border-right: 1px solid #c0c0c0;
        font-family: 'Times New Roman', 'Arial', sans-serif;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        padding: 15px;
        transition: background-color 0.3s ease;
    }
    
    /* ============================================
       TOP BAR
    ============================================ */
    .top-bar {
        background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 100%);
        border-bottom: 2px groove #808080;
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        font-family: 'Courier New', monospace;
        grid-column: 1 / span 3;
        grid-row: 1;
    }
    
    .visitor-counter {
        background: #000000;
        color: #00ff00;
        padding: 2px 8px;
        font-family: 'Courier New', monospace;
        font-weight: bold;
    }
    
    .counter-label {
        color: #ffffff;
    }
    
    .counter-number {
        background: #000000;
        padding: 0 4px;
    }
    .current-time {
        background: #f0f0f0;
        padding: 2px 8px;
        border: 1px inset #808080;
    }
    
    /* ============================================
       MARQUEE
    ============================================ */
    .marquee-container {
        background: #000066;
        color: #ffff00;
        padding: 5px;
        overflow: hidden;
        white-space: nowrap;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        border: 1px inset #ffcc00;
        margin-bottom: 5px;
        grid-column: 1 / span 3;
        grid-row: 2;
    }
    
    .marquee {
        display: inline-block;
        animation: marquee 20s linear infinite;
    }
    
    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
    
    /* ============================================
       SECTION HEADERS
    ============================================ */
    .section-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        border-bottom: 2px ridge #c0c0c0;
        padding-bottom: 5px;
    }
    
    .section-header h3 {
        margin: 0;
        font-family: 'Comic Sans MS', 'Arial', sans-serif;
        font-size: 18px;
        color: #663399;
    }
    
    /* ============================================
       ABOUT TEASER - FULL WIDTH AT TOP
    ============================================ */
    .about-teaser {
        text-align: center;
        grid-column: 1 / span 3;
        grid-row: 3;
        background: #f8f0e0;
        border: 3px ridge #c0a080;
        padding: 20px;
        margin-bottom: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    
    .about-teaser h2 {
        font-family: 'Comic Sans MS', 'Papyrus', fantasy;
        margin-bottom: 15px;
        font-size: 28px;
        color: #cc6600;
    }
    
    .about-teaser p {
        font-size: 14px;
        color: #333333;
        max-width: 60ch;
        margin: 0 auto 15px auto;
    }
    
    .learn-more {
        font-size: 12px;
        color: #9900cc;
        text-decoration: none;
        background: #ffffcc;
        padding: 5px 15px;
        border: 2px outset #ffcc99;
        display: inline-block;
        box-shadow: 3px 3px 0px #996633;
    }
    
    .learn-more:hover {
        border-style: inset;
        background: #ffcc99;
    }
    
    .learn-more:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0px #996633;
    }
    
    /* ============================================
       FRIENDS SECTION - LEFT COLUMN
    ============================================ */
    .friends-section {
        grid-column: 1 / span 1;
        grid-row: 4;
        background: #e6f0ff;
        border: 2px ridge #6699cc;
        padding: 15px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    
    .friends-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .friend-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px;
        border-bottom: 1px dotted #6699cc;
    }
    
    .friend-card a {
        color: #3366cc;
        text-decoration: none;
        font-family: 'Comic Sans MS', sans-serif;
        font-size: 12px;
        transition: all 0.1s ease;
    }
    
    .friend-card a:hover {
        text-decoration: underline;
        color: #ff6600;
        text-shadow: 1px 1px 0px #ffcc00;
    }
    
    /* ============================================
       RECENT POSTS - MIDDLE COLUMN
    ============================================ */
    .recent-posts {
        grid-column: 2 / span 1;
        grid-row: 4;
        background: #fff0e6;
        border: 2px ridge #ff9966;
        padding: 15px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    
    /* ============================================
       FRIENDS POSTS - RIGHT COLUMN
    ============================================ */
    .friends-posts {
        grid-column: 3 / span 1;
        grid-row: 4;
        background: #f0ffe6;
        border: 2px ridge #66cc66;
        padding: 15px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    
    .posts-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .post-entry {
        padding: 8px;
        background: #ffffcc;
        border-left: 4px solid #ff9966;
        font-size: 12px;
        transition: all 0.2s ease;
    }
    
    .post-entry:hover {
        background: #ffcc99;
        transform: scale(1.02);
    }
    
    .post-date {
        font-family: 'Courier New', monospace;
        color: #666666;
        font-weight: bold;
    }
    
    .post-title {
        margin-left: 10px;
        color: #333333;
    }
    
    /* ============================================
       RANDOM COLOR BUTTON
    ============================================ */
    .randomizer {
        grid-column: 1 / span 3;
        grid-row: 5;
        text-align: center;
        margin: 10px 0;
    }
    
    .random-btn {
        background: linear-gradient(180deg, #ffcc99 0%, #ff9966 100%);
        border: 2px outset #ffaa66;
        font-family: 'Comic Sans MS', sans-serif;
        padding: 5px 15px;
        cursor: pointer;
        font-size: 12px;
    }
    
    .random-btn:active {
        border-style: inset;
    }
    
    /* ============================================
       FOOTER
    ============================================ */
    .footer {
        grid-column: 1 / span 3;
        grid-row: 6;
        background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 100%);
        border-top: 2px groove #808080;
        padding: 15px;
        text-align: center;
        margin-top: 20px;
    }
    
    .footer-links {
        margin-bottom: 10px;
        font-size: 12px;
    }
    
    .footer-links a {
        color: #663399;
        text-decoration: none;
        margin: 0 5px;
        transition: all 0.1s ease;
    }
    
    .footer-links a:hover {
        text-decoration: underline;
        text-shadow: 1px 1px 0px #ffcc00;
    }
    
    .copyright {
        font-size: 10px;
        color: #666666;
        margin-bottom: 10px;
    }
    
    .browser-logos {
        display: flex;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
    }
    
    /* ============================================
       GUESTBOOK
    ============================================ */
    .guestbook-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(180deg, #ffcc99 0%, #ff9966 100%);
        border: 3px outset #ffaa66;
        font-family: 'Comic Sans MS', sans-serif;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    
    .guestbook-btn:active {
        border-style: inset;
    }
    
    .guestbook-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }
    
    .guestbook-content {
        background: #ffffcc;
        border: 8px ridge #ccaa77;
        width: 500px;
        max-width: 90%;
        max-height: 80%;
        overflow-y: auto;
        padding: 20px;
        font-family: 'Comic Sans MS', sans-serif;
    }
    
    .guestbook-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px groove #ccaa77;
        margin-bottom: 15px;
        padding-bottom: 10px;
    }
    
    .guestbook-header h3 {
        margin: 0;
        color: #cc6600;
    }
    
    .close-btn {
        background: #ff6666;
        border: 2px outset #ff9999;
        cursor: pointer;
        font-size: 16px;
        width: 25px;
        height: 25px;
    }
    
    .guestbook-entry {
        background: #fff9e6;
        border: 1px solid #ccaa77;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    .entry-header {
        border-bottom: 1px dotted #ccaa77;
        margin-bottom: 5px;
        padding-bottom: 3px;
    }
    
    .entry-date {
        font-size: 10px;
        color: #886633;
        margin-left: 10px;
    }
    
    .guestbook-form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .guestbook-form input,
    .guestbook-form textarea {
        border: 2px inset #ccaa77;
        background: white;
        padding: 8px;
        font-family: inherit;
        font-size: 12px;
    }
    
    .guestbook-form button {
        background: #ccaa77;
        border: 2px outset #eeddbb;
        padding: 8px;
        cursor: pointer;
        font-family: 'Comic Sans MS', sans-serif;
        font-weight: bold;
    }
    
    .guestbook-form button:active {
        border-style: inset;
    }
    
    /* ============================================
       MOBILE LAYOUT
    ============================================ */
    @media (max-width: 768px) {
        .home-container {
            grid-template-columns: 1fr;
        }
        
        .top-bar,
        .marquee-container,
        .about-teaser,
        .friends-section,
        .recent-posts,
        .friends-posts,
        .randomizer,
        .footer {
            grid-column: 1;
        }
        
        /* Reset grid rows for mobile */
        .top-bar { grid-row: 1; }
        .marquee-container { grid-row: 2; }
        .about-teaser { grid-row: 3; }
        .friends-section { grid-row: 4; }
        .recent-posts { grid-row: 5; }
        .friends-posts { grid-row: 6; }
        .randomizer { grid-row: 7; }
        .footer { grid-row: 8; }
        
        .top-bar {
            flex-direction: column;
            gap: 5px;
        }
        
        .music-control {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
</style>