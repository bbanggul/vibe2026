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

/* ─── Chatbot Responses ─── */
const chatbotResponses = {
  ko: [
    {
      keywords: ['도서관', '책', '열람', '대출', '반납', '스터디룸', '컨퍼런스'],
      response: '📚 중앙도서관\n운영: 학기중 09:30~19:00 · 방학중 09:30~17:00\n휴관: 토·일, 공휴일, 개교기념일, 장서점검일\n전화: 031-220-2393\n\n대출 한도: 학부생 7권/10일\n연체료: 1일 1책당 100원 (연체 시 대출·증명서 발급 중지)\n연장: 1회 가능 (홈페이지 My Library)\n\n스터디룸(컨퍼런스룸): 무료 — lib.suwon.ac.kr에서 온라인 예약\n열람실: 무료 자유 이용',
    },
    {
      keywords: ['셔틀', '버스', '교통', '시간표', '통학'],
      response: '🚌 셔틀버스\n\n[교내셔틀] 평일 09:10~15:20 (10회, 무료)\n인문대→학생회관→ICT→음악대→제1공학관→후문→미술대→인문대\n\n[통학버스] 송내역·고색역·강남역·사당역·병점역\n모바일 승차권 필수 (현금 불가)\n예약: sb.suwon.ac.kr\n\n홈 화면에서 다음 출발 시간 확인 가능!',
    },
    {
      keywords: ['학식', '밥', '메뉴', '식당', '점심', '저녁', '학생식당'],
      response: '🍱 학생식당\n위치: 학생회관 1층\n\n가격\n· 일품 (돈까스·덮밥): 6,500원\n· 샐러드: 5,800원\n· 라면: 4,500원\n결제: 학식당 앞 키오스크\n\n오늘의 메뉴는 홈 화면 또는 메뉴 > 학식당에서 확인!',
    },
    {
      keywords: ['프린터', '출력', '인쇄', '복사'],
      response: '🖨 프린터\n위치\n① 중앙도서관 1층 (흑백·컬러)\n② 학생회관 1층\n③ 각 단과대학 행정실\n\n요금: 흑백 50원/장 · 컬러 200원/장\n결제: 학생증 충전 후 사용',
    },
    {
      keywords: ['수강신청', '강의', '수업', '과목', '캔버스', 'canvas', '강좌', '수업자료'],
      response: '📋 수강신청\n① suwon.ac.kr → 포털 로그인\n② 학사시스템 → 수강신청\n강의자료: canvas.suwon.ac.kr\n\n신청 기간은 학기 초 공지 확인!',
    },
    {
      keywords: ['기숙사', '생활관', '숙소', '방', '도미토리'],
      response: '🏠 기숙사\n홈페이지: swudorm.suwon.ac.kr\n신청: suwon.ac.kr → 생활관 → 입사신청\n전화: 031-229-8202\n\n외국인 유학생 우선 배정 제도 있음\n정원 한정 — 빠른 신청 권장!',
    },
    {
      keywords: ['건강', '병원', '약', '아프', '보건', '의료', '보건실'],
      response: '🏥 보건실\n위치: 학생회관 2층\n운영: 평일 09:00~17:00 (토·일·공휴일 휴무)\n전화: 031-220-2114\n\n응급: 119\n학교 보안실: 031-220-2000',
    },
    {
      keywords: ['비자', '외국인', '등록', '국제교류', '유학생', '장학금'],
      response: '🌐 국제교류처\n위치: 본관 2층\n운영: 평일 09:00~18:00\n전화: 031-220-2114\n이메일: international@suwon.ac.kr\n\n비자·외국인 등록·장학금·교환학생 등 담당',
    },
  ],
  en: [
    {
      keywords: ['library', 'book', 'borrow', 'return', 'reading', 'study room', 'conference'],
      response: '📚 Central Library\nHours: Semester 09:30~19:00 · Vacation 09:30~17:00\nClosed: Sat·Sun, holidays, Foundation Day, inventory days\nPhone: 031-220-2393\n\nBorrow limit: Undergrad 7 books / 10 days\nOverdue fee: ₩100/book/day (borrowing & certificates suspended)\nRenewal: once via My Library on the website\n\nConference study rooms: Free — book at lib.suwon.ac.kr\nReading room: Free walk-in',
    },
    {
      keywords: ['shuttle', 'bus', 'transport', 'schedule', 'commuter'],
      response: '🚌 Shuttle Bus\n\n[Campus Loop] Weekdays 09:10~15:20 (10 trips, free)\nHumanities→Student Hall→ICT→Music→Eng.1→Back Gate→Fine Arts→Humanities\n\n[Commuter Bus] Songnae·Gosaek·Gangnam·Sadang·Byeongjeom stations\nMobile ticket required (no cash)\nApp: sb.suwon.ac.kr\n\nCheck next departure on the home screen!',
    },
    {
      keywords: ['cafeteria', 'food', 'meal', 'lunch', 'dinner', 'menu'],
      response: '🍱 Student Cafeteria\nLocation: Student Hall 1F\n\nPrices\n· Set meal (Cutlet/Rice bowl): ₩6,500\n· Salad: ₩5,800\n· Ramen: ₩4,500\nPayment: Kiosk in front of the cafeteria\n\nSee today\'s full menu on home screen or Menu > Cafeteria!',
    },
    {
      keywords: ['printer', 'print', 'copy'],
      response: '🖨 Printers\nLocations\n① Central Library 1F (B&W · Color)\n② Student Hall 1F\n③ College admin offices\n\nPrice: B&W ₩50/page · Color ₩200/page\nPayment: Student ID (top-up required)',
    },
    {
      keywords: ['registration', 'course', 'class', 'canvas', 'lecture'],
      response: '📋 Course Registration\n① suwon.ac.kr → Portal Login\n② Academic System → Course Registration\nMaterials: canvas.suwon.ac.kr\n\nCheck announcements for registration dates!',
    },
    {
      keywords: ['dormitory', 'dorm', 'housing', 'room', 'residence'],
      response: '🏠 Dormitory\nWebsite: swudorm.suwon.ac.kr\nApply: suwon.ac.kr → Dormitory → Apply\nPhone: 031-229-8202\n\nInternational students have priority!\nLimited spots — apply early!',
    },
    {
      keywords: ['health', 'hospital', 'sick', 'medicine', 'clinic'],
      response: '🏥 Health Center\nLocation: Student Hall 2F\nHours: Weekdays 09:00~17:00 (closed Sat·Sun·holidays)\nPhone: 031-220-2114\n\nEmergency: 119\nCampus Security: 031-220-2000',
    },
    {
      keywords: ['visa', 'alien', 'foreign', 'international', 'office', 'scholarship'],
      response: '🌐 International Affairs Office\nLocation: Main Building 2F\nHours: Weekdays 09:00~18:00\nPhone: 031-220-2114\nEmail: international@suwon.ac.kr\n\nHandles visa, alien registration, scholarships & exchange programs.',
    },
  ],
  zh: [
    {
      keywords: ['图书馆', '书', '借书', '还书', '阅览', '自习室'],
      response: '📚 中央图书馆\n开放时间: 学期中 09:30~19:00 · 假期 09:30~17:00\n休馆: 周六·周日、公休日、建校纪念日、藏书清点日\n电话: 031-220-2393\n\n借阅限额: 本科生7册/10天\n逾期费: 每册每天₩100（逾期暂停借阅及证明申请）\n续借: 1次（官网 My Library）\n\n研讨室: 免费 — lib.suwon.ac.kr 在线预约\n阅览室: 免费自由使用',
    },
    {
      keywords: ['校车', '班车', '巴士', '交通', '通勤'],
      response: '🚌 校车信息\n\n[校内循环] 工作日 09:10~15:20（10班，免费）\n人文→学生会馆→ICT→音乐→工学馆→后门→美术→人文\n\n[通勤巴士] 松内站·古色站·江南站·四堂站·饼店站\n须使用移动乘车券（不可现金）\n预约: sb.suwon.ac.kr\n\n首页可查看下一班出发时间！',
    },
    {
      keywords: ['食堂', '菜单', '午饭', '晚饭', '吃饭'],
      response: '🍱 学生食堂\n位置: 学生会馆1楼\n\n价格\n· 套餐（炸猪排/盖饭）: ₩6,500\n· 沙拉: ₩5,800\n· 拉面: ₩4,500\n结账: 食堂门口自助机\n\n今日菜单请查看首页或菜单 > 食堂！',
    },
    {
      keywords: ['打印机', '打印', '复印', '输出'],
      response: '🖨 打印机\n位置\n① 图书馆1楼（黑白·彩色）\n② 学生会馆1楼\n③ 各学院行政室\n\n费用: 黑白₩50/张 · 彩色₩200/张\n支付: 学生证充值后使用',
    },
    {
      keywords: ['选课', '课程', '注册', '学习', 'canvas'],
      response: '📋 选课\n① 登录 suwon.ac.kr 门户\n② 学籍管理系统 → 选课\n课程资料: canvas.suwon.ac.kr\n\n请关注学期初公告了解选课时间！',
    },
    {
      keywords: ['宿舍', '住宿', '生活馆', '房间'],
      response: '🏠 宿舍\n官网: swudorm.suwon.ac.kr\n申请: suwon.ac.kr → 生活馆 → 入住申请\n电话: 031-229-8202\n\n留学生可优先分配！名额有限，建议尽早申请！',
    },
    {
      keywords: ['健康', '医院', '药', '生病', '医务'],
      response: '🏥 医务室\n位置: 学生会馆2楼\n营业: 平日 09:00~17:00（周六·日·节假日休）\n电话: 031-220-2114\n\n紧急: 119\n校园保安: 031-220-2000',
    },
    {
      keywords: ['签证', '留学生', '外国人', '国际交流', '奖学金'],
      response: '🌐 国际交流处\n位置: 本馆2楼\n营业: 平日 09:00~18:00\n电话: 031-220-2114\n邮箱: international@suwon.ac.kr\n\n负责签证、外国人登录、奖学金、交换生项目等。',
    },
  ],
  ja: [
    {
      keywords: ['図書館', '本', '借りる', '返却', '閲覧', 'スタディ', '自習'],
      response: '📚 中央図書館\n開館時間: 学期中 09:30~19:00 · 休暇中 09:30~17:00\n休館: 土·日、祝日、開校記念日、蔵書点検日\n電話: 031-220-2393\n\n貸出限度: 学部生7冊/10日\n延滞料: 1冊1日₩100（延滞中は貸出·証明書発行停止）\n延長: 1回（HPのMy Library）\n\nカンファレンスルーム: 無料 — lib.suwon.ac.kr で予約\n閲覧室: 無料・申請不要',
    },
    {
      keywords: ['シャトル', 'バス', '交通', '時刻表', '通学'],
      response: '🚌 シャトルバス\n\n[キャンパス循環] 平日 09:10~15:20（10便、無料）\n人文大→学生会館→ICT→音楽大→工学館→裏門→美術大→人文大\n\n[通学バス] 宋内·古色·江南·舍堂·餅店駅\nモバイル乗車券必須（現金不可）\n予約: sb.suwon.ac.kr\n\n次の出発時刻はホーム画面で確認！',
    },
    {
      keywords: ['学食', '食堂', 'メニュー', '昼食', '夕食'],
      response: '🍱 学生食堂\n場所: 学生会館1F\n\n価格\n· 一品（カツ·丼）: ₩6,500\n· サラダ: ₩5,800\n· ラーメン: ₩4,500\n支払い: 食堂前のキオスク\n\n本日のメニューはホーム画面またはメニュー > 食堂で確認！',
    },
    {
      keywords: ['プリンター', '印刷', 'コピー', '出力'],
      response: '🖨 プリンター\n場所\n① 図書館1F（白黒・カラー）\n② 学生会館1F\n③ 各学部事務室\n\n料金: 白黒₩50/枚 · カラー₩200/枚\n支払い: 学生証チャージ後使用',
    },
    {
      keywords: ['履修', '授業', '講義', '登録', 'キャンバス'],
      response: '📋 履修登録\n① suwon.ac.kr にログイン\n② 学籍システム → 履修登録\n教材: canvas.suwon.ac.kr\n\n登録期間は学期初めのお知らせを確認！',
    },
    {
      keywords: ['寮', '宿舎', '生活館', '部屋', 'ドミトリー'],
      response: '🏠 学生寮\nHP: swudorm.suwon.ac.kr\n申請: suwon.ac.kr → 生活館 → 入寮申請\n電話: 031-229-8202\n\n留学生優先入寮制度あり！定員限定 — お早めに！',
    },
    {
      keywords: ['健康', '病院', '薬', '体調', '保健'],
      response: '🏥 保健室\n場所: 学生会館2F\n営業: 平日 09:00~17:00（土·日·祝日休）\n電話: 031-220-2114\n\n緊急: 119\n警備室: 031-220-2000',
    },
    {
      keywords: ['ビザ', '留学生', '外国人', '国際交流', '奨学金'],
      response: '🌐 国際交流課\n場所: 本館2F\n営業: 平日 09:00~18:00\n電話: 031-220-2114\nメール: international@suwon.ac.kr\n\nビザ·外国人登録·奨学金·交換留学など担当。',
    },
  ],
  vi: [
    {
      keywords: ['thư viện', 'sách', 'mượn', 'trả', 'đọc', 'phòng học nhóm'],
      response: '📚 Thư viện Trung tâm\nGiờ mở: Học kỳ 09:30~19:00 · Nghỉ hè 09:30~17:00\nĐóng: T7·CN, ngày lễ, ngày kỷ niệm, ngày kiểm kê\nĐT: 031-220-2393\n\nHạn mức: ĐH 7 cuốn / 10 ngày\nPhí trễ hạn: ₩100/cuốn/ngày (khóa mượn & cấp giấy tờ)\nGia hạn: 1 lần qua My Library trên website\n\nPhòng học nhóm (conference): Miễn phí — đặt tại lib.suwon.ac.kr\nPhòng đọc sách: Miễn phí, tự do vào',
    },
    {
      keywords: ['xe buýt', 'xe', 'shuttle', 'lịch', 'đưa đón'],
      response: '🚌 Xe buýt\n\n[Xe nội khu] T2~6, 09:10~15:20 (10 chuyến, miễn phí)\nNhân văn→Nhà SV→ICT→Âm nhạc→KT1→Cổng sau→Mỹ thuật→Nhân văn\n\n[Xe đưa đón] Ga Songnae·Gosaek·Gangnam·Sadang·Byeongjeom\nBắt buộc vé di động (không nhận tiền mặt)\nApp: sb.suwon.ac.kr\n\nXem giờ khởi hành tiếp theo ở trang chủ!',
    },
    {
      keywords: ['căng tin', 'ăn', 'thực đơn', 'bữa trưa', 'bữa tối'],
      response: '🍱 Căng tin sinh viên\nVị trí: Tầng 1, Nhà sinh viên\n\nGiá\n· Suất ăn (Cutlet/Cơm): ₩6,500\n· Salad: ₩5,800\n· Mì ramen: ₩4,500\nThanh toán: Kiosk trước căng tin\n\nXem thực đơn hôm nay ở trang chủ hoặc Menu > Căng tin!',
    },
    {
      keywords: ['máy in', 'in', 'sao chép', 'photocopy'],
      response: '🖨 Máy in\nVị trí\n① T.1 Thư viện TT (Trắng đen & Màu)\n② T.1 Nhà sinh viên\n③ VP hành chính các khoa\n\nGiá: Trắng đen ₩50 · Màu ₩200/trang\nThanh toán: Nạp tiền vào thẻ SV',
    },
    {
      keywords: ['đăng ký', 'môn học', 'khóa học', 'lịch học', 'canvas'],
      response: '📋 Đăng ký môn học\n① suwon.ac.kr → Đăng nhập cổng thông tin\n② Hệ thống học vụ → Đăng ký môn\nTài liệu: canvas.suwon.ac.kr\n\nXem thông báo đầu học kỳ để biết thời gian đăng ký!',
    },
    {
      keywords: ['ký túc xá', 'ký túc', 'phòng', 'nhà ở'],
      response: '🏠 Ký túc xá\nWebsite: swudorm.suwon.ac.kr\nĐăng ký: suwon.ac.kr → Ký túc xá → Đăng ký\nĐT: 031-229-8202\n\nSinh viên quốc tế được ưu tiên!\nSố phòng có hạn — đăng ký sớm!',
    },
    {
      keywords: ['sức khỏe', 'bệnh viện', 'thuốc', 'ốm', 'y tế'],
      response: '🏥 Phòng y tế\nVị trí: Tầng 2 Nhà sinh viên\nGiờ: T2~6, 09:00~17:00 (đóng T7·CN·ngày lễ)\nĐT: 031-220-2114\n\nKhẩn cấp: 119\nBảo vệ trường: 031-220-2000',
    },
    {
      keywords: ['visa', 'nước ngoài', 'quốc tế', 'văn phòng', 'học bổng'],
      response: '🌐 Phòng Quan hệ quốc tế\nVị trí: Tầng 2 Tòa nhà chính\nGiờ: T2~6, 09:00~18:00\nĐT: 031-220-2114\nEmail: international@suwon.ac.kr\n\nXử lý visa, đăng ký nước ngoài, học bổng, trao đổi sinh viên.',
    },
  ],
  th: [
    {
      keywords: ['ห้องสมุด', 'หนังสือ', 'ยืม', 'คืน', 'อ่าน', 'ห้องกลุ่ม'],
      response: '📚 ห้องสมุดกลาง\nเวลา: ภาคเรียน 09:30~19:00 · ปิดภาค 09:30~17:00\nปิด: เสาร์·อาทิตย์, วันหยุด, วันก่อตั้ง, วันตรวจนับ\nโทร: 031-220-2393\n\nจำกัด: ป.ตรี 7 เล่ม / 10 วัน\nค่าปรับ: ₩100/เล่ม/วัน (ระงับการยืมและออกเอกสาร)\nต่ออายุ: 1 ครั้ง ผ่าน My Library\n\nห้องสตัดดี้ (conference): ฟรี — จองที่ lib.suwon.ac.kr\nห้องอ่านหนังสือ: ฟรี เข้าได้เลย',
    },
    {
      keywords: ['รถรับส่ง', 'รถบัส', 'รถ', 'ตาราง', 'รถชัตเติ้ล'],
      response: '🚌 รถรับส่ง\n\n[วนรอบวิทยาเขต] จ~ศ 09:10~15:20 (10 รอบ, ฟรี)\nมนุษย์ฯ→หอนักศึกษา→ICT→ดนตรี→วิศวะ1→ประตูหลัง→ศิลปกรรม→มนุษย์ฯ\n\n[รถประจำทาง] สถานีซงแน·โกแซก·กังนัม·ซาดัง·พยองจอม\nต้องมีตั๋วมือถือ (ไม่รับเงินสด)\nApp: sb.suwon.ac.kr\n\nดูเวลาถัดไปที่หน้าหลัก!',
    },
    {
      keywords: ['โรงอาหาร', 'อาหาร', 'เมนู', 'กลางวัน', 'เย็น'],
      response: '🍱 โรงอาหารนักศึกษา\nสถานที่: ชั้น 1 อาคารนักศึกษา\n\nราคา\n· อาหารจานเดียว (คัตสึ/ข้าวหน้า): ₩6,500\n· สลัด: ₩5,800\n· ราเมน: ₩4,500\nชำระ: คีออสก์หน้าโรงอาหาร\n\nดูเมนูวันนี้ที่หน้าหลักหรือเมนู > โรงอาหาร!',
    },
    {
      keywords: ['เครื่องพิมพ์', 'พิมพ์', 'ถ่ายเอกสาร', 'ปริ้น'],
      response: '🖨 เครื่องพิมพ์\nตำแหน่ง\n① ชั้น 1 ห้องสมุด (ขาวดำ & สี)\n② ชั้น 1 อาคารนักศึกษา\n③ สนง.ธุรการแต่ละคณะ\n\nราคา: ขาวดำ ₩50 · สี ₩200/แผ่น\nชำระ: เติมเงินบัตรนักศึกษา',
    },
    {
      keywords: ['ลงทะเบียน', 'วิชา', 'หลักสูตร', 'ตารางเรียน', 'canvas'],
      response: '📋 ลงทะเบียนวิชา\n① suwon.ac.kr → เข้าสู่ระบบ\n② ระบบวิชาการ → ลงทะเบียน\nเอกสาร: canvas.suwon.ac.kr\n\nตรวจสอบประกาศต้นภาคสำหรับวันที่ลงทะเบียน!',
    },
    {
      keywords: ['หอพัก', 'หอ', 'ห้อง', 'ที่พัก'],
      response: '🏠 หอพัก\nเว็บไซต์: swudorm.suwon.ac.kr\nสมัคร: suwon.ac.kr → หอพัก → สมัคร\nโทร: 031-229-8202\n\nนักศึกษาต่างชาติได้รับสิทธิ์พิเศษ!\nที่พักมีจำกัด — สมัครเร็ว!',
    },
    {
      keywords: ['สุขภาพ', 'โรงพยาบาล', 'ยา', 'ป่วย', 'คลินิก'],
      response: '🏥 ศูนย์สุขภาพ\nสถานที่: ชั้น 2 อาคารนักศึกษา\nเวลา: จ~ศ 09:00~17:00 (ปิดเสาร์·อาทิตย์·วันหยุด)\nโทร: 031-220-2114\n\nฉุกเฉิน: 119\nรปภ.: 031-220-2000',
    },
    {
      keywords: ['วีซ่า', 'ต่างชาติ', 'นานาชาติ', 'สำนักงาน', 'ทุนการศึกษา'],
      response: '🌐 สำนักงานนานาชาติ\nสถานที่: ชั้น 2 อาคารหลัก\nเวลา: จ~ศ 09:00~18:00\nโทร: 031-220-2114\nอีเมล: international@suwon.ac.kr\n\nดูแลวีซ่า การลงทะเบียนต่างด้าว ทุนการศึกษา และโปรแกรมแลกเปลี่ยน',
    },
  ],
};

