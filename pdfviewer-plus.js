/* ═══════════════════════════════════════
   pdfviewer-plus.js — افزونه PDF Viewer v2
   با MutationObserver (روش قطعی)
   ═══════════════════════════════════════ */

console.log("✅ pdfviewer-plus.js STARTING");

const PVP_STORAGE_KEY = "elekta_pdf_bookmarks_v1";
const PVP_NIGHT_KEY = "elekta_pdf_night_v1";

let pvpBookmarks = {};
let pvpCurrentPdfId = null;
let pvpNightMode = false;
let pvpZoomLevel = 1.0;

try { pvpBookmarks = JSON.parse(localStorage.getItem(PVP_STORAGE_KEY) || "{}"); } catch(e){}
try { pvpNightMode = localStorage.getItem(PVP_NIGHT_KEY) === "1"; } catch(e){}

function pvpSave() {
  try { localStorage.setItem(PVP_STORAGE_KEY, JSON.stringify(pvpBookmarks)); } catch(e){}
}
function pvpSaveNight() {
  try { localStorage.setItem(PVP_NIGHT_KEY, pvpNightMode ? "1" : "0"); } catch(e){}
}
function pvpToast(msg) {
  if (typeof toast === "function") toast(msg);
  else if (typeof pdfToast === "function") pdfToast(msg);
}

function pvpGetBookmarks(pdfId) {
  if (!pvpBookmarks[pdfId]) pvpBookmarks[pdfId] = [];
  return pvpBookmarks[pdfId];
}
function pvpIsBookmarked(pdfId, page) {
  return pvpGetBookmarks(pdfId).some(function(b){ return b.page === page; });
}
function pvpToggleBookmark(pdfId, page) {
  var list = pvpGetBookmarks(pdfId);
  var idx = list.findIndex(function(b){ return b.page === page; });
  if (idx >= 0) { list.splice(idx, 1); pvpToast("★ حذف شد"); }
  else { list.push({ page: page, at: Date.now() }); list.sort(function(a,b){return a.page-b.page;}); pvpToast("★ صفحه " + page); }
  pvpSave();
  pvpUpdateBookmarkBtn();
  pvpUpdateBookmarkCount();
}

/* ═══ Toolbar ═══ */
function pvpInjectToolbar() {
  var sheet = document.getElementById("pdfViewerSheet");
  if (!sheet) return false;
  if (document.getElementById("pvpToolbar")) {
    console.log("pvp: toolbar already exists");
    return true;
  }

  console.log("pvp: injecting toolbar");

  var tb = document.createElement("div");
  tb.id = "pvpToolbar";
  tb.className = "pvp-toolbar";
  tb.innerHTML =
    '<button type="button" class="pvp-btn" id="pvpBookmarkBtn" title="Bookmark">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
      '<span class="pvp-badge" id="pvpBookmarkBadge" style="display:none">0</span>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpNightBtn" title="شب">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpZoomOut" title="−">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
    '</button>' +
    '<span class="pvp-zoom-label" id="pvpZoomLabel">100%</span>' +
    '<button type="button" class="pvp-btn" id="pvpZoomIn" title="+">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpPrintBtn" title="چاپ">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpShareBtn" title="اشتراک">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpBookmarksListBtn" title="لیست">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' +
    '</button>';

  /* محل درج: قبل از search bar یا page nav یا داخل body */
  var searchBar = document.getElementById("pdfSearchBar");
  var pageNav = document.getElementById("pdfPageNav");
  var body = sheet.querySelector(".pdf-viewer-body");

  if (searchBar && searchBar.parentNode === sheet) {
    sheet.insertBefore(tb, searchBar);
  } else if (pageNav && pageNav.parentNode === sheet) {
    sheet.insertBefore(tb, pageNav);
  } else if (body && body.parentNode === sheet) {
    sheet.insertBefore(tb, body);
  } else {
    /* آخرین تلاش: قبل از اول search/body، یا append */
    var target = searchBar || pageNav || body;
    if (target && target.parentNode) {
      target.parentNode.insertBefore(tb, target);
    } else {
      sheet.appendChild(tb);
    }
  }

  /* Bind */
  document.getElementById("pvpBookmarkBtn").addEventListener("click", function() {
    if (!pvpCurrentPdfId) return;
    var page = (typeof pdfCurrentPage !== "undefined") ? pdfCurrentPage : 1;
    pvpToggleBookmark(pvpCurrentPdfId, page);
  });
  document.getElementById("pvpNightBtn").addEventListener("click", pvpToggleNight);
  document.getElementById("pvpZoomIn").addEventListener("click", function(){ pvpSetZoom(pvpZoomLevel + 0.25); });
  document.getElementById("pvpZoomOut").addEventListener("click", function(){ pvpSetZoom(pvpZoomLevel - 0.25); });
  document.getElementById("pvpPrintBtn").addEventListener("click", pvpPrint);
  document.getElementById("pvpShareBtn").addEventListener("click", pvpShare);
  document.getElementById("pvpBookmarksListBtn").addEventListener("click", pvpToggleBookmarksList);

  pvpApplyNight();
  pvpUpdateBookmarkBtn();
  pvpUpdateBookmarkCount();
  console.log("pvp: toolbar injected ✓");
  return true;
}

