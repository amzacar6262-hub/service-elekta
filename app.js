/* ═══════════════════════════════════════
   app.js — منطق و رندر (بدون داده)
   داده‌ها از data.js میان
   ═══════════════════════════════════════ */

const ICONS = {
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 1 5.4 5.4l-9.7 9.7-5.4-5.4 9.7-9.7z"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 15.1 8.6 22 9.3 17 14.2 18.2 21 12 17.7 5.8 21 7 14.2 2 9.3 8.9 8.6 12 2"/></svg>',
  starFill:'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.1 8.6 22 9.3 17 14.2 18.2 21 12 17.7 5.8 21 7 14.2 2 9.3 8.9 8.6 12 2"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
  chev:'<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="transform:scaleX(-1)"><polyline points="2 2 6 7 2 12"/></svg>'
};

const fa = n => String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const $ = s => document.querySelector(s);
let libFilter = "all", libQ = "", codeFilter = "all", codeQ = "";
let favs = new Set(JSON.parse(localStorage.getItem("favs") || "[]"));
let curSheetManual = null;

function renderStats(){
  $("#stM").textContent = fa(MANUALS.length);
  $("#stE").textContent = fa(ERRORS.length);
  $("#stF").textContent = fa(favs.size);
  $("#abM").textContent = fa(MANUALS.length) + " مورد";
  $("#abE").textContent = fa(ERRORS.length) + " مورد";
}
function renderCats(){
  var ill = window.ILLUSTRATIONS || {};
  $("#catGrid").innerHTML = CATS.map((c,i) => {
    var bg = ill[c.id] || ill.default || "";
    return '<button class="cat" style="background:linear-gradient(145deg,'+c.c1+' 0%,'+c.c2+' 100%);animation-delay:'+(i*.04)+'s" onclick="goCat(\''+c.id+'\')">'
      + '<div class="cat-ill">' + bg + '</div>'
      + '<div class="cat-ic">'+ICONS[c.icon]+'</div>'
      + '<div class="cat-n">'+c.name+'</div>'
      + '</button>';
  }).join("");
}
function renderHero(){
  var container = document.querySelector("#page-home .health-sub");
  if(!container) return;
  var existing = document.getElementById("homeHero");
  if(existing) return;
  var ill = window.ILLUSTRATIONS || {};
  var hero = document.createElement("div");
  hero.id = "homeHero";
  hero.className = "home-hero";
  hero.innerHTML = ill.hero || "";
  container.parentNode.insertBefore(hero, container);
}
function renderHomePop(){
  const ids = ["s1","i1","m5","m7","m1","i3"];
  $("#homePop").innerHTML = ids.map(id => MANUALS.find(m => m.id === id)).filter(Boolean)
    .map((m,i) => manualCard(m, true, i*.06)).join("");
}
function manualCard(m, compact, delay){
  if(delay===undefined) delay=0;
  const cat = CATS.find(c => c.id === m.cat) || CATS[0];
  const isFav = favs.has(m.id);
  const grad = "linear-gradient(145deg,"+cat.c1+" 0%,"+cat.c2+" 100%)";
  return '<div class="manual" style="animation-delay:'+delay+'s" onclick="openManual(\''+m.id+'\')">'
    +'<div class="manual-ic" style="background:'+grad+'">'+ICONS[cat.icon]+'</div>'
    +'<div class="manual-body">'
    +'<div class="manual-title">'+m.title+'</div>'
    +(compact?'':'<div class="manual-sub">'+m.summary+'</div>')
    +'<div class="manual-meta">'
    +'<span class="badge">'+m.code+'</span>'
    +'<span>'+m.duration+'</span>'
    +'<span>'+m.level+'</span>'
    +'</div></div>'
    +'<button class="manual-fav '+(isFav?'on':'')+'" onclick="event.stopPropagation();toggleFav(\''+m.id+'\')">'
    +(isFav ? ICONS.starFill : ICONS.star)
    +'</button></div>';
}
function renderLibChips(){
  const all = [{id:"all",name:"همه"}].concat(CATS);
  $("#libChips").innerHTML = all.map(c =>
    '<button class="chip '+(libFilter===c.id?'on':'')+'" onclick="libFilter=\''+c.id+'\';renderLibChips();renderLib()">'+c.name+'</button>'
  ).join("");
}
function renderLib(){
  let list = MANUALS.filter(m => libFilter === "all" || m.cat === libFilter);
  if(libQ.trim()){
    const q = libQ.toLowerCase();
    list = list.filter(m => (m.title+m.summary+m.code+m.machines.join(" ")).toLowerCase().includes(q));
  }
  const el = $("#libList");
  if(!list.length){ el.innerHTML = emptyState("منوالی یافت نشد","فیلتر را تغییر دهید"); return; }
  el.innerHTML = list.map((m,i) => manualCard(m, false, i*.04)).join("");
}
function renderCodeChips(){
  const sevs = [{id:"all",n:"همه"},{id:"red",n:"بحرانی"},{id:"orange",n:"هشدار"},{id:"blue",n:"اطلاع"}];
  $("#codeChips").innerHTML = sevs.map(s =>
    '<button class="chip '+(codeFilter===s.id?'on':'')+'" onclick="codeFilter=\''+s.id+'\';renderCodeChips();renderCodes()">'+s.n+'</button>'
  ).join("");
}
function renderCodes(){
  let list = ERRORS.filter(c => codeFilter === "all" || c.sev === codeFilter);
  if(codeQ.trim()){
    const q = codeQ.toLowerCase();
    list = list.filter(c => (c.code+c.title+c.act+c.machine).toLowerCase().includes(q));
  }
  const el = $("#codeList");
  if(!list.length){ el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--label2)">کدی یافت نشد</div>'; return; }
  el.innerHTML = list.map((c,i) => '<div class="ecode" style="animation-delay:'+(i*.02)+'s">'
    +'<div class="ecode-code '+c.sev+'">'+c.code+'</div>'
    +'<div class="ecode-body">'
    +'<div class="ecode-t">'+c.title+'</div>'
    +'<div class="ecode-s">'+c.machine+'</div>'
    +'<div class="ecode-s" style="color:var(--blue);margin-top:4px">اقدام: '+c.act+'</div>'
    +'</div></div>').join("");
}
function renderFavs(){
  const list = MANUALS.filter(m => favs.has(m.id));
  const el = $("#favList");
  if(!list.length){ el.innerHTML = emptyState("هنوز چیزی ذخیره نکردی","روی ستاره بزن تا اینجا بیاد"); return; }
  el.innerHTML = list.map(m => manualCard(m, false, 0)).join("");
}
function renderMachineList(){
  $("#machineList").innerHTML = MACHINES.map((m,i) => {
    const cnt = MANUALS.filter(x => x.machines.includes(m)).length;
    const colors = ["var(--blue)","var(--green)","var(--orange)","var(--purple)","var(--pink)","var(--teal)","var(--indigo)"];
    return '<button class="row" onclick="filterMachine(\''+m+'\')">'
      +'<div class="row-icon" style="background:'+colors[i%7]+'">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="6" rx="2"/><path d="M8 9v4a4 4 0 0 0 8 0V9"/><circle cx="12" cy="17" r="3"/></svg>'
      +'</div>'
      +'<div class="row-body"><div class="row-title">'+m+'</div><div class="row-sub">'+fa(cnt)+' منوال</div></div>'
      +'<div class="row-chev">'+ICONS.chev+'</div>'
      +'</button>';
  }).join("");
}
function emptyState(t, s){
  return '<div class="empty">'
    +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
    +'</svg>'
    +'<div class="empty-t">'+t+'</div>'
    +'<div>'+s+'</div>'
    +'</div>';
}

