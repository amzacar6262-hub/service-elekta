/* ═══════════════════════════════════════
   pm.js — Preventive Maintenance
   چک‌لیست نگهداری پیشگیرانه
   ═══════════════════════════════════════ */

const PM_CATS = {
  safety: { name:"ایمنی",      color:"cat-safety" },
  mech:   { name:"مکانیک",     color:"cat-mech" },
  dose:   { name:"دزیمتری",    color:"cat-dose" },
  rf:     { name:"RF",         color:"cat-rf" },
  img:    { name:"تصویربرداری", color:"cat-img" },
  cool:   { name:"خنک‌کننده",   color:"cat-cool" },
  mlc:    { name:"MLC",        color:"cat-mlc" },
  misc:   { name:"عمومی",      color:"cat-misc" }
};

const PM_FREQS = [
  { id:"daily",      name:"روزانه",   short:"D",  resetHours: 24 },
  { id:"weekly",     name:"هفتگی",    short:"W",  resetHours: 24 * 7 },
  { id:"monthly",    name:"ماهانه",   short:"M",  resetHours: 24 * 30 },
  { id:"quarterly",  name:"فصلی",     short:"Q",  resetHours: 24 * 90 },
  { id:"semiannual", name:"۶ ماهه",   short:"S",  resetHours: 24 * 180 },
  { id:"annual",     name:"سالانه",   short:"A",  resetHours: 24 * 365 }
];

