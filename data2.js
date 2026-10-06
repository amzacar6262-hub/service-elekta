/* ═══════════════════════════════════════════════════
   data2.js — فاز ۲: محتوای تخصصی اضافه
   شامل: XVI، iViewGT، SBRT، In-Vivo، RPM، Brachy، ARIA
   ═══════════════════════════════════════════════════ */

const CATS2 = [
  {id:"sbrt",    name:"SBRT و SRS",       c1:"#FF2D55", c2:"#AF52DE", icon:"target"},
  {id:"invivo",  name:"دزیمتری In-Vivo",  c1:"#30D158", c2:"#248A3D", icon:"check"},
  {id:"aria",    name:"ARIA و شبکه",      c1:"#64D2FF", c2:"#0A84FF", icon:"cam"},
  {id:"brachy",  name:"Brachytherapy",    c1:"#FF9F0A", c2:"#C93400", icon:"warn"}
];

const MANUALS2 = [
/* ══════ SBRT / SRS ══════ */
{id:"sb1",title:"QA روزانه SBRT — Position و Isocenter",cat:"sbrt",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-01",duration:"۳۰ دقیقه",level:"پیشرفته",
 summary:"چک‌لیست روزانه SBRT شامل بررسی دقت Isocenter، موقعیت‌یابی ۶DoF و دقت تصویربرداری CBCT در حد زیر میلی‌متر.",
 warn:"SBRT نیازمند دقت زیر ۱mm است — هر انحراف باید گزارش شود.",
 tools:["فانتوم Winston-Lutz","فانتوم 6DoF","فیلم EBT3"],
 steps:[
   {t:"بررسی دمای اتاق و Warm-up دستگاه"},
   {t:"اجرای Winston-Lutz Test با فانتوم",note:"انحراف مجاز زیر ۱mm",level:"warn"},
   {t:"تصویربرداری CBCT و بررسی دقت Isocenter با Marker"},
   {t:"بررسی دقت HexaPOD با فانتوم 6DoF",note:"زیر ۱mm و ۱°"},
   {t:"تست موقعیت میز در همه محورها"},
   {t:"بررسی دقت تصویربرداری kV و CBCT",level:"warn"},
   {t:"بررسی دقت سیستم Respiratory Gating در صورت استفاده"},
   {t:"ثبت در فرم QA روزانه SBRT"}
 ]},
{id:"sb2",title:"Patient-specific QA برای SBRT",cat:"sbrt",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-02",duration:"۲ ساعت",level:"پیشرفته",
 summary:"QA اختصاصی بیمار برای هر پلن SBRT شامل تأیید دز با فانتوم ArcCHECK یا Delta4.",
 warn:"هیچ درمان SBRT نباید بدون QA بیمار-اختصاصی انجام شود.",
 tools:["فانتوم ArcCHECK یا Delta4","نرم‌افزار تحلیل","پلن بیمار"],
 steps:[
   {t:"دریافت پلن از TPS و انتقال به دستگاه"},
   {t:"راه‌اندازی فانتوم ArcCHECK در Isocenter"},
   {t:"اجرای پلن SBRT روی فانتوم"},
   {t:"تحلیل نتایج با معیارهای Gamma",note:"۳٪ / ۲mm با ۹۵٪ عبور",level:"warn"},
   {t:"در صورت رد، بازبینی پلن یا کالیبراسیون"},
   {t:"ثبت نتایج و تأیید فیزیک‌دان"},
   {t:"آرشیو گزارش QA در پرونده بیمار"}
 ]},
{id:"sb3",title:"راه‌اندازی BodyFix و Stereotactic Frame",cat:"sbrt",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-SETUP-01",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"رویه Immobilization بیمار SBRT با BodyFix و Stereotactic Frame برای دقت بالا.",
 tools:["BodyFix","Stereotactic Frame","شاخص‌های MRI-compatible"],
 steps:[
   {t:"آماده‌سازی BodyFix و بررسی سالم بودن"},
   {t:"قرارگیری بیمار و تخلیه هوای BodyFix",note:"فشار منفی باید حفظ شود."},
   {t:"نصب Stereotactic Frame در صورت نیاز"},
   {t:"CT شبیه‌سازی با پروتکل SBRT"},
   {t:"انتقال به اتاق درمان و تنظیم با HexaPOD"},
   {t:"بررسی تطابق با CBCT",level:"warn"},
   {t:"تصحیح ۶DoF در صورت نیاز"},
   {t:"ثبت موقعیت نهایی در پرونده"}
 ]},

/* ══════ In-Vivo Dosimetry ══════ */
{id:"iv1",title:"راه‌اندازی دزیمتری In-Vivo با Diode EDP",cat:"invivo",machines:["Synergy","Infinity","Versa HD"],code:"IVD-001",duration:"۶۰ دقیقه",level:"پیشرفته",
 summary:"راه‌اندازی سیستم In-Vivo Dosimetry با Diodeهای EDP برای اندازه‌گیری دز ورودی بیمار در حین درمان.",
 tools:["Diode EDP","Electrometer","کالیبراسیون فانتوم"],
 steps:[
   {t:"بررسی کالیبراسیون Diodeها — هر ۲ سال"},
   {t:"اتصال EDP به Electrometer"},
   {t:"کالیبراسیون با فانتوم آب در شرایط مرجع"},
   {t:"تعیین ضریب تصحیح دمایی"},
   {t:"تعیین ضریب تصحیح Field Size",note:"برای میدان‌های مختلف"},
   {t:"تعیین ضریب تصحیح SSD",level:"warn"},
   {t:"نصب Diode روی پوست بیمار در اولین جلسه"},
   {t:"مقایسه دز اندازه‌گیری با دز TPS",note:"انحراف مجاز زیر ۵٪",level:"warn"}
 ]},
{id:"iv2",title:"QA ماهانه سیستم In-Vivo EDP",cat:"invivo",machines:["Synergy","Infinity"],code:"IVD-002",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"QA ماهانه Diodeها و Electrometer شامل بررسی پایداری، دقت و کالیبراسیون مجدد.",
 tools:["فانتوم آب","اتاقک Farmer مرجع","Diode EDP"],
 steps:[
   {t:"بررسی فیزیکی Diodeها — بدون آسیب"},
   {t:"تست اتصال و بررسی نویز Electrometer"},
   {t:"تابش ۱۰۰ MU در شرایط مرجع"},
   {t:"مقایسه با اتاقک Farmer",note:"انحراف زیر ۳٪",level:"warn"},
   {t:"بررسی Reproducibility با تکرار ۳ بار"},
   {t:"تست پایداری در ۳۰ دقیقه"},
   {t:"ثبت نتایج و مقایسه با ماه قبل"}
 ]},

/* ══════ ARIA / MOSAIQ / شبکه ══════ */
{id:"ar1",title:"راه‌اندازی ARIA Connectivity با Synergy",cat:"aria",machines:["Synergy","Infinity"],code:"ARIA-001",duration:"۴ ساعت",level:"پیشرفته",
 summary:"پیکربندی اتصال ARIA Oncology Information System به دستگاه‌های Synergy و Infinity برای تبادل اطلاعات بیمار.",
 warn:"این رویه نیازمند هماهنگی با تیم IT و Varian/Elekta Service است.",
 tools:["دسترسی Admin ARIA","دسترسی Service دستگاه","اطلاعات شبکه"],
 steps:[
   {t:"بررسی پیش‌نیازهای شبکه — VLAN، IP، پورت‌ها"},
   {t:"نصب ARIA Service روی سرور"},
   {t:"پیکربندی DICOM در ARIA"},
   {t:"پیکربندی DICOM در دستگاه"},
   {t:"تست ارسال و دریافت CT و RT Plan",level:"warn"},
   {t:"تست Connectivity از دستگاه به ARIA"},
   {t:"پیکربندی Worklist برای دریافت بیماران"},
   {t:"تست ارسال Treatment Record به ARIA"},
   {t:"پیکربندی Schedule و Patient Chart"},
   {t:"آموزش کاربران و انتقال به Production"}
 ]},
{id:"ar2",title:"عیب‌یابی DICOM Transfer Failure",cat:"aria",machines:["Synergy","Infinity"],code:"ARIA-TRB-01",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای ارسال/دریافت DICOM بین دستگاه و ARIA یا PACS.",
 tools:["ابزار DICOM Ping","لاگ ARIA","لاگ دستگاه"],
 steps:[
   {t:"بررسی ارتباط شبکه — Ping بین دستگاه و سرور"},
   {t:"بررسی وضعیت سرویس DICOM در دستگاه"},
   {t:"بررسی AE Title مطابقت"},
   {t:"بررسی پورت DICOM (معمولاً 104 یا 2762)"},
   {t:"تست ارسال با DICOM Echo"},
   {t:"بررسی فضای دیسک ARIA",level:"warn"},
   {t:"ری‌استارت سرویس DICOM"},
   {t:"تست مجدد ارسال"}
 ]},
{id:"ar3",title:"پیکربندی و QA سیستم Record & Verify",cat:"aria",machines:["Synergy","Infinity","Versa HD"],code:"ARIA-002",duration:"۹۰ دقیقه",level:"متوسط",
 summary:"QA سیستم Record & Verify (R&V) شامل صحت اطلاعات بیمار، پارامترهای درمان و ثبت خودکار.",
 tools:["دسترسی فیزیک‌دان","چک‌لیست R&V"],
 steps:[
   {t:"تست ورود اطلاعات بیمار به ARIA"},
   {t:"تست انتقال Patient به دستگاه"},
   {t:"بررسی صحت پارامترهای درمان در دستگاه"},
   {t:"تست In-vivo Recording در حین درمان فانتوم"},
   {t:"تست مقایسه پارامترهای Set با Actual"},
   {t:"بررسی هشدارهای R&V در صورت انحراف",level:"warn"},
   {t:"تست Sign-off و تأیید درمان"},
   {t:"بررسی Report نهایی درمان"}
 ]},

/* ══════ Brachytherapy ══════ */
{id:"br1",title:"QA روزانه Brachytherapy Flexitron",cat:"brachy",machines:["Flexitron"],code:"BRACHY-001",duration:"۳۰ دقیقه",level:"پیشرفته",
 summary:"چک‌لیست روزانه دستگاه Brachytherapy Flexitron شامل بررسی منبع، کانال‌ها و ایمنی.",
 warn:"در صورت هر گونه نقص در منبع یا کابل، درمان باید متوقف شود.",
 tools:["چک‌لیست روزانه Flexitron","Well Chamber","Timer"],
 steps:[
   {t:"بررسی وضعیت منبع Ir-192 در Safe"},
   {t:"بررسی Indicatorهای روی پنل"},
   {t:"تست Emergency Retract"},
   {t:"اندازه‌گیری فعالیت منبع با Well Chamber",note:"انحراف زیر ۳٪",level:"warn"},
   {t:"تست موقعیت Transfer Tubes"},
   {t:"بررسی عملکرد Indexer"},
   {t:"تست Door Interlock و Radiation Monitor"},
   {t:"ثبت در دفتر QA"}
 ]},
{id:"br2",title:"QA ماهانه Brachytherapy — Source Position",cat:"brachy",machines:["Flexitron"],code:"BRACHY-002",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"QA ماهانه دقت موقعیت منبع شامل طول کابل، موقعیت Step و دقت Indexer.",
 tools:["فانتوم QA Brachy","فیلم GafChromic","اسکنر"],
 steps:[
   {t:"راه‌اندازی فانتوم QA Brachy"},
   {t:"اجرای برنامه Step Position"},
   {t:"تصویرگیری با فیلم GafChromic"},
   {t:"تحلیل موقعیت منبع در هر Step",note:"انحراف مجاز زیر ۱mm",level:"warn"},
   {t:"بررسی دقت Timer — باید زیر ۱٪ باشد"},
   {t:"تست Reproducibility با تکرار"},
   {t:"بررسی دزیمتری Source Strength"},
   {t:"ثبت در فرم QA ماهانه"}
 ]},
{id:"br3",title:"تعویض منبع Ir-192 Brachytherapy",cat:"brachy",machines:["Flexitron"],code:"BRACHY-REP-01",duration:"۲ ساعت",level:"پیشرفته",
 summary:"رویه تعویض منبع Ir-192 که معمولاً هر ۳-۴ ماه یا در صورت افت فعالیت انجام می‌شود.",
 warn:"تعویض منبع نیازمند مجوز و حضور Radiation Safety Officer است.",
 tools:["کیت تعویض منبع","Survey Meter","دستکش سربی","شیلد"],
 steps:[
   {t:"هماهنگی با RSO و بررسی مجوزها"},
   {t:"بررسی فعالیت منبع قدیمی و جدید"},
   {t:"انتقال منبع قدیمی به Safe Storage"},
   {t:"نصب منبع جدید طبق رویه Elekta",level:"danger",note:"رعایت کامل دوزیمتری فردی"},
   {t:"تست Safe Position و Sensorهای ایمنی"},
   {t:"اندازه‌گیری فعالیت منبع جدید"},
   {t:"اجرای QA روزانه و ماهانه"},
   {t:"ثبت شماره سریال منبع در دفتر"}
 ]},
{id:"br4",title:"QA پلن Brachytherapy با Oncentra",cat:"brachy",machines:["Flexitron","Oncentra"],code:"BRACHY-QA-01",duration:"۶۰ دقیقه",level:"پیشرفته",
 summary:"QA پلن Brachytherapy شامل بررسی موقعیت Applicator، بازسازی و دز محاسبه‌شده.",
 tools:["نرم‌افزار Oncentra","CT","فیلم QA"],
 steps:[
   {t:"ورود CT بیمار به Oncentra"},
   {t:"تعریف Applicator و کانال‌ها"},
   {t:"بازسازی (Reconstruction) موقعیت Applicator"},
   {t:"بهینه‌سازی پلن درمان"},
   {t:"بررسی مقادیر دز در نقاط مرجع (Point A, B و…)","level":"warn"},
   {t:"بررسی DVH اندام‌های حساس"},
   {t:"تأیید فیزیک‌دان"},
   {t:"ارسال پلن به دستگاه"}
 ]},

/* ══════ RPM — Respiratory Gating ══════ */
{id:"rp1",title:"راه‌اندازی RPM برای Respiratory Gating",cat:"sbrt",machines:["Synergy","Infinity","Versa HD"],code:"RPM-001",duration:"۹۰ دقیقه",level:"متوسط",
 summary:"راه‌اندازی سیستم RPM (Real-time Position Management) برای درمان بیماران با حرکت تنفسی.",
 tools:["دوربین RPM","Marker Block","نرم‌افزار RPM"],
 steps:[
   {t:"بررسی نصب دوربین RPM و زاویه دید"},
   {t:"روشن کردن نرم‌افزار RPM"},
   {t:"بررسی Marker Block — بازتاب IR"},
   {t:"کالیبراسیون Baseline با Marker در Isocenter"},
   {t:"تنظیم Gating Threshold و Phase"},
   {t:"تست با بیمار شبیه‌سازی شده"},
   {t:"آموزش بیمار برای تنفس منظم"},
   {t:"بررسی تطابق بین Gate و Beam On",level:"warn"}
 ]},
{id:"rp2",title:"QA ماهانه RPM",cat:"sbrt",machines:["Synergy","Infinity"],code:"RPM-QA-01",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"QA ماهانه RPM شامل بررسی دقت موقعیت Marker، Latency و تطابق با Beam.",
 tools:["فانتوم RPM","چک‌لیست RPM"],
 steps:[
   {t:"تست دقت موقعیت Marker در ۵ نقطه"},
   {t:"اندازه‌گیری Latency سیستم",note:"باید زیر ۱۰۰ms باشد",level:"warn"},
   {t:"تست Threshold Detection"},
   {t:"تست Phase-Based Gating"},
   {t:"بررسی نرم‌افزار و به‌روزرسانی"},
   {t:"تست ارتباط با دستگاه"},
   {t:"ثبت در فرم QA"}
 ]},
{id:"rp3",title:"QA روزانه RPM قبل از درمان",cat:"sbrt",machines:["Synergy","Infinity"],code:"RPM-QA-02",duration:"۱۰ دقیقه",level:"پایه",
 summary:"بررسی سریع RPM قبل از هر جلسه درمان Gated.",
 tools:["Marker Block"],
 steps:[
   {t:"بررسی روشن بودن دوربین RPM"},
   {t:"بررسی Marker Block سالم"},
   {t:"تست Live Signal — نمایش موج تنفس"},
   {t:"بررسی دقت Baseline"},
   {t:"بررسی Gate Signal — سبز/قرمز"},
   {t:"در صورت مشکل، کالیبراسیون سریع"}
 ]},

/* ══════ XVI — تکمیلی ══════ */
{id:"x1",title:"راه‌اندازی XVI برای CBCT بیمار",cat:"imaging",machines:["Synergy","Infinity"],code:"XVI-SETUP-01",duration:"۲۰ دقیقه",level:"متوسط",
 summary:"رویه استاندارد راه‌اندازی XVI برای تصویربرداری CBCT بیمار قبل از درمان.",
 tools:["XVI System"],
 steps:[
   {t:"بررسی روشن بودن XVI"},
   {t:"انتخاب پروتکل CBCT مناسب (Pelvis, Head, Thorax…)"},
   {t:"تنظیم پارامترها — kV، mAs، Arc"},
   {t:"قرارگیری بیمار و Setup اولیه با لیزر"},
   {t:"اجرای اسکن CBCT"},
   {t:"بازبینی تصویر و Match با CT Ref",level:"warn"},
   {t:"تصحیح موقعیت با HexaPOD در صورت لزوم"},
   {t:"ذخیره Match و ارسال به R&V"}
 ]},
{id:"x2",title:"عیب‌یابی خطاهای XVI Reconstruction",cat:"imaging",machines:["Synergy","Infinity"],code:"XVI-TRB-02",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای بازسازی تصویر XVI شامل Reconstruction Failure، Ring Artifact و Metal Artifact.",
 tools:["نرم‌افزار XVI Service","فانتوم CatPhan","لاگ سیستم"],
 steps:[
   {t:"ثبت کد خطا از XVI Log"},
   {t:"بررسی کیفیت Projection Raw"},
   {t:"بررسی کالیبراسیون Dark و Gain"},
   {t:"بررسی FlexMap — انقضا نکرده باشد",level:"warn"},
   {t:"اجرای Reconstruction با پروتکل متفاوت"},
   {t:"بررسی پردازشگر تصویر و CPU"},
   {t:"در صورت Metal Artifact، تنظیم MAR"},
   {t:"تست با فانتوم CatPhan پس از رفع"}
 ]},

/* ══════ Electron Beam ══════ */
{id:"eb1",title:"QA Electron Beam — Energy و Output",cat:"calib",machines:["Synergy","Infinity","Versa HD"],code:"EB-QA-01",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"QA ماهانه پرتوهای الکترون شامل انرژی، خروجی و پروفایل برای انرژی‌های ۶ تا ۲۰ MeV.",
 tools:["فانتوم آب","اتاقک Parallel-Plate","الکترومتر"],
 steps:[
   {t:"کالیبراسیون خروجی الکترون با اتاقک Parallel-Plate",note:"مرجع: ۱۰۰ cGy",level:"warn"},
   {t:"اندازه‌گیری R90 برای تعیین انرژی"},
   {t:"اندازه‌گیری R50 برای تأیید انرژی"},
   {t:"بررسی PDD در انرژی‌های مختلف"},
   {t:"بررسی پروفایل عرضی در dmax"},
   {t:"بررسی Flatness و Symmetry",note:"زیر ۳٪"},
   {t:"تکرار برای ۶، ۹، ۱۲، ۱۵، ۱۸ و ۲۰ MeV"},
   {t:"ثبت در فرم QA"}
 ]},
{id:"eb2",title:"تعویض Cone الکترون دستگاه خطی",cat:"replace",machines:["Synergy","Infinity"],code:"EB-REP-01",duration:"۲ ساعت",level:"متوسط",
 summary:"تعویض Cone الکترون در صورت آسیب یا درخواست پروتکل متفاوت.",
 tools:["دستکش","پیچ‌گوشتی Torx"],
 steps:[
   {t:"خاموشی و باز کردن Cone قدیمی"},
   {t:"بررسی عدم آسیب به سایر Coneها"},
   {t:"نصب Cone جدید با Check Alignment"},
   {t:"اجرای QA Electron Beam پس از نصب",level:"warn"},
   {t:"کالیبراسیون مجدد در صورت نیاز"},
   {t:"تست بیمار فانتوم"}
 ]},

/* ══════ Annual QA ══════ */
{id:"an1",title:"QA سالانه جامع Linac",cat:"calib",machines:["Synergy","Infinity","Versa HD"],code:"ANNUAL-001",duration:"۲ روز",level:"پیشرفته",
 summary:"QA سالانه جامع شامل تمام تست‌های مکانیکی، دزیمتری و ایمنی طبق پروتکل AAPM TG-142.",
 warn:"QA سالانه نیازمند هماهنگی با فیزیک‌دان و تعطیلی موقت دستگاه است.",
 tools:["تمام ابزارهای QA","چک‌لیست TG-142","تیم کامل"],
 steps:[
   {t:"روز ۱: تست‌های مکانیکی جامع (Isocenter, Gantry, Collimator, Couch)"},
   {t:"روز ۱: تست Imaging (kV, CBCT, EPID)"},
   {t:"روز ۱: تست ایمنی کامل (اینترلاک‌ها، Emergency)"},
   {t:"روز ۲: QA دزیمتری جامع همه انرژی‌ها"},
   {t:"روز ۲: QA MLC و IMRT/VMAT"},
   {t:"روز ۲: کالیبراسیون‌های جزئی در صورت نیاز"},
   {t:"مقایسه با Baseline و به‌روزرسانی"},
   {t:"تهیه گزارش رسمی و ارسال به فیزیک‌دان مسئول"}
 ]},
{id:"an2",title:"QA سالانه Electron Beam",cat:"calib",machines:["Synergy","Infinity"],code:"ANNUAL-002",duration:"۴ ساعت",level:"پیشرفته",
 summary:"QA سالانه اختصاصی پرتوهای الکترون شامل همه انرژی‌ها، Coneها و بررسی عمیق PDD.",
 tools:["فانتوم آب","اتاقک Parallel-Plate","فانتوم ترکیبی"],
 steps:[
   {t:"اندازه‌گیری خروجی همه انرژی‌ها"},
   {t:"اندازه‌گیری PDD کامل برای هر انرژی"},
   {t:"بررسی کیفیت پرتو (R50, R90, R10)"},
   {t:"بررسی پروفایل عرضی در dmax و عمق‌های میانی"},
   {t:"بررسی Applicator Factor برای همه Coneها"},
   {t:"بررسی صحت مدل TPS با فانتوم پیچیده"},
   {t:"گزارش نهایی"}
 ]}
];