function openManual(id){
  const m = MANUALS.find(x => x.id === id);
  if(!m) return;
  curSheetManual = m;
  const cat = CATS.find(c => c.id === m.cat) || CATS[0];
  const isFav = favs.has(m.id);
  const fb = $("#sheetFav");
  fb.innerHTML = isFav ? ICONS.starFill : ICONS.star;
  fb.style.color = isFav ? "var(--yellow)" : "var(--blue)";
  fb.style.opacity = 1;
  fb.onclick = () => { toggleFav(m.id); openManual(m.id); };
  $("#sheetTitle").textContent = m.code;
  const grad = "linear-gradient(145deg,"+cat.c1+" 0%,"+cat.c2+" 100%)";
  $("#sheetBody").innerHTML =
    '<div class="detail-hero" style="background:'+grad+'">'
    +'<div class="detail-cat">'+cat.name+'</div>'
    +'<div class="detail-title">'+m.title+'</div>'
    +'<div class="detail-sum">'+m.summary+'</div>'
    +'<div class="detail-meta">'
    +'<div class="detail-meta-item">'+ICONS.clock+'<span>'+m.duration+'</span></div>'
    +'<div class="detail-meta-item">'+ICONS.target+'<span>'+m.level+'</span></div>'
    +'</div></div>'
    +(m.warn ? '<div class="alert-box">'+ICONS.warn+'<div class="txt"><div class="t">هشدار ایمنی</div>'+m.warn+'</div></div>' : "")
    +'<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">دستگاه‌های مرتبط</div></div>'
    +'<div class="tags" style="margin-bottom:16px">'+m.machines.map(x => '<span class="tag">'+x+'</span>').join("")+'</div>'
    +'<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">ابزار مورد نیاز</div></div>'
    +'<div class="tags" style="margin-bottom:20px">'+m.tools.map(x => '<span class="tag">'+x+'</span>').join("")+'</div>'
    +'<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">مراحل ('+fa(m.steps.length)+')</div></div>'
    +'<div style="background:var(--card);border-radius:14px;padding:4px 16px;margin-bottom:16px">'
    +m.steps.map((s,i) => '<div class="step '+(s.level||'')+'">'
      +'<div class="step-n">'+fa(i+1)+'</div>'
      +'<div class="step-body"><div class="step-t">'+s.t+'</div>'+(s.note?'<div class="step-note">'+s.note+'</div>':'')+'</div>'
      +'</div>').join("")
    +'</div>';
  $("#backdrop").classList.add("show");
  $("#sheet").classList.add("show");
}
function closeSheet(){
  $("#backdrop").classList.remove("show");
  $("#sheet").classList.remove("show");
}
function toggleFav(id){
  if(favs.has(id)){ favs.delete(id); toast("حذف شد"); }
  else { favs.add(id); toast("ذخیره شد ★"); }
  localStorage.setItem("favs", JSON.stringify([...favs]));
  renderStats(); renderHomePop(); renderLib(); renderFavs();
  if(curSheetManual){
    const fb = $("#sheetFav");
    const isFav = favs.has(curSheetManual.id);
    fb.innerHTML = isFav ? ICONS.starFill : ICONS.star;
    fb.style.color = isFav ? "var(--yellow)" : "var(--blue)";
  }
}
function filterMachine(m){
  libFilter = "all"; libQ = m;
  renderLibChips(); renderLib();
  go("lib");
}
function goCat(id){
  libFilter = id; renderLibChips(); renderLib(); go("lib");
}

