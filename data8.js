/* ═══════════════════════════════════════
   data8.js — Synergy + Infinity (نسخه ۶.۰)
   ۴۰ منوال + ۵۰ کد خطا
   ═══════════════════════════════════════ */

MANUALS.push(

/* ═══════════════════════════════════════════
   SYNERGY — MLCi2 عمیق
   ═══════════════════════════════════════════ */
{id:"sy101",title:"کالیبراسیون عمیق MLCi2 — Level 2",cat:"synergy",machines:["Synergy"],code:"SYN-MLC-10",duration:"۴ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون پیشرفته MLCi2 شامل تنظیم دقیق Gain، Offset، و هم‌ترازی با Jaw.",
 warn:"فقط توسط مهندس با تجربه. Backup کامل قبل از شروع.",
 tools:["فانتوم Picket Fence پیشرفته","فیلم EBT3","نرم‌افزار MLC Service Level 2","فیلر دقیق"],
 steps:[
   {t:"Backup تنظیمات فعلی MLC"},
   {t:"بررسی دمای اتاق (۲۰–۲۴°C)"},
   {t:"Warm-up کامل دستگاه"},
   {t:"ورود به Service Mode → MLC → Advanced"},
   {t:"کالیبراسیون Offset صفر همه ۸۰ Leaf"},
   {t:"تنظیم Gain هر Leaf با تست تک‌تایی",level:"warn"},
   {t:"تست Backlash در ۳ نقطه از هر Leaf"},
   {t:"تنظیم Backlash در صورت انحراف بیش از ۰.۳mm"},
   {t:"Picket Fence با فیلم EBT3"},
   {t:"تحلیل ۴۰۰ نقطه‌ای با نرم‌افزار"},
   {t:"تأیید انحراف زیر ۰.۵mm"},
   {t:"تست IMRT با ۹ میدان"},
   {t:"ثبت در فرم کالیبراسیون سالانه"}
 ]},
{id:"sy102",title:"تعویض Encoder Leaf MLCi2",cat:"synergy",machines:["Synergy"],code:"SYN-MLC-11",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض Encoder یک Leaf MLCi2 با دقت بالا.",
 warn:"برق MLC باید قطع باشد. ESD رعایت شود.",
 tools:["دستکش ESD","پیچ‌گوشتی Torx T8","آچار ۴.۵","Encoder جدید"],
 steps:[
   {t:"خاموشی سیستم MLC"},
   {t:"باز کردن پنل بالا"},
   {t:"شناسایی Encoder مشکل‌دار"},
   {t:"برچسب‌گذاری کابل‌ها"},
   {t:"جدا کردن کابل Encoder"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن Encoder قدیمی"},
   {t:"بررسی Magnetic Ring"},
   {t:"نصب Encoder جدید"},
   {t:"اتصال کابل"},
   {t:"Auto-Home و تست"},
   {t:"کالیبراسیون Leaf"},
   {t:"Picket Fence تأییدی"}
 ]},
{id:"sy103",title:"تعویض Driver Board MLCi2",cat:"synergy",machines:["Synergy"],code:"SYN-MLC-12",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض برد درایو MLCi2 که مسئول کنترل موتورهای Leaf است.",
 warn:"تخلیه ESD الزامی. برق کامل قطع شود.",
 tools:["دستکش ESD","پیچ‌گوشتی","پنس ESD"],
 steps:[
   {t:"خاموشی کامل MLC"},
   {t:"برچسب‌گذاری تمام کابل‌های برد"},
   {t:"عکس گرفتن از اتصالات"},
   {t:"جدا کردن کابل‌های برق و سیگنال"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن برد قدیمی"},
   {t:"نصب برد جدید"},
   {t:"اتصال طبق عکس‌ها"},
   {t:"روشن کردن تدریجی"},
   {t:"بررسی کدهای خطا"},
   {t:"Auto-Home و کالیبراسیون"},
   {t:"اجرای QA نهایی"}
 ]},

/* ═══════════════════════════════════════════
   SYNERGY — RF عمیق
   ═══════════════════════════════════════════ */
{id:"sy104",title:"تنظیم دقیق AFC Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-RF-10",duration:"۲ ساعت",level:"پیشرفته",
 summary:"تنظیم دقیق AFC Magnetron در Synergy برای پایداری حداکثری فرکانس.",
 warn:"فرکانس باید در حین تابش تنظیم شود.",
 tools:["Frekvenz Meter دقیق","مولتی‌متر HV","اسکوپ RF","نرم‌افزار Service"],
 steps:[
   {t:"Warm-up کامل ۳۰ دقیقه"},
   {t:"بررسی دمای Magnetron"},
   {t:"ورود به Service → RF → AFC"},
   {t:"بررسی فرکانس پایه در Standby",note:"~۲۸۵۶ MHz"},
   {t:"تنظیم AFC در ۶ MV"},
   {t:"اندازه‌گیری دقیق با Frekvenz Meter"},
   {t:"تنظیم محفظه در صورت انحراف"},
   {t:"تست پایداری ۳۰ دقیقه"},
   {t:"تکرار برای ۱۰ و ۱۸ MV"},
   {t:"ثبت نتایج در فرم RF"}
 ]},
{id:"sy105",title:"تعویض Magnetron با Conditioning کامل",cat:"synergy",machines:["Synergy"],code:"SYN-RF-11",duration:"۶ ساعت",level:"پیشرفته",
 summary:"تعویض Magnetron با رویه Conditioning تدریجی و تنظیم مجدد RF.",
 warn:"تخلیه خازن‌ها + قطع بریکر الزامی.",
 tools:["Magnetron جدید","دستکش عایق","آچار تورک","گریس وکیوم"],
 steps:[
   {t:"خاموشی کامل و قطع بریکر",level:"danger"},
   {t:"انتظار ۳۰ دقیقه"},
   {t:"باز کردن پنل Magnetron"},
   {t:"برچسب‌گذاری کابل‌های HV، Filament، Heater"},
   {t:"جدا کردن کابل‌ها"},
   {t:"باز کردن پیچ‌ها با تورک ۲۵ N·m"},
   {t:"خارج کردن Magnetron قدیمی"},
   {t:"بررسی Waveguide"},
   {t:"نصب Magnetron جدید"},
   {t:"اتصال کابل‌ها"},
   {t:"روشن کردن و اجرای Auto-Conditioning"},
   {t:"متابعت Conditioning تدریجی (۶۰ دقیقه)"},
   {t:"تنظیم AFC"},
   {t:"کالیبراسیون دز نهایی"}
 ]},
{id:"sy106",title:"تعویض Pulse Transformer",cat:"synergy",machines:["Synergy"],code:"SYN-RF-12",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض Pulse Transformer در Modulator Synergy.",
 warn:"ولتاژ HV خطرناک. تخلیه کامل.",
 tools:["دستکش HV","مولتی‌متر HV","آچار مخصوص","اسکوپ HV"],
 steps:[
   {t:"خاموشی و تخلیه خازن‌ها",level:"danger"},
   {t:"برچسب‌گذاری کابل‌های اولیه و ثانویه"},
   {t:"جدا کردن اتصالات"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن Transformer قدیمی"},
   {t:"بررسی کیفیت عایق"},
   {t:"نصب Transformer جدید"},
   {t:"اتصال طبق برچسب"},
   {t:"تست Pulse با اسکوپ"},
   {t:"بررسی خروجی HV"},
   {t:"QA نهایی"}
 ]},
{id:"sy107",title:"تنظیم Pulse Width و Pulse Rep Rate",cat:"synergy",machines:["Synergy"],code:"SYN-RF-13",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"تنظیم دقیق Pulse Width و Pulse Repetition Rate برای خروجی بهینه.",
 tools:["اسکوپ دیجیتال","مولتی‌متر HV"],
 steps:[
   {t:"Warm-up کامل"},
   {t:"بررسی Pulse Width فعلی"},
   {t:"تنظیم به مقدار استاندارد (۵ µs)"},
   {t:"بررسی Pulse Rep Rate (۲۰۰-۳۰۰ Hz)"},
   {t:"تست پایداری Pulse"},
   {t:"بررسی Impact روی خروجی"},
   {t:"کالیبراسیون دز در صورت نیاز"},
   {t:"ثبت در فرم"}
 ]},

/* ═══════════════════════════════════════════
   SYNERGY — مکانیک و میز
   ═══════════════════════════════════════════ */
{id:"sy108",title:"تعویض Motor Collimator Rotation",cat:"synergy",machines:["Synergy"],code:"SYN-MEC-10",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض موتور چرخش Collimator Synergy.",
 warn:"Collimator باید در موقعیت صفر باشد.",
 tools:["آچار Torx","پیچ‌گوشتی دقیق","فیلر"],
 steps:[
   {t:"خاموشی و قفل Collimator در صفر"},
   {t:"باز کردن پنل دسترسی"},
   {t:"جدا کردن کابل Motor"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن Motor قدیمی"},
   {t:"بررسی چرخ‌دنده و بلبرینگ"},
   {t:"نصب Motor جدید"},
   {t:"اتصال کابل"},
   {t:"Reset Motors"},
   {t:"کالیبراسیون Collimator Rotation"},
   {t:"Star Shot تأییدی"}
 ]},
{id:"sy109",title:"تنظیم دقیق Backlash Jaw",cat:"synergy",machines:["Synergy"],code:"SYN-MEC-11",duration:"۹۰ دقیقه",level:"متوسط",
 summary:"تنظیم Backlash Jawهای X و Y در Synergy.",
 tools:["نرم‌افزار Service","فیلر دقیق","متر دقیق"],
 steps:[
   {t:"Warm-up کامل"},
   {t:"اجرای تست Backlash Jaw X"},
   {t:"اجرای تست Backlash Jaw Y"},
   {t:"بررسی مقادیر فعلی"},
   {t:"تنظیم در صورت انحراف بیش از حد مجاز"},
   {t:"تست مجدد"},
   {t:"کالیبراسیون موقعیت Jaw"},
   {t:"تأیید با Star Shot"}
 ]},
{id:"sy110",title:"روانکاری کامل ریل‌های Gantry",cat:"synergy",machines:["Synergy"],code:"SYN-MEC-12",duration:"۲ ساعت",level:"متوسط",
 summary:"روانکاری دوره‌ای ریل‌های چرخش Gantry Synergy.",
 warn:"فقط از گریس Original Elekta استفاده شود.",
 tools:["گریس Elekta","برس نرم","دستمال","چک‌لیست"],
 steps:[
   {t:"قفل Gantry در موقعیت دسترسی"},
   {t:"باز کردن پنل‌های کناری"},
   {t:"تمیزکاری ریل با دستمال"},
   {t:"بررسی سایش ریل"},
   {t:"اعمال گریس در مسیر کامل"},
   {t:"چرخش آهسته Gantry برای پخش"},
   {t:"بررسی صدا و لرزش"},
   {t:"تست چرخش کامل ۳۶۰ درجه"},
   {t:"ثبت در دفتر PM"}
 ]},
{id:"sy111",title:"تنظیم Isocenter مکانیکی Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-MEC-13",duration:"۴ ساعت",level:"پیشرفته",
 summary:"تنظیم دقیق Isocenter مکانیکی Synergy برای SBRT/SRS.",
 warn:"فقط توسط مهندس با تجربه. نیازمند فانتوم تخصصی.",
 tools:["فانتوم Winston-Lutz","فانتوم Isocenter","فیلر دقیق","نرم‌افزار تحلیل"],
 steps:[
   {t:"Warm-up کامل ۳۰ دقیقه"},
   {t:"اجرای Winston-Lutz اولیه"},
   {t:"اندازه‌گیری انحراف در ۸ جهت"},
   {t:"تنظیم پیچ‌های Isocenter"},
   {t:"تست مجدد"},
   {t:"تکرار تا انحراف زیر ۰.۵mm"},
   {t:"اجرای Star Shot"},
   {t:"اجرای QA کامل"},
   {t:"ثبت در فرم کالیبراسیون سالانه"}
 ]},

/* ═══════════════════════════════════════════
   SYNERGY — XVI عمیق
   ═══════════════════════════════════════════ */
{id:"sy112",title:"کالیبراسیون کامل XVI Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-XVI-10",duration:"۳ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع XVI شامل Geometry و FlexMap.",
 tools:["فانتوم XVI","ابزار کالیبراسیون","نرم‌افزار XVI Service"],
 steps:[
   {t:"بررسی وضعیت XVI"},
   {t:"نصب فانتوم کالیبراسیون"},
   {t:"Service → XVI → Geometry"},
   {t:"اجرای اسکن ۳۶۰ درجه"},
   {t:"تحلیل نتایج",note:"انحراف زیر ۰.۵mm"},
   {t:"اجرای FlexMap"},
   {t:"Reconstruction با CatPhan"},
   {t:"تست کیفیت تصویر"},
   {t:"تأیید نهایی"}
 ]},
{id:"sy113",title:"تعویض Flat Panel XVI",cat:"synergy",machines:["Synergy"],code:"SYN-XVI-11",duration:"۴ ساعت",level:"پیشرفته",
 summary:"تعویض پنل Flat Panel XVI در Synergy.",
 warn:"پنل حساس — جابجایی با دقت.",
 tools:["کیت تعویض Panel","آچار Torx","دستکش ESD","دستمال مخصوص"],
 steps:[
   {t:"خاموشی XVI"},
   {t:"باز کردن Retractor Arm"},
   {t:"جدا کردن کابل Flat Panel"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن Panel قدیمی"},
   {t:"نصب Panel جدید"},
   {t:"اتصال کابل‌ها"},
   {t:"تست Dark و Flood"},
   {t:"کالیبراسیون Imaging"},
   {t:"QA XVI کامل"}
 ]},
{id:"sy114",title:"عیب‌یابی خطاهای XVI Reconstruction",cat:"synergy",machines:["Synergy"],code:"SYN-XVI-12",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای Reconstruction XVI شامل Ring Artifact، Metal Artifact و Projection کم.",
 tools:["نرم‌افزار XVI Service","فانتوم CatPhan","ابزار تحلیل"],
 steps:[
   {t:"ثبت کد خطا از XVI Log"},
   {t:"بررسی کیفیت Projection Raw"},
   {t:"بررسی کالیبراسیون Dark و Gain"},
   {t:"بررسی FlexMap — انقضا نکرده باشه"},
   {t:"اجرای Reconstruction با پروتکل متفاوت"},
   {t:"بررسی CPU و RAM"},
   {t:"تنظیم MAR برای Metal Artifact"},
   {t:"تست با CatPhan"}
 ]},

/* ═══════════════════════════════════════════
   SYNERGY — کالیبراسیون دز
   ═══════════════════════════════════════════ */
{id:"sy115",title:"کالیبراسیون Output کامل Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-CAL-10",duration:"۳ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع خروجی دز برای همه انرژی‌ها (۶، ۱۰، ۱۸ MV).",
 warn:"فقط توسط فیزیک‌دان پزشکی.",
 tools:["فانتوم آب","اتاقک Farmer","الکترومتر","دماسنج","بارومتر"],
 steps:[
   {t:"آماده‌سازی شرایط مرجع"},
   {t:"۶ MV — اندازه‌گیری خروجی"},
   {t:"محاسبه kTP"},
   {t:"مقایسه با مرجع"},
   {t:"تنظیم در Service Mode"},
   {t:"۱۰ MV — تکرار"},
   {t:"۱۸ MV — تکرار"},
   {t:"تست هر Dose Rate"},
   {t:"تأیید پایداری ۳۰ دقیقه"},
   {t:"ثبت در فرم رسمی"}
 ]},
{id:"sy116",title:"کالیبراسیون Energy و TPR",cat:"synergy",machines:["Synergy"],code:"SYN-CAL-11",duration:"۲ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون دقت انرژی و بررسی TPR20/10.",
 tools:["فانتوم آب","اتاقک Farmer","الکترومتر"],
 steps:[
   {t:"اندازه‌گیری PDD در ۶ MV"},
   {t:"محاسبه TPR20/10"},
   {t:"مقایسه با مرجع"},
   {t:"تکرار برای ۱۰ و ۱۸ MV"},
   {t:"تنظیم در Service Mode در صورت انحراف"},
   {t:"تست پایداری انرژی"},
   {t:"ثبت در فرم"}
 ]},
{id:"sy117",title:"کالیبراسیون Flatness و Symmetry",cat:"synergy",machines:["Synergy"],code:"SYN-CAL-12",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون Flatness و Symmetry پروفایل پرتو.",
 tools:["فانتوم آب","اتاقک Profiler یا اتاقک Farmer","نرم‌افزار تحلیل"],
 steps:[
   {t:"اندازه‌گیری Profile عرضی در dmax"},
   {t:"محاسبه Flatness"},
   {t:"محاسبه Symmetry"},
   {t:"مقایسه با مرجع",note:"زیر ۳٪ و ۲٪"},
   {t:"تنظیم در Service Mode در صورت انحراف"},
   {t:"اندازه‌گیری در عمق ۱۰cm"},
   {t:"ثبت در فرم"}
 ]},

/* ═══════════════════════════════════════════
   INFINITY — Agility عمیق
   ═══════════════════════════════════════════ */
{id:"in101",title:"کالیبراسیون Agility Level 2",cat:"infinity",machines:["Infinity"],code:"INF-MLC-10",duration:"۵ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون پیشرفته Agility شامل تنظیم Bank، Offset و Motor Calibration.",
 warn:"فقط توسط مهندس با تجربه Agility.",
 tools:["فانتوم Picket Fence","فیلم EBT3","نرم‌افزار Agility Advanced","فیلر دقیق"],
 steps:[
   {t:"Backup کامل"},
   {t:"Warm-up ۳۰ دقیقه"},
   {t:"ورود به Service → Agility → Advanced"},
   {t:"کالیبراسیون Bank A (Leaf 1-80)"},
   {t:"کالیبراسیون Bank B (Leaf 81-160)"},
   {t:"تنظیم Offset صفر هر Leaf"},
   {t:"تنظیم Gain هر Leaf"},
   {t:"تست Backlash پیشرفته"},
   {t:"Picket Fence ۴۰۰ نقطه‌ای"},
   {t:"Garden Fence"},
   {t:"VMAT QA با ArcCHECK"},
   {t:"تأیید Pass Rate بالای ۹۸٪"},
   {t:"Backup کالیبراسیون نهایی"}
 ]},
{id:"in102",title:"تعویض Bank Agility کامل",cat:"infinity",machines:["Infinity"],code:"INF-MLC-11",duration:"۸ ساعت",level:"پیشرفته",
 summary:"تعویض کامل یک Bank ۸۰ Leaf Agility پس از آسیب یا ۱۰ سال کار.",
 warn:"هماهنگی با Elekta Service الزامی.",
 tools:["کیت تعویض Bank","جرثقیل کوچک","آچار تورک","دستکش ESD"],
 steps:[
   {t:"Backup تنظیمات MLC"},
   {t:"خاموشی کامل و قطع برق MLC"},
   {t:"باز کردن پنل Head"},
   {t:"جدا کردن ۱۶۰ کابل (۸۰ Motor + ۸۰ Encoder)",note:"از همه عکس بگیرید"},
   {t:"باز کردن پیچ‌های نگه‌دارنده Bank"},
   {t:"خارج کردن Bank با جرثقیل"},
   {t:"بررسی ریل و مسیر نصب"},
   {t:"نصب Bank جدید"},
   {t:"اتصال کابل‌ها طبق برچسب‌ها"},
   {t:"Auto-Home و بررسی اولیه"},
   {t:"کالیبراسیون کامل Agility"},
   {t:"Picket Fence و Garden Fence"},
   {t:"VMAT QA نهایی"}
 ]},
{id:"in103",title:"تعویض Motor Agility پیشرفته",cat:"infinity",machines:["Infinity"],code:"INF-MLC-12",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض Motor یک Leaf Agility با دقت بالا و کالیبراسیون Gain.",
 tools:["کیت Agility Motor","آچار Torx T6","گریس Agility","دستکش ESD"],
 steps:[
   {t:"خاموشی MLC"},
   {t:"باز کردن پنل بالا"},
   {t:"شناسایی Motor مشکل‌دار"},
   {t:"برچسب‌گذاری کابل‌ها"},
   {t:"جدا کردن Motor و Encoder"},
   {t:"خارج کردن Motor با ابزار مخصوص"},
   {t:"بررسی چرخ‌دنده Leaf"},
   {t:"نصب Motor جدید"},
   {t:"اتصال کابل‌ها"},
   {t:"Auto-Home و تست"},
   {t:"کالیبراسیون Gain اختصاصی"},
   {t:"Picket Fence تأییدی"}
 ]},
{id:"in104",title:"تنظیم Backlash Agility دقیق",cat:"infinity",machines:["Infinity"],code:"INF-MLC-13",duration:"۲ ساعت",level:"پیشرفته",
 summary:"تنظیم دقیق Backlash همه Leafهای Agility با معیار زیر ۰.۲mm.",
 warn:"Agility حساس — دقت در تنظیم حیاتی.",
 tools:["نرم‌افزار Agility Advanced","فیلر دقیق"],
 steps:[
   {t:"Warm-up کامل"},
   {t:"Service → Agility → Backlash"},
   {t:"اندازه‌گیری Backlash هر Leaf"},
   {t:"شناسایی Leafهای با Backlash بالا"},
   {t:"تنظیم هر Leaf در صورت انحراف"},
   {t:"تأیید زیر ۰.۲mm"},
   {t:"Picket Fence تأییدی"},
   {t:"ثبت در فرم"}
 ]},

/* ═══════════════════════════════════════════
   INFINITY — Integrity و نرم‌افزار
   ═══════════════════════════════════════════ */
{id:"in105",title:"نصب مجدد Integrity در Infinity",cat:"infinity",machines:["Infinity"],code:"INF-SW-10",duration:"۵ ساعت",level:"پیشرفته",
 summary:"نصب مجدد نرم‌افزار Integrity پس از خرابی سیستم یا Corruption.",
 warn:"Backup کامل قبل از شروع. هماهنگی با IT.",
 tools:["Media نصب","License","دسترسی Admin"],
 steps:[
   {t:"Backup کامل از داده‌ها"},
   {t:"بررسی License جدید"},
   {t:"Backup تنظیمات Service"},
   {t:"بوت از Media نصب"},
   {t:"اجرای Wizard نصب"},
   {t:"پیکربندی اولیه سیستم"},
   {t:"نصب Service Pack"},
   {t:"بازیابی Backup تنظیمات"},
   {t:"تست Communication با دستگاه"},
   {t:"اجرای QA کامل"}
 ]},
{id:"in106",title:"راه‌اندازی ARIA Connectivity Infinity",cat:"infinity",machines:["Infinity"],code:"INF-SW-11",duration:"۴ ساعت",level:"پیشرفته",
 summary:"راه‌اندازی اتصال ARIA Oncology Information System به Infinity.",
 warn:"هماهنگی با IT و Varian/Elekta Service.",
 tools:["دسترسی Admin ARIA","دسترسی Service دستگاه","اطلاعات شبکه"],
 steps:[
   {t:"بررسی پیش‌نیازهای شبکه"},
   {t:"پیکربندی DICOM در ARIA"},
   {t:"پیکربندی DICOM در Infinity"},
   {t:"تست ارسال CT"},
   {t:"تست ارسال RT Plan"},
   {t:"تست Worklist"},
   {t:"پیکربندی Record & Verify"},
   {t:"تست Patient Chart"},
   {t:"آموزش کاربران"}
 ]},
{id:"in107",title:"عیب‌یابی Database Integrity",cat:"infinity",machines:["Infinity"],code:"INF-SW-12",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع Corruption در Database Integrity.",
 warn:"Backup فوری از داده‌های فعلی.",
 tools:["ابزار Repair Database","Backup اخیر","دسترسی Admin"],
 steps:[
   {t:"Backup فوری"},
   {t:"بررسی Integrity Log"},
   {t:"اجرای ابزار Check Database"},
   {t:"شناسایی جداول مشکل‌دار"},
   {t:"اجرای Repair"},
   {t:"تست Database"},
   {t:"Restore از Backup در صورت نیاز"},
   {t:"تست کامل سیستم"}
 ]},

/* ═══════════════════════════════════════════
   INFINITY — HexaPOD عمیق
   ═══════════════════════════════════════════ */
{id:"in108",title:"کالیبراسیون کامل HexaPOD 6DoF",cat:"infinity",machines:["Infinity"],code:"INF-HEX-10",duration:"۴ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع HexaPOD شامل Translation، Rotation و دقت نهایی.",
 tools:["فانتوم Isocenter","نرم‌افزار HexaPOD Service","فیلر دقیق"],
 steps:[
   {t:"Warm-up HexaPOD ۱۵ دقیقه"},
   {t:"Auto-Home"},
   {t:"کالیبراسیون Translation در X، Y، Z"},
   {t:"کالیبراسیون Rotation در Pitch، Roll، Yaw"},
   {t:"تنظیم Offset نهایی"},
   {t:"تست دقت هر محور"},
   {t:"بررسی Range حرکت"},
   {t:"اجرای QA نهایی",note:"انحراف زیر ۱mm و ۱°"}
 ]},
{id:"in109",title:"تعویض Motor HexaPOD",cat:"infinity",machines:["Infinity"],code:"INF-HEX-11",duration:"۴ ساعت",level:"پیشرفته",
 summary:"تعویض موتور HexaPOD در یکی از ۶ محور.",
 warn:"میز باید در موقعیت امن قفل باشد.",
 tools:["آچار مخصوص","مولتی‌متر","گریس مخصوص"],
 steps:[
   {t:"قفل میز در موقعیت صفر"},
   {t:"خاموشی HexaPOD"},
   {t:"دسترسی به Motor"},
   {t:"جدا کردن کابل Motor و Encoder"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن Motor قدیمی"},
   {t:"بررسی چرخ‌دنده"},
   {t:"نصب Motor جدید"},
   {t:"اتصال کابل‌ها"},
   {t:"Auto-Home"},
   {t:"کالیبراسیون محور"},
   {t:"تست دقت"}
 ]},
{id:"in110",title:"عیب‌یابی خطاهای HexaPOD Communication",cat:"infinity",machines:["Infinity"],code:"INF-HEX-12",duration:"۹۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای ارتباط بین HexaPOD و کنسول Infinity.",
 tools:["مولتی‌متر","اسکوپ","نرم‌افزار Service"],
 steps:[
   {t:"ثبت کد خطا"},
   {t:"بررسی Cable هگزاپاد"},
   {t:"تست پیوستگی"},
   {t:"بررسی ولتاژ سیگنال"},
   {t:"بررسی Driver Board"},
   {t:"ری‌استارت HexaPOD"},
   {t:"تست مجدد"},
   {t:"ثبت در فرم"}
 ]},

/* ═══════════════════════════════════════════
   INFINITY — FFF عمیق
   ═══════════════════════════════════════════ */
{id:"in111",title:"کالیبراسیون کامل FFF 6MV",cat:"infinity",machines:["Infinity"],code:"INF-FFF-10",duration:"۴ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع پرتو 6MV FFF با Dose Rate بالا.",
 warn:"فقط توسط فیزیک‌دان پزشکی.",
 tools:["فانتوم آب","اتاقک Farmer و PinPoint","Monaco"],
 steps:[
   {t:"بررسی نصب Hardware FFF"},
   {t:"Service → Beam Configuration"},
   {t:"کالیبراسیون Output در ۱۴۰۰ MU/min"},
   {t:"اندازه‌گیری PDD"},
   {t:"اندازه‌گیری Profile"},
   {t:"بررسی Penumbra"},
   {t:"مدل‌سازی در Monaco"},
   {t:"تست SBRT با فانتوم"},
   {t:"ثبت در فرم"}
 ]},
{id:"in112",title:"کالیبراسیون کامل FFF 10MV",cat:"infinity",machines:["Infinity"],code:"INF-FFF-11",duration:"۴ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع پرتو 10MV FFF.",
 warn:"دقت حیاتی — انحراف بیش از ۱٪ مشکل‌ساز.",
 tools:["فانتوم آب","اتاقک Farmer","Monaco"],
 steps:[
   {t:"بررسی Hardware"},
   {t:"تنظیم Dose Rate ۲۴۰۰ MU/min"},
   {t:"کالیبراسیون Output"},
   {t:"PDD و Profile"},
   {t:"مدل‌سازی Monaco"},
   {t:"تست SBRT"},
   {t:"ثبت در فرم"}
 ]},
{id:"in113",title:"تعویض FFF Filter Infinity",cat:"infinity",machines:["Infinity"],code:"INF-FFF-12",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض فیلتر FFF در مسیر پرتو Infinity.",
 warn:"هماهنگی با Elekta Service توصیه می‌شه.",
 tools:["آچار Torx","فیلر","کیت FFF Filter"],
 steps:[
   {t:"خاموشی و انتظار سرد شدن"},
   {t:"باز کردن پنل Head"},
   {t:"جدا کردن اتصالات"},
   {t:"باز کردن پیچ‌های FFF Holder"},
   {t:"خارج کردن فیلتر قدیمی"},
   {t:"نصب فیلتر جدید"},
   {t:"تنظیم موقعیت با فیلر"},
   {t:"Auto-Conditioning"},
   {t:"کالیبراسیون کامل FFF"}
 ]},

/* ═══════════════════════════════════════════
   INFINITY — تصویربرداری
   ═══════════════════════════════════════════ */
{id:"in114",title:"کالیبراسیون MV Imager (EPID)",cat:"infinity",machines:["Infinity"],code:"INF-IMG-10",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون جامع MV Imager برای تصویربرداری Portal.",
 tools:["فانتوم EPID","ابزار کالیبراسیون","نرم‌افزار iViewGT"],
 steps:[
   {t:"خاموشی و بررسی اتصالات"},
   {t:"Warm-up کامل"},
   {t:"اجرای Dark Field"},
   {t:"اجرای Flood Field"},
   {t:"کالیبراسیون Uniformity"},
   {t:"تنظیم Position Offset"},
   {t:"تست Resolution با فانتوم"},
   {t:"QA EPID"}
 ]},
{id:"in115",title:"عیب‌یابی خطاهای MV Panel",cat:"infinity",machines:["Infinity"],code:"INF-IMG-11",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای Flat Panel MV شامل Pixel Error، Communication، و Image Quality.",
 tools:["نرم‌افزار Service","فانتوم Las Vegas"],
 steps:[
   {t:"ثبت کد خطا"},
   {t:"بررسی Communication"},
   {t:"تست Pixel Dead"},
   {t:"اجرای Dark و Flood جدید"},
   {t:"بررسی Image Quality"},
   {t:"تعویض Panel در صورت نیاز"},
   {t:"کالیبراسیون کامل"}
 ]},

/* ═══════════════════════════════════════════
   INFINITY — کالیبراسیون دز
   ═══════════════════════════════════════════ */
{id:"in116",title:"کالیبراسیون Output کامل Infinity",cat:"infinity",machines:["Infinity"],code:"INF-CAL-10",duration:"۳ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع خروجی Infinity (۶ و ۱۰ MV).",
 warn:"فقط توسط فیزیک‌دان پزشکی.",
 tools:["فانتوم آب","اتاقک Farmer","الکترومتر","Monaco"],
 steps:[
   {t:"آماده‌سازی شرایط مرجع"},
   {t:"کالیبراسیون ۶ MV"},
   {t:"کالیبراسیون ۱۰ MV"},
   {t:"محاسبه kTP برای هر انرژی"},
   {t:"مقایسه با مرجع"},
   {t:"تنظیم در Service Mode"},
   {t:"تست پایداری"},
   {t:"ثبت در فرم رسمی"}
 ]},
{id:"in117",title:"کالیبراسیون Profile Infinity",cat:"infinity",machines:["Infinity"],code:"INF-CAL-11",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون Profile عرضی Infinity.",
 tools:["فانتوم آب","اتاقک Profiler","نرم‌افزار تحلیل"],
 steps:[
   {t:"اندازه‌گیری Profile در dmax"},
   {t:"اندازه‌گیری در عمق ۱۰cm"},
   {t:"محاسبه Flatness"},
   {t:"محاسبه Symmetry"},
   {t:"تنظیم در صورت انحراف"},
   {t:"تست تأیید"},
   {t:"ثبت در فرم"}
 ]},

/* ═══════════════════════════════════════════
   SHARED — عیب‌یابی پیشرفته
   ═══════════════════════════════════════════ */
{id:"sh101",title:"عیب‌یابی خطای Modulator Arc",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-900",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای Arc در Modulator که معمولاً از رطوبت یا آلودگی است.",
 warn:"تخلیه کامل خازن‌ها قبل از کار.",
 tools:["مولتی‌متر HV","اسکوپ","هوای خشک","دستمال مخصوص"],
 steps:[
   {t:"خاموشی و تخلیه",level:"danger"},
   {t:"بررسی Log و مکان Arc"},
   {t:"تمیزکاری محل Arc"},
   {t:"بررسی رطوبت Modulator"},
   {t:"تعویض قطعات آسیب‌دیده"},
   {t:"اجرای Auto-Conditioning"},
   {t:"تست پایداری"},
   {t:"QA نهایی"}
 ]},
{id:"sh102",title:"عیب‌یابی خطای Dose Servo",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-910",duration:"۲ ساعت",level:"پیشرفته",
 summary:"رفع خطاهای Dose Servo که کنترل دز در حین تابش را به‌هم می‌زند.",
 warn:"این خطا باعث خطای دز درمان می‌شود. توقف درمان.",
 tools:["اتاقک مرجع","نرم‌افزار Service","مولتی‌متر"],
 steps:[
   {t:"توقف درمان فوری",level:"danger"},
   {t:"بررسی قرائت اتاقک‌ها"},
   {t:"بررسی Dose Servo Feedback"},
   {t:"تست کنترل حلقه بسته"},
   {t:"بررسی AGC (Automatic Gain Control)"},
   {t:"تعویض قطعه معیوب"},
   {t:"کالیبراسیون دز"},
   {t:"QA کامل"}
 ]},
{id:"sh103",title:"عیب‌یابی خطای Gantry Motor Drive",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-920",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای Motor Drive Gantry شامل Drive Board، Motor و Encoder.",
 tools:["مولتی‌متر","اسکوپ","نرم‌افزار Service"],
 steps:[
   {t:"ثبت کد دقیق"},
   {t:"بررسی Drive Board"},
   {t:"تست Motor در حرکت آهسته"},
   {t:"بررسی Encoder"},
   {t:"اندازه‌گیری جریان Motor"},
   {t:"Reset خطا"},
   {t:"تست Gantry کامل"},
   {t:"کالیبراسیون Gantry Angle"}
 ]},
{id:"sh104",title:"عیب‌یابی خطای Cooling Water Flow",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-930",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای Flow Low که معمولاً از فیلتر، پمپ یا گرفتگی است.",
 tools:["متر جریان","مولتی‌متر","ابزار لوله‌کشی"],
 steps:[
   {t:"بررسی جریان واقعی"},
   {t:"بررسی پمپ Chiller"},
   {t:"بررسی فیلترهای آب"},
   {t:"بررسی گرفتگی لوله‌ها"},
   {t:"تعویض فیلتر"},
   {t:"بررسی ΔT"},
   {t:"تست جریان پس از رفع"},
   {t:"ثبت در فرم"}
 ]},
{id:"sh105",title:"عیب‌یابی خطای Feedback Loop Error",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-940",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای Feedback Loop در سیستم کنترل دز و موقعیت.",
 tools:["اسکوپ","مولتی‌متر","نرم‌افزار تحلیل"],
 steps:[
   {t:"شناسایی Loop مشکل‌دار"},
   {t:"تست Feedback Signal"},
   {t:"بررسی Gain Loop"},
   {t:"تنظیم در Service Mode"},
   {t:"تست پاسخ دینامیکی"},
   {t:"بررسی پایداری"},
   {t:"QA نهایی"}
 ]},
{id:"sh106",title:"عیب‌یابی خطای Imaging Chain XVI/MV",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-950",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای زنجیره تصویربرداری شامل Generator، Detector و Software.",
 tools:["مولتی‌متر kV","فانتوم","نرم‌افزار Service"],
 steps:[
   {t:"ثبت کد خطا"},
   {t:"بررسی Generator"},
   {t:"بررسی Detector"},
   {t:"بررسی Communication"},
   {t:"تست کالیبراسیون"},
   {t:"رفع مشکل"},
   {t:"تست کیفیت تصویر"},
   {t:"QA Imaging"}
 ]},
{id:"sh107",title:"تنظیم دقیق Jaw Symmetry",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-960",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"تنظیم Symmetry Jawهای X و Y برای تطابق دقیق با میدان.",
 tools:["فانتوم هم‌ترازی","فیلم EBT3","نرم‌افزار Service"],
 steps:[
   {t:"Warm-up کامل"},
   {t:"Service → Collimator → Jaw Symmetry"},
   {t:"اندازه‌گیری موقعیت فعلی"},
   {t:"تنظیم Jaw X"},
   {t:"تنظیم Jaw Y"},
   {t:"تست در میدان‌های مختلف"},
   {t:"تأیید زیر ۰.۵mm"},
   {t:"Star Shot تأییدی"}
 ]},
{id:"sh108",title:"عیب‌یابی خطای Temperature Sensor",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-970",duration:"۳۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای سنسور دما در Head، Magnetron یا Modulator.",
 tools:["مولتی‌متر","متر دما مرجع","نرم‌افزار Service"],
 steps:[
   {t:"ثبت شماره سنسور"},
   {t:"اندازه‌گیری با متر مرجع"},
   {t:"مقایسه با خوانش سیستم"},
   {t:"بررسی اتصالات"},
   {t:"تعویض سنسور در صورت انحراف"},
   {t:"کالیبراسیون"},
   {t:"ثبت در فرم"}
 ]},
{id:"sh109",title:"عیب‌یابی خطای Pressure Sensor",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-980",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"رفع خطاهای Pressure Sensor در SF6 یا آب خنک‌کننده.",
 tools:["متر فشار مرجع","مولتی‌متر","ابزار کالیبراسیون"],
 steps:[
   {t:"اندازه‌گیری فشار واقعی"},
   {t:"مقایسه با خوانش سیستم"},
   {t:"بررسی اتصالات سنسور"},
   {t:"تعویض سنسور در صورت انحراف"},
   {t:"کالیبراسیون"},
   {t:"تست سیستم"},
   {t:"ثبت در فرم"}
 ]},
{id:"sh110",title:"عیب‌یابی خطای RF Reflection",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-990",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای Reflection بالا که معمولاً از Circulator یا Waveguide است.",
 warn:"تخلیه SF6 قبل از کار روی Waveguide.",
 tools:["مولتی‌متر HV","VSWR متر","اسکوپ RF"],
 steps:[
   {t:"اندازه‌گیری VSWR"},
   {t:"بررسی Circulator"},
   {t:"بررسی Waveguide"},
   {t:"بررسی فشار SF6"},
   {t:"تعویض قطعه معیوب"},
   {t:"تنظیم AFC"},
   {t:"QA RF نهایی"}
 ]},

/* ═══════════════════════════════════════════
   SHARED — PM عمیق
   ═══════════════════════════════════════════ */
{id:"pm201",title:"PM شش‌ماهه جامع Synergy",cat:"pm",machines:["Synergy"],code:"PM-SYN-06",duration:"۶ ساعت",level:"پیشرفته",
 summary:"PM شش‌ماهه Synergy شامل بازرسی کامل RF، مکانیک، خنک‌کننده و کالیبراسیون‌های میانی.",
 tools:["کل ابزارهای QA","چک‌لیست Elekta","گریس","فیلتر"],
 steps:[
   {t:"بازرسی Magnetron و Klystron"},
   {t:"تنظیم AFC و بررسی پایداری"},
   {t:"بررسی SF6 و شارژ در صورت نیاز"},
   {t:"روانکاری ریل‌های MLCi2"},
   {t:"بررسی Encoderهای Gantry و Couch"},
   {t:"تعویض فیلتر Chiller"},
   {t:"بررسی جریان و ΔT"},
   {t:"کالیبراسیون MLC میانی"},
   {t:"کالیبراسیون دز میانی"},
   {t:"تست ایمنی کامل"},
   {t:"گزارش و امضا"}
 ]},
{id:"pm202",title:"PM شش‌ماهه جامع Infinity",cat:"pm",machines:["Infinity"],code:"PM-INF-06",duration:"۶ ساعت",level:"پیشرفته",
 summary:"PM شش‌ماهه Infinity شامل Agility، HexaPOD، RF و Integrity.",
 tools:["کل ابزارهای QA","چک‌لیست Elekta"],
 steps:[
   {t:"بازرسی Klystron و تنظیم RF"},
   {t:"بررسی SF6"},
   {t:"روانکاری Agility"},
   {t:"کالیبراسیون Gain Agility"},
   {t:"بررسی HexaPOD و کالیبراسیون"},
   {t:"تعویض فیلتر Chiller"},
   {t:"بررسی Integrity"},
   {t:"کالیبراسیون دز میانی"},
   {t:"تست ایمنی"},
   {t:"گزارش"}
 ]},
{id:"pm203",title:"PM سالانه جامع Synergy",cat:"pm",machines:["Synergy"],code:"PM-SYN-12",duration:"۲ روز",level:"پیشرفته",
 summary:"PM سالانه جامع Synergy طبق پروتکل Elekta و AAPM TG-142.",
 warn:"نیازمند تعطیلی موقت دستگاه.",
 tools:["کل ابزارها","چک‌لیست TG-142","تیم فیزیک و مهندسی"],
 steps:[
   {t:"بازرسی کامل مکانیکی Gantry"},
   {t:"بازرسی Couch و Collimator"},
   {t:"کالیبراسیون MLCi2 کامل"},
   {t:"تعویض قطعات مصرفی"},
   {t:"تعویض آب خنک‌کننده"},
   {t:"تعویض فیلترها"},
   {t:"کالیبراسیون دز جامع"},
   {t:"کالیبراسیون XVI"},
   {t:"QA سالانه کامل"},
   {t:"گزارش و ارسال به Elekta"}
 ]},
{id:"pm204",title:"PM سالانه جامع Infinity",cat:"pm",machines:["Infinity"],code:"PM-INF-12",duration:"۲ روز",level:"پیشرفته",
 summary:"PM سالانه جامع Infinity طبق پروتکل Elekta.",
 warn:"تعطیلی موقت دستگاه الزامی.",
 tools:["کل ابزارها","چک‌لیست Elekta"],
 steps:[
   {t:"بازرسی کامل مکانیک"},
   {t:"کالیبراسیون Agility کامل"},
   {t:"کالیبراسیون HexaPOD"},
   {t:"تعویض قطعات مصرفی"},
   {t:"تعویض آب و فیلترها"},
   {t:"کالیبراسیون دز کامل"},
   {t:"کالیبراسیون XVI و MV Imager"},
   {t:"QA سالانه"},
   {t:"گزارش نهایی"}
 ]},
{id:"pm205",title:"PM فصلی (Quarterly) عمومی",cat:"pm",machines:["Synergy","Infinity"],code:"PM-Q-100",duration:"۳ ساعت",level:"متوسط",
 summary:"PM فصلی شامل تعویض فیلترها، بازرسی مسیر خنک‌کننده و کالیبراسیون‌های سریع.",
 tools:["فیلترها","مایع خنک‌کننده","چک‌لیست"],
 steps:[
   {t:"تعویض فیلتر آب Chiller"},
   {t:"تعویض فیلتر هوا"},
   {t:"بررسی جریان آب"},
   {t:"بررسی ΔT"},
   {t:"بازرسی ریل‌های Gantry"},
   {t:"بازرسی MLC"},
   {t:"کالیبراسیون سریع دز"},
   {t:"تست ایمنی"},
   {t:"گزارش"}
 ]}
);

/* ════════ کدهای خطای جدید ════════ */
ERRORS.push(
/* ─── Synergy ─── */
{code:"SYN-E30",sev:"red",machine:"Synergy",title:"MLCi2 Driver Board Failure",act:"تعویض Driver Board"},
{code:"SYN-E31",sev:"orange",machine:"Synergy",title:"MLCi2 Encoder Mismatch",act:"تعویض Encoder Leaf"},
{code:"SYN-E32",sev:"red",machine:"Synergy",title:"Pulse Transformer Arc",act:"تخلیه — تعویض"},
{code:"SYN-E33",sev:"orange",machine:"Synergy",title:"Pulse Width Out of Range",act:"تنظیم Pulse Width"},
{code:"SYN-E34",sev:"red",machine:"Synergy",title:"Collimator Motor Failure",act:"تعویض Motor"},
{code:"SYN-E35",sev:"orange",machine:"Synergy",title:"Jaw Backlash High",act:"تنظیم Backlash"},
{code:"SYN-E36",sev:"red",machine:"Synergy",title:"Gantry Rail Wear",act:"بررسی و روانکاری"},
{code:"SYN-E37",sev:"orange",machine:"Synergy",title:"XVI Panel Communication",act:"بررسی کابل"},
{code:"SYN-E38",sev:"red",machine:"Synergy",title:"XVI Reconstruction Failure",act:"بررسی FlexMap"},
{code:"SYN-E39",sev:"orange",machine:"Synergy",title:"Output Drift (6MV)",act:"کالیبراسیون ۶MV"},
{code:"SYN-E40",sev:"orange",machine:"Synergy",title:"Energy Drift (10MV)",act:"کالیبراسیون ۱۰MV"},
{code:"SYN-E41",sev:"orange",machine:"Synergy",title:"Energy Drift (18MV)",act:"کالیبراسیون ۱۸MV"},
{code:"SYN-E42",sev:"orange",machine:"Synergy",title:"Flatness Out of Range",act:"کالیبراسیون Profile"},
{code:"SYN-E43",sev:"orange",machine:"Synergy",title:"Symmetry Out of Range",act:"کالیبراسیون Profile"},

/* ─── Infinity ─── */
{code:"INF-E30",sev:"red",machine:"Infinity",title:"Agility Bank Failure",act:"تعویض Bank"},
{code:"INF-E31",sev:"red",machine:"Infinity",title:"Agility Motor Overheat",act:"خنک شدن و بررسی"},
{code:"INF-E32",sev:"orange",machine:"Infinity",title:"Agility Backlash High",act:"تنظیم Backlash"},
{code:"INF-E33",sev:"orange",machine:"Infinity",title:"Agility Gain Drift",act:"کالیبراسیون Gain"},
{code:"INF-E34",sev:"red",machine:"Infinity",title:"Integrity Database Corrupt",act:"Repair Database"},
{code:"INF-E35",sev:"orange",machine:"Infinity",title:"ARIA Connection Lost",act:"بررسی شبکه"},
{code:"INF-E36",sev:"orange",machine:"Infinity",title:"DICOM Transfer Failed",act:"بررسی AE Title"},
{code:"INF-E37",sev:"red",machine:"Infinity",title:"HexaPOD Motor Failure",act:"تعویض Motor"},
{code:"INF-E38",sev:"orange",machine:"Infinity",title:"HexaPOD Encoder Error",act:"تعویض Encoder"},
{code:"INF-E39",sev:"red",machine:"Infinity",title:"HexaPOD Communication Lost",act:"بررسی کابل"},
{code:"INF-E40",sev:"red",machine:"Infinity",title:"6DoF Correction Failed",act:"کالیبراسیون HexaPOD"},
{code:"INF-E41",sev:"orange",machine:"Infinity",title:"FFF 6MV Dose Rate Unstable",act:"تنظیم Pulse"},
{code:"INF-E42",sev:"orange",machine:"Infinity",title:"FFF 10MV Dose Rate Unstable",act:"تنظیم Pulse"},
{code:"INF-E43",sev:"red",machine:"Infinity",title:"FFF Filter Position Error",act:"بررسی Motor فیلتر"},
{code:"INF-E44",sev:"orange",machine:"Infinity",title:"MV Panel Communication",act:"بررسی اتصالات"},
{code:"INF-E45",sev:"orange",machine:"Infinity",title:"MV Panel Pixel Error",act:"اجرای Flood جدید"},
{code:"INF-E46",sev:"orange",machine:"Infinity",title:"Output Drift (6MV)",act:"کالیبراسیون"},
{code:"INF-E47",sev:"orange",machine:"Infinity",title:"Output Drift (10MV)",act:"کالیبراسیون"},
{code:"INF-E48",sev:"orange",machine:"Infinity",title:"Profile Out of Tolerance",act:"کالیبراسیون Profile"},

/* ─── مشترک ─── */
{code:"CMM-001",sev:"red",machine:"Synergy / Infinity",title:"Modulator Arc Detected",act:"تمیزکاری و Conditioning"},
{code:"CMM-002",sev:"red",machine:"Synergy / Infinity",title:"Dose Servo Failure",act:"توقف — بررسی Servo"},
{code:"CMM-003",sev:"red",machine:"Synergy / Infinity",title:"Gantry Motor Drive Failure",act:"تعویض Drive Board"},
{code:"CMM-004",sev:"orange",machine:"Synergy / Infinity",title:"Cooling Water Flow Low",act:"تعویض فیلتر"},
{code:"CMM-005",sev:"orange",machine:"Synergy / Infinity",title:"Feedback Loop Error",act:"تنظیم Loop"},
{code:"CMM-006",sev:"red",machine:"Synergy / Infinity",title:"Imaging Chain Failure",act:"بررسی Generator و Detector"},
{code:"CMM-007",sev:"orange",machine:"Synergy / Infinity",title:"Jaw Symmetry Error",act:"تنظیم Jaw"},
{code:"CMM-008",sev:"orange",machine:"Synergy / Infinity",title:"Temperature Sensor Failure",act:"تعویض سنسور"},
{code:"CMM-009",sev:"orange",machine:"Synergy / Infinity",title:"Pressure Sensor Failure",act:"تعویض سنسور"},
{code:"CMM-010",sev:"orange",machine:"Synergy / Infinity",title:"RF Reflection High",act:"بررسی Circulator"}
);

console.log("✅ data8.js — Added " + 40 + " manuals, " + 50 + " errors");