const ERRORS2 = [
/* ─── Brachytherapy ─── */
{code:"BRA-001",sev:"red",machine:"Flexitron",title:"Source Stuck در Cable",act:"Manual Retract با ابزار اضطراری"},
{code:"BRA-002",sev:"orange",machine:"Flexitron",title:"Indexer Error",act:"بررسی کانال و Reset"},
{code:"BRA-003",sev:"red",machine:"Flexitron",title:"Door Interlock Failure",act:"توقف فوری — بررسی میکروسوئیچ"},
{code:"BRA-004",sev:"orange",machine:"Flexitron",title:"Timer Mismatch",act:"کالیبراسیون Timer"},
{code:"BRA-005",sev:"blue",machine:"Flexitron",title:"Source Decay Warning",act:"برنامه‌ریزی تعویض منبع"},

/* ─── SBRT و HexaPOD ─── */
{code:"SBRT-001",sev:"red",machine:"Synergy / Infinity",title:"HexaPOD Communication Lost",act:"بررسی کابل و ری‌استارت"},
{code:"SBRT-002",sev:"orange",machine:"Synergy / Infinity",title:"HexaPOD Out of Range",act:"Reset موقعیت"},
{code:"SBRT-003",sev:"red",machine:"Synergy / Infinity",title:"Winston-Lutz Failed",act:"توقف SBRT — بررسی Isocenter"},
{code:"SBRT-004",sev:"orange",machine:"Synergy / Infinity",title:"6DoF Couch Calibration Drift",act:"کالیبراسیون مجدد HexaPOD"},

/* ─── In-Vivo ─── */
{code:"IVD-001",sev:"orange",machine:"همه Linacها",title:"In-Vivo Dose Deviation >5%",act:"بررسی Diode و پلن درمان"},
{code:"IVD-002",sev:"blue",machine:"همه Linacها",title:"Diode Calibration Expired",act:"کالیبراسیون Diode"},
{code:"IVD-003",sev:"orange",machine:"همه Linacها",title:"Electrometer Noise High",act:"بررسی اتصالات و کابل‌ها"},

/* ─── ARIA ─── */
{code:"ARIA-001",sev:"red",machine:"همه Linacها",title:"ARIA Connection Lost",act:"بررسی شبکه و سرویس DICOM"},
{code:"ARIA-002",sev:"orange",machine:"همه Linacها",title:"DICOM Transfer Failed",act:"بررسی AE Title و پورت"},
{code:"ARIA-003",sev:"orange",machine:"همه Linacها",title:"Worklist Sync Error",act:"بررسی سرویس Worklist"},
{code:"ARIA-004",sev:"blue",machine:"همه Linacها",title:"ARIA License Warning",act:"بررسی لایسنس"},
{code:"ARIA-005",sev:"red",machine:"همه Linacها",title:"Patient Data Mismatch",act:"توقف درمان — بررسی R&V"},

/* ─── RPM ─── */
{code:"RPM-001",sev:"orange",machine:"Synergy / Infinity",title:"Marker Block Signal Lost",act:"بررسی Marker و دوربین"},
{code:"RPM-002",sev:"red",machine:"Synergy / Infinity",title:"Gating Signal Failure",act:"توقف Gated Therapy"},
{code:"RPM-003",sev:"blue",machine:"Synergy / Infinity",title:"RPM Calibration Drift",act:"کالیبراسیون Baseline"},

/* ─── XVI Additional ─── */
{code:"XVI-010",sev:"orange",machine:"Synergy / Infinity",title:"Ring Artifact Detected",act:"کالیبراسیون Dark و Gain"},
{code:"XVI-011",sev:"orange",machine:"Synergy / Infinity",title:"Metal Artifact High",act:"فعال‌سازی MAR در Reconstruction"},
{code:"XVI-012",sev:"red",machine:"Synergy / Infinity",title:"XVI Panel Communication",act:"بررسی اتصالات Flat Panel"}
];

/* Merge helper — در app.js صدا زده می‌شود */
function mergePhase2(){
  if(typeof CATS !== 'undefined'){
    CATS.push(...CATS2);
  }
  if(typeof MANUALS !== 'undefined'){
    MANUALS.push(...MANUALS2);
  }
  if(typeof ERRORS !== 'undefined'){
    ERRORS.push(...ERRORS2);
  }
}
mergePhase2();