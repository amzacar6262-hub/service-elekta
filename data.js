/* ═══════════════════════════════════════════════════
   پایگاه داده سرویس الکتا — نسخه ۳.۰
   تمرکز: Synergy & Infinity
   ═══════════════════════════════════════════════════ */

const CATS = [
  {id:"daily",   name:"QA روزانه",     c1:"#FF9F0A", c2:"#FF6B00", icon:"check"},
  {id:"weekly",  name:"QA هفتگی",      c1:"#5AC8FA", c2:"#0A84FF", icon:"cal"},
  {id:"monthly", name:"QA ماهانه",     c1:"#BF5AF2", c2:"#5856D6", icon:"clock"},
  {id:"mlc",     name:"MLC و کولیما",  c1:"#FF375F", c2:"#AF52DE", icon:"grid"},
  {id:"calib",   name:"کالیبراسیون",   c1:"#FFD60A", c2:"#FF9500", icon:"target"},
  {id:"imaging", name:"تصویربرداری",   c1:"#00C7BE", c2:"#30B0C7", icon:"cam"},
  {id:"replace", name:"تعویض قطعات",   c1:"#32D74B", c2:"#28A745", icon:"wrench"},
  {id:"trouble", name:"عیب‌یابی",      c1:"#FF453A", c2:"#D70015", icon:"warn"},
  {id:"synergy", name:"اختصاصی Synergy", c1:"#5E5CE6", c2:"#3634A3", icon:"star"},
  {id:"infinity",name:"اختصاصی Infinity", c1:"#FF6482", c2:"#D30F45", icon:"star"}
];

