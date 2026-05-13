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

/* ─── School Info Data ─── */
const facilityList = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    ko: { name: '중앙도서관', loc: '학생회관 옆', hours: '평일 09:00~22:00 · 토 09:00~18:00', closed: '일·공휴일 휴관', extra: '대출: 학생증 · 10권/30일', phone: '031-220-2072' },
    en: { name: 'Central Library', loc: 'Next to Student Hall', hours: 'Weekdays 09:00~22:00 · Sat 09:00~18:00', closed: 'Closed Sun & holidays', extra: 'Borrow: Student ID · 10 books/30 days', phone: '031-220-2072' },
    zh: { name: '中央图书馆', loc: '学生会馆旁', hours: '平日 09:00~22:00 · 周六 09:00~18:00', closed: '周日·节假日休馆', extra: '借书: 学生证 · 10本/30天', phone: '031-220-2072' },
    ja: { name: '中央図書館', loc: '学生会館の隣', hours: '平日 09:00~22:00 · 土 09:00~18:00', closed: '日·祝日休館', extra: '貸出: 学生証 · 10冊/30日', phone: '031-220-2072' },
    vi: { name: 'Thư viện Trung tâm', loc: 'Cạnh Nhà sinh viên', hours: 'T2~6: 09:00~22:00 · T7: 09:00~18:00', closed: 'Đóng CN & ngày lễ', extra: 'Mượn: Thẻ SV · 10 cuốn/30 ngày', phone: '031-220-2072' },
    th: { name: 'ห้องสมุดกลาง', loc: 'ข้างอาคารนักศึกษา', hours: 'จ~ศ 09:00~22:00 · เสาร์ 09:00~18:00', closed: 'ปิดอาทิตย์ & วันหยุด', extra: 'ยืม: บัตรนักศึกษา · 10 เล่ม/30 วัน', phone: '031-220-2072' },
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    ko: { name: '보건실', loc: '학생회관 2층', hours: '평일 09:00~17:00', closed: '토·일·공휴일 휴관', extra: '응급: 119 / 보안실 031-220-2000', phone: '031-220-2114' },
    en: { name: 'Health Center', loc: 'Student Hall 2F', hours: 'Weekdays 09:00~17:00', closed: 'Closed Sat, Sun & holidays', extra: 'Emergency: 119 / Security 031-220-2000', phone: '031-220-2114' },
    zh: { name: '保健室', loc: '学生会馆2楼', hours: '平日 09:00~17:00', closed: '周六·周日·节假日休', extra: '紧急: 119 / 保安 031-220-2000', phone: '031-220-2114' },
    ja: { name: '保健室', loc: '学生会館2F', hours: '平日 09:00~17:00', closed: '土·日·祝日休', extra: '緊急: 119 / 警備 031-220-2000', phone: '031-220-2114' },
    vi: { name: 'Phòng y tế', loc: 'Nhà SV Tầng 2', hours: 'T2~6: 09:00~17:00', closed: 'Đóng T7, CN & ngày lễ', extra: 'Khẩn cấp: 119 / Bảo vệ 031-220-2000', phone: '031-220-2114' },
    th: { name: 'ศูนย์สุขภาพ', loc: 'อาคารนักศึกษา ชั้น 2', hours: 'จ~ศ 09:00~17:00', closed: 'ปิดเสาร์ อาทิตย์ & วันหยุด', extra: 'ฉุกเฉิน: 119 / รปภ. 031-220-2000', phone: '031-220-2114' },
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    link: 'https://swudorm.suwon.ac.kr',
    ko: { name: '기숙사', loc: '캠퍼스 내', hours: null, closed: null, extra: '외국인 유학생 우선 배정', phone: '031-220-2510' },
    en: { name: 'Dormitory', loc: 'On Campus', hours: null, closed: null, extra: 'International students have priority', phone: '031-220-2510' },
    zh: { name: '宿舍', loc: '校园内', hours: null, closed: null, extra: '留学生优先分配', phone: '031-220-2510' },
    ja: { name: '寮', loc: 'キャンパス内', hours: null, closed: null, extra: '留学生優先入寮', phone: '031-220-2510' },
    vi: { name: 'Ký túc xá', loc: 'Trong khuôn viên', hours: null, closed: null, extra: 'Ưu tiên sinh viên quốc tế', phone: '031-220-2510' },
    th: { name: 'หอพัก', loc: 'ในมหาวิทยาลัย', hours: null, closed: null, extra: 'นักศึกษาต่างชาติได้รับสิทธิ์พิเศษ', phone: '031-220-2510' },
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
    ko: { name: '프린터', loc: '중앙도서관 1층 · 학생회관 1층 · 각 단과대 행정실', hours: null, closed: null, extra: '흑백 50원/장 · 컬러 200원/장 · 학생증 충전 후 사용', phone: null },
    en: { name: 'Printers', loc: 'Library 1F · Student Hall 1F · College admin offices', hours: null, closed: null, extra: 'B&W ₩50/page · Color ₩200/page · Student ID required', phone: null },
    zh: { name: '打印机', loc: '图书馆1楼 · 学生会馆1楼 · 各学院行政室', hours: null, closed: null, extra: '黑白50₩/张 · 彩色200₩/张 · 学生证充值后使用', phone: null },
    ja: { name: 'プリンター', loc: '図書館1F · 学生会館1F · 各学部事務室', hours: null, closed: null, extra: '白黒50₩/枚 · カラー200₩/枚 · 学生証チャージ後使用', phone: null },
    vi: { name: 'Máy in', loc: 'TV T.1 · Nhà SV T.1 · VP các khoa', hours: null, closed: null, extra: 'Trắng đen ₩50 · Màu ₩200/trang · Thẻ SV', phone: null },
    th: { name: 'เครื่องพิมพ์', loc: 'ห้องสมุด ชั้น 1 · อาคารนักศึกษา ชั้น 1 · สนง.คณะ', hours: null, closed: null, extra: 'ขาวดำ ₩50 · สี ₩200/แผ่น · ใช้บัตรนักศึกษา', phone: null },
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    ko: { name: '국제교류처', loc: '본관 2층', hours: '평일 09:00~18:00', closed: '토·일·공휴일 휴무', extra: 'international@suwon.ac.kr', phone: '031-220-2114' },
    en: { name: "Int'l Affairs Office", loc: 'Main Building 2F', hours: 'Weekdays 09:00~18:00', closed: 'Closed Sat, Sun & holidays', extra: 'international@suwon.ac.kr', phone: '031-220-2114' },
    zh: { name: '国际交流处', loc: '本馆2楼', hours: '平日 09:00~18:00', closed: '周六·周日·节假日休', extra: 'international@suwon.ac.kr', phone: '031-220-2114' },
    ja: { name: '国際交流課', loc: '本館2F', hours: '平日 09:00~18:00', closed: '土·日·祝日休', extra: 'international@suwon.ac.kr', phone: '031-220-2114' },
    vi: { name: 'Phòng quốc tế', loc: 'Tòa nhà chính T.2', hours: 'T2~6: 09:00~18:00', closed: 'Đóng T7, CN & ngày lễ', extra: 'international@suwon.ac.kr', phone: '031-220-2114' },
    th: { name: 'สำนักงานนานาชาติ', loc: 'อาคารหลัก ชั้น 2', hours: 'จ~ศ 09:00~18:00', closed: 'ปิดเสาร์ อาทิตย์ & วันหยุด', extra: 'international@suwon.ac.kr', phone: '031-220-2114' },
  },
];