function pvpUpdateBookmarkBtn() {
  var btn = document.getElementById("pvpBookmarkBtn");
  if (!btn || !pvpCurrentPdfId) return;
  var page = (typeof pdfCurrentPage !== "undefined") ? pdfCurrentPage : 1;
  btn.classList.toggle("on", pvpIsBookmarked(pvpCurrentPdfId, page));
}
function pvpUpdateBookmarkCount() {
  var badge = document.getElementById("pvpBookmarkBadge");
  if (!badge || !pvpCurrentPdfId) return;
  var count = pvpGetBookmarks(pvpCurrentPdfId).length;
  if (count > 0) { badge.textContent = count; badge.style.display = "grid"; }
  else { badge.style.display = "none"; }
}

function pvpToggleNight() {
  pvpNightMode = !pvpNightMode;
  pvpSaveNight();
  pvpApplyNight();
  pvpToast(pvpNightMode ? "🌙 حالت شب" : "☀️ حالت روز");
}
function pvpApplyNight() {
  var sheet = document.getElementById("pdfViewerSheet");
  if (!sheet) return;
  sheet.classList.toggle("pvp-night", pvpNightMode);
  var btn = document.getElementById("pvpNightBtn");
  if (btn) btn.classList.toggle("on", pvpNightMode);
}

function pvpSetZoom(level) {
  level = Math.max(0.5, Math.min(3.0, Math.round(level * 4) / 4));
  pvpZoomLevel = level;
  var lbl = document.getElementById("pvpZoomLabel");
  if (lbl) lbl.textContent = Math.round(level * 100) + "%";
  /* اعمال Zoom روی کل container با CSS zoom */
  var host = document.getElementById("pdfCanvasHost");
  if (host) {
    host.style.zoom = level;
  }
}

function pvpPrint() {
  var canvas = document.querySelector(".pdf-page-canvas");
  if (!canvas) { pvpToast("صفحه‌ای برای چاپ نیست"); return; }
  var dataUrl = canvas.toDataURL("image/png");
  var win = window.open("", "_blank");
  if (!win) { pvpToast("پنجره چاپ باز نشد"); return; }
  win.document.write('<html><head><title>Print</title><style>body{margin:0}img{width:100%}</style></head><body><img src="' + dataUrl + '" onload="window.print();window.close();"/></body></html>');
  win.document.close();
}

async function pvpShare() {
  if (!pvpCurrentPdfId) return;
  try {
    var rec = await pdfGet(pvpCurrentPdfId);
    if (!rec || !rec.blob) { pvpToast("PDF پیدا نشد"); return; }
    var file = new File([rec.blob], rec.name || "document.pdf", { type: "application/pdf" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: rec.title || rec.name, files: [file] });
    } else if (navigator.share) {
      await navigator.share({ title: rec.title || rec.name });
    } else {
      pvpToast("اشتراک‌گذاری پشتیبانی نمی‌شود");
    }
  } catch (e) {
    if (e && e.name === "AbortError") return;
    pvpToast("خطا در اشتراک");
  }
}

