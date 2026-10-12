/* ═══════════════════════════════════════
   data7.js — SBRT / SRS (نسخه ۵.۰)
   ۱۰ منوال تخصصی + ۱۵ کد خطا
   ═══════════════════════════════════════ */

MANUALS.push(

/* ════════ SBRT / SRS ════════ */
{id:"sbrt1",title:"Winston-Lutz Test روزانه",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-10",duration:"۲۵ دقیقه",level:"پیشرفته",
 summary:"تست روزانه Winston-Lutz برای تأیید دقت Isocenter در حد زیر میلی‌متر — پیش‌نیاز هر درمان SBRT/SRS.",
 warn:"انحراف بیش از ۱mm نیازمند توقف SBRT و بررسی سیستم است.",
 tools:["فانتوم Winston-Lutz","فیلم EBT3","اسکنر فیلم","نرم‌افزار تحلیل"],
 steps:[
   {t:"قرارگیری فانتوم Winston-Lutz در Isocenter با لیزر"},
   {t:"اجرای ۸ تابش: ۴ Gantry × ۴ Couch"},
   {t:"Development فیلم و اسکن با ۳۰۰ DPI"},
   {t:"تحلیل با نرم‌افزار اختصاصی"},
   {t:"محاسبه انحراف مرکز پرتو از مرکز فانتوم",note:"انحراف مجاز زیر ۱mm",level:"warn"},
   {t:"بررسی انحراف در هر Gantry Angle جداگانه"},
   {t:"در صورت انحراف، کالیبراسیون Isocenter"},
   {t:"ثبت نتیجه در فرم QA روزانه SBRT"}
 ]},
{id:"sbrt2",title:"Patient-specific QA برای SBRT",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-11",duration:"۲ ساعت",level:"پیشرفته",
 summary:"QA اختصاصی هر بیمار SBRT شامل تأیید دز پلن با فانتوم و تحلیل Gamma.",
 warn:"هیچ درمان SBRT نباید بدون QA بیمار-اختصاصی انجام شود.",
 tools:["فانتوم ArcCHECK یا Delta4","نرم‌افزار تحلیل Gamma","پلن بیمار"],
 steps:[
   {t:"انتقال پلن از TPS به دستگاه"},
   {t:"راه‌اندازی فانتوم ArcCHECK در Isocenter"},
   {t:"اجرای پلن SBRT روی فانتوم"},
   {t:"تحلیل نتایج با معیار Gamma",note:"۳٪ / ۲mm با ۹۵٪ عبور",level:"warn"},
   {t:"بررسی Pass Rate در هر میدان"},
   {t:"در صورت رد، بازبینی پلن یا کالیبراسیون"},
   {t:"تأیید نهایی توسط فیزیک‌دان"},
   {t:"آرشیو گزارش در پرونده بیمار"}
 ]},
{id:"sbrt3",title:"راه‌اندازی BodyFix و Stereotactic Frame",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-SETUP-10",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"Immobilization بیمار SBRT با BodyFix و Stereotactic Frame برای دقت بالا.",
 tools:["BodyFix","Stereotactic Frame","شاخص MRI-compatible","پد مخصوص"],
 steps:[
   {t:"آماده‌سازی BodyFix و بررسی سلامت"},
   {t:"قرارگیری بیمار و تخلیه هوای BodyFix",note:"فشار منفی باید حفظ شود"},
   {t:"نصب Stereotactic Frame در صورت نیاز"},
   {t:"CT شبیه‌سازی با پروتکل SBRT"},
   {t:"انتقال به اتاق درمان و تنظیم با HexaPOD"},
   {t:"بررسی تطابق با CBCT",level:"warn"},
   {t:"تصحیح ۶DoF در صورت نیاز"},
   {t:"ثبت موقعیت نهایی در پرونده"}
 ]},
{id:"sbrt4",title:"کالیبراسیون SBRT Isocenter",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-CAL-10",duration:"۴ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع Isocenter برای درمان‌های SBRT و SRS با دقت زیر میلی‌متر.",
 warn:"این رویه نیازمند حضور فیزیک‌دان پزشکی است.",
 tools:["فانتوم Winston-Lutz","فانتوم Isocenter","Star Shot","نرم‌افزار تحلیل"],
 steps:[
   {t:"Warm-up کامل دستگاه"},
   {t:"اجرای Winston-Lutz اولیه"},
   {t:"اجرای Star Shot در چند Gantry Angle"},
   {t:"تحلیل نتایج و تعیین انحراف"},
   {t:"تنظیم Isocenter مکانیکی در صورت انحراف",level:"warn"},
   {t:"اجرای تست مجدد"},
   {t:"تأیید انحراف زیر ۰.۵mm"},
   {t:"بررسی انحراف در Couch Rotation"},
   {t:"ثبت در فرم کالیبراسیون سالانه"}
 ]},
{id:"sbrt5",title:"QA ماهانه SBRT — Comprehensive",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-12",duration:"۳ ساعت",level:"پیشرفته",
 summary:"QA ماهانه جامع SBRT شامل Winston-Lutz، Star Shot، HexaPOD، و CBCT.",
 tools:["فانتوم Winston-Lutz","Star Shot","فانتوم HexaPOD","CatPhan"],
 steps:[
   {t:"Winston-Lutz Test"},
   {t:"Star Shot در ۴ Angle"},
   {t:"تست دقت HexaPOD ۶DoF",note:"انحراف زیر ۱mm و ۱°"},
   {t:"تست دقت CBCT Isocenter"},
   {t:"بررسی Image Guidance در حالت 3D/3D Match"},
   {t:"تست Adaptive Planning (در صورت وجود)"},
   {t:"بررسی Pencil Beam یا Monte Carlo Algorithm"},
   {t:"تأیید نهایی توسط فیزیک‌دان"},
   {t:"ثبت در فرم QA ماهانه"}
 ]},
{id:"sbrt6",title:"تست Respiratory Gating (RPM)",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-13",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"بررسی دقت سیستم RPM برای درمان بیماران با حرکت تنفسی.",
 tools:["دوربین RPM","Marker Block","فانتوم RPM"],
 steps:[
   {t:"بررسی نصب دوربین RPM"},
   {t:"روشن کردن نرم‌افزار RPM"},
   {t:"بررسی Marker Block — بازتاب IR"},
   {t:"کالیبراسیون Baseline با Marker"},
   {t:"تنظیم Gating Threshold و Phase"},
   {t:"تست دقت موقعیت با فانتوم RPM",note:"انحراف زیر ۱mm"},
   {t:"اندازه‌گیری Latency",note:"زیر ۱۰۰ms"},
   {t:"تست هماهنگی بین Gate و Beam On"},
   {t:"ثبت در فرم QA"}
 ]},
{id:"sbrt7",title:"QA روزانه SRS — سیستم قفل جمجمه",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SRS-QA-10",duration:"۳۰ دقیقه",level:"پیشرفته",
 summary:"بررسی روزانه SRS شامل دقت Frame، Isocenter و تست Winston-Lutz پیشرفته.",
 warn:"SRS دقت زیر ۰.۵mm نیاز دارد — خطاهای کوچک حیاتی هستند.",
 tools:["فانتوم SRS","Frame مخصوص","فیلم EBT3","نرم‌افزار تحلیل"],
 steps:[
   {t:"بازرسی Frame و بررسی سلامت"},
   {t:"نصب Frame روی فانتوم SRS"},
   {t:"قرارگیری در Isocenter با دقت"},
   {t:"اجرای Winston-Lutz پیشرفته"},
   {t:"تحلیل نتایج با دقت بالا",note:"زیر ۰.۵mm",level:"warn"},
   {t:"تست دقت Frame در Table Angles"},
   {t:"بررسی انحراف در ۶ جهت"},
   {t:"ثبت در فرم QA SRS"}
 ]},
{id:"sbrt8",title:"کالیبراسیون FFF برای SBRT",cat:"trouble",machines:["Infinity","Versa HD"],code:"SBRT-CAL-11",duration:"۴ ساعت",level:"پیشرفته",
 summary:"کالیبراسیون جامع پرتو FFF برای درمان SBRT با Dose Rate بالا.",
 warn:"دقت این کالیبراسیون حیاتی است. انحراف بیشتر از ۱٪ مشکل‌ساز.",
 tools:["فانتوم آب","اتاقک Farmer و PinPoint","الکترومتر","نرم‌افزار Monaco"],
 steps:[
   {t:"بررسی نصب Hardware FFF"},
   {t:"Service → Beam Configuration"},
   {t:"کالیبراسیون Output در Dose Rate بالا"},
   {t:"اندازه‌گیری PDD و Profile"},
   {t:"بررسی Flatness (نباید اعمال شود در FFF)"},
   {t:"بررسی Penumbra"},
   {t:"مدل‌سازی در Monaco"},
   {t:"تست SBRT با فانتوم و تحلیل Gamma"},
   {t:"ثبت در فرم کالیبراسیون"}
 ]},
{id:"sbrt9",title:"تست 3D/3D Match و 6DoF",cat:"trouble",machines:["Infinity","Versa HD","Synergy"],code:"SBRT-QA-14",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"تست دقت سیستم تطبیق تصویر 3D/3D و تصحیح ۶DoF برای SBRT.",
 tools:["فانتوم 6DoF","فانتوم Isocenter","نرم‌افزار XVI"],
 steps:[
   {t:"تنظیم فانتوم در موقعیت مرجع"},
   {t:"تصویرگیری CBCT مرجع"},
   {t:"اعمال Offset در ۶ جهت به فانتوم"},
   {t:"تصویرگیری CBCT دوم"},
   {t:"اجرای 3D/3D Match"},
   {t:"بررسی دقت تشخیص Offset",note:"زیر ۱mm و ۱°"},
   {t:"اعمال 6DoF Correction"},
   {t:"بررسی دقت پس از تصحیح"},
   {t:"اجرای تست مجدد برای پایداری"}
 ]},
{id:"sbrt10",title:"تست In-Vivo Dosimetry SBRT",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"SBRT-QA-15",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"استفاده از Diode In-Vivo برای تأیید دز بیمار در حین درمان SBRT.",
 tools:["Diode EDP-1","Electrometer","کالیبراسیون Diode"],
 steps:[
   {t:"بررسی کالیبراسیون Diode"},
   {t:"تعیین ضریب تصحیح دمایی"},
   {t:"تعیین ضریب تصحیح Field Size"},
   {t:"تعیین ضریب تصحیح SSD"},
   {t:"نصب Diode روی پوست بیمار"},
   {t:"مقایسه دز اندازه‌گیری با دز TPS",note:"انحراف زیر ۵٪",level:"warn"},
   {t:"ثبت نتایج در پرونده بیمار"},
   {t:"تحلیل آماری برای چند بیمار"}
 ]}
);