const departmentList = [
  { ko: '인성교양대학',       en: 'Character & Liberal Arts',       zh: '人格教养学院',   ja: '人格教養大学',         vi: 'Giáo dục Nhân cách',        th: 'ศิลปศาสตร์', c: '#5B8DEF' },
  { ko: '인문사회융합대학',   en: 'Humanities & Social Convergence',zh: '人文社会融合学院',ja: '人文社会融合大学',       vi: 'Nhân văn & Xã hội',         th: 'มนุษยศาสตร์', c: '#E07B54' },
  { ko: '경영공학대학',       en: 'Business & Engineering',         zh: '经营工学院',     ja: '経営工学大学',         vi: 'Kinh doanh & Kỹ thuật',      th: 'ธุรกิจ & วิศวกรรม', c: '#5BBD8A' },
  { ko: '혁신공학대학',       en: 'Innovative Engineering',         zh: '创新工学院',     ja: '革新工学大学',         vi: 'Kỹ thuật Đổi mới',           th: 'วิศวกรรมนวัตกรรม', c: '#9B70D4' },
  { ko: '지능SW융합대학',     en: 'Intelligent SW Convergence',     zh: '智能软件融合学院',ja: '知能SW融合大学',        vi: 'Phần mềm Thông minh',        th: 'Intelligent SW', c: '#4BAFD6' },
  { ko: '라이프케어사이언스대학', en: 'Life Care Sciences',          zh: '生命照护科学学院',ja: 'ライフケアサイエンス大学',vi: 'Khoa học Sức khỏe',          th: 'วิทยาศาสตร์สุขภาพ', c: '#3BBFB0' },
  { ko: '디자인예술대학',     en: 'Design & Art',                   zh: '设计艺术学院',   ja: 'デザイン芸術大学',      vi: 'Thiết kế & Nghệ thuật',      th: 'ออกแบบ & ศิลปะ', c: '#D95F5F' },
  { ko: '음악테크놀로지대학', en: 'Music Technology',               zh: '音乐技术学院',   ja: '音楽テクノロジー大学',  vi: 'Công nghệ Âm nhạc',          th: 'เทคโนโลยีดนตรี', c: '#E59332' },
  { ko: '문화예술융합대학',   en: 'Cultural Arts Convergence',      zh: '文化艺术融合学院',ja: '文化芸術融合大学',      vi: 'Văn hóa & Nghệ thuật',       th: 'วัฒนธรรม & ศิลปะ', c: '#50C0A0' },
  { ko: '글로벌인재대학',     en: 'Global Talent',                  zh: '全球人才学院',   ja: 'グローバル人材大学',    vi: 'Nhân tài Toàn cầu',          th: 'บุคลากรระดับโลก', c: '#7B9EB9' },
];

