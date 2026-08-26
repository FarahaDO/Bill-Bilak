// تنظیمات پیش‌فرض
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

// هنگام نصب
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set(DEFAULT_SETTINGS);
    console.log('🦦 بیل بیلک نصب شد!');
  }
});

// مدیریت میانبرهای کیبورد از سطح مرورگر
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-zoom') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleZoom' });
      }
    });
  }
});

// مدیریت پیام‌ها
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    chrome.storage.sync.get(null, (settings) => {
      sendResponse({ ...DEFAULT_SETTINGS, ...settings });
    });
    return true;
  }
});