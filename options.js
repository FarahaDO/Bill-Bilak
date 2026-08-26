const siteList = document.getElementById('siteList');
const newSiteInput = document.getElementById('newSite');
const addBtn = document.getElementById('addBtn');

let blacklist = [];

function renderList() {
  siteList.innerHTML = '';
  if (blacklist.length === 0) {
    siteList.innerHTML = '<div class="empty">📭 لیست خالی است</div>';
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
      <button class="danger" data-index="${index}">🗑️ حذف</button>
    `;
    siteList.appendChild(li);
  });

  // دکمه‌های حذف
  siteList.querySelectorAll('.danger').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      blacklist.splice(index, 1);
      chrome.storage.sync.set({ blacklist });
      renderList();
    });
  });
}

// بارگذاری لیست
chrome.storage.sync.get(['blacklist'], (data) => {
  blacklist = data.blacklist || [];
  renderList();
});

// افزودن سایت
function addSite() {
  const site = newSiteInput.value.trim().toLowerCase();
  if (!site) return;
  
  // حذف http:// و https:// و www.
  const cleanSite = site.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  
  if (blacklist.includes(cleanSite)) {
    alert('این سایت قبلاً در لیست وجود دارد!');
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