/* Language change hook */
function onLanguageChange(lang) {
  updateHeaderLang(lang);
  updateHomeData();
  updateNotices();
  updateNavLangButtons(lang);
  const activeTab = document.querySelector('.caf-day-tab.active');
  if (activeTab) renderCafeteriaDay(parseInt(activeTab.dataset.day));
  renderSchoolFacilities();
  renderSchoolDepts();
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
    document.getElementById('schoolSubMenu')?.classList.add('hidden');
    document.querySelector('.nav-sub-arrow')?.classList.remove('nav-sub-arrow-open');
    setTimeout(() => navOverlay.classList.add('hidden'), 350);
  }

  hamburgerBtn?.addEventListener('click', openNav);
  navCloseBtn?.addEventListener('click', closeNav);
  navOverlayBg?.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-menu-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      if (item.classList.contains('nav-has-sub')) {
        const subMenu = document.getElementById('schoolSubMenu');
        const arrow = item.querySelector('.nav-sub-arrow');
        subMenu?.classList.toggle('hidden');
        arrow?.classList.toggle('nav-sub-arrow-open');
        return;
      }
      const target = item.dataset.screen;
      closeNav();
      if (target) setTimeout(() => showScreen(target), 360);
    });
  });

  document.querySelectorAll('.nav-sub-item').forEach(sub => {
    sub.addEventListener('click', e => {
      e.preventDefault();
      const pane = sub.dataset.schoolPane;
      closeNav();
      setTimeout(() => openSchoolPane(pane), 360);
    });
  });
}