const TABS = [
  {id:"home",label:"خانه",icon:ICONS.home},
  {id:"lib",label:"کتابخانه",icon:ICONS.book},
  {id:"codes",label:"کد خطا",icon:ICONS.warn},
  {id:"fav",label:"ذخیره",icon:ICONS.star},
  {id:"more",label:"بیشتر",icon:ICONS.more}
];
function renderTabbar(){
  var cur = document.querySelector(".page.on").id.replace("page-","");
  var tabs = [
    { id:"home",    label:"خانه",     icon:ICONS.home },
    { id:"lib",     label:"کتابخانه", icon:ICONS.book },
    { id:"gallery", label:"گالری",    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>' },
    { id:"codes",   label:"کد خطا",   icon:ICONS.warn },
    { id:"fav",     label:"ذخیره",    icon:ICONS.star }
  ];
  document.getElementById("tabbar").innerHTML = tabs.map(function(t){
    return '<button class="tab ' + (t.id === cur ? 'active' : '') + '" onclick="go(\'' + t.id + '\')">' +
      t.icon + '<span>' + t.label + '</span>' +
    '</button>';
  }).join("");
}
function go(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("on"));
  document.getElementById("page-"+id).classList.add("on");
  document.getElementById("main").scrollTop = 0;
  document.querySelectorAll("[data-nav]").forEach(n => n.classList.remove("scrolled"));
  renderTabbar();
  if(id === "fav") renderFavs();
  if(id === "lib") renderLib();
  if(id === "codes") renderCodes();
  if(id === "gallery"){
  if(typeof renderGalleryChips === "function") renderGalleryChips();
  if(typeof renderGallery === "function") renderGallery();
}
  if(id === "ref") renderRef();
}

