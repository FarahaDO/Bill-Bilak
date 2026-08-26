(() => {
  'use strict';

  class BilBilakMinimap {
    constructor() {
      this.container = null;
      this.canvas = null;
      this.viewport = null;
      this.label = null;
      this.isVisible = false;
      this.snapshot = null;
    }

    create() {
      if (this.container) return;

      this.container = document.createElement('div');
      this.container.id = 'bilbilak-minimap';

      this.canvas = document.createElement('canvas');
      this.canvas.id = 'bilbilak-minimap-canvas';
      this.container.appendChild(this.canvas);

      this.viewport = document.createElement('div');
      this.viewport.id = 'bilbilak-minimap-viewport';
      this.container.appendChild(this.viewport);

      this.label = document.createElement('div');
      this.label.id = 'bilbilak-minimap-label';
      this.label.textContent = '🗺️ نقشه';
      this.container.appendChild(this.label);

      document.body.appendChild(this.container);
      this.updatePosition();
    }

    async show() {
      this.create();
      await this.captureSnapshot();
      this.container.style.opacity = this.getSettings().minimapOpacity || 0.85;
      this.isVisible = true;
    }

    hide() {
      if (this.container) {
        this.container.style.opacity = '0';
        this.isVisible = false;
      }
    }

    async captureSnapshot() {
      try {
        const canvas = this.canvas;
        const settings = this.getSettings();
        const size = settings.minimapSize || 180;
        
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, size, size);
        
        const pageWidth = document.documentElement.scrollWidth;
        const pageHeight = document.documentElement.scrollHeight;
        const scaleX = size / pageWidth;
        const scaleY = size / pageHeight;
        const scale = Math.min(scaleX, scaleY);
        
        const elements = document.querySelectorAll('h1, h2, h3, p, img, video, button, a, div[class*="container"], section, article');
        
        ctx.save();
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const scrollX = window.scrollX || window.pageXOffset;
          const scrollY = window.scrollY || window.pageYOffset;
          
          const x = (rect.left + scrollX) * scale;
          const y = (rect.top + scrollY) * scale;
          const w = rect.width * scale;
          const h = rect.height * scale;
          
          if (w < 1 || h < 1) return;
          
          const tag = el.tagName.toLowerCase();
          if (tag.startsWith('h')) {
            ctx.fillStyle = '#333';
            ctx.fillRect(x, y, w, Math.max(h, 2));
          } else if (tag === 'img' || tag === 'video') {
            ctx.fillStyle = '#ff6b35';
            ctx.fillRect(x, y, w, h);
          } else if (tag === 'button' || tag === 'a') {
            ctx.fillStyle = '#34a853';
            ctx.fillRect(x, y, w, h);
          } else if (tag === 'p') {
            ctx.fillStyle = '#999';
            ctx.fillRect(x, y, w, 1);
          }
        });
        ctx.restore();
        
        this.snapshot = { pageWidth, pageHeight, scale };
      } catch (err) {
        console.warn('BilBilak: خطا در گرفتن snapshot', err);
      }
    }

    updateViewport(x, y, zoomLevel) {
      if (!this.container || !this.isVisible || !this.snapshot) return;
      
      const settings = this.getSettings();
      const size = settings.minimapSize || 180;
      const { pageWidth, pageHeight, scale } = this.snapshot;
      
      const viewportWidth = (window.innerWidth / zoomLevel) * scale;
      const viewportHeight = (window.innerHeight / zoomLevel) * scale;
      
      const centerX = x * scale;
      const centerY = y * scale;
      
      this.viewport.style.width = `${viewportWidth}px`;
      this.viewport.style.height = `${viewportHeight}px`;
      this.viewport.style.left = `${centerX - viewportWidth / 2}px`;
      this.viewport.style.top = `${centerY - viewportHeight / 2}px`;
    }

    updatePosition() {
      if (!this.container) return;
      const settings = this.getSettings();
      const position = settings.minimapPosition || 'bottom-right';
      const size = settings.minimapSize || 180;
      
      this.container.style.width = `${size}px`;
      this.container.style.height = `${size}px`;
      
      this.container.style.top = 'auto';
      this.container.style.bottom = 'auto';
      this.container.style.left = 'auto';
      this.container.style.right = 'auto';
      
      switch (position) {
        case 'top-left':
          this.container.style.top = '20px';
          this.container.style.left = '20px';
          break;
        case 'top-right':
          this.container.style.top = '20px';
          this.container.style.right = '20px';
          break;
        case 'bottom-left':
          this.container.style.bottom = '20px';
          this.container.style.left = '20px';
          break;
        case 'bottom-right':
        default:
          this.container.style.bottom = '20px';
          this.container.style.right = '20px';
          break;
      }
    }

    getSettings() {
      return window.__bilbilakSettings || {
        minimapSize: 180,
        minimapPosition: 'bottom-right',
        minimapOpacity: 0.85
      };
    }
  }

  window.BilBilakMinimap = new BilBilakMinimap();

  chrome.storage.sync.get(null, (settings) => {
    window.__bilbilakSettings = settings;
  });

  chrome.storage.onChanged.addListener(() => {
    chrome.storage.sync.get(null, (settings) => {
      window.__bilbilakSettings = settings;
      if (window.BilBilakMinimap) {
        window.BilBilakMinimap.updatePosition();
      }
    });
  });
})();