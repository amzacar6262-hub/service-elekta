/* ═══════════════════════════════════════
   app.js — منطق و رندر
   داده‌ها از data.js / data2.js / data3.js
   QR در qr.js — Gallery در gallery.js — PM در pm.js
   ترجمه در i18n.js
   ═══════════════════════════════════════ */

/* ═══ ICONS ═══ */
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

/* ═══ Helpers ═══ */
const fa = n => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
const $ = s => document.querySelector(s);
function i18n(key, fallback){
  if(typeof t === "function"){ return t(key); }
  return fallback || key;
}

/* ═══ State ═══ */
let libFilter = "all", libQ = "", codeFilter = "all", codeQ = "", refQ = "";
let favs = new Set(JSON.parse(localStorage.getItem("favs") || "[]"));
let curSheetManual = null;

/* ═══════════════════════════════════════
   RENDER FUNCTIONS
   ═══════════════════════════════════════ */
function renderStats(){
  var stM = $("#stM"), stE = $("#stE"), stF = $("#stF");
  var abM = $("#abM"), abE = $("#abE");
  if(stM) stM.textContent = fa(MANUALS.length);
  if(stE) stE.textContent = fa(ERRORS.length);
  if(stF) stF.textContent = fa(favs.size);
  if(abM) abM.textContent = fa(MANUALS.length) + i18n("item_suffix", " مورد");
  if(abE) abE.textContent = fa(ERRORS.length) + i18n("item_suffix", " مورد");
}

function renderCats(){
  var el = $("#catGrid");
  if(!el) return;
  el.innerHTML = CATS.map(function(c, i){
    var name = i18n("cat_" + c.id, c.name);
    return '<button class="cat" style="background:linear-gradient(145deg,' + c.c1 + ' 0%,' + c.c2 + ' 100%);animation-delay:' + (i*.04) + 's" onclick="goCat(\'' + c.id + '\')">'
      + '<div class="cat-ic">' + ICONS[c.icon] + '</div>'
      + '<div class="cat-n">' + name + '</div>'
      + '</button>';
  }).join("");
}

function renderToolGrid(){
  var tools = [
    { id:"ref",     name:i18n("tool_ref",     "جداول مرجع"),   c1:"#FF3B30", c2:"#AF52DE", icon:"target", action:"go('ref')" },
    { id:"pm",      name:i18n("tool_pm",      "PM چک‌لیست"),   c1:"#32D74B", c2:"#248A3D", icon:"check",  action:"go('pm')" },
    { id:"gallery", name:i18n("tool_gallery", "گالری تصاویر"), c1:"#FF375F", c2:"#AF52DE", icon:"cam",    action:"go('gallery')" },
    { id:"qr",      name:i18n("tool_qr",      "اسکن QR"),      c1:"#5AC8FA", c2:"#0A84FF", icon:"grid",   action:"startScan()" }
  ];

  var html = tools.map(function(tt, i){
    return '<button class="cat cat-mini" ' +
      'style="background:linear-gradient(145deg,' + tt.c1 + ' 0%,' + tt.c2 + ' 100%);animation-delay:' + (i*.04) + 's" ' +
      'onclick="' + tt.action + '">' +
      '<div class="cat-ic">' + ICONS[tt.icon] + '</div>' +
      '<div class="cat-n">' + tt.name + '</div>' +
    '</button>';
  }).join("");

  var elHome = document.getElementById("homeToolGrid");
  if(elHome) elHome.innerHTML = html;
  var elMore = document.getElementById("toolGrid");
  if(elMore) elMore.innerHTML = html;
}

function renderHomePop(){
  var el = document.getElementById("homePop");
  if(!el) return;
  var ids = ["s1", "i1", "m5", "m7"];
  var list = ids
    .map(function(id){ return MANUALS.find(function(m){ return m.id === id; }); })
    .filter(Boolean);

  el.innerHTML = list.map(function(m, i){
    var cat = CATS.find(function(c){ return c.id === m.cat; }) || CATS[0];
    return '<button class="cat cat-mini" ' +
      'style="background:linear-gradient(145deg,' + cat.c1 + ' 0%,' + cat.c2 + ' 100%);animation-delay:' + (i*.04) + 's" ' +
      'onclick="openManual(\'' + m.id + '\')">' +
      '<span class="cat-badge-top">' + m.code + '</span>' +
      '<div class="cat-ic">' + ICONS[cat.icon] + '</div>' +
      '<div class="cat-n">' + m.title + '</div>' +
    '</button>';
  }).join("");
}

