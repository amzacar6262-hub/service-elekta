/* Agility Corrective Maintenance Manual quick index
 * Source: Elekta Agility Corrective Maintenance Manual, 1014603 05, Rev 05 (Mar 2017).
 * This is a compact code/title/reference index, not a replacement for the original figures or procedures.
 */
(function () {
  "use strict";
  var records = [
    {code:"8020", title:"خطای حرکت — برگ MLC حرکت نمی‌کند", en:"Movement error — leaf not moving", ref:"فصل 4.6.5، صفحات چاپی 85–88، شکل‌های 4.30–4.34", note:"ابتدا بانک Y1/Y2 و گستره برگ‌های درگیر را مشخص کنید. مسیر رسمی شامل بررسی جریان/ولتاژ موتور، تغذیه ±15V، Flexi PCB و ارتباط Router/LMDB است."},
    {code:"7300", title:"خطای موقعیت برگ — بانک Y1", en:"Position error — Y1", ref:"فصل 4.6.5، صفحات 85–88", note:"کد در مسیر عیب‌یابی برگ حرکت‌نکرده همراه با کدهای مرتبط آمده است؛ به‌تنهایی قطعه معیوب را مشخص نمی‌کند."},
    {code:"7310", title:"خطای موقعیت برگ — بانک Y2", en:"Position error — Y2", ref:"فصل 4.6.5، صفحات 85–88", note:"بانک Y2 را از Y1 تفکیک کنید و شاخه مرتبط نمودار رسمی را دنبال کنید."},
    {code:"7002", title:"خطای حرکت — تعیین برگ‌های درگیر", en:"Movement error — identify affected leaves", ref:"فصل 4.6.5، صفحات 85–88", note:"مشخص کنید خرابی مربوط به یک برگ، یک ماژول یا چند برگ است؛ سپس نمودار مربوط را دنبال کنید."},
    {code:"8021", title:"خطای حرکت دیافراگم", en:"Movement error — diaphragm", ref:"فصل 4.6.3، صفحات 73–78", note:"برای عدم حرکت یا نرسیدن دیافراگم به موقعیت فرمان، نمودار رسمی فصل 4.6.3 را بررسی کنید."},
    {code:"7470 / 7480", title:"حرکت یا فعال‌شدن ناخواسته دیافراگم", en:"Unexpected diaphragm movement / actuation", ref:"فصل 4.6.3، صفحات 73–78", note:"کدها در مسیر بررسی حرکت ناخواسته دیافراگم ذکر شده‌اند؛ پیش از اقدام، وضعیت دستگاه را ایمن و دستورالعمل رسمی را دنبال کنید."},
    {code:"8022", title:"خطای حرکت راهنمای دینامیکی برگ (DLG)", en:"Movement error — Dynamic Leaf Guide", ref:"فصل 4.6.4، صفحات 79–84", note:"مسیر رسمی DLG را دنبال کنید؛ جزئیات ترمز، حرکت و شاخه‌های آزمون باید با شکل اصلی تطبیق داده شود."},
    {code:"8030 / 8031", title:"خطای هم‌بستگی پتانسیومتر DLG", en:"Potentiometer correlation error — DLG", ref:"فصل 4.6.4، صفحات 80–82", note:"برای خطای هم‌بستگی یا حرکت DLG در جهت اشتباه، به نمودار فصل 4.6.4 رجوع کنید."},
    {code:"8032 / 8033", title:"خطای هم‌بستگی پتانسیومتر دیافراگم", en:"Potentiometer correlation error — diaphragm", ref:"فصل 4.6.3، صفحات 75–76", note:"این عنوان به مسیر بررسی هم‌بستگی پتانسیومتر دیافراگم مربوط است؛ مقادیر و روش آزمون را از منوال رسمی بگیرید."},
    {code:"7414", title:"خطای تغذیه‌ها", en:"Supplies error", ref:"فصل 4.6.9، صفحه 97", note:"منوال این کد را در بخش عیب‌یابی تغذیه‌ها قرار داده است؛ اندازه‌گیری‌ها فقط طبق روش سرویس مجاز انجام شوند."},
    {code:"7800", title:"سیگنال ویدئویی وجود ندارد", en:"No video signal", ref:"فصل 4.6.7، صفحات 92–95", note:"به مسیر تشخیص اپتیکی/ویدئویی و اتصالات مربوط در فصل 4.6.7 رجوع کنید."},
    {code:"76xx / 77xx", title:"خطاهای ارتباطی / لینک CAN", en:"Communications errors / CAN link errors", ref:"فصل 4.6.2، صفحه 72", note:"این رکورد یک خانواده کد است؛ کد کامل و نمودار مربوط را در منوال اصلی بررسی کنید."},
    {code:"81xx / 72xx / 73xx / 7800", title:"شناسایی‌نشدن Leaf Ruby / ناپایداری اپتیکی", en:"Lost leaf ruby / unstable optical detection", ref:"فصل‌های 4.6.7–4.6.8، صفحات 92–96", note:"کدهای خانواده‌ای هستند و علت واحدی را اثبات نمی‌کنند؛ مسیر تشخیص اپتیکی در شکل‌های اصلی بررسی شود."},
    {code:"—", title:"Wedge یا Shutter به موقعیت فرمان‌داده‌شده نمی‌رسد", en:"Wedge or shutter not reaching commanded position", ref:"فصل 4.6.10، صفحه 98", note:"برای این عنوان، کد اختصاصی در رکورد خلاصه‌شده درج نشده؛ از بخش 4.6.10 استفاده کنید."},
    {code:"—", title:"حرکت کنترل‌نشده برگ MLC", en:"Leaf moving uncontrolled", ref:"فصل 4.6.6، صفحات 89–91", note:"مورد ایمنی‌محور است؛ کار را متوقف و روش رسمی ایمن‌سازی و بررسی را دنبال کنید."},
    {code:"—", title:"از دست رفتن چند Leaf Ruby / ناپایداری اپتیکی", en:"Multiple leaf rubies lost / unstable optical condition", ref:"فصل 4.6.8، صفحه 96", note:"برای این عنوان، شکل و شاخه عیب‌یابی اصلی را بررسی کنید؛ این خلاصه تشخیص قطعی ارائه نمی‌کند."},
    {code:"—", title:"نشانگرهای LED روی Router PCB", en:"Router PCB LED indicators", ref:"فصل 4.4.3، صفحه 60؛ مرجع فنی حدود صفحات 350–361", note:"وضعیت LEDها باید با جدول/نمودار رسمی همان نسخه منوال تطبیق داده شود."},
    {code:"—", title:"شناسایی موتور برگ بر اساس مادربرد LMD", en:"Identify leaf motor by LMD motherboard", ref:"فصل 4.2، صفحات 53–56", note:"برای شناسایی موتور برگ از مرجع فصل 4.2 استفاده کنید."},
    {code:"—", title:"ایمن‌سازی پیش از سرویس Agility BLD", en:"Safety before Agility BLD maintenance", ref:"فصل 5.1.1، صفحات 101–102", note:"پیش از هر سرویس BLD، مراحل ایمن‌سازی رسمی را کامل اجرا کنید."},
    {code:"76xx / 77xx", title:"خطای ارتباطات / لینک CAN", en:"Communications failure / CAN link errors", ref:"فصل 4.6.2، صفحه 72", note:"رکورد تکراریِ موضوع ارتباطات از خلاصه منوال؛ کد کامل را برای انتخاب شاخه درست بررسی کنید."},
    {code:"8021 / 7414", title:"دیافراگم حرکت نمی‌کند یا به موقعیت نمی‌رسد", en:"Diaphragm does not actuate / reach position", ref:"فصل 4.6.3، صفحات 73–74", note:"این ترکیب کد در رکورد خلاصه آمده؛ مسیر دقیق را با نمودار فصل 4.6.3 تطبیق دهید."},
    {code:"7470 / 7480", title:"حرکت ناخواسته دیافراگم", en:"Unexpected diaphragm movement / actuation", ref:"فصل 4.6.3، صفحات 73–75", note:"با عنوان حرکت ناخواسته دیافراگم مرتبط است؛ برای اقدام، نمودار اصلی مرجع است."},
    {code:"8030 / 8031", title:"حرکت DLG در جهت اشتباه / خطای پتانسیومتر", en:"DLG wrong direction / potentiometer correlation", ref:"فصل 4.6.4، صفحه 82", note:"برای تفکیک شاخه خطا و روش بررسی، به شکل اصلی رجوع کنید."},
    {code:"8022", title:"خطای حرکت DLG / حرکت کند یا مشکل ترمز", en:"DLG movement error / slow movement or brake issue", ref:"فصل 4.6.4، صفحات 80–84", note:"رکورد خلاصه به حرکت کند یا ترمز اشاره می‌کند؛ تأیید با نمودار و آزمون رسمی لازم است."},
    {code:"—", title:"حرکت برگ در جهت اشتباه یا بدون فرمان", en:"Leaf moves uncontrolled", ref:"فصل 4.6.6، صفحات 89–91", note:"وضعیت بالقوه خطرناک؛ طبق دستورالعمل رسمی دستگاه را ایمن کنید و از ادامه کار درمانی جلوگیری شود."},
    {code:"81xx / 72xx / 73xx / 7800", title:"از دست رفتن تشخیص Leaf Ruby", en:"Lost leaf ruby / missing optical detection", ref:"فصل 4.6.7، صفحات 92–94", note:"برای تشخیص اپتیکی، نمودار فصل 4.6.7 را دنبال کنید؛ کدهای خانواده‌ای نیازمند تطبیق با خطای کامل هستند."},
    {code:"MLC NOT READY", title:"عبارت MLC NOT READY — مسیرهای مرتبط برای بررسی", en:"MLC NOT READY — related manual paths", ref:"بسته به کد کامل و وضعیت دستگاه؛ مسیرهای مرتبط: 4.6.2، 4.6.5، 4.6.7–4.6.8", note:"این عبارت به‌تنهایی در این فهرست به‌عنوان یک کد عددی مستقل تأیید نشده است. کد عددی کامل، متن دقیق پیام و بانک/برگ درگیر را ثبت کنید؛ سپس مسیر ارتباطات، حرکت برگ یا تشخیص اپتیکی را فقط بر اساس نشانه‌های واقعی و نمودار رسمی انتخاب کنید."},
    {code:"760x / 77xx", title:"خطای ارتباطات بین Router، TCS و بردهای BLD", en:"Communications failure / CAN link errors", ref:"فصل 4.6.2، صفحه چاپی 72، شکل 4.17", note:"نخست مشخص کنید خطا مربوط به CAN است یا ارتباط سریال. مسیرهای بررسی منوال: اتصال Router به بردهای BLD، اتصال Router به TCS، کابل‌ها و کانکتورهای backplane. کد خانواده‌ای به‌تنهایی برد معیوب را مشخص نمی‌کند."},
    {code:"—", title:"Accessory یا Applicator شناسایی نمی‌شود", en:"Accessory not recognised", ref:"فصل 4.6.1، صفحات چاپی 69–71، شکل‌های 4.14–4.16", note:"بر اساس نمودار رسمی تفکیک کنید مشکل همه applicatorهاست یا فقط یکی؛ سپس وجود accessory، سوکت، Flexi PCB، Touchguard accessory PCB، coding switch و سیم‌کشی/پلاگ را بررسی کنید. قطعه را صرفاً بر اساس این پیام تعویض نکنید."},
    {code:"—", title:"تفسیر LEDهای برد LMD", en:"LMD PCB LED indicators", ref:"فصل 4.4.1، صفحات چاپی 57–58، جدول 4.1", note:"منوال وضعیت GE، +5 V، Watchdog، Source/Sink current limit، Thermal Shutdown و ریل‌های +15 V و −15 V را تعریف می‌کند. LED خاموش یا روشن را با جدول همان برد تطبیق دهید؛ وضعیت LED به‌تنهایی تشخیص قطعی نیست."},
    {code:"—", title:"تفسیر LEDهای Router PCB", en:"Router PCB LED indicators", ref:"فصل 4.4.3، صفحه چاپی 60، جدول 4.3", note:"جدول منوال Watchdog و ریل‌های −15 V، +5 V، +15 V و +24 V را پوشش می‌دهد. در صورت Watchdog چشمک‌زن/خاموش یا ریل خارج از وضعیت، مسیر عیب‌یابی رسمی را دنبال کنید؛ از روی یک LED به‌تنهایی Router را معیوب اعلام نکنید."},
    {code:"—", title:"LEDهای برد کنترل Diaphragm و DLG", en:"Diaphragm and DLG control PCB LEDs", ref:"فصل 4.4.2، صفحات چاپی 59–60، جدول 4.2", note:"نشانگرهای +24 V، +15 V، Watchdog، −5 V، Global Enable و +5 V در جدول آمده‌اند. وضعیت را با برد درست و نسخه منوال تطبیق دهید."},
    {code:"—", title:"LEDهای برد کنترل Wedge / Shutter", en:"Wedge control PCB LED indicators", ref:"فصل 4.4.4، صفحه چاپی 62، جدول 4.4", note:"جدول شامل رله‌های Wedge/Shutter، وضعیت Drive، ریل‌های تغذیه، Brake، حرکت و کلیدهای IN/OUT است. وضعیت نشانگرها باید همراه با پیام خطا و موقعیت فرمان‌داده‌شده تفسیر شود."},
    {code:"7414", title:"Supplies Not OK — بررسی تغذیه در مسیرهای Diaphragm و DLG", en:"Supplies not OK / power supply error", ref:"فصل 4.6.3 صفحه 74؛ فصل 4.6.4 صفحه 80؛ فصل 4.6.9 صفحه 97", note:"منوال این خطا را به مسیر بررسی تغذیه مرتبط می‌کند. در نمودارهای Diaphragm/DLG ابتدا رسیدن تغذیه به برد کنترل و وضعیت منبع/ریل‌ها مطرح است؛ سپس شاخه ارتباطات یا مدار موتور طبق نمودار رسمی انتخاب می‌شود. این کد به‌تنهایی علت یا قطعه معیوب را تعیین نمی‌کند."},
    {code:"7800", title:"No video signal — سیگنال ویدئویی به سیستم نمی‌رسد", en:"No video signal", ref:"فصل 4.6.7، صفحه چاپی 95، شکل 4.41", note:"نمودار مسیر سیگنال را در نقاط Router، Area 44، signal retractile، reeling post، CCU و LCS تفکیک می‌کند. نقطه‌ای که سیگنال در آن ناپدید می‌شود باید با آزمون سرویس مجاز مشخص شود؛ کد 7800 به‌تنهایی دوربین یا CCU را اثبات نمی‌کند."},
    {code:"81xx / 72xx / 73xx", title:"Lost leaf ruby — یک یا چند برگ در تصویر اپتیکی شناسایی نمی‌شود", en:"Lost leaf ruby / missing optical detection", ref:"فصل 4.6.7، صفحات چاپی 92–95، شکل‌های 4.38–4.41", note:"منوال کدهای 81xx را برای شناسایی ruby و 72xx/73xx را برای دلیل خطا معرفی می‌کند. شاخه‌های نمودار شامل دیده‌شدن ruby، موقعیت برگ، تصویر ویدئویی، اپتیک، نور UV و کالیبراسیون است. از روی کد خانواده‌ای، قطعه معیوب را قطعی فرض نکنید."},
    {code:"—", title:"Multiple lost leaf rubies — چند برگ یا تصویر اپتیکی ناپایدار", en:"Multiple lost leaf rubies / unstable optical condition", ref:"فصل 4.6.8، صفحه چاپی 96، شکل 4.42", note:"نمودار شدت ruby را بیش از حد کم یا زیاد و نویز تصویر را از هم جدا می‌کند. علل احتمالی ذکرشده در منوال شامل فوکوس دوربین، aperture، تنظیم LED، LIB video gain، LED PCB، camera/CCU و آلودگی یا آسیب اجزای اپتیکی است؛ ترتیب بررسی باید از نمودار رسمی پیروی کند."},
    {code:"—", title:"حرکت کنترل‌نشده Leaf — حرکت بدون فرمان یا در جهت اشتباه", en:"Leaf moving uncontrolled", ref:"فصل 4.6.6، صفحات چاپی 89–91، شکل‌های 4.35–4.37", note:"موضوع ایمنی‌محور است. منوال خرابی را بر اساس همه برگ‌های یک/دو بانک، یک ماژول یا یک برگ تفکیک می‌کند و مسیرهای بررسی Router، motor drive PCB و اتصالات موتور را نشان می‌دهد. دستگاه را از کاربرد بالینی خارج کنید و فقط طبق روش رسمی و صلاحیت سرویس بررسی کنید."},
    {code:"8021 / 7470 / 7480", title:"Diaphragm — حرکت ندارد، کند است یا بدون فرمان حرکت می‌کند", en:"Diaphragm movement fault", ref:"فصل 4.6.3، صفحات چاپی 73–78، شکل‌های 4.18–4.23", note:"نمودار بین نرسیدن به موقعیت، نبود حرکت با فرمان، حرکت کند، حرکت در جهت اشتباه و حرکت بدون فرمان تمایز می‌گذارد. مسیرهای بعدی شامل فرمان کنترل، تغذیه، جریان/ولتاژ موتور، ارتباطات، پتانسیومتر و ترمز است؛ انتخاب شاخه باید بر اساس نشانه مشاهده‌شده باشد."},
    {code:"8022 / 8030 / 8031", title:"DLG — حرکت، جهت یا هم‌بستگی پتانسیومتر", en:"DLG movement / potentiometer correlation", ref:"فصل 4.6.4، صفحات چاپی 79–84، شکل‌های 4.24–4.29", note:"نمودار DLG را به حالت عدم حرکت، حرکت کند، جهت اشتباه، حرکت ناخواسته و خطای پتانسیومتر تفکیک می‌کند. مسیرهای ارتباطات، تغذیه، موتور، کابل/پتانسیومتر و ترمز باید با وضعیت واقعی تطبیق داده شوند."},
    {code:"—", title:"Wedge / Shutter به موقعیت فرمان‌داده‌شده نمی‌رسد", en:"Wedge or shutter not reaching commanded position", ref:"فصل 4.6.10، صفحه چاپی 98، شکل 4.44", note:"منوال موقعیت فرمان‌داده‌شده، کلیدهای IN/OUT، مقدار پتانسیومتر، حرکت مکانیزم، جریان/ولتاژ موتور و آزادشدن ترمز را در شاخه‌های جدا بررسی می‌کند. شماره سیم/کانکتور و تنظیمات باید مستقیماً از منوال اصلی همان نسخه خوانده شود."},
    {code:"—", title:"تشخیص موتور برگ از روی LMD motherboard", en:"Identify leaf drive motor / LMD motherboard", ref:"فصل 4.2، صفحات چاپی 53–56، شکل‌های 4.1–4.4", note:"هر LMD motherboard کنترل 40 موتور برگ را بر عهده دارد. منوال بردهای Y1 Target، Y1 Isocenter، Y2 Target و Y2 Isocenter را تفکیک می‌کند؛ در هر برچسب، 20 برگ بیرونی پایین و 20 برگ داخلی بالا نشان داده شده‌اند."},
    {code:"—", title:"ایمنی کار روی LED/Projector و اپتیک", en:"Projector LED safety before maintenance", ref:"فصل 4.5.1، صفحه چاپی 68، شکل 4.13؛ همچنین فصل 5.1", note:"منوال می‌گوید کلید LED برای خاموش‌کردن LEDهای projector در زمان سرویس کاربرد دارد و فن را خاموش نمی‌کند؛ پیش از خارج‌کردن projector باید زمان خنک‌شدن ذکرشده در دستورالعمل رعایت شود. این خلاصه جایگزین الزامات کامل ایمنی فصل 5.1 نیست."},
    {code:"—", title:"Agility — مرجع عیب‌یابی و تعمیرات اصلاحی", en:"Agility corrective maintenance reference", ref:"Elekta Agility Corrective Maintenance Manual، سند 1014603 05، Rev 05، مارس 2017", note:"این فهرست فقط نمایه سریع کد/عنوان/صفحه است؛ جایگزین منوال کامل، تصاویر یا دستورالعمل سرویس مجاز نیست."},

    {code:"WORKFLOW", title:"MLC NOT READY — مسیر تشخیص اولیه", en:"MLC not ready diagnostic workflow", ref:"منوال Agility 1014603 05؛ بسته به کدهای همراه، فصل 4.6", note:"کدهای کامل و متن هشدارهای هم‌زمان را ثبت کنید؛ مشخص کنید مشکل برگ، DLG، دیافراگم، اپتیک یا ارتباط است؛ گستره خرابی را از یک برگ تا کل بانک مشخص کنید؛ سپس فقط شاخه متناظر منوال را دنبال کنید. این عبارت به‌تنهایی کد خرابی قطعه نیست."},
    {code:"WORKFLOW", title:"یک برگ حرکت نمی‌کند", en:"Single leaf not moving", ref:"فصل 4.6.5، صفحات چاپی 85–88", note:"ثبت شماره برگ و بانک Y1/Y2؛ مقایسه با برگ‌های مجاور؛ تطبیق کدهای 8020/7002/7300/7310؛ دنبال‌کردن نمودار رسمی برای موتور، درایو، تغذیه و ارتباط. از حرکت آزمایشی خارج از روش مصوب خودداری کنید."},
    {code:"WORKFLOW", title:"چند برگ یا کل بانک حرکت نمی‌کند", en:"Multiple leaves or whole bank not moving", ref:"فصل 4.6.5 و 4.6.6، صفحات 85–91", note:"ابتدا دامنه خرابی را ثبت کنید: یک ماژول، یک بانک یا هر دو بانک. خطای مشترک می‌تواند به مسیر تغذیه، ارتباط یا برد مشترک مربوط باشد؛ این فقط جهت بررسی است و خرابی قطعه را اثبات نمی‌کند."},
    {code:"WORKFLOW", title:"Lost Leaf Ruby / خطای اپتیکی", en:"Lost leaf ruby optical troubleshooting", ref:"فصل‌های 4.6.7–4.6.8، صفحات 92–96", note:"تعداد و الگوی برگ‌های گم‌شده، کیفیت تصویر، وضعیت LED و کدهای 81xx/72xx/73xx را ثبت کنید. بررسی اپتیک و دوربین فقط مطابق روش سرویس مجاز انجام شود؛ تنظیمات کالیبراسیون را حدسی تغییر ندهید."},
    {code:"WORKFLOW", title:"DLG — راهنمای دینامیکی برگ", en:"Dynamic Leaf Guide troubleshooting", ref:"فصل 4.6.4، صفحات 79–84", note:"کد کامل، حرکت واقعی در برابر فرمان، خطای پتانسیومتر و وضعیت ارتباط/ترمز را ثبت کنید؛ برای 8022 و 8030/8031 نمودار اصلی فصل را دنبال کنید. مقادیر آزمون را از نسخه رسمی منوال بردارید."},
    {code:"WORKFLOW", title:"Diaphragm / خطای حرکت فک‌ها", en:"Diaphragm movement troubleshooting", ref:"فصل 4.6.3، صفحات 73–78", note:"محور و جهت حرکت، کد کامل و هم‌زمانی خطا با تغییر موقعیت را ثبت کنید؛ کدهای 8021 و 7470/7480 را با نمودار متناظر بررسی کنید. هیچ interlock یا محدودکننده‌ای را دور نزنید."},
    {code:"WORKFLOW", title:"7800 — No Video Image", en:"No video image diagnostic workflow", ref:"فصل 4.6.7، صفحات 92–95", note:"بررسی کنید خطا مربوط به نبود تصویر است یا تصویر ثابت/نویزدار؛ سپس طبق منوال مسیر camera/CCU، کابل سیگنال و acquisition را دنبال کنید. ریست یا تعویض قطعه را جایگزین تشخیص مستند نکنید."},
    {code:"WORKFLOW", title:"7414 — Signal Supplies", en:"Power supply error workflow", ref:"فصل 4.6.9، صفحه چاپی 97", note:"کد همراه و زمان وقوع را ثبت کنید؛ منوال مسیر بررسی تغذیه و در صورت لزوم ارتباطات را ارجاع می‌دهد. اندازه‌گیری روی برد فقط توسط فرد واجد صلاحیت و با روش سرویس مصوب انجام شود."},
    {code:"WORKFLOW", title:"خطاهای ارتباطی Router / LMDB / CAN", en:"Router LMDB CAN communication workflow", ref:"فصل 4.6.2، صفحه چاپی 72 و فصل‌های عیب‌یابی مرتبط", note:"تمام کدهای ارتباطی هم‌زمان، برد گزارش‌دهنده و وضعیت کابل/کانکتور را ثبت کنید. خطاهای متعدد هم‌زمان ممکن است علت مشترک داشته باشند؛ پیش از تعویض برد، نمودار رسمی و شواهد را بررسی کنید."},
    {code:"WORKFLOW", title:"Table clutch / قفل حرکتی تخت", en:"Treatment couch table clutch troubleshooting", ref:"نیازمند منوال مدل تخت و کد دقیق؛ در منوال Agility پوشش کامل ندارد", note:"مدل تخت، محور درگیر، پیام دقیق، چراغ وضعیت و آزاد/درگیر بودن کلاچ را ثبت کنید. تخت را تحت بار حرکت ندهید و کلاچ یا interlock را دور نزنید؛ برای مسیر اختصاصی باید منوال همان تخت و کد خطا اضافه شود."},
    {code:"MODEL SCOPE", title:"Elekta Synergy و Infinity — نیاز به منوال اختصاصی", en:"Synergy and Infinity model-specific documentation", ref:"بانک فعلی: منوال Agility 1014603 05؛ مدارک اختصاصی Synergy/Infinity هنوز وارد نشده‌اند", note:"کدها، بردها و روش‌های سرویس بین نسل‌ها و پیکربندی‌ها قابل تعمیم خودکار نیستند. پیش از استفاده، مدل دقیق دستگاه، نسخه نرم‌افزار و شماره سند را تطبیق دهید؛ برای تکمیل این بخش، فایل منوال یا فهرست کدهای رسمی همان مدل لازم است."},
    {code:"WORKFLOW", title:"چک‌لیست ثبت خرابی میدانی", en:"Field fault log checklist", ref:"قالب پیشنهادی بانک سرویس", note:"مدل دستگاه و نسخه نرم‌افزار؛ متن و کد کامل خطا؛ زمان و شرایط وقوع؛ یک یا چند محور/برگ؛ کدهای همراه؛ آزمون‌های انجام‌شده طبق منوال؛ نتیجه هر آزمون؛ قطعه تعویض‌شده و آزمون تأیید نهایی را ثبت کنید. اطلاعات بیمار را وارد نکنید."}
  ];

  function norm(s) {
    return String(s || "").toLowerCase().replace(/ي/g,"ی").replace(/ك/g,"ک").replace(/\s+/g," ").trim();
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function matches(q) {
    var tokens = norm(q).split(" ").filter(Boolean);
    if (!tokens.length) return [];
    return records.map(function(r,i){ var title=norm([r.code,r.title,r.en].join(" ")); var blob=norm([r.code,r.title,r.en,r.ref,r.note].join(" ")); var score=0; tokens.forEach(function(t){ if(norm(r.code)===t) score+=100; else if(norm(r.code).indexOf(t)!==-1) score+=35; if(title.indexOf(t)!==-1) score+=12; }); return {r:r,i:i,blob:blob,score:score}; })
      .filter(function(x){ return tokens.every(function(t){ return x.blob.indexOf(t)!==-1; }); })
      .sort(function(a,b){ return b.score-a.score || a.i-b.i; }).slice(0,12);
  }
  function render(q) {
    var box = document.getElementById("globalSearchResults");
    if (!box || !norm(q)) return;
    var found = matches(q);
    var seenRecords = Object.create(null);
    found = found.filter(function (item) {
      var key = norm(item.r.code) + "|" + norm(item.r.title);
      if (seenRecords[key]) return false;
      seenRecords[key] = true;
      return true;
    });
    var old = document.getElementById("agilityManualResults");
    if (old) old.remove();
    if (!found.length) return;
    var empty = box.querySelector(".gs-empty");
    if (empty) empty.style.display = "none";
    var html = '<div class="gs-section" id="agilityManualResults"><div class="gs-section-t">۱. راهنمای خطاهای Agility ('+found.length+')</div>';
    html += found.map(function(x){
      return '<button type="button" class="gs-item" onclick="openAgilityManualRecord('+x.i+')"><span class="gs-item-code" dir="ltr">'+esc(x.r.code)+'</span><span class="gs-item-title">'+esc(x.r.title)+' <small style="opacity:.7">· <bdi dir="ltr">'+esc(x.r.ref)+'</bdi></small></span></button>';
    }).join("");
    html += '</div><div id="agilityManualDetail"></div>';
    box.insertAdjacentHTML("beforeend",html);
  }
  window.openAgilityManualRecord = function(i) {
    var r = records[Number(i)];
    var box = document.getElementById("agilityManualDetail");
    if (!r || !box) return;
    box.innerHTML = '<div class="gs-section"><div class="gs-section-t">'+esc(r.title)+'</div><div style="padding:12px 14px;line-height:1.7"><div><b>English:</b> <bdi dir="ltr">'+esc(r.en)+'</bdi></div><div style="margin-top:6px"><b>مرجع منوال:</b> <bdi dir="ltr">'+esc(r.ref)+'</bdi></div><div style="margin-top:8px">'+esc(r.note)+'</div><div style="margin-top:10px;font-size:12px;opacity:.75">منبع: سند 1014603 05، Rev 05. این خلاصه برای یافتن صفحه است؛ برای هر اقدام، متن و شکل اصلی منوال و روش رسمی Elekta ملاک است.</div></div></div>';
  };
  /* Full manual text index: all 374 extracted PDF pages, loaded on demand. */
  var fullPages = null;
  var fullLoadPromise = null;
  var fullPageByNumber = Object.create(null);
  function fullNorm(s) {
    return String(s || "").toLowerCase()
      .replace(/[ىي]/g, "ی").replace(/ك/g, "ک")
      .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
      .replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim();
  }
  function loadFullManual() {
    if (fullPages) return Promise.resolve(fullPages);
    if (fullLoadPromise) return fullLoadPromise;
    var parts = [1,2,3,4,5,6,7,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    fullLoadPromise = Promise.all(parts.map(function(n) {
      return fetch("./agility-manual-part" + n + ".json").then(function(r) {
        if (!r.ok) throw new Error("Manual index part " + n + " unavailable");
        return r.json();
      });
    })).then(function(data) {
      fullPages = [];
      data.forEach(function(part) {
        (part.pages || []).forEach(function(p) {
          fullPages.push(p);
          fullPageByNumber[String(p.pdf_page)] = p;
        });
      });
      fullPages.sort(function(a,b){return a.pdf_page-b.pdf_page;});
      fullPages.forEach(function(p) { p._searchText = fullNorm(p.text || ""); });
      console.log("Full Agility text loaded: " + fullPages.length + " pages");
      return fullPages;
    }).catch(function(err) {
      fullLoadPromise = null;
      console.warn("Full Agility text index could not load", err);
      return null;
    });
    return fullLoadPromise;
  }
  function fullSnippet(text, tokens) {
    var raw = String(text || "").replace(/\s+/g, " ").trim();
    var n = fullNorm(raw), at = -1;
    for (var i=0;i<tokens.length;i++) {
      var pos = n.indexOf(tokens[i]);
      if (pos >= 0 && (at < 0 || pos < at)) at = pos;
    }
    if (at < 0) at = 0;
    var start = Math.max(0, at - 160);
    var end = Math.min(raw.length, start + 620);
    return (start ? "… " : "") + raw.slice(start,end) + (end < raw.length ? " …" : "");
  }
  function fullSearch(q) {
    if (!fullPages || !q) return [];
    var tokens = fullNorm(q).split(" ").filter(function(t){return t.length > 1;});
    if (!tokens.length) return [];
    return fullPages.map(function(p) {
      var norm = p._searchText || "";
      var score = 0, ok = true;
      tokens.forEach(function(t) {
        var pos = norm.indexOf(t);
        if (pos < 0) ok = false;
        else {
          score += 2;
          if (pos < 180) score += 2;
          var hits = norm.split(t);
          score += Math.min(Math.max(0, hits.length - 1), 8);
        }
      });
      return ok ? {page:p.pdf_page, text:p.text || "", score:score} : null;
    }).filter(Boolean).sort(function(a,b){return b.score-a.score || a.page-b.page;}).slice(0,12);
  }
  function renderFull(q) {
    var box = document.querySelector(".gs-results");
    if (!box) return;
    var old = document.getElementById("agilityFullTextResults");
    if (old) old.remove();
    var query = String(q || "").trim();
    if (!query) return;
    if (!fullPages) {
      box.insertAdjacentHTML("beforeend", '<div class="gs-section" id="agilityFullTextResults"><div class="gs-section-t">متن کامل منوال Agility</div><div style="padding:12px 14px;font-size:13px;opacity:.75">در حال آماده‌سازی جستجوی ۳۷۴ صفحه…</div></div>');
      loadFullManual().then(function(pages) { if (pages) renderFull(q); });
      return;
    }
    var found = fullSearch(query);
    var html = '<div class="gs-section" id="agilityFullTextResults"><div class="gs-section-t">۲. صفحات مرتبط منوال · '+found.length+' نتیجه از ۳۷۴ صفحه</div>';
    if (!found.length) html += '<div style="padding:12px 14px;font-size:13px;opacity:.75">در متن استخراج‌شده نتیجه‌ای با همه واژه‌ها پیدا نشد؛ عبارت کوتاه‌تر یا کد خطا را امتحان کنید.</div>';
    html += found.map(function(x) {
      var snippet = fullSnippet(x.text, fullNorm(query).split(" ").filter(function(t){return t.length>1;}));
      return '<button type="button" class="gs-item" onclick="openAgilityFullPage('+x.page+')"><span class="gs-item-code" dir="ltr">PDF '+x.page+'</span><span class="gs-item-title">'+esc(snippet)+'</span></button>';
    }).join("");
    html += '<div style="padding:10px 14px;font-size:11px;opacity:.7">جستجو روی لایه متنی PDF است؛ شکل‌ها و نوشته‌های صرفاً تصویری ممکن است در نتایج نباشند.</div></div>';
    box.insertAdjacentHTML("beforeend", html);
  }
  window.openAgilityFullPage = function(page) {
    var p = fullPageByNumber[String(page)];
    var box = document.getElementById("agilityManualDetail");
    if (!p || !box) {
      box = document.querySelector(".gs-results");
      if (!box) return;
      var old = document.getElementById("agilityManualDetail");
      if (old) old.remove();
      box.insertAdjacentHTML("beforeend", '<div id="agilityManualDetail"></div>');
      box = document.getElementById("agilityManualDetail");
    }
    var text = String(p.text || "").trim();
    box.innerHTML = '<div class="gs-section"><div class="gs-section-t">منوال Agility · PDF '+page+'</div><div style="padding:12px 14px;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px">'+esc(text)+'</div><div style="padding:10px 14px;font-size:11px;opacity:.75">سند 1014603 05، Rev 05 (2017). متن استخراج‌شده است؛ شکل‌ها و روش‌های اصلی را در نسخه رسمی بررسی کنید. این نتیجه به‌تنهایی مجوز انجام سرویس یا تغییر ایمنی دستگاه نیست.</div></div>';
    box.scrollIntoView({behavior:"smooth",block:"nearest"});
  };
  var originalRun = window.runGlobalSearch;
  if (typeof originalRun === "function") {
    window.runGlobalSearch = function(q) {
      originalRun(q);
      render(q);
      renderFull(q);
    };
  }
  var originalInput = window.onGlobalSearchInput;
  window.onGlobalSearchInput = function(val) {
    if (typeof originalInput === "function") originalInput(val);
    else window.runGlobalSearch(val);
  };
  console.log("Agility manual quick index loaded (" + records.length + " records); full-text search ready");
})();