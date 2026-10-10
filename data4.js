/* ═══════════════════════════════════════
   data4.js — نسخه ۴.۱ (گسترش محتوا)
   ۳۰ منوال جدید + ۳۰ کد خطا
   ═══════════════════════════════════════ */

const MANUALS_V4 = [

/* ════════ تعویض قطعات — گسترش ════════ */
{id:"r8",title:"تعویض Ion Chamber مانیتور دوم",cat:"replace",machines:["Synergy","Infinity","Versa HD"],code:"REP-560",duration:"۲ ساعت",level:"متوسط",
 summary:"تعویض اتاقک یون"},
یزاسیون دوم (Monitor   Chamber 2) در مسیر پرتو {.",
 warn:"پس از تعویضt، حتماً کالیبراسیون:"ج دز انجام شود.",
 tools:["پیچ‌گوشتی Torx","دستکش","فیلر دقیق","مولتی‌متر"],
 steps:[
   {t:"خاموشی و انتظار سرد شدن"},
   {t:"باز کردن پنل Head و دسترسی به اتاقک دومدا کردن کابل HV و سیگنال"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"نصب اتاقک جدید با تنظیم موقعیت",level:"warn",note:"دقت در هم‌ترازی با اتاقک اول"},
   {t:"اتصال کابل‌ها و بستن پنل"},
   {t:"اجرای Daily QA و کالیبراسیون مجدد"}
 ]},
{id:"r9",title:"تعویض Head Cable Assembly",cat:"replace",machines:["Synergy","Infinity"],code:"REP-565",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض کابل‌های Head شامل کابل‌های HV، سیگنال و خنک‌کننده.",
 warn:"کابل‌ها باید دقیقاً با Part Number یکسان باشند.",
 tools:["دستکش ESD","پیچ‌گوشتی","برچسب‌گذاری"],
 steps:[
   {t:"خاموشی کامل و برچسب‌گذاری همه کابل‌ها"},
   {t:"عکس گرفتن از اتصالات"},
   {t:"جدا کردن کابل‌های HV",level:"warn"},
   {t:"جدا کردن کابل‌های سیگنال"},
   {t:"نصب کابل‌های جدید طبق عکس‌ها"},
   {t:"تست پیوستگی کابل‌ها"},
   {t:"اجرای QA کامل و بررسی سیگنال‌ها"}
 ]},
{id:"r10",title:"تعویض Bending Magnet",cat:"replace",machines:["Synergy","Infinity","Versa HD"],code:"REP-570",duration:"۶ ساعت",level:"پیشرفته",
 summary:"تعویض آهنربای خمشی که مسیر الکترون رو تصحیح می‌کند.",
 warn:"نیازمند هماهنگی با Elekta Service. جرثقیل و ابزار مخصوص لازم است.",
 tools:["جرثقیل کوچک","آچار تورک","Alignment Tool"],
 steps:[
   {t:"خاموشی کامل و تخلیه خازن‌ها",level:"danger"},
   {t:"باز کردن پنل Head و دسترسی به Bending Magnet"},
   {t:"جدا کردن اتصالات آب خنک‌کننده"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"خارج کردن Bending Magnet با جرثقیل",level:"warn"},
   {t:"نصب Bending Magnet جدید"},
   {t:"اتصال آب و تست نشتی"},
   {t:"اجرای Auto-Conditioning و کالیبراسیون"}
 ]},
{id:"r11",title:"تعویض Filament Transformer",cat:"replace",machines:["Synergy","Infinity","Versa HD"],code:"REP-575",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض ترانس Filament که تغذیه گرم‌کننده Magnetron/Klystron را تأمین می‌کند.",
 warn:"ولتاژها می‌توانند خطرناک باشند. تخلیه کامل قبل از کار.",
 tools:["مولتی‌متر","پیچ‌گوشتی","دستکش ESD"],
 steps:[
   {t:"خاموشی و تخلیه خازن‌ها",level:"danger"},
   {t:"برچسب‌گذاری سیم‌های اولیه و ثانویه"},
   {t:"جدا کردن اتصالات"},
   {t:"باز کردن پیچ‌های نگه‌دارنده"},
   {t:"نصب Transformer جدید"},
   {t:"اتصال طبق برچسب‌ها"},
   {t:"تست ولتاژ خروجی"},
   {t:"اجرای Auto-Conditioning و بررسی"}
 ]},
{id:"r12",title:"تعویض Water Manifold",cat:"replace",machines:["Synergy","Infinity","Versa HD"],code:"REP-580",duration:"۴ ساعت",level:"پیشرفته",
 summary:"تعویض توزیع‌کننده آب خنک‌کننده Head.",
 warn:"خطر نشتی آب و آسیب به قطعات الکترونیکی.",
 tools:["آچار مخصوص","دستمال جاذب","رگولاتور فشار"],
 steps:[
   {t:"خاموشی و تخلیه آب از سیستم",level:"warn"},
   {t:"برچسب‌گذاری اتصالات آب"},
   {t:"جدا کردن لوله‌ها"},
   {t:"باز کردن Manifold قدیمی"},
   {t:"نصب Manifold جدید با اورینگ‌های نو"},
   {t:"اتصال لوله‌ها"},
   {t:"پر کردن آب و تست نشتی"},
   {t:"اجرای QA"}
 ]},

/* ════════ عیب‌یابی — گسترش ════════ */
{id:"t11",title:"عیب‌یابی خطای Motor Overload",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-700",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"رفع خطای Overload در موتورهای Gantry، Collimator، Jaw یا MLC.",
 tools:["مولتی‌متر","چک‌لیست Motor","دماسنج"],
 steps:[
   {t:"شناسایی Motor مشکل‌دار از Log"},
   {t:"بررسی دمای Motor",note:"دمای بالای ۸۰°C غیرعادی است"},
   {t:"بررسی بار مکانیکی"},
   {t:"بررسی جریان Motor با مولتی‌متر"},
   {t:"بررسی اتصالات و کابل‌ها"},
   {t:"Reset خطا و تست حرکت"},
   {t:"تعویض Motor در صورت تکرار"}
 ]},
{id:"t12",title:"عیب‌یابی خطای Temperature Sensor",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"TRB-705",duration:"۳۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای سنسور دما در Modulator، Magnetron یا Chiller.",
 tools:["مولتی‌متر","متر دما مرجع","چک‌لیست"],
 steps:[
   {t:"ثبت کد خطا و شماره سنسور"},
   {t:"اندازه‌گیری دما با متر مرجع"},
   {t:"مقایسه با خوانش سیستم",note:"اختلاف مجاز ± ۲°C"},
   {t:"بررسی اتصالات سنسور"},
   {t:"تست پیوستگی کابل"},
   {t:"تعویض سنسور در صورت انحراف"},
   {t:"کالیبراسیون مجدد در سیستم"}
 ]},
{id:"t13",title:"عیب‌یابی مشکل ارتباط سریال",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-710",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"رفع خطاهای RS-232 یا RS-485 بین کنسول و دستگاه.",
 tools:["مولتی‌متر","RS-232 Tester","کابل تست"],
 steps:[
   {t:"بررسی کابل و اتصالات"},
   {t:"تست پیوستگی Pin‌ها"},
   {t:"اندازه‌گیری ولتاژ سیگنال (باید ± ۵-۱۲V)"},
   {t:"تست با Tester یا اسکوپ"},
   {t:"ری‌استارت سرویس ارتباطی"},
   {t:"بررسی Baud Rate و Parity"},
   {t:"تعویض کابل در صورت نیاز"}
 ]},
{id:"t14",title:"عیب‌یابی خطای Axial Movement",cat:"trouble",machines:["Synergy","Infinity"],code:"TRB-715",duration:"۶۰ دقیقه",level:"پیشرفته",
 summary:"رفع خطاهای حرکت محوری میز در محور طولی.",
 tools:["مولتی‌متر","فیلر","نرم‌افزار Service"],
 steps:[
   {t:"بررسی کد خطا در Service Log"},
   {t:"تست حرکت در محور Long"},
   {t:"بررسی Encoder محور"},
   {t:"بررسی Motor Drive"},
   {t:"کالیبراسیون موقعیت صفر"},
   {t:"تست Load Tolerance با وزن استاندارد"},
   {t:"اجرای QA"}
 ]},
{id:"t15",title:"عیب‌یابی Radiation Monitor",cat:"trouble",machines:["Synergy","Infinity","Versa HD"],code:"TRB-720",duration:"۴۵ دقیقه",level:"متوسط",
 summary:"رفع خطاهای Radiation Monitor یا Area Monitor اتاق درمان.",
 tools:["Survey Meter مرجع","چک‌لیست"],
 steps:[
   {t:"بررسی منبع تغذیه Monitor"},
   {t:"تست Signal خروجی"},
   {t:"مقایسه با Survey Meter مرجع"},
   {t:"بررسی کالیبراسیون Monitor"},
   {t:"بررسی اتصالات کابل"},
   {t:"Reset خطا"},
   {t:"کالیبراسیون مجدد"}
 ]},

/* ════════ Synergy اختصاصی — گسترش ════════ */
{id:"s7",title:"تعویض Bending Magnet Synergy",cat:"synergy",machines:["Synergy"],code:"SYN-REP-03",duration:"۶ ساعت",level:"پیشرفته",
 summary:"تعویض Bending Magnet در Synergy که مسیر الکترون را به سمت Target منحرف می‌کند.",
 warn:"هماهنگی با Elekta Service الزامی است.",
 tools:["جرثقیل","آچار تورک","Alignment Tool مخصوص"],
 steps:[
   {t:"خاموشی کامل و برچسب‌گذاری",level:"danger"},
   {t:"تخلیه خازن‌های HV"},
   {t:"باز کردن پنل Head"},
   {t:"جدا کردن اتصالات آب و سیگنال"},
   {t:"خارج کردن Bending Magnet با جرثقیل",level:"warn"},
   {t:"نصب Bending Magnet جدید"},
   {t:"تنظیم Alignment با ابزار مخصوص"},
   {t:"اتصال و تست نشتی"},
   {t:"Auto-Conditioning و کالیبراسیون"}
 ]},
{id:"s8",title:"تعویض Backup Chain Assembly",cat:"synergy",machines:["Synergy"],code:"SYN-REP-04",duration:"۵ ساعت",level:"پیشرفته",
 summary:"تعویض زنجیر پشتیبان مکانیزم در Synergy.",
 warn:"زنجیر تحت کشش است — احتیاط در باز کردن.",
 tools:["آچار مخصوص","ابزار کشش","گریس زنجیر"],
 steps:[
   {t:"خاموشی و قفل مکانیکی"},
   {t:"علامت‌گذاری موقعیت اولیه"},
   {t:"آزاد کردن کشش زنجیر"},
   {t:"باز کردن زنجیر قدیمی"},
   {t:"نصب زنجیر جدید"},
   {t:"تنظیم کشش طبق مشخصات"},
   {t:"گریس‌کاری زنجیر"},
   {t:"تست حرکت کامل"}
 ]},
{id:"s9",title:"عیب‌یابی خطای Synergy Motor",cat:"synergy",machines:["Synergy"],code:"SYN-TRB-02",duration:"۹۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای Motor در Synergy که معمولاً از Encoder یا Drive است.",
 tools:["مولتی‌متر","نرم‌افزار Service"],
 steps:[
   {t:"ثبت کد خطای دقیق"},
   {t:"بررسی Log در Service Mode"},
   {t:"بررسی Encoder Motor"},
   {t:"بررسی Drive Board"},
   {t:"تست Motor در حرکت آهسته"},
   {t:"Reset خطا"},
   {t:"کالیبراسیون در صورت نیاز"}
 ]},

/* ════════ Infinity اختصاصی — گسترش ════════ */
{id:"i8",title:"کالیبراسیون Verifying XV",cat:"infinity",machines:["Infinity"],code:"INF-CAL-02",duration:"۶۰ دقیقه",level:"پیشرفته",
 summary:"کالیبراسیون Verifying XV برای تأیید موقعیت بیمار قبل از درمان.",
 warn:"نیازمند فانتوم کالیبراسیون XV.",
 tools:["فانتوم XV","نرم‌افزار XVI Service"],
 steps:[
   {t:"نصب فانتوم کالیبراسیون در Isocenter"},
   {t:"ورود به XVI Service → Verifying XV"},
   {t:"اجرای اسکن کالیبراسیون"},
   {t:"تحلیل نتایج",note:"انحراف مجاز زیر ۱mm"},
   {t:"تست با Marker در موقعیت‌های مختلف"},
   {t:"ذخیره کالیبراسیون"},
   {t:"اجرای QA Verify"}
 ]},
{id:"i9",title:"تعویض Motor Klystron Cooling",cat:"infinity",machines:["Infinity"],code:"INF-REP-02",duration:"۲ ساعت",level:"متوسط",
 summary:"تعویض موتور فن خنک‌کننده Klystron.",
 warn:"دستگاه باید سرد باشد.",
 tools:["پیچ‌گوشتی","آچار مخصوص"],
 steps:[
   {t:"خاموشی و انتظار سرد شدن"},
   {t:"باز کردن پنل Klystron"},
   {t:"جدا کردن کابل Motor"},
   {t:"باز کردن پیچ‌های فن"},
   {t:"نصب فن جدید"},
   {t:"اتصال کابل"},
   {t:"تست چرخش و جریان هوا"},
   {t:"اجرای QA"}
 ]},
{id:"i10",title:"عیب‌یابی خطای Aperture",cat:"infinity",machines:["Infinity"],code:"INF-TRB-02",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"رفع خطاهای Aperture در Infinity.",
 tools:["مولتی‌متر","نرم‌افزار Service"],
 steps:[
   {t:"ثبت کد خطا"},
   {t:"بررسی Service Log"},
   {t:"تست حرکت Aperture در همه موقعیت‌ها"},
   {t:"بررسی Encoder و Motor"},
   {t:"بررسی کالیبراسیون"},
   {t:"Reset و تست مجدد"},
   {t:"کالیبراسیون در صورت تکرار"}
 ]},

/* ════════ RF — گسترش ════════ */
{id:"rf6",title:"تعویض Filament Transformer (RF)",cat:"rf",machines:["Synergy","Infinity","Versa HD"],code:"RF-005",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض ترانس Filament در بخش RF.",
 warn:"خطر HV. تخلیه کامل قبل از کار.",
 tools:["مولتی‌متر HV","پیچ‌گوشتی","دستکش ESD"],
 steps:[
   {t:"خاموشی و تخلیه خازن‌ها",level:"danger"},
   {t:"برچسب‌گذاری سیم‌ها"},
   {t:"جدا کردن اتصالات"},
   {t:"تعویض Transformer"},
   {t:"اتصال طبق برچسب‌ها"},
   {t:"تست ولتاژ خروجی"},
   {t:"Auto-Conditioning"}
 ]},
{id:"rf7",title:"تنظیم Bending Magnet Current",cat:"rf",machines:["Synergy","Infinity"],code:"RF-006",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"تنظیم جریان Bending Magnet برای هدایت دقیق الکترون به Target.",
 warn:"نیازمند ابزار دقیق اندازه‌گیری میدان مغناطیسی.",
 tools:["Gaussmeter","مولتی‌متر","نرم‌افزار Service"],
 steps:[
   {t:"Warm-up دستگاه"},
   {t:"اندازه‌گیری میدان فعلی"},
   {t:"مقایسه با مقدار مرجع"},
   {t:"تنظیم جریان در Service Mode"},
   {t:"تست پایداری"},
   {t:"بررسی خروجی Beam"},
   {t:"QA نهایی"}
 ]},
{id:"rf8",title:"تعویض Waveguide Flange",cat:"rf",machines:["Synergy","Infinity","Versa HD"],code:"RF-007",duration:"۲ ساعت",level:"متوسط",
 summary:"تعویض Flange در Waveguide پس از نشتی یا آسیب.",
 warn:"تخلیه SF6 قبل از کار الزامی است.",
 tools:["آچار تورک","کیت اورینگ","گریس وکیوم","Detector نشتی"],
 steps:[
   {t:"خاموشی و تخلیه SF6"},
   {t:"برچسب‌گذاری Flange"},
   {t:"باز کردن پیچ‌ها"},
   {t:"بررسی سطح فلنج قدیمی"},
   {t:"نصب Flange جدید با اورینگ نو"},
   {t:"بستن پیچ‌ها با تورک"},
   {t:"شارژ SF6"},
   {t:"تست نشتی ۲۴ ساعته"}
 ]},

/* ════════ الکترونیک — گسترش ════════ */
{id:"e6",title:"تعویض Motor Drive Board",cat:"electronic",machines:["Synergy","Infinity"],code:"ELC-006",duration:"۲ ساعت",level:"پیشرفته",
 summary:"تعویض برد درایو موتور در محورهای مختلف.",
 tools:["دستکش ESD","پیچ‌گوشتی"],
 steps:[
   {t:"خاموشی و قفل مکانیکی"},
   {t:"عکس گرفتن از اتصالات"},
   {t:"جدا کردن کابل‌ها"},
   {t:"تعویض Board"},
   {t:"اتصال طبق عکس"},
   {t:"تنظیم پارامترها"},
   {t:"کالیبراسیون و QA"}
 ]},
{id:"e7",title:"تعویض Resolver Board",cat:"electronic",machines:["Synergy","Infinity"],code:"ELC-007",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"تعویض برد Resolver که موقعیت موتور را تشخیص می‌دهد.",
 tools:["دستکش ESD","پیچ‌گوشتی دقیق"],
 steps:[
   {t:"خاموشی و قفل محور"},
   {t:"باز کردن پنل"},
   {t:"جدا کردن Resolver"},
   {t:"تعویض Board"},
   {t:"اتصال"},
   {t:"کالیبراسیون موقعیت صفر"},
   {t:"تست دقت موقعیت"}
 ]},
{id:"e8",title:"تشخیص خطای Voltage Regulator",cat:"electronic",machines:["Synergy","Infinity","Versa HD"],code:"ELC-008",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"عیب‌یابی و تشخیص خطاهای Voltage Regulator.",
 tools:["مولتی‌متر دقیق","اسکوپ"],
 steps:[
   {t:"اندازه‌گیری ولتاژ خروجی"},
   {t:"بررسی Ripple با اسکوپ"},
   {t:"مقایسه با مشخصات",note:"Ripple مجاز زیر ۵۰mV"},
   {t:"بررسی بار مورد نیاز"},
   {t:"بررسی اتصالات"},
   {t:"تعویض در صورت انحراف"},
   {t:"تست کامل سیستم"}
 ]},

/* ════════ مکانیک — گسترش ════════ */
{id:"mec7",title:"تنظیم Couch Backlash",cat:"mech",machines:["Synergy","Infinity"],code:"MEC-007",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"تنظیم Backlash میز درمان در محورهای مختلف.",
 tools:["نرم‌افزار Service","فیلر دقیق"],
 steps:[
   {t:"اجرای تست Backlash در هر محور"},
   {t:"بررسی مقادیر فعلی"},
   {t:"تنظیم در صورت انحراف",level:"warn"},
   {t:"تست مجدد"},
   {t:"کالیبراسیون موقعیت"},
   {t:"تست Load Tolerance"}
 ]},
{id:"mec8",title:"تعویض Belt Drive Collimator",cat:"mech",machines:["Synergy","Infinity"],code:"MEC-008",duration:"۳ ساعت",level:"پیشرفته",
 summary:"تعویض تسمه محرک Collimator.",
 warn:"Collimator تحت کشش است. احتیاط کنید.",
 tools:["آچار مخصوص","ابزار کشش تسمه"],
 steps:[
   {t:"خاموشی و قفل Collimator"},
   {t:"باز کردن پنل"},
   {t:"آزاد کردن کشش"},
   {t:"تعویض تسمه"},
   {t:"تنظیم کشش طبق مشخصات"},
   {t:"تست حرکت ۳۶۰ درجه"},
   {t:"کالیبراسیون Collimator"}
 ]},
{id:"mec9",title:"تنظیم Gantry Balance",cat:"mech",machines:["Synergy","Infinity","Versa HD"],code:"MEC-009",duration:"۲ ساعت",level:"پیشرفته",
 summary:"تنظیم تعادل Gantry برای کاهش بار موتور.",
 warn:"تست با چرخش کامل Gantry الزامی است.",
 tools:["وزنه تعادل","مولتی‌متر","نرم‌افزار Service"],
 steps:[
   {t:"قفل Gantry در موقعیت صفر"},
   {t:"اندازه‌گیری گشتاور در جهات مختلف"},
   {t:"افزودن یا حذف وزنه تعادل"},
   {t:"تست چرخش کامل"},
   {t:"بررسی جریان Motor"},
   {t:"ثبت در فرم سرویس"}
 ]},

/* ════════ نرم‌افزار — گسترش ════════ */
{id:"sw6",title:"راه‌اندازی DICOM Server",cat:"software",machines:["Synergy","Infinity","Versa HD"],code:"SW-006",duration:"۲ ساعت",level:"متوسط",
 summary:"راه‌اندازی و پیکربندی DICOM Server برای تبادل اطلاعات با ARIA/PACS.",
 tools:["دسترسی Admin","اطلاعات شبکه"],
 steps:[
   {t:"پیکربندی IP و Port"},
   {t:"تعیین AE Title"},
   {t:"پیکربندی DICOM Storage"},
   {t:"تست با DICOM Echo"},
   {t:"تست ارسال CT"},
   {t:"تست ارسال RT Plan"},
   {t:"تست دریافت Patient Data"},
   {t:"ثبت در فرم پیکربندی"}
 ]},
{id:"sw7",title:"عیب‌یابی Database Corruption",cat:"software",machines:["Synergy","Infinity"],code:"SW-007",duration:"۹۰ دقیقه",level:"پیشرفته",
 summary:"رفع خرابی دیتابیس نرم‌افزار سیستم.",
 warn:"قبل از هر اقدام، Backup تهیه کنید.",
 tools:["ابزار Repair Database","Backup اخیر"],
 steps:[
   {t:"Backup فوری از وضعیت فعلی"},
   {t:"بررسی لاگ خطا"},
   {t:"اجرای ابزار Check Database"},
   {t:"اجرای ابزار Repair"},
   {t:"بررسی نتیجه"},
   {t:"در صورت شکست: بازیابی Backup"},
   {t:"تست کامل سیستم"}
 ]},
{id:"sw8",title:"راه‌اندازی Backup خودکار",cat:"software",machines:["Synergy","Infinity","Versa HD"],code:"SW-008",duration:"۶۰ دقیقه",level:"متوسط",
 summary:"راه‌اندازی Backup خودکار روزانه یا هفتگی.",
 tools:["دسترسی Admin","فضای ذخیره‌سازی"],
 steps:[
   {t:"تعیین زمان Backup (معمولاً شبانه)"},
   {t:"تعیین مقصد (Local یا Network)"},
   {t:"پیکربندی در Service → Backup"},
   {t:"فعال‌سازی Auto Backup"},
   {t:"تست دستی اجرای اولین Backup"},
   {t:"بررسی فایل خروجی"},
   {t:"تنظیم نگهداری (چند نسخه حفظ شود)"}
 ]},

/* ════════ اضطراری — گسترش ════════ */
{id:"em6",title:"قطع آب خنک‌کننده اضطراری",cat:"emergency",machines:["Synergy","Infinity","Versa HD"],code:"EMG-006",duration:"اورژانسی",level:"متوسط",
 summary:"رویه برخورد با قطع ناگهانی آب خنک‌کننده.",
 warn:"دستگاه بلافاصله باید خاموش شود.",
 tools:["ابزار قطع فوری"],
 steps:[
   {t:"فشار Emergency Stop",level:"danger"},
   {t:"خاموشی سیستم در اولین فرصت"},
   {t:"اطلاع به تیم فنی"},
   {t:"بررسی علت قطع (پمپ، نشتی، گرفتگی)"},
   {t:"رفع مشکل"},
   {t:"پر کردن آب"},
   {t:"تست سیستم بدون Beam"},
   {t:"QA کامل قبل از ادامه درمان"}
 ]},
{id:"em7",title:"خطای Source Stuck پیشرفته (Brachy)",cat:"emergency",machines:["Flexitron"],code:"EMG-007",duration:"اورژانسی",level:"پیشرفته",
 summary:"رویه تکمیلی برخورد با گیر کردن منبع در کانال.",
 warn:"هر ثانیه حیاتی است. RSO باید فوراً مطلع شود.",
 tools:["Manual Retract Tool","Survey Meter","دستکش سربی"],
 steps:[
   {t:"فشار Emergency Stop",level:"danger"},
   {t:"اطلاع فوری به RSO"},
   {t:"بررسی Source Position Indicator"},
   {t:"آماده‌سازی Manual Retract Tool"},
   {t:"اجرای Manual Retract طبق دستور",level:"warn"},
   {t:"بررسی Safe Position با Survey Meter"},
   {t:"بازگشت بیمار به Safe Zone"},
   {t:"ثبت در دفتر حادثه"},
   {t:"هماهنگی فوری با Elekta Service"}
 ]}
];

