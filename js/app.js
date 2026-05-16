/* ─── App ─── */

/* Screen transitions */
const SKIP_HISTORY = ['screen-loading', 'screen-language'];

function showScreenInternal(id) {
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
  if (id === 'screen-board') renderBoardList();
  if (id === 'screen-messages') renderMessages();

  const boardScreens = ['screen-board', 'screen-post', 'screen-messages'];
}

function showScreen(id) {
  if (!SKIP_HISTORY.includes(id)) {
    history.pushState({ screen: id }, '');
  }
  showScreenInternal(id);
}

window.addEventListener('popstate', e => {
  const screen = e.state?.screen || 'screen-home';
  showScreenInternal(screen);
});

/* Header scroll shadow */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  const homeScreen = document.getElementById('screen-home');
  if (!header || !homeScreen) return;
  homeScreen.addEventListener('scroll', () => {
    header.classList.toggle('header-shadow', homeScreen.scrollTop > 4);
  });
}

/* ─── Library Data ─── */
const libraryContent = {
  ko: {
    infoTitle: '기본 정보',
    hoursLabel: '운영시간', hours: '학기중 09:30~19:00 · 방학중 09:30~17:00',
    closedLabel: '휴관일', closed: '토·일, (대체)공휴일, 개교기념일, 장서점검일',
    locLabel: '위치', loc: '학관동 (학생회관 옆)',
    phoneLabel: '전화', phone: '031-220-2393',
    borrowTitle: '도서 대출',
    borrow: [
      '대출/반납: 3층 대출·반납 창구 (무인 반납함 24시간 운영)',
      '학생증 또는 모바일 이용증 지참 필수 — 대리 대출 불가',
      '대출 한도: 학부생 7권/10일 · 대학원생 10권/30일 · 평생교육원 2권/7일',
      '연장: 반납예정일 이전 1회 가능 → 홈페이지 My Library에서 직접 신청',
      '연체료: 1일 1책당 100원 (토·일·공휴일 포함) — 연체 시 대출·증명서 발급 중지',
      '예약: 전권 대출 중일 때 최대 2책 예약 가능 (홈페이지 소장 검색 → 예약하기)',
      '참고도서·연속간행물·학위논문 등은 관외대출 불가, 관내 열람·복사만 가능',
    ],
    studyTitle: '컨퍼런스 스터디룸 예약',
    studyBadge: '무료',
    study: [
      '도서관 홈페이지(lib.suwon.ac.kr) 로그인 → 시설예약 → 컨퍼런스룸',
      '재학생 누구나 예약 가능 (포털 아이디/비밀번호로 로그인)',
      '원하는 날짜·시간대·룸 선택 후 예약 완료',
      '이용 당일 학생증 또는 예약 확인서 지참 후 입실',
      '사용 후 책상·의자 원위치, 쓰레기 수거 등 정리 필수',
      '노쇼(무단 취소 없이 불참) 반복 시 이용 제한될 수 있음',
    ],
    readingTitle: '열람실 이용',
    readingBadge: '무료',
    reading: [
      '별도 신청 없이 자유 이용 가능 (무료)',
      '음식물·음료 반입 금지 (음수대 비치)',
      '노트북·개인 학습 자료 지참 가능',
      '취침 및 과도한 소음 금지',
      '소지품으로 자리 장기 점유 금지',
    ],
  },
  en: {
    infoTitle: 'Basic Info',
    hoursLabel: 'Hours', hours: 'Semester 09:30~19:00 · Vacation 09:30~17:00',
    closedLabel: 'Closed', closed: 'Sat·Sun, public holidays, Foundation Day, inventory days',
    locLabel: 'Location', loc: 'Hakgwan Bldg (next to Student Hall)',
    phoneLabel: 'Phone', phone: '031-220-2393',
    borrowTitle: 'Book Borrowing',
    borrow: [
      'Borrow & return at 3F counter (24-hr drop box also available)',
      'Student ID or mobile library card required — no proxy borrowing',
      'Limit: Undergrad 7 books/10 days · Grad 10/30 days · Lifelong Edu. 2/7 days',
      'Renewal: once before due date → via My Library on the website',
      'Overdue fee: ₩100/book/day (incl. weekends & holidays) — borrowing & certificate issuance suspended',
      'Reservation: reserve up to 2 books when all copies are out (website search → Reserve)',
      'Reference books, journals & theses: in-library use only, cannot be taken out',
    ],
    studyTitle: 'Conference Study Room',
    studyBadge: 'Free',
    study: [
      'Login at lib.suwon.ac.kr → Facility Booking → Conference Room',
      'Open to all enrolled students (portal ID & password)',
      'Select date, time slot, and room, then confirm',
      'Bring student ID or booking confirmation on the day',
      'Tidy up after use — return chairs, remove trash',
      'Repeated no-shows may result in booking restrictions',
    ],
    readingTitle: 'Reading Room',
    readingBadge: 'Free',
    reading: [
      'Free walk-in — no reservation needed',
      'No food or drinks allowed (water fountains available)',
      'Laptops and personal study materials OK',
      'No sleeping or excessive noise',
      'Do not reserve seats with belongings for extended periods',
    ],
  },
  zh: {
    infoTitle: '基本信息',
    hoursLabel: '开放时间', hours: '学期中 09:30~19:00 · 假期 09:30~17:00',
    closedLabel: '休馆', closed: '周六·周日、（替代）公休日、建校纪念日、藏书清点日',
    locLabel: '位置', loc: '学馆栋（学生会馆旁）',
    phoneLabel: '电话', phone: '031-220-2393',
    borrowTitle: '图书借阅',
    borrow: [
      '借还书：3楼借还书窗口（24小时无人还书箱亦可）',
      '需持学生证或移动借书证 — 禁止代借',
      '限额：本科生7册/10天 · 研究生10册/30天 · 平生教育院2册/7天',
      '续借：到期日前可续借1次 → 官网 My Library 自助办理',
      '逾期费：每册每天100韩元（含周末·节假日）— 逾期期间暂停借阅及证明书申请',
      '预约：所有馆藏均借出时可预约最多2册（官网搜索 → 预约）',
      '参考书·期刊·学位论文等仅限馆内阅览，不可外借',
    ],
    studyTitle: '会议研讨室预约',
    studyBadge: '免费',
    study: [
      '登录 lib.suwon.ac.kr → 设施预约 → 会议室',
      '在校学生均可预约（使用门户账号登录）',
      '选择日期、时段、房间后确认预约',
      '当日携带学生证或预约确认单入室',
      '使用后需整理桌椅、清理垃圾',
      '多次无故爽约将被限制使用',
    ],
    readingTitle: '阅览室使用',
    readingBadge: '免费',
    reading: [
      '免费自由使用，无需申请',
      '禁止携带食物和饮料（设有饮水机）',
      '可携带笔记本电脑及个人学习资料',
      '禁止睡觉及大声喧哗',
      '禁止长时间用物品占座',
    ],
  },
  ja: {
    infoTitle: '基本情報',
    hoursLabel: '開館時間', hours: '学期中 09:30~19:00 · 休暇中 09:30~17:00',
    closedLabel: '休館', closed: '土·日、（代替）祝日、開校記念日、蔵書点検日',
    locLabel: '場所', loc: '学館棟（学生会館の隣）',
    phoneLabel: '電話', phone: '031-220-2393',
    borrowTitle: '図書貸出',
    borrow: [
      '貸出·返却：3F窓口（24時間無人返却ボックスも利用可）',
      '学生証またはモバイル利用証必携 — 代理貸出不可',
      '貸出限度：学部生7冊/10日 · 大学院生10冊/30日 · 生涯教育院2冊/7日',
      '延長：返却予定日前に1回可 → HPのMy Libraryで直接申請',
      '延滞料：1冊1日100ウォン（土·日·祝日含む）— 延滞中は貸出·証明書発行停止',
      '予約：全冊貸出中の場合、最大2冊予約可（HP検索 → 予約ボタン）',
      '参考書·雑誌·学位論文等は館外貸出不可、館内閲覧·複写のみ',
    ],
    studyTitle: 'カンファレンス スタディルーム予約',
    studyBadge: '無料',
    study: [
      'lib.suwon.ac.kr にログイン → 施設予約 → カンファレンスルーム',
      '在学生なら誰でも予約可（ポータルID・パスワードで）',
      '希望の日付・時間帯・部屋を選んで予約完了',
      '当日は学生証または予約確認書を持参して入室',
      '使用後は机・椅子を元に戻し、ゴミは持ち帰る',
      'ノーショウ（無断不参加）を繰り返すと利用制限あり',
    ],
    readingTitle: '閲覧室利用',
    readingBadge: '無料',
    reading: [
      '無料·申請不要で自由に利用可',
      '飲食物の持ち込み禁止（給水機あり）',
      'ノートPC·個人学習資料の持込可',
      '睡眠・過度な騒音禁止',
      '持ち物による長時間の席取り禁止',
    ],
  },
  vi: {
    infoTitle: 'Thông tin cơ bản',
    hoursLabel: 'Giờ mở cửa', hours: 'Học kỳ 09:30~19:00 · Nghỉ hè 09:30~17:00',
    closedLabel: 'Đóng cửa', closed: 'T7·CN, ngày lễ (bù), ngày kỷ niệm, ngày kiểm kê',
    locLabel: 'Địa điểm', loc: 'Tòa Hakgwan (cạnh Nhà SV)',
    phoneLabel: 'Điện thoại', phone: '031-220-2393',
    borrowTitle: 'Mượn sách',
    borrow: [
      'Mượn & trả tại quầy tầng 3 (hộp trả 24/7 cũng có sẵn)',
      'Cần thẻ SV hoặc thẻ thư viện di động — không được mượn thay',
      'Hạn mức: ĐH 7 cuốn/10 ngày · Sau ĐH 10/30 ngày · Giáo dục TT 2/7 ngày',
      'Gia hạn: 1 lần trước ngày đến hạn → My Library trên website',
      'Phí trễ hạn: ₩100/cuốn/ngày (kể cả T7, CN, ngày lễ) — trễ hạn sẽ bị khóa mượn & cấp giấy tờ',
      'Đặt trước: khi hết sách có thể đặt tối đa 2 cuốn (tìm kiếm → Đặt trước)',
      'Sách tham khảo, tạp chí, luận văn: chỉ đọc trong thư viện, không mượn ngoài',
    ],
    studyTitle: 'Phòng học nhóm (Conference)',
    studyBadge: 'Miễn phí',
    study: [
      'Đăng nhập lib.suwon.ac.kr → Đặt cơ sở → Phòng hội thảo',
      'Sinh viên đang học đều được đặt (dùng tài khoản cổng thông tin)',
      'Chọn ngày, khung giờ, phòng rồi xác nhận',
      'Mang thẻ SV hoặc xác nhận đặt chỗ vào ngày sử dụng',
      'Dọn dẹp sau khi dùng — trả ghế, dọn rác',
      'Đặt rồi không đến nhiều lần có thể bị hạn chế',
    ],
    readingTitle: 'Phòng đọc sách',
    readingBadge: 'Miễn phí',
    reading: [
      'Miễn phí, không cần đăng ký',
      'Không mang đồ ăn/uống vào (có máy nước)',
      'Được mang laptop và tài liệu cá nhân',
      'Không ngủ hoặc gây ồn',
      'Không giữ chỗ lâu bằng đồ vật',
    ],
  },
  th: {
    infoTitle: 'ข้อมูลทั่วไป',
    hoursLabel: 'เวลาทำการ', hours: 'ภาคเรียน 09:30~19:00 · ปิดภาค 09:30~17:00',
    closedLabel: 'ปิดทำการ', closed: 'เสาร์·อาทิตย์, วันหยุดนักขัตฤกษ์, วันก่อตั้ง, วันตรวจนับหนังสือ',
    locLabel: 'ที่ตั้ง', loc: 'อาคารฮักกวาน (ข้างอาคารนักศึกษา)',
    phoneLabel: 'โทรศัพท์', phone: '031-220-2393',
    borrowTitle: 'การยืมหนังสือ',
    borrow: [
      'ยืม-คืนที่เคาน์เตอร์ชั้น 3 (ตู้คืนอัตโนมัติ 24 ชม. ก็ได้)',
      'ต้องใช้บัตรนักศึกษาหรือบัตรห้องสมุดมือถือ — ยืมแทนไม่ได้',
      'จำกัด: ป.ตรี 7 เล่ม/10 วัน · บัณฑิต 10/30 วัน · การศึกษาตลอดชีวิต 2/7 วัน',
      'ต่ออายุ: 1 ครั้งก่อนวันครบกำหนด → My Library บนเว็บไซต์',
      'ค่าปรับเกินกำหนด: ₩100/เล่ม/วัน (รวมเสาร์-อาทิตย์-วันหยุด) — ระงับการยืมและออกเอกสาร',
      'จอง: จองได้สูงสุด 2 เล่มเมื่อสำเนาทั้งหมดถูกยืมออก (ค้นหา → จอง)',
      'หนังสืออ้างอิง วารสาร วิทยานิพนธ์: อ่านในห้องสมุดเท่านั้น ยืมออกไม่ได้',
    ],
    studyTitle: 'จองห้องคอนเฟอเรนซ์',
    studyBadge: 'ฟรี',
    study: [
      'Login ที่ lib.suwon.ac.kr → จองสิ่งอำนวยความสะดวก → ห้องประชุม',
      'นักศึกษาทุกคนจองได้ (ใช้รหัสพอร์ทัล)',
      'เลือกวัน เวลา และห้อง แล้วยืนยัน',
      'วันใช้งานนำบัตรนักศึกษาหรือใบยืนยันการจอง',
      'หลังใช้ต้องจัดโต๊ะ-เก้าอี้คืนและเก็บขยะ',
      'ไม่มาโดยไม่แจ้งบ่อยๆ อาจถูกจำกัดสิทธิ์',
    ],
    readingTitle: 'ห้องอ่านหนังสือ',
    readingBadge: 'ฟรี',
    reading: [
      'ฟรี เข้าได้เลย ไม่ต้องสมัคร',
      'ห้ามนำอาหาร/เครื่องดื่มเข้า (มีน้ำดื่ม)',
      'นำแล็ปท็อปและเอกสารส่วนตัวได้',
      'ห้ามนอนหรือส่งเสียงดัง',
      'ห้ามจองที่นั่งด้วยสิ่งของเป็นเวลานาน',
    ],
  },
};

