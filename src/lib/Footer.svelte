<footer class="footer">
    <div class="footer-links">
        <a href="/">✦ Home ✦</a> |
        <a href="/aboutus/">✦ About ✦</a> |
        <a href="/trending/">✦ Trending ✦</a> |
        <a href="/signup/">✦ SignUp ✦</a>
    </div>
    <div class="copyright">
        © 2003-2004 Blog N' Log Team | Last Updated: May 20, 2003
    </div>
    <div class="browser-logos">
    </div>
</footer>



<style>
    /*NOT MY CODE//NEED FOOTER ON EVERY PAGE**/
    .footer {
        grid-column: 1 / span 1;
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

    @keyframes fadeInFooter {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes gradientScroll {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
    }

    @media (max-width: 768px) {
        .footer {
            padding: var(--space-sm);
            font-size: var(--font-xs);
        }
    }
</style>
