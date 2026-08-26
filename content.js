(() => {
  'use strict';

  if (window !== window.top && window.__bilbilakLoaded) return;
  window.__bilbilakLoaded = true;

  // ===== تنظیمات =====
  const DEFAULT_SETTINGS = {
    zoomMode: 'page',
    zoomLevel: 2,
    shortcutKeys: ['Control', 'Shift'],
    toggleKey: 'Z',
    enabled: true,
    smoothTransition: true,
    transitionDuration: 150,
    lensRadius: 150,
    lensBorder: 3,
    lensBorderColor: '#ff6b35',
    lensShadow: true,
    showCursorRing: true,
    focusMode: false,
    focusBlurAmount: 5,
    showMinimap: false,
    minimapPosition: 'bottom-right',
    minimapSize: 180,
    minimapOpacity: 0.85,
    scrollZoom: true,
    scrollZoomStep: 0.2,
    keyboardNavigation: true,
    keyboardStep: 50,
    blacklist: []
  };

  let settings = { ...DEFAULT_SETTINGS };
  let isZoomed = false;
  let isToggleMode = false;
  let pressedKeys = new Set();
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let originalStyles = {};
  let focusOverlay = null;
  let cursorRing = null;
  let keyboardOffset = { x: 0, y: 0 };
  let animationFrame = null;

  function isBlacklisted() {
    const hostname = window.location.hostname;
    return settings.blacklist.some(domain => hostname.includes(domain));
  }

  chrome.storage.sync.get(null, (stored) => {
    settings = { ...DEFAULT_SETTINGS, ...stored };
    if (isBlacklisted()) settings.enabled = false;
  });

  chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
      settings[key] = changes[key].newValue;
    }
    if (isBlacklisted()) settings.enabled = false;
    if (!settings.enabled && isZoomed) resetZoom();
    updateVisuals();
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggleZoom') {
      if (isZoomed) resetZoom();
      else applyZoom();
    }
  });

  // ===== ساخت المان‌های بصری =====
  function createCursorRing() {
    if (cursorRing) return;
    cursorRing = document.createElement('div');
    cursorRing.id = 'bilbilak-cursor-ring';
    document.body.appendChild(cursorRing);
  }

  function removeCursorRing() {
    if (cursorRing) {
      cursorRing.remove();
      cursorRing = null;
    }
  }

  function createFocusOverlay() {
    if (focusOverlay) return;
    focusOverlay = document.createElement('div');
    focusOverlay.id = 'bilbilak-focus-overlay';
    document.body.appendChild(focusOverlay);
  }

  function removeFocusOverlay() {
    if (focusOverlay) {
      focusOverlay.remove();
      focusOverlay = null;
    }
  }

  function shouldActivate() {
    if (!settings.enabled) return false;
    if (isBlacklisted()) return false;
    if (settings.shortcutKeys.length === 0) return false;
    return settings.shortcutKeys.every(key => pressedKeys.has(key));
  }

  function applyZoom() {
    if (isZoomed) {
      updateZoomPosition();
      return;
    }

    originalStyles = {
      transform: document.body.style.transform,
      transition: document.body.style.transition,
      transformOrigin: document.body.style.transformOrigin
    };

    if (settings.zoomMode === 'page') {
      if (settings.smoothTransition) {
        document.body.style.transition = `transform ${settings.transitionDuration}ms ease-out`;
      }
      document.body.style.transformOrigin = `${mouseX}px ${mouseY}px`;
      document.body.style.transform = `scale(${settings.zoomLevel})`;
      document.body.classList.add('bilbilak-zoomed');
    } else {
      if (window.BilBilakMagnifier) {
        window.BilBilakMagnifier.show();
      }
    }

    if (settings.focusMode) {
      createFocusOverlay();
      updateFocusOverlay();
    }

    if (settings.showCursorRing) {
      createCursorRing();
    }

    if (settings.showMinimap && window.BilBilakMinimap) {
      window.BilBilakMinimap.show();
    }

    isZoomed = true;
  }

  function resetZoom() {
    if (!isZoomed) return;

    if (settings.zoomMode === 'page') {
      if (settings.smoothTransition) {
        document.body.style.transition = `transform ${settings.transitionDuration}ms ease-out`;
      }
      document.body.style.transform = originalStyles.transform || '';
      document.body.style.transformOrigin = originalStyles.transformOrigin || '';
      document.body.classList.remove('bilbilak-zoomed');

      setTimeout(() => {
        document.body.style.transition = originalStyles.transition || '';
      }, settings.transitionDuration);
    } else {
      if (window.BilBilakMagnifier) {
        window.BilBilakMagnifier.hide();
      }
    }

    removeFocusOverlay();
    removeCursorRing();

    if (window.BilBilakMinimap) {
      window.BilBilakMinimap.hide();
    }

    keyboardOffset = { x: 0, y: 0 };
    isZoomed = false;
  }

  function updateZoomPosition() {
    const effectiveX = mouseX + keyboardOffset.x;
    const effectiveY = mouseY + keyboardOffset.y;

    if (settings.zoomMode === 'page') {
      document.body.style.transformOrigin = `${effectiveX}px ${effectiveY}px`;
    } else {
      if (window.BilBilakMagnifier) {
        window.BilBilakMagnifier.updatePosition(effectiveX, effectiveY);
      }
    }

    if (settings.focusMode && focusOverlay) {
      focusOverlay.style.setProperty('--focus-x', `${effectiveX}px`);
      focusOverlay.style.setProperty('--focus-y', `${effectiveY}px`);
    }

    if (cursorRing) {
      cursorRing.style.left = `${effectiveX}px`;
      cursorRing.style.top = `${effectiveY}px`;
    }

    if (window.BilBilakMinimap && isZoomed) {
      window.BilBilakMinimap.updateViewport(effectiveX, effectiveY, settings.zoomLevel);
    }
  }

  function updateFocusOverlay() {
    if (!focusOverlay) return;
    focusOverlay.style.setProperty('--focus-x', `${mouseX}px`);
    focusOverlay.style.setProperty('--focus-y', `${mouseY}px`);
    focusOverlay.style.setProperty('--blur-amount', `${settings.focusBlurAmount}px`);
  }

  function updateVisuals() {
    if (cursorRing && !settings.showCursorRing) removeCursorRing();
    if (!cursorRing && settings.showCursorRing && isZoomed) createCursorRing();
    if (focusOverlay && !settings.focusMode) removeFocusOverlay();
    if (!focusOverlay && settings.focusMode && isZoomed) {
      createFocusOverlay();
      updateFocusOverlay();
    }
  }

  // ===== رویدادهای ماوس =====
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    keyboardOffset = { x: 0, y: 0 };

    if (isZoomed) {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateZoomPosition);
    }
  }, { passive: true });

  // ===== رویدادهای کیبورد =====
  document.addEventListener('keydown', (e) => {
    const key = normalizeKey(e.key);
    pressedKeys.add(key);

    if (pressedKeys.has(settings.toggleKey) && shouldActivate()) {
      if (!isToggleMode) {
        isToggleMode = true;
        if (isZoomed) resetZoom();
        else applyZoom();
      }
      return;
    }

    if (settings.keyboardNavigation && isZoomed) {
      let moved = false;
      if (e.key === 'ArrowUp') { keyboardOffset.y -= settings.keyboardStep; moved = true; }
      if (e.key === 'ArrowDown') { keyboardOffset.y += settings.keyboardStep; moved = true; }
      if (e.key === 'ArrowLeft') { keyboardOffset.x -= settings.keyboardStep; moved = true; }
      if (e.key === 'ArrowRight') { keyboardOffset.x += settings.keyboardStep; moved = true; }
      
      if (moved) {
        e.preventDefault();
        updateZoomPosition();
      }
    }

    if (shouldActivate() && !isZoomed && !isToggleMode) {
      applyZoom();
    }
  });

  document.addEventListener('keyup', (e) => {
    const key = normalizeKey(e.key);
    pressedKeys.delete(key);

    if (!shouldActivate()) {
      isToggleMode = false;
    }

    if (!isToggleMode && !shouldActivate() && isZoomed) {
      resetZoom();
    }
  });

  // ===== اسکرول برای تغییر زوم =====
  document.addEventListener('wheel', (e) => {
    if (!isZoomed || !settings.scrollZoom) return;
    e.preventDefault();

    const delta = e.deltaY > 0 ? -settings.scrollZoomStep : settings.scrollZoomStep;
    const newZoom = Math.max(1.1, Math.min(8, settings.zoomLevel + delta));
    
    if (newZoom !== settings.zoomLevel) {
      settings.zoomLevel = newZoom;
      chrome.storage.sync.set({ zoomLevel: newZoom });
      applyZoom();
    }
  }, { passive: false });

  window.addEventListener('blur', () => {
    pressedKeys.clear();
    isToggleMode = false;
    if (isZoomed) resetZoom();
  });

  function normalizeKey(key) {
    const map = {
      'Control': 'Control',
      'Shift': 'Shift',
      'Alt': 'Alt',
      'Meta': 'Meta'
    };
    return map[key] || key;
  }

  // ===== پیام خوش‌آمد =====
  chrome.storage.local.get(['welcomed'], (data) => {
    if (!data.welcomed && settings.enabled) {
      showWelcome();
      chrome.storage.local.set({ welcomed: true });
    }
  });

  function showWelcome() {
    const welcome = document.createElement('div');
    welcome.id = 'bilbilak-welcome';
    const shortcut = settings.shortcutKeys.map(k => k === 'Control' ? 'Ctrl' : k).join(' + ');
    welcome.innerHTML = `
      <div class="title">🦦 به بیل بیلک خوش اومدی!</div>
      <div>برای زوم، کلیدهای <span class="shortcut">${shortcut}</span> رو نگه دار.</div>
      <div style="margin-top:4px;opacity:0.7;font-size:11px">برای تنظیمات روی آیکون افزونه کلیک کن</div>
    `;
    document.body.appendChild(welcome);
    setTimeout(() => {
      welcome.style.transition = 'opacity 0.3s';
      welcome.style.opacity = '0';
      setTimeout(() => welcome.remove(), 300);
    }, 5000);
  }

  console.log('🦦 بیل بیلک بارگذاری شد');
})();