function manualCard(m, compact, delay){
  if(delay === undefined) delay = 0;
  var cat = CATS.find(function(c){ return c.id === m.cat; }) || CATS[0];
  var isFav = favs.has(m.id);
  var grad = "linear-gradient(145deg," + cat.c1 + " 0%," + cat.c2 + " 100%)";
  return '<div class="manual" style="animation-delay:' + delay + 's" onclick="openManual(\'' + m.id + '\')">'
    + '<div class="manual-ic" style="background:' + grad + '">' + ICONS[cat.icon] + '</div>'
    + '<div class="manual-body">'
    + '<div class="manual-title">' + m.title + '</div>'
    + (compact ? '' : '<div class="manual-sub">' + m.summary + '</div>')
    + '<div class="manual-meta">'
    + '<span class="badge">' + m.code + '</span>'
    + '<span>' + m.duration + '</span>'
    + '<span>' + m.level + '</span>'
    + '</div></div>'
    + '<button class="manual-fav ' + (isFav ? 'on' : '') + '" onclick="event.stopPropagation();toggleFav(\'' + m.id + '\')">'
    + (isFav ? ICONS.starFill : ICONS.star)
    + '</button></div>';
}

function renderLibChips(){
  var el = $("#libChips");
  if(!el) return;
  var all = [{ id:"all", name:i18n("chip_all", "همه") }].concat(CATS.map(function(c){
    return { id:c.id, name: i18n("cat_" + c.id, c.name) };
  }));
  el.innerHTML = all.map(function(c){
    return '<button class="chip ' + (libFilter === c.id ? 'on' : '') + '" onclick="libFilter=\'' + c.id + '\';renderLibChips();renderLib()">' + c.name + '</button>';
  }).join("");
}

function renderLib(){
  var list = MANUALS.filter(function(m){ return libFilter === "all" || m.cat === libFilter; });
  if(libQ.trim()){
    var q = libQ.toLowerCase();
    list = list.filter(function(m){
      return (m.title + m.summary + m.code + m.machines.join(" ")).toLowerCase().indexOf(q) !== -1;
    });
  }
  var el = $("#libList");
  if(!el) return;
  if(!list.length){ el.innerHTML = emptyState(i18n("ref_empty", "منوالی یافت نشد"), i18n("ref_empty_sub", "فیلتر را تغییر دهید")); return; }
  el.innerHTML = list.map(function(m, i){ return manualCard(m, false, i*.04); }).join("");
}

function renderCodeChips(){
  var el = $("#codeChips");
  if(!el) return;
  var sevs = [
    { id:"all",    n:i18n("sev_all", "همه") },
    { id:"red",    n:i18n("sev_red", "بحرانی") },
    { id:"orange", n:i18n("sev_orange", "هشدار") },
    { id:"blue",   n:i18n("sev_blue", "اطلاع") }
  ];
  el.innerHTML = sevs.map(function(s){
    return '<button class="chip ' + (codeFilter === s.id ? 'on' : '') + '" onclick="codeFilter=\'' + s.id + '\';renderCodeChips();renderCodes()">' + s.n + '</button>';
  }).join("");
}

function renderCodes(){
  var list = ERRORS.filter(function(c){ return codeFilter === "all" || c.sev === codeFilter; });
  if(codeQ.trim()){
    var q = codeQ.toLowerCase();
    list = list.filter(function(c){
      return (c.code + c.title + c.act + c.machine).toLowerCase().indexOf(q) !== -1;
    });
  }
  var el = $("#codeList");
  if(!el) return;
  if(!list.length){ el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--label2)">' + i18n("ref_empty", "کدی یافت نشد") + '</div>'; return; }
  var actPrefix = i18n("act_prefix", "اقدام: ");
  el.innerHTML = list.map(function(c, i){
    return '<div class="ecode" style="animation-delay:' + (i*.02) + 's">'
      + '<div class="ecode-code ' + c.sev + '">' + c.code + '</div>'
      + '<div class="ecode-body">'
      + '<div class="ecode-t">' + c.title + '</div>'
      + '<div class="ecode-s">' + c.machine + '</div>'
      + '<div class="ecode-s" style="color:var(--blue);margin-top:4px">' + actPrefix + c.act + '</div>'
      + '</div></div>';
  }).join("");
}

