/* ═══════════════════════════════════════
   learn.js — ماژول آموزش
   مسیرهای یادگیری سرویس
   ═══════════════════════════════════════ */

const LEARNING_PATHS = [
{
  id: "lp-basics",
  title: "مبانی Linac",
  titleEn: "Linac Basics",
  subtitle: "آشنایی با اجزای دستگاه و اصول کار",
  subtitleEn: "Device components and operating principles",
  icon: "book",
  c1: "#5AC8FA", c2: "#0A84FF",
  level: "مقدماتی",
  duration: "۲.۵ ساعت",
  lessons: [
    { id:"b1", title:"آشنایی با اجزای Linac",
      duration:"۳۰ دقیقه",
      summary:"شناخت Stand، Gantry، Head، Collimator، Couch و نقش هر یک",
      points:[
        "Stand: پایه اصلی و محل نصب اجزای الکترونیکی",
        "Gantry: بخش چرخان با Head در انتها",
        "Head: محل تولید پرتو (Target، MLC، Jaws)",
        "Couch: تخت بیمار با ۳+ درجه حرکت"
      ],
      manuals: ["r1","s4"] },
    { id:"b2", title:"سیستم RF — تولید پرتو",
      duration:"۳۰ دقیقه",
      summary:"نحوه تولید الکترون‌ها و تبدیل به پرتو ایکس",
      points:[
        "Magnetron یا Klystron: تولید مایکروویو",
        "Waveguide: انتقال RF به Head",
        "Electron Gun: تولید الکترون",
        "Target: تبدیل الکترون به پرتو X"
      ],
      manuals: ["rf1","s4"] },
    { id:"b3", title:"سیستم خنک‌کننده",
      duration:"۲۵ دقیقه",
      summary:"نقش حیاتی خنک‌کننده در کارکرد دستگاه",
      points:[
        "Chiller: کنترل دمای آب",
        "مدار داخلی: خنک‌کاری Head، Magnetron، Waveguide",
        "ΔT نرمال: ۳-۵ درجه",
        "دمای آب ورودی: ۱۸-۲۲°C"
      ],
      manuals: ["t3","m14"] },
    { id:"b4", title:"سیستم ایمنی و اینترلاک",
      duration:"۳۰ دقیقه",
      summary:"همه اینترلاک‌ها که قبل از درمان باید فعال باشند",
      points:[
        "Door Interlock: قطع پرتو هنگام باز شدن درب",
        "Emergency Stop: قطع فوری تابش",
        "Radiation Monitor: پایش پرتو اتاق",
        "Beam On Interlock: جلوگیری از شروع بدون شرایط"
      ],
      manuals: ["m2","t19"] },
    { id:"b5", title:"رویه روشن/خاموش روزانه",
      duration:"۲۵ دقیقه",
      summary:"ترتیب صحیح روشن کردن، Warm-up و Standby",
      points:[
        "دمای اتاق: ۲۰-۲۴°C",
        "Warm-up: حداقل ۱۰ دقیقه",
        "ترتیب روشن کردن مانیتورها",
        "Park MLC قبل از خاموشی"
      ],
      manuals: ["pm5","m15"] }
  ]
},
{
  id: "lp-troubleshoot",
  title: "عیب‌یابی گام‌به‌گام",
  titleEn: "Step-by-step Troubleshooting",
  subtitle: "روش‌های اصولی تشخیص و رفع مشکل",
  subtitleEn: "Systematic diagnosis and repair methods",
  icon: "warn",
  c1: "#FF9500", c2: "#FF3B30",
  level: "مقدماتی",
  duration: "۲ ساعت",
  lessons: [
    { id:"tr1", title:"خواندن کدهای خطا",
      duration:"۲۵ دقیقه",
      summary:"چطور کد خطا را از پنل بفهمیم و اولین اقدام چیست",
      points:[
        "ثبت دقیق کد از پنل Service",
        "بررسی Log در Service → Logs",
        "تفکیک خطاهای بحرانی از عادی",
        "اولویت: ایمنی بیمار > ایمنی دستگاه"
      ],
      manuals: ["t1"] },
    { id:"tr2", title:"استفاده از Service Log",
      duration:"۲۰ دقیقه",
      summary:"چطور لاگ سیستم را بخوانیم و الگوی خطاها را پیدا کنیم",
      points:[
        "دسترسی: Service → Logs",
        "فیلتر بر اساس زمان و شدت",
        "جستجوی خطای تکرارشونده",
        "خروجی گرفتن برای گزارش"
      ],
      manuals: ["t10","sw5"] },
    { id:"tr3", title:"اولین اقدامات در حین درمان",
      duration:"۲۵ دقیقه",
      summary:"اگر پرتو ناگهان قطع شد چه کنیم؟",
      points:[
        "خروج بیمار از اتاق",
        "ثبت دز اعمال‌شده",
        "ثبت زمان و کد خطا",
        "عدم ادامه درمان تا رفع مشکل"
      ],
      manuals: ["t1","em5"] },
    { id:"tr4", title:"جستجو در منوال‌ها",
      duration:"۲۰ دقیقه",
      summary:"چطور سریع منوال مرتبط رو پیدا کنیم",
      points:[
        "استفاده از جستجو در تب کتابخانه",
        "فیلتر بر اساس دستگاه",
        "استفاده از QR اسکن روی دستگاه",
        "ذخیره منوال‌های پرکاربرد"
      ],
      manuals: ["t10"] },
    { id:"tr5", title:"ثبت سرویس در اپ",
      duration:"۲۵ دقیقه",
      summary:"چطور سرویس انجام‌شده را مستند کنیم",
      points:[
        "باز کردن منوال و زدن دکمه «ثبت سرویس»",
        "انتخاب دستگاه و وضعیت",
        "ثبت یادداشت‌های مهم",
        "استفاده از Service Log برای پیگیری"
      ],
      manuals: ["t10"] }
  ]
},
{
  id: "lp-rf",
  title: "RF و Magnetron",
  titleEn: "RF & Magnetron",
  subtitle: "سیستم تولید پرتو — تنظیم و عیب‌یابی",
  subtitleEn: "Beam generation — setup and troubleshooting",
  icon: "target",
  c1: "#FF2D55", c2: "#AF52DE",
  level: "پیشرفته",
  duration: "۳ ساعت",
  lessons: [
    { id:"rf-l1", title:"اصول کار Magnetron",
      duration:"۳۵ دقیقه",
      summary:"نحوه تولید مایکروویو و پارامترهای کلیدی",
      points:[
        "فرکانس پایه: ~۲۸۵۶ MHz",
        "توان خروجی: ~۵.۵ MW",
        "ولتاژ Filament: ~۱۰V DC",
        "AFC: تنظیم خودکار فرکانس"
      ],
      manuals: ["s4","rf1"] },
    { id:"rf-l2", title:"تنظیم AFC و فرکانس",
      duration:"۴۰ دقیقه",
      summary:"چطور AFC را تنظیم و فرکانس را پایدار نگه داریم",
      points:[
        "Warm-up کامل قبل از تنظیم",
        "بررسی فرکانس با Frekvenz Meter",
        "تنظیم AFC در حین تابش",
        "تست پایداری ۳۰ دقیقه"
      ],
      manuals: ["rf1","s4"] },
    { id:"rf-l3", title:"SF6 و Waveguide",
      duration:"۳۵ دقیقه",
      summary:"نقش SF6، فشار نرمال و بررسی نشتی",
      points:[
        "فشار نرمال: ۳۰ psi",
        "حداقل مجاز: ۲۸ psi",
        "شارژ آهسته برای جلوگیری از یخ‌زدگی",
        "تست نشتی ۲۴ ساعته"
      ],
      manuals: ["rf2","t7"] },
    { id:"rf-l4", title:"تعویض Magnetron",
      duration:"۴۰ دقیقه",
      summary:"رویه گام‌به‌گام تعویض Magnetron",
      points:[
        "تخلیه کامل خازن‌ها الزامی",
        "برچسب‌گذاری کابل‌ها قبل از جدا کردن",
        "تورک پیچ‌ها: ۲۵ N·m",
        "Auto-Conditioning: ۳۰-۶۰ دقیقه"
      ],
      manuals: ["r1","s4"] },
    { id:"rf-l5", title:"عیب‌یابی خطاهای RF",
      duration:"۳۰ دقیقه",
      summary:"رفع خطاهای رایج RF",
      points:[
        "Magnetron Overcurrent → AFC",
        "Waveguide Arc → SF6 و تمیزکاری",
        "Klystron Filament → بررسی Filament",
        "RF Reflected → Circulator"
      ],
      manuals: ["t7","r4"] }
  ]
},
{
  id: "lp-mlc",
  title: "MLC و Agility",
  titleEn: "MLC & Agility",
  subtitle: "کالیبراسیون و نگهداری سیستم کولیما",
  subtitleEn: "Collimator calibration and maintenance",
  icon: "grid",
  c1: "#BF5AF2", c2: "#5856D6",
  level: "متوسط",
  duration: "۲.۵ ساعت",
  lessons: [
    { id:"mlc-l1", title:"MLCi2 در برابر Agility",
      duration:"۳۰ دقیقه",
      summary:"تفاوت‌های این دو سیستم",
      points:[
        "MLCi2: ۸۰ Leaf، نسخه قدیمی‌تر",
        "Agility: ۱۶۰ Leaf، دقت بالاتر",
        "Agility حساس‌تر — دقت تنظیم حیاتی",
        "روش‌های کالیبراسیون متفاوت"
      ],
      manuals: ["s1","i1"] },
    { id:"mlc-l2", title:"تنظیم صفر و Backlash",
      duration:"۳۵ دقیقه",
      summary:"اصول کالیبراسیون موقعیت اولیه",
      points:[
        "Auto-Home اولین قدم",
        "ثبت موقعیت صفر هر Leaf",
        "Backlash: اختلاف رفت و برگشت",
        "حد مجاز Backlash: ۰.۳mm"
      ],
      manuals: ["s1","i1"] },
    { id:"mlc-l3", title:"Picket Fence و Garden Fence",
      duration:"۳۰ دقیقه",
      summary:"تست‌های استاندارد کیفیت MLC",
      points:[
        "Picket Fence: تست همه Leafها",
        "Garden Fence: تست Agility ۱۶۰ Leaf",
        "فیلم EBT3 + اسکنر",
        "انحراف مجاز: زیر ۱mm"
      ],
      manuals: ["i2"] },
    { id:"mlc-l4", title:"تعویض Leaf و Motor",
      duration:"۳۵ دقیقه",
      summary:"چطور یک Leaf یا Motor رو تعویض کنیم",
      points:[
        "شناسایی Leaf مشکل‌دار از Log",
        "قبل از کار: قطع برق MLC",
        "گریس Original Elekta الزامی",
        "Auto-Home و کالیبراسیون پس از تعویض"
      ],
      manuals: ["s2","i11"] },
    { id:"mlc-l5", title:"عیب‌یابی خطاهای MLC",
      duration:"۳۰ دقیقه",
      summary:"رفع خطاهای رایج MLC",
      points:[
        "Leaf Position Error → Auto-Home",
        "Motor Current High → تمیزکاری ریل",
        "Encoder Mismatch → تعویض Encoder",
        "Backlash Over Limit → تنظیم مجدد"
      ],
      manuals: ["t2","s3"] }
  ]
}
];