function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1800);
}
/* ═══════════════════════════════════════
   Reference Tables
   ═══════════════════════════════════════ */
var refQ = "";

function renderRef(){
  var el = document.getElementById("refList");
  if(!el) return;
  var tables = window.REF_TABLES || [];
  if(!tables.length){
    el.innerHTML = '<div class="empty"><div class="empty-t">جداولی نیست</div></div>';
    return;
  }
  var q = (refQ || "").trim().toLowerCase();
  var filtered = tables;

  if(q){
    filtered = tables.map(function(t){
      var rows = t.rows.filter(function(r){
        return (r.k + " " + r.v + " " + (r.cat||"")).toLowerCase().indexOf(q) !== -1;
      });
      if(rows.length || t.title.toLowerCase().indexOf(q) !== -1){
        return Object.assign({}, t, { rows: rows.length ? rows : t.rows });
      }
      return null;
    }).filter(Boolean);
  }

  if(!filtered.length){
    el.innerHTML = emptyState("چیزی پیدا نشد","عبارت دیگری را امتحان کنید");
    return;
  }

  el.innerHTML = filtered.map(function(t, i){
    var grad = "linear-gradient(145deg," + t.color[0] + "," + t.color[1] + ")";
    var rowsHTML = t.rows.map(function(r){
      return '<div class="ref-row">' +
        '<div class="ref-k">' +
          (r.cat ? '<span class="ref-cat">' + r.cat + '</span>' : '') +
          r.k +
        '</div>' +
        '<div class="ref-v">' + r.v + '</div>' +
      '</div>';
    }).join("");

    return '<div class="ref-card" data-ref-id="' + t.id + '" style="animation-delay:' + (i*.06) + 's">' +
      '<div class="ref-head" onclick="toggleRef(\'' + t.id + '\')">' +
        '<div class="ref-icon" style="background:' + grad + '">' + ICONS[t.icon] + '</div>' +
        '<div class="ref-head-info">' +
          '<div class="ref-title">' + t.title + '</div>' +
          '<div class="ref-desc">' + t.desc + '</div>' +
        '</div>' +
        '<div class="ref-count">' + fa(t.rows.length) + '</div>' +
        '<div class="ref-chev">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</div>' +
      '</div>' +
      '<div class="ref-body">' +
        (t.warn ? '<div class="ref-warn">' + ICONS.warn + '<div>' + t.warn + '</div></div>' : '') +
        '<div class="ref-table">' + rowsHTML + '</div>' +
      '</div>' +
    '</div>';
  }).join("");
}

function toggleRef(id){
  var card = document.querySelector('[data-ref-id="' + id + '"]');
  if(!card) return;
  card.classList.toggle("open");
  if(navigator.vibrate) navigator.vibrate(5);
}
function updateOnline(){
  const el = $("#onlineStatus");
  if(!el) return;
  if(navigator.onLine){ el.textContent = "فعال ✓"; el.style.color = "var(--green)"; }
  else { el.textContent = "آفلاین — کش"; el.style.color = "var(--blue)"; }
}
window.addEventListener("online", updateOnline);
window.addEventListener("offline", updateOnline);

document.getElementById("main").addEventListener("scroll", e => {
  const top = e.target.scrollTop;
  const nav = document.querySelector(".page.on [data-nav]");
  if(!nav) return;
  nav.classList.toggle("scrolled", top > 24);
});

document.addEventListener("click", e => {
  const tab = e.target.closest(".tab");
  if(!tab) return;
  const rect = tab.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size/2) + "px";
  ripple.style.top  = (e.clientY - rect.top  - size/2) + "px";
  tab.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
  if(navigator.vibrate) navigator.vibrate(8);
}, { passive:true });

