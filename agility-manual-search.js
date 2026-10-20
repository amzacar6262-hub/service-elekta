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
    {code:"—", title:"Agility — مرجع عیب‌یابی و تعمیرات اصلاحی", en:"Agility corrective maintenance reference", ref:"Elekta Agility Corrective Maintenance Manual، سند 1014603 05، Rev 05، مارس 2017", note:"این فهرست فقط نمایه سریع کد/عنوان/صفحه است؛ جایگزین منوال کامل، تصاویر یا دستورالعمل سرویس مجاز نیست."}
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
    var old = document.getElementById("agilityManualResults");
    if (old) old.remove();
    if (!found.length) return;
    var empty = box.querySelector(".gs-empty");
    if (empty) empty.style.display = "none";
    var html = '<div class="gs-section" id="agilityManualResults"><div class="gs-section-t">منوال Agility · فهرست سریع ('+found.length+')</div>';
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
  var originalRun = window.runGlobalSearch;
  if (typeof originalRun === "function") {
    window.runGlobalSearch = function(q) {
      originalRun(q);
      render(q);
    };
  }
  var originalInput = window.onGlobalSearchInput;
  window.onGlobalSearchInput = function(val) {
    if (typeof originalInput === "function") originalInput(val);
    else window.runGlobalSearch(val);
  };
  console.log("Agility manual quick index loaded (" + records.length + " records)");
})();