/* ═══ State ═══ */
const LEARN_KEY = "elekta_learn_progress_v1";
let learnProgress = {};
try { learnProgress = JSON.parse(localStorage.getItem(LEARN_KEY) || "{}"); } catch(e){}

let learnCurrentPath = null;
let learnCurrentLesson = null;

/* ═══ Helpers ═══ */
function saveLearnProgress(){
  try { localStorage.setItem(LEARN_KEY, JSON.stringify(learnProgress)); } catch(e){}
}
function isLessonDone(lessonId){
  return !!learnProgress[lessonId];
}
function markLessonDone(lessonId){
  if(!learnProgress[lessonId]){
    learnProgress[lessonId] = Date.now();
    saveLearnProgress();
    if(navigator.vibrate) navigator.vibrate([15, 30, 15]);
  }
}
function unmarkLesson(lessonId){
  delete learnProgress[lessonId];
  saveLearnProgress();
  if(navigator.vibrate) navigator.vibrate(8);
}
function getPathProgress(path){
  var total = path.lessons.length;
  var done = path.lessons.filter(function(l){ return isLessonDone(l.id); }).length;
  return { total: total, done: done, pct: total ? Math.round((done/total)*100) : 0 };
}

/* ═══════════════════════════════════════
   RENDER — Learning Paths list
   ═══════════════════════════════════════ */