document.addEventListener("touchstart", e => {
  const card = e.target.closest(".cat");
  if(!card) return;
  const rect = card.getBoundingClientRect();
  const touch = e.touches[0];
  card.style.setProperty('--x', ((touch.clientX - rect.left) / rect.width * 100) + '%');
  card.style.setProperty('--y', ((touch.clientY - rect.top) / rect.height * 100) + '%');
}, { passive:true });

if("serviceWorker" in navigator){
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(()=>{}));
}

renderTabbar();
renderStats();
renderCats();
renderHero();
renderHomePop();
renderLibChips();
renderLib();
renderCodeChips();
renderCodes();
renderFavs();
renderMachineList();
if(typeof renderGalleryChips === "function") renderGalleryChips();
if(typeof renderGallery === "function") renderGallery();
updateOnline();
/* ═══════════════════════════════════════
   FIX: Sheet Close Improvements
   - دکمه بستن در پایین
   - Swipe-down برای بستن
   ═══════════════════════════════════════ */
(function(){
  const sheetBody = document.getElementById('sheetBody');
  const sheet = document.getElementById('sheet');

  /* ── ۱) افزودن دکمه بستن به پایین شیت ── */
  if(sheetBody){
    const obs = new MutationObserver(function(){
      if(sheetBody.children.length > 0 &&
         !sheetBody.querySelector('.sheet-close-bottom')){
        const btn = document.createElement('button');
        btn.className = 'sheet-close-bottom';
        btn.textContent = 'بستن';
        btn.onclick = function(){ closeSheet(); };
        sheetBody.appendChild(btn);
      }
    });
    obs.observe(sheetBody, {childList:true});
  }

  /* ── ۲) Swipe-down روی دستگیره ── */
  const grab = sheet ? sheet.querySelector('.sheet-grab') : null;
  if(sheet && grab){
    let startY = 0, startT = 0, drag = false, dy = 0;

    const onStart = (e) => {
      drag = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      startT = Date.now();
      dy = 0;
      sheet.style.transition = 'none';
    };
    const onMove = (e) => {
      if(!drag) return;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      dy = Math.max(0, y - startY);
      if(dy > 0) sheet.style.transform = 'translateY(' + dy + 'px)';
    };
    const onEnd = () => {
      if(!drag) return;
      drag = false;
      sheet.style.transition = '';
      const v = dy / Math.max(Date.now() - startT, 1);
      if(dy > 100 || v > 0.4){
        sheet.style.transform = '';
        closeSheet();
      } else {
        sheet.style.transform = 'translateY(0)';
      }
    };

    grab.addEventListener('touchstart', onStart, {passive:true});
    grab.addEventListener('touchmove', onMove, {passive:true});
    grab.addEventListener('touchend', onEnd);
    grab.addEventListener('touchcancel', onEnd);
  }
  
/* ═══════════════════════════════════════
   QR Scanner
   ═══════════════════════════════════════ */

const QR_MACHINES = {
  "ELEKTA-SYN-01":"Synergy",
  "ELEKTA-SYN-02":"Synergy",
  "ELEKTA-INF-01":"Infinity",
  "ELEKTA-INF-02":"Infinity",
  "ELEKTA-VHD-01":"Versa HD",
  "ELEKTA-AXS-01":"Axesse",
  "ELEKTA-UNI-01":"Unity",
  "ELEKTA-PRC-01":"Precise",
  "ELEKTA-CMP-01":"Compact",
  "ELEKTA-FLX-01":"Flexitron",
  /* ── میان‌بُرها (اختیاری) ── */
  "SYN":"Synergy",
  "INF":"Infinity",
  "VHD":"Versa HD",
  "AXS":"Axesse",
  "UNI":"Unity",
  "PRC":"Precise",
  "CMP":"Compact",
  "FLX":"Flexitron"
};

let scanStream = null;
let scanDetector = null;
let scanRAF = null;
let scanFacingMode = "environment";

/* ── شروع اسکن ── */
async function startScan(){
  const overlay = document.getElementById("scanOverlay");
  const video = document.getElementById("scanVideo");
  if(!overlay || !video) return;

  overlay.classList.add("show");

  /* بررسی پشتیبانی BarcodeDetector */
  if(!("BarcodeDetector" in window)){
    toast("مرورگر از اسکن QR پشتیبانی نمی‌کند");
    setTimeout(() => {
      stopScan();
      openManualQR();
    }, 800);
    return;
  }

  try {
    /* دسترسی به دوربین */
    scanStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: scanFacingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });
    video.srcObject = scanStream;
    await video.play().catch(() => {});

    /* راه‌اندازی detector */
    scanDetector = new BarcodeDetector({ formats: ["qr_code"] });

    /* حلقه اسکن */
    const tick = async () => {
      if(!scanStream || !video) return;
      try {
        const codes = await scanDetector.detect(video);
        if(codes && codes.length > 0){
          const value = codes[0].rawValue;
          handleQRResult(value);
          return;
        }
      } catch(e){ /* ignore frame errors */ }
      scanRAF = requestAnimationFrame(tick);
    };
    tick();

  } catch(err){
    console.warn("Scan error:", err);
    toast("دسترسی به دوربین ممکن نشد");
    stopScan();
    setTimeout(openManualQR, 500);
  }
}

