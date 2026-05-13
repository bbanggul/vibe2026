/* ─── App ─── */

/* Screen transitions */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('screen-visible');
    s.classList.add('screen-hidden');
  });
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.remove('screen-hidden');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => target.classList.add('screen-visible'));
  });
}

/* Header scroll shadow */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  const homeScreen = document.getElementById('screen-home');
  if (!header || !homeScreen) return;
  homeScreen.addEventListener('scroll', () => {
    header.classList.toggle('header-shadow', homeScreen.scrollTop > 4);
  });
}

/* Language change hook */
function onLanguageChange(lang) {
  updateHeaderLang(lang);
  updateHomeData();
  updateNotices();
  updateNavLangButtons(lang);
}

function updateHeaderLang(lang) {
  const meta = langMeta[lang] || langMeta.ko;
  const codeEl = document.getElementById('headerLangCode');
  if (codeEl) codeEl.textContent = meta.code;
}

function updateNavLangButtons(activeLang) {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('lang-btn-active', btn.dataset.lang === activeLang);
  });
}

/* Shuttle display */
function updateShuttle() {
  const result = getNextShuttle();
  const timeEl = document.getElementById('nextShuttleTime');
  const etaEl = document.getElementById('shuttleEta');
  if (!timeEl || !etaEl) return;

  if (!result) {
    timeEl.textContent = t('shuttle_none');
    etaEl.textContent = '';
    return;
  }
  timeEl.textContent = result.time;
  if (result.minutesLeft <= 3) {
    etaEl.textContent = t('shuttle_now');
    etaEl.style.color = '#e74c3c';
  } else {
    etaEl.textContent = result.minutesLeft + ' ' + t('shuttle_min_after');
    etaEl.style.color = '';
  }
}

/* Menu display */
function updateMenu() {
  const menu = getTodayMenu();
  const mainEl = document.getElementById('todayMenuMain');
  if (!mainEl) return;

  if (!menu || !menu.items || menu.items.length === 0) {
    mainEl.innerHTML = `<span class="menu-item-empty">${t('menu_none')}</span>`;
    return;
  }
  mainEl.innerHTML = menu.items
    .map(item => `<div class="menu-item">${item}</div>`)
    .join('');
}

function updateHomeData() {
  updateShuttle();
  updateMenu();
  updateHeroDate();
}

/* Hero date */
function updateHeroDate() {
  const el = document.getElementById('heroDate');
  if (!el) return;
  const now = new Date();
  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayStr = t(dayKeys[now.getDay()]);
  const lang = window.currentLang;
  let dateStr;
  if (lang === 'en') {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${dayStr}`;
  } else if (lang === 'zh') {
    dateStr = `${now.getMonth() + 1}月${now.getDate()}日 ${dayStr}`;
  } else if (lang === 'vi') {
    dateStr = `${dayStr}, ${now.getDate()}/${now.getMonth() + 1}`;
  } else if (lang === 'th') {
    dateStr = `${dayStr} ${now.getDate()}/${now.getMonth() + 1}`;
  } else {
    dateStr = `${now.getMonth() + 1}월 ${now.getDate()}일 ${dayStr}`;
  }
  el.textContent = dateStr;
}

/* Notices horizontal scroll */
function updateNotices() {
  const container = document.getElementById('noticesScroll');
  if (!container) return;
  const lang = window.currentLang;
  container.innerHTML = '';
  notices.forEach(notice => {
    const n = notice[lang] || notice.ko;
    const card = document.createElement('div');
    card.className = 'notice-card';
    card.innerHTML = `
      <div class="notice-card-inner">
        <span class="notice-category">${n.category}</span>
        <p class="notice-title">${n.title}</p>
        <span class="notice-date">${n.date}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/* Hamburger Nav */
function initNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navOverlayBg = document.getElementById('navOverlayBg');
  const navCloseBtn = document.getElementById('navCloseBtn');

  function openNav() {
    navOverlay.classList.add('nav-open');
    navOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    navOverlay.classList.remove('nav-open');
    document.body.style.overflow = '';
    setTimeout(() => navOverlay.classList.add('hidden'), 350);
  }

  hamburgerBtn?.addEventListener('click', openNav);
  navCloseBtn?.addEventListener('click', closeNav);
  navOverlayBg?.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-menu-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      closeNav();
    });
  });
}

