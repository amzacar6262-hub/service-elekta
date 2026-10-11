/* ═══════════════════════════════════════
   flowcharts.js — فلوچارت‌های عیب‌یابی تعاملی
   ═══════════════════════════════════════ */

const FLOWCHARTS = [
{
  id:"fc-beam",
  title:"پرتو در حین درمان قطع شد",
  subtitle:"Beam cut during treatment",
  icon:"warn",
  c1:"#FF9500", c2:"#FF3B30",
  nodes:{
    n1:{ type:"q", text:"چراغ قرمز روی پنل اصلی روشن است؟",
      options:[{label:"بله",next:"n2"},{label:"نه",next:"n5"}] },
    n2:{ type:"q", text:"کد خطای عددی روی پنل نمایش داده می‌شود؟",
      options:[{label:"بله",next:"n3"},{label:"نه",next:"n4"}] },
    n3:{ type:"end", text:"کد خطا را از تب «کدهای خطا» جستجو کن. اقدام مربوطه را انجام بده.",
      severity:"info", next:null },
    n4:{ type:"action", text:"بیمار را از اتاق خارج کن و دز اعمال‌شده را ثبت کن. کد خطا را از Service → Logs استخراج کن.",
      next:"n3" },
    n5:{ type:"q", text:"چراغ‌های سبز روی پنل همچنان روشن هستند؟",
      options:[{label:"بله",next:"n6"},{label:"نه",next:"n7"}] },
    n6:{ type:"end", text:"مشکل از اینترلاک بیمار یا Position است. فایل درمان بیمار را بازبینی کن.",
      severity:"info", next:null },
    n7:{ type:"q", text:"دستگاه کاملاً خاموش شده؟",
      options:[{label:"بله",next:"n8"},{label:"نه",next:"n9"}] },
    n8:{ type:"action", text:"قطع برق کامل. بریکر اصلی را بررسی کن. با تیم فنی تماس بگیر.",
      next:null, severity:"danger" },
    n9:{ type:"end", text:"مشکل از اینترلاک ایمنی است. اتاق را بررسی و Reset کن. اگر تکرار شد گزارش بده.",
      severity:"warn", next:null }
  }
},
{
  id:"fc-mlc",
  title:"خطای MLC Leaf",
  subtitle:"MLC Leaf error",
  icon:"grid",
  c1:"#FF375F", c2:"#AF52DE",
  nodes:{
    n1:{ type:"q", text:"کد خطا شماره Leaf را نشان می‌دهد؟",
      options:[{label:"بله",next:"n2"},{label:"نه",next:"n3"}] },
    n2:{ type:"q", text:"Leaf گیر کرده یا آزادانه حرکت می‌کند؟",
      options:[{label:"گیر کرده",next:"n4"},{label:"آزاد است",next:"n5"}] },
    n3:{ type:"action", text:"Auto-Home را از Service Mode اجرا کن. سپس Picket Fence تست بزن.",
      next:"n6" },
    n4:{ type:"action", text:"ریل و Leaf را با برس نرم تمیز کن. اگر آلودگی دارد، گریس‌کاری مجدد.",
      next:"n6" },
    n5:{ type:"q", text:"صدای غیرعادی از Motor شنیده می‌شود؟",
      options:[{label:"بله",next:"n7"},{label:"نه",next:"n8"}] },
    n6:{ type:"q", text:"پس از تمیزکاری، خطا برطرف شد؟",
      options:[{label:"بله",next:"n9"},{label:"نه",next:"n7"}] },
    n7:{ type:"action", text:"Motor یا Encoder Leaf مشکل‌دار است. Leaf را از MLC خارج و Motor را تعویض کن.",
      next:"n6" },
    n8:{ type:"end", text:"Encoder یا Driver مشکل دارد. با Service تماس بگیر.",
      severity:"warn", next:null },
    n9:{ type:"end", text:"Picket Fence و QA ماهانه MLC را اجرا کن برای تأیید.",
      severity:"info", next:null }
  }
},
{
  id:"fc-cool",
  title:"خطای سیستم خنک‌کننده",
  subtitle:"Cooling system error",
  icon:"warn",
  c1:"#5AC8FA", c2:"#0A84FF",
  nodes:{
    n1:{ type:"q", text:"سطح آب مخزن Chiller پایین است؟",
      options:[{label:"بله",next:"n2"},{label:"نه",next:"n3"}] },
    n2:{ type:"action", text:"مایع خنک‌کننده Elekta Original اضافه کن. نشتی را بررسی کن.",
      next:"n4" },
    n3:{ type:"q", text:"فن‌های Chiller کار می‌کنند؟",
      options:[{label:"بله",next:"n5"},{label:"نه",next:"n6"}] },
    n4:{ type:"q", text:"نشتی در سیستم وجود دارد؟",
      options:[{label:"بله",next:"n7"},{label:"نه",next:"n8"}] },
    n5:{ type:"q", text:"ΔT (اختلاف دمای ورودی/خروجی) بین ۳ تا ۵ درجه است؟",
      options:[{label:"بله",next:"n9"},{label:"خیر",next:"n10"}] },
    n6:{ type:"action", text:"Motor فن یا برد کنترل Chiller خراب است. تعویض کن.",
      next:"n9" },
    n7:{ type:"end", text:"نشتی در مسیر پیدا کن. اتصالات و اورینگ‌ها را بررسی و تعویض کن.",
      severity:"warn", next:null },
    n8:{ type:"action", text:"فیلتر و رادیاتور را تمیز کن. جریان پمپ را بررسی کن.",
      next:"n9" },
    n9:{ type:"q", text:"دمای دستگاه به محدوده نرمال برگشته؟",
      options:[{label:"بله",next:"n11"},{label:"نه",next:"n12"}] },
    n10:{ type:"end", text:"پمپ یا رادیاتور مشکل دارد. بررسی تخصصی Chiller نیاز است.",
      severity:"warn", next:null },
    n11:{ type:"end", text:"QA روزانه دستگاه را اجرا کن. اگر خطا برگشت، فشارسنج و اینترلاک را بررسی کن.",
      severity:"info", next:null },
    n12:{ type:"end", text:"با Service تماس بگیر. احتمال مشکل در Modulator یا Head cooling loop.",
      severity:"danger", next:null }
  }
},
{
  id:"fc-rf",
  title:"مشکل RF یا Magnetron",
  subtitle:"RF / Magnetron issue",
  icon:"target",
  c1:"#FF2D55", c2:"#AF52DE",
  nodes:{
    n1:{ type:"q", text:"فشار SF6 در محدوده ۲۸–۳۰ psi است؟",
      options:[{label:"بله",next:"n2"},{label:"پایین‌تر",next:"n3"}] },
    n2:{ type:"q", text:"توان RF در محدوده نرمال است؟",
      options:[{label:"بله",next:"n4"},{label:"پایین‌تر",next:"n5"}] },
    n3:{ type:"action", text:"سیستم را از SF6 تخلیه و نشتی را با Detector پیدا کن. سپس شارژ مجدد.",
      next:"n6" },
    n4:{ type:"end", text:"مشکل از جای دیگری است. Log را بررسی کن.",
      severity:"info", next:null },
    n5:{ type:"q", text:"AFC در حین تابش پایدار است؟",
      options:[{label:"بله",next:"n7"},{label:"نه",next:"n8"}] },
    n6:{ type:"q", text:"پس از شارژ، فشار پایدار ماند؟",
      options:[{label:"بله",next:"n9"},{label:"نه",next:"n10"}] },
    n7:{ type:"end", text:"مشکل در Magnetron یا Klystron است. با Service تماس بگیر.",
      severity:"warn", next:null },
    n8:{ type:"action", text:"AFC را در Service Mode تنظیم کن. فرکانس پایه را چک کن.",
      next:"n11" },
    n9:{ type:"end", text:"Auto-Conditioning و QA RF را اجرا کن.",
      severity:"info", next:null },
    n10:{ type:"end", text:"نشتی جدی در Waveguide. با Service تماس بگیر.",
      severity:"danger", next:null },
    n11:{ type:"q", text:"پس از تنظیم AFC، توان برگشت؟",
      options:[{label:"بله",next:"n12"},{label:"نه",next:"n13"}] },
    n12:{ type:"end", text:"QA دزیمتری را اجرا کن و پایداری Beam را تست کن.",
      severity:"info", next:null },
    n13:{ type:"end", text:"Magnetron نیاز به تعویض دارد. Manul تعویض Magnetron را ببین.",
      severity:"warn", next:null }
  }
},
{
  id:"fc-gantry",
  title:"خطای Gantry یا Couch",
  subtitle:"Gantry / Couch error",
  icon:"wrench",
  c1:"#BF5AF2", c2:"#5856D6",
  nodes:{
    n1:{ type:"q", text:"Gantry در حین چرخش صدا یا لرزش غیرعادی دارد؟",
      options:[{label:"بله",next:"n2"},{label:"نه",next:"n3"}] },
    n2:{ type:"q", text:"چرخش آهسته هم مشکل دارد؟",
      options:[{label:"بله",next:"n4"},{label:"نه",next:"n5"}] },
    n3:{ type:"q", text:"حرکت میز (Long/Lat/Vert) روان است؟",
      options:[{label:"بله",next:"n6"},{label:"نه",next:"n7"}] },
    n4:{ type:"action", text:"Reset Motors را از پنل اتاق اجرا کن. Encoder Gantry را بررسی کن.",
      next:"n8" },
    n5:{ type:"end", text:"مشکل در سرعت‌های بالا. Balance Gantry را تنظیم کن.",
      severity:"info", next:null },
    n6:{ type:"end", text:"خطا موقتی بوده. Log را بررسی کن. اگر تکرار شد گزارش بده.",
      severity:"info", next:null },
    n7:{ type:"q", text:"کد خطای Couch Position نمایش داده می‌شود؟",
      options:[{label:"بله",next:"n9"},{label:"نه",next:"n10"}] },
    n8:{ type:"q", text:"خطا پس از Reset برطرف شد؟",
      options:[{label:"بله",next:"n11"},{label:"نه",next:"n12"}] },
    n9:{ type:"action", text:"Encoder محور مشکل‌دار را بررسی و در صورت نیاز تعویض کن.",
      next:"n13" },
    n10:{ type:"end", text:"Backlash یا Motor میز مشکل دارد. تست Load Tolerance بزن.",
      severity:"warn", next:null },
    n11:{ type:"end", text:"Gantry Angle را کالیبره کن و Star Shot بزن.",
      severity:"info", next:null },
    n12:{ type:"end", text:"Encoder یا Motor Gantry معیوب است. با Service تماس بگیر.",
      severity:"warn", next:null },
    n13:{ type:"end", text:"پس از تعویض Encoder، کالیبراسیون موقعیت میز را اجرا کن.",
      severity:"info", next:null }
  }
},
{
  id:"fc-brachy",
  title:"مشکل Brachytherapy",
  subtitle:"Brachytherapy issue",
  icon:"warn",
  c1:"#FF9F0A", c2:"#C93400",
  nodes:{
    n1:{ type:"q", text:"منبع Ir-192 در Safe Position است؟",
      options:[{label:"بله",next:"n2"},{label:"نه — گیر کرده",next:"n3"}] },
    n2:{ type:"q", text:"Indexer خطا نشان می‌دهد؟",
      options:[{label:"بله",next:"n4"},{label:"نه",next:"n5"}] },
    n3:{ type:"end", text:"🚨 فوراً Emergency Stop بزن، RSO را مطلع کن و Manual Retract را اجرا کن.",
      severity:"danger", next:null },
    n4:{ type:"q", text:"کابل‌های Indexer سالم هستند؟",
      options:[{label:"بله",next:"n6"},{label:"نه",next:"n7"}] },
    n5:{ type:"q", text:"کیفیت تصویر یا پلن OK است؟",
      options:[{label:"بله",next:"n8"},{label:"نه",next:"n9"}] },
    n6:{ type:"action", text:"Indexer را در Service Mode ری‌استارت کن و کالیبراسیون Indexer را اجرا کن.",
      next:"n10" },
    n7:{ type:"end", text:"کابل را تعویض کن. تست Position Verification بعد از تعویض.",
      severity:"warn", next:null },
    n8:{ type:"end", text:"مشکل جزئی است. لاگ سیستم را چک کن.",
      severity:"info", next:null },
    n9:{ type:"end", text:"Applicator یا مسیر Tube را بازرسی کن. تست Source Simulator بزن.",
      severity:"warn", next:null },
    n10:{ type:"q", text:"خطا برطرف شد؟",
      options:[{label:"بله",next:"n11"},{label:"نه",next:"n12"}] },
    n11:{ type:"end", text:"QA روزانه Flexitron را اجرا کن. اگر OK بود، آماده درمان است.",
      severity:"info", next:null },
    n12:{ type:"end", text:"Indexer نیاز به تعویض دارد. با Elekta Service تماس بگیر.",
      severity:"warn", next:null }
  }
}
];