function learnIsEn(){
  return (typeof getLang === "function" && getLang() === "en");
}
function learnText(fa, en){
  return learnIsEn() && en ? en : (fa || en || "");
}

function renderLearnPaths(){
  var el = document.getElementById("learnPathsGrid");
  if(!el) return;
  el.innerHTML = LEARNING_PATHS.map(function(p, i){
    var prog = getPathProgress(p);
    return '<button class="learn-card" style="background:linear-gradient(145deg,' + p.c1 + ' 0%,' + p.c2 + ' 100%);animation-delay:' + (i*.05) + 's" '
      + 'onclick="openLearnPath(\'' + p.id + '\')">'
      + '<div class="learn-card-top">'
      +   '<div class="learn-card-icon">' + (ICONS[p.icon] || ICONS.book) + '</div>'
      +   '<div class="learn-card-prog">' + fa(prog.done) + '/' + fa(prog.total) + '</div>'
      + '</div>'
      + '<div class="learn-card-body">'
      +   '<div class="learn-card-title">' + learnText(p.title, p.titleEn) + '</div>'
      +   '<div class="learn-card-sub">' + learnText(p.subtitle, p.subtitleEn) + '</div>'
      +   '<div class="learn-card-meta">'
      +     '<span>' + p.level + '</span>'
      +     '<span>·</span>'
      +     '<span>' + p.duration + '</span>'
      +   '</div>'
      + '</div>'
      + '<div class="learn-card-bar">'
      +   '<div class="learn-card-fill" style="width:' + prog.pct + '%"></div>'
      + '</div>'
      + '</button>';
  }).join("");
}

