/**
 * Master Application & Motion Controller
 * Portfolio: Sakcham | Creative Technologist & Full-Stack Engineer
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CUSTOM SMOOTH CURSOR (Desktop Lerp Physics & Sleep Throttle)
     ========================================================================== */
  class CustomCursor {
    constructor() {
      this.dot = document.querySelector('.custom-cursor-dot');
      this.ring = document.querySelector('.custom-cursor-ring');
      this.text = document.querySelector('.custom-cursor-text');

      if (!this.dot || !this.ring) return;

      this.mouse = { x: -100, y: -100 };
      this.dotPos = { x: -100, y: -100 };
      this.ringPos = { x: -100, y: -100 };
      this.scale = 1;
      this.targetScale = 1;
      this.isHovering = false;
      this.isTouch = window.matchMedia('(pointer: coarse)').matches;
      this.rafId = null;
      this.idleFrames = 0;

      if (this.isTouch) return;

      this.init();
    }

    init() {
      const startRaf = () => {
        if (!this.rafId) {
          this.idleFrames = 0;
          this.rafId = requestAnimationFrame(this.render.bind(this));
        }
      };

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        if (this.dot.style.opacity !== '1') {
          this.dot.style.opacity = '1';
          this.ring.style.opacity = '1';
        }

        startRaf();
      }, { passive: true });

      document.addEventListener('mouseleave', () => {
        this.dot.style.opacity = '0';
        this.ring.style.opacity = '0';
      });

      document.addEventListener('mouseenter', () => {
        this.dot.style.opacity = '1';
        this.ring.style.opacity = '1';
        startRaf();
      });

      this.bindHoverElements();
      startRaf();
    }

    render() {
      // Crisp responsive tracking for central core
      this.dotPos.x += (this.mouse.x - this.dotPos.x) * 0.45;
      this.dotPos.y += (this.mouse.y - this.dotPos.y) * 0.45;

      // Luxurious smooth lag for outer aura ring
      this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.18;
      this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.18;

      // Smooth scale lerp for tactile micro-interaction
      this.scale += (this.targetScale - this.scale) * 0.22;

      this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;
      this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%) scale(${this.scale.toFixed(3)})`;

      const distRing = Math.abs(this.mouse.x - this.ringPos.x) + Math.abs(this.mouse.y - this.ringPos.y);
      const distScale = Math.abs(this.targetScale - this.scale);

      if (distRing < 0.1 && distScale < 0.005) {
        this.idleFrames++;
        if (this.idleFrames > 15) {
          this.rafId = null;
          return;
        }
      } else {
        this.idleFrames = 0;
      }

      this.rafId = requestAnimationFrame(this.render.bind(this));
    }

    bindHoverElements() {
      // Magnetic hover on buttons, links, cards, and monumental letters
      const interactives = document.querySelectorAll('a, button, input, textarea, .filter-btn, .project-card, .bento-card, .sakcham-char');

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.targetScale = 1.55;
          document.body.classList.add('cursor-hover');
          if (window.soundEngine) window.soundEngine.playHover();
        });

        el.addEventListener('mouseleave', () => {
          this.targetScale = 1.0;
          document.body.classList.remove('cursor-hover');
        });
      });
    }
  }

  /* ==========================================================================
     2. SCROLL PROGRESS BAR & NAVBAR SCROLL BEHAVIOR
     ========================================================================== */
  class NavigationController {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.progressBar = document.querySelector('.scroll-progress-bar');
      this.navLinks = document.querySelectorAll('.navbar-nav .nav-link, .mobile-nav-links .nav-link');
      this.sections = document.querySelectorAll('section[id]');
      this.timelineLine = document.querySelector('.timeline-line-progress');
      this.timelineContainer = document.querySelector('.timeline-container');
      this.menuBtn = document.querySelector('.menu-toggle-btn');
      this.mobileDrawer = document.querySelector('.mobile-nav-drawer');
      this.mobileBackdrop = document.querySelector('.mobile-backdrop');

      this.init();
    }

    init() {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      // High-performance IntersectionObserver Section Spy (Zero layout thrashing on scroll)
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            this.navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });

      this.sections.forEach((sec) => navObserver.observe(sec));

      this.bindMobileMenu();
      this.bindSmoothScroll();
    }

    handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      // Scroll progress
      if (this.progressBar) {
        this.progressBar.style.width = `${progress}%`;
      }

      // Navbar glass shrink
      if (this.navbar) {
        if (scrollY > 40) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }

      // Timeline scroll progress
      if (this.timelineLine && this.timelineContainer) {
        const rect = this.timelineContainer.getBoundingClientRect();
        const winHeight = window.innerHeight;
        if (rect.top < winHeight && rect.bottom > 0) {
          const total = rect.height;
          const current = Math.min(total, Math.max(0, winHeight * 0.7 - rect.top));
          const pct = (current / total) * 100;
          this.timelineLine.style.height = `${pct}%`;
        }
      }
    }

    bindMobileMenu() {
      if (!this.menuBtn || !this.mobileDrawer || !this.mobileBackdrop) return;

      const toggleDrawer = () => {
        const isOpen = this.mobileDrawer.classList.contains('open');
        if (isOpen) {
          this.closeDrawer();
        } else {
          this.openDrawer();
        }
      };

      this.menuBtn.addEventListener('click', toggleDrawer);
      this.mobileBackdrop.addEventListener('click', () => this.closeDrawer());

      const closeDrawerBtn = document.getElementById('mobile-drawer-close-btn');
      if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', () => this.closeDrawer());
      }

      this.mobileDrawer.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => this.closeDrawer());
      });

      // Quick Theme toggle inside mobile drawer
      const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
      const mobileThemeText = document.getElementById('mobile-theme-text');
      if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          if (window.themeManager) {
            window.themeManager.setTheme(next);
          }
          if (mobileThemeText) {
            mobileThemeText.textContent = next === 'dark' ? '🌓 Theme: Dark' : '☀️ Theme: Light';
          }
          if (window.soundEngine) window.soundEngine.playClick();
        });
      }

      // Quick Sound toggle inside mobile drawer
      const mobileSoundToggle = document.getElementById('mobile-sound-toggle');
      const mobileSoundText = document.getElementById('mobile-sound-text');
      if (mobileSoundToggle) {
        mobileSoundToggle.addEventListener('click', () => {
          if (window.soundEngine) {
            const enabled = window.soundEngine.toggle();
            if (mobileSoundText) {
              mobileSoundText.textContent = enabled ? '🔊 Sound: On' : '🔇 Sound: Off';
            }
            if (window.themeManager) {
              window.themeManager.updateSoundIcon();
            }
            showToast(enabled ? 'UI Audio Activated 🔊' : 'Audio Muted 🔇');
          }
        });
      }
    }

    openDrawer() {
      this.menuBtn.classList.add('open');
      this.mobileDrawer.classList.add('open');
      this.mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.soundEngine) window.soundEngine.playClick();
    }

    closeDrawer() {
      this.menuBtn.classList.remove('open');
      this.mobileDrawer.classList.remove('open');
      this.mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    bindSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const navOffset = 70;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navOffset;

            window.scrollTo({
              top: targetPos,
              behavior: 'smooth'
            });

            if (window.soundEngine) window.soundEngine.playClick();
          }
        });
      });
    }
  }

  /* ==========================================================================
     3. INTERSECTION OBSERVER SCROLL REVEALS
     ========================================================================== */
  class ScrollRevealController {
    constructor() {
      this.revealElements = document.querySelectorAll('.reveal-init, .reveal-scale, .reveal-left, .reveal-right');
      this.init();
    }

    init() {
      if (!('IntersectionObserver' in window)) {
        this.revealElements.forEach(el => el.classList.add('is-revealed'));
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      });

      this.revealElements.forEach(el => observer.observe(el));
    }
  }

  /* ==========================================================================
     4. 3D CARD TILT & MOUSE SPOTLIGHT (Awwwards staple)
     ========================================================================== */
  function initSpotlightsAndTilt() {
    const cards = document.querySelectorAll('.spotlight-card, .bento-card, .project-card');

    cards.forEach((card) => {
      let rect = null;

      const cacheRect = () => {
        rect = card.getBoundingClientRect();
      };

      card.addEventListener('mouseenter', () => {
        cacheRect();
        card.style.transition = 'transform 0.08s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
      }, { passive: true });

      card.addEventListener('mousemove', (e) => {
        if (!rect) cacheRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D Tilt calculation
        if (card.classList.contains('project-card') || card.classList.contains('bento-avatar')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        rect = null;
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease';
        if (card.classList.contains('project-card') || card.classList.contains('bento-avatar')) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        }
      });
    });
  }
  window.initSpotlights = initSpotlightsAndTilt;

  /* ==========================================================================
     5. THEME & ACCENT COLOR MANAGER
     ========================================================================== */
  class ThemeManager {
    constructor() {
      window.themeManager = this;
      this.themeToggleBtn = document.getElementById('theme-toggle-btn');
      this.themeIcon = document.getElementById('theme-icon');
      this.accentPills = document.querySelectorAll('.accent-pill');
      this.soundToggleBtn = document.getElementById('sound-toggle-btn');
      this.soundIcon = document.getElementById('sound-icon');

      this.accentPresets = {
        violet: {
          primary: '#8b5cf6',
          primaryRgb: '139, 92, 246',
          secondary: '#06b6d4',
          secondaryRgb: '6, 182, 212',
          tertiary: '#3b82f6',
          glow: 'rgba(139, 92, 246, 0.35)'
        },
        cyan: {
          primary: '#06b6d4',
          primaryRgb: '6, 182, 212',
          secondary: '#3b82f6',
          secondaryRgb: '59, 130, 246',
          tertiary: '#10b981',
          glow: 'rgba(6, 182, 212, 0.35)'
        },
        emerald: {
          primary: '#10b981',
          primaryRgb: '16, 185, 129',
          secondary: '#06b6d4',
          secondaryRgb: '6, 182, 212',
          tertiary: '#84cc16',
          glow: 'rgba(16, 185, 129, 0.35)'
        },
        rose: {
          primary: '#f43f5e',
          primaryRgb: '244, 63, 94',
          secondary: '#8b5cf6',
          secondaryRgb: '139, 92, 246',
          tertiary: '#fb923c',
          glow: 'rgba(244, 63, 94, 0.35)'
        }
      };

      this.init();
    }

    init() {
      // 1. Dark/Light Theme setup
      const savedTheme = localStorage.getItem('sakcham_theme') || 'dark';
      this.setTheme(savedTheme);

      if (this.themeToggleBtn) {
        this.themeToggleBtn.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          this.setTheme(next);
          if (window.soundEngine) window.soundEngine.playClick();
        });
      }

      // 2. Accent color setup
      const savedAccent = localStorage.getItem('sakcham_accent') || 'violet';
      this.setAccent(savedAccent);

      this.accentPills.forEach((pill) => {
        pill.addEventListener('click', () => {
          const accent = pill.dataset.accent;
          this.setAccent(accent);
          if (window.soundEngine) window.soundEngine.playClick();
          showToast(`Accent changed to ${accent.toUpperCase()}`);
        });
      });

      // 3. Sound toggle button setup
      this.updateSoundIcon();
      if (this.soundToggleBtn) {
        this.soundToggleBtn.addEventListener('click', () => {
          if (window.soundEngine) {
            const enabled = window.soundEngine.toggle();
            this.updateSoundIcon();
            showToast(enabled ? 'UI Audio Activated 🔊' : 'Audio Muted 🔇');
          }
        });
      }
    }

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('sakcham_theme', theme);
      window.dispatchEvent(new CustomEvent('sakcham:theme-changed', { detail: { theme } }));

      if (this.themeIcon) {
        if (theme === 'light') {
          // Sun icon
          this.themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          `;
        } else {
          // Moon icon
          this.themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          `;
        }
      }
    }

    setAccent(accentKey) {
      const preset = this.accentPresets[accentKey] || this.accentPresets.violet;
      const root = document.documentElement;

      root.style.setProperty('--accent-primary', preset.primary);
      root.style.setProperty('--accent-primary-rgb', preset.primaryRgb);
      root.style.setProperty('--accent-secondary', preset.secondary);
      root.style.setProperty('--accent-secondary-rgb', preset.secondaryRgb);
      root.style.setProperty('--accent-tertiary', preset.tertiary);
      root.style.setProperty('--accent-glow', preset.glow);

      this.accentPills.forEach((p) => {
        p.classList.toggle('active', p.dataset.accent === accentKey);
      });

      localStorage.setItem('sakcham_accent', accentKey);
      window.dispatchEvent(new CustomEvent('sakcham:accent-changed', { detail: { accent: accentKey } }));
    }

    updateSoundIcon() {
      if (!this.soundIcon) return;
      const isEnabled = window.soundEngine && window.soundEngine.isEnabled;
      if (isEnabled) {
        this.soundIcon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        `;
      } else {
        this.soundIcon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        `;
      }
    }
  }

  /* ==========================================================================
     6. INTERACTIVE BENTO TERMINAL EMULATOR
     ========================================================================== */
  class InteractiveTerminal {
    constructor() {
      this.body = document.getElementById('interactive-terminal-body');
      this.input = document.getElementById('terminal-cli-input');

      this.commands = {
        help: 'Available commands: about, skills, projects, stack, contact, clear, quote',
        about: 'Sakcham is a Creative Technologist & Full-Stack Engineer specializing in high-performance web applications, motion design, and interactive 3D WebGL interfaces.',
        skills: 'Core Stack: TypeScript, React, Next.js, WebGL/Three.js, Node.js, Python, TailwindCSS, Rust/WASM, GLSL Shaders, Cloud Infrastructure.',
        projects: 'Featured works include Aetheria AI Studio, Chronos 3D Physics Engine, Vesper FinTech Terminal, and Pulse Cloud OS.',
        stack: 'Architecture: Micro-frontends, Web Workers, IndexedDB, WebSockets, Canvas/WebGL hardware acceleration, CI/CD pipelines.',
        contact: 'Email: sakcham.dev@example.com | GitHub: github.com/sakcham | Status: Open for collaborations & bespoke builds.',
        quote: '"Simplicity is the prerequisite for reliability." — Edsger W. Dijkstra',
        clear: 'CLEAR_ACTION'
      };

      this.init();
    }

    init() {
      if (!this.input || !this.body) return;

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = this.input.value.trim().toLowerCase();
          this.execute(val);
          this.input.value = '';
        }
      });
    }

    execute(cmd) {
      if (!cmd) return;

      const row = document.createElement('div');
      row.style.marginBottom = '0.5rem';

      const promptLine = document.createElement('div');
      promptLine.innerHTML = `<span class="terminal-prompt">sakcham@terminal:~$</span> <span class="terminal-command">${escapeHtml(cmd)}</span>`;
      row.appendChild(promptLine);

      if (cmd === 'clear') {
        this.body.innerHTML = '';
        return;
      }

      const responseText = this.commands[cmd] || `command not found: "${escapeHtml(cmd)}". Type <span style="color:var(--accent-primary)">help</span> for a list of commands.`;

      const outputLine = document.createElement('div');
      outputLine.className = 'terminal-output';
      outputLine.innerHTML = responseText;
      row.appendChild(outputLine);

      this.body.appendChild(row);
      this.body.scrollTop = this.body.scrollHeight;

      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  /* ==========================================================================
     7. REALTIME LIVE CLOCK (Bento Grid)
     ========================================================================== */
  function startLiveClock() {
    const timeEl = document.getElementById('live-clock-time');
    const tzEl = document.getElementById('live-clock-tz');
    if (!timeEl) return;

    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      timeEl.textContent = `${hours}:${minutes}:${seconds}`;

      if (tzEl) {
        const offset = -now.getTimezoneOffset() / 60;
        const sign = offset >= 0 ? '+' : '';
        tzEl.textContent = `UTC${sign}${offset} • Local Time`;
      }
    };

    update();
    setInterval(update, 1000);
  }

  /* ==========================================================================
     8. ANIMATED STATS COUNTER
     ========================================================================== */
  function initStatsCounter() {
    const statElements = document.querySelectorAll('.counter-animate');
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          statElements.forEach((el) => {
            const target = parseFloat(el.dataset.target);
            const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1800;
            const start = performance.now();

            const frame = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              // EaseOutExpo
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = target * ease;

              el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(frame);
              }
            };
            requestAnimationFrame(frame);
          });
        }
      });
    }, { threshold: 0.2 });

    const container = document.querySelector('.hero-metrics-strip');
    if (container) observer.observe(container);
  }

  /* ==========================================================================
     9. TOAST NOTIFICATIONS & EMAIL COPY
     ========================================================================== */
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-primary)">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
  window.showToast = showToast;

  function bindEmailCopy() {
    const copyBadge = document.getElementById('copy-email-badge');
    if (!copyBadge) return;

    copyBadge.addEventListener('click', () => {
      const email = 'sakcham.dev@example.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard! 📋');
        if (window.soundEngine) window.soundEngine.playSuccess();
      }).catch(() => {
        showToast('Address: sakcham.dev@example.com');
      });
    });
  }

  /* ==========================================================================
     10. CONTACT FORM SUBMISSION HANDLER
     ========================================================================== */
  function bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const statusBox = form.querySelector('.form-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        statusBox.className = 'form-status error';
        statusBox.textContent = 'Please fill out all required fields.';
        return;
      }

      // Simulate sending with high-end micro-interaction
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: rotate-slow 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Transmitting Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        statusBox.className = 'form-status success';
        statusBox.textContent = 'Thank you! Your message was delivered successfully. Expect a response within 24 hours.';
        form.reset();
        showToast('Message sent! Sakcham will get back to you shortly.');
        if (window.soundEngine) window.soundEngine.playSuccess();
      }, 1200);
    });
  }

  /* ==========================================================================
     11. SKILLS FILTERING HANDLER
     ========================================================================== */
  function bindSkillsFilter() {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.category;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (window.soundEngine) window.soundEngine.playClick();

        skillCards.forEach((card) => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  /* ==========================================================================
     12. SAKCHAM MONUMENTAL HERO ANIMATOR & INTERACTION
     ========================================================================== */
  class SakchamHeroAnimator {
    constructor() {
      this.monument = document.getElementById('sakcham-hero-name');
      this.letters = document.querySelectorAll('.sakcham-char');
      this.canvas = document.getElementById('hero-particle-canvas');
      this.init();
    }

    init() {
      if (!this.monument || !this.letters.length) return;

      this.letters.forEach((char, idx) => {
        char.addEventListener('mouseenter', (e) => {
          if (window.soundEngine) {
            window.soundEngine.playLetterChime(idx);
          }

          // Trigger particle sparks in canvas at letter location
          if (window.heroMesh && this.canvas) {
            const rect = char.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();
            const x = rect.left + rect.width / 2 - canvasRect.left;
            const y = rect.top + rect.height / 2 - canvasRect.top;
            window.heroMesh.burst(x, y, 22);
          }
        });

        char.addEventListener('click', (e) => {
          if (window.soundEngine) {
            window.soundEngine.playCosmicBurst();
          }

          if (window.heroMesh && this.canvas) {
            const rect = char.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();
            const x = rect.left + rect.width / 2 - canvasRect.left;
            const y = rect.top + rect.height / 2 - canvasRect.top;
            window.heroMesh.burst(x, y, 60);
          }
        });

        // Touch device tap interaction
        char.addEventListener('touchstart', (e) => {
          if (window.soundEngine) {
            window.soundEngine.playLetterChime(idx);
          }

          if (window.heroMesh && this.canvas && e.touches && e.touches[0]) {
            const touch = e.touches[0];
            const canvasRect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - canvasRect.left;
            const y = touch.clientY - canvasRect.top;
            window.heroMesh.burst(x, y, 25);
          }
        }, { passive: true });
      });

      // Monument overall click: cosmic ripple across the entire universe
      this.monument.addEventListener('click', (e) => {
        if (e.target.classList.contains('sakcham-char')) return; // Handled individually
        if (window.soundEngine) window.soundEngine.playCosmicBurst();
        if (window.heroMesh) window.heroMesh.triggerCosmicRipple();
        this.triggerLetterWave();
      });
    }

    triggerLetterWave() {
      this.letters.forEach((char, i) => {
        setTimeout(() => {
          char.style.transform = 'translateY(-26px) scale(1.24) rotate(4deg)';
          setTimeout(() => {
            char.style.transform = '';
          }, 350);
        }, i * 70);
      });
    }

    playSymphony() {
      this.letters.forEach((char, i) => {
        setTimeout(() => {
          if (window.soundEngine) window.soundEngine.playLetterChime(i);
          char.style.transform = 'translateY(-22px) scale(1.2) rotate(3deg)';
          if (window.heroMesh && this.canvas) {
            const rect = char.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();
            const x = rect.left + rect.width / 2 - canvasRect.left;
            const y = rect.top + rect.height / 2 - canvasRect.top;
            window.heroMesh.burst(x, y, 16);
          }
          setTimeout(() => {
            char.style.transform = '';
          }, 320);
        }, i * 90);
      });
    }

    disperse3D() {
      this.letters.forEach((char, i) => {
        const xOffsets = [-60, -40, -20, 0, 20, 40, 60];
        const yOffsets = [-30, -50, -35, -55, -35, -50, -30];
        const rot = (i - 3) * 12;

        char.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        char.style.transform = `translate3d(${xOffsets[i]}px, ${yOffsets[i]}px, 40px) rotate(${rot}deg) scale(1.15)`;

        setTimeout(() => {
          char.style.transform = '';
          setTimeout(() => {
            char.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.35s ease';
          }, 450);
        }, 550);
      });
    }
  }

  /* ==========================================================================
     13. CYBER MATRIX TEXT SCRAMBLER (Throttled DOM Reflow)
     ========================================================================== */
  class CyberTextScrambler {
    constructor(elementId, phrases) {
      this.el = document.getElementById(elementId);
      this.phrases = phrases;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.frame = 0;
      this.queue = [];
      this.phraseIndex = 0;
      this.isScrambling = false;

      if (!this.el) return;
      this.init();
    }

    init() {
      this.update = this.update.bind(this);
      setTimeout(() => this.next(), 2500);
    }

    setText(newText) {
      const oldText = this.el.textContent || '';
      const length = Math.max(oldText.length, newText.length);
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 8);
        const end = start + Math.floor(Math.random() * 12);
        this.queue.push({ from, to, start, end, char: '' });
      }

      cancelAnimationFrame(this.frameReq);
      this.frame = 0;
      this.isScrambling = true;
      this.update();
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0; i < this.queue.length; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }

      // Update DOM every frame during active scramble
      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.isScrambling = false;
        this.el.textContent = this.phrases[this.phraseIndex];
        setTimeout(() => this.next(), 3800);
      } else {
        this.frameReq = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    next() {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      this.setText(this.phrases[this.phraseIndex]);
    }
  }

  /* ==========================================================================
     HERO 3D SPATIAL PARALLAX CONTROLLER (Apple/Awwwards Inertia)
     ========================================================================== */
  class HeroParallaxController {
    constructor() {
      this.hero = document.getElementById('hero');
      this.stage = document.querySelector('.sakcham-hero-stage');
      this.spatialLeft = document.querySelector('.spatial-left');
      this.spatialRight = document.querySelector('.spatial-right');

      if (!this.hero || !this.stage) return;

      this.isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (this.isTouch) return;

      this.targetTiltX = 0;
      this.targetTiltY = 0;
      this.currentTiltX = 0;
      this.currentTiltY = 0;
      this.rafId = null;
      this.isVisible = true;

      this.init();
    }

    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          this.isVisible = e.isIntersecting;
          if (!this.isVisible && this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
          } else if (this.isVisible && !this.rafId) {
            this.startLoop();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(this.hero);

      let rect = null;
      const updateRect = () => {
        if (this.hero) rect = this.hero.getBoundingClientRect();
      };
      updateRect();
      window.addEventListener('resize', updateRect, { passive: true });
      window.addEventListener('scroll', updateRect, { passive: true });

      this.hero.addEventListener('mouseenter', updateRect, { passive: true });

      this.hero.addEventListener('mousemove', (e) => {
        if (!rect) updateRect();
        const centerX = (rect ? rect.left : 0) + (rect ? rect.width / 2 : window.innerWidth / 2);
        const centerY = (rect ? rect.top : 0) + (rect ? rect.height / 2 : window.innerHeight / 2);
        const normX = (e.clientX - centerX) / (rect ? rect.width / 2 : 1);
        const normY = (e.clientY - centerY) / (rect ? rect.height / 2 : 1);

        this.targetTiltX = Math.max(-1, Math.min(1, normX));
        this.targetTiltY = Math.max(-1, Math.min(1, normY));

        this.startLoop();
      }, { passive: true });

      this.hero.addEventListener('mouseleave', () => {
        this.targetTiltX = 0;
        this.targetTiltY = 0;
      }, { passive: true });

      this.startLoop();
    }

    startLoop() {
      if (!this.rafId && this.isVisible) {
        this.rafId = requestAnimationFrame(this.render.bind(this));
      }
    }

    render() {
      // Damped lerp (0.07 ease)
      this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.07;
      this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.07;

      const rotY = (this.currentTiltX * 7.5).toFixed(2);
      const rotX = (this.currentTiltY * -5.5).toFixed(2);

      this.stage.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, 0, 0)`;

      if (this.spatialLeft) {
        this.spatialLeft.style.transform = `translate3d(${(this.currentTiltX * -14).toFixed(1)}px, ${(this.currentTiltY * -10).toFixed(1)}px, 0) rotate(-3deg)`;
      }
      if (this.spatialRight) {
        this.spatialRight.style.transform = `translate3d(${(this.currentTiltX * 14).toFixed(1)}px, ${(this.currentTiltY * 10).toFixed(1)}px, 0) rotate(3deg)`;
      }

      const delta = Math.abs(this.targetTiltX - this.currentTiltX) + Math.abs(this.targetTiltY - this.currentTiltY);
      if (delta < 0.001) {
        this.rafId = null;
        return;
      }

      this.rafId = requestAnimationFrame(this.render.bind(this));
    }
  }

  /* ==========================================================================
     14. HERO FX TOOLBAR CONTROLLER
     ========================================================================== */
  function bindHeroFxButtons(heroAnimator) {
    const laserBtn = document.getElementById('fx-laser-pulse');
    const gravityBtn = document.getElementById('fx-gravity-burst');
    const disperseBtn = document.getElementById('fx-3d-disperse');
    const chimeBtn = document.getElementById('fx-chime-symphony');

    if (laserBtn) {
      laserBtn.addEventListener('click', () => {
        const beam = document.querySelector('.sakcham-laser-beam');
        if (beam) {
          beam.style.animation = 'none';
          beam.offsetHeight; // Reflow
          beam.style.animation = 'sakcham-laser-sweep 1.2s cubic-bezier(0.2, 0, 0.2, 1) 2';
        }
        if (window.soundEngine) window.soundEngine.playClick();
        showToast('⚡ Laser Beam Accelerated across SAKCHAM');
      });
    }

    if (gravityBtn) {
      gravityBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playCosmicBurst();
        if (window.heroMesh) window.heroMesh.triggerCosmicRipple();
        showToast('🌌 Cosmic Gravitational Shockwave Unleashed');
      });
    }

    if (disperseBtn) {
      disperseBtn.addEventListener('click', () => {
        if (heroAnimator) heroAnimator.disperse3D();
        if (window.soundEngine) window.soundEngine.playClick();
        showToast('✦ 3D Kinetic Dispersion Engaged');
      });
    }

    if (chimeBtn) {
      chimeBtn.addEventListener('click', () => {
        if (heroAnimator) heroAnimator.playSymphony();
        showToast('🎵 SAKCHAM Harmonic Chime Symphony');
      });
    }
  }

  /* ==========================================================================
     15. UTILITY HELPERS
     ========================================================================== */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ==========================================================================
     BOOTSTRAP ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
    new NavigationController();
    new ScrollRevealController();
    new ThemeManager();
    new InteractiveTerminal();

    initSpotlightsAndTilt();
    startLiveClock();
    initStatsCounter();
    bindEmailCopy();
    bindContactForm();
    bindSkillsFilter();

    // Sakcham Monumental Animations
    const heroAnimator = new SakchamHeroAnimator();
    bindHeroFxButtons(heroAnimator);
    new HeroParallaxController();

    new CyberTextScrambler('sakcham-scramble-role', [
      'CREATIVE TECHNOLOGIST & FULL-STACK ARCHITECT',
      'INTERACTIVE 3D & WEBGL SHADER SPECIALIST',
      '60 FPS MOTION SYSTEMS & GRAPHICS ENGINEER',
      'DISTRIBUTED REACTIVE PLATFORMS ARCHITECT'
    ]);

    console.log(
      '%c Sakcham Portfolio %c Engineered with Vanilla HTML5, CSS3 & JavaScript 🚀 ',
      'background: #8b5cf6; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      'background: #121216; color: #38bdf8; padding: 4px 8px; border-radius: 4px;'
    );
  });
})();

