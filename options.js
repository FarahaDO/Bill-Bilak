// ===== Initialize i18n =====
async function initApp() {
  await BilBilakI18n.init();
  BilBilakI18n.translatePage();
  
  const langSelector = document.getElementById('languageSelector');
  chrome.storage.sync.get(['uiLanguage'], (data) => {
    langSelector.value = data.uiLanguage || 'auto';
  });
  
  langSelector.addEventListener('change', async (e) => {
    await BilBilakI18n.setLanguage(e.target.value);
    BilBilakI18n.translatePage();
    renderList();
  });
  
  loadBlacklist();
}

const siteList = document.getElementById('siteList');
const newSiteInput = document.getElementById('newSite');
const addBtn = document.getElementById('addBtn');

let blacklist = [];

function renderList() {
  siteList.innerHTML = '';
  if (blacklist.length === 0) {
    siteList.innerHTML = `<div class="empty">${BilBilakI18n.t('emptyList')}</div>`;
    return;
  }
  blacklist.forEach((site, index) => {
    const li = document.createElement('li');
    li.className = 'site-item';
    li.innerHTML = `
      <div class="site-name">
        <div class="site-icon">🚫</div>
        <span dir="ltr">${site}</span>
      </div>
      <button class="danger" data-index="${index}">${BilBilakI18n.t('removeButton')}</button>
    `;
    siteList.appendChild(li);
  });

  siteList.querySelectorAll('.danger').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      blacklist.splice(index, 1);
      chrome.storage.sync.set({ blacklist });
      renderList();
    });
  });
}

function loadBlacklist() {
  chrome.storage.sync.get(['blacklist'], (data) => {
    blacklist = data.blacklist || [];
    renderList();
  });
}

function addSite() {
  const site = newSiteInput.value.trim().toLowerCase();
  if (!site) return;
  
  const cleanSite = site.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  
  if (blacklist.includes(cleanSite)) {
    alert(BilBilakI18n.t('alreadyExists'));
    return;
  }
  
  blacklist.push(cleanSite);
  chrome.storage.sync.set({ blacklist });
  newSiteInput.value = '';
  renderList();
}

addBtn.addEventListener('click', addSite);
newSiteInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addSite();
});

// ===== شروع =====
initApp();