/* ═══════════════════════════════════════
   OPEN PATH — Sheet with lessons
   ═══════════════════════════════════════ */
function openLearnPath(pathId){
  var p = LEARNING_PATHS.find(function(x){ return x.id === pathId; });
  if(!p) return;
  learnCurrentPath = p;

  var sheet = document.getElementById("learnSheet");
  var backdrop = document.getElementById("learnSheetBackdrop");
  var title = document.getElementById("learnSheetTitle");
  if(!sheet || !backdrop) return;
  if(title) title.textContent = learnText(p.title, p.titleEn);

  renderLearnLessons();
  backdrop.classList.add("show");
  sheet.classList.add("show");
  if(navigator.vibrate) navigator.vibrate(8);
}

function closeLearnSheet(){
  var sheet = document.getElementById("learnSheet");
  var backdrop = document.getElementById("learnSheetBackdrop");
  if(sheet) sheet.classList.remove("show");
  if(backdrop) backdrop.classList.remove("show");
  learnCurrentPath = null;
  learnCurrentLesson = null;
  renderLearnPaths();
}

function renderLearnLessons(){
  if(!learnCurrentPath) return;
  var body = document.getElementById("learnSheetBody");
  if(!body) return;
  var p = learnCurrentPath;
  var prog = getPathProgress(p);

  var header = '<div class="learn-sheet-header" style="background:linear-gradient(145deg,' + p.c1 + ' 0%,' + p.c2 + ' 100%)">'
    + '<div class="learn-sheet-header-title">' + learnText(p.title, p.titleEn) + '</div>'
    + '<div class="learn-sheet-header-sub">' + learnText(p.subtitle, p.subtitleEn) + '</div>'
    + '<div class="learn-sheet-header-prog">'
    +   '<div class="learn-sheet-header-bar"><div class="learn-sheet-header-fill" style="width:' + prog.pct + '%"></div></div>'
    +   '<div class="learn-sheet-header-txt">' + fa(prog.done) + ' از ' + fa(prog.total) + ' درس انجام شده</div>'
    + '</div>'
    + '</div>';

  var lessons = '<div class="learn-lessons">'
    + p.lessons.map(function(l, i){
      var done = isLessonDone(l.id);
      return '<button class="learn-lesson ' + (done ? 'done' : '') + '" onclick="openLearnLesson(\'' + l.id + '\')">'
        + '<div class="learn-lesson-num">' + (done ? '✓' : fa(i+1)) + '</div>'
        + '<div class="learn-lesson-body">'
        +   '<div class="learn-lesson-title">' + learnText(l.title, l.titleEn) + '</div>'
        +   '<div class="learn-lesson-sum">' + l.summary + '</div>'
        +   '<div class="learn-lesson-meta">' + l.duration + '</div>'
        + '</div>'
        + '<div class="learn-lesson-chev">'
        +   '<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="2 2 6 7 2 12"/></svg>'
        + '</div>'
        + '</button>';
    }).join("")
    + '</div>';

  body.innerHTML = header + lessons;
  body.scrollTop = 0;
}

