<script>
  import { onMount } from 'svelte';

  let projects = [
    {
      id: 'strategy',
      title: 'DIPLOMATIC',
      color: '#e74c3c',
      year: '2026',
      description: 'Spend Gold, Build Armies, Conquer Nations!',
      fullDescription: 'A real time strategy game where you conquer nations. Choose a side, Economic or Wartime.',
      tech: ['HTML', 'CSS', 'JS', 'Firebase'],
      image: 'images/DIPLOMATIC Thumbnail.png',
      images: [
        'images/DIPLOMATIC 1.png',
        'images/DIPLOMATIC 2.png',
        'images/DIPLOMATIC 3.png'
      ],
      liveUrl: 'https://apple9511.github.io/Diplomatic/',
      githubUrl: 'https://github.com/Apple9511/Diplomatic'
    },
    {
      id: 'games',
      title: 'APPLE_THE_CODE',
      color: '#3498db',
      year: '2026',
      description: 'My Account on Itch.io, where I upload all of my game projects.',
      fullDescription: 'This is where I post all of the games that I make. I also 3D model low-poly assets for horror games.',
      tech: ['Unity', 'C#', 'Blender'],
      image: 'images/ATC Thumbnail.png',
      images: [
        'images/ATC 1.png',
        'images/ATC 2.png',
        'images/ATC 3.png'
      ],
      liveUrl: 'https://applethecode.itch.io/',
      githubUrl: 'https://github.com/Apple9511/'
    },
    {
      id: 'product',
      title: '3D ASSET PACKS',
      color: '#2ecc71',
      year: '2026',
      description: 'Low-Poly Asset Packs Made in Blender',
      fullDescription: 'These are collections of Low-Poly 3D objects that I modelled in blender and textured in Unity. These packs are perfect for PSX style horror games.',
      tech: ['Blender', 'Unity'],
      image: 'images/3D Assets Thumbnail.png',
      images: [
        'images/3D Assets 1.png',
        'images/3D Assets 2.png',
        'images/3D Assets 3.png'
      ],
      liveUrl: 'https://applethecode.itch.io/psx-style-the-silent-shelter-low-poly-asset-pack',
      githubUrl: 'https://github.com/Apple9511/'
    },
    {
      id: 'LinkedIn',
      title: 'LINKEDIN',
      color: '#f39c12',
      year: '2026',
      description: 'This is my LinkedIn profile.',
      fullDescription: 'This is where you can contact me for job opportunities.',
      tech: ['None'],
      image: 'images/LINKED IN PFP.jpg',
      images: [
        'images/LINKED IN 1.png',
        'images/LINKED IN 2.png',
        'images/LINKED IN 3.png'
      ],
      liveUrl: 'https://www.linkedin.com/in/tristan-timmins-7002a12b5/',
      githubUrl: 'https://github.com/Apple9511/'
    }
  ];

  let activeVHS = null;
  let tvDisplay = false;
  let dragging = false;
  let dragOffset = { x: 0, y: 0 };
  let mousePos = { x: 0, y: 0 };
  let draggedItem = null;
  let zoomModal = false;
  let currentImageIndex = 0;

  function startDrag(e, project) {
    e.preventDefault();
    draggedItem = project;
    dragging = true;
    const rect = e.target.closest('.vhs-tape').getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (!dragging) return;
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    
    const draggedElement = document.querySelector('.dragging-vhs');
    if (draggedElement) {
      draggedElement.style.left = (e.clientX - dragOffset.x) + 'px';
      draggedElement.style.top = (e.clientY - dragOffset.y) + 'px';
    }
  }

  function onMouseUp(e) {
    if (!dragging) return;
    
    const tvElement = document.querySelector('.tv-screen');
    if (tvElement) {
      const tvRect = tvElement.getBoundingClientRect();
      if (e.clientX >= tvRect.left && e.clientX <= tvRect.right &&
          e.clientY >= tvRect.top && e.clientY <= tvRect.bottom) {
        activeVHS = draggedItem;
        tvDisplay = true;
        zoomModal = false;
      } else {
        tvDisplay = false;
        zoomModal = false;
      }
    }
    
    dragging = false;
    draggedItem = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function zoomIn() {
    if (activeVHS && tvDisplay) {
      zoomModal = true;
      currentImageIndex = 0;
    }
  }

  function zoomOut() {
    zoomModal = false;
    currentImageIndex = 0;
  }

  function changeChannel(direction) {
    if (!projects.length) return;
    
    const currentIndex = activeVHS ? projects.findIndex(p => p.id === activeVHS.id) : -1;
    let newIndex;
    
    if (direction === 'up') {
      newIndex = (currentIndex + 1) % projects.length;
    } else {
      newIndex = (currentIndex - 1 + projects.length) % projects.length;
    }
    
    activeVHS = projects[newIndex];
    tvDisplay = true;
    zoomModal = false;
  }

  function nextImage() {
    if (activeVHS && activeVHS.images) {
      currentImageIndex = (currentImageIndex + 1) % activeVHS.images.length;
    }
  }

  function prevImage() {
    if (activeVHS && activeVHS.images) {
      currentImageIndex = (currentImageIndex - 1 + activeVHS.images.length) % activeVHS.images.length;
    }
  }

  function handleKeydown(e) {
    if (zoomModal) {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') zoomOut();
    }
  }

  function handleScreenKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      zoomIn();
    }
  }

  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      zoomOut();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<svelte:head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    
    /* Prevent text selection on TV content */
    .tv-content, .infomercial, .infomercial-content, .price-tag, .product-title, 
    .product-description, .tech-badge,
    .modal-content, .project-info {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    
    body {
      overflow: hidden;
    }
  </style>
</svelte:head>

<div class="room">
  <!-- Wooden floor -->
  <div class="floor"></div>
  
  <!-- Wall texture -->
  <div class="wall-pattern"></div>
  
  <!-- CRT TV in centre -->
  <div class="tv-stand">
    <div class="crt-tv">
      <!-- TV Antenna -->
      <div class="tv-antenna">
        <div class="antenna-left"></div>
        <div class="antenna-right"></div>
        <div class="antenna-base"></div>
      </div>
      
      <!-- TV Screen as button for accessibility -->
      <button 
        class="tv-screen" 
        on:click={zoomIn}
        on:keydown={handleScreenKeydown}
        tabindex="0"
        aria-label="Zoom in on project details"
        disabled={!tvDisplay || !activeVHS}
      >
        {#if tvDisplay && activeVHS}
          <div class="tv-content">
            <div class="infomercial">
              <div class="infomercial-overlay"></div>
              <div class="infomercial-content">
                <div class="price-tag">🔥 AS SEEN ON TV 🔥</div>
                <h2 class="product-title">{activeVHS.title}</h2>
                <div class="product-year">© {activeVHS.year}</div>
                <img src={activeVHS.image} alt={activeVHS.title} class="project-thumbnail">
                <div class="product-description">{activeVHS.description}</div>
                <div class="tech-stack">
                  {#each activeVHS.tech as tech}
                    <span class="tech-badge">{tech}</span>
                  {/each}
                </div>
                <div class="click-hint">✨ CLICK TO ZOOM ✨</div>
              </div>
            </div>
          </div>
        {:else}
          <div class="tv-static">
            <div class="static-overlay"></div>
            <div class="no-signal">NO SIGNAL<br><span style="font-size:10px">INSERT VHS TAPE</span></div>
          </div>
        {/if}
      </button>
      
      <div class="tv-buttons">
        <button class="knob power" on:click={zoomOut} title="Power/Eject" aria-label="Eject VHS and power off"></button>
        <div class="volume-knob" aria-label="Volume control" role="presentation"></div>
        <button class="button channel-up" on:click={() => changeChannel('up')} aria-label="Channel up">CH ▲</button>
        <button class="button channel-down" on:click={() => changeChannel('down')} aria-label="Channel down">CH ▼</button>
        <button class="button zoom-btn" on:click={zoomIn} aria-label="Zoom in for more details">ZOOM</button>
      </div>
    </div>
  </div>
  
  <!-- Cupboard/Shelf unit on right side -->
  <div class="cupboard">
    <div class="cupboard-top"></div>
    <div class="cupboard-body">
      <div class="cupboard-shelf shelf-1">
        <div class="vhs-tape-wrapper">
          <button 
            class="vhs-tape" 
            style="--vhs-color: {projects[0].color};"
            on:mousedown={(e) => startDrag(e, projects[0])}
            on:keydown={(e) => e.key === 'Enter' && startDrag(e, projects[0])}
            tabindex="0"
            aria-label={`Drag ${projects[0].title} VHS tape to the TV`}
          >
            <div class="vhs-spine">
              <div class="vhs-title">{projects[0].title}</div>
              <div class="vhs-year">{projects[0].year}</div>
            </div>
            <div class="vhs-label">
              <div class="vhs-label-text">{projects[0].title.substring(0, 3)}</div>
            </div>
          </button>
        </div>
      </div>
      <div class="cupboard-shelf shelf-2">
        <div class="vhs-tape-wrapper">
          <button 
            class="vhs-tape" 
            style="--vhs-color: {projects[1].color};"
            on:mousedown={(e) => startDrag(e, projects[1])}
            on:keydown={(e) => e.key === 'Enter' && startDrag(e, projects[1])}
            tabindex="0"
            aria-label={`Drag ${projects[1].title} VHS tape to the TV`}
          >
            <div class="vhs-spine">
              <div class="vhs-title">{projects[1].title}</div>
              <div class="vhs-year">{projects[1].year}</div>
            </div>
            <div class="vhs-label">
              <div class="vhs-label-text">{projects[1].title.substring(0, 3)}</div>
            </div>
          </button>
        </div>
      </div>
      <div class="cupboard-shelf shelf-3">
        <div class="vhs-tape-wrapper">
          <button 
            class="vhs-tape" 
            style="--vhs-color: {projects[2].color};"
            on:mousedown={(e) => startDrag(e, projects[2])}
            on:keydown={(e) => e.key === 'Enter' && startDrag(e, projects[2])}
            tabindex="0"
            aria-label={`Drag ${projects[2].title} VHS tape to the TV`}
          >
            <div class="vhs-spine">
              <div class="vhs-title">{projects[2].title}</div>
              <div class="vhs-year">{projects[2].year}</div>
            </div>
            <div class="vhs-label">
              <div class="vhs-label-text">{projects[2].title.substring(0, 3)}</div>
            </div>
          </button>
        </div>
      </div>
      <div class="cupboard-shelf shelf-4">
        <div class="vhs-tape-wrapper">
          <button 
            class="vhs-tape" 
            style="--vhs-color: {projects[3].color};"
            on:mousedown={(e) => startDrag(e, projects[3])}
            on:keydown={(e) => e.key === 'Enter' && startDrag(e, projects[3])}
            tabindex="0"
            aria-label={`Drag ${projects[3].title} VHS tape to the TV`}
          >
            <div class="vhs-spine">
              <div class="vhs-title">{projects[3].title}</div>
              <div class="vhs-year">{projects[3].year}</div>
            </div>
            <div class="vhs-label">
              <div class="vhs-label-text">{projects[3].title.substring(0, 3)}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="cupboard-bottom"></div>
  </div>
  
  <!-- Dragging clone -->
  {#if dragging && draggedItem}
    <div 
      class="dragging-vhs"
      style="left: {mousePos.x - dragOffset.x}px; top: {mousePos.y - dragOffset.y}px; --vhs-color: {draggedItem.color};"
      role="presentation"
    >
      <div class="vhs-spine">
        <div class="vhs-title">{draggedItem.title}</div>
        <div class="vhs-year">{draggedItem.year}</div>
      </div>
      <div class="vhs-label">
        <div class="vhs-label-text">{draggedItem.title.substring(0, 3)}</div>
      </div>
    </div>
  {/if}
  
  <!-- Zoom Modal -->
  {#if zoomModal && activeVHS}
    <div 
      class="modal-overlay" 
      on:click={zoomOut}
      on:keydown={handleModalKeydown}
      role="dialog" 
      aria-modal="true" 
      aria-label={`${activeVHS.title} project details`}
      tabindex="-1"
    >
      <div class="modal-content" on:click|stopPropagation>
        <div class="modal-header">
          <h2>{activeVHS.title}</h2>
          <button class="close-btn" on:click={zoomOut} aria-label="Close modal">✕</button>
        </div>
        
        <div class="modal-body">
          <div class="image-gallery">
            <button class="gallery-nav prev" on:click={prevImage} aria-label="Previous image">‹</button>
            <img src={activeVHS.images[currentImageIndex]} alt={`${activeVHS.title} screenshot ${currentImageIndex + 1}`} class="gallery-image">
            <button class="gallery-nav next" on:click={nextImage} aria-label="Next image">›</button>
          </div>
          <div class="image-dots">
            {#each activeVHS.images as _, idx}
              <button 
                class="dot {idx === currentImageIndex ? 'active' : ''}" 
                on:click={() => currentImageIndex = idx}
                aria-label={`Go to image ${idx + 1}`}
              ></button>
            {/each}
          </div>
          
          <div class="project-info">
            <div class="info-section">
              <h3>📋 Project Details</h3>
              <p>{activeVHS.fullDescription}</p>
            </div>
            
            <div class="info-section">
              <h3>🛠️ Technologies Used</h3>
              <div class="tech-list">
                {#each activeVHS.tech as tech}
                  <span class="tech-tag">{tech}</span>
                {/each}
              </div>
            </div>
            
            <div class="info-section">
              <h3>📊 Key Features</h3>
              <ul class="features-list">
                <li>✨ Fully responsive design</li>
                <li>⚡ Optimized performance</li>
                <li>🔒 Secure authentication</li>
                <li>📱 Mobile-first approach</li>
              </ul>
            </div>
            
            <div class="project-links">
              <a href={activeVHS.liveUrl} class="project-link live" target="_blank" rel="noopener noreferrer">🌐 Live Demo</a>
              <a href={activeVHS.githubUrl} class="project-link github" target="_blank" rel="noopener noreferrer">🐙 GitHub Repo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- decorations -->
  <div class="poster" role="presentation">APPLES<br>ROOM<br>🍎</div>
  <div class="cassette-tape" role="presentation"></div>
</div>

<style>
  .room {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(145deg, #8B7355 0%, #6B5340 100%);
    cursor: default;
  }
  
  .floor {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 28%;
    background: repeating-linear-gradient(
      90deg,
      #5C3A1E 0px,
      #5C3A1E 2px,
      #6B4423 2px,
      #6B4423 4px
    );
    box-shadow: inset 0 8px 12px rgba(0,0,0,0.3);
  }
  
  .wall-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 72%;
    background-image: radial-gradient(circle at 2px 2px, rgba(210,180,140,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  /* CRT TV */
  .tv-stand {
    position: absolute;
    bottom: 28%;
    left: 50%;
    transform: translateX(-50%);
    width: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .crt-tv {
    position: relative;
    width: 500px;
    height: 380px;
    background: #2C1810;
    border-radius: 24px 24px 16px 16px;
    box-shadow: 0 20px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
    border: 2px solid #1A0F08;
  }
  
  /* TV Antenna */
  .tv-antenna {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 50px;
    z-index: 5;
  }
  
  .antenna-left {
    position: absolute;
    left: 15px;
    top: 0;
    width: 4px;
    height: 50px;
    background: linear-gradient(135deg, #C0C0C0, #808080);
    transform: rotate(-30deg);
    transform-origin: bottom center;
    border-radius: 2px;
  }
  
  .antenna-right {
    position: absolute;
    right: 15px;
    top: 0;
    width: 4px;
    height: 50px;
    background: linear-gradient(225deg, #C0C0C0, #808080);
    transform: rotate(30deg);
    transform-origin: bottom center;
    border-radius: 2px;
  }
  
  .antenna-left::after {
    content: '●';
    position: absolute;
    top: -8px;
    left: -4px;
    font-size: 12px;
    color: #FFD700;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
  }
  
  .antenna-right::after {
    content: '●';
    position: absolute;
    top: -8px;
    right: -4px;
    font-size: 12px;
    color: #FFD700;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
  }
  
  .antenna-base {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 10px;
    background: #A0A0A0;
    border-radius: 3px;
  }
  
  button.tv-screen {
    position: absolute;
    top: 25px;
    left: 25px;
    right: 25px;
    width: calc(100% - 50px);
    height: 270px;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.8), 0 0 0 4px #1A0F08;
    cursor: pointer;
    transition: transform 0.2s;
    border: none;
    padding: 0;
  }
  
  button.tv-screen:hover:not(:disabled) {
    transform: scale(1.01);
  }
  
  button.tv-screen:disabled {
    cursor: default;
  }
  
  .tv-content {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    animation: flicker 0.15s infinite;
  }
  
  .infomercial {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #3429FF, #64EDFF);
    font-family: 'Press Start 2P', monospace;
    overflow: hidden;
  }
  
  .infomercial-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.1) 0px,
      rgba(255,255,255,0.1) 2px,
      transparent 2px,
      transparent 4px
    );
    pointer-events: none;
  }
  
  .infomercial-content {
    position: relative;
    padding: 15px;
    text-align: center;
    color: #fff;
    text-shadow: 2px 2px 0 #000;
    animation: slideIn 0.5s ease-out;
    overflow-y: auto;
    height: 100%;
  }
  
  .price-tag {
    background: #ff0000;
    display: inline-block;
    padding: 6px 12px;
    font-size: 12px;
    margin-bottom: 12px;
    transform: rotate(-5deg);
  }
  
  .product-title {
    font-size: 16px;
    margin: 10px 0;
    letter-spacing: 2px;
    background: #3429FF;
    color: white;
  }
  
  .product-year {
    font-size: 10px;
    color: #ffd93d;
    margin: 6px 0;
  }
  
  .project-thumbnail {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
    margin: 10px auto;
    display: block;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  .product-description {
    font-size: 9px;
    margin: 10px 0;
    line-height: 1.5;
    padding: 0 10px;
  }
  
  .tech-stack {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin: 10px 0;
    flex-wrap: wrap;
  }
  
  .tech-badge {
    background: rgba(0,0,0,0.6);
    padding: 4px 8px;
    font-size: 7px;
    border-radius: 4px;
  }
  
  .click-hint {
    font-size: 7px;
    margin-top: 8px;
    color: #ffd93d;
    animation: pulse 1s infinite;
  }
  
  .tv-static {
    width: 100%;
    height: 100%;
    background: repeating-radial-gradient(circle at 20% 30%, #333, #000 2px);
    position: relative;
  }
  
  .static-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.05) 0px,
      rgba(255,255,255,0.05) 2px,
      transparent 2px,
      transparent 8px
    );
    animation: staticNoise 0.3s steps(2) infinite;
  }
  
  .no-signal {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    font-family: monospace;
    font-size: 12px;
    animation: blink 1.5s infinite;
  }
  
  .tv-buttons {
    position: absolute;
    bottom: 12px;
    left: 20px;
    right: 20px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  button.knob {
    width: 20px;
    height: 20px;
    background: #5a3a2a;
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.2);
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    padding: 0;
  }
  
  button.knob:hover {
    background: #7a4a3a;
    transform: scale(1.05);
  }
  
  .volume-knob {
    width: 20px;
    height: 20px;
    background: #5a3a2a;
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.2);
  }
  
  .tv-buttons button.button {
    background: #3a2518;
    padding: 2px 6px;
    font-size: 8px;
    color: #aaa;
    font-family: monospace;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  
  .tv-buttons button.button:hover {
    background: #5a3a2a;
    color: #fff;
    transform: scale(1.05);
  }
  
  .zoom-btn {
    background: #e74c3c !important;
    color: white !important;
    font-weight: bold;
  }
  
  /* Cupboard/Shelf Unit */
  .cupboard {
    position: absolute;
    right: 40px;
    top: 10%;
    width: 200px;
    height: 75%;
    background: #6B3A1B;
    border-radius: 12px 12px 8px 8px;
    box-shadow: -8px 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    border: 1px solid #4A2A12;
  }
  
  .cupboard-top {
    height: 15px;
    background: #7B4A2B;
    border-radius: 8px 8px 0 0;
    border-bottom: 2px solid #4A2A12;
  }
  
  .cupboard-body {
    height: calc(100% - 30px);
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .cupboard-shelf {
    flex: 1;
    background: #8B5A2B;
    border-radius: 6px;
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -2px 0 #4A2A12;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    position: relative;
  }
  
  .cupboard-shelf::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: #6B3A1B;
    border-radius: 4px 0 0 4px;
    box-shadow: inset -1px 0 0 #4A2A12;
  }
  
  .vhs-tape-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }
  
  /* VHS Tapes - Button styling */
  button.vhs-tape {
    width: 55px;
    height: 75px;
    cursor: grab;
    transition: transform 0.2s, margin-right 0.2s;
    z-index: 10;
    background: none;
    border: none;
    padding: 0;
    position: relative;
  }
  
  button.vhs-tape:hover {
    transform: translateX(-8px) scale(1.03);
    margin-right: -5px;
  }
  
  button.vhs-tape:active {
    cursor: grabbing;
  }
  
  .vhs-spine {
    width: 100%;
    height: 100%;
    background: var(--vhs-color);
    border-radius: 4px 2px 2px 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    box-shadow: -3px 3px 8px rgba(0,0,0,0.3);
    border-left: 3px solid rgba(255,255,255,0.3);
    border-right: 1px solid rgba(0,0,0,0.2);
  }
  
  .vhs-title {
    font-size: 8px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
    letter-spacing: 1px;
    text-align: center;
    word-break: break-word;
    padding: 0 4px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .vhs-year {
    font-size: 7px;
    color: rgba(255,255,255,0.9);
    background: rgba(0,0,0,0.4);
    padding: 2px 4px;
    border-radius: 3px;
    font-weight: bold;
  }
  
  .vhs-label {
    position: absolute;
    top: 10px;
    left: -20px;
    width: 24px;
    height: 35px;
    background: linear-gradient(135deg, #E8E8E8, #B0B0B0);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -2px 2px 4px rgba(0,0,0,0.3);
    border: 1px solid #888;
  }
  
  .vhs-label-text {
    font-size: 10px;
    font-weight: bold;
    color: #222;
    transform: rotate(-90deg);
    letter-spacing: 1px;
  }
  
  /* Dragging clone */
  .dragging-vhs {
    position: fixed;
    width: 55px;
    height: 75px;
    z-index: 1000;
    pointer-events: none;
    opacity: 0.85;
    cursor: grabbing;
    filter: drop-shadow(0 8px 12px rgba(0,0,0,0.4));
    transform: rotate(5deg);
  }
  
  .dragging-vhs .vhs-spine {
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(5px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  }
  
  .modal-content {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border-radius: 20px;
    width: 90%;
    max-width: 900px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 4px #e74c3c;
    animation: zoomInModal 0.3s ease-out;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    background: rgba(231,76,60,0.2);
    border-bottom: 2px solid #e74c3c;
  }
  
  .modal-header h2 {
    color: #e74c3c;
    font-family: 'Press Start 2P', monospace;
    font-size: 16px;
    margin: 0;
  }
  
  .close-btn {
    background: #e74c3c;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    transform: scale(1.1);
    background: #c0392b;
  }
  
  .modal-body {
    padding: 25px;
  }
  
  .image-gallery {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  .gallery-image {
    width: 100%;
    max-height: 350px;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  
  .gallery-nav {
    position: absolute;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    transition: all 0.2s;
  }
  
  .gallery-nav:hover {
    background: #e74c3c;
    transform: scale(1.1);
  }
  
  .gallery-nav.prev {
    left: 10px;
  }
  
  .gallery-nav.next {
    right: 10px;
  }
  
  .image-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 25px;
  }
  
  button.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #555;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    padding: 0;
  }
  
  button.dot.active {
    background: #e74c3c;
    transform: scale(1.3);
  }
  
  button.dot:hover {
    background: #e74c3c;
  }
  
  .project-info {
    margin-top: 20px;
  }
  
  .info-section {
    margin-bottom: 20px;
  }
  
  .info-section h3 {
    color: #e74c3c;
    font-family: 'Press Start 2P', monospace;
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .info-section p {
    color: #ddd;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .tech-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .tech-tag {
    background: rgba(231,76,60,0.2);
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-family: monospace;
  }
  
  .features-list {
    color: #ddd;
    font-size: 14px;
    line-height: 1.8;
    margin: 0;
    padding-left: 20px;
  }
  
  .features-list li {
    margin: 5px 0;
  }
  
  .project-links {
    display: flex;
    gap: 15px;
    margin-top: 25px;
  }
  
  .project-link {
    flex: 1;
    text-align: center;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.2s;
  }
  
  .project-link.live {
    background: #e74c3c;
    color: white;
  }
  
  .project-link.github {
    background: #333;
    color: white;
  }
  
  .project-link:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
  
  /* Decorations */
  
  .poster {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 120px;
    height: 160px;
    background: #FFD700;
    border: 4px solid #8B4513;
    font-family: 'Press Start 2P', monospace;
    font-size: 14px;
    text-align: center;
    padding: 20px 10px;
    transform: rotate(-5deg);
    box-shadow: 8px 8px 0 rgba(0,0,0,0.2);
  }
  
  .cassette-tape {
    position: absolute;
    bottom: 33%;
    right: 23%;
    width: 50px;
    height: 30px;
    background: #444;
    border-radius: 8px;
    opacity: 0.7;
  }
  
  /* Animations */
  @keyframes flicker {
    0% { opacity: 0.98; }
    50% { opacity: 1; }
    100% { opacity: 0.97; }
  }
  
  @keyframes staticNoise {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-1px, 1px); }
    20% { transform: translate(-1px, -1px); }
    30% { transform: translate(1px, 1px); }
    40% { transform: translate(1px, -1px); }
    50% { transform: translate(-1px, -1px); }
    60% { transform: translate(1px, 1px); }
    70% { transform: translate(1px, -1px); }
    80% { transform: translate(-1px, 1px); }
    90% { transform: translate(-1px, -1px); }
    100% { transform: translate(0, 0); }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes zoomInModal {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Scrollbar styling */
  .modal-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .modal-content::-webkit-scrollbar-track {
    background: #1a1a2e;
    border-radius: 4px;
  }
  
  .modal-content::-webkit-scrollbar-thumb {
    background: #e74c3c;
    border-radius: 4px;
  }
  
  .infomercial-content::-webkit-scrollbar {
    width: 4px;
  }
  
  .infomercial-content::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.3);
  }
  
  .infomercial-content::-webkit-scrollbar-thumb {
    background: #ff0000;
  }
</style>