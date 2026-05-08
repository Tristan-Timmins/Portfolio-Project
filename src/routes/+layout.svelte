<script>
    // Import components
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
</script>


<div id="layout-container">
    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <main id="main-content" tabindex="-1">
        <slot />
    </main>

    <!-- Footer -->
    <Footer />
</div>



<style>
    #layout-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: rgb(75, 153, 255);
    }

    @media (max-width: 768px) {
        main {
            padding: var(--space-lg) var(--space-md);
        }
    }
</style>
