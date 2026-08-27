// ===== BilBilak i18n System =====
// این فایل باید قبل از بقیه اسکریپت‌ها بارگذاری بشه

const BilBilakI18n = (() => {
  // ===== دیکشنری ترجمه‌ها =====
  const translations = {
    en: {
      extensionName: "BilBilak - Smart Mouse Zoom",
      extensionDescription: "Dig deeper into details with BilBilak! Smart mouse magnifier with advanced features.",
      
      tabGeneral: "⚙️ General",
      tabLens: "🔍 Lens",
      tabAdvanced: "🚀 Advanced",
      
      enableExtension: "Enable Extension",
      zoomMode: "Zoom Mode",
      pageZoom: "Page Zoom",
      lensMode: "Lens Mode",
      zoomLevel: "Zoom Level",
      keyboardShortcut: "Keyboard Shortcut",
      clickToRecord: "Click to record",
      pressKeysHint: "💡 Click the box and press your keys. Press Enter to save.",
      recording: "⌨️ Press new keys...",
      noKeys: "No keys recorded",
      smoothAnimation: "Smooth Animation",
      
      lensRadius: "Lens Radius",
      borderThickness: "Border Thickness",
      borderColor: "Border Color",
      lensShadow: "Lens Shadow",
      cursorRing: "Cursor Ring",
      focusMode: "Focus Mode (blur surroundings)",
      blurAmount: "Blur Amount",
      
      scrollZoom: "Zoom with Mouse Scroll",
      zoomStep: "Zoom Step",
      keyboardNavigation: "Keyboard Navigation (Arrow Keys)",
      showMinimap: "Show Mini-map",
      minimapPosition: "Mini-map Position",
      minimapSize: "Mini-map Size",
      positionTopLeft: "Top-Left",
      positionTopRight: "Top-Right",
      positionBottomLeft: "Bottom-Left",
      positionBottomRight: "Bottom-Right",
      
      manageBlacklist: "🚫 Manage Site Blacklist",
      resetDefaults: "🔄 Reset to Defaults",
      resetConfirm: "Are you sure you want to reset all settings to default?",
      
      madeWith: "Made with ❤️ by",
      teamName: "BilBilak Team",
      
      version: "Version",
      smartMagnifier: "Smart Magnifier",
      
      language: "🌐 Language",
      languageAuto: "🔄 Auto (Browser)",
      languageEn: "🇬🇧 English",
      languageFa: "🇮🇷 فارسی",
      
      welcomeTitle: "🦦 Welcome to BilBilak!",
      welcomeBody: "Hold {shortcut} to zoom.",
      welcomeHint: "Click the extension icon for settings",
      
      blacklistTitle: "Site Blacklist",
      blacklistSubtitle: "The extension will be disabled on these sites",
      addSitePlaceholder: "example.com",
      addButton: "➕ Add",
      blacklistHint: "💡 Enter the domain (e.g. youtube.com). The extension will automatically disable on all subdomains.",
      emptyList: "📭 List is empty",
      alreadyExists: "This site already exists in the list!",
      removeButton: "🗑️ Remove"
    },
    
    fa: {
      extensionName: "بیل بیلک - ذره‌بین هوشمند",
      extensionDescription: "با بیل بیلک، عمیق‌تر در جزئیات حفره کن! ذره‌بین هوشمند ماوس با قابلیت‌های پیشرفته.",
      
      tabGeneral: "⚙️ عمومی",
      tabLens: "🔍 ذره‌بین",
      tabAdvanced: "🚀 پیشرفته",
      
      enableExtension: "فعال‌سازی افزونه",
      zoomMode: "حالت زوم",
      pageZoom: "زوم صفحه",
      lensMode: "ذره‌بین",
      zoomLevel: "میزان بزرگ‌نمایی",
      keyboardShortcut: "کلیدهای میانبر",
      clickToRecord: "برای ضبط کلیک کنید",
      pressKeysHint: "💡 روی کادر کلیک کن و کلیدها رو فشار بده. Enter برای ذخیره.",
      recording: "⌨️ کلیدهای جدید را فشار دهید...",
      noKeys: "کلیدی ثبت نشده",
      smoothAnimation: "انیمیشن نرم",
      
      lensRadius: "شعاع ذره‌بین",
      borderThickness: "ضخامت حاشیه",
      borderColor: "رنگ حاشیه",
      lensShadow: "سایه ذره‌بین",
      cursorRing: "حلقه دور ماوس",
      focusMode: "حالت تمرکز (تار کردن اطراف)",
      blurAmount: "میزان تاری",
      
      scrollZoom: "زوم با اسکرول ماوس",
      zoomStep: "گام تغییر زوم",
      keyboardNavigation: "ناوبری با کیبورد (کلیدهای جهت‌نما)",
      showMinimap: "نمایش نقشه کوچک",
      minimapPosition: "موقعیت نقشه کوچک",
      minimapSize: "اندازه نقشه کوچک",
      positionTopLeft: "بالا-چپ",
      positionTopRight: "بالا-راست",
      positionBottomLeft: "پایین-چپ",
      positionBottomRight: "پایین-راست",
      
      manageBlacklist: "🚫 مدیریت لیست سیاه سایت‌ها",
      resetDefaults: "🔄 بازنشانی به پیش‌فرض",
      resetConfirm: "آیا مطمئنی می‌خوای همه تنظیمات به حالت پیش‌فرض برگردن؟",
      
      madeWith: "ساخته شده با ❤️ توسط",
      teamName: "تیم بیل بیلک",
      
      version: "نسخه",
      smartMagnifier: "ذره‌بین هوشمند",
      
      language: "🌐 زبان",
      languageAuto: "🔄 خودکار (مرورگر)",
      languageEn: "🇬🇧 English",
      languageFa: "🇮🇷 فارسی",
      
      welcomeTitle: "🦦 به بیل بیلک خوش اومدی!",
      welcomeBody: "برای زوم، کلیدهای {shortcut} رو نگه دار.",
      welcomeHint: "برای تنظیمات روی آیکون افزونه کلیک کن",
      
      blacklistTitle: "لیست سیاه سایت‌ها",
      blacklistSubtitle: "افزونه در این سایت‌ها غیرفعال می‌شود",
      addSitePlaceholder: "example.com",
      addButton: "➕ افزودن",
      blacklistHint: "💡 آدرس دامنه را وارد کن (مثلاً youtube.com). افزونه به صورت خودکار در تمام زیردامنه‌های این سایت غیرفعال می‌شود.",
      emptyList: "📭 لیست خالی است",
      alreadyExists: "این سایت قبلاً در لیست وجود دارد!",
      removeButton: "🗑️ حذف"
    }
  };
  
  // زبان‌های RTL
  const rtlLanguages = ['fa', 'ar', 'he', 'ur'];
  
  let currentLang = 'en';
  
  // ===== تشخیص زبان =====
  function detectLanguage() {
    try {
      const uiLang = chrome.i18n.getUILanguage();
      const baseLang = uiLang.split('-')[0].toLowerCase();
      if (translations[baseLang]) return baseLang;
      return 'en';
    } catch (e) {
      return 'en';
    }
  }
  
  // ===== بارگذاری زبان از storage =====
  async function init() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['uiLanguage'], (data) => {
        if (data.uiLanguage && data.uiLanguage !== 'auto') {
          currentLang = data.uiLanguage;
        } else {
          currentLang = detectLanguage();
        }
        resolve(currentLang);
      });
    });
  }
  
  // ===== تغییر زبان =====
  async function setLanguage(lang) {
    currentLang = lang === 'auto' ? detectLanguage() : lang;
    return new Promise((resolve) => {
      chrome.storage.sync.set({ uiLanguage: lang }, () => {
        resolve(currentLang);
      });
    });
  }
  
  // ===== دریافت ترجمه =====
  function t(key, params = {}) {
    let text = translations[currentLang]?.[key] || translations.en[key] || key;
    
    // جایگزینی پارامترها (مثل {shortcut})
    Object.keys(params).forEach(paramKey => {
      text = text.replace(`{${paramKey}}`, params[paramKey]);
    });
    
    return text;
  }
  
  // ===== دریافت زبان فعلی =====
  function getLanguage() {
    return currentLang;
  }
  
  // ===== بررسی RTL بودن =====
  function isRTL() {
    return rtlLanguages.includes(currentLang);
  }
  
  // ===== اعمال ترجمه روی صفحه =====
  function translatePage() {
    // متن‌ها
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text) el.textContent = text;
    });
    
    // placeholder ها
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text) el.placeholder = text;
    });
    
    // title ها
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = t(key);
      if (text) el.title = text;
    });
    
    // اعمال جهت
    applyDirection();
  }
  
  // ===== اعمال جهت RTL/LTR =====
  function applyDirection() {
    const dir = isRTL() ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
    if (document.body) document.body.dir = dir;
  }
  
  // ===== API عمومی =====
  return {
    init,
    setLanguage,
    getLanguage,
    isRTL,
    t,
    translatePage,
    applyDirection,
    detectLanguage
  };
})();