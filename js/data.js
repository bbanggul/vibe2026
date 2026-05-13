/* ─── Shuttle Schedule ─── */
/* Times in 'HH:MM' 24h format. Direction: school→station (toStation) */
const shuttleSchedule = {
  weekday: [
    '07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30',
    '11:00','12:00','13:00','14:00','15:00','16:00','17:00','17:30',
    '18:00','18:30','19:00','20:00','21:00',
  ],
  saturday: ['09:00','12:00','17:00'],
  sunday: [],
};

function getNextShuttle() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun,1=Mon,...,6=Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let schedule;
  if (dayOfWeek === 0) schedule = shuttleSchedule.sunday;
  else if (dayOfWeek === 6) schedule = shuttleSchedule.saturday;
  else schedule = shuttleSchedule.weekday;

  for (const time of schedule) {
    const [h, m] = time.split(':').map(Number);
    const shuttleMinutes = h * 60 + m;
    if (shuttleMinutes > currentMinutes) {
      return { time, minutesLeft: shuttleMinutes - currentMinutes };
    }
  }
  return null; // no more shuttles today
}

/* ─── Cafeteria Menu ─── */
/* dayOfWeek: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri */
const cafeteriaMenu = {
  1: {
    main: { ko: '김치찌개', en: 'Kimchi Jjigae', zh: '泡菜汤', ja: 'キムチチゲ', vi: 'Canh Kim Chi', th: 'แกงกิมจิ' },
    side: {
      ko: ['흰밥', '계란말이', '콩나물무침', '배추김치'],
      en: ['Steamed Rice', 'Rolled Omelette', 'Bean Sprout', 'Kimchi'],
      zh: ['米饭', '蛋卷', '豆芽菜', '泡菜'],
      ja: ['ご飯', '玉子焼き', 'もやし和え', 'キムチ'],
    },
    price: '3,500원',
  },
  2: {
    main: { ko: '된장찌개', en: 'Doenjang Jjigae', zh: '大酱汤', ja: 'テンジャンチゲ', vi: 'Canh Tương', th: 'แกงเต้าเจี้ยว' },
    side: {
      ko: ['흰밥', '돼지불고기', '깍두기', '시금치나물'],
      en: ['Steamed Rice', 'Pork Bulgogi', 'Radish Kimchi', 'Spinach'],
      zh: ['米饭', '猪肉烤肉', '萝卜泡菜', '菠菜'],
      ja: ['ご飯', '豚プルコギ', 'カクテキ', 'ほうれん草'],
    },
    price: '3,500원',
  },
  3: {
    main: { ko: '부대찌개', en: 'Budae Jjigae', zh: '部队汤', ja: 'プデチゲ', vi: 'Canh Budae', th: 'แกงบูแด' },
    side: {
      ko: ['흰밥', '생선가스', '열무김치', '멸치볶음'],
      en: ['Steamed Rice', 'Fish Cutlet', 'Radish Leaf Kimchi', 'Stir-fried Anchovy'],
      zh: ['米饭', '炸鱼', '萝卜叶泡菜', '炒小鱼'],
      ja: ['ご飯', 'フィッシュカツ', 'ヨルムキムチ', 'いりこ炒め'],
    },
    price: '4,000원',
  },
  4: {
    main: { ko: '순두부찌개', en: 'Sundubu Jjigae', zh: '嫩豆腐汤', ja: 'スンドゥブチゲ', vi: 'Canh Đậu Hũ Non', th: 'แกงเต้าหู้อ่อน' },
    side: {
      ko: ['흰밥', '제육볶음', '배추김치', '도라지무침'],
      en: ['Steamed Rice', 'Spicy Pork', 'Kimchi', 'Bellflower Root'],
      zh: ['米饭', '辣炒猪肉', '泡菜', '桔梗'],
      ja: ['ご飯', 'チェユクポックム', 'キムチ', 'キキョウ和え'],
    },
    price: '3,500원',
  },
  5: {
    main: { ko: '육개장', en: 'Yukgaejang', zh: '辣牛肉汤', ja: 'ユッケジャン', vi: 'Canh Thịt Bò Cay', th: 'แกงเนื้อเผ็ด' },
    side: {
      ko: ['흰밥', '잡채', '오이소박이', '두부조림'],
      en: ['Steamed Rice', 'Japchae', 'Cucumber Kimchi', 'Braised Tofu'],
      zh: ['米饭', '杂菜', '黄瓜泡菜', '红烧豆腐'],
      ja: ['ご飯', 'チャプチェ', 'キュウリキムチ', '豆腐煮'],
    },
    price: '4,000원',
  },
};