function pvpToggleBookmarksList() {
  var panel = document.getElementById("pvpBookmarksPanel");
  if (panel && panel.classList.contains("show")) { panel.classList.remove("show"); return; }
  pvpShowBookmarksList();
}
function pvpShowBookmarksList() {
  if (!pvpCurrentPdfId) return;
  var panel = document.getElementById("pvpBookmarksPanel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "pvpBookmarksPanel";
    panel.className = "pvp-bm-panel";
    document.body.appendChild(panel);
  }
  var list = pvpGetBookmarks(pvpCurrentPdfId);
  var html = '<div class="pvp-bm-header"><span>★ Bookmarkها (' + list.length + ')</span><button type="button" class="pvp-bm-close" onclick="document.getElementById(\'pvpBookmarksPanel\').classList.remove(\'show\')">✕</button></div>';
  if (!list.length) {
    html += '<div class="pvp-bm-empty">هنوز Bookmarkی نداری</div>';
  } else {
    html += '<div class="pvp-bm-list">' + list.map(function(b){
      return '<div class="pvp-bm-item" onclick="pvpJumpTo(' + b.page + ')"><div class="pvp-bm-page">صفحه ' + b.page + '</div><button type="button" class="pvp-bm-del" onclick="event.stopPropagation();pvpDeleteBookmark(' + b.page + ')">✕</button></div>';
    }).join("") + '</div>';
  }
  panel.innerHTML = html;
  panel.classList.add("show");
}
function pvpJumpTo(page) {
  if (typeof jumpPdfToPage === "function") jumpPdfToPage(page);
  else if (typeof renderPdfPage === "function") renderPdfPage(page);
  var panel = document.getElementById("pvpBookmarksPanel");
  if (panel) panel.classList.remove("show");
}
function pvpDeleteBookmark(page) {
  if (!pvpCurrentPdfId) return;
  var list = pvpGetBookmarks(pvpCurrentPdfId);
  var idx = list.findIndex(function(b){ return b.page === page; });
  if (idx >= 0) {
    list.splice(idx, 1);
    pvpSave();
    pvpShowBookmarksList();
    pvpUpdateBookmarkCount();
    pvpUpdateBookmarkBtn();
  }
}

/* ═══ MutationObserver — روش قطعی ═══ */
function pvpWatchSheet() {
  var sheet = document.getElementById("pdfViewerSheet");
  if (!sheet) {
    console.log("pvp: sheet not found yet, retrying...");
    setTimeout(pvpWatchSheet, 500);
    return;
  }
  console.log("pvp: watching sheet");

  var obs = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === "class") {
        var isOpen = sheet.classList.contains("show");
        if (isOpen) {
          setTimeout(pvpInjectToolbar, 100);
          /* تشخیص PDF جاری از داخل onclick یا title */
          var closeBtn = sheet.querySelector(".pdf-viewer-close, [onclick*='closePdfViewer']");
          /* jstry to get pdf id from dataset if available */
          setTimeout(pvpDetectCurrentPdf, 200);
        }
      }
    });
  });
  obs.observe(sheet, { attributes: true, attributeFilter: ["class"] });

  /* اگه الان بازه */
  if (sheet.classList.contains("show")) {
    setTimeout(pvpInjectToolbar, 100);
  }
}

/* تشخیص PDF جاری برای Bookmark */
function pvpDetectCurrentPdf() {
  var title = document.getElementById("pdfViewerTitle");
  if (!title) return;
  var titleText = title.textContent || "";
  /* جستجو در لیست PDFها */
  if (typeof localPdfs !== "undefined" && Array.isArray(localPdfs)) {
    var found = localPdfs.find(function(p) {
      return (p.title || p.name) === titleText;
    });
    if (found) {
      pvpCurrentPdfId = found.id;
      console.log("pvp: current pdf = " + pvpCurrentPdfId);
      pvpUpdateBookmarkBtn();
      pvpUpdateBookmarkCount();
    }
  }
}

/* Hack: رهگیری کلیک روی کارت‌های PDF برای ثبت ID */
document.addEventListener("click", function(e) {
  var cardBody = e.target.closest("[onclick*='openPdfViewer']");
  if (!cardBody) return;
  var onclick = cardBody.getAttribute("onclick") || "";
  var m = onclick.match(/openPdfViewer\('([^']+)'\)/);
  if (m) {
    pvpCurrentPdfId = m[1];
    pvpZoomLevel = 1.0;
    console.log("pvp: setting current pdf = " + pvpCurrentPdfId);
    setTimeout(function() {
      pvpInjectToolbar();
      var lbl = document.getElementById("pvpZoomLabel");
      if (lbl) lbl.textContent = "100%";
    }, 250);
  }
}, true);

/* ═══ Export ═══ */
window.pvpToggleBookmark = pvpToggleBookmark;
window.pvpJumpTo = pvpJumpTo;
window.pvpDeleteBookmark = pvpDeleteBookmark;
window.pvpToggleNight = pvpToggleNight;
window.pvpInjectToolbar = pvpInjectToolbar;

/* ═══ Init ═══ */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("pvp: DOM ready");
    setTimeout(pvpWatchSheet, 500);
  });
} else {
  setTimeout(pvpWatchSheet, 500);
}

console.log("✅ pdfviewer-plus.js loaded — waiting for sheet");