const PM_TASKS = [
/* ══════════ DAILY ══════════ */
{ id:"d01", freq:"daily", cat:"safety", machines:["all"], min:2, critical:true,
  title:"بررسی وضعیت پنل و LEDها",
  desc:"همه چراغ‌های نشانگر روی پنل اصلی باید سبز باشند" },
{ id:"d02", freq:"daily", cat:"safety", machines:["all"], min:5, critical:true,
  title:"تست Emergency Stop",
  desc:"فشار دکمه و بررسی قطع سریع پرتو — سپس Reset با چرخش" },
{ id:"d03", freq:"daily", cat:"safety", machines:["all"], min:3, critical:true,
  title:"بررسی اینترلاک درب اتاق",
  desc:"باز کردن درب باید فوراً پرتو را قطع کند (زیر ۱۰۰ms)" },
{ id:"d04", freq:"daily", cat:"safety", machines:["all"], min:2,
  title:"بررسی چراغ‌های هشدار و CCTV",
  desc:"چراغ قرمز بیرونی، مانیتور CCTV و ارتباط دوطرفه بیمار" },
{ id:"d05", freq:"daily", cat:"dose", machines:["all"], min:5, critical:true,
  title:"اندازه‌گیری دز خروجی روزانه",
  desc:"با فانتوم روزانه — مرجع ۱۰۰ cGy، انحراف مجاز ± ۳٪" },
{ id:"d06", freq:"daily", cat:"mech", machines:["all"], min:3,
  title:"تست حرکت گانتری ۳۶۰ درجه",
  desc:"بررسی نبود صدا، لرزش یا گیر غیرعادی" },
{ id:"d07", freq:"daily", cat:"mech", machines:["all"], min:3,
  title:"تست میز درمان در سه محور",
  desc:"حرکت Long، Lat، Vert و بررسی روان بودن" },
{ id:"d08", freq:"daily", cat:"img", machines:["all"], min:4,
  title:"بررسی سیستم kV/MV Imaging",
  desc:"تصویربرداری تست از فانتوم و بررسی کیفیت" },
{ id:"d09", freq:"daily", cat:"cool", machines:["all"], min:2,
  title:"بررسی سطح آب خنک‌کننده",
  desc:"سطح مخزن باید بین MIN و MAX باشد" },
{ id:"d10", freq:"daily", cat:"misc", machines:["all"], min:2,
  title:"بررسی فیلترها و MLC",
  desc:"چک آلودگی، آسیب یا انسداد در فیلترها و Leafها" },
{ id:"d11", freq:"daily", cat:"misc", machines:["all"], min:3,
  title:"ثبت در دفتر QA و امضا",
  desc:"همه نتایج باید در فرم QA روزانه ثبت شود" },
{ id:"d12", freq:"daily", cat:"mech", machines:["all"], min:2,
  title:"بررسی دمای محیط اتاق",
  desc:"دمای اتاق درمان باید ۲۰-۲۴ درجه سانتی‌گراد باشد" },

/* ══════════ WEEKLY ══════════ */
{ id:"w01", freq:"weekly", cat:"dose", machines:["all"], min:30, critical:true,
  title:"QA هفتگی دزیمتری",
  desc:"اندازه‌گیری خروجی مطلق، PDD، Profile در فانتوم آب" },
{ id:"w02", freq:"weekly", cat:"img", machines:["Synergy","Infinity","Versa HD"], min:20,
  title:"QA هفتگی EPID",
  desc:"بررسی Uniformity، Resolution و موقعیت تصویر" },
{ id:"w03", freq:"weekly", cat:"mlc", machines:["Synergy","Infinity","Versa HD"], min:15,
  title:"بررسی سریع MLC با Picket Fence",
  desc:"تست سریع همه Leafها با فیلم EBT3" },
{ id:"w04", freq:"weekly", cat:"misc", machines:["all"], min:10, critical:true,
  title:"پشتیبان‌گیری داده‌های بیماران",
  desc:"بک‌آپ از iGuide/Integrity و تنظیمات به USB" },
{ id:"w05", freq:"weekly", cat:"misc", machines:["all"], min:3,
  title:"بررسی فضای دیسک کنسول",
  desc:"حداقل ۲۰٪ فضای آزاد باید موجود باشد" },
{ id:"w06", freq:"weekly", cat:"misc", machines:["Synergy","Infinity"], min:5,
  title:"تست ارتباط با ARIA/MOSAIQ",
  desc:"تست DICOM Echo و Worklist" },
{ id:"w07", freq:"weekly", cat:"cool", machines:["all"], min:5,
  title:"بررسی فن‌های Head و Chiller",
  desc:"تست عملکرد فن‌ها، شنیدن صدای غیرعادی" },
{ id:"w08", freq:"weekly", cat:"cool", machines:["all"], min:5,
  title:"بررسی فیلتر و آب Chiller",
  desc:"چک فیلترها و سطح آب — تعویض در صورت نیاز" },

/* ══════════ MONTHLY ══════════ */
{ id:"m01", freq:"monthly", cat:"dose", machines:["all"], min:90, critical:true,
  title:"QA ماهانه دزیمتری کامل",
  desc:"همه انرژی‌ها، PDD، Profile، Flatness و Symmetry" },
{ id:"m02", freq:"monthly", cat:"mlc", machines:["Synergy","Infinity","Versa HD","Axesse"], min:60, critical:true,
  title:"QA ماهانه MLC کامل",
  desc:"Picket Fence، Backlash، هم‌ترازی با کولیما" },
{ id:"m03", freq:"monthly", cat:"img", machines:["Synergy","Infinity","Versa HD"], min:45,
  title:"کالیبراسیون Imaging kV",
  desc:"kVp، mA، Dark، Gain و Uniformity" },
{ id:"m04", freq:"monthly", cat:"mech", machines:["all"], min:30,
  title:"کالیبراسیون لیزرهای اتاق",
  desc:"بررسی هم‌ترازی سه لیزر با فانتوم Isocenter" },
{ id:"m05", freq:"monthly", cat:"mlc", machines:["Versa HD","Infinity","Axesse"], min:30,
  title:"بررسی Backlash MLC",
  desc:"تست اختلاف موقعیت در رفت و برگشت هر Leaf" },
{ id:"m06", freq:"monthly", cat:"mech", machines:["Infinity"], min:40,
  title:"تست HexaPOD 6DoF",
  desc:"دقت ترجمه و چرخش در ۶ درجه آزادی" },
{ id:"m07", freq:"monthly", cat:"mech", machines:["all"], min:20,
  title:"بررسی Backlash Jaws",
  desc:"تست Backlash Jawهای X و Y" },
{ id:"m08", freq:"monthly", cat:"mech", machines:["all"], min:20,
  title:"روانکاری ریل‌های MLC",
  desc:"اعمال گریس Original Elekta در صورت نیاز" },
{ id:"m09", freq:"monthly", cat:"safety", machines:["all"], min:20, critical:true,
  title:"تست کامل Door Interlock",
  desc:"بررسی همه میکروسوئیچ‌ها و زمان قطع" },
{ id:"m10", freq:"monthly", cat:"misc", machines:["all"], min:15,
  title:"بک‌آپ تنظیمات سیستم",
  desc:"Backup کامل از Service Configuration" },

/* ══════════ QUARTERLY ══════════ */
{ id:"q01", freq:"quarterly", cat:"cool", machines:["all"], min:45,
  title:"تعویض فیلترهای Chiller",
  desc:"تعویض فیلترهای آب و هوا" },
{ id:"q02", freq:"quarterly", cat:"mlc", machines:["Synergy","Infinity","Versa HD"], min:60,
  title:"بررسی Encoder MLC",
  desc:"تست عملکرد همه Encoderها و کالیبراسیون" },
{ id:"q03", freq:"quarterly", cat:"safety", machines:["all"], min:30, critical:true,
  title:"تست Battery Backup UPS",
  desc:"بررسی شارژ و عملکرد باتری‌های UPS کنسول" },
{ id:"q04", freq:"quarterly", cat:"mech", machines:["all"], min:40,
  title:"بررسی بلبرینگ‌ها و ریل‌ها",
  desc:"روانکاری و بررسی سایش در نقاط کلیدی" },
{ id:"q05", freq:"quarterly", cat:"safety", machines:["all"], min:30,
  title:"تست Emergency Systems",
  desc:"تست کامل همه دکمه‌ها و اینترلاک‌های ایمنی" },

/* ══════════ SEMIANNUAL ══════════ */
{ id:"s01", freq:"semiannual", cat:"mech", machines:["Infinity","Versa HD"], min:90,
  title:"کالیبراسیون کامل HexaPOD",
  desc:"کالیبراسیون ۶DoF و تست دقت نهایی" },
{ id:"s02", freq:"semiannual", cat:"rf", machines:["Synergy","Infinity","Versa HD"], min:120, critical:true,
  title:"تنظیم AFC و Magnetron",
  desc:"بررسی فرکانس، توان، تنظیم دقیق AFC" },
{ id:"s03", freq:"semiannual", cat:"cool", machines:["all"], min:60,
  title:"تعویض آب خنک‌کننده",
  desc:"تخلیه و شارژ آب با مایع Original Elekta" },
{ id:"s04", freq:"semiannual", cat:"misc", machines:["all"], min:30,
  title:"تست ولتاژ Battery UPS",
  desc:"اندازه‌گیری ولتاژ هر باتری UPS" },
{ id:"s05", freq:"semiannual", cat:"misc", machines:["all"], min:45,
  title:"بازبینی لاگ‌های خطا",
  desc:"تحلیل خطاهای ۶ ماه گذشته و پیشگیری" },

/* ══════════ ANNUAL ══════════ */
{ id:"a01", freq:"annual", cat:"dose", machines:["all"], min:240, critical:true,
  title:"QA سالانه دزیمتری جامع",
  desc:"همه انرژی‌ها، TPR، PDD، Output Factor (TG-142)" },
{ id:"a02", freq:"annual", cat:"misc", machines:["all"], min:180,
  title:"تعویض روغن و گریس",
  desc:"تعویض در همه نقاط طبق توصیه Elekta" },
{ id:"a03", freq:"annual", cat:"rf", machines:["all"], min:120,
  title:"بررسی Waveguide",
  desc:"بررسی نشتی، فشار SF6 و اتصالات" },
{ id:"a04", freq:"annual", cat:"safety", machines:["all"], min:120, critical:true,
  title:"QA سالانه Safety Systems",
  desc:"تست جامع همه سیستم‌های ایمنی و اینترلاک" },
{ id:"a05", freq:"annual", cat:"dose", machines:["all"], min:90,
  title:"کالیبراسیون Energy",
  desc:"بررسی دقت انرژی همه مدها" },
{ id:"a06", freq:"annual", cat:"mlc", machines:["all"], min:120,
  title:"کالیبراسیون کامل MLC",
  desc:"تنظیم صفر، Gain، Backlash همه Leafها" },
{ id:"a07", freq:"annual", cat:"img", machines:["all"], min:120, critical:true,
  title:"کالیبراسیون XVI کامل",
  desc:"Geometry، FlexMap و Reconstruction" },
{ id:"a08", freq:"annual", cat:"rf", machines:["Synergy","Infinity","Versa HD"], min:120,
  title:"بررسی وضعیت Tube/Target",
  desc:"بازرسی و ارزیابی زمان تعویض" },
{ id:"a09", freq:"annual", cat:"misc", machines:["all"], min:60,
  title:"تعویض قطعات Consumable",
  desc:"تعویض O-ring، فیلتر، گریس در نقاط تعیین‌شده" },
{ id:"a10", freq:"annual", cat:"misc", machines:["all"], min:60,
  title:"تهیه گزارش سالانه",
  desc:"گزارش جامع، ارسال به فیزیک‌دان مسئول" }
];