/* ─── School Info Data ─── */
const facilityList = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    ko: { name: '중앙도서관', loc: '학관동 (학생회관 옆)', hours: '학기중 09:30~19:00 · 방학중 09:30~17:00', closed: '토·일·공휴일 휴관', extra: '대출: 학생증 · 학부생 7권', phone: '031-220-2393' },
    en: { name: 'Central Library', loc: 'Hakgwan Bldg (next to Student Hall)', hours: 'Semester 09:30~19:00 · Vacation 09:30~17:00', closed: 'Closed Sat, Sun & holidays', extra: 'Borrow: Student ID · Undergrad 7 books', phone: '031-220-2393' },
    zh: { name: '中央图书馆', loc: '学馆栋（学生会馆旁）', hours: '学期中 09:30~19:00 · 假期 09:30~17:00', closed: '周六·周日·节假日休馆', extra: '借书: 学生证 · 本科生7册', phone: '031-220-2393' },
    ja: { name: '中央図書館', loc: '学館棟（学生会館の隣）', hours: '学期中 09:30~19:00 · 休暇中 09:30~17:00', closed: '土·日·祝日休館', extra: '貸出: 学生証 · 学部生7冊', phone: '031-220-2393' },
    vi: { name: 'Thư viện Trung tâm', loc: 'Tòa Hakgwan (cạnh Nhà SV)', hours: 'Học kỳ 09:30~19:00 · Nghỉ hè 09:30~17:00', closed: 'Đóng T7, CN & ngày lễ', extra: 'Mượn: Thẻ SV · ĐH 7 cuốn', phone: '031-220-2393' },
    th: { name: 'ห้องสมุดกลาง', loc: 'อาคารฮักกวาน (ข้างอาคารนักศึกษา)', hours: 'ภาคเรียน 09:30~19:00 · ปิดภาค 09:30~17:00', closed: 'ปิดเสาร์ อาทิตย์ & วันหยุด', extra: 'ยืม: บัตรนักศึกษา · ป.ตรี 7 เล่ม', phone: '031-220-2393' },
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
    ko: { name: '기숙사', loc: '캠퍼스 내', hours: null, closed: null, extra: '외국인 유학생 우선 배정', phone: '031-220-8203' },
    en: { name: 'Dormitory', loc: 'On Campus', hours: null, closed: null, extra: 'International students have priority', phone: '031-220-8203' },
    zh: { name: '宿舍', loc: '校园内', hours: null, closed: null, extra: '留学生优先分配', phone: '031-220-8203' },
    ja: { name: '寮', loc: 'キャンパス内', hours: null, closed: null, extra: '留学生優先入寮', phone: '031-220-8203' },
    vi: { name: 'Ký túc xá', loc: 'Trong khuôn viên', hours: null, closed: null, extra: 'Ưu tiên sinh viên quốc tế', phone: '031-220-8203' },
    th: { name: 'หอพัก', loc: 'ในมหาวิทยาลัย', hours: null, closed: null, extra: 'นักศึกษาต่างชาติได้รับสิทธิ์พิเศษ', phone: '031-220-8203' },
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
  initFaqAccordion();
  updateNavLangButtons(lang);
  const activeTab = document.querySelector('.caf-day-tab.active');
  if (activeTab) renderCafeteriaDay(parseInt(activeTab.dataset.day));
  renderLibrary();
  renderSchoolFacilities();
  renderSchoolDepts();
  renderSchoolPhones();
  renderCampusBuildingList();
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
  const heroEl = document.getElementById('heroMenuItems');
  if (!heroEl) return;

  if (!menu || !menu.items || menu.items.length === 0) {
    heroEl.innerHTML = `<div class="hero-menu-empty-text">${t('menu_none')}</div>`;
    return;
  }

  const lang = window.currentLang || 'ko';
  heroEl.innerHTML = menu.items.map(item => {
    const ko = item.ko || item;
    if (lang === 'ko' || typeof item === 'string') {
      return `<div class="hero-menu-item">${ko}</div>`;
    }
    const translated = item[lang];
    if (!translated || translated === ko) {
      return `<div class="hero-menu-item">${ko}</div>`;
    }
    return `<div class="hero-menu-item">${translated} <span class="hero-menu-item-ko">(${ko})</span></div>`;
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

/* Notices vertical list */
async function updateNotices() {
  const container = document.getElementById('noticesScroll');
  if (!container) return;
  const lang = window.currentLang;

  container.innerHTML = `<div class="board-loading" style="padding:16px;text-align:center;font-size:0.85rem;color:var(--text-3);">불러오는 중...</div>`;

  try {
    const { data, error } = await sb
      .from('notices')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    const titleKey = `title_${lang}`;
    container.innerHTML = '';
    (data || []).forEach(notice => {
      const title = notice[titleKey] || notice.title_ko;
      const date = notice.published_at ? notice.published_at.slice(0, 10).replace(/-/g, '.') : '';
      const item = document.createElement('a');
      item.className = 'notice-item';
      item.href = notice.url;
      item.target = '_blank';
      item.rel = 'noopener';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <div class="notice-item-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div class="notice-item-body">
          <div class="notice-item-title">${escHtml(title)}</div>
        </div>
        <span class="notice-item-date">${date}</span>
      `;
      container.appendChild(item);
    });

    if (!data || data.length === 0) {
      container.innerHTML = `<div class="board-empty" style="padding:16px;">공지사항이 없습니다.</div>`;
    }
  } catch {
    // DB 실패 시 하드코딩 데이터로 폴백
    container.innerHTML = '';
    notices.forEach(notice => {
      const n = notice[lang] || notice.ko;
      const item = document.createElement('div');
      item.className = 'notice-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <div class="notice-item-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div class="notice-item-body">
          <div class="notice-item-category">${n.category}</div>
          <div class="notice-item-title">${n.title}</div>
        </div>
        <span class="notice-item-date">${n.date}</span>
      `;
      container.appendChild(item);
    });
  }
}

/* Hamburger Nav */
function closeNav() {
  const navOverlay = document.getElementById('navOverlay');
  if (!navOverlay) return;
  navOverlay.classList.remove('nav-open');
  document.body.style.overflow = '';
  document.querySelectorAll('.nav-sub-menu').forEach(m => m.classList.add('hidden'));
  document.querySelectorAll('.nav-sub-arrow').forEach(a => a.classList.remove('nav-sub-arrow-open'));
  setTimeout(() => navOverlay.classList.add('hidden'), 350);
}

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

  hamburgerBtn?.addEventListener('click', openNav);
  navCloseBtn?.addEventListener('click', closeNav);
  navOverlayBg?.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-menu-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      if (item.classList.contains('nav-has-sub')) {
        const subId = item.id === 'shuttleNavItem' ? 'shuttleSubMenu' : 'schoolSubMenu';
        const subMenu = document.getElementById(subId);
        const arrow = item.querySelector('.nav-sub-arrow');
        // close other open submenus
        document.querySelectorAll('.nav-sub-menu').forEach(m => { if (m.id !== subId) m.classList.add('hidden'); });
        document.querySelectorAll('.nav-sub-arrow').forEach(a => { if (a !== arrow) a.classList.remove('nav-sub-arrow-open'); });
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
      if (sub.dataset.schoolPane) {
        const pane = sub.dataset.schoolPane;
        closeNav();
        setTimeout(() => openSchoolPane(pane), 360);
      } else if (sub.dataset.shuttleSection) {
        const section = sub.dataset.shuttleSection;
        closeNav();
        setTimeout(() => openShuttleSection(section), 360);
      }
    });
  });
}