/* ════════ کدهای خطای جدید ════════ */
const ERRORS_V4 = [
/* ─── Motor و Drive ─── */
{code:"MOT-001",sev:"orange",machine:"Synergy / Infinity",title:"Motor Overload — Gantry",act:"بررسی بار و دمای Motor"},
{code:"MOT-002",sev:"orange",machine:"Synergy / Infinity",title:"Motor Overload — Couch",act:"بررسی Load Cell و Motor"},
{code:"MOT-003",sev:"orange",machine:"همه Linacها",title:"Motor Overload — MLC",act:"تمیزکاری و بررسی Motor Leaf"},
{code:"MOT-004",sev:"red",machine:"Synergy / Infinity",title:"Motor Drive Failure",act:"تعویض Motor Drive Board"},
{code:"MOT-005",sev:"red",machine:"Synergy / Infinity",title:"Resolver Error",act:"تعویض Resolver Board"},
{code:"MOT-006",sev:"orange",machine:"Infinity",title:"HexaPOD Motor Overload",act:"بررسی بار و Motor"},

/* ─── Sensors ─── */
{code:"SEN-001",sev:"orange",machine:"همه Linacها",title:"Temperature Sensor Failure",act:"تعویض یا کالیبراسیون سنسور"},
{code:"SEN-002",sev:"orange",machine:"Synergy / Infinity",title:"Pressure Sensor Error",act:"بررسی اتصالات سنسور"},
{code:"SEN-003",sev:"orange",machine:"همه Linacها",title:"Flow Sensor Low",act:"بررسی جریان آب"},
{code:"SEN-004",sev:"red",machine:"همه Linacها",title:"Radiation Monitor Fault",act:"کالیبراسیون یا تعویض"},

/* ─── RF Extended ─── */
{code:"RF-101",sev:"red",machine:"Synergy / Infinity",title:"Filament Transformer Failure",act:"تعویض Transformer"},
{code:"RF-102",sev:"orange",machine:"Synergy / Infinity",title:"Bending Magnet Current Drift",act:"تنظیم جریان Bending Magnet"},
{code:"RF-103",sev:"orange",machine:"همه Linacها",title:"Waveguide Flange Leak",act:"تعویض Flange و شارژ SF6"},
{code:"RF-104",sev:"red",machine:"همه Linacها",title:"Pulse Transformer Failure",act:"تعویض Pulse Transformer"},
{code:"RF-105",sev:"orange",machine:"Synergy / Infinity",title:"AFC Voltage Out of Range",act:"تنظیم AFC در سرویس مود"},
{code:"RF-106",sev:"red",machine:"همه Linacها",title:"Klystron Overcurrent",act:"بررسی Filament و Beam Voltage"},

/* ─── Mechanical Extended ─── */
{code:"MEC-101",sev:"orange",machine:"Synergy / Infinity",title:"Couch Backlash Over Limit",act:"تنظیم Backlash میز"},
{code:"MEC-102",sev:"red",machine:"Synergy / Infinity",title:"Collimator Belt Broken",act:"تعویض Belt Drive"},
{code:"MEC-103",sev:"orange",machine:"همه Linacها",title:"Gantry Balance Warning",act:"تنظیم تعادل Gantry"},
{code:"MEC-104",sev:"orange",machine:"همه Linacها",title:"Chain Tension Low",act:"تنظیم کشش زنجیر"},
{code:"MEC-105",sev:"red",machine:"Synergy",title:"Backup Chain Failure",act:"تعویض زنجیر پشتیبان"},

/* ─── Electronic Extended ─── */
{code:"ELC-101",sev:"red",machine:"همه Linacها",title:"Motor Drive Board Failure",act:"تعویض برد"},
{code:"ELC-102",sev:"red",machine:"Synergy / Infinity",title:"Resolver Board Failure",act:"تعویض برد Resolver"},
{code:"ELC-103",sev:"orange",machine:"همه Linacها",title:"Voltage Regulator Drift",act:"کالیبراسیون یا تعویض"},
{code:"ELC-104",sev:"red",machine:"همه Linacها",title:"HV Board Failure",act:"تعویض برد HV"},
{code:"ELC-105",sev:"orange",machine:"Synergy / Infinity",title:"Serial Communication Error",act:"بررسی کابل و RS-232"},

/* ─── Software Extended ─── */
{code:"SW-101",sev:"red",machine:"همه Linacها",title:"Database Corruption",act:"Repair یا Restore"},
{code:"SW-102",sev:"orange",machine:"همه Linacها",title:"Auto Backup Failed",act:"بررسی فضای دیسک و تنظیمات"},
{code:"SW-103",sev:"orange",machine:"همه Linacها",title:"DICOM Server Down",act:"ری‌استارت سرویس"},
{code:"SW-104",sev:"red",machine:"همه Linacها",title:"Critical Config Missing",act:"Restore از Backup"},
{code:"SW-105",sev:"orange",machine:"Infinity",title:"Integrity Update Failed",act:"بررسی شبکه و نصب مجدد"},

/* ─── Safety Extended ─── */
{code:"SAFE-101",sev:"red",machine:"همه Linacها",title:"Coolant Flow Emergency",act:"خاموشی فوری و بررسی پمپ"},
{code:"SAFE-102",sev:"red",machine:"همه Linacها",title:"Fire Alarm Active",act:"تخلیه و خاموشی"},
{code:"SAFE-103",sev:"red",machine:"Flexitron",title:"Source Stuck Critical",act:"Manual Retract — Emergency"}
];

/* ═══════════════════════════════════════
   Merge with existing data
   ═══════════════════════════════════════ */
(function(){
  if(typeof MANUALS !== "undefined" && Array.isArray(MANUALS)){
    for(var i = 0; i < MANUALS_V4.length; i++){
      MANUALS.push(MANUALS_V4[i]);
    }
  }
  if(typeof ERRORS !== "undefined" && Array.isArray(ERRORS)){
    for(var j = 0; j < ERRORS_V4.length; j++){
      ERRORS.push(ERRORS_V4[j]);
    }
  }
  console.log("✅ data4.js loaded — " + MANUALS_V4.length + " manuals, " + ERRORS_V4.length + " errors added");
})();

window.MANUALS_V4 = MANUALS_V4;
window.ERRORS_V4 = ERRORS_V4;