const PM_MACHINES = ["Synergy","Infinity","Versa HD","Unity","Axesse","Precise","Compact"];

/* ═══ STATE ═══ */
let pmFreq = "daily";
let pmMachine = "all";
let pmProgress = {};

const PM_KEY = "pm_progress_v1";

/* ═══ ذخیره/بارگذاری ═══ */
function pmLoad(){
  try {
    pmProgress = JSON.parse(localStorage.getItem(PM_KEY) || "{}");
  } catch(e){ pmProgress = {}; }
}
function pmSave(){
  try {
    localStorage.setItem(PM_KEY, JSON.stringify(pmProgress));
  } catch(e){}
}

/* ═══ Auto-Reset با گذشت زمان ═══ */
function pmAutoReset(){
  const now = Date.now();
  let changed = false;
  Object.keys(pmProgress).forEach(function(id){
    const task = PM_TASKS.find(function(t){ return t.id === id; });
    if(!task) return;
    const freq = PM_FREQS.find(function(f){ return f.id === task.freq; });
    if(!freq) return;
    const elapsed = now - pmProgress[id];
    if(elapsed > freq.resetHours * 3600 * 1000){
      delete pmProgress[id];
      changed = true;
    }
  });
  if(changed) pmSave();
}

/* ═══ فیلتر تسک‌ها ═══ */
function pmFilteredTasks(){
  return PM_TASKS.filter(function(t){
    if(t.freq !== pmFreq) return false;
    if(pmMachine === "all") return true;
    return t.machines.indexOf("all") !== -1 || t.machines.indexOf(pmMachine) !== -1;
  });
}