/* ═══ State ═══ */
let fcCurrent = null;
let fcPath = [];

/* ═══ Render list ═══ */
function renderFlowList(){
  const el = document.getElementById("flowList");
  if(!el) return;
  el.innerHTML = FLOWCHARTS.map(function(fc, i){
    return '<button class="cat cat-mini" ' +
      'style="background:linear-gradient(145deg,' + fc.c1 + ' 0%,' + fc.c2 + ' 100%);animation-delay:' + (i*.05) + 's" ' +
      'onclick="openFlowchart(\'' + fc.id + '\')">' +
      '<div class="cat-ic">' + (ICONS[fc.icon] || ICONS.warn) + '</div>' +
      '<div class="cat-n">' + fc.title + '</div>' +
    '</button>';
  }).join("");
}

/* ═══ Open flowchart ═══ */
function openFlowchart(id){
  const fc = FLOWCHARTS.find(function(x){ return x.id === id; });
  if(!fc) return;
  fcCurrent = fc;
  fcPath = [];
  showFlowNode(fc.start || "n1");
  const sheet = document.getElementById("flowSheet");
  const backdrop = document.getElementById("flowSheetBackdrop");
  if(sheet) sheet.classList.add("show");
  if(backdrop) backdrop.classList.add("show");
  if(navigator.vibrate) navigator.vibrate(8);
}