/* Language Toggle (header dropdown) */
function initLangToggle() {
  const btn = document.getElementById('langToggleBtn');
  const dropdown = document.getElementById('langDropdown');

  btn?.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', () => dropdown?.classList.add('hidden'));

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      setLanguage(opt.dataset.lang);
      dropdown.classList.add('hidden');
    });
  });
}

/* Language selection screen */
function initLangCards() {
  document.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      setLanguage(card.dataset.lang);
      showScreen('screen-home');
    });
  });
}

/* Nav language buttons (both overlay and any other data-lang buttons) */
function initNavLangButtons() {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    if (btn.classList.contains('lang-card') || btn.classList.contains('lang-option')) return;
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

/* Chatbot */
function initChatbot() {
  const fab = document.getElementById('chatFab');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const messages = document.getElementById('chatMessages');

  if (!fab || !chatWindow || !messages) return;

  function openChat() {
    chatWindow.classList.remove('hidden');
    fab.classList.add('fab-hidden');
    if (messages.children.length === 0) addBotMessage(t('chatbot_greeting'));
    input?.focus();
  }
  function closeChat() {
    chatWindow.classList.add('hidden');
    fab.classList.remove('fab-hidden');
  }

  fab.addEventListener('click', openChat);
  closeBtn?.addEventListener('click', closeChat);

  function addBotMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg-bot';
    msg.innerHTML = `<div class="chat-bubble chat-bubble-bot">${text.replace(/\n/g, '<br>')}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg-user';
    msg.innerHTML = `<div class="chat-bubble chat-bubble-user">${text}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const val = input?.value.trim();
    if (!val) return;
    addUserMessage(val);
    input.value = '';
    setTimeout(() => addBotMessage(getChatbotResponse(val)), 400);
  }

  sendBtn?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

  /* FAQ card → open chatbot with pre-filled question */
  document.querySelectorAll('.faq-card').forEach(card => {
    card.addEventListener('click', () => {
      const topic = card.dataset.topic;
      const questionMap = {
        ko: { library: '도서관 이용방법', shuttle: '셔틀버스 시간표', registration: '수강신청', printer: '프린터', health: '보건실', dormitory: '기숙사 신청' },
        en: { library: 'library hours', shuttle: 'shuttle bus schedule', registration: 'course registration', printer: 'printer', health: 'health center', dormitory: 'dormitory application' },
        zh: { library: '图书馆', shuttle: '校车', registration: '选课', printer: '打印机', health: '医务室', dormitory: '宿舍' },
        ja: { library: '図書館', shuttle: 'シャトル', registration: '履修登録', printer: 'プリンター', health: '保健室', dormitory: '寮' },
        vi: { library: 'thư viện', shuttle: 'xe buýt', registration: 'đăng ký môn học', printer: 'máy in', health: 'y tế', dormitory: 'ký túc xá' },
        th: { library: 'ห้องสมุด', shuttle: 'รถรับส่ง', registration: 'ลงทะเบียน', printer: 'เครื่องพิมพ์', health: 'สุขภาพ', dormitory: 'หอพัก' },
      };
      const lang = window.currentLang;
      const q = (questionMap[lang] || questionMap.ko)[topic] || topic;
      openChat();
      setTimeout(() => {
        addUserMessage(q);
        setTimeout(() => addBotMessage(getChatbotResponse(q)), 400);
      }, 200);
    });
  });

  /* expose openChat for external use */
  window._openChatbot = openChat;
}

/* Auto-update shuttle every minute */
function startShuttleTimer() {
  setInterval(updateHomeData, 60000);
}

/* Loading → Language / Home */
function initLoading() {
  const savedLang = localStorage.getItem('uos_lang');
  const loadingDuration = 2400;

  setTimeout(() => {
    if (savedLang) {
      window.currentLang = savedLang;
      applyTranslations();
      updateHeaderLang(savedLang);
      showScreen('screen-home');
    } else {
      showScreen('screen-language');
    }
  }, loadingDuration);
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', async () => {
  applyTranslations();
  updateHeaderLang(window.currentLang);

  initLangCards();
  initLangToggle();
  initNavLangButtons();
  initNav();
  initChatbot();
  initHeaderScroll();
  updateNotices();
  await loadCafeteriaData();
  updateHomeData();
  updateNavLangButtons(window.currentLang);
  startShuttleTimer();
  initLoading();

  /* Start on loading screen */
  document.getElementById('screen-loading')?.classList.add('screen-visible');
});