/* ═══ رندر چیپ‌های فرکانس ═══ */
function renderPMFreqChips(){
  const el = document.getElementById("pmFreqChips");
  if(!el) return;
  el.innerHTML = PM_FREQS.map(function(f){
    const tasks = PM_TASKS.filter(function(t){ return t.freq === f.id; });
    const done = tasks.filter(function(t){ return pmProgress[t.id]; }).length;
    return '<button class="pm-freq-chip ' + (pmFreq === f.id ? 'on' : '') + '" ' +
           'onclick="setPMFreq(\'' + f.id + '\')">' +
      f.name +
      '<span class="cnt">' + fa(done) + '/' + fa(tasks.length) + '</span>' +
    '</button>';
  }).join("");
}

function setPMFreq(id){
  pmFreq = id;
  renderPMFreqChips();
  renderPMMachineChips();
  renderPMProgress();
  renderPMList();
  if(navigator.vibrate) navigator.vibrate(5);
}

/* ═══ رندر چیپ‌های دستگاه ═══ */
function renderPMMachineChips(){
  const el = document.getElementById("pmMachineChips");
  if(!el) return;
  const all = [{id:"all", name:"همه"}].concat(PM_MACHINES.map(function(m){
    return { id:m, name:m };
  }));
  el.innerHTML = all.map(function(m){
    return '<button class="pm-freq-chip ' + (pmMachine === m.id ? 'on' : '') + '" ' +
           'onclick="setPMMachine(\'' + m.id + '\')">' +
      m.name +
    '</button>';
  }).join("");
}

function setPMMachine(id){
  pmMachine = id;
  renderPMMachineChips();
  renderPMProgress();
  renderPMList();
  if(navigator.vibrate) navigator.vibrate(5);
}

