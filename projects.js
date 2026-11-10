/**
 * Projects Showcase & Modal Controller
 * Portfolio: Sakcham | Creative Technologist & Full-Stack Engineer
 * Features: Next/Prev Project Navigation, Keyboard Arrows, Accessible Focus
 */

const portfolioProjects = [
  {
    id: 'aetheria-ai',
    title: 'Aetheria Studio — Generative Canvas',
    category: 'ai',
    categoryName: 'AI & Machine Learning',
    summary: 'A futuristic infinite canvas for multi-modal generative AI pipelines, real-time node orchestration, and latent space navigation.',
    tags: ['React', 'TypeScript', 'WebGL', 'WebSockets', 'Python / FastAPI'],
    badge: 'Award Winner',
    metrics: [
      { num: '60 FPS', label: 'Canvas Rendering' },
      { num: '45ms', label: 'Inference Latency' },
      { num: '120k+', label: 'Active Sessions' }
    ],
    accentColor: '#8b5cf6',
    github: 'https://github.com/example/aetheria-studio',
    demo: 'https://example.com/aetheria-live',
    overview: 'Aetheria Studio was engineered to dismantle the cumbersome multi-tab UX of contemporary generative workflows. Designed around an infinite 2D canvas with WebGL-accelerated node graph routing, users can pipe streaming LLM reasoning traces into diffusion pipelines, audio synthesizers, and procedural code execution blocks simultaneously.',
    challenge: 'Rendering hundreds of interactive node cards, live bezier curve wire connections, and dynamic video viewports simultaneously without dropping frames under heavy pan/zoom navigation.',
    solution: 'Built a custom offscreen Canvas compositor with spatial partitioning (Quadtree) and spatial indexing. Implemented Web Workers for node data serialization and WebSockets binary streaming with ArrayBuffers for zero-copy UI updates.',
    svgType: 'canvas-nodes'
  },
  {
    id: 'chronos-engine',
    title: 'Chronos 3D — WebGL Physics Simulation',
    category: 'creative',
    categoryName: 'Creative Coding & 3D',
    summary: 'Browser-based 3D particle physics sandbox and gravitational simulation engine powered by custom GLSL compute shaders.',
    tags: ['Three.js', 'GLSL', 'WebGPU', 'TypeScript', 'Math'],
    badge: 'Awwwards Site of the Day',
    metrics: [
      { num: '1M+', label: 'Particles at 60 FPS' },
      { num: '0.8MB', label: 'Bundle Footprint' },
      { num: '99.8%', label: 'GPU Compatibility' }
    ],
    accentColor: '#06b6d4',
    github: 'https://github.com/example/chronos-engine',
    demo: 'https://example.com/chronos-live',
    overview: 'Chronos pushes the computational ceiling of the web browser. Leveraging WebGPU compute passes and optimized GLSL fallback shaders, it computes N-body celestial mechanics and fluid dynamics completely on the client GPU in real time.',
    challenge: 'Balancing precision and floating-point stability across varied mobile GPU architectures without overheating mobile chips.',
    solution: 'Engineered hierarchical grid binning and leapfrog integration schemes in custom fragment shaders, coupled with adaptive level-of-detail (LOD) degradation that maintains silky 60/120Hz refresh rates.',
    svgType: 'physics-orbital'
  },
  {
    id: 'vesper-terminal',
    title: 'Vesper — Ultra-Low Latency FinTech Hub',
    category: 'webapps',
    categoryName: 'Full-Stack Web App',
    summary: 'Institutional-grade market intelligence platform featuring streaming candlestick charts, orderbook depth visualization, and real-time execution.',
    tags: ['Next.js', 'Rust / WASM', 'TailwindCSS', 'WebSockets', 'Chart.js'],
    badge: 'Featured Project',
    metrics: [
      { num: '<15ms', label: 'Feed Latency' },
      { num: '$4.2B', label: 'Tracked Volume' },
      { num: '99.99%', label: 'Uptime SLA' }
    ],
    accentColor: '#10b981',
    github: 'https://github.com/example/vesper-terminal',
    demo: 'https://example.com/vesper-live',
    overview: 'Vesper delivers the speed and responsiveness of a native C++ terminal to the browser. Designed for high-frequency algorithmic traders and portfolio managers who require microsecond updates and glitch-free orderbook rendering.',
    challenge: 'Parsing tens of thousands of streaming JSON market depth messages per second without clogging the JavaScript event loop or causing garbage collection pauses.',
    solution: 'Integrated a WebAssembly (Rust) parser module that deserializes raw binary Protobuf streams directly in shared memory, paired with a virtualized DOM table that handles 100,000 live rows seamlessly.',
    svgType: 'chart-terminal'
  },
  {
    id: 'pulse-os',
    title: 'Pulse OS — Cloud Desktop Environment',
    category: 'webapps',
    categoryName: 'Web Operating System',
    summary: 'A complete desktop OS inside the browser with a composable window manager, sandboxed filesystem, and extensible plugin ecosystem.',
    tags: ['Vanilla JS', 'CSS Grid', 'IndexedDB', 'Web Workers', 'PWA'],
    badge: 'Open Source',
    metrics: [
      { num: '32KB', label: 'Zero-Dependency Core' },
      { num: '100/100', label: 'Lighthouse Score' },
      { num: '4.8k★', label: 'GitHub Stars' }
    ],
    accentColor: '#f59e0b',
    github: 'https://github.com/example/pulse-os',
    demo: 'https://example.com/pulse-os-live',
    overview: 'Pulse OS is an exploration into the limits of browser capabilities. It provides a multi-window desktop interface complete with window docking, taskbar notifications, terminal emulator, audio synthesizer, and sandboxed iframe application virtualization.',
    challenge: 'Building a fluid window manager with z-indexing, aero-snap docking, minimize/maximize animations, and state persistence without external frameworks.',
    solution: 'Designed a lightweight custom event-driven reactive state kernel in vanilla ES2024, utilizing native CSS containment, hardware-accelerated transforms, and OPFS (Origin Private File System) for lightning-fast disk IO.',
    svgType: 'desktop-window'
  },
  {
    id: 'krypton-tokens',
    title: 'Krypton — Headless Design Tokens & UI',
    category: 'creative',
    categoryName: 'Design Systems & Tokens',
    summary: 'Enterprise design system token orchestrator that syncs Figma variables, generates zero-runtime CSS, and ensures strict WCAG AAA contrast.',
    tags: ['TypeScript', 'Node.js', 'Figma API', 'PostCSS', 'Style Dictionary'],
    badge: 'Enterprise Tooling',
    metrics: [
      { num: '14+', label: 'Platform Targets' },
      { num: '100%', label: 'WCAG AAA Compliance' },
      { num: '4x', label: 'Faster Designer Handoff' }
    ],
    accentColor: '#ec4899',
    github: 'https://github.com/example/krypton-tokens',
    demo: 'https://example.com/krypton-live',
    overview: 'Krypton solves design token drift across massive engineering organizations. It continuously ingests design variables directly from Figma, computes dynamic contrast mathematical models, and generates compile-time CSS/iOS/Android stylesheets.',
    challenge: 'Maintaining bidirectional synchronization between design assets and multi-repo codebases while automating accessibility regression detection.',
    solution: 'Created an AST compiler that analyzes color pairings through the APCA (Accessible Perceptual Contrast Algorithm) model, generating human-readable diff reports and automated pull requests across 12 downstream repos.',
    svgType: 'tokens-swatches'
  },
  {
    id: 'zenith-spatial',
    title: 'Zenith Spatial — WebXR Audio Visualizer',
    category: 'creative',
    categoryName: 'Spatial Audio & WebXR',
    summary: 'An interactive 3D sound visualizer that maps HRTF binaural spatial acoustics to procedural generative geometries in virtual space.',
    tags: ['WebXR', 'Three.js', 'Web Audio API', 'FFT Analysis', 'GLSL'],
    badge: 'Experimental Lab',
    metrics: [
      { num: '24-Bit', label: 'Audio Resolution' },
      { num: '360°', label: 'HRTF Spatial Sphere' },
      { num: '120 FPS', label: 'VR Headset Refresh' }
    ],
    accentColor: '#3b82f6',
    github: 'https://github.com/example/zenith-spatial',
    demo: 'https://example.com/zenith-live',
    overview: 'Zenith Spatial bridges the physical and sensory perception of sound. By decomposing multi-channel audio stems into frequency spectra with real-time Fast Fourier Transforms (FFT), it deforms complex 3D meshes and emits audio-reactive volumetric rays.',
    challenge: 'Extracting 2048-band FFT data at 120 FPS and pushing coordinates into vertex shaders without stalling VR rendering loops.',
    solution: 'Employed AudioWorklet processors running on high-priority audio threads, passing audio spectrum arrays via SharedArrayBuffer directly to WebGL texture memory for GPU-only mesh displacement.',
    svgType: 'spatial-audio'
  }
];

