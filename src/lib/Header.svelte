<!-- Header.svelte -->
<script>
    import { page } from '$app/state';
    import Navigation from './Navigation.svelte';
    import { navigationItems } from './stores/navigationItems';
    
    let showSiteInfo = false;
    let currentTime = new Date().toLocaleTimeString();
    
    // Update time for the status bar
    setInterval(() => {
        currentTime = new Date().toLocaleTimeString();
    }, 1000);
</script>


<!-- Condensed Retro Navigation Bar -->
<header class="retro-nav">
    <!-- Top Status Bar - Thinner -->
    <div class="status-bar">
        <div class="status-left">
            <span class="status-text">✓ Done</span>
            <span class="status-separator">|</span>
            <span class="status-text">🔒 Secure</span>
        </div>
        <div class="status-right">
            <span class="status-text">📟 {currentTime}</span>
        </div>
    </div>
    
    <!-- Main Navigation - Condensed -->
    <div class="nav-container">
        <!-- Site Title (clickable) -->
        <div class="site-title" on:click={() => showSiteInfo = !showSiteInfo}>
            <span class="title-icon">📝</span>
            <span class="title-text">Blog N' Log</span>
        </div>
        
        <!-- Navigation Links -->
        <!-- Just the retro navigation - no extra header wrapper -->
        <Navigation />
        
        <!-- Mini Browser Controls -->
        <div class="mini-controls">
            <button class="ctrl-btn" on:click={() => window.history.back()} title="Back">◀</button>
            <button class="ctrl-btn" on:click={() => window.history.forward()} title="Forward">▶</button>
            <button class="ctrl-btn" on:click={() => location.reload()} title="Refresh">↻</button>
        </div>
    </div>
    
    <!-- Breadcrumb Bar - Optional but useful -->
    <div class="breadcrumb-bar">
        <span class="breadcrumb-label">📍</span>
        <a href="/" class="breadcrumb-link">Home</a>
        {#if page.url.pathname !== '/'}
            <span class="breadcrumb-sep">→</span>
            <span class="breadcrumb-current">
                {$navigationItems.find(item => item.path === page.url.pathname)?.name || 'Page'}
            </span>
        {/if}
    </div>
</header>

<!-- Site Info Modal (retro popup) -->
{#if showSiteInfo}
    <div class="siteinfo-modal">
        <div class="siteinfo-window">
            <div class="window-title-bar">
                <span class="window-title">📋 Site Info</span>
                <button class="window-close" on:click={() => showSiteInfo = false}>✖</button>
            </div>
            <div class="window-content">
                <div class="info-section">
                    <h4>Blog N' Log</h4>
                    <p>Version: 2.0 (2004)</p>
                    <p>Last Updated: Jan 15, 2004</p>
                </div>
                <div class="info-section">
                    <h4>Stats</h4>
                    <p>Posts: 142 | Users: 847</p>
                </div>
            </div>
            <div class="window-footer">
                <button class="ok-btn" on:click={() => showSiteInfo = false}>OK</button>
            </div>
        </div>
    </div>
{/if}


<style>
    /* ============================================
       CONDENSED RETRO NAVIGATION
    ============================================ */
    .retro-nav {
        font-family: 'Times New Roman', 'Arial', sans-serif;
        margin-bottom: 15px;
        border: 1px solid #c0c0c0;
        background: #f0f0f0;
        max-width: 100%;
    }
    
    /* Status Bar - Thinner */
    .status-bar {
        background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 100%);
        border-bottom: 1px solid #808080;
        padding: 2px 8px;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        font-family: 'Courier New', monospace;
        color: #000000;
    }
    
    .status-left, .status-right {
        display: flex;
        gap: 8px;
    }
    
    .status-separator {
        color: #808080;
    }
    
    /* Main Navigation Container - Condensed */
    .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        background: linear-gradient(180deg, #f8f8f8 0%, #e0e0e0 100%);
        flex-wrap: wrap;
        gap: 10px;
    }
    
    /* Site Title - Smaller */
    .site-title {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        padding: 3px 8px;
        background: linear-gradient(135deg, #ffffcc, #ffcc99);
        border: 1px outset #ffaa66;
        font-weight: bold;
        white-space: nowrap;
    }
    
    .site-title:active {
        border-style: inset;
    }
    
    .title-icon {
        font-size: 16px;
    }
    
    .title-text {
        font-family: 'Comic Sans MS', cursive;
        font-size: 14px;
        color: #cc6600;
    }
    
    /* Mini Browser Controls */
    .mini-controls {
        display: flex;
        gap: 3px;
    }
    
    .ctrl-btn {
        background: linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%);
        border: 1px outset #e0e0e0;
        padding: 3px 6px;
        font-size: 10px;
        font-family: 'Courier New', monospace;
        cursor: pointer;
        min-width: 24px;
    }
    
    .ctrl-btn:active {
        border-style: inset;
    }
    
    /* Breadcrumb Bar - Minimal */
    .breadcrumb-bar {
        background: #ffffcc;
        padding: 3px 10px;
        border-top: 1px solid #ccaa77;
        font-size: 10px;
        font-family: 'Courier New', monospace;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .breadcrumb-label {
        font-size: 10px;
    }
    
    .breadcrumb-link {
        color: #663399;
        text-decoration: none;
    }
    
    .breadcrumb-link:hover {
        text-decoration: underline;
    }
    
    .breadcrumb-sep {
        color: #ff9966;
    }
    
    .breadcrumb-current {
        color: #cc6600;
        font-weight: bold;
    }
    
    /* Site Info Modal - Smaller */
    .siteinfo-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
    }
    
    .siteinfo-window {
        background: #c0c0c0;
        border: 3px ridge #ffffff;
        width: 300px;
        max-width: 90%;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
    }
    
    .window-title-bar {
        background: linear-gradient(90deg, #000066, #333399);
        color: white;
        padding: 4px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .window-title {
        font-family: 'Comic Sans MS', sans-serif;
        font-size: 11px;
        font-weight: bold;
    }
    
    .window-close {
        background: #cc0000;
        border: 1px outset #ff6666;
        color: white;
        cursor: pointer;
        width: 18px;
        height: 18px;
        font-size: 10px;
    }
    
    .window-content {
        background: #ffffcc;
        padding: 12px;
        border: 2px inset #ffffff;
    }
    
    .info-section {
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px dotted #ccaa77;
    }
    
    .info-section h4 {
        margin: 0 0 5px 0;
        color: #cc6600;
        font-family: 'Comic Sans MS', sans-serif;
        font-size: 12px;
    }
    
    .info-section p {
        margin: 2px 0;
        font-size: 10px;
        color: #333333;
    }
    
    .window-footer {
        background: #e0e0e0;
        padding: 6px;
        text-align: center;
        border-top: 1px solid #ffffff;
    }
    
    .ok-btn {
        background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 100%);
        border: 1px outset #d0d0d0;
        padding: 3px 15px;
        cursor: pointer;
        font-size: 10px;
    }
    
    .ctrl-btn:hover, .ok-btn:hover {
        background: linear-gradient(180deg, #fff8e0 0%, #e8d8c0 100%);
    }
    
    .site-title:hover {
        background: linear-gradient(135deg, #ffff99, #ffcc66);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .nav-container {
            flex-direction: column;
            align-items: stretch;
        }
        
        .mini-controls {
            justify-content: center;
        }
        
        .breadcrumb-bar {
            font-size: 9px;
        }
    }
</style>