/* ── توقف اسکن ── */
function stopScan(){
  const overlay = document.getElementById("scanOverlay");
  if(overlay) overlay.classList.remove("show");

  if(scanRAF){ cancelAnimationFrame(scanRAF); scanRAF = null; }
  if(scanStream){
    scanStream.getTracks().forEach(t => t.stop());
    scanStream = null;
  }
  const video = document.getElementById("scanVideo");
  if(video) video.srcObject = null;
  scanDetector = null;
}

/* ── تغییر دوربین ── */
function toggleScanCamera(){
  scanFacingMode = scanFacingMode === "environment" ? "user" : "environment";
  stopScan();
  setTimeout(startScan, 200);
}

/* ── پردازش نتیجه اسکن ── */
function handleQRResult(value){
  const clean = String(value || "").trim().toUpperCase();
  if(!clean) return;

  /* جستجو در نقشه */
  let machine = QR_MACHINES[clean];

  /* اگر کد کامل نبود، پسوند رو جدا کن */
  if(!machine && clean.startsWith("ELEKTA-")){
    const parts = clean.split("-");
    if(parts.length >= 3){
      const mid = parts[1];
      if(QR_MACHINES[mid]) machine = QR_MACHINES[mid];
      else if(QR_MACHINES["ELEKTA-"+mid+"-01"]) machine = QR_MACHINES["ELEKTA-"+mid+"-01"];
    }
  }

  /* Flash سبز موفقیت */
  flashScanSuccess();

  setTimeout(() => {
    stopScan();

    if(machine){
      /* فیلتر کتابخانه بر اساس دستگاه */
      libFilter = "all";
      libQ = machine;
      renderLibChips();
      renderLib();
      go("lib");
      const searchInput = document.querySelector("#page-lib .search-inner input");
      if(searchInput) searchInput.value = machine;

      toast("دستگاه: " + machine);
    } else {
      toast("کد ناشناخته: " + clean);
      setTimeout(openManualQR, 400);
    }
  }, 250);
}

/* ── Flash سبز ── */
function flashScanSuccess(){
  let f = document.querySelector(".scan-success-flash");
  if(!f){
    f = document.createElement("div");
    f.className = "scan-success-flash";
    document.body.appendChild(f);
  }
  f.classList.add("show");
  if(navigator.vibrate) navigator.vibrate([15, 30, 15]);
  setTimeout(() => f.classList.remove("show"), 350);
}

/* ── ورود دستی QR ── */
function openManualQR(){
  const overlay = document.getElementById("qrInputOverlay");
  if(!overlay) return;
  overlay.classList.add("show");
  setTimeout(() => {
    const inp = document.getElementById("qrManualInput");
    if(inp){ inp.value = ""; inp.focus(); }
  }, 100);
}
function closeQRInput(){
  const overlay = document.getElementById("qrInputOverlay");
  if(overlay) overlay.classList.remove("show");
}
function submitQRManual(){
  const inp = document.getElementById("qrManualInput");
  if(!inp) return;
  const v = inp.value.trim();
  if(!v){ toast("کدی وارد نشده"); return; }
  closeQRInput();
  handleQRResult(v);
}
})();