/* ═══ رندر Progress ═══ */
function renderPMProgress(){
  const el = document.getElementById("pmProgressCard");
  if(!el) return;
  const tasks = pmFilteredTasks();
  const done = tasks.filter(function(t){ return pmProgress[t.id]; }).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const freq = PM_FREQS.find(function(f){ return f.id === pmFreq; });
  const freqName = freq ? freq.name : "";

  el.innerHTML =
    '<div class="pm-progress-head">' +
      '<div class="pm-progress-title">' + freqName + '</div>' +
      '<div class="pm-progress-count">' + fa(pct) + '%</div>' +
    '</div>' +
    '<div class="pm-progress-bar">' +
      '<div class="pm-progress-fill" style="width:' + pct + '%"></div>' +
    '</div>' +
    '<div class="pm-progress-meta">' +
      '<div>' + fa(done) + ' از ' + fa(tasks.length) + ' انجام شده</div>' +
      (pct === 100 && tasks.length > 0 ? '<div>✓ کامل شد</div>' : '') +
    '</div>';
}

/* ═══ رندر لیست تسک‌ها ═══ */
function renderPMList(){
  const el = document.getElementById("pmList");
  if(!el) return;
  const tasks = pmFilteredTasks();

  if(!tasks.length){
    el.innerHTML =
      '<div class="pm-empty">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="9 11 12 14 22 4"/>' +
          '<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' +
        '</svg>' +
        '<div class="pm-empty-t">تسکی موجود نیست</div>' +
        '<div>این دستگاه در این بازه PM خاصی ندارد</div>' +
      '</div>';
    return;
  }

  el.innerHTML = tasks.map(function(t, i){
    const isDone = !!pmProgress[t.id];
    const cat = PM_CATS[t.cat] || PM_CATS.misc;
    const doneAt = isDone ? new Date(pmProgress[t.id]).toLocaleDateString("fa-IR") : "";
    return '<div class="pm-task ' + (isDone ? 'done' : '') + '" ' +
           'style="animation-delay:' + (i * .02) + 's" ' +
           'onclick="togglePMTask(\'' + t.id + '\')">' +
      '<div class="pm-check">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="20 6 9 17 4 12"/>' +
        '</svg>' +
      '</div>' +
      '<div class="pm-body">' +
        '<div class="pm-title">' + t.title + '</div>' +
        '<div class="pm-desc">' + t.desc + '</div>' +
        '<div class="pm-meta">' +
          '<span class="pm-badge ' + cat.color + '">' + cat.name + '</span>' +
          '<span class="pm-badge">⏱ ' + fa(t.min) + ' دقیقه</span>' +
          (t.critical ? '<span class="pm-badge critical">ضروری</span>' : '') +
          (isDone ? '<span class="pm-done-at">✓ ' + doneAt + '</span>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
  }).join("");
}

/* ═══ Toggle تسک ═══ */
function togglePMTask(id){
  if(pmProgress[id]){
    delete pmProgress[id];
  } else {
    pmProgress[id] = Date.now();
    if(navigator.vibrate) navigator.vibrate([8, 20, 8]);
  }
  pmSave();
  renderPMFreqChips();
  renderPMProgress();
  renderPMList();
}

/* ═══ Reset ═══ */
function resetPMAll(){
  if(!confirm("همه تیک‌های این بازه پاک شود؟")) return;
  pmFilteredTasks().forEach(function(t){
    delete pmProgress[t.id];
  });
  pmSave();
  renderPMFreqChips();
  renderPMProgress();
  renderPMList();
  if(typeof toast === "function") toast("ریست شد");
}

/* ═══ Export ═══ */
window.renderPMFreqChips = renderPMFreqChips;
window.renderPMMachineChips = renderPMMachineChips;
window.renderPMProgress = renderPMProgress;
window.renderPMList = renderPMList;
window.setPMFreq = setPMFreq;
window.setPMMachine = setPMMachine;
window.togglePMTask = togglePMTask;
window.resetPMAll = resetPMAll;

/* ═══ Init ═══ */
(async function initPM(){
  pmLoad();
  pmAutoReset();
  renderPMFreqChips();
  renderPMMachineChips();
  renderPMProgress();
  renderPMList();
  console.log("✅ pm.js loaded — " + PM_TASKS.length + " tasks");
})();