class ProjectsManager {
  constructor() {
    this.projects = portfolioProjects;
    this.activeFilter = 'all';
    this.currentIndex = 0;
    this.gridContainer = document.getElementById('projects-grid');
    this.filterButtons = document.querySelectorAll('.project-filter-btn');
    this.modalBackdrop = document.getElementById('project-modal');
    this.modalContent = document.getElementById('modal-dynamic-body');
    this.closeBtn = document.getElementById('modal-close-btn');
    this.lastFocusedElement = null;

    this.init();
  }

  init() {
    this.renderProjects(this.projects);
    this.bindEvents();
  }

  bindEvents() {
    // Filter click
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.activeFilter = filter;

        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (window.soundEngine) window.soundEngine.playClick();

        const filtered = filter === 'all' 
          ? this.projects 
          : this.projects.filter(p => p.category === filter);

        this.renderProjects(filtered);
      });
    });

    // Modal close
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) {
          this.closeModal();
        }
      });
    }

    // Keyboard navigation (ESC to close, Left/Right arrows to flip projects)
    window.addEventListener('keydown', (e) => {
      if (!this.modalBackdrop || !this.modalBackdrop.classList.contains('open')) return;

      if (e.key === 'Escape') {
        this.closeModal();
      } else if (e.key === 'ArrowRight') {
        this.nextProject();
      } else if (e.key === 'ArrowLeft') {
        this.prevProject();
      }
    });
  }

  renderProjects(items) {
    if (!this.gridContainer) return;

    this.gridContainer.innerHTML = '';

    items.forEach((proj, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card spotlight-card reveal-init is-revealed';
      card.style.animationDelay = `${idx * 0.08}s`;

      const mockupSvg = this.generateMockupSvg(proj.svgType, proj.accentColor);

      card.innerHTML = `
        <div class="project-preview">
          <div class="project-badge-type">${proj.badge}</div>
          <div class="project-preview-mockup">
            <div class="mockup-inner">
              <div class="mockup-bar">
                <span class="mockup-dot"></span>
                <span class="mockup-dot"></span>
                <span class="mockup-dot"></span>
              </div>
              <div class="mockup-content">
                ${mockupSvg}
              </div>
            </div>
          </div>
        </div>

        <div class="project-body">
          <div class="project-tags">
            ${proj.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-description">${proj.summary}</p>
          <div class="project-footer">
            <button class="btn-details" data-id="${proj.id}" aria-label="Explore Case Study for ${proj.title}">
              <span>Explore Case Study</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <div class="project-links">
              <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="View Source" aria-label="GitHub Repository">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="Live Preview" aria-label="Live Demo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;

      // Event listener for modal view
      const detailsBtn = card.querySelector('.btn-details');
      detailsBtn.addEventListener('click', (e) => {
        this.lastFocusedElement = detailsBtn;
        if (window.soundEngine) window.soundEngine.playClick();
        this.openModalByIndex(this.projects.findIndex(p => p.id === proj.id));
      });

      // Cursor hover hint
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
        const cursorText = document.querySelector('.custom-cursor-text');
        if (cursorText) cursorText.textContent = 'EXPLORE';
      });

      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
      });

      this.gridContainer.appendChild(card);
    });

    if (window.initSpotlights) {
      window.initSpotlights();
    }
  }

  generateMockupSvg(type, color) {
    switch (type) {
      case 'canvas-nodes':
        return `
          <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="25" width="45" height="30" rx="4" fill="rgba(255,255,255,0.06)" stroke="${color}" stroke-width="1.5"/>
            <rect x="135" y="15" width="45" height="30" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
            <rect x="135" y="65" width="45" height="30" rx="4" fill="rgba(255,255,255,0.06)" stroke="${color}" stroke-width="1.5"/>
            <path d="M65 40 C 100 40, 100 30, 135 30" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 3"/>
            <path d="M65 40 C 100 40, 100 80, 135 80" stroke="${color}" stroke-width="1.5"/>
            <circle cx="65" cy="40" r="3" fill="${color}"/>
            <circle cx="135" cy="80" r="3" fill="${color}"/>
          </svg>
        `;
      case 'physics-orbital':
        return `
          <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="60" rx="75" ry="30" stroke="${color}" stroke-width="1" stroke-dasharray="4 4" transform="rotate(-15 100 60)"/>
            <ellipse cx="100" cy="60" rx="55" ry="45" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <circle cx="100" cy="60" r="14" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="2"/>
            <circle cx="150" cy="45" r="5" fill="#38bdf8"/>
            <circle cx="55" cy="70" r="4" fill="#f43f5e"/>
          </svg>
        `;
      case 'chart-terminal':
        return `
          <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="95" x2="180" y2="95" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
            <path d="M25 80 L55 65 L85 75 L115 45 L145 55 L175 25" stroke="${color}" stroke-width="2" fill="none"/>
            <rect x="40" y="55" width="4" height="20" fill="#10b981"/>
            <rect x="70" y="65" width="4" height="18" fill="#ef4444"/>
            <rect x="100" y="35" width="4" height="28" fill="#10b981"/>
            <rect x="130" y="45" width="4" height="20" fill="#10b981"/>
          </svg>
        `;
      case 'desktop-window':
        return `
          <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="150" height="80" rx="6" fill="rgba(255,255,255,0.04)" stroke="${color}" stroke-width="1.5"/>
            <rect x="25" y="20" width="150" height="16" fill="rgba(255,255,255,0.08)"/>
            <circle cx="35" cy="28" r="2.5" fill="#ef4444"/>
            <circle cx="44" cy="28" r="2.5" fill="#f59e0b"/>
            <circle cx="53" cy="28" r="2.5" fill="#10b981"/>
            <rect x="35" y="45" width="70" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
            <rect x="35" y="58" width="100" height="6" rx="2" fill="rgba(255,255,255,0.15)"/>
            <rect x="35" y="71" width="50" height="6" rx="2" fill="${color}"/>
          </svg>
        `;
      case 'tokens-swatches':
        return `
          <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="35" height="35" rx="8" fill="#8b5cf6" fill-opacity="0.8"/>
            <rect x="75" y="30" width="35" height="35" rx="8" fill="#06b6d4" fill-opacity="0.8"/>
            <rect x="120" y="30" width="35" height="35" rx="8" fill="#10b981" fill-opacity="0.8"/>
            <rect x="30" y="75" width="125" height="12" rx="4" fill="rgba(255,255,255,0.1)"/>
          </svg>
        `;
      case 'spatial-audio':
      default:
        return `
          <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="60" x2="40" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <line x1="60" y1="40" x2="60" y2="80" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <line x1="80" y1="25" x2="80" y2="95" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <line x1="100" y1="15" x2="100" y2="105" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <line x1="120" y1="30" x2="120" y2="90" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <line x1="140" y1="45" x2="140" y2="75" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
            <line x1="160" y1="55" x2="160" y2="65" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
          </svg>
        `;
    }
  }

  nextProject() {
    const nextIdx = (this.currentIndex + 1) % this.projects.length;
    this.openModalByIndex(nextIdx);
  }

  prevProject() {
    const prevIdx = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.openModalByIndex(prevIdx);
  }

  openModalByIndex(index) {
    this.currentIndex = index;
    const project = this.projects[index];
    if (!project) return;
    this.openModal(project);
  }

  openModal(project) {
    if (!this.modalBackdrop || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div class="modal-nav-strip">
        <button id="modal-prev-btn" class="modal-nav-btn" aria-label="Previous project (Left Arrow)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Prev</span>
        </button>
        <span class="modal-index-count">${this.currentIndex + 1} / ${this.projects.length}</span>
        <button id="modal-next-btn" class="modal-nav-btn" aria-label="Next project (Right Arrow)">
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <div class="modal-header-img" style="border: 1px solid ${project.accentColor}33">
        ${this.generateMockupSvg(project.svgType, project.accentColor)}
      </div>

      <div class="section-badge">${project.categoryName}</div>
      <h2 class="modal-title">${project.title}</h2>

      <div class="modal-tags">
        ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>

      <div class="modal-metrics-grid">
        ${project.metrics.map(m => `
          <div class="modal-metric">
            <div class="modal-metric-num">${m.num}</div>
            <div class="modal-metric-label">${m.label}</div>
          </div>
        `).join('')}
      </div>

      <div class="modal-section">
        <h4>Architectural Overview</h4>
        <p>${project.overview}</p>
      </div>

      <div class="modal-section">
        <h4>Core Technical Challenge</h4>
        <p>${project.challenge}</p>
      </div>

      <div class="modal-section">
        <h4>Engineering Solution</h4>
        <p>${project.solution}</p>
      </div>

      <div class="modal-actions">
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow">
          <span>Launch Live App</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>Inspect Repository</span>
        </a>
      </div>
    `;

    // Bind next/prev buttons inside the modal
    const prevBtn = this.modalContent.querySelector('#modal-prev-btn');
    const nextBtn = this.modalContent.querySelector('#modal-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.prevProject();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.nextProject();
      });
    }

    this.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    if (this.closeBtn) {
      this.closeBtn.focus();
    }
  }

  closeModal() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';

    // Restore focus to last clicked element
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.projectsManager = new ProjectsManager();
});