function renderFavs(){
  var list = MANUALS.filter(function(m){ return favs.has(m.id); });
  var el = $("#favList");
  if(!el) return;
  if(!list.length){
    el.innerHTML = emptyState(i18n("fav_empty", "هنوز چیزی ذخیره نکردی"), i18n("fav_empty_s", "روی ستاره بزن تا اینجا بیاد"));
    return;
  }
  el.innerHTML = list.map(function(m){ return manualCard(m, false, 0); }).join("");
}

function renderMachineList(){
  var el = $("#machineList");
  if(!el) return;
  var word = i18n("manuals_word", "منوال");
  el.innerHTML = MACHINES.map(function(m, i){
    var cnt = MANUALS.filter(function(x){ return x.machines.indexOf(m) !== -1; }).length;
    var colors = ["var(--blue)","var(--green)","var(--orange)","var(--purple)","var(--pink)","var(--teal)","var(--indigo)"];
    return '<button class="row" onclick="filterMachine(\'' + m + '\')">'
      + '<div class="row-icon" style="background:' + colors[i % 7] + '">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="6" rx="2"/><path d="M8 9v4a4 4 0 0 0 8 0V9"/><circle cx="12" cy="17" r="3"/></svg>'
      + '</div>'
      + '<div class="row-body"><div class="row-title">' + m + '</div><div class="row-sub">' + fa(cnt) + ' ' + word + '</div></div>'
      + '<div class="row-chev">' + ICONS.chev + '</div>'
      + '</button>';
  }).join("");
}

function emptyState(title, sub){
  return '<div class="empty">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
    + '</svg>'
    + '<div class="empty-t">' + title + '</div>'
    + '<div>' + sub + '</div>'
    + '</div>';
}

/* ═══════════════════════════════════════
   MANUAL SHEET
   ═══════════════════════════════════════ */
function openManual(id){
  var m = MANUALS.find(function(x){ return x.id === id; });
  if(!m) return;
  curSheetManual = m;
  var cat = CATS.find(function(c){ return c.id === m.cat; }) || CATS[0];
  var isFav = favs.has(m.id);
  var fb = $("#sheetFav");
  if(!fb) return;
  fb.innerHTML = isFav ? ICONS.starFill : ICONS.star;
  fb.style.color = isFav ? "var(--yellow)" : "var(--blue)";
  fb.style.opacity = 1;
  fb.onclick = function(){ toggleFav(m.id); openManual(m.id); };

  var titleEl = $("#sheetTitle");
  if(titleEl) titleEl.textContent = m.code;

  var grad = "linear-gradient(145deg," + cat.c1 + " 0%," + cat.c2 + " 100%)";
  var body = $("#sheetBody");
  if(!body) return;

  body.innerHTML =
    '<div class="detail-hero" style="background:' + grad + '">'
    + '<div class="detail-cat">' + i18n("cat_" + cat.id, cat.name) + '</div>'
    + '<div class="detail-title">' + m.title + '</div>'
    + '<div class="detail-sum">' + m.summary + '</div>'
    + '<div class="detail-meta">'
    + '<div class="detail-meta-item">' + ICONS.clock + '<span>' + m.duration + '</span></div>'
    + '<div class="detail-meta-item">' + ICONS.target + '<span>' + m.level + '</span></div>'
    + '</div></div>'
    + (m.warn ? '<div class="alert-box">' + ICONS.warn + '<div class="txt"><div class="t">' + i18n("sheet_warning", "هشدار ایمنی") + '</div>' + m.warn + '</div></div>' : "")
    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">' + i18n("sheet_devices", "دستگاه‌های مرتبط") + '</div></div>'
    + '<div class="tags" style="margin-bottom:16px">' + m.machines.map(function(x){ return '<span class="tag">' + x + '</span>'; }).join("") + '</div>'
    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">' + i18n("sheet_tools", "ابزار مورد نیاز") + '</div></div>'
    + '<div class="tags" style="margin-bottom:20px">' + m.tools.map(function(x){ return '<span class="tag">' + x + '</span>'; }).join("") + '</div>'
    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">' + i18n("sheet_steps", "مراحل") + ' (' + fa(m.steps.length) + ')</div></div>'
    + '<div style="background:var(--card);border-radius:14px;padding:4px 16px;margin-bottom:16px">'
    + m.steps.map(function(s, i){
      return '<div class="step ' + (s.level || '') + '">'
        + '<div class="step-n">' + fa(i + 1) + '</div>'
        + '<div class="step-body"><div class="step-t">' + s.t + '</div>' + (s.note ? '<div class="step-note">' + s.note + '</div>' : '') + '</div>'
        + '</div>';
    }).join("")
    + '</div>';

  $("#backdrop").classList.add("show");
  $("#sheet").classList.add("show");
}