function switchShuttleTab(pane) {
  document.querySelectorAll('.shuttle-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.pane === pane);
  });
  document.querySelectorAll('.shuttle-tab-pane').forEach(p => {
    p.classList.toggle('hidden', p.id !== pane);
  });
}

function openShuttleSection(pane) {
  showScreen('screen-shuttle');
  switchShuttleTab(pane);
}

function initShuttleScreen() {
  document.getElementById('shuttleBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  /* hero shuttle pill → shuttle screen */
  document.querySelector('.hero-shuttle-pill')?.addEventListener('click', () => showScreen('screen-shuttle'));
  /* hero menu bar → cafeteria screen */
  document.getElementById('heroMenuBar')?.addEventListener('click', openCafeteriaScreen);
  const shuttleRow = document.querySelector('.hero-shuttle-row');
  if (shuttleRow) {
    shuttleRow.style.cursor = 'pointer';
    shuttleRow.addEventListener('click', () => showScreen('screen-shuttle'));
  }
  document.querySelectorAll('.shuttle-tab').forEach(tab => {
    tab.addEventListener('click', () => switchShuttleTab(tab.dataset.pane));
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

/* Library Screen */
function renderLibrary() {
  const lang = window.currentLang || 'ko';
  const d = libraryContent[lang] || libraryContent.ko;
  const container = document.getElementById('libScreenBody');
  if (!container) return;

  const guideItem = (text) => `<div class="lib-guide-item"><span class="lib-guide-dot">·</span><span>${text}</span></div>`;

  container.innerHTML = `
    <div class="lib-section">
      <div class="lib-section-title">${d.infoTitle}</div>
      <div class="lib-info-table">
        <div class="lib-info-row"><span class="lib-info-label">${d.hoursLabel}</span><span class="lib-info-value">${d.hours}</span></div>
        <div class="lib-info-row"><span class="lib-info-label">${d.closedLabel}</span><span class="lib-info-value lib-info-closed">${d.closed}</span></div>
        <div class="lib-info-row"><span class="lib-info-label">${d.locLabel}</span><span class="lib-info-value">${d.loc}</span></div>
        <div class="lib-info-row"><span class="lib-info-label">${d.phoneLabel}</span><span class="lib-info-value"><a href="tel:${d.phone}" class="lib-phone-link">${d.phone}</a></span></div>
      </div>
    </div>

    <div class="lib-section">
      <div class="lib-section-title">${d.borrowTitle}</div>
      <div class="lib-guide-list">${d.borrow.map(guideItem).join('')}</div>
    </div>

    <div class="lib-section">
      <div class="lib-section-header">
        <div class="lib-section-title">${d.studyTitle}</div>
        <span class="lib-free-badge">${d.studyBadge}</span>
      </div>
      <div class="lib-guide-list">${d.study.map(guideItem).join('')}</div>
    </div>

    <div class="lib-section">
      <div class="lib-section-header">
        <div class="lib-section-title">${d.readingTitle}</div>
        <span class="lib-free-badge">${d.readingBadge}</span>
      </div>
      <div class="lib-guide-list">${d.reading.map(guideItem).join('')}</div>
    </div>
  `;
}

function initLibraryScreen() {
  document.getElementById('libBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  renderLibrary();
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

/* ─── Phone Directory Data ─── */
const phoneDirectory = [
  {
    groupKey: 'phone_group_intl',
    entries: [
      { name: '외국인유학생지원센터', phone: '031-229-8186' },
      { name: '국제협력처 국제협력과', phone: '031-220-2562' },
      { name: '국제어학원', phone: '031-220-2401' },
      { name: '한국어·문화 교육원', phone: '031-229-8270' },
    ]
  },
  {
    groupKey: 'phone_group_admin',
    entries: [
      { name: '교무처 교무과', phone: '031-220-2352' },
      { name: '학적과', phone: '031-220-2342' },
      { name: '학생지원처', phone: '031-220-2414' },
      { name: '취업지원처', phone: '031-220-2413' },
      { name: '입학처', phone: '031-229-8420' },
      { name: '비서실', phone: '031-220-2201' },
      { name: '대외협력처', phone: '031-229-8299' },
    ]
  },
  {
    groupKey: 'phone_group_campus',
    entries: [
      { name: '중앙도서관', phone: '031-220-2393' },
      { name: '보건실', phone: '031-220-2416' },
      { name: '기숙사', phone: '031-220-8203' },
      { name: '학생생활상담연구소', phone: '031-220-2415' },
      { name: '장애학생지원센터', phone: '031-229-8394' },
      { name: '인권센터', phone: '031-220-2382' },
      { name: '사회봉사센터', phone: '031-229-8429' },
      { name: '정보전산원', phone: '031-220-2278' },
      { name: '방송국', phone: '031-220-2400' },
      { name: '환경안전원', phone: '031-229-8471' },
    ]
  },
  {
    groupKey: 'phone_group_college',
    entries: [
      { name: '인성교양대학', phone: '031-229-8489' },
      { name: '인문사회융합대학 국어국문학', phone: '031-220-2502' },
      { name: '인문사회융합대학 영어영문학', phone: '031-220-2503' },
      { name: '인문사회융합대학 중어중문학', phone: '031-220-2506' },
      { name: '인문사회융합대학 일어일문학', phone: '031-220-2507' },
      { name: '인문사회융합대학 법학', phone: '031-220-2508' },
      { name: '인문사회융합대학 행정학', phone: '031-220-2509' },
      { name: '경영공학대학 경제금융', phone: '031-220-2511' },
      { name: '경영공학대학 경영학', phone: '031-220-2512' },
      { name: '경영공학대학 글로벌비즈니스', phone: '031-220-2514' },
      { name: '경영공학대학 호텔관광', phone: '031-220-2617' },
      { name: '혁신공과대학 건축학', phone: '031-220-2523' },
      { name: '혁신공과대학 기계공학', phone: '031-220-2527' },
      { name: '혁신공과대학 전기공학', phone: '031-220-2530' },
      { name: '혁신공과대학 전자공학', phone: '031-220-2531' },
      { name: '지능형SW융합대학 컴퓨터SW', phone: '031-220-2516' },
      { name: '지능형SW융합대학 정보통신', phone: '031-220-2532' },
      { name: '라이프케어사이언스대학 간호학', phone: '031-229-8304' },
      { name: '라이프케어사이언스대학 식품영양', phone: '031-220-2536' },
      { name: '디자인앤아트대학 커뮤니케이션디자인', phone: '031-220-2309' },
      { name: '음악테크놀로지대학 피아노', phone: '031-220-2578' },
      { name: '글로벌인재대학 자유전공', phone: '031-220-2633' },
      { name: '대학원 교학과', phone: '031-220-2251' },
    ]
  },
  {
    groupKey: 'phone_group_etc',
    entries: [
      { name: '창업지원단', phone: '031-229-8714' },
      { name: '미래융합교육원', phone: '031-220-2275' },
      { name: '고운학원 출판부', phone: '031-229-8334' },
      { name: '박물관', phone: '031-220-2341' },
      { name: '고운미술관', phone: '031-220-2158' },
    ]
  }
];

function renderSchoolPhones() {
  const container = document.getElementById('schoolPhones');
  if (!container) return;
  container.innerHTML = phoneDirectory.map(group => `
    <div class="phone-group">
      <div class="phone-group-title">${t(group.groupKey)}</div>
      ${group.entries.map(e => `
        <a href="tel:${e.phone}" class="phone-entry">
          <span class="phone-entry-name">${e.name}</span>
          <span class="phone-entry-num">${e.phone}</span>
        </a>`).join('')}
    </div>`).join('');
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
  renderSchoolPhones();
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
  document.querySelectorAll('.splash-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      sessionStorage.setItem('lang_splash_shown', '1');
      const splash = document.getElementById('screen-language');
      splash?.classList.add('splash-out');
      setTimeout(() => {
        showScreen('screen-home');
        initFaqAccordion();
        initScrollReveal();
      }, 480);
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


/* Contact */
function initContact() {
  document.getElementById('contactBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
}

/* Nearby */
function initNearby() {
  document.getElementById('nearbyBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
}

/* Auto-update shuttle every minute */
function updateCampusChips() {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  document.querySelectorAll('.shuttle-times-grid .shuttle-time-chip').forEach(chip => {
    const [h, m] = chip.textContent.trim().split(':').map(Number);
    chip.classList.toggle('chip-past', cur > h * 60 + m);
  });
}

function startShuttleTimer() {
  setInterval(() => { updateHomeData(); updateCampusChips(); }, 60000);
}

/* Loading → Home (language splash removed) */
function initLoading() {
  const splashShown = sessionStorage.getItem('lang_splash_shown');
  setTimeout(() => {
    if (splashShown) {
      showScreen('screen-home');
      initFaqAccordion();
      initScrollReveal();
    } else {
      showScreen('screen-language');
    }
  }, 1800);
}

/* ─── Auth Modals ─── */
function openModal(id) {
  document.getElementById(id)?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
  document.body.style.overflow = '';
}

function initAuthModals() {
  /* open buttons */
  document.querySelector('.btn-login')?.addEventListener('click', () => { closeNav(); openModal('loginModal'); });
  document.querySelector('.btn-signup')?.addEventListener('click', () => { closeNav(); openModal('signupModal'); });
  document.getElementById('logoutBtn')?.addEventListener('click', async () => { await authLogout(); closeNav(); });

  /* close via bg click or ✕ button */
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => closeModal(el.dataset.close));
  });

  /* switch between modals */
  document.getElementById('goToSignup')?.addEventListener('click', () => { closeModal('loginModal'); openModal('signupModal'); });
  document.getElementById('goToLogin')?.addEventListener('click', () => { closeModal('signupModal'); openModal('loginModal'); });

  /* ESC */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal('loginModal'); closeModal('signupModal'); }
  });

  /* login form */
  document.getElementById('loginForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pw = document.getElementById('loginPassword').value;
    const errEl = document.getElementById('loginError');
    const btn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!email || !pw) { errEl.textContent = '이메일과 비밀번호를 입력해주세요.'; errEl.classList.remove('hidden'); return; }
    btn.disabled = true; btn.textContent = '로그인 중...';
    try {
      await authLogin(email, pw);
      closeModal('loginModal');
      e.target.reset();
    } catch (err) {
      errEl.textContent = err.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : err.message;
      errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false; btn.textContent = '로그인';
    }
  });

  /* signup form */
  document.getElementById('signupForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pw = document.getElementById('signupPassword').value;
    const pw2 = document.getElementById('signupPasswordConfirm').value;
    const errEl = document.getElementById('signupError');
    const btn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!name || !email || !pw) { errEl.textContent = '모든 항목을 입력해주세요.'; errEl.classList.remove('hidden'); return; }
    if (pw !== pw2) { errEl.textContent = '비밀번호가 일치하지 않습니다.'; errEl.classList.remove('hidden'); return; }
    if (pw.length < 8) { errEl.textContent = '비밀번호는 8자 이상이어야 합니다.'; errEl.classList.remove('hidden'); return; }
    btn.disabled = true; btn.textContent = '가입 중...';
    try {
      await authSignup(name, email, pw);
      closeModal('signupModal');
      e.target.reset();
      alert('회원가입이 완료되었습니다.');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false; btn.textContent = '회원가입';
    }
  });

  /* auth state → UI 반영 */
  onAuthStateChange(user => updateAuthUI(user));
}