function initShuttleScreen() {
  document.getElementById('shuttleBackBtn')?.addEventListener('click', () => {
    showScreen('screen-home');
  });
  const shuttleRow = document.querySelector('.hero-shuttle-row');
  if (shuttleRow) {
    shuttleRow.style.cursor = 'pointer';
    shuttleRow.addEventListener('click', () => showScreen('screen-shuttle'));
  }
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

/* School Info Screen */
function openSchoolPane(pane) {
  showScreen('screen-school');
  document.querySelectorAll('.school-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.pane === pane);
  });
  document.querySelectorAll('.school-tab-pane').forEach(p => {
    p.classList.toggle('hidden', p.id !== pane);
  });
}

function renderSchoolFacilities() {
  const lang = window.currentLang || 'ko';
  const container = document.getElementById('schoolFacilities');
  if (!container) return;
  container.innerHTML = facilityList.map(fac => {
    const d = fac[lang] || fac.ko;
    const rows = [];
    if (d.loc)    rows.push(`<div class="school-fac-row"><span class="school-fac-label">${t('school_fac_loc')}</span><span class="school-fac-value">${d.loc}</span></div>`);
    if (d.hours)  rows.push(`<div class="school-fac-row"><span class="school-fac-label">${t('school_fac_hours')}</span><span class="school-fac-value">${d.hours}</span></div>`);
    if (d.closed) rows.push(`<div class="school-fac-row"><span class="school-fac-label"></span><span class="school-fac-value school-fac-closed">${d.closed}</span></div>`);
    if (d.extra)  rows.push(`<div class="school-fac-row"><span class="school-fac-label">${t('school_fac_extra')}</span><span class="school-fac-value">${d.extra}</span></div>`);
    if (d.phone)  rows.push(`<div class="school-fac-row"><span class="school-fac-label">${t('school_fac_phone')}</span><span class="school-fac-value"><a href="tel:${d.phone}" class="school-fac-phone-link">${d.phone}</a></span></div>`);
    return `
      <div class="school-fac-card${fac.link ? ' school-fac-link-card' : ''}" ${fac.link ? `onclick="window.open('${fac.link}','_blank')"` : ''}>
        <div class="school-fac-header">
          <span class="school-fac-icon">${fac.icon}</span>
          <span class="school-fac-name">${d.name}</span>
          ${fac.link ? `<span class="school-fac-ext">↗</span>` : ''}
        </div>
        <div class="school-fac-rows">${rows.join('')}</div>
      </div>`;
  }).join('');
}

function renderSchoolDepts() {
  const lang = window.currentLang || 'ko';
  const container = document.getElementById('schoolDepts');
  if (!container) return;
  container.innerHTML = `
    <p class="school-dept-subtitle">${t('school_dept_subtitle')}</p>
    <div class="school-dept-grid-inner">
      ${departmentList.map(dept => `
        <div class="school-dept-card" style="border-left: 4px solid ${dept.c}">
          <div class="school-dept-name">${dept[lang] || dept.ko}</div>
          ${lang !== 'ko' ? `<div class="school-dept-ko">${dept.ko}</div>` : ''}
        </div>
      `).join('')}
    </div>`;
}

function initSchoolScreen() {
  document.getElementById('schoolBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  document.querySelectorAll('.school-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.school-tab').forEach(tb => tb.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.school-tab-pane').forEach(p => p.classList.add('hidden'));
      const pane = document.getElementById(tab.dataset.pane);
      if (pane) pane.classList.remove('hidden');
    });
  });
  renderSchoolFacilities();
  renderSchoolDepts();
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
  initSchoolScreen();
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