function closeFlowchart(){
  const sheet = document.getElementById("flowSheet");
  const backdrop = document.getElementById("flowSheetBackdrop");
  if(sheet) sheet.classList.remove("show");
  if(backdrop) backdrop.classList.remove("show");
  fcCurrent = null;
  fcPath = [];
}

/* ═══ Show node ═══ */
function showFlowNode(nodeId){
  if(!fcCurrent) return;
  const node = fcCurrent.nodes[nodeId];
  if(!node) return;

  const body = document.getElementById("flowBody");
  const title = document.getElementById("flowTitle");
  if(!body || !title) return;
  title.textContent = fcCurrent.title;

  var nodeClass = "flow-node";
  if(node.type === "end"){
    if(node.severity === "danger") nodeClass += " danger";
    else if(node.severity === "warn") nodeClass += " warn";
    else nodeClass += " info";
  }

  var html = "";

  /* Breadcrumb */
  if(fcPath.length > 0){
    html += '<div class="flow-breadcrumb">';
    for(var i = 0; i < fcPath.length; i++){
      html += '<span class="flow-crumb">' + fcPath[i] + '</span>';
      if(i < fcPath.length - 1) html += '<span class="flow-crumb-arrow">›</span>';
    }
    html += '</div>';
  }

  html += '<div class="' + nodeClass + '">';

  if(node.type === "q"){
    html += '<div class="flow-q-icon">?</div>';
    html += '<div class="flow-q-text">' + node.text + '</div>';
    html += '</div>';
    html += '<div class="flow-options">';
    for(var j = 0; j < node.options.length; j++){
      var opt = node.options[j];
      html += '<button class="flow-option" onclick="flowChoose(\'' + opt.label + '\', \'' + opt.next + '\')">'
        + '<span>' + opt.label + '</span>'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
        + '</button>';
    }
    html += '</div>';
  } else if(node.type === "action"){
    html += '<div class="flow-action-icon">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
      + '</div>';
    html += '<div class="flow-action-text">' + node.text + '</div>';
    html += '</div>';
    if(node.next){
      html += '<div class="flow-options">'
        + '<button class="flow-option primary" onclick="flowChoose(\'ادامه\', \'' + node.next + '\')">'
        + '<span>ادامه</span>'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
        + '</button>'
        + '</div>';
    }
  } else if(node.type === "end"){
    html += '<div class="flow-end-icon">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
      + '</div>';
    html += '<div class="flow-end-text">' + node.text + '</div>';
    html += '</div>';
    html += '<div class="flow-options">'
      + '<button class="flow-option" onclick="restartFlowchart()">'
      + '<span>شروع دوباره</span>'
      + '</button>'
      + '<button class="flow-option primary" onclick="closeFlowchart()">'
      + '<span>پایان</span>'
      + '</button>'
      + '</div>';
  }

  /* Back button */
  if(fcPath.length > 0 && node.type !== "end"){
    html += '<button class="flow-back" onclick="flowBack()">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
      + '<span>مرحله قبل</span>'
      + '</button>';
  }

  body.innerHTML = html;
  body.scrollTop = 0;
}

