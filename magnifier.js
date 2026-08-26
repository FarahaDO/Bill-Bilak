(() => {
  'use strict';

  class BilBilakMagnifier {
    constructor() {
      this.lens = null;
      this.lensContent = null;
      this.isVisible = false;
      this.currentX = 0;
      this.currentY = 0;
    }

    create() {
      if (this.lens) return;

      this.lens = document.createElement('div');
      this.lens.id = 'bilbilak-lens';
      
      this.lensContent = document.createElement('div');
      this.lensContent.id = 'bilbilak-lens-content';
      this.lens.appendChild(this.lensContent);
      
      document.body.appendChild(this.lens);
    }

    show() {
      this.create();
      this.updateSettings();
      this.lens.style.opacity = '1';
      this.isVisible = true;
      this.updatePosition(this.currentX || window.innerWidth / 2, this.currentY || window.innerHeight / 2);
    }

    hide() {
      if (this.lens) {
        this.lens.style.opacity = '0';
        this.isVisible = false;
      }
    }

    updatePosition(x, y) {
      if (!this.lens || !this.isVisible) return;
      
      this.currentX = x;
      this.currentY = y;
      
      const settings = this.getSettings();
      const radius = settings.lensRadius;
      
      this.lens.style.left = `${x - radius}px`;
      this.lens.style.top = `${y - radius}px`;
      this.lens.style.width = `${radius * 2}px`;
      this.lens.style.height = `${radius * 2}px`;
      
      const zoom = settings.zoomLevel;
      
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const pageX = x + scrollX;
      const pageY = y + scrollY;
      
      this.lensContent.style.width = `${document.documentElement.scrollWidth}px`;
      this.lensContent.style.height = `${document.documentElement.scrollHeight}px`;
      this.lensContent.style.transform = `scale(${zoom}) translate(${-pageX / zoom + radius / zoom}px, ${-pageY / zoom + radius / zoom}px)`;
      this.lensContent.style.transformOrigin = '0 0';
    }

    updateSettings() {
      if (!this.lens) return;
      const settings = this.getSettings();
      
      this.lens.style.borderColor = settings.lensBorderColor;
      this.lens.style.borderWidth = `${settings.lensBorder}px`;
      
      if (settings.lensShadow) {
        this.lens.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
      } else {
        this.lens.style.boxShadow = 'none';
      }
    }

    getSettings() {
      return window.__bilbilakSettings || {
        zoomLevel: 2,
        lensRadius: 150,
        lensBorder: 3,
        lensBorderColor: '#ff6b35',
        lensShadow: true
      };
    }
  }

  window.BilBilakMagnifier = new BilBilakMagnifier();

  chrome.storage.sync.get(null, (settings) => {
    window.__bilbilakSettings = settings;
  });
  
  chrome.storage.onChanged.addListener(() => {
    chrome.storage.sync.get(null, (settings) => {
      window.__bilbilakSettings = settings;
      if (window.BilBilakMagnifier) {
        window.BilBilakMagnifier.updateSettings();
      }
    });
  });
})();