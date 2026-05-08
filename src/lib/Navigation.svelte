<!-- src/lib/components/RetroNav.svelte -->
<script>
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
    import { navigationItems } from './stores/navigationItems';
    
</script>

<!-- Navigation Links -->
<nav class="nav-links">
    {#each $navigationItems as item}
        <a 
            href={resolve(item.path)}
            class="nav-link"
            class:active={page.url.pathname === resolve(item.path)}
        >
            <span class="nav-icon">{item.icon}</span>
            <span class="nav-name">{item.name}</span>
        </a>
    {/each}
</nav>

<style>
    /* Navigation Links - Compact */
    .nav-links {
        display: flex;
        gap: 2px;
        flex-wrap: wrap;
    }
    
    .nav-link {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%);
        border: 1px outset #e0e0e0;
        text-decoration: none;
        color: #333333;
        font-family: 'Comic Sans MS', sans-serif;
        font-size: 11px;
        font-weight: bold;
        white-space: nowrap;
    }
    
    .nav-link:active {
        border-style: inset;
        transform: translate(1px, 1px);
    }
    
    .nav-link.active {
        background: linear-gradient(180deg, #ffcc99 0%, #ff9966 100%);
        border: 1px inset #ffaa66;
        color: #663300;
    }
    
    .nav-icon {
        font-size: 12px;
    }
    
    /* Hover effects */
    .nav-link:hover {
        background: linear-gradient(180deg, #fff8e0 0%, #e8d8c0 100%);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {        
        .nav-name {
            display: none;
        }
        
        .nav-link {
            justify-content: center;
            min-width: 40px;
        }
        
        .nav-icon {
            font-size: 14px;
        }
    }
</style>