/* ═══════════════════════════════════════
   OPEN LESSON — Detail view
   ═══════════════════════════════════════ */
function openLearnLesson(lessonId){
  if(!learnCurrentPath) return;
  var l = learnCurrentPath.lessons.find(function(x){ return x.id === lessonId; });
  if(!l) return;
  learnCurrentLesson = l;

  var body = document.getElementById("learnSheetBody");
  var title = document.getElementById("learnSheetTitle");
  if(!body) return;
  if(title) title.textContent = learnText(l.title, l.titleEn);

  var done = isLessonDone(l.id);
  var relatedManuals = (l.manuals || []).map(function(mid){
    var m = MANUALS.find(function(x){ return x.id === mid; });
    return m ? { id: m.id, code: m.code, title: m.title } : null;
  }).filter(Boolean);

  body.innerHTML =
    '<div class="learn-lesson-detail">'
    +   '<div class="learn-lesson-hero">'
    +     '<div class="learn-lesson-hero-meta">' + l.duration + '</div>'
    +     '<div class="learn-lesson-hero-title">' + learnText(l.title, l.titleEn) + '</div>'
    +     '<div class="learn-lesson-hero-sum">' + l.summary + '</div>'
    +   '</div>'

    +   '<div class="learn-section-title">' + ((typeof i18n==="function")?i18n("learn_key_points","نکات کلیدی"):"نکات کلیدی") + '</div>'
    +   '<div class="learn-points">'
    +     l.points.map(function(pt){
          return '<div class="learn-point"><span class="learn-point-dot"></span>' + pt + '</div>';
        }).join("")
    +   '</div>'

    +   (relatedManuals.length ?
          '<div class="learn-section-title">' + ((typeof i18n==="function")?i18n("learn_related","منوال‌های مرتبط"):"منوال‌های مرتبط") + '</div>'
        + '<div class="learn-manuals">'
        +   relatedManuals.map(function(m){
              return '<button class="learn-manual-btn" onclick="closeLearnSheet(); openManual(\'' + m.id + '\')">'
                + '<span class="learn-manual-code">' + m.code + '</span>'
                + '<span class="learn-manual-title">' + m.title + '</span>'
                + '</button>';
            }).join("")
        + '</div>'
        : '')

    +   '<div class="learn-actions">'
    +     '<button class="learn-action-btn ' + (done ? 'done' : 'primary') + '" onclick="toggleLearnLesson(\'' + l.id + '\')">'
    +       (done ? '✓ خوانده شده — لغو' : 'علامت‌گذاری خوانده شد')
    +     '</button>'
    +   '</div>'
    + '</div>';

  body.scrollTop = 0;
}

function toggleLearnLesson(lessonId){
  if(isLessonDone(lessonId)){
    unmarkLesson(lessonId);
    if(typeof toast === "function") toast("لغو شد");
  } else {
    markLessonDone(lessonId);
    if(typeof toast === "function") toast("✓ خوانده شد");
  }
  openLearnLesson(lessonId);
}

function learnBack(){
  if(learnCurrentLesson){
    learnCurrentLesson = null;
    var title = document.getElementById("learnSheetTitle");
    if(title && learnCurrentPath) title.textContent = learnCurrentPath.title;
    renderLearnLessons();
  } else {
    closeLearnSheet();
  }
}

/* ═══ Export ═══ */
window.renderLearnPaths = renderLearnPaths;
window.openLearnPath = openLearnPath;
window.openLearnLesson = openLearnLesson;
window.toggleLearnLesson = toggleLearnLesson;
window.closeLearnSheet = closeLearnSheet;
window.learnBack = learnBack;

console.log("✅ learn.js loaded — " + LEARNING_PATHS.length + " paths");