function updateAuthUI(user) {
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');
  const logoutBtn = document.getElementById('logoutBtn');
  const userLabel = document.getElementById('navUserLabel');
  const msgNavItem = document.getElementById('msgNavItem');

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = '';
    if (userLabel) { userLabel.style.display = ''; userLabel.textContent = user.user_metadata?.name || user.email; }
    if (msgNavItem) msgNavItem.style.display = '';
  } else {
    if (loginBtn) loginBtn.style.display = '';
    if (signupBtn) signupBtn.style.display = '';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (userLabel) userLabel.style.display = 'none';
    if (msgNavItem) msgNavItem.style.display = 'none';
  }
}

/* ─── Translation ─── */
const translationCache = {};
async function translateText(text, targetLang) {
  if (!text || targetLang === 'ko') return text;
  const langMap = { en: 'en', zh: 'zh-CN', ja: 'ja', vi: 'vi', th: 'th' };
  const tl = langMap[targetLang];
  if (!tl) return text;
  const key = `${tl}||${text}`;
  if (translationCache[key]) return translationCache[key];
  try {
    const resp = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${tl}`
    );
    const json = await resp.json();
    const result = json?.responseData?.translatedText || text;
    translationCache[key] = result;
    return result;
  } catch {
    return text;
  }
}

/* ─── Board ─── */
let currentPost = null;

async function renderBoardList() {
  const list = document.getElementById('boardList');
  if (!list) return;
  list.innerHTML = `<div class="board-loading">${t('board_loading')}</div>`;
  try {
    const posts = await fetchPosts();
    if (posts.length === 0) {
      list.innerHTML = `<div class="board-empty">${t('board_empty')}</div>`;
      return;
    }

    const paintList = (titles, previews) => {
      list.innerHTML = posts.map((p, i) => `
        <div class="board-post-card" data-id="${p.id}">
          <div class="bpc-title">${escHtml(titles[i])}</div>
          <div class="bpc-preview">${escHtml(previews[i])}</div>
          <div class="bpc-meta">
            <span class="bpc-anon">${t('board_anon')}</span>
            <span class="bpc-dot">·</span>
            <span class="bpc-time">${timeAgo(p.created_at)}</span>
            <span class="bpc-likes">❤ ${p.likes}</span>
          </div>
        </div>
      `).join('');
      list.querySelectorAll('.board-post-card').forEach(card => {
        card.addEventListener('click', () => openPostDetail(card.dataset.id));
      });
    };

    const rawTitles = posts.map(p => p.title);
    const rawPreviews = posts.map(p => p.content);
    paintList(rawTitles, rawPreviews);

    const lang = window.currentLang;
    if (lang !== 'ko') {
      const [transTitles, transPreviews] = await Promise.all([
        Promise.all(rawTitles.map(s => translateText(s, lang))),
        Promise.all(rawPreviews.map(s => translateText(s, lang))),
      ]);

      let showingTrans = true;

      const repaint = () => {
        const titles   = showingTrans ? transTitles   : rawTitles;
        const previews = showingTrans ? transPreviews : rawPreviews;
        list.innerHTML = `
          <div class="board-trans-bar">
            <button class="board-trans-toggle-btn" id="boardTransToggleBtn">
              ${showingTrans ? t('board_show_original') : t('board_show_translated')}
            </button>
          </div>
        ` + posts.map((p, i) => `
          <div class="board-post-card" data-id="${p.id}">
            <div class="bpc-title">${escHtml(titles[i])}</div>
            <div class="bpc-preview">${escHtml(previews[i])}</div>
            <div class="bpc-meta">
              <span class="bpc-anon">${t('board_anon')}</span>
              <span class="bpc-dot">·</span>
              <span class="bpc-time">${timeAgo(p.created_at)}</span>
              <span class="bpc-likes">❤ ${p.likes}</span>
            </div>
          </div>
        `).join('');
        document.getElementById('boardTransToggleBtn')?.addEventListener('click', () => {
          showingTrans = !showingTrans;
          repaint();
        });
        list.querySelectorAll('.board-post-card').forEach(card => {
          card.addEventListener('click', () => openPostDetail(card.dataset.id));
        });
      };

      repaint();
    }
  } catch (e) {
    list.innerHTML = `<div class="board-empty">불러오기 실패: ${e.message}</div>`;
  }
}

async function openPostDetail(id) {
  showScreen('screen-post');
  const contentArea = document.getElementById('postContentArea');
  const commentsArea = document.getElementById('postCommentsArea');
  contentArea.innerHTML = `<div class="board-loading">${t('board_loading')}</div>`;
  commentsArea.innerHTML = '';
  try {
    const post = await fetchPost(id);
    currentPost = post;
    const user = await getUser();
    const msgBtn = document.getElementById('postMsgBtn');
    if (user && post.user_id && user.id !== post.user_id) {
      msgBtn?.classList.remove('hidden');
    } else {
      msgBtn?.classList.add('hidden');
    }
    const isOwner = user && post.user_id && user.id === post.user_id;
    const alreadyLiked = await hasLikedPost(post.id);
    const likeBtnClass = 'post-like-btn' + (alreadyLiked ? ' liked' : '');
    contentArea.innerHTML = `
      <div class="post-detail-inner">
        <div class="post-meta-row">${t('board_anon')} · ${timeAgo(post.created_at)}</div>
        <h2 class="post-detail-title">${escHtml(post.title)}</h2>
        <div class="post-detail-body">${escHtml(post.content).replace(/\n/g, '<br>')}</div>
        <div class="post-actions-row">
          <button class="${likeBtnClass}" id="postLikeBtn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span id="postLikeCount">${post.likes}</span>
          </button>
          ${isOwner ? `
          <button class="post-edit-btn" id="postEditBtn">${t('board_edit')}</button>
          <button class="post-delete-btn" id="postDeleteBtn">${t('board_delete')}</button>
          ` : ''}
        </div>
      </div>
      <div class="post-comments-header">${t('board_comments')}</div>
    `;
    document.getElementById('postLikeBtn')?.addEventListener('click', async () => {
      try {
        const result = await toggleLikePost(post.id, post.likes);
        post.likes = result.likes;
        const el = document.getElementById('postLikeCount');
        if (el) el.textContent = post.likes;
        const btn = document.getElementById('postLikeBtn');
        if (btn) btn.classList.toggle('liked', result.liked);
      } catch (e) {
        if (e.message === 'login_required') {
          alert(t('like_login_required') || '로그인 후 좋아요를 누를 수 있습니다.');
        } else {
          alert(e.message);
        }
      }
    });

    document.getElementById('postEditBtn')?.addEventListener('click', () => openEditModal(post));

    document.getElementById('postDeleteBtn')?.addEventListener('click', async () => {
      if (!confirm(t('board_confirm_delete_post'))) return;
      try {
        await deletePost(post.id);
        showScreen('screen-board');
      } catch (e) { alert(e.message); }
    });

    await renderComments(id);

    /* Auto-translate post if non-Korean */
    const lang = window.currentLang;
    if (lang !== 'ko') {
      const inner = contentArea.querySelector('.post-detail-inner');
      const badge = document.createElement('div');
      badge.className = 'board-trans-badge';
      badge.textContent = t('board_translating');
      inner?.prepend(badge);
      try {
        const [transTitle, transBody] = await Promise.all([
          translateText(post.title, lang),
          translateText(post.content, lang),
        ]);
        const titleEl = contentArea.querySelector('.post-detail-title');
        const bodyEl = contentArea.querySelector('.post-detail-body');
        if (!titleEl || !bodyEl) return;

        let showingTrans = true;
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'board-trans-toggle-btn';

        const updatePost = () => {
          titleEl.textContent = showingTrans ? transTitle : post.title;
          bodyEl.innerHTML = escHtml(showingTrans ? transBody : post.content).replace(/\n/g, '<br>');
          toggleBtn.textContent = showingTrans ? t('board_show_original') : t('board_show_translated');
        };
        toggleBtn.addEventListener('click', () => { showingTrans = !showingTrans; updatePost(); });
        inner?.insertBefore(toggleBtn, inner.querySelector('.post-meta-row'));
        updatePost();
      } finally {
        badge.remove();
      }
    }
  } catch (e) {
    contentArea.innerHTML = `<div class="board-empty">${e.message}</div>`;
  }
}

async function renderComments(postId) {
  const area = document.getElementById('postCommentsArea');
  if (!area) return;
  try {
    const comments = await fetchComments(postId);
    if (comments.length === 0) {
      area.innerHTML = `<div class="comments-empty">${t('board_comments_empty')}</div>`;
      return;
    }
    const lang = window.currentLang;
    const rawContents = comments.map(c => c.content);

    const paintComments = (contents) => {
      area.innerHTML = comments.map((c, i) => `
        <div class="comment-card">
          <div class="comment-anon">${t('board_anon')}</div>
          <div class="comment-text">${escHtml(contents[i]).replace(/\n/g, '<br>')}</div>
          <div class="comment-time">${timeAgo(c.created_at)}</div>
        </div>
      `).join('');
    };

    paintComments(rawContents);

    if (lang !== 'ko') {
      const transContents = await Promise.all(rawContents.map(c => translateText(c, lang)));
      let showingTrans = true;

      const repaintComments = () => {
        const contents = showingTrans ? transContents : rawContents;
        const toggleBar = `
          <div class="board-trans-bar board-trans-bar-sm">
            <button class="board-trans-toggle-btn" id="commentTransToggleBtn">
              ${showingTrans ? t('board_show_original') : t('board_show_translated')}
            </button>
          </div>`;
        area.innerHTML = toggleBar + comments.map((c, i) => `
          <div class="comment-card">
            <div class="comment-anon">${t('board_anon')}</div>
            <div class="comment-text">${escHtml(contents[i]).replace(/\n/g, '<br>')}</div>
            <div class="comment-time">${timeAgo(c.created_at)}</div>
          </div>
        `).join('');
        document.getElementById('commentTransToggleBtn')?.addEventListener('click', () => {
          showingTrans = !showingTrans;
          repaintComments();
        });
      };

      repaintComments();
    }
  } catch (e) {}
}

function initBoardScreen() {
  document.getElementById('boardBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('boardWriteBtn')?.addEventListener('click', async () => {
    const user = await getUser();
    if (!user) { openModal('loginModal'); return; }
    openModal('writeModal');
  });
  document.getElementById('quickBoardBtn')?.addEventListener('click', e => {
    e.preventDefault();
    showScreen('screen-board');
  });
}

function initPostScreen() {
  document.getElementById('postBackBtn')?.addEventListener('click', () => showScreen('screen-board'));
  document.getElementById('postMsgBtn')?.addEventListener('click', () => openModal('sendMsgModal'));

  const sendComment = async () => {
    const input = document.getElementById('commentInput');
    const content = input?.value.trim();
    if (!content || !currentPost) return;
    const user = await getUser();
    if (!user) { openModal('loginModal'); return; }
    input.disabled = true;
    try {
      await createComment(currentPost.id, content);
      input.value = '';
      await renderComments(currentPost.id);
      document.getElementById('postScroll')?.scrollTo({ top: 999999, behavior: 'smooth' });
    } catch (e) { alert(e.message); }
    finally { input.disabled = false; input.focus(); }
  };

  document.getElementById('commentSendBtn')?.addEventListener('click', sendComment);
  document.getElementById('commentInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendComment();
  });
}

let writeEditMode = false;

function openEditModal(post) {
  writeEditMode = true;
  document.getElementById('writeTitle').value = post.title;
  document.getElementById('writeContent').value = post.content;
  document.querySelector('#writeModal .auth-modal-title').textContent = t('board_edit');
  document.querySelector('#writeModal .auth-submit').textContent = t('board_edit');
  openModal('writeModal');
}

function resetWriteModal() {
  writeEditMode = false;
  document.querySelector('#writeModal .auth-modal-title').textContent = t('board_write_title');
  document.querySelector('#writeModal .auth-submit').textContent = t('board_submit');
}

function initWriteModal() {
  document.querySelectorAll('[data-close="writeModal"]').forEach(el => {
    el.addEventListener('click', resetWriteModal, { capture: true });
  });

  document.getElementById('writeForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('writeTitle').value.trim();
    const content = document.getElementById('writeContent').value.trim();
    const errEl = document.getElementById('writeError');
    const btn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!title || !content) { errEl.textContent = '제목과 내용을 입력해주세요.'; errEl.classList.remove('hidden'); return; }
    btn.disabled = true; btn.textContent = writeEditMode ? `${t('board_edit')}...` : `${t('board_submit')}...`;
    try {
      if (writeEditMode && currentPost) {
        await updatePost(currentPost.id, title, content);
        currentPost.title = title;
        currentPost.content = content;
        closeModal('writeModal');
        e.target.reset();
        resetWriteModal();
        await openPostDetail(currentPost.id);
      } else {
        await createPost(title, content);
        closeModal('writeModal');
        e.target.reset();
        await renderBoardList();
      }
    } catch (e) {
      errEl.textContent = e.message; errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = writeEditMode ? t('board_edit') : t('board_submit');
    }
  });
}

function initSendMsgModal() {
  document.getElementById('sendMsgForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const content = document.getElementById('sendMsgContent').value.trim();
    const errEl = document.getElementById('sendMsgError');
    const btn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!content) { errEl.textContent = '내용을 입력해주세요.'; errEl.classList.remove('hidden'); return; }
    if (!currentPost?.user_id) { errEl.textContent = '쪽지를 보낼 수 없는 글입니다.'; errEl.classList.remove('hidden'); return; }
    btn.disabled = true; btn.textContent = '보내는 중...';
    try {
      await sendMessage(currentPost.user_id, currentPost.id, content);
      closeModal('sendMsgModal');
      e.target.reset();
      alert(t('board_alert_msg_sent'));
    } catch (e) {
      errEl.textContent = e.message; errEl.classList.remove('hidden');
    } finally { btn.disabled = false; btn.textContent = t('board_send'); }
  });
}

/* ─── Messages ─── */
let currentViewMsg = null;

async function renderMessages() {
  const list = document.getElementById('msgList');
  if (!list) return;
  list.innerHTML = `<div class="board-loading">${t('board_loading')}</div>`;
  const user = await getUser();
  if (!user) { list.innerHTML = `<div class="board-empty">${t('board_login_required')}</div>`; return; }
  try {
    const msgs = await fetchMessages();
    if (msgs.length === 0) { list.innerHTML = `<div class="board-empty">${t('board_no_msg')}</div>`; return; }
    list.innerHTML = msgs.map(m => {
      const isMine = m.sender_id === user.id;
      const unread = !m.is_read && !isMine;
      return `
        <div class="msg-card${unread ? ' msg-unread' : ''}" data-id="${m.id}">
          <div class="msg-card-top">
            <span class="msg-from">${isMine ? t('board_msg_sent_label') : t('board_anon')}</span>
            ${unread ? '<span class="msg-new-dot"></span>' : ''}
            <span class="msg-time">${timeAgo(m.created_at)}</span>
          </div>
          <div class="msg-preview">${escHtml(m.content)}</div>
        </div>
      `;
    }).join('');
    list.querySelectorAll('.msg-card').forEach(card => {
      card.addEventListener('click', async () => {
        const msg = msgs.find(m => m.id === card.dataset.id);
        if (!msg) return;
        currentViewMsg = msg;
        if (!msg.is_read && msg.receiver_id === user.id) {
          await markRead(msg.id);
          card.classList.remove('msg-unread');
          card.querySelector('.msg-new-dot')?.remove();
        }
        openMsgDetail(msg, user);
      });
    });
  } catch (e) {
    list.innerHTML = `<div class="board-empty">${e.message}</div>`;
  }
}

function openMsgDetail(msg, user) {
  const body = document.getElementById('msgDetailBody');
  if (!body) return;
  const isMine = msg.sender_id === user.id;
  body.innerHTML = `
    <div class="msg-detail-meta">${isMine ? t('board_msg_sent_me') : t('board_msg_received_label')} · ${timeAgo(msg.created_at)}</div>
    <div class="msg-detail-content">${escHtml(msg.content)}</div>
    <button class="msg-delete-btn" id="msgDeleteBtn">${t('board_delete_msg')}</button>
  `;
  document.getElementById('msgDeleteBtn')?.addEventListener('click', async () => {
    if (!confirm(t('board_confirm_delete_msg'))) return;
    try {
      await deleteMessage(msg.id);
      closeModal('msgDetailModal');
      await renderMessages();
    } catch (e) { alert(e.message); }
  });
  const replyForm = document.getElementById('replyForm');
  if (replyForm) replyForm.style.display = isMine ? 'none' : '';
  openModal('msgDetailModal');
}

function initMessagesScreen() {
  document.getElementById('msgBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('replyForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const content = document.getElementById('replyContent').value.trim();
    const errEl = document.getElementById('replyError');
    const btn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!content) { errEl.textContent = '내용을 입력해주세요.'; errEl.classList.remove('hidden'); return; }
    if (!currentViewMsg) return;
    btn.disabled = true; btn.textContent = '보내는 중...';
    try {
      await replyMessage(currentViewMsg, content);
      closeModal('msgDetailModal');
      e.target.reset();
      alert(t('board_alert_reply_sent'));
    } catch (e) {
      errEl.textContent = e.message; errEl.classList.remove('hidden');
    } finally { btn.disabled = false; btn.textContent = t('board_reply'); }
  });
}

/* ── Campus Map ── */
const FACILITY_NAMES = {
  classroom:       { ko:'강의실',      en:'Classrooms',           zh:'教室',       ja:'講義室',       vi:'Phòng học',              th:'ห้องเรียน' },
  lab:             { ko:'실험실',      en:'Laboratory',           zh:'实验室',     ja:'実験室',       vi:'Phòng thí nghiệm',       th:'ห้องแล็บ' },
  faculty_office:  { ko:'교수연구실',  en:'Faculty Offices',      zh:'教授研究室', ja:'研究室',       vi:'VP giáo sư',             th:'ห้องอาจารย์' },
  admin_office:    { ko:'행정실',      en:'Admin Office',         zh:'行政室',     ja:'事務室',       vi:'VP hành chính',          th:'สำนักงาน' },
  seminar:         { ko:'세미나실',    en:'Seminar Rooms',        zh:'研讨室',     ja:'セミナー室',   vi:'Phòng hội thảo',         th:'ห้องสัมมนา' },
  computer_lab:    { ko:'컴퓨터실',   en:'Computer Lab',         zh:'电脑室',     ja:'コンピュータ室',vi:'Phòng máy tính',        th:'ห้องคอมพิวเตอร์' },
  workshop:        { ko:'공작실',      en:'Workshop',             zh:'工作室',     ja:'工作室',       vi:'Xưởng thực hành',        th:'ห้องปฏิบัติการ' },
  study_room:      { ko:'스터디룸',    en:'Study Rooms',          zh:'自习室',     ja:'スタディルーム',vi:'Phòng tự học',          th:'ห้องศึกษา' },
  cafe:            { ko:'카페테리아',  en:'Cafeteria',            zh:'餐厅',       ja:'カフェテリア', vi:'Căng-tin',               th:'โรงอาหาร' },
  convenience:     { ko:'편의점',      en:'Convenience Store',    zh:'便利店',     ja:'コンビニ',     vi:'Cửa hàng tiện lợi',      th:'ร้านสะดวกซื้อ' },
  student_org:     { ko:'동아리실',    en:'Club Rooms',           zh:'社团室',     ja:'サークル室',   vi:'Phòng câu lạc bộ',       th:'ห้องชมรม' },
  fitness:         { ko:'헬스장',      en:'Fitness Center',       zh:'健身房',     ja:'フィットネス', vi:'Phòng gym',              th:'ห้องฟิตเนส' },
  shower:          { ko:'샤워실',      en:'Shower Rooms',         zh:'淋浴间',     ja:'シャワー室',   vi:'Phòng tắm',              th:'ห้องอาบน้ำ' },
  table_tennis:    { ko:'탁구장',      en:'Table Tennis',         zh:'乒乓球室',   ja:'卓球場',       vi:'Bàn bóng bàn',           th:'โต๊ะปิงปอง' },
  reading_room:    { ko:'열람실',      en:'Reading Room',         zh:'阅览室',     ja:'閲覧室',       vi:'Phòng đọc sách',         th:'ห้องอ่านหนังสือ' },
  archive:         { ko:'자료실',      en:'Archive',              zh:'资料室',     ja:'資料室',       vi:'Phòng lưu trữ',          th:'ห้องเก็บเอกสาร' },
  studio:          { ko:'스튜디오',    en:'Studio',               zh:'工作室',     ja:'スタジオ',     vi:'Phòng thu',              th:'สตูดิโอ' },
  workshop_art:    { ko:'작업실',      en:'Art Workshop',         zh:'创作室',     ja:'制作室',       vi:'Xưởng mỹ thuật',         th:'ห้องสร้างสรรค์' },
  exhibition:      { ko:'전시실',      en:'Exhibition Hall',      zh:'展厅',       ja:'展示室',       vi:'Phòng triển lãm',        th:'ห้องนิทรรศการ' },
  performance:     { ko:'공연장',      en:'Performance Hall',     zh:'演出厅',     ja:'演奏ホール',   vi:'Sân khấu biểu diễn',     th:'ห้องแสดง' },
  practice_room:   { ko:'연습실',      en:'Practice Room',        zh:'练习室',     ja:'練習室',       vi:'Phòng luyện tập',        th:'ห้องซ้อม' },
  recording:       { ko:'녹음실',      en:'Recording Studio',     zh:'录音室',     ja:'録音室',       vi:'Phòng thu âm',           th:'ห้องบันทึกเสียง' },
  dormitory_room:  { ko:'기숙사실',    en:'Dormitory Rooms',      zh:'宿舍',       ja:'寮室',         vi:'Phòng ký túc xá',        th:'ห้องหอพัก' },
  laundry:         { ko:'세탁실',      en:'Laundry',              zh:'洗衣室',     ja:'洗濯室',       vi:'Phòng giặt đồ',          th:'ห้องซักผ้า' },
  lounge:          { ko:'휴게실',      en:'Lounge',               zh:'休息室',     ja:'ラウンジ',     vi:'Phòng giải trí',         th:'ห้องพักผ่อน' },
  language_lab:    { ko:'어학실',      en:'Language Lab',         zh:'语言实验室', ja:'語学室',       vi:'Phòng ngôn ngữ',         th:'ห้องภาษา' },
  intl_office:     { ko:'국제교류실',  en:'Int\'l Exchange Office',zh:'国际交流室',ja:'国際交流室',   vi:'VP trao đổi quốc tế',    th:'สำนักงานแลกเปลี่ยน' },
  tutoring:        { ko:'튜터링실',    en:'Tutoring Center',      zh:'辅导室',     ja:'チューター室', vi:'Phòng hỗ trợ học tập',   th:'ห้องติวเตอร์' },
  president_office:{ ko:'총장실',      en:'President\'s Office',  zh:'校长室',     ja:'学長室',       vi:'VP hiệu trưởng',         th:'ห้องอธิการบดี' },
  student_affairs: { ko:'학생처',      en:'Student Affairs',      zh:'学生处',     ja:'学生部',       vi:'Phòng công tác sinh viên',th:'กิจการนักศึกษา' },
  admissions:      { ko:'입학처',      en:'Admissions Office',    zh:'招生办',     ja:'入試室',       vi:'Phòng tuyển sinh',       th:'สำนักงานรับนักศึกษา' },
  outdoor_stage:   { ko:'야외공연장',  en:'Outdoor Stage',        zh:'户外舞台',   ja:'野外ステージ', vi:'Sân khấu ngoài trời',    th:'เวทีกลางแจ้ง' },
  makeup_room:     { ko:'분장실',      en:'Makeup Room',          zh:'化妆室',     ja:'メイク室',     vi:'Phòng hóa trang',        th:'ห้องแต่งหน้า' },
  props_room:      { ko:'소품실',      en:'Props Room',           zh:'道具室',     ja:'小道具室',     vi:'Phòng đạo cụ',           th:'ห้องอุปกรณ์' },
  research_inst:   { ko:'연구소',      en:'Research Institute',   zh:'研究院',     ja:'研究院',       vi:'Viện nghiên cứu',        th:'สถาบันวิจัย' },
  meeting_room:    { ko:'회의실',      en:'Meeting Rooms',        zh:'会议室',     ja:'会議室',       vi:'Phòng họp',              th:'ห้องประชุม' },
  training_room:   { ko:'훈련실',      en:'Training Room',        zh:'训练室',     ja:'訓練室',       vi:'Phòng huấn luyện',       th:'ห้องฝึก' },
  rotc_office:     { ko:'ROTC 행정실', en:'ROTC Office',          zh:'ROTC行政室', ja:'ROTC事務室',   vi:'VP ROTC',                th:'สำนักงาน ROTC' },
  armory:          { ko:'무기고',      en:'Armory',               zh:'武器库',     ja:'武器庫',       vi:'Kho vũ khí',             th:'คลังอาวุธ' },
  practice_field:  { ko:'실습실',      en:'Practice Lab',         zh:'实习室',     ja:'実習室',       vi:'Phòng thực hành',        th:'ห้องปฏิบัติการ' },
  gym:             { ko:'체육관',      en:'Indoor Gymnasium',     zh:'室内体育馆', ja:'体育館',       vi:'Nhà thi đấu',            th:'โรงยิมในร่ม' },
};

const campusBuildings = [
  { id:'01', ko:'인문사회융합대학',         names:{ en:'Humanities & Social Sciences', zh:'人文社会融合学院', ja:'人文社会融合大学', vi:'Trường Nhân văn & Xã hội', th:'วิทยาลัยมนุษยศาสตร์' }, facilities:['classroom','faculty_office','admin_office','seminar','language_lab'] },
  { id:'02', ko:'미래혁신관',               names:{ en:'Future Innovation Hall', zh:'未来创新馆', ja:'未来イノベーション館', vi:'Tòa Đổi mới Tương lai', th:'อาคารนวัตกรรมอนาคต' }, facilities:['classroom','research_inst','meeting_room','cafe'] },
  { id:'03', ko:'혁신공과대학',             names:{ en:'Innovation Engineering College', zh:'创新工科学院', ja:'イノベーション工科大学', vi:'Trường Kỹ thuật Sáng tạo', th:'วิทยาลัยวิศวกรรมนวัตกรรม' }, facilities:['classroom','lab','faculty_office','workshop'] },
  { id:'04', ko:'고운첨단과학기술연구원',   names:{ en:'Goun Advanced S&T Institute', zh:'高云尖端科技研究院', ja:'高運先端科学技術研究院', vi:'Viện KH&KT Tiên tiến Goun', th:'สถาบันวิทยาศาสตร์ Goun' }, facilities:['research_inst','lab','seminar','meeting_room'] },
  { id:'05', ko:'제1공학관',                names:{ en:'Engineering Building 1', zh:'第1工学馆', ja:'第1工学館', vi:'Tòa Kỹ thuật 1', th:'อาคารวิศวกรรม 1' }, facilities:['classroom','lab','faculty_office','computer_lab'] },
  { id:'06', ko:'제2공학관',                names:{ en:'Engineering Building 2', zh:'第2工学馆', ja:'第2工学館', vi:'Tòa Kỹ thuật 2', th:'อาคารวิศวกรรม 2' }, facilities:['classroom','lab','faculty_office','seminar'] },
  { id:'07', ko:'제3공학관',                names:{ en:'Engineering Building 3', zh:'第3工学馆', ja:'第3工学館', vi:'Tòa Kỹ thuật 3', th:'อาคารวิศวกรรม 3' }, facilities:['classroom','lab','faculty_office','computer_lab'] },
  { id:'08', ko:'ACE교육관',                names:{ en:'ACE Education Hall', zh:'ACE教育馆', ja:'ACE教育館', vi:'Tòa Giáo dục ACE', th:'อาคารการศึกษา ACE' }, facilities:['classroom','tutoring','study_room','admin_office'] },
  { id:'09', ko:'제4공학관',                names:{ en:'Engineering Building 4', zh:'第4工学馆', ja:'第4工学館', vi:'Tòa Kỹ thuật 4', th:'อาคารวิศวกรรม 4' }, facilities:['classroom','lab','faculty_office','workshop'] },
  { id:'10', ko:'조형관',                   names:{ en:'Sculpture & Design Hall', zh:'造型馆', ja:'造形館', vi:'Tòa Điêu khắc & TK', th:'อาคารศิลปะและการออกแบบ' }, facilities:['studio','workshop_art','exhibition','classroom'] },
  { id:'11', ko:'디자인앤아트대학',         names:{ en:'College of Design & Art', zh:'设计与艺术学院', ja:'デザイン＆アート大学', vi:'Trường Thiết kế & NT', th:'วิทยาลัยการออกแบบและศิลปะ' }, facilities:['studio','workshop_art','exhibition','classroom','faculty_office'] },
  { id:'12', ko:'글로벌인재대학',           names:{ en:'Global Talent College', zh:'全球人才学院', ja:'グローバル人材大学', vi:'Trường Nhân tài Toàn cầu', th:'วิทยาลัยบุคลากรระดับโลก' }, facilities:['classroom','faculty_office','language_lab','intl_office','seminar'] },
  { id:'13', ko:'대학본부',                 names:{ en:'Main Administration Building', zh:'大学本部', ja:'大学本部', vi:'Tòa Hành chính Trung tâm', th:'อาคารบริหารหลัก' }, facilities:['president_office','admin_office','student_affairs','admissions','intl_office'] },
  { id:'14', ko:'학생회관',                 names:{ en:'Student Union', zh:'学生会馆', ja:'学生会館', vi:'Nhà Sinh viên', th:'อาคารสหภาพนักศึกษา' }, facilities:['cafe','convenience','student_org','meeting_room','study_room'] },
  { id:'15', ko:'체육관',                   names:{ en:'Gymnasium', zh:'体育馆', ja:'体育館', vi:'Nhà thi đấu', th:'โรงยิมนาสติก' }, facilities:['gym','fitness','shower','table_tennis'] },
  { id:'16', ko:'중앙도서관',               names:{ en:'Central Library', zh:'中央图书馆', ja:'中央図書館', vi:'Thư viện Trung tâm', th:'ห้องสมุดกลาง' }, facilities:['reading_room','archive','seminar','study_room','cafe'] },
  { id:'17', ko:'라이프케어사이언스대학',   names:{ en:'Life Care Science College', zh:'生命关怀科学学院', ja:'ライフケアサイエンス大学', vi:'Trường KH Chăm sóc Sức khỏe', th:'วิทยาลัยวิทยาศาสตร์สุขภาพ' }, facilities:['classroom','lab','faculty_office','practice_field'] },
  { id:'18', ko:'사회관',                   names:{ en:'Social Sciences Building', zh:'社会馆', ja:'社会館', vi:'Tòa Khoa học Xã hội', th:'อาคารสังคมศาสตร์' }, facilities:['classroom','faculty_office','seminar','admin_office'] },
  { id:'19', ko:'지능형SW융합대학',         names:{ en:'Intelligent SW Convergence', zh:'智能软件融合学院', ja:'知能型SW融合大学', vi:'Trường Tích hợp PM Thông minh', th:'วิทยาลัยซอฟต์แวร์อัจฉริยะ' }, facilities:['classroom','computer_lab','research_inst','seminar','lab'] },
  { id:'20', ko:'벨칸토아트센터',           names:{ en:'Belcanto Art Center', zh:'贝尔坎托艺术中心', ja:'ベルカントアートセンター', vi:'TT Nghệ thuật Belcanto', th:'ศูนย์ศิลปะ Belcanto' }, facilities:['performance','practice_room','makeup_room','props_room'] },
  { id:'21', ko:'야외음악당',               names:{ en:'Outdoor Music Pavilion', zh:'户外音乐厅', ja:'野外音楽堂', vi:'Nhà nhạc Ngoài trời', th:'ศาลาดนตรีกลางแจ้ง' }, facilities:['outdoor_stage','makeup_room'] },
  { id:'22', ko:'음악테크놀로지대학',       names:{ en:'Music Technology College', zh:'音乐技术学院', ja:'音楽テクノロジー大学', vi:'Trường Công nghệ Âm nhạc', th:'วิทยาลัยเทคโนโลยีดนตรี' }, facilities:['classroom','practice_room','recording','faculty_office'] },
  { id:'23', ko:'문화예술융합대학(아마랜스홀)',names:{ en:'Culture & Arts College (Amaranth Hall)', zh:'文化艺术融合学院（阿玛兰斯厅）', ja:'文化芸術融合大学（アマランスホール）', vi:'Trường VH & NT (Amaranth Hall)', th:'วิทยาลัยวัฒนธรรมฯ (Amaranth Hall)' }, facilities:['performance','classroom','practice_room','exhibition'] },
  { id:'24', ko:'기숙사',                   names:{ en:'Dormitory', zh:'宿舍', ja:'寮', vi:'Ký túc xá', th:'หอพัก' }, facilities:['dormitory_room','laundry','lounge','convenience'] },
  { id:'25', ko:'경영공학대학',             names:{ en:'Business Engineering College', zh:'经营工程学院', ja:'経営工学大学', vi:'Trường KT Kinh doanh', th:'วิทยาลัยวิศวกรรมธุรกิจ' }, facilities:['classroom','seminar','faculty_office','computer_lab'] },
  { id:'26', ko:'ROTC',                     names:{ en:'ROTC', zh:'ROTC', ja:'ROTC', vi:'ROTC', th:'ROTC' }, facilities:['training_room','rotc_office','armory'] },
];

const CAMPUS_PLACEHOLDER = 'https://www.suwon.ac.kr/usr/upload/board/zboardphotogallery188/20200619015742915_7691.0.jpg';
const CAMPUSMAP_IMG_BASE = 'https://www.suwon.ac.kr/usr/images/suwon/campusmap/';

const CAMPUS_CUSTOM_PHOTO = {
  '20': 'https://www.suwon.ac.kr/usr/upload/board_thumb/zboardphotogallery251/20200108100907045_8464.0.jpg',
  '21': 'assets/야외음악.jpg',
  '22': 'assets/음악대학.jpg',
  '24': 'assets/기숙사.jpg',
  '25': 'https://www.suwon.ac.kr/usr/images/suwon/introduce_img_ksd.jpg',
};

/* Maps our building id (01-26) → university BULD_CD for building photo */
const CAMPUS_BULD_DATA = {
  '01':'02', '02':'37', '03':'08', '04':'19', '05':'09', '06':'10',
  '07':'07', '08':'17', '09':'06', '10':'15', '11':'14', '12':'05',
  '13':'40', '14':'22', '15':'13', '16':'21', '17':'12', '18':'04',
  '19':'27', '20':null, '21':null, '22':'16', '23':'18', '24':null,
  '25':'38', '26':'23',
};

function renderCampusBuildingList() {
  const lang = window.currentLang;
  const list = document.getElementById('campusBuildingList');
  if (!list) return;
  list.innerHTML = campusBuildings.map(b => {
    const name = lang === 'ko' ? b.ko : (b.names[lang] || b.names.en || b.ko);
    const showKo = lang !== 'ko';
    return `<button class="campus-bldg-item" data-bldg-id="${b.id}">
      <span class="campus-bldg-num">${b.id}</span>
      <span class="campus-bldg-info">
        <span class="campus-bldg-name">${name}</span>
        ${showKo ? `<span class="campus-bldg-ko">${b.ko}</span>` : ''}
      </span>
      <span class="campus-bldg-arrow">›</span>
    </button>`;
  }).join('');
  list.querySelectorAll('.campus-bldg-item').forEach(btn => {
    btn.addEventListener('click', () => openBuildingModal(btn.dataset.bldgId));
  });
}

function openBuildingModal(id) {
  const b = campusBuildings.find(x => x.id === id);
  if (!b) return;
  const buldCd = CAMPUS_BULD_DATA[id] || null;
  const lang = window.currentLang;
  const name = lang === 'ko' ? b.ko : (b.names[lang] || b.names.en || b.ko);

  const photoUrl = CAMPUS_CUSTOM_PHOTO[id]
    ?? (buldCd ? `${CAMPUSMAP_IMG_BASE}${buldCd}_00.png` : CAMPUS_PLACEHOLDER);

  const sheet = document.getElementById('bldgModalSheet');
  sheet.innerHTML = `
    <img class="bldg-modal-img" id="bldgPhotoImg" src="${photoUrl}" alt="${name}">
    <button class="bldg-modal-close" id="bldgCloseBtn" aria-label="닫기">✕</button>
    <div class="bldg-modal-body">
      <div class="bldg-modal-num">건물 ${b.id}</div>
      <h2 class="bldg-modal-name">${name}</h2>
      ${lang !== 'ko' ? `<p class="bldg-modal-name-ko">${b.ko}</p>` : ''}
    </div>`;

  const photoEl = document.getElementById('bldgPhotoImg');
  photoEl.onerror = () => { photoEl.src = CAMPUS_PLACEHOLDER; };
  document.getElementById('bldgCloseBtn').addEventListener('click', closeBuildingModal);

  document.getElementById('buildingModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBuildingModal() {
  document.getElementById('buildingModal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

function initCampusMap() {
  document.getElementById('mapBackBtn')?.addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('buildingModalBg')?.addEventListener('click', closeBuildingModal);

  /* Campus map image lightbox */
  const campusImg = document.getElementById('campusMapImg');
  const lightbox  = document.getElementById('mapLightbox');
  const lbClose   = document.getElementById('mapLightboxClose');
  const lbBg      = document.getElementById('mapLightboxBg');
  if (campusImg && lightbox) {
    campusImg.style.cursor = 'zoom-in';
    campusImg.addEventListener('click', () => {
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
    function closeLightbox() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }
    lbClose?.addEventListener('click', closeLightbox);
    lbBg?.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeBuildingModal(); document.getElementById('mapLightbox')?.classList.add('hidden'); document.body.style.overflow = ''; }
  });
  renderCampusBuildingList();
}

/* Main Nav (desktop) */
function initMainNav() {
  document.querySelectorAll('.main-nav-item[data-to-screen]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showScreen(el.dataset.toScreen);
    });
  });

  document.querySelectorAll('[data-scroll-to]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(el.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('heroScrollBtn')?.addEventListener('click', () => {
    document.querySelector('.feature-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('.feature-card[data-to-screen]').forEach(card => {
    card.addEventListener('click', () => showScreen(card.dataset.toScreen));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') showScreen(card.dataset.toScreen); });
  });

  document.getElementById('quickBoardBtn')?.addEventListener('click', e => { e.preventDefault(); showScreen('screen-board'); });
  document.getElementById('quickBoardBtn2')?.addEventListener('click', e => { e.preventDefault(); showScreen('screen-board'); });
  document.getElementById('quickNearbyBtn')?.addEventListener('click', e => { e.preventDefault(); showScreen('screen-nearby'); });

  setTimeout(() => document.querySelector('.hero-full')?.classList.add('hero-loaded'), 100);
}

/* Scroll Reveal (IntersectionObserver) */
function initScrollReveal() {
  const sections = document.querySelectorAll('#screen-home .reveal-section');
  if (!sections.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach(s => observer.observe(s));
}

/* FAQ Accordion */
const faqAnswers = {
  library: {
    ko: '중앙도서관은 학기중 09:30–19:00, 방학중 09:30–17:00 운영되며 토·일·공휴일은 휴관합니다. 학생증으로 학부생 7권(10일) 대출 가능. 3층 대출·반납 창구 및 무인 반납함(24시간) 이용. 스터디룸은 lib.suwon.ac.kr에서 예약하세요.',
    en: 'The library is open Mon–Fri 09:30–19:00 (semester), 09:30–17:00 (vacation), closed weekends & holidays. Undergrads can borrow up to 7 books for 10 days with your student ID. Study room bookings at lib.suwon.ac.kr.',
    zh: '图书馆工作时间：学期中09:30–19:00，假期09:30–17:00，周末及节假日休馆。本科生凭学生证可借7册（10天）。自习室预约：lib.suwon.ac.kr。',
    ja: '図書館：学期中09:30–19:00、休暇中09:30–17:00（土日・祝日休館）。学生証で学部生7冊10日間貸出可。スタディルーム予約はlib.suwon.ac.krで。',
    vi: 'Thư viện mở 09:30–19:00 (học kỳ), 09:30–17:00 (nghỉ hè), đóng T7, CN và ngày lễ. SV đại học mượn tối đa 7 cuốn/10 ngày. Đặt phòng học: lib.suwon.ac.kr.',
    th: 'ห้องสมุดเปิด 09:30–19:00 (ภาคเรียน), 09:30–17:00 (ปิดภาค), ปิดเสาร์-อาทิตย์-วันหยุด นักศึกษาป.ตรียืมได้ 7 เล่ม 10 วัน จองห้องที่ lib.suwon.ac.kr'
  },
  shuttle: {
    ko: '셔틀버스는 평일만 운행됩니다. 수원역 출발: 06:50–19:30, 캠퍼스 출발: 07:40–20:00 (노선별 상이). 주말·공휴일은 운행하지 않습니다. 앱의 셔틀버스 메뉴에서 실시간 시간표를 확인하세요.',
    en: 'Shuttle buses run on weekdays only between Suwon Station and campus. Suwon Station: 06:50–19:30, Campus: 07:40–20:00 (varies by route). No service weekends or holidays.',
    zh: '校车仅工作日运行。水原站出发：06:50–19:30，校园出发：07:40–20:00（各路线不同）。周末及节假日停运。',
    ja: 'シャトルバスは平日のみ運行。水原駅発：06:50–19:30、キャンパス発：07:40–20:00（路線により異なる）。週末・祝日は運休。',
    vi: 'Xe buýt con thoi chỉ chạy ngày thường. Ga Suwon: 06:50–19:30, Khuôn viên: 07:40–20:00 (tùy tuyến). Không chạy cuối tuần và ngày lễ.',
    th: 'รถรับส่งวิ่งเฉพาะวันจันทร์–ศุกร์ สถานีซูวอน: 06:50–19:30 มหาวิทยาลัย: 07:40–20:00 (แล้วแต่สาย) ไม่วิ่งวันหยุด'
  },
  registration: {
    ko: '수강신청은 학사포털(portal.suwon.ac.kr)에서 진행합니다. 국제학생은 지도교수 상담 후 신청 가능하며, 매 학기 초 국제협력처의 별도 안내를 확인하세요. 수강 변경 기간은 개강 후 1주일입니다.',
    en: 'Course registration is done through the academic portal (portal.suwon.ac.kr). International students should consult their advisor beforehand. Course add/drop is allowed in the first week of semester.',
    zh: '课程注册通过学术门户(portal.suwon.ac.kr)进行。国际学生须先咨询导师。开学后一周内可进行课程变更。',
    ja: '履修登録は学術ポータル(portal.suwon.ac.kr)で行います。留学生は指導教員相談後に登録可能。変更期間は開講後1週間。',
    vi: 'Đăng ký môn học qua portal.suwon.ac.kr. Sinh viên quốc tế cần tư vấn giáo viên hướng dẫn. Thay đổi môn học trong tuần đầu học kỳ.',
    th: 'ลงทะเบียนเรียนที่ portal.suwon.ac.kr นักศึกษาต่างชาติต้องปรึกษาอาจารย์ที่ปรึกษาก่อน เปลี่ยนวิชาได้ในสัปดาห์แรกของเทอม'
  },
  printer: {
    ko: '프린터는 도서관 1층과 학생회관에 있습니다. 학생증을 태그하여 출력하세요. 흑백 50원/장, 컬러 150원/장. 충전은 도서관 서비스 데스크에서 가능합니다.',
    en: 'Printers are in the library (1F) and student union building. Tag your student ID to print. B&W ₩50/page, Color ₩150/page. Top up at the library service desk.',
    zh: '图书馆1楼和学生会大楼有打印机。刷学生证打印。黑白50韩元/页，彩色150韩元/页。图书馆服务台可充值。',
    ja: 'プリンターは図書館1階と学生会館にあります。学生証をタッチして印刷。モノクロ50ウォン/枚、カラー150ウォン/枚。チャージは図書館サービスデスクで。',
    vi: 'Máy in có tại tầng 1 thư viện và tòa hội sinh viên. Chạm thẻ để in. Đen trắng ₩50/trang, màu ₩150/trang. Nạp tiền tại quầy dịch vụ thư viện.',
    th: 'เครื่องพิมพ์อยู่ที่ชั้น 1 ห้องสมุดและอาคารสหภาพนักศึกษา แตะบัตรเพื่อพิมพ์ ขาวดำ 50 วอน/หน้า สี 150 วอน/หน้า ชาร์จเงินที่เคาน์เตอร์บริการ'
  },
  health: {
    ko: '보건실은 학생회관 2층에 있으며 평일 09:00–17:00 운영합니다. 기본 의약품 무료 제공, 혈압·체온 측정 가능. 응급 상황 시 031-220-2114로 연락하세요.',
    en: 'Health center is on the 2nd floor of the student union, open weekdays 09:00–17:00. Free basic medications available. Emergency: 031-220-2114.',
    zh: '保健室位于学生会大楼2楼，平日09:00–17:00开放，提供基本药品（免费）。紧急情况：031-220-2114。',
    ja: '保健室は学生会館2階。平日09:00–17:00。基本薬品無料。緊急時：031-220-2114。',
    vi: 'Phòng y tế ở tầng 2 tòa hội sinh viên, 09:00–17:00 các ngày thường. Cung cấp thuốc miễn phí. Khẩn cấp: 031-220-2114.',
    th: 'ห้องพยาบาลชั้น 2 อาคารสหภาพนักศึกษา เปิด 09:00–17:00 วันธรรมดา ยาพื้นฐานฟรี ฉุกเฉิน: 031-220-2114'
  },
  dormitory: {
    ko: '기숙사 신청은 학기 시작 2개월 전부터 학사포털에서 가능합니다. 국제학생 우선 배정 제도 있음. 기숙사비(학기): 고운학사 2인실 95만원 · 4인실 75만원, 경상관 2인실 150만원. 시설보증금 20만원(퇴사 시 환불). 자세한 내용은 국제협력처에 문의하세요. <a href="https://swudorm.suwon.ac.kr/index.html?menuno=422" target="_blank" rel="noopener" style="color:var(--navy);text-decoration:underline;">기숙사 공식 홈페이지 →</a>',
    en: 'Dormitory applications open 2 months before semester start via the portal. International students receive priority placement. Fees per semester: Goun Hall 2-person ₩950,000 · 4-person ₩750,000, Gyeongsan Hall 2-person ₩1,500,000. Facility deposit ₩200,000 (refundable). <a href="https://swudorm.suwon.ac.kr/index.html?menuno=422" target="_blank" rel="noopener" style="color:var(--navy);text-decoration:underline;">Official Dormitory Website →</a>',
    zh: '宿舍申请在学期开始前2个月通过门户网站开放。国际学生享有优先分配。每学期费用：高云学舍2人间95万韩元·4人间75万韩元，庆尚馆2人间150万韩元。设施保证金20万韩元（退宿时退还）。<a href="https://swudorm.suwon.ac.kr/index.html?menuno=422" target="_blank" rel="noopener" style="color:var(--navy);text-decoration:underline;">宿舍官网 →</a>',
    ja: '寮の申請は学期開始2か月前からポータルで可能。留学生優先配置あり。学期費用：高雲学舎2人部屋95万ウォン·4人部屋75万ウォン、慶尚館2人部屋150万ウォン。施設保証金20万ウォン（退寮時返還）。<a href="https://swudorm.suwon.ac.kr/index.html?menuno=422" target="_blank" rel="noopener" style="color:var(--navy);text-decoration:underline;">寮公式サイト →</a>',
    vi: 'Đăng ký ký túc xá mở 2 tháng trước học kỳ qua cổng thông tin. Ưu tiên sinh viên quốc tế. Phí/học kỳ: Goun Hall 2 người ₩950,000 · 4 người ₩750,000, Gyeongsan Hall 2 người ₩1,500,000. Đặt cọc ₩200,000 (hoàn trả khi rời đi). <a href="https://swudorm.suwon.ac.kr/index.html?menuno=422" target="_blank" rel="noopener" style="color:var(--navy);text-decoration:underline;">Website chính thức →</a>',
    th: 'สมัครหอพักได้ 2 เดือนก่อนเปิดเทอมผ่านพอร์ทัล นักศึกษาต่างชาติได้รับสิทธิ์ก่อน ค่าธรรมเนียม/เทอม: Goun Hall 2 คน ₩950,000 · 4 คน ₩750,000, Gyeongsan Hall 2 คน ₩1,500,000 เงินมัดจำ ₩200,000 (คืนเมื่อออก) <a href="https://swudorm.suwon.ac.kr/index.html?menuno=422" target="_blank" rel="noopener" style="color:var(--navy);text-decoration:underline;">เว็บไซต์หอพักอย่างเป็นทางการ →</a>'
  }
};

function initFaqAccordion() {
  const lang = window.currentLang || 'ko';
  document.querySelectorAll('.accordion-item').forEach(item => {
    const topic = item.dataset.topic;
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    if (!trigger || !content || !topic || !faqAnswers[topic]) return;

    const answer = faqAnswers[topic][lang] || faqAnswers[topic].ko;
    content.innerHTML = `<div class="accordion-answer">${answer}</div>`;

    if (!item.dataset.accordionBound) {
      item.dataset.accordionBound = '1';
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion-item.open').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
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
  initLibraryScreen();
  initSchoolScreen();
  initAuthModals();
  initBoardScreen();
  initPostScreen();
  initWriteModal();
  initSendMsgModal();
  initMessagesScreen();
  initCampusMap();
  initNearby();
  initContact();
  initMainNav();
  initHeaderScroll();
  updateNotices();
  await loadCafeteriaData();
  updateHomeData();
  updateCampusChips();
  updateNavLangButtons(window.currentLang);
  startShuttleTimer();

  initLoading();

  /* Start on loading screen */
  document.getElementById('screen-loading')?.classList.add('screen-visible');
  history.replaceState({ screen: 'screen-home' }, '');
});