function getChatbotResponse(input) {
  const lang = window.currentLang || 'ko';
  const responses = chatbotResponses[lang] || chatbotResponses.ko;
  const lower = input.toLowerCase();

  for (const item of responses) {
    if (item.keywords.some(k => lower.includes(k.toLowerCase()))) {
      return item.response;
    }
  }
  const defaults = {
    ko: '죄송해요, 잘 이해하지 못했어요 😅\n다음 주제로 질문해 보세요:\n도서관   셔틀버스   학식\n프린터   수강신청   기숙사\n보건실   국제교류처',
    en: 'Sorry, I didn\'t understand 😅\nTry asking about:\nLibrary   Shuttle Bus   Cafeteria\nPrinter   Registration   Dormitory\nHealth Center   Int\'l Office',
    zh: '抱歉，我没有理解您的问题 😅\n请尝试询问：\n图书馆   校车   食堂\n打印机   选课   宿舍\n医务室   国际交流处',
    ja: '申し訳ありません、理解できませんでした 😅\n以下についてお聞きください：\n図書館   シャトル   学食\nプリンター   履修   寮\n保健室   国際交流課',
    vi: 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn 😅\nHãy thử hỏi về:\nThư viện   Xe buýt   Căng tin\nMáy in   Đăng ký   Ký túc xá\nY tế   Phòng quốc tế',
    th: 'ขอโทษ ฉันไม่เข้าใจคำถามของคุณ 😅\nลองถามเกี่ยวกับ:\nห้องสมุด   รถรับส่ง   โรงอาหาร\nเครื่องพิมพ์   ลงทะเบียน   หอพัก\nศูนย์สุขภาพ   สำนักงานนานาชาติ',
  };
  return defaults[lang] || defaults.ko;
}
