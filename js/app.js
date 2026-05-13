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
  const activeTab = document.querySelector('.caf-day-tab.active');
  if (activeTab) renderCafeteriaDay(parseInt(activeTab.dataset.day));
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
function formatMinutesUntilNext(total) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  const lang = window.currentLang || 'ko';
  if (lang === 'ko') return h > 0 ? `${h}시간 ${m}분 후` : `${m}분 후`;
  if (lang === 'en') return h > 0 ? `in ${h}h ${m}m` : `in ${m}m`;
  if (lang === 'zh') return h > 0 ? `${h}小时${m}分后` : `${m}分后`;
  if (lang === 'ja') return h > 0 ? `${h}時間${m}分後` : `${m}分後`;
  if (lang === 'vi') return h > 0 ? `${h}g ${m}ph nữa` : `${m}ph nữa`;
  if (lang === 'th') return h > 0 ? `อีก ${h} ชม. ${m} น.` : `อีก ${m} น.`;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function updateShuttle() {
  const result = getNextShuttle();
  const timeEl = document.getElementById('nextShuttleTime');
  const etaEl = document.getElementById('shuttleEta');
  if (!timeEl || !etaEl) return;

  if (result.none) {
    timeEl.textContent = t('shuttle_none');
    etaEl.textContent = '';
    etaEl.style.color = '';
    return;
  }
  if (result.done) {
    timeEl.textContent = t('shuttle_done');
    etaEl.textContent = formatMinutesUntilNext(result.minutesUntilNext);
    etaEl.style.color = '';
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

  const lang = window.currentLang || 'ko';
  mainEl.innerHTML = menu.items.map(item => {
    const ko = item.ko || item;
    if (lang === 'ko' || typeof item === 'string') {
      return `<div class="menu-item">${ko}</div>`;
    }
    const translated = item[lang];
    if (!translated || translated === ko) {
      return `<div class="menu-item">${ko}</div>`;
    }
    return `<div class="menu-item">${translated} <span class="menu-item-ko">(${ko})</span></div>`;
  }).join('');
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
      const target = item.dataset.screen;
      closeNav();
      if (target) setTimeout(() => showScreen(target), 360);
    });
  });
}

function initShuttleScreen() {
  document.getElementById('shuttleBackBtn')?.addEventListener('click', () => {
    showScreen('screen-home');
  });
}

/* Cafeteria Screen */
const mealTypeLabels = {
  '조식': { ko:'조식', en:'Breakfast', zh:'早餐', ja:'朝食', vi:'Bữa sáng', th:'อาหารเช้า' },
  '중식': { ko:'중식', en:'Lunch',     zh:'午餐', ja:'昼食', vi:'Bữa trưa', th:'อาหารกลางวัน' },
  '석식': { ko:'석식', en:'Dinner',    zh:'晚餐', ja:'夕食', vi:'Bữa tối',  th:'อาหารเย็น' },
};

function renderCafeteriaDay(dayNum) {
  const container = document.getElementById('cafeteriaMenuContent');
  if (!container) return;
  const lang = window.currentLang || 'ko';

  if (!cafeteriaData || !cafeteriaData.menu) {
    container.innerHTML = `<div class="caf-empty">${t('menu_none')}</div>`;
    return;
  }
  const entries = cafeteriaData.menu[String(dayNum)];
  if (!entries || entries.length === 0) {
    container.innerHTML = `<div class="caf-empty">${t('caf_no_menu')}</div>`;
    return;
  }

  const typeOrder = ['조식', '중식', '석식'];
  const grouped = {};
  entries.forEach(e => { if (!grouped[e.type]) grouped[e.type] = []; grouped[e.type].push(e); });
  const sortedTypes = typeOrder.filter(tp => grouped[tp])
    .concat(Object.keys(grouped).filter(tp => !typeOrder.includes(tp)));

  container.innerHTML = sortedTypes.map(type => {
    const label = (mealTypeLabels[type] && mealTypeLabels[type][lang]) || type;
    return `
      <div class="caf-meal-section">
        <div class="caf-meal-type-label">${label}</div>
        ${grouped[type].map(corner => `
          <div class="caf-corner-card">
            <div class="caf-corner-name">${corner.corner}</div>
            <div class="caf-items">
              ${corner.items.map(item => {
                const ko = item.ko || item;
                if (lang === 'ko' || typeof item === 'string') return `<div class="caf-item">${ko}</div>`;
                const tr = item[lang];
                if (!tr || tr === ko) return `<div class="caf-item">${ko}</div>`;
                return `<div class="caf-item">${tr} <span class="caf-item-ko">(${ko})</span></div>`;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>`;
  }).join('');

  if (cafeteriaData.weekRange) {
    const rangeEl = document.getElementById('cafWeekRange');
    if (rangeEl) rangeEl.textContent = cafeteriaData.weekRange;
  }
}

function openCafeteriaScreen() {
  showScreen('screen-cafeteria');
  const today = new Date().getDay();
  const targetDay = (today === 0 || today === 6) ? 1 : today;
  document.querySelectorAll('.caf-day-tab').forEach(tb => tb.classList.remove('active'));
  const activeTab = document.querySelector(`.caf-day-tab[data-day="${targetDay}"]`);
  if (activeTab) activeTab.classList.add('active');
  renderCafeteriaDay(targetDay);
}

function initCafeteriaScreen() {
  document.getElementById('cafBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('menuCard')?.addEventListener('click', openCafeteriaScreen);
  document.getElementById('menuCard')?.setAttribute('style', 'cursor:pointer');

  document.querySelectorAll('.caf-day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.caf-day-tab').forEach(tb => tb.classList.remove('active'));
      tab.classList.add('active');
      renderCafeteriaDay(parseInt(tab.dataset.day));
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
  initShuttleScreen();
  initCafeteriaScreen();
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