function getTodayMenu() {
  const day = new Date().getDay();
  if (day === 0 || day === 6) return null;
  return cafeteriaMenu[day] || null;
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
      keywords: ['도서관', '책', '열람', '대출', '반납'],
      response: '도서관 이용시간\n평일: 09:00 – 22:00\n토요일: 09:00 – 18:00\n일요일·공휴일 휴관\n\n대출: 학생증 필요 (10권 / 30일)\n위치: 중앙도서관 (캠퍼스 지도 참고)',
    },
    {
      keywords: ['셔틀', '버스', '교통', '시간표', '수원역'],
      response: '셔틀버스 (학교↔수원역)\n평일: 07:00 – 21:00 (30분~1시간 간격)\n토요일: 09:00, 12:00, 17:00\n일요일: 운행 없음\n\n홈 화면에서 다음 출발 시간을 확인하세요!',
    },
    {
      keywords: ['학식', '밥', '메뉴', '식당', '점심', '저녁'],
      response: '학생식당\n운영: 평일 11:00 – 14:00\n가격: 3,500원 – 4,000원\n위치: 학생회관 1층\n\n오늘의 메뉴는 홈 화면에서 바로 확인 가능합니다!',
    },
    {
      keywords: ['프린터', '출력', '인쇄', '복사'],
      response: '프린터 위치\n① 중앙도서관 1층 (흑백·컬러)\n② 학생회관 1층\n③ 각 단과대학 행정실\n\n요금: 흑백 50원/장 · 컬러 200원/장\n결제: 학생증 (충전 필요)',
    },
    {
      keywords: ['수강신청', '강의', '수업', '과목', '캔버스', 'canvas', '강좌'],
      response: '수강신청\n① suwon.ac.kr → 포털 로그인\n② 학사시스템 → 수강신청\n③ 강의자료: canvas.suwon.ac.kr\n\n신청 기간은 학기 초 공지를 확인하세요!',
    },
    {
      keywords: ['기숙사', '생활관', '숙소', '방'],
      response: '기숙사 신청\nsuwon.ac.kr → 생활관 → 입사신청\n\n외국인 유학생 우선 배정 제도 있음\n문의: 생활관 행정실 031-220-2×××\n\n정원 한정! 빠른 신청 권장',
    },
    {
      keywords: ['건강', '병원', '약', '아프', '보건', '의료'],
      response: '교내 보건실\n위치: 학생회관 2층\n운영: 평일 09:00 – 17:00\n\n근처 병원·약국 정보는 캠퍼스 지도를 확인하세요.\n응급: 119 / 학교 보안실 031-220-2000',
    },
    {
      keywords: ['비자', '외국인', '등록', '국제교류', '유학생 사무'],
      response: '국제교류처\n위치: 본관 2층\n운영: 평일 09:00 – 18:00\n전화: 031-220-2×××\n이메일: international@suwon.ac.kr\n\n비자·외국인 등록·장학금 등 담당',
    },
  ],
  en: [
    {
      keywords: ['library', 'book', 'borrow', 'return', 'reading'],
      response: 'Library Hours\nWeekdays: 09:00 – 22:00\nSaturday: 09:00 – 18:00\nClosed Sundays & holidays\n\nBorrowing: Student ID required (10 books / 30 days)\nLocation: Central Library',
    },
    {
      keywords: ['shuttle', 'bus', 'transport', 'schedule', 'station'],
      response: 'Shuttle Bus (Campus ↔ Suwon Station)\nWeekdays: 07:00 – 21:00 (every 30–60 min)\nSaturday: 09:00, 12:00, 17:00\nSunday: No service\n\nCheck the home screen for the next departure!',
    },
    {
      keywords: ['cafeteria', 'food', 'meal', 'lunch', 'dinner', 'menu'],
      response: 'Student Cafeteria\nHours: Weekdays 11:00 – 14:00\nPrice: ₩3,500 – ₩4,000\nLocation: Student Hall 1F\n\nToday\'s menu is on the home screen!',
    },
    {
      keywords: ['printer', 'print', 'copy'],
      response: 'Printer Locations\n① Central Library 1F (B&W · Color)\n② Student Hall 1F\n③ College admin offices\n\nPrice: B&W ₩50/page · Color ₩200/page\nPayment: Student ID card (top-up required)',
    },
    {
      keywords: ['registration', 'course', 'class', 'canvas', 'lecture'],
      response: 'Course Registration\n① Visit suwon.ac.kr → Portal Login\n② Academic System → Course Registration\n③ Materials: canvas.suwon.ac.kr\n\nCheck announcements for registration dates!',
    },
    {
      keywords: ['dormitory', 'dorm', 'housing', 'room', 'residence'],
      response: 'Dormitory Application\nsuwon.ac.kr → Dormitory → Apply\n\nInternational students have priority admission!\nContact: Dormitory Office 031-220-2×××\n\nLimited spots – apply early!',
    },
    {
      keywords: ['health', 'hospital', 'sick', 'medicine', 'clinic'],
      response: 'Campus Health Center\nLocation: Student Hall 2F\nHours: Weekdays 09:00 – 17:00\n\nNearby clinics & pharmacies: see Campus Map.\nEmergency: 119 / Campus Security 031-220-2000',
    },
    {
      keywords: ['visa', 'alien', 'foreign', 'international', 'office'],
      response: 'International Affairs Office\nLocation: Main Building 2F\nHours: Weekdays 09:00 – 18:00\nPhone: 031-220-2×××\nEmail: international@suwon.ac.kr\n\nHandles visa, alien registration, scholarships & more.',
    },
  ],
  zh: [
    {
      keywords: ['图书馆', '书', '借书', '还书', '阅览'],
      response: '图书馆开放时间\n平日: 09:00 – 22:00\n周六: 09:00 – 18:00\n周日及节假日休馆\n\n借书需学生证（10本 / 30天）\n位置：中央图书馆',
    },
    {
      keywords: ['校车', '班车', '巴士', '交通', '水原站'],
      response: '校车（学校↔水原站）\n平日: 07:00 – 21:00（每30~60分钟）\n周六: 09:00, 12:00, 17:00\n周日: 不运行\n\n首页可查看下一班出发时间！',
    },
    {
      keywords: ['食堂', '菜单', '午饭', '晚饭', '吃饭'],
      response: '学生食堂\n营业: 平日 11:00 – 14:00\n价格: ₩3,500 – ₩4,000\n位置：学生会馆1楼\n\n今日菜单请查看首页！',
    },
    {
      keywords: ['打印机', '打印', '复印', '输出'],
      response: '打印机位置\n① 中央图书馆1楼（黑白·彩色）\n② 学生会馆1楼\n③ 各学院行政室\n\n费用: 黑白₩50/张 · 彩色₩200/张\n支付: 学生证（需充值）',
    },
    {
      keywords: ['选课', '课程', '注册', '学习', 'canvas'],
      response: '选课方法\n① 登录 suwon.ac.kr 门户\n② 学籍管理系统 → 选课\n③ 课程资料: canvas.suwon.ac.kr\n\n请关注学期初公告了解选课时间！',
    },
    {
      keywords: ['宿舍', '住宿', '生活馆', '房间'],
      response: '宿舍申请\nsuwon.ac.kr → 生活馆 → 入住申请\n\n留学生可优先分配！\n联系: 生活馆行政室 031-220-2×××\n\n名额有限，建议尽早申请！',
    },
    {
      keywords: ['健康', '医院', '药', '生病', '医务'],
      response: '校内医务室\n位置: 学生会馆2楼\n营业: 平日 09:00 – 17:00\n\n附近医院·药店信息请查看校园地图。\n紧急情况: 119 / 校园保安 031-220-2000',
    },
    {
      keywords: ['签证', '留学生', '外国人', '国际交流'],
      response: '国际交流处\n位置: 本馆2楼\n营业: 平日 09:00 – 18:00\n电话: 031-220-2×××\n邮箱: international@suwon.ac.kr\n\n负责签证、外国人登录、奖学金等事务。',
    },
  ],
  ja: [
    {
      keywords: ['図書館', '本', '借りる', '返却', '閲覧'],
      response: '図書館利用時間\n平日: 09:00 – 22:00\n土曜: 09:00 – 18:00\n日曜・祝日休館\n\n貸し出し: 学生証が必要（10冊 / 30日）\n場所: 中央図書館',
    },
    {
      keywords: ['シャトル', 'バス', '交通', '時刻表', '水原駅'],
      response: 'シャトルバス（学校↔水原駅）\n平日: 07:00 – 21:00（30~60分間隔）\n土曜: 09:00, 12:00, 17:00\n日曜: 運行なし\n\nホーム画面で次の出発時刻を確認できます！',
    },
    {
      keywords: ['学食', '食堂', 'メニュー', '昼食', '夕食'],
      response: '学生食堂\n営業: 平日 11:00 – 14:00\n価格: ₩3,500 – ₩4,000\n場所: 学生会館1F\n\n本日のメニューはホーム画面でご確認ください！',
    },
    {
      keywords: ['プリンター', '印刷', 'コピー', '出力'],
      response: 'プリンターの場所\n① 中央図書館1F（白黒・カラー）\n② 学生会館1F\n③ 各学部事務室\n\n料金: 白黒₩50/枚 · カラー₩200/枚\n支払い: 学生証（チャージ必要）',
    },
    {
      keywords: ['履修', '授業', '講義', '登録', 'キャンバス'],
      response: '履修登録方法\n① suwon.ac.kr にログイン\n② 学籍システム → 履修登録\n③ 教材: canvas.suwon.ac.kr\n\n登録期間は学期初めのお知らせをご確認ください！',
    },
    {
      keywords: ['寮', '宿舎', '生活館', '部屋'],
      response: '寮の申請\nsuwon.ac.kr → 生活館 → 入寮申請\n\n留学生優先入寮制度あり！\n問い合わせ: 生活館事務室 031-220-2×××\n\n定員限定 – お早めに！',
    },
    {
      keywords: ['健康', '病院', '薬', '体調', '保健'],
      response: '校内保健室\n場所: 学生会館2F\n営業: 平日 09:00 – 17:00\n\n近くの病院・薬局はキャンパスマップをご確認ください。\n緊急: 119 / 学校警備室 031-220-2000',
    },
    {
      keywords: ['ビザ', '留学生', '外国人', '国際交流'],
      response: '国際交流課\n場所: 本館2F\n営業: 平日 09:00 – 18:00\n電話: 031-220-2×××\nメール: international@suwon.ac.kr\n\nビザ・外国人登録・奨学金など全てお任せください。',
    },
  ],
  vi: [
    {
      keywords: ['thư viện', 'sách', 'mượn', 'trả', 'đọc'],
      response: 'Giờ mở cửa thư viện\nThứ 2–6: 09:00 – 22:00\nThứ 7: 09:00 – 18:00\nChủ nhật & ngày lễ: Đóng cửa\n\nMượn sách: Cần thẻ sinh viên (10 cuốn / 30 ngày)\nVị trí: Thư viện trung tâm',
    },
    {
      keywords: ['xe buýt', 'xe', 'shuttle', 'lịch', 'ga suwon'],
      response: 'Xe buýt (Trường ↔ Ga Suwon)\nThứ 2–6: 07:00 – 21:00 (30–60 phút/chuyến)\nThứ 7: 09:00, 12:00, 17:00\nChủ nhật: Không hoạt động\n\nXem giờ khởi hành tiếp theo ở trang chủ!',
    },
    {
      keywords: ['căng tin', 'ăn', 'thực đơn', 'bữa trưa', 'bữa tối'],
      response: 'Căng tin sinh viên\nGiờ mở: Thứ 2–6, 11:00 – 14:00\nGiá: ₩3.500 – ₩4.000\nVị trí: Tầng 1, Nhà sinh viên\n\nXem thực đơn hôm nay ở trang chủ!',
    },
    {
      keywords: ['máy in', 'in', 'sao chép', 'photocopy'],
      response: 'Vị trí máy in\n① Tầng 1 Thư viện trung tâm (Trắng đen & Màu)\n② Tầng 1 Nhà sinh viên\n③ Phòng hành chính các khoa\n\nGiá: Trắng đen ₩50/trang · Màu ₩200/trang\nThanh toán: Thẻ sinh viên (cần nạp tiền)',
    },
    {
      keywords: ['đăng ký', 'môn học', 'khóa học', 'lịch học', 'canvas'],
      response: 'Đăng ký môn học\n① Truy cập suwon.ac.kr → Đăng nhập cổng thông tin\n② Hệ thống học vụ → Đăng ký môn\n③ Tài liệu học tập: canvas.suwon.ac.kr\n\nXem thông báo đầu học kỳ để biết thời gian đăng ký!',
    },
    {
      keywords: ['ký túc xá', 'ký túc', 'phòng', 'nhà ở'],
      response: 'Đăng ký ký túc xá\nsuwon.ac.kr → Ký túc xá → Đăng ký\n\nSinh viên quốc tế được ưu tiên!\nLiên hệ: VP ký túc xá 031-220-2×××\n\nSố phòng có hạn – đăng ký sớm!',
    },
    {
      keywords: ['sức khỏe', 'bệnh viện', 'thuốc', 'ốm', 'y tế'],
      response: 'Trung tâm y tế trường\nVị trí: Tầng 2 Nhà sinh viên\nGiờ: Thứ 2–6, 09:00 – 17:00\n\nClinics & nhà thuốc gần đây: xem bản đồ khuôn viên.\nKhẩn cấp: 119 / Bảo vệ trường 031-220-2000',
    },
    {
      keywords: ['visa', 'nước ngoài', 'quốc tế', 'văn phòng', 'học bổng'],
      response: 'Phòng Quan hệ quốc tế\nVị trí: Tầng 2 Tòa nhà chính\nGiờ: Thứ 2–6, 09:00 – 18:00\nĐT: 031-220-2×××\nEmail: international@suwon.ac.kr\n\nXử lý visa, đăng ký người nước ngoài, học bổng & nhiều hơn nữa.',
    },
  ],
  th: [
    {
      keywords: ['ห้องสมุด', 'หนังสือ', 'ยืม', 'คืน', 'อ่าน'],
      response: 'เวลาเปิดห้องสมุด\nจ–ศ: 09:00 – 22:00\nเสาร์: 09:00 – 18:00\nอาทิตย์ & วันหยุด: ปิด\n\nยืมหนังสือ: ต้องใช้บัตรนักศึกษา (10 เล่ม / 30 วัน)\nสถานที่: ห้องสมุดกลาง',
    },
    {
      keywords: ['รถรับส่ง', 'รถบัส', 'รถ', 'ตาราง', 'สถานีซูวอน'],
      response: 'รถรับส่ง (มหาวิทยาลัย ↔ สถานีซูวอน)\nจ–ศ: 07:00 – 21:00 (ทุก 30–60 นาที)\nเสาร์: 09:00, 12:00, 17:00\nอาทิตย์: ไม่มีบริการ\n\nดูเวลาออกเดินทางครั้งถัดไปได้ที่หน้าหลัก!',
    },
    {
      keywords: ['โรงอาหาร', 'อาหาร', 'เมนู', 'กลางวัน', 'เย็น'],
      response: 'โรงอาหารนักศึกษา\nเปิด: จ–ศ 11:00 – 14:00\nราคา: ₩3,500 – ₩4,000\nสถานที่: ชั้น 1 อาคารนักศึกษา\n\nดูเมนูวันนี้ได้ที่หน้าหลัก!',
    },
    {
      keywords: ['เครื่องพิมพ์', 'พิมพ์', 'ถ่ายเอกสาร', 'ปริ้น'],
      response: 'ตำแหน่งเครื่องพิมพ์\n① ชั้น 1 ห้องสมุดกลาง (ขาวดำ & สี)\n② ชั้น 1 อาคารนักศึกษา\n③ สำนักงานธุรการของแต่ละคณะ\n\nราคา: ขาวดำ ₩50/แผ่น · สี ₩200/แผ่น\nชำระเงิน: บัตรนักศึกษา (ต้องเติมเงิน)',
    },
    {
      keywords: ['ลงทะเบียน', 'วิชา', 'หลักสูตร', 'ตารางเรียน', 'canvas'],
      response: 'การลงทะเบียนวิชา\n① เข้า suwon.ac.kr → เข้าสู่ระบบพอร์ทัล\n② ระบบวิชาการ → ลงทะเบียนวิชา\n③ เอกสารการเรียน: canvas.suwon.ac.kr\n\nตรวจสอบประกาศต้นภาคสำหรับวันที่ลงทะเบียน!',
    },
    {
      keywords: ['หอพัก', 'หอ', 'ห้อง', 'ที่พัก'],
      response: 'การสมัครหอพัก\nsuwon.ac.kr → หอพัก → สมัคร\n\nนักศึกษาต่างชาติได้รับสิทธิ์พิเศษ!\nติดต่อ: สำนักงานหอพัก 031-220-2×××\n\nที่พักมีจำกัด – สมัครเร็ว!',
    },
    {
      keywords: ['สุขภาพ', 'โรงพยาบาล', 'ยา', 'ป่วย', 'คลินิก'],
      response: 'ศูนย์สุขภาพในมหาวิทยาลัย\nสถานที่: ชั้น 2 อาคารนักศึกษา\nเวลา: จ–ศ 09:00 – 17:00\n\nคลินิกและร้านขายยาใกล้เคียง: ดูแผนที่มหาวิทยาลัย\nฉุกเฉิน: 119 / รักษาความปลอดภัย 031-220-2000',
    },
    {
      keywords: ['วีซ่า', 'ต่างชาติ', 'นานาชาติ', 'สำนักงาน', 'ทุนการศึกษา'],
      response: 'สำนักงานกิจการนานาชาติ\nสถานที่: ชั้น 2 อาคารหลัก\nเวลา: จ–ศ 09:00 – 18:00\nโทร: 031-220-2×××\nอีเมล: international@suwon.ac.kr\n\nดูแลวีซ่า การลงทะเบียนคนต่างด้าว ทุนการศึกษา และอื่นๆ',
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
