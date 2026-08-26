const defaults = {
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

// ===== مدیریت تب‌ها =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
  });
});

// ===== مدیریت حالت زوم =====
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    chrome.storage.sync.set({ zoomMode: btn.dataset.mode });
  });
});

// ===== المان‌ها =====
const zoomLevel = document.getElementById('zoomLevel');
const zoomValue = document.getElementById('zoomValue');
const shortcutBox = document.getElementById('shortcutBox');
const shortcutDisplay = document.getElementById('shortcutDisplay');
const enabled = document.getElementById('enabled');
const smoothTransition = document.getElementById('smoothTransition');
const lensRadius = document.getElementById('lensRadius');
const lensRadiusValue = document.getElementById('lensRadiusValue');
const lensBorder = document.getElementById('lensBorder');
const lensBorderColor = document.getElementById('lensBorderColor');
const lensShadow = document.getElementById('lensShadow');
const showCursorRing = document.getElementById('showCursorRing');
const focusMode = document.getElementById('focusMode');
const focusBlurAmount = document.getElementById('focusBlurAmount');
const focusBlurValue = document.getElementById('focusBlurValue');
const scrollZoom = document.getElementById('scrollZoom');
const scrollZoomStep = document.getElementById('scrollZoomStep');
const scrollStepValue = document.getElementById('scrollStepValue');
const keyboardNavigation = document.getElementById('keyboardNavigation');
const showMinimap = document.getElementById('showMinimap');
const minimapPosition = document.getElementById('minimapPosition');
const minimapSize = document.getElementById('minimapSize');
const resetBtn = document.getElementById('resetBtn');
const openBlacklist = document.getElementById('openBlacklist');

let isRecording = false;
let recordedKeys = [];

function renderShortcut(keys) {
  shortcutDisplay.innerHTML = '';
  if (!keys || keys.length === 0) {
    shortcutDisplay.textContent = 'کلیدی ثبت نشده';
    return;
  }
  keys.forEach(key => {
    const badge = document.createElement('span');
    badge.className = 'key-badge';
    badge.textContent = formatKeyName(key);
    shortcutDisplay.appendChild(badge);
  });
}

function formatKeyName(key) {
  const map = {
    'Control': 'Ctrl',
    'Shift': 'Shift',
    'Alt': 'Alt',
    'Meta': 'Win',
    ' ': 'Space',
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'Escape': 'Esc'
  };
  return map[key] || key.toUpperCase();
}

// ===== بارگذاری تنظیمات =====
chrome.storage.sync.get(null, (settings) => {
  const s = { ...defaults, ...settings };
  
  zoomLevel.value = s.zoomLevel;
  zoomValue.textContent = s.zoomLevel.toFixed(1) + 'x';
  enabled.checked = s.enabled;
  smoothTransition.checked = s.smoothTransition;
  
  lensRadius.value = s.lensRadius;
  lensRadiusValue.textContent = s.lensRadius + 'px';
  lensBorder.value = s.lensBorder;
  lensBorderColor.value = s.lensBorderColor;
  lensShadow.checked = s.lensShadow;
  showCursorRing.checked = s.showCursorRing;
  focusMode.checked = s.focusMode;
  focusBlurAmount.value = s.focusBlurAmount;
  focusBlurValue.textContent = s.focusBlurAmount + 'px';
  
  scrollZoom.checked = s.scrollZoom;
  scrollZoomStep.value = s.scrollZoomStep;
  scrollStepValue.textContent = s.scrollZoomStep;
  keyboardNavigation.checked = s.keyboardNavigation;
  showMinimap.checked = s.showMinimap;
  minimapPosition.value = s.minimapPosition;
  minimapSize.value = s.minimapSize;
  
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === s.zoomMode);
  });
  
  renderShortcut(s.shortcutKeys);
});

// ===== ذخیره تنظیمات =====
function bindRange(input, display, suffix, key, transform = v => v) {
  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    display.textContent = transform(val) + suffix;
    chrome.storage.sync.set({ [key]: val });
  });
}

function bindCheckbox(input, key) {
  input.addEventListener('change', () => {
    chrome.storage.sync.set({ [key]: input.checked });
  });
}

function bindNumber(input, key) {
  input.addEventListener('change', () => {
    chrome.storage.sync.set({ [key]: parseFloat(input.value) || 0 });
  });
}

zoomLevel.addEventListener('input', () => {
  const val = parseFloat(zoomLevel.value);
  zoomValue.textContent = val.toFixed(1) + 'x';
  chrome.storage.sync.set({ zoomLevel: val });
});

bindCheckbox(enabled, 'enabled');
bindCheckbox(smoothTransition, 'smoothTransition');

bindRange(lensRadius, lensRadiusValue, 'px', 'lensRadius', v => v);
bindNumber(lensBorder, 'lensBorder');
lensBorderColor.addEventListener('input', () => {
  chrome.storage.sync.set({ lensBorderColor: lensBorderColor.value });
});
bindCheckbox(lensShadow, 'lensShadow');
bindCheckbox(showCursorRing, 'showCursorRing');
bindCheckbox(focusMode, 'focusMode');
bindRange(focusBlurAmount, focusBlurValue, 'px', 'focusBlurAmount', v => v);

bindCheckbox(scrollZoom, 'scrollZoom');
bindRange(scrollZoomStep, scrollStepValue, '', 'scrollZoomStep', v => v.toFixed(1));
bindCheckbox(keyboardNavigation, 'keyboardNavigation');
bindCheckbox(showMinimap, 'showMinimap');
minimapPosition.addEventListener('change', () => {
  chrome.storage.sync.set({ minimapPosition: minimapPosition.value });
});
bindNumber(minimapSize, 'minimapSize');

// ===== ضبط میانبر =====
shortcutBox.addEventListener('click', () => {
  isRecording = !isRecording;
  shortcutBox.classList.toggle('recording', isRecording);
  recordedKeys = [];
  if (isRecording) {
    shortcutDisplay.textContent = '⌨️ کلیدهای جدید را فشار دهید...';
    document.addEventListener('keydown', recordKey);
  } else {
    document.removeEventListener('keydown', recordKey);
  }
});

function recordKey(e) {
  e.preventDefault();
  e.stopPropagation();
  const key = e.key;
  if (!recordedKeys.includes(key)) {
    recordedKeys.push(key);
    renderShortcut(recordedKeys);
  }
}

document.addEventListener('keyup', (e) => {
  if (!isRecording) return;
  e.preventDefault();
  if (recordedKeys.length > 0) saveShortcut();
});

document.addEventListener('keydown', (e) => {
  if (!isRecording) return;
  if (e.key === 'Enter' && recordedKeys.length > 0) {
    e.preventDefault();
    saveShortcut();
  }
});

function saveShortcut() {
  if (recordedKeys.length > 0) {
    chrome.storage.sync.set({ shortcutKeys: recordedKeys });
    renderShortcut(recordedKeys);
  }
  isRecording = false;
  shortcutBox.classList.remove('recording');
  document.removeEventListener('keydown', recordKey);
}

// ===== بازنشانی =====
resetBtn.addEventListener('click', () => {
  if (confirm('آیا مطمئنی می‌خوای همه تنظیمات به حالت پیش‌فرض برگردن؟')) {
    chrome.storage.sync.set(defaults, () => {
      location.reload();
    });
  }
});

// ===== باز کردن لیست سیاه =====
openBlacklist.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});