function closeSheet(){
  $("#backdrop").classList.remove("show");
  $("#sheet").classList.remove("show");
}

function toggleFav(id){
  if(favs.has(id)){ favs.delete(id); toast(i18n("t_removed", "حذف شد")); }
  else { favs.add(id); toast(i18n("t_saved", "ذخیره شد ★")); }
  localStorage.setItem("favs", JSON.stringify([...favs]));
  renderStats(); renderHomePop(); renderLib(); renderFavs();
  if(curSheetManual){
    var fb = $("#sheetFav");
    if(fb){
      var isFav = favs.has(curSheetManual.id);
      fb.innerHTML = isFav ? ICONS.starFill : ICONS.star;
      fb.style.color = isFav ? "var(--yellow)" : "var(--blue)";
    }
  }
}

function filterMachine(m){
  libFilter = "all"; libQ = m;
  renderLibChips(); renderLib();
  go("lib");
}

function goCat(id){
  libFilter = id;
  renderLibChips();
  renderLib();
  go("lib");
}

/* ═══════════════════════════════════════
   TABS
   ═══════════════════════════════════════ */
function renderTabbar(){
  var current = document.querySelector(".page.on");
  var cur = current ? current.id.replace("page-", "") : "home";
  var tabs = [
    { id:"home",    label:i18n("tab_home",    "خانه"),     icon:ICONS.home },
    { id:"lib",     label:i18n("tab_lib",     "کتابخانه"), icon:ICONS.book },
    { id:"gallery", label:i18n("tab_gallery", "گالری"),    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>' },
    { id:"codes",   label:i18n("tab_codes",   "کد خطا"),   icon:ICONS.warn },
    { id:"fav",     label:i18n("tab_fav",     "ذخیره"),    icon:ICONS.star }
  ];
  var bar = document.getElementById("tabbar");
  if(!bar) return;
  bar.innerHTML = tabs.map(function(t){
    return '<button class="tab ' + (t.id === cur ? 'active' : '') + '" onclick="go(\'' + t.id + '\')">' +
      t.icon + '<span>' + t.label + '</span>' +
    '</button>';
  }).join("");
}

function go(id){
  document.querySelectorAll(".page").forEach(function(p){ p.classList.remove("on"); });
  var target = document.getElementById("page-" + id);
  if(target) target.classList.add("on");
  document.getElementById("main").scrollTop = 0;
  document.querySelectorAll("[data-nav]").forEach(function(n){ n.classList.remove("scrolled"); });
  renderTabbar();
  if(id === "fav") renderFavs();
  if(id === "lib") renderLib();
  if(id === "codes") renderCodes();
  if(id === "ref" && typeof renderRef === "function") renderRef();
  if(id === "pm" && typeof renderPMFreqChips === "function"){
    renderPMFreqChips();
    renderPMMachineChips();
    renderPMProgress();
    renderPMList();
  }
  if(id === "gallery"){
    if(typeof loadLocalPhotos === "function"){
      loadLocalPhotos().then(function(){
        if(typeof renderGalleryChips === "function") renderGalleryChips();
        if(typeof renderGallery === "function") renderGallery();
      });
    } else {
      if(typeof renderGalleryChips === "function") renderGalleryChips();
      if(typeof renderGallery === "function") renderGallery();
    }
  }
}

/* ═══════════════════════════════════════
   TOAST
   ═══════════════════════════════════════ */
function toast(msg){
  var t = $("#toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(function(){ t.classList.remove("show"); }, 1800);
}

/* ═══════════════════════════════════════
   REFERENCE TABLES
   ═══════════════════════════════════════ */
function renderRef(){
  var el = document.getElementById("refList");
  if(!el) return;
  var tables = window.REF_TABLES || [];
  if(!tables.length){
    el.innerHTML = '<div class="empty"><div class="empty-t">' + i18n("ref_empty", "جداولی نیست") + '</div></div>';
    return;
  }
  var q = (refQ || "").trim().toLowerCase();
  var filtered = tables;

  if(q){
    filtered = tables.map(function(tt){
      var rows = tt.rows.filter(function(r){
        return (r.k + " " + r.v + " " + (r.cat || "")).toLowerCase().indexOf(q) !== -1;
      });
      if(rows.length || tt.title.toLowerCase().indexOf(q) !== -1){
        return Object.assign({}, tt, { rows: rows.length ? rows : tt.rows });
      }
      return null;
    }).filter(Boolean);
  }

  if(!filtered.length){
    el.innerHTML = emptyState(i18n("ref_empty", "چیزی پیدا نشد"), i18n("ref_empty_sub", "عبارت دیگری را امتحان کنید"));
    return;
  }

  el.innerHTML = filtered.map(function(tt, i){
    var grad = "linear-gradient(145deg," + tt.color[0] + "," + tt.color[1] + ")";
    var rowsHTML = tt.rows.map(function(r){
      return '<div class="ref-row">' +
        '<div class="ref-k">' +
          (r.cat ? '<span class="ref-cat">' + r.cat + '</span>' : '') +
          r.k +
        '</div>' +
        '<div class="ref-v">' + r.v + '</div>' +
      '</div>';
    }).join("");

    return '<div class="ref-card" data-ref-id="' + tt.id + '" style="animation-delay:' + (i*.06) + 's">' +
      '<div class="ref-head" onclick="toggleRef(\'' + tt.id + '\')">' +
        '<div class="ref-icon" style="background:' + grad + '">' + ICONS[tt.icon] + '</div>' +
        '<div class="ref-head-info">' +
          '<div class="ref-title">' + tt.title + '</div>' +
          '<div class="ref-desc">' + tt.desc + '</div>' +
        '</div>' +
        '<div class="ref-count">' + fa(tt.rows.length) + '</div>' +
        '<div class="ref-chev">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</div>' +
      '</div>' +
      '<div class="ref-body">' +
        (tt.warn ? '<div class="ref-warn">' + ICONS.warn + '<div>' + tt.warn + '</div></div>' : '') +
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

/* ═══════════════════════════════════════
   ONLINE STATUS
   ═══════════════════════════════════════ */
function updateOnline(){
  var el = $("#onlineStatus");
  if(!el) return;
  if(navigator.onLine){
    el.textContent = i18n("status_online", "آنلاین ✓");
    el.style.color = "var(--green)";
  } else {
    el.textContent = i18n("status_offline", "آفلاین — کش");
    el.style.color = "var(--blue)";
  }
}
window.addEventListener("online", updateOnline);
window.addEventListener("offline", updateOnline);

/* ═══════════════════════════════════════
   LANGUAGE SWITCH UI
   ═══════════════════════════════════════ */
function updateLangSwitch(){
  var seg = document.getElementById("langSeg");
  if(!seg) return;
  var currentLang = (typeof getLang === "function") ? getLang() : "fa";
  seg.querySelectorAll("button").forEach(function(b){
    b.classList.toggle("on", b.getAttribute("data-lang") === currentLang);
  });
}

/* ═══════════════════════════════════════
   SCROLL — Nav Compact
   ═══════════════════════════════════════ */
document.getElementById("main").addEventListener("scroll", function(e){
  var top = e.target.scrollTop;
  var nav = document.querySelector(".page.on [data-nav]");
  if(!nav) return;
  nav.classList.toggle("scrolled", top > 24);
});

/* ═══════════════════════════════════════
   TAB RIPPLE
   ═══════════════════════════════════════ */
document.addEventListener("click", function(e){
  var tab = e.target.closest(".tab");
  if(!tab) return;
  var rect = tab.getBoundingClientRect();
  var ripple = document.createElement("span");
  ripple.className = "ripple";
  var size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
  ripple.style.top  = (e.clientY - rect.top  - size / 2) + "px";
  tab.appendChild(ripple);
  setTimeout(function(){ ripple.remove(); }, 600);
  if(navigator.vibrate) navigator.vibrate(8);
}, { passive: true });

/* ═══════════════════════════════════════
   GLOW EFFECT ON CATEGORY CARDS
   ═══════════════════════════════════════ */
document.addEventListener("touchstart", function(e){
  var card = e.target.closest(".cat");
  if(!card) return;
  var rect = card.getBoundingClientRect();
  var touch = e.touches[0];
  card.style.setProperty('--x', ((touch.clientX - rect.left) / rect.width * 100) + '%');
  card.style.setProperty('--y', ((touch.clientY - rect.top) / rect.height * 100) + '%');
}, { passive: true });

/* ═══════════════════════════════════════
   SERVICE WORKER
   ═══════════════════════════════════════ */
if("serviceWorker" in navigator){
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("sw.js").catch(function(){});
  });
}

/* ═══════════════════════════════════════
   SHEET CLOSE IMPROVEMENTS
   ═══════════════════════════════════════ */
(function(){
  var sheetBody = document.getElementById('sheetBody');
  var sheet = document.getElementById('sheet');

  /* دکمه بستن در پایین */
  if(sheetBody){
    var obs = new MutationObserver(function(){
      if(sheetBody.children.length > 0 &&
         !sheetBody.querySelector('.sheet-close-bottom')){
        var btn = document.createElement('button');
        btn.className = 'sheet-close-bottom';
        btn.textContent = i18n("sheet_close", "بستن");
        btn.onclick = function(){ closeSheet(); };
        sheetBody.appendChild(btn);
      }
    });
    obs.observe(sheetBody, { childList: true });
  }

  /* Swipe-down روی دستگیره */
  var grab = sheet ? sheet.querySelector('.sheet-grab') : null;
  if(sheet && grab){
    var startY = 0, startT = 0, drag = false, dy = 0;

    var onStart = function(e){
      drag = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      startT = Date.now();
      dy = 0;
      sheet.style.transition = 'none';
    };
    var onMove = function(e){
      if(!drag) return;
      var y = e.touches ? e.touches[0].clientY : e.clientY;
      dy = Math.max(0, y - startY);
      if(dy > 0) sheet.style.transform = 'translateY(' + dy + 'px)';
    };
    var onEnd = function(){
      if(!drag) return;
      drag = false;
      sheet.style.transition = '';
      var v = dy / Math.max(Date.now() - startT, 1);
      if(dy > 100 || v > 0.4){
        sheet.style.transform = '';
        closeSheet();
      } else {
        sheet.style.transform = 'translateY(0)';
      }
    };

    grab.addEventListener('touchstart', onStart, { passive: true });
    grab.addEventListener('touchmove', onMove, { passive: true });
    grab.addEventListener('touchend', onEnd);
    grab.addEventListener('touchcancel', onEnd);
  }
})();

/* ═══════════════════════════════════════
   EXPORT globals (برای onclick در HTML)
   ═══════════════════════════════════════ */
window.openManual = openManual;
window.closeSheet = closeSheet;
window.toggleFav = toggleFav;
window.filterMachine = filterMachine;
window.goCat = goCat;
window.go = go;
window.toast = toast;
window.toggleRef = toggleRef;
window.renderRef = renderRef;
window.updateLangSwitch = updateLangSwitch;

/* ═══════════════════════════════════════
   INIT
   ═══════════════════════════════════════ */
renderTabbar();
renderStats();
renderCats();
renderToolGrid();
renderHomePop();
renderLibChips();
renderLib();
renderCodeChips();
renderCodes();
renderFavs();
renderMachineList();
if(typeof renderGalleryChips === "function") renderGalleryChips();
if(typeof renderGallery === "function") renderGallery();
if(typeof renderPMFreqChips === "function") renderPMFreqChips();
if(typeof renderPMMachineChips === "function") renderPMMachineChips();
if(typeof renderPMProgress === "function") renderPMProgress();
if(typeof renderPMList === "function") renderPMList();
if(typeof applyStaticTranslations === "function") applyStaticTranslations();
updateLangSwitch();
updateOnline();