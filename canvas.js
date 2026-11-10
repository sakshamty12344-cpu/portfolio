/**
 * Highly Optimized Canvas & Particle Physics Engine
 * Hero Constellation Network & Playground Fluid Sandbox
 * 60/120 FPS Targeted, Zero Layout Thrashing, Battery-Friendly
 */

(function () {
  'use strict';

  // Shared cached colors to avoid getComputedStyle inside RAF
  let cachedAccentPrimary = '139, 92, 246';
  let cachedAccentSecondary = '6, 182, 212';

  function updateColorCache() {
    const computed = getComputedStyle(document.documentElement);
    cachedAccentPrimary = computed.getPropertyValue('--accent-primary-rgb').trim() || '139, 92, 246';
    cachedAccentSecondary = computed.getPropertyValue('--accent-secondary-rgb').trim() || '6, 182, 212';
  }

  // Update once on boot and listen to theme/accent change events
  updateColorCache();
  window.addEventListener('sakcham:accent-changed', updateColorCache, { passive: true });
  window.addEventListener('sakcham:theme-changed', updateColorCache, { passive: true });

  /* ==========================================================================
     HERO PARTICLE CONSTELLATION MESH
     ========================================================================== */
  class HeroParticleMesh {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.particles = [];
      this.sparks = [];
      this.mouse = { x: -1000, y: -1000, radius: 160 };
      this.animId = null;
      this.isVisible = true;
      this.isTabActive = !document.hidden;

      this.maxDistance = 140;
      window.heroMesh = this;

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.bindEvents();
      this.start();
    }

    resize() {
      if (!this.canvas || !this.canvas.parentElement) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.width = rect.width;
      this.height = rect.height;

      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      this.ctx.scale(this.dpr, this.dpr);

      // Responsive particle count based on display area
      const area = this.width * this.height;
      this.particleCount = Math.floor(Math.min(85, Math.max(30, area / 17000)));
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1,
          baseRadius: Math.random() * 2 + 1,
          colorAlpha: Math.random() * 0.4 + 0.3
        });
      }
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.createParticles();
        }, 150);
      }, { passive: true });

      const parent = this.canvas.parentElement;
      let cachedParentRect = null;
      const updateParentRect = () => {
        if (parent) cachedParentRect = parent.getBoundingClientRect();
      };
      updateParentRect();
      window.addEventListener('scroll', updateParentRect, { passive: true });
      window.addEventListener('resize', updateParentRect, { passive: true });

      parent.addEventListener('mouseenter', updateParentRect, { passive: true });
      parent.addEventListener('mousemove', (e) => {
        if (!cachedParentRect) updateParentRect();
        this.mouse.x = e.clientX - (cachedParentRect ? cachedParentRect.left : 0);
        this.mouse.y = e.clientY - (cachedParentRect ? cachedParentRect.top : 0);
      }, { passive: true });

      parent.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      }, { passive: true });

      // Performance: Pause when off-screen
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && this.isTabActive && !this.animId) {
            this.animate();
          } else if (!this.isVisible && this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
          }
        });
      }, { threshold: 0.05 });

      observer.observe(parent);

      // Performance: Pause when tab is not visible
      document.addEventListener('visibilitychange', () => {
        this.isTabActive = !document.hidden;
        if (this.isVisible && this.isTabActive && !this.animId) {
          this.animate();
        } else if (!this.isTabActive && this.animId) {
          cancelAnimationFrame(this.animId);
          this.animId = null;
        }
      });
    }

    animate() {
      if (!this.isVisible || !this.isTabActive) {
        this.animId = null;
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      const accentRgb = cachedAccentPrimary;
      const accentSecondaryRgb = cachedAccentSecondary;
      const len = this.particles.length;
      const maxDistSq = this.maxDistance * this.maxDistance;
      const mouseRadiusSq = this.mouse.radius * this.mouse.radius;
      const hasMouse = this.mouse.x > -500;

      // Update and draw network particles
      for (let i = 0; i < len; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > this.width) { p.x = this.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > this.height) { p.y = this.height; p.vy *= -1; }

        // Mouse proximity repulsion & mouse tether line
        if (hasMouse) {
          const mdx = this.mouse.x - p.x;
          const mdy = this.mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseRadiusSq && mDistSq > 0.01) {
            const dist = Math.sqrt(mDistSq);
            const force = (1 - dist / this.mouse.radius) * 2;
            p.x -= (mdx / dist) * force;
            p.y -= (mdy / dist) * force;
            p.radius = p.baseRadius * 1.5;

            // Connect particle to mouse
            const mouseAlpha = (1 - dist / this.mouse.radius) * 0.32;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.strokeStyle = `rgba(${accentSecondaryRgb}, ${mouseAlpha})`;
            this.ctx.lineWidth = 1.1;
            this.ctx.stroke();
          } else {
            p.radius = p.baseRadius;
          }
        } else {
          p.radius = p.baseRadius;
        }

        // Particle circle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${accentRgb}, ${p.colorAlpha})`;
        this.ctx.fill();

        // Mesh connection lines (squared distance check cuts 95% of Math.sqrt calls)
        for (let j = i + 1; j < len; j++) {
          const p2 = this.particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const distSq = pdx * pdx + pdy * pdy;

          if (distSq < maxDistSq) {
            const distP = Math.sqrt(distSq);
            const alpha = (1 - distP / this.maxDistance) * 0.2;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        }
      }

      // Kinetic sparks (from Sakcham letter interactions)
      for (let s = this.sparks.length - 1; s >= 0; s--) {
        const spark = this.sparks[s];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.94;
        spark.vy *= 0.94;
        spark.alpha -= spark.decay;
        spark.size *= 0.96;

        if (spark.alpha <= 0.02 || spark.size <= 0.2) {
          this.sparks.splice(s, 1);
          continue;
        }

        this.ctx.beginPath();
        this.ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        this.ctx.fillStyle = spark.color.replace('ALPHA', spark.alpha.toFixed(2));
        this.ctx.fill();
      }

      this.animId = requestAnimationFrame(() => this.animate());
    }

    burst(x, y, count = 30) {
      const accentRgb = cachedAccentPrimary;
      const accentSecondaryRgb = cachedAccentSecondary;

      const colors = [
        `rgba(${accentRgb}, ALPHA)`,
        `rgba(${accentSecondaryRgb}, ALPHA)`,
        `rgba(255, 255, 255, ALPHA)`
      ];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 2;
        this.sparks.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.8 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    triggerCosmicRipple() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;

      this.particles.forEach((p) => {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.hypot(dx, dy) || 1;
        const force = (1100 / (dist + 90));
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      });

      this.burst(centerX, centerY, 50);
    }

    start() {
      if (!this.animId) {
        this.animate();
      }
    }
  }

  /* ==========================================================================
     INTERACTIVE KINETIC PLAYGROUND CANVAS (WAVE HARMONICS)
     ========================================================================== */
  class PlaygroundWaveCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.mouse = { x: 0, y: 0, isHover: false };
      this.time = 0;
      this.waveSpeed = 0.028;
      this.gridCols = 36;
      this.animId = null;
      this.isVisible = false;
      this.isTabActive = !document.hidden;

      this.init();
    }

    init() {
      this.resize();
      this.bindEvents();
    }

    resize() {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = rect.width;
      this.height = rect.height;

      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.updateRect();
        }, 150);
      }, { passive: true });

      this.cachedRect = null;
      this.updateRect = () => {
        if (this.canvas) this.cachedRect = this.canvas.getBoundingClientRect();
      };
      this.updateRect();
      window.addEventListener('scroll', this.updateRect, { passive: true });

      this.canvas.addEventListener('mouseenter', () => {
        this.updateRect();
        this.mouse.isHover = true;
      }, { passive: true });

      this.canvas.addEventListener('mousemove', (e) => {
        if (!this.cachedRect) this.updateRect();
        this.mouse.x = e.clientX - (this.cachedRect ? this.cachedRect.left : 0);
        this.mouse.y = e.clientY - (this.cachedRect ? this.cachedRect.top : 0);
        this.mouse.isHover = true;
      }, { passive: true });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.isHover = false;
      }, { passive: true });

      this.canvas.addEventListener('click', () => {
        this.time += 1.4;
        if (window.soundEngine) window.soundEngine.playClick();
      });

      // Pause when out of viewport to maximize battery & performance
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && this.isTabActive && !this.animId) {
            this.animate();
          } else if (!this.isVisible && this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
          }
        });
      }, { threshold: 0.1 });

      observer.observe(this.canvas);

      document.addEventListener('visibilitychange', () => {
        this.isTabActive = !document.hidden;
        if (this.isVisible && this.isTabActive && !this.animId) {
          this.animate();
        } else if (!this.isTabActive && this.animId) {
          cancelAnimationFrame(this.animId);
          this.animId = null;
        }
      });
    }

    animate() {
      if (!this.isVisible || !this.isTabActive) {
        this.animId = null;
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);
      this.time += this.waveSpeed;

      const accentRgb = cachedAccentPrimary;
      const accentSecondaryRgb = cachedAccentSecondary;

      const numLines = 8;
      const stepX = this.width / this.gridCols;

      for (let l = 0; l < numLines; l++) {
        this.ctx.beginPath();
        const lineYBase = (this.height / (numLines + 1)) * (l + 1);

        for (let i = 0; i <= this.gridCols; i++) {
          const x = i * stepX;
          const wave = Math.sin(i * 0.35 + this.time + l * 0.45) * 15;

          // Mouse disturbance (squared distance check)
          let mouseDistortion = 0;
          if (this.mouse.isHover) {
            const dx = x - this.mouse.x;
            const dy = lineYBase - this.mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 12100) {
              const dist = Math.sqrt(distSq);
              mouseDistortion = Math.cos(dist * 0.05) * (1 - dist / 110) * 30;
            }
          }

          const y = lineYBase + wave + mouseDistortion;

          if (i === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }

        const alpha = 0.15 + (l / numLines) * 0.55;
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, `rgba(${accentRgb}, ${alpha * 0.7})`);
        gradient.addColorStop(0.5, `rgba(${accentSecondaryRgb}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${accentRgb}, ${alpha * 0.7})`);

        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = l % 2 === 0 ? 1.6 : 1;
        this.ctx.stroke();
      }

      this.animId = requestAnimationFrame(() => this.animate());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new HeroParticleMesh('hero-particle-canvas');
    new PlaygroundWaveCanvas('interactive-playground-canvas');
  });
})();
