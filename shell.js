/* ═══════════════════════════════════════
   shell.js — ناوبری، toast، ref، افکت‌ها
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
  var _main = document.getElementById("main"); if(_main) _main.scrollTop = 0;
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
  if(id === "log") renderLog();
  if(id === "flow" && typeof renderFlowList === "function") renderFlowList();
  if(id === "pdfs"){
    if(typeof initPdfs === "function") initPdfs();
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
(function(){
  var mainEl = document.getElementById("main");
  if(!mainEl) return;
  mainEl.addEventListener("scroll", function(e){
    var top = e.target.scrollTop;
    var nav = document.querySelector(".page.on [data-nav]");
    if(!nav) return;
    nav.classList.toggle("scrolled", top > 24);
  });
})();

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
    navigator.serviceWorker.register("sw.js").then(function(reg){
      /* نسخه جدید SW را سریع فعال کن */
      if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
      reg.addEventListener("updatefound", function(){
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener("statechange", function(){
          if (nw.state === "installed" && navigator.serviceWorker.controller) {
            if (typeof toast === "function") toast("نسخه جدید آماده است — یک‌بار رفرش کن");
          }
        });
      });
    }).catch(function(){});
  });
}

/* ═══════════════════════════════════════
   SHEET CLOSE IMPROVEMENTS
   ═══════════════════════════════════════ */
(function(){
  var sheetBody = document.getElementById('sheetBody');
  var sheet = document.getElementById('sheet');

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