const MANUALS = [
/* ══════ SYNERGY SPECIFIC ══════ */
{id:"s1",title:"کالیبراسیون MLCi2 سیستم Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-MLC-01",duration:"۲.۵ ساعت",level:"پیشرفته",
 summary:"رویه کامل کالیبراسیون MLCi2 (نسل قبل از Agility) شامل تنظیم صفر مکانیکی، کالیبراسیون Encoder و بررسی Backlash هر Leaf.",
 warn:"قبل از شروع، MLC را در وضعیت Home قرار دهید و از تنظیمات فعلی Backup بگیرید.",
 tools:["فانتوم Picket Fence","فیلم EBT3","آچار تنظیم MLC","نرم‌افزار MLC Service"],
 steps:[
   {t:"ورود به Service Mode → MLC → Calibration"},
   {t:"اجرای رویه Auto-Home و ثبت موقعیت صفر",note:"موقعیت صفر باید برای هر ۸۰ Leaf ثبت شود."},
   {t:"تنظیم مکانیکی Leaf 1 و Leaf 80 (انتهای بانک)",level:"warn"},
   {t:"کالیبراسیون Encoder هر Leaf با تست حرکت تکی"},
   {t:"تست Backlash — اختلاف موقعیت در رفت و برگشت",note:"مقدار مجاز زیر ۰.۳mm"},
   {t:"اجرای تست Picket Fence با فیلم EBT3"},
   {t:"تحلیل فیلم و اعمال اصلاحات در نرم‌افزار"},
   {t:"اجرای تست IMRT با فانتوم Matrixx",note:"انحراف مجاز ۳٪ / ۳mm"},
   {t:"ذخیره کالیبراسیون و اجرای QA نهایی"}
 ]},
{id:"s2",title:"تعویض MLCi2 Motor یک Leaf",cat:"synergy",machines:["Synergy"],code:"SYN-MLC-02",duration:"۳ ساعت",level:"پیشرفته",
 summary:"رویه تعویض موتور یک Leaf از MLCi2 که معمولاً به دلیل خطای موقعیت یا صدای غیرعادی انجام می‌شود.",
 warn:"قبل از شروع، برق درایو MLC را قطع کنید و برچسب روی کابل‌ها بزنید.",
 tools:["دستکش ESD","پیچ‌گوشتی Torx T10","آچار ۵.۵","گریس MLC Original Elekta"],
 steps:[
   {t:"خاموشی سیستم MLC و باز کردن پنل بالا"},
   {t:"برچسب‌گذاری کابل‌های Motor و Encoder Leaf مورد نظر"},
   {t:"جدا کردن کابل‌ها و باز کردن پیچ‌های نگه‌دارنده Motor",note:"حدود ۴ پیچ T10"},
   {t:"خارج کردن Motor و بررسی چرخ‌دنده آن"},
   {t:"نصب Motor جدید و اتصال کابل‌ها"},
   {t:"اجرای Auto-Home و کالیبراسیون Leaf"},
   {t:"تست عملکرد Leaf در کل رنج حرکت"},
   {t:"اجرای Picket Fence برای تأیید"}
 ]},
{id:"s3",title:"عیب‌یابی خطای MLCi2 Motor Current",cat:"synergy",machines:["Synergy"],code:"SYN-TRB-01",duration:"۱ ساعت",level:"متوسط",
 summary:"خطای Motor Current Overload در MLCi2 معمولاً به دلیل آلودگی ریل، گریس خشک یا Motor معیوب رخ می‌دهد.",
 warn:"هرگز با اعمال دستی روی Leaf، حرکت را اجبار نکنید.",
 tools:["برس نرم","هوای فشرده خشک","گریس MLC"],
 steps:[
   {t:"ثبت شماره Leaf دارای خطا از Service Log"},
   {t:"اجرای Auto-Home برای MLC"},
   {t:"بررسی مسیر حرکت Leaf — وجود آلودگی یا شن"},
   {t:"تمیزکاری ریل با برس نرم و هوای فشرده",level:"warn",note:"بدون حلال شیمیایی"},
   {t:"بررسی گریس روی ریل — در صورت خشکی، گریس‌کاری مجدد"},
   {t:"تست جریان Motor با نرم‌افزار Service"},
   {t:"اجرای Picket Fence پس از رفع"},
   {t:"در صورت تکرار، تعویض Motor Leaf"}
 ]},
{id:"s4",title:"تنظیم Magnetron Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-RF-01",duration:"۲ ساعت",level:"پیشرفته",
 summary:"تنظیم دقیق AFC، فرکانس و توان خروجی Magnetron در Synergy پس از تعویض یا افت توان.",
 warn:"کار با High Voltage خطرناک است — تمام دستورات ایمنی را رعایت کنید.",
 tools:["مولتی‌متر HV","Frekvenz متر","نرم‌افزار Service"],
 steps:[
   {t:"اجرای Warm-up کامل دستگاه (۲۰ دقیقه)"},
   {t:"ورود به Service Mode → RF System"},
   {t:"بررسی فرکانس پایه — حدود ۲۸۵۶ MHz"},
   {t:"بررسی AFC Voltage در حالت Standby"},
   {t:"تنظیم AFC در حین تابش پرتو"},
   {t:"اندازه‌گیری توان خروجی — باید ۵.۵ MW باشد",level:"warn"},
   {t:"تنظیم محفظه Magnetron در صورت نیاز"},
   {t:"اجرای Auto-Conditioning و بررسی پایداری"},
   {t:"اجرای QA دزیمتری پس از تنظیم"}
 ]},
{id:"s5",title:"تعویض Target Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-REP-01",duration:"۴ ساعت",level:"پیشرفته",
 summary:"تعویض Target (آند تنگستنی) در Synergy که معمولاً پس از ۴-۵ سال یا در اثر فرسودگی انجام می‌شود.",
 warn:"قبل از شروع، دستگاه باید کاملاً سرد شود و بریکر اصلی قطع گردد.",
 tools:["دستکش نسوز","آچار تورک","فیلر","گریس وکیوم"],
 steps:[
   {t:"خاموشی کامل و انتظار ۲ ساعت برای سرد شدن",level:"danger"},
   {t:"قطع بریکر اصلی و تخلیه خازن‌ها"},
   {t:"باز کردن پنل Head و دسترسی به Target"},
   {t:"جدا کردن اتصالات آب خنک‌کننده",note:"از ریختن آب روی قطعات جلوگیری کنید."},
   {t:"باز کردن پیچ‌های Target با آچار تورک"},
   {t:"خارج کردن Target قدیمی و بازرسی مسیر الکترون"},
   {t:"نصب Target جدید و اعمال گریس وکیوم"},
   {t:"اتصال مجدد آب خنک‌کننده و تست نشتی"},
   {t:"اجرای Auto-Conditioning کامل",note:"حداقل ۱ ساعت"},
   {t:"کالیبراسیون کامل دز و QA نهایی"}
 ]},
{id:"s6",title:"تعویض Circulator Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-REP-02",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض Circulator که وظیفه جداسازی RF بین Magnetron و Waveguide را بر عهده دارد.",
 warn:"قبل از کار، فشار SF6 سیستم Waveguide را تخلیه کنید.",
 tools:["آچار تورک","فیلر","Frekvenz Meter"],
 steps:[
   {t:"خاموشی و قطع برق"},
   {t:"تخلیه فشار SF6 از Waveguide"},
   {t:"جدا کردن اتصالات Waveguide از دو طرف"},
   {t:"باز کردن پیچ‌های نگه‌دارنده Circulator"},
   {t:"خارج کردن Circulator قدیمی و بررسی بار داخلی"},
   {t:"نصب Circulator جدید با اورینگ‌های نو"},
   {t:"اتصال مجدد Waveguide و شارژ SF6"},
   {t:"اجرای تست نشتی فشار"},
   {t:"تنظیم AFC و بررسی خروجی RF"},
   {t:"QA نهایی"}
 ]},

/* ══════ INFINITY SPECIFIC ══════ */
{id:"i1",title:"کالیبراسیون Agility MLC (Infinity)",cat:"infinity",machines:["Infinity"],code:"INF-MLC-01",duration:"۳ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون کامل Agility MLC با ۱۶۰ Leaf شامل تنظیم Backlash، Gain و کالیبراسیون موقعیت مطلق.",
 warn:"Agility حساس‌تر از MLCi2 است — دقت در تنظیمات حیاتی است.",
 tools:["فانتوم Picket Fence","فیلم EBT3","نرم‌افزار Agility Service","آچار تنظیم دقیق"],
 steps:[
   {t:"ورود به Service Mode → Agility MLC → Calibration"},
   {t:"اجرای Auto-Home و ثبت موقعیت صفر هر ۱۶۰ Leaf"},
   {t:"کالیبراسیون Backlash بانک A (Leaf 1-80)"},
   {t:"کالیبراسیون Backlash بانک B (Leaf 81-160)"},
   {t:"تنظیم Gain هر Leaf",note:"انحراف مجاز زیر ۰.۲mm"},
   {t:"تست Picket Fence با فیلم و تحلیل نرم‌افزاری",level:"warn"},
   {t:"اجرای تست Garden Fence برای بررسی کلی"},
   {t:"تست IMRT با ۱۱ میدان"},
   {t:"اجرای VMAT QA با فانتوم ArcCHECK"},
   {t:"ذخیره و Backup کالیبراسیون"}
 ]},
{id:"i2",title:"QA ماهانه Agility MLC — Garden Fence",cat:"infinity",machines:["Infinity"],code:"INF-MLC-02",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"تست ماهانه یکپارچگی Agility MLC با استفاده از Garden Fence که امکان بررسی ۱۶۰ Leaf را فراهم می‌کند.",
 tools:["فیلم EBT3","اسکنر فیلم","نرم‌افزار FilmQA Pro"],
 steps:[
   {t:"تنظیم فانتوم در Isocenter با لیزر"},
   {t:"اجرای فایل Garden Fence از Service Mode"},
   {t:"تابش با ۶ MV، ۵۰۰ MU"},
   {t:"Development فیلم و اسکن با رزولوشن ۳۰۰ DPI"},
   {t:"تحلیل با FilmQA Pro — بررسی موقعیت هر Leaf",level:"warn",note:"انحراف مجاز زیر ۱mm"},
   {t:"ثبت نتایج در فرم QA"},
   {t:"در صورت انحراف، اجرای کالیبراسیون MLC"}
 ]},
{id:"i3",title:"QA روزانه Integrity — Infinity",cat:"infinity",machines:["Infinity"],code:"INF-QA-01",duration:"۲۰ دقیقه",level:"پایه",
 summary:"چک‌لیست روزانه سیستم Integrity که رابط کاربری اصلی Infinity است — شامل بررسی Status، خطاها و عملکرد کلی.",
 tools:["چک‌لیست روزانه"],
 steps:[
   {t:"بررسی سبز بودن پس‌زمینه Integrity در همه مانیتورها"},
   {t:"بررسی Status Bar — نبود هشدار قرمز"},
   {t:"ورود به Admin → System Health"},
   {t:"بررسی لاگ خطاهای ۲۴ ساعت گذشته"},
   {t:"بررسی فضای دیسک — باید حداقل ۲۰٪ آزاد باشد"},
   {t:"اجرای تست ارتباط با ARIA / MOSAIQ"},
   {t:"بررسی سینک زمان سیستم با سرور"},
   {t:"خروج از Admin و شروع QA روزانه دزیمتری"}
 ]},
{id:"i4",title:"پیکربندی FFF Beam در Infinity",cat:"infinity",machines:["Infinity"],code:"INF-FFF-01",duration:"۴ ساعت",level:"پیشرفته",
 summary:"پیکربندی و کالیبراسیون پرتو FFF (Flattening Filter Free) در Infinity برای درمان SBRT/SRS با دوز بالا.",
 warn:"این رویه نیازمند مجوز فیزیک پزشکی و تست‌های دزیمتری گسترده است.",
 tools:["فانتوم آب","اتاقک Farmer","اتاقک PinPoint","الکترومتر","نرم‌افزار Monaco"],
 steps:[
   {t:"بررسی وجود FFF Hardware (حذف فیلتر مسطح‌کننده)"},
   {t:"ورود به Service → Beam Configuration"},
   {t:"فعال‌سازی حالت ۶ MV FFF و ۱۰ MV FFF"},
   {t:"کالیبراسیون خروجی با اتاقک Farmer",note:"Dose Rate بالای ۱۴۰۰ MU/min"},
   {t:"اندازه‌گیری PDD و TPR20/10 برای FFF"},
   {t:"اندازه‌گیری Profile عرضی — دقت در پروفایل FFF"},
   {t:"بررسی دوز Peak و دوز در لبه میدان"},
   {t:"مدل‌سازی در Monaco Planning"},
   {t:"تست SBRT با فانتوم و تأیید انحراف زیر ۳٪"}
 ]},
{id:"i5",title:"راه‌اندازی HexaPOD Couch در Infinity",cat:"infinity",machines:["Infinity"],code:"INF-Couch-01",duration:"۳ ساعت",level:"پیشرفته",
 summary:"راه‌اندازی و کالیبراسیون میز HexaPOD با ۶ درجه آزادی (۶DoF) برای تصحیح دقیق موقعیت بیمار.",
 tools:["فانتوم هم‌ترازی","نرم‌افزار HexaPOD Service","ابزار کالیبراسیون سازنده"],
 steps:[
   {t:"بررسی نصب فیزیکی و اتصال کابل‌های HexaPOD"},
   {t:"روشن کردن و Warm-up سیستم — ۱۵ دقیقه"},
   {t:"ورود به Service → HexaPOD → Calibration"},
   {t:"اجرای Auto-Home و بررسی موقعیت صفر"},
   {t:"کالیبراسیون Pitch, Roll, Yaw"},
   {t:"کالیبراسیون Translation در X, Y, Z"},
   {t:"تست دقت با فانتوم در موقعیت‌های مختلف",note:"انحراف مجاز زیر ۱mm و ۱ درجه"},
   {t:"اتصال به XVI برای تصحیح خودکار موقعیت"},
   {t:"تست کامل Workflow با یک بیمار فانتوم"}
 ]},
{id:"i6",title:"تست High Dose Rate در Infinity",cat:"infinity",machines:["Infinity"],code:"INF-QA-02",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"QA اختصاصی برای High Dose Rate (HDR) در Infinity که برای درمان‌های SBRT/SRS حیاتی است.",
 warn:"در HDR، دقت دزیمتری باید زیر ۲٪ باشد.",
 tools:["اتاقک PinPoint","الکترومتر","فانتوم آب","فیلم EBT3"],
 steps:[
   {t:"تنظیم شرایط مرجع SAD=100cm، عمق=10cm"},
   {t:"کالیبراسیون خروجی در Dose Rate 600 MU/min"},
   {t:"کالیبراسیون در Dose Rate 1400 MU/min (FFF)"},
   {t:"بررسی پایداری خروجی در ۳۰ دقیقه تابش مداوم"},
   {t:"اندازه‌گیری PDD برای HDR"},
   {t:"بررسی Profile در میدان‌های کوچک ۲×۲ و ۳×۳",note:"انحراف مجاز زیر ۲٪"},
   {t:"بررسی Penumbra — باید زیر ۴mm باشد"},
   {t:"تست SBRT با فانتوم و تأیید دز در Isocenter"}
 ]},
{id:"i7",title:"تعویض Agility MLC Bank کامل",cat:"infinity",machines:["Infinity"],code:"INF-REP-01",duration:"۸ ساعت",level:"پیشرفته",
 summary:"تعویض کامل یک Bank از Agility MLC (۸۰ Leaf) که در صورت آسیب گسترده یا پس از ۱۰ سال استفاده انجام می‌شود.",
 warn:"این رویه تخصصی است و نیازمند هماهنگی با Elekta Service دارد.",
 tools:["کیت تعویض Agility","آچار تورک","جرثقیل کوچک","کالیبراسیون ابزار"],
 steps:[
   {t:"Backup کامل از تنظیمات MLC"},
   {t:"خاموشی دستگاه و قطع برق MLC"},
   {t:"باز کردن پنل Head و دسترسی به Bank"},
   {t:"جدا کردن کابل‌های Motor و Encoder (۸۰×۲ کابل)",note:"از همه عکس بگیرید."},
   {t:"باز کردن پیچ‌های نگه‌دارنده Bank"},
   {t:"خارج کردن Bank قدیمی با جرثقیل"},
   {t:"بررسی ریل و مسیر نصب Bank جدید"},
   {t:"نصب Bank جدید و اتصال کابل‌ها"},
   {t:"اجرای Auto-Home و کالیبراسیون کامل Agility"},
   {t:"اجرای Picket Fence و Garden Fence",level:"warn"},
   {t:"اجرای VMAT QA با فانتوم"},
   {t:"تست بیمار فانتوم قبل از استفاده بالینی"}
 ]},

/* ══════ MLC و کولیما (مشترک) ══════ */
{id:"m5",title:"QA ماهانه MLC — Picket Fence",cat:"mlc",machines:["Synergy","Infinity","Versa HD","Axesse"],code:"QA-M-300",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"بررسی ماهانه MLC با تست Picket Fence برای همه نسخه‌ها (MLCi2، Agility، Beam Modulator).",
 warn:"خطای موقعیت هر Leaf باید زیر ۱mm باشد.",
 tools:["فانتوم Picket Fence","فیلم EBT3","اسکنر"],
 steps:[
   {t:"قرارگیری فانتوم در Isocenter"},
   {t:"اجرای تست Picket Fence با تمام Leafها در موقعیت مسدود"},
   {t:"Development و اسکن فیلم"},
   {t:"تحلیل با نرم‌افزار — بررسی انحراف هر Leaf",note:"انحراف مجاز زیر ۱mm",level:"warn"},
   {t:"تست حرکت تکی هر Leaf"},
   {t:"بررسی هم‌ترازی MLC با کولیما"},
   {t:"اجرای IMRT QA با Matrixx",note:"انحراف ۳٪ / ۳mm"},
   {t:"ثبت گزارش"}
 ]},
{id:"m5b",title:"کالیبراسیون کولیما (Jaw) — Synergy و Infinity",cat:"mlc",machines:["Synergy","Infinity"],code:"QA-M-301",duration:"۲ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون دقیق Jawهای X و Y در Synergy و Infinity شامل تنظیم موقعیت صفر، Backlash و هم‌ترازی با MLC.",
 tools:["فانتوم هم‌ترازی","فیلم EBT3","نرم‌افزار Service"],
 steps:[
   {t:"ورود به Service → Collimator → Jaw Calibration"},
   {t:"بررسی موقعیت صفر Jaw X (0.5cm عرض)"},
   {t:"بررسی موقعیت صفر Jaw Y (0.5cm عرض)"},
   {t:"کالیبراسیون Backlash Jaw X و Y"},
   {t:"تنظیم Gain برای دقت حرکت"},
   {t:"بررسی هم‌ترازی Jaw X با MLC",level:"warn"},
   {t:"تست در موقعیت‌های مختلف باز و بسته"},
   {t:"اجرای Star Shot برای تأیید Isocenter"}
 ]},

/* ══════ دزیمتری و کالیبراسیون ══════ */
{id:"m7",title:"کالیبراسیون دز خروجی — Output Factor",cat:"calib",machines:["Synergy","Infinity","Versa HD","Unity","Axesse","Precise"],code:"CAL-400",duration:"۱۲۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون دز مطلق با پروتکل TRS-398 IAEA.",
 warn:"فقط توسط فیزیک‌دان پزشکی یا مهندس مجاز.",
 tools:["اتاقک Farmer","الکترومتر","فانتوم آب","دماسنج","بارومتر"],
 steps:[
   {t:"آماده‌سازی شرایط مرجع (SAD=100، عمق=10cm، میدان=10×10)"},
   {t:"ثبت دما و فشار جوی و محاسبه kTP"},
   {t:"تابش ۱۰۰ MU × ۳ بار و میانگین"},
   {t:"محاسبه دز جذبی"},
   {t:"مقایسه با مرجع ۱۰۰ cGy",note:"انحراف زیر ۱٪"},
   {t:"اعمال ضریب در Monaco/RayStation"},
   {t:"تکرار برای همه انرژی‌ها",level:"warn"},
   {t:"تست صحت با اندازه‌گیری مستقل"},
   {t:"ثبت و امضا"}
 ]},
{id:"m7b",title:"QA ماهانه دزیمتری Synergy — 6/10/18 MV",cat:"calib",machines:["Synergy"],code:"SYN-CAL-01",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"QA ماهانه اختصاصی Synergy برای سه انرژی فوتون ۶، ۱۰ و ۱۸ MV با پروتکل محدود.",
 tools:["فانتوم آب","اتاقک Farmer","الکترومتر","دماسنج","بارومتر"],
 steps:[
   {t:"کالیبراسیون ۶ MV — مرجع ۱۰۰ cGy"},
   {t:"کالیبراسیون ۱۰ MV"},
   {t:"کالیبراسیون ۱۸ MV"},
   {t:"اندازه‌گیری PDD برای هر سه انرژی"},
   {t:"بررسی TPR20/10 برای ۶ و ۱۰ MV"},
   {t:"Profile عرضی در dmax و ۱۰cm"},
   {t:"بررسی Symmetry و Flatness",note:"زیر ۳٪"},
   {t:"ثبت در فرم QA"}
 ]},
{id:"m7c",title:"QA ماهانه دزیمتری Infinity — 6/10 MV",cat:"calib",machines:["Infinity"],code:"INF-CAL-01",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"QA ماهانه اختصاصی Infinity برای دو انرژی فوتون ۶ و ۱۰ MV (و ۶ MV FFF در صورت وجود).",
 tools:["فانتوم آب","اتاقک Farmer","اتاقک PinPoint","الکترومتر"],
 steps:[
   {t:"کالیبراسیون ۶ MV"},
   {t:"کالیبراسیون ۱۰ MV"},
   {t:"کالیبراسیون ۶ MV FFF (در صورت وجود)",note:"Dose Rate: 1400 MU/min"},
   {t:"اندازه‌گیری PDD و Profile"},
   {t:"بررسی Flatness در ۶ و ۱۰ MV استاندارد"},
   {t:"بررسی FFF Profile — پروفایل بدون صافی",level:"warn"},
   {t:"ثبت نتایج"}
 ]},

/* ══════ تصویربرداری — XVI ══════ */
{id:"im1",title:"کالیبراسیون XVI — تصویربرداری CBCT",cat:"imaging",machines:["Synergy","Infinity","Versa HD","Axesse"],code:"XVI-001",duration:"۲ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون کامل سیستم XVI شامل Geometric Calibration و FlexMap برای تصویربرداری CBCT.",
 warn:"کالیبراسیون XVI باید توسط تکنسین آموزش‌دیده انجام شود.",
 tools:["فانتوم Calibration XVI","نرم‌افزار XVI Service"],
 steps:[
   {t:"ورود به XVI Service → Geometry Calibration"},
   {t:"نصب فانتوم Calibration در Isocenter"},
   {t:"اجرای اسکن ۳۶۰ درجه با پروتکل Calibration"},
   {t:"تحلیل نتایج — انحراف مرکز زیر ۰.۵mm",level:"warn"},
   {t:"اجرای FlexMap Calibration"},
   {t:"تست Reconstruction با فانتوم CatPhan"},
   {t:"بررسی کیفیت تصویر — Resolution، Uniformity"},
   {t:"اجرای QA XVI با فانتوم"}
 ]},
{id:"im2",title:"FlexMap Calibration XVI",cat:"imaging",machines:["Synergy","Infinity","Versa HD"],code:"XVI-002",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون FlexMap که Flex مکانیکی بازوی XVI را تصحیح می‌کند و برای کیفیت CBCT حیاتی است.",
 warn:"FlexMap باید هر ۶ ماه اجرا شود.",
 tools:["فانتوم Calibration XVI","ابزار Flex"],
 steps:[
   {t:"ورود به XVI Service → FlexMap"},
   {t:"نصب فانتوم مخصوص FlexMap"},
   {t:"اجرای اسکن ۳۶۰ درجه در موقعیت‌های مختلف"},
   {t:"تحلیل — بررسی Flex هر ۳۰ درجه",note:"انحراف مجاز زیر ۱mm"},
   {t:"اعمال ضرایب تصحیح در سیستم"},
   {t:"تست Reconstruction پس از FlexMap"},
   {t:"تأیید با فانتوم کیفیت تصویر"}
 ]},
{id:"im3",title:"عیب‌یابی خطای XVI Reconstruction",cat:"imaging",machines:["Synergy","Infinity"],code:"XVI-TRB-01",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع خطای i138 (پروجکشن ناکافی) یا i140 (FlexMap منقضی) در سیستم XVI.",
 tools:["لاگ سیستم","نرم‌افزار XVI"],
 steps:[
   {t:"ثبت کد دقیق از Service Log"},
   {t:"بررسی تعداد Projection — باید حداقل ۳۶۰ باشد"},
   {t:"افزایش AcquisitionInterval در صورت نیاز"},
   {t:"بررسی وضعیت FlexMap — انقضا نکرده باشد"},
   {t:"اجرای FlexMap جدید در صورت نیاز",level:"warn"},
   {t:"تست با فانتوم کیفیت تصویر"},
   {t:"تأیید کیفیت Reconstruction"}
 ]},

/* ══════ تصویربرداری — iViewGT ══════ */
{id:"im4",title:"QA ماهانه iViewGT — تصویربرداری Portal",cat:"imaging",machines:["Synergy","Infinity"],code:"IVIEW-001",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"QA ماهانه iViewGT شامل Uniformity، Resolution و موقعیت تصویر با فانتوم استاندارد.",
 tools:["فانتوم Las Vegas","فانتوم Flat Field"],
 steps:[
   {t:"راه‌اندازی iViewGT در SID=150cm"},
   {t:"اجرای Dark Field و Flood Field"},
   {t:"تصویر Flat Field — بررسی Uniformity در ۹ نقطه",note:"انحراف زیر ۳٪"},
   {t:"تصویر فانتوم Las Vegas — بررسی Resolution"},
   {t:"بررسی موقعیت مرکز تصویر با Marker"},
   {t:"مقایسه با نتایج قبلی"},
   {t:"ثبت گزارش"}
 ]},
{id:"im5",title:"کالیبراسیون Dosimetry Portal با iViewGT",cat:"imaging",machines:["Synergy","Infinity","Versa HD"],code:"IVIEW-002",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون حالت Dosimetry Portal در iViewGT برای Verifying دز بیمار به صورت In-Vivo.",
 tools:["فانتوم آب","نرم‌افزار Dosimetry Portal","فیلم"],
 steps:[
   {t:"فعال‌سازی حالت Dosimetry Portal در Service"},
   {t:"اجرای Dark و Flood جدید"},
   {t:"کالیبراسیون Pixel به Dose با فانتوم آب"},
   {t:"اندازه‌گیری در عمق‌های مختلف"},
   {t:"بررسی پایداری با تابش‌های تکرار"},
   {t:"تست با فانتوم همگن و مقایسه با TPS"},
   {t:"ذخیره ضرایب کالیبراسیون"}
 ]},

/* ══════ QA روزانه و هفتگی ══════ */
{id:"m1",title:"چک‌لیست QA روزانه دستگاه خطی",cat:"daily",machines:["Synergy","Infinity","Versa HD"],code:"QA-D-100",duration:"۱۵ دقیقه",level:"پایه",
 summary:"بررسی‌های روزانه صبحگاهی قبل از شروع درمان بیماران شامل دزیمتری، ایمنی و مکانیک.",
 warn:"انجام این چک‌لیست قبل از هر جلسه درمان الزامی است.",
 tools:["دزیمتر یونیزاسیون","فانتوم روزانه"],
 steps:[
   {t:"روشن کردن و Warm-up (۱۰-۱۵ دقیقه)"},
   {t:"بررسی Status LED پنل — همه سبز"},
   {t:"تست Emergency Stop",level:"warn"},
   {t:"اندازه‌گیری خروجی با فانتوم",note:"۱۰۰ cGy ± ۲٪",level:"warn"},
   {t:"بررسی حرکت گانتری ۳۶۰ درجه"},
   {t:"تست میز درمان در سه محور"},
   {t:"بررسی kV/MV imaging"},
   {t:"بررسی فیلترها و MLC"},
   {t:"ثبت در دفتر QA"}
 ]},
{id:"m2",title:"تست ایمنی اتاق و اینترلاک‌ها",cat:"daily",machines:["Synergy","Infinity","Versa HD","Unity"],code:"QA-D-105",duration:"۸ دقیقه",level:"پایه",
 summary:"بررسی روزانه ایمنی شامل اینترلاک درب، CCTV، ارتباط با بیمار و چراغ‌های هشدار.",
 warn:"هر نقص در اینترلاک درب باید بلافاصله گزارش شود.",
 tools:["تست لامپ","کلید درب"],
 steps:[
   {t:"بررسی چراغ قرمز بیرونی"},
   {t:"تست اینترلاک درب",level:"danger",note:"قطع زیر ۱۰۰ms"},
   {t:"تست صدای هشدار"},
   {t:"بررسی CCTV و ارتباط دوطرفه"},
   {t:"تست Emergency Stop داخل اتاق"},
   {t:"بررسی تابلو علائم"}
 ]},
{id:"m3",title:"QA هفتگی دزیمتری",cat:"weekly",machines:["Synergy","Infinity","Versa HD"],code:"QA-W-200",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"اندازه‌گیری خروجی مطلق و پروفایل پرتو با فانتوم آب.",
 warn:"انحراف بیش از ۲٪ نیازمند کالیبراسیون فوری است.",
 tools:["فانتوم آب","اتاقک Farmer","الکترومتر"],
 steps:[
   {t:"تنظیم فانتوم آب روی ۲۰°C"},
   {t:"قرارگیری اتاقک در عمق ۱۰cm"},
   {t:"تابش ۱۰۰ MU با ۱۰×۱۰",level:"warn"},
   {t:"تکرار برای همه انرژی‌ها"},
   {t:"اندازه‌گیری Profile"},
   {t:"بررسی Flatness و Symmetry"},
   {t:"اندازه‌گیری PDD"},
   {t:"ثبت در فرم QA"}
 ]},
{id:"m15",title:"Warm-up و Standby روزانه",cat:"daily",machines:["Synergy","Infinity","Versa HD"],code:"QA-D-110",duration:"۲۰ دقیقه",level:"پایه",
 summary:"رویه استاندارد روشن کردن، Warm-up کامل و قرار دادن در Standby در پایان روز.",
 warn:"هرگز بدون Warm-up کامل وارد درمان نشوید.",
 tools:["دماسنج محیط","چک‌لیست"],
 steps:[
   {t:"بررسی دمای اتاق (۲۰-۲۴°C)"},
   {t:"روشن کردن مانیتورها به ترتیب"},
   {t:"ورود به iGuide/Integrity"},
   {t:"انتظار برای Warm-up (۱۰ دقیقه)",level:"warn"},
   {t:"بررسی سبز بودن Integrity"},
   {t:"اجرای Reset Motors"},
   {t:"Park MLC قبل از خاموشی"},
   {t:"خاموش کردن معکوس مانیتورها"}
 ]},

/* ══════ عیب‌یابی عمومی ══════ */
{id:"m11",title:"عیب‌یابی توقف پرتو در حین درمان",cat:"trouble",machines:["Synergy","Infinity","Versa HD","Unity"],code:"TRB-600",duration:"متغیر",level:"متوسط",
 summary:"راهنمای عیب‌یابی توقف ناگهانی Beam.",
 warn:"بیمار باید از اتاق خارج و دز اعمال‌شده ثبت شود.",
 tools:["دفتر خطا","لاگ","مولتی‌متر"],
 steps:[
   {t:"ثبت کد خطا از پنل"},
   {t:"بازبینی Service → Logs"},
   {t:"بررسی آب خنک‌کننده",note:"زیر ۳۰°C"},
   {t:"بررسی فشار SF6",level:"warn",note:"بالای ۲۸ psi"},
   {t:"بررسی AFC و Magnetron/Klystron"},
   {t:"گزارش به Elekta اگر تکرار شد"},
   {t:"QA روزانه قبل از ادامه",level:"warn"}
 ]},
{id:"m14",title:"عیب‌یابی سیستم خنک‌کننده",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"TRB-620",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع مشکلات Chiller، پمپ و رادیاتور.",
 warn:"قبل از باز کردن، فشار را تخلیه کنید.",
 tools:["مولتی‌متر","متر دما","فشارسنج"],
 steps:[
   {t:"بررسی سطح مایع و نشتی"},
   {t:"اندازه‌گیری ΔT (۳-۵°C)"},
   {t:"بررسی پمپ و جریان"},
   {t:"بازبینی فیلترها"},
   {t:"تست سنسور دما"},
   {t:"تعویض مایع در صورت نیاز",level:"warn"},
   {t:"QA پس از رفع"}
 ]},
{id:"t1",title:"عیب‌یابی خطای Gantry Interlock (i70)",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"TRB-630",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع خطای i70 که معمولاً در Encoder یا Motor Gantry رخ می‌دهد.",
 warn:"قبل از بررسی، Gantry را Home کنید.",
 tools:["مولتی‌متر","چک‌لیست Encoder"],
 steps:[
   {t:"ثبت کد دقیق"},
   {t:"بررسی Service Logs"},
   {t:"اجرای Reset Motors"},
   {t:"بررسی اتصال Encoder",level:"warn"},
   {t:"اندازه‌گیری ولتاژ (۵-۲۴V)"},
   {t:"بررسی Motor در حرکت آهسته"},
   {t:"کالیبراسیون Gantry Angle در صورت تکرار"},
   {t:"QA روزانه پس از رفع"}
 ]},
{id:"t2",title:"عیب‌یابی خطای Collimator Rotation",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-640",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"رفع خطای چرخش کولیما که اغلب در اثر Encoder یا Motor Rotation رخ می‌دهد.",
 tools:["مولتی‌متر","آچار تنظیم","نرم‌افزار Service"],
 steps:[
   {t:"بررسی کد خطا در Log"},
   {t:"اجرای Reset برای Collimator"},
   {t:"بررسی اتصال Encoder Rotation"},
   {t:"تست حرکت چرخش در ۳۶۰ درجه"},
   {t:"اندازه‌گیری موقعیت صفر"},
   {t:"کالیبراسیون Collimator Rotation"},
   {t:"اجرای Star Shot پس از رفع",level:"warn"}
 ]},
{id:"t3",title:"عیب‌یابی خطای Couch Position",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-650",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"خطای موقعیت میز — بررسی Encoder، Motor و مکانیک.",
 tools:["مولتی‌متر","فیلر","نرم‌افزار Service"],
 steps:[
   {t:"بررسی کد خطا"},
   {t:"تست حرکت در همه محورها (Long, Lat, Vert)"},
   {t:"بررسی Encoder هر محور"},
   {t:"اندازه‌گیری دقت موقعیت با فانتوم"},
   {t:"کالیبراسیون محورهای مشکل‌دار",level:"warn"},
   {t:"تست Load Tolerance با وزن ۱۵۰kg"},
   {t:"اجرای QA نهایی"}
 ]},
{id:"t4",title:"عیب‌یابی فشار SF6 پایین",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-660",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع افت فشار SF6 در Waveguide که باعث خطای Magnetron یا کاهش توان RF می‌شود.",
 warn:"شارژ SF6 باید با گاز با خلوص ۹۹.۹۹٪ انجام شود.",
 tools:["سیلندر SF6","رگولاتور","Detector نشتی"],
 steps:[
   {t:"اندازه‌گیری فشار فعلی"},
   {t:"بررسی نشتی با Detector در کل مسیر"},
   {t:"تعویض اورینگ‌های مشکل‌دار در صورت نیاز"},
   {t:"شارژ SF6 تا فشار ۳۰ psi",level:"warn"},
   {t:"اجرای تست نشتی ۲۴ ساعته"},
   {t:"بررسی پایداری فشار پس از ۴۸ ساعت"},
   {t:"اجرای QA RF و دزیمتری"}
 ]},

/* ══════ تعویض قطعات عمومی ══════ */
{id:"m9",title:"تعویض Magnetron دستگاه خطی",cat:"replace",machines:["Synergy","Infinity","Versa HD","Precise"],code:"REP-500",duration:"۳-۴ ساعت",level:"پیشرفته",
 summary:"رویه تعویض Magnetron و بازگرداندن سیستم به عملکرد نرمال.",
 warn:"قبل از شروع، دستگاه را حداقل ۲ ساعت خاموش و بریکر را قطع کنید.",
 tools:["دستکش ESD","آچار تورک","فیلر","گریس وکیوم"],
 steps:[
   {t:"خاموشی کامل، قطع بریکر، انتظار ۳۰ دقیقه",level:"danger"},
   {t:"باز کردن پنل Modulator و برچسب‌گذاری"},
   {t:"جدا کردن کابل‌های HV، Heater و Filament"},
   {t:"باز کردن پیچ‌ها (تورک ۲۵ N·m)"},
   {t:"برداشتن Magnetron قدیمی",level:"warn"},
   {t:"نصب Magnetron جدید با گریس وکیوم"},
   {t:"اتصال کابل‌ها"},
   {t:"اجرای Auto-Conditioning",note:"۳۰-۶۰ دقیقه"},
   {t:"تنظیم AFC",level:"warn"},
   {t:"کالیبراسیون و QA نهایی"}
 ]},
{id:"m18",title:"تعویض Klystron دستگاه خطی",cat:"replace",machines:["Synergy","Infinity","Versa HD"],code:"REP-510",duration:"۴-۶ ساعت",level:"پیشرفته",
 summary:"تعویض کامل Klystron و تنظیم مجدد RF Drive.",
 warn:"قبل از شروع، دستگاه را ۲ ساعت خاموش و بریکر را قطع کنید.",
 tools:["دستکش عایق HV","آچار تورک","مولتی‌متر HV","جرثقیل کوچک"],
 steps:[
   {t:"خاموشی کامل و قطع بریکر",level:"danger"},
   {t:"انتظار ۳۰ دقیقه برای تخلیه"},
   {t:"باز کردن پنل Klystron و برچسب‌گذاری"},
   {t:"جدا کردن کابل‌های HV، Filament، Heater و RF"},
   {t:"باز کردن پیچ‌ها (۳۰ N·m)"},
   {t:"خارج کردن Klystron با جرثقیل",level:"warn",note:"وزن حدود ۵۰kg"},
   {t:"بررسی Waveguide و تمیزکاری"},
   {t:"نصب Klystron جدید"},
   {t:"اتصال کابل‌ها"},
   {t:"اجرای Auto-Conditioning",note:"۶۰-۹۰ دقیقه"},
   {t:"تنظیم RF Drive",level:"warn"},
   {t:"کالیبراسیون کامل"}
 ]},
{id:"m10",title:"تعویض اتاقک یونیزاسیون مانیتور",cat:"replace",machines:["Synergy","Infinity","Versa HD"],code:"REP-505",duration:"۲ ساعت",level:"متوسط",
 summary:"تعویض Transmission Chamber در مسیر پرتو.",
 warn:"پس از تعویض، کالیبراسیون مجدد دز الزامی است.",
 tools:["پیچ‌گوشتی Torx","دستکش","فیلر"],
 steps:[
   {t:"خاموشی و سرد شدن"},
   {t:"باز کردن پنل Head"},
   {t:"جدا کردن کابل HV و سیگنال"},
   {t:"باز کردن پیچ‌ها"},
   {t:"خارج کردن اتاقک قدیمی"},
   {t:"نصب اتاقک جدید",level:"warn"},
   {t:"اتصال و بستن پنل"},
   {t:"اجرای Daily QA"},
   {t:"کالیبراسیون مجدد",level:"warn"}
 ]}
];

