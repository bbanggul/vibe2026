/* ─── Campus Shuttle Schedule (교내 순환) ─── */
/* 평일 09:10 – 15:20, 10회 운행 */
const campusShuttleTimes = [
  '09:10','09:20','10:10','10:20','11:10',
  '11:20','12:10','13:20','14:20','15:20',
];

function getNextShuttle() {
  const now = new Date();
  const day = now.getDay();
  if (day === 0 || day === 6) return { none: true };

  const cur = now.getHours() * 60 + now.getMinutes();
  for (const time of campusShuttleTimes) {
    const [h, m] = time.split(':').map(Number);
    const mins = h * 60 + m;
    if (mins > cur) return { time, minutesLeft: mins - cur };
  }

  // Calculate minutes until next weekday's first shuttle (09:10)
  const firstShuttle = 9 * 60 + 10;
  const daysUntilNext = day === 5 ? 3 : 1; // Fri → Mon, else tomorrow
  const minutesUntilNext = (24 * 60 - cur) + (daysUntilNext - 1) * 24 * 60 + firstShuttle;
  return { done: true, minutesUntilNext };
}

/* ─── Cafeteria Menu ─── */
let cafeteriaData = null;

async function loadCafeteriaData() {
  try {
    const resp = await fetch('cafeteria_data.json?v=' + Date.now());
    if (!resp.ok) throw new Error('fetch failed');
    cafeteriaData = await resp.json();
  } catch (_) {
    cafeteriaData = null;
  }
}

function getTodayMenu() {
  if (!cafeteriaData) return null;
  const day = new Date().getDay();
  if (day === 0 || day === 6) return null;
  const entries = cafeteriaData.menu[String(day)];
  if (!entries || entries.length === 0) return null;
  return entries.find(e => e.type === '중식') || entries[0];
}

/* ─── Notices ─── */
const notices = [
  {
    ko: { title: '2026-1학기 외국인 유학생 특별 한국어 교육 프로그램', category: '프로그램', date: '2026.05.10' },
    en: { title: '2026-1 Special Korean Language Program for Int\'l Students', category: 'Program', date: '2026.05.10' },
    zh: { title: '2026-1学期留学生特别韩语教育项目', category: '项目', date: '2026.05.10' },
    ja: { title: '2026-1学期留学生向け特別韓国語教育プログラム', category: 'プログラム', date: '2026.05.10' },
    vi: { title: 'Chương trình đặc biệt tiếng Hàn cho sinh viên quốc tế HK1-2026', category: 'Chương trình', date: '2026.05.10' },
    th: { title: 'โปรแกรมภาษาเกาหลีพิเศษสำหรับนักศึกษาต่างชาติ ภาค 1/2026', category: 'โปรแกรม', date: '2026.05.10' },
  },
  {
    ko: { title: '도서관 하절기 운영시간 변경 안내 (6월~8월)', category: '시설', date: '2026.05.08' },
    en: { title: 'Library Summer Hours Change (Jun–Aug)', category: 'Facility', date: '2026.05.08' },
    zh: { title: '图书馆夏季开放时间变更通知（6月～8月）', category: '设施', date: '2026.05.08' },
    ja: { title: '図書館夏期利用時間変更のお知らせ（6月～8月）', category: '施設', date: '2026.05.08' },
    vi: { title: 'Thay đổi giờ mở cửa thư viện mùa hè (Tháng 6–8)', category: 'Cơ sở vật chất', date: '2026.05.08' },
    th: { title: 'การเปลี่ยนแปลงเวลาเปิดห้องสมุดในฤดูร้อน (มิ.ย.–ส.ค.)', category: 'สิ่งอำนวยความสะดวก', date: '2026.05.08' },
  },
  {
    ko: { title: '비교과 프로그램 튜터링·에프킬라 2분기 신청 안내', category: '비교과', date: '2026.05.06' },
    en: { title: 'Q2 Tutoring & AFK Learning Support Program Registration', category: 'Extracurricular', date: '2026.05.06' },
    zh: { title: '课外项目辅导·AFK第二季度报名指南', category: '课外', date: '2026.05.06' },
    ja: { title: '課外プログラム チュータリング・AFK 第2四半期申請案内', category: '課外', date: '2026.05.06' },
    vi: { title: 'Đăng ký chương trình hỗ trợ học tập Q2 (Gia sư & AFK)', category: 'Ngoại khóa', date: '2026.05.06' },
    th: { title: 'ลงทะเบียนโปรแกรมสนับสนุนการเรียนไตรมาส 2 (ติวเตอร์ & AFK)', category: 'กิจกรรมนอกหลักสูตร', date: '2026.05.06' },
  },
  {
    ko: { title: '2026학년도 1학기 수강신청 정정기간 안내', category: '학사', date: '2026.05.01' },
    en: { title: '2026-1 Course Registration Correction Period Notice', category: 'Academic', date: '2026.05.01' },
    zh: { title: '2026年度第一学期选课修改期间通知', category: '学业', date: '2026.05.01' },
    ja: { title: '2026年度前期履修登録訂正期間のお知らせ', category: '学業', date: '2026.05.01' },
    vi: { title: 'Thông báo thời gian chỉnh sửa đăng ký môn học HK1-2026', category: 'Học vụ', date: '2026.05.01' },
    th: { title: 'ประกาศช่วงแก้ไขการลงทะเบียนเรียน ภาค 1 ปีการศึกษา 2026', category: 'วิชาการ', date: '2026.05.01' },
  },
  {
    ko: { title: '글로벌 교환학생 프로그램 참가자 모집 (2026 후기)', category: '국제교류', date: '2026.04.28' },
    en: { title: 'Global Exchange Student Program 2026 Fall Recruitment', category: 'International', date: '2026.04.28' },
    zh: { title: '全球交换生项目招募（2026年秋季）', category: '国际交流', date: '2026.04.28' },
    ja: { title: 'グローバル交換留学プログラム参加者募集（2026年後期）', category: '国際交流', date: '2026.04.28' },
    vi: { title: 'Tuyển sinh viên trao đổi toàn cầu học kỳ mùa thu 2026', category: 'Quốc tế', date: '2026.04.28' },
    th: { title: 'รับสมัครนักศึกษาแลกเปลี่ยนระดับโลก ภาคการศึกษาฤดูใบไม้ร่วง 2026', category: 'นานาชาติ', date: '2026.04.28' },
  },
];