ERRORS.push(
{code:"SBRT-E01",sev:"red",machine:"همه Linacها",title:"Winston-Lutz Failed",act:"توقف SBRT — بررسی Isocenter"},
{code:"SBRT-E02",sev:"red",machine:"همه Linacها",title:"Isocenter Drift > 1mm",act:"کالیبراسیون فوری"},
{code:"SBRT-E03",sev:"orange",machine:"همه Linacها",title:"Gamma Pass Rate < 90%",act:"بازبینی پلن"},
{code:"SBRT-E04",sev:"orange",machine:"Infinity",title:"HexaPOD Out of Range",act:"Reset موقعیت"},
{code:"SBRT-E05",sev:"red",machine:"Infinity",title:"6DoF Correction Failed",act:"بررسی HexaPOD"},
{code:"SBRT-E06",sev:"orange",machine:"Synergy / Infinity",title:"RPM Marker Lost",act:"بررسی Marker و دوربین"},
{code:"SBRT-E07",sev:"red",machine:"Synergy / Infinity",title:"Gating Signal Failure",act:"توقف Gated Therapy"},
{code:"SBRT-E08",sev:"blue",machine:"همه Linacها",title:"RPM Calibration Drift",act:"کالیبراسیون Baseline"},
{code:"SBRT-E09",sev:"red",machine:"Infinity / Versa HD",title:"FFF Dose Rate Unstable",act:"تنظیم Pulse Rate"},
{code:"SBRT-E10",sev:"orange",machine:"همه Linacها",title:"In-Vivo Dose Deviation >5%",act:"بررسی Diode و پلن"},
{code:"SBRT-E11",sev:"orange",machine:"همه Linacها",title:"3D/3D Match Failed",act:"بررسی تصویر و Offset"},
{code:"SBRT-E12",sev:"red",machine:"همه Linacها",title:"Frame Displacement",act:"توقف — بررسی Frame"},
{code:"SBRT-E13",sev:"orange",machine:"همه Linacها",title:"CBCT Quality Low",act:"کالیبراسیون XVI"},
{code:"SBRT-E14",sev:"red",machine:"همه Linacها",title:"Patient Movement Detected",act:"توقف — بررسی موقعیت"},
{code:"SBRT-E15",sev:"orange",machine:"همه Linacها",title:"Immobilization Compromised",act:"تعویض BodyFix"}
);

console.log("✅ data7.js — Added " + 10 + " manuals, " + 15 + " errors");