/* ═══ Choose option ═══ */
function flowChoose(label, nextId){
  fcPath.push(label);
  if(navigator.vibrate) navigator.vibrate(6);
  showFlowNode(nextId);
}

/* ═══ Go back ═══ */
function flowBack(){
  if(fcPath.length === 0) return;
  fcPath.pop();
  /* از شروع مسیر، از نو رندر کن */
  var nodeId = fcCurrent.start || "n1";
  var tempPath = fcPath.slice();
  fcPath = [];
  showFlowNode(nodeId);
  /* شبیه‌سازی انتخاب‌های قبلی */
  for(var i = 0; i < tempPath.length; i++){
    var node = fcCurrent.nodes[nodeId];
    if(!node || !node.options) break;
    var found = null;
    for(var j = 0; j < node.options.length; j++){
      if(node.options[j].label === tempPath[i]){
        found = node.options[j];
        break;
      }
    }
    if(!found) break;
    fcPath.push(tempPath[i]);
    nodeId = found.next;
  }
  showFlowNode(nodeId);
}

/* ═══ Restart ═══ */
function restartFlowchart(){
  if(!fcCurrent) return;
  fcPath = [];
  showFlowNode(fcCurrent.start || "n1");
}

/* ═══ Export ═══ */
window.renderFlowList = renderFlowList;
window.openFlowchart = openFlowchart;
window.closeFlowchart = closeFlowchart;
window.flowChoose = flowChoose;
window.flowBack = flowBack;
window.restartFlowchart = restartFlowchart;

console.log("✅ flowcharts.js — " + FLOWCHARTS.length + " flowcharts loaded");