/* ═══════════════════════════════════════════════════
   کدهای خطا — تمرکز Synergy و Infinity
   ═══════════════════════════════════════════════════ */
const ERRORS = [
/* ─── Synergy ─── */
{code:"SYN-E01",sev:"red",machine:"Synergy",title:"Magnetron Overcurrent",act:"بررسی AFC و توان RF — بررسی Klystron"},
{code:"SYN-E02",sev:"orange",machine:"Synergy",title:"Magnetron Frequency Drift",act:"تنظیم AFC در سرویس مود"},
{code:"SYN-E03",sev:"red",machine:"Synergy",title:"Waveguide Arc Detected",act:"بررسی SF6، بررسی نشتی، تمیزکاری Waveguide"},
{code:"SYN-E04",sev:"orange",machine:"Synergy",title:"MLCi2 Motor Current High",act:"تمیزکاری ریل و گریس‌کاری مجدد"},
{code:"SYN-E05",sev:"red",machine:"Synergy",title:"MLCi2 Encoder Mismatch",act:"تعویض Encoder Leaf — کالیبراسیون"},
{code:"SYN-E06",sev:"orange",machine:"Synergy",title:"Target Wear Detected",act:"بررسی وضعیت Target — زمان تعویض"},
{code:"SYN-E07",sev:"blue",machine:"Synergy",title:"SF6 Pressure Low (Warning)",act:"بررسی نشتی — شارژ مجدد در اولین فرصت"},
{code:"SYN-E08",sev:"red",machine:"Synergy",title:"Circulator Failure",act:"تعویض Circulator"},
{code:"SYN-E09",sev:"orange",machine:"Synergy",title:"Filament Current Drop",act:"بررسی Filament و اتصالات"},
{code:"SYN-E10",sev:"orange",machine:"Synergy",title:"Collimator Rotation Error",act:"Reset و کالیبراسیون Rotation"},

/* ─── Infinity ─── */
{code:"INF-E01",sev:"red",machine:"Infinity",title:"Agility MLC Bank A Failure",act:"بررسی Bank A — تعویض در صورت نیاز"},
{code:"INF-E02",sev:"red",machine:"Infinity",title:"Agility MLC Bank B Failure",act:"بررسی Bank B — تعویض در صورت نیاز"},
{code:"INF-E03",sev:"orange",machine:"Infinity",title:"Agility Leaf Position Error",act:"کالیبراسیون Leaf مشکل‌دار"},
{code:"INF-E04",sev:"orange",machine:"Infinity",title:"Agility Backlash Over Limit",act:"تنظیم Backlash — بررسی مکانیک"},
{code:"INF-E05",sev:"red",machine:"Infinity",title:"HexaPOD Communication Lost",act:"بررسی کابل و ری‌استارت HexaPOD"},
{code:"INF-E06",sev:"orange",machine:"Infinity",title:"HexaPOD Out of Range",act:"بررسی محدودیت حرکتی — Reset"},
{code:"INF-E07",sev:"orange",machine:"Infinity",title:"FFF Beam Interlock",act:"بررسی حذف فیلتر — بررسی وضعیت Beam"},
{code:"INF-E08",sev:"blue",machine:"Infinity",title:"Integrity License Warning",act:"بررسی لایسنس نرم‌افزار"},
{code:"INF-E09",sev:"red",machine:"Infinity",title:"Klystron Arc Detected",act:"خاموشی فوری — بررسی Waveguide"},
{code:"INF-E10",sev:"orange",machine:"Infinity",title:"High Dose Rate Stability",act:"بررسی پایداری خروجی در HDR"},

/* ─── MLC عمومی ─── */
{code:"E-205",sev:"orange",machine:"Synergy / Infinity / Versa HD",title:"خطای موقعیت MLC Leaf",act:"اجرای Auto-Home و کالیبراسیون"},
{code:"E-210",sev:"red",machine:"همه Linacها",title:"عدم تطابق Encoder MLC",act:"تعویض Encoder و کالیبراسیون"},
{code:"E-215",sev:"orange",machine:"Synergy / Infinity",title:"MLC Motor Overheat",act:"خنک شدن و بررسی بار مکانیکی"},

/* ─── RF و High Voltage ─── */
{code:"E-101",sev:"red",machine:"Synergy / Infinity",title:"Magnetron — فشار گاز پایین",act:"بررسی SF6، شارژ مجدد"},
{code:"E-102",sev:"orange",machine:"Synergy / Infinity",title:"کاهش توان RF",act:"بررسی AFC"},
{code:"E-103",sev:"red",machine:"Synergy / Infinity",title:"Klystron Filament Failure",act:"بررسی Filament — تعویض در صورت نیاز"},
{code:"E-104",sev:"orange",machine:"Synergy / Infinity",title:"RF Reflected Power High",act:"بررسی Circulator و Waveguide"},
{code:"E-105",sev:"red",machine:"Synergy / Infinity",title:"Modulator Fault",act:"بررسی Modulator و SCR"},
{code:"E-106",sev:"orange",machine:"Synergy / Infinity",title:"Pulse Forming Network Fault",act:"بررسی PFN و خازن‌ها"},

/* ─── دزیمتری ─── */
{code:"E-505",sev:"orange",machine:"همه Linacها",title:"انحراف خروجی دز",act:"کالیبراسیون Output"},
{code:"E-510",sev:"red",machine:"همه Linacها",title:"عدم تطابق دز مانیتور",act:"توقف، بررسی اتاقک‌ها"},
{code:"E-515",sev:"orange",machine:"Synergy / Infinity",title:"Dose Rate Instability",act:"بررسی پایداری پرتو و AFC"},

/* ─── ایمنی ─── */
{code:"E-605",sev:"red",machine:"همه Linacها",title:"خطای اینترلاک درب اتاق",act:"عدم استفاده تا رفع"},
{code:"E-610",sev:"orange",machine:"Synergy / Infinity",title:"خطای Emergency Stop",act:"بررسی و ریست"},
{code:"E-615",sev:"red",machine:"همه Linacها",title:"Beam On با درب باز",act:"بررسی فوری اینترلاک"},

/* ─── تصویربرداری ─── */
{code:"i138",sev:"blue",machine:"همه Linacها",title:"پروجکشن ناکافی XVI",act:"افزایش Acquisition Interval"},
{code:"i140",sev:"orange",machine:"همه Linacها",title:"FlexMap منقضی شده",act:"کالیبراسیون مجدد FlexMap"},
{code:"i116",sev:"orange",machine:"Synergy / Infinity",title:"Scan Heat Limit XVI",act:"کاهش فریم‌ها یا افزایش زمان"},
{code:"i305",sev:"blue",machine:"Synergy / Infinity",title:"iViewGT Dark Field Warning",act:"کالیبراسیون Dark و Gain"},
{code:"i310",sev:"orange",machine:"Synergy / Infinity",title:"Flat Panel Detector Error",act:"بررسی اتصالات و ری‌استارت"},

/* ─── عمومی ─── */
{code:"E-115",sev:"red",machine:"همه Linacها",title:"دما بیش از حد Modulator",act:"بررسی فن‌ها و Chiller"},
{code:"E-120",sev:"orange",machine:"Synergy / Infinity",title:"افت فشار آب خنک‌کننده",act:"بررسی پمپ و سطح"},
{code:"E-125",sev:"orange",machine:"Synergy / Infinity",title:"Chiller Over Temperature",act:"بررسی رادیاتور و فیلتر"},
{code:"E-805",sev:"orange",machine:"همه Linacها",title:"قطع ارتباط با کنسول",act:"بررسی شبکه"},
{code:"E-905",sev:"red",machine:"همه Linacها",title:"خطای موقعیت میز",act:"کالیبراسیون Encoder میز"},
{code:"E-910",sev:"orange",machine:"Synergy / Infinity",title:"ناهم‌ترازی گانتری",act:"کالیبراسیون Gantry Angle"},
{code:"i70",sev:"red",machine:"همه Linacها",title:"Gantry Interlock",act:"Reset Motors و بررسی Encoder"},
{code:"i101",sev:"red",machine:"همه Linacها",title:"Gantry Collision Risk",act:"بررسی اینترلاک ایمنی — توقف فوری"},
{code:"i517",sev:"orange",machine:"Synergy / Infinity",title:"Sector Limit Interlock",act:"بررسی محدودیت Sector"},
{code:"i605",sev:"red",machine:"همه Linacها",title:"درب اتاق باز است",act:"بررسی میکروسوئیچ"},
{code:"i805",sev:"orange",machine:"همه Linacها",title:"قطع ارتباط کنسول",act:"بررسی شبکه"},
{code:"i905",sev:"red",machine:"همه Linacها",title:"خطای موقعیت میز",act:"کالیبراسیون Encoder"},
{code:"i910",sev:"orange",machine:"Synergy / Infinity",title:"ناهم‌ترازی گانتری",act:"کالیبراسیون"}
];

const MACHINES = ["Synergy","Infinity","Versa HD","Unity","Axesse","Precise","Compact"];