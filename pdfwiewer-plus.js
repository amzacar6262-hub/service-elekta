/* ═══════════════════════════════════════
   pdfviewer-plus.js — افزونه PDF Viewer
   Bookmark + Night + Zoom + Share + Print
   ═══════════════════════════════════════ */

const PVP_STORAGE_KEY = "elekta_pdf_bookmarks_v1";
const PVP_NIGHT_KEY = "elekta_pdf_night_v1";

let pvpBookmarks = {};
let pvpCurrentPdfId = null;
let pvpNightMode = false;
let pvpZoomLevel = 1.0;
let pvpOriginalGetPage = null;

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

/* ═══ کتابخانه Bookmark ═══ */
function pvpGetBookmarks(pdfId) {
  if (!pvpBookmarks[pdfId]) pvpBookmarks[pdfId] = [];
  return pvpBookmarks[pdfId];
}
function pvpIsBookmarked(pdfId, page) {
  return pvpGetBookmarks(pdfId).some(function(b){ return b.page === page; });
}
function pvpToggleBookmark(pdfId, page, note) {
  var list = pvpGetBookmarks(pdfId);
  var idx = list.findIndex(function(b){ return b.page === page; });
  if (idx >= 0) {
    list.splice(idx, 1);
    pvpToast("★ حذف شد");
  } else {
    list.push({ page: page, note: note || "", at: Date.now() });
    list.sort(function(a,b){ return a.page - b.page; });
    pvpToast("★ ذخیره شد — صفحه " + page);
  }
  pvpSave();
  pvpUpdateBookmarkBtn();
  pvpUpdateBookmarkCount();
  return idx < 0;
}

/* ═══ UI — Toolbar ═══ */
function pvpEnsureToolbar() {
  var sheet = document.getElementById("pdfViewerSheet");
  if (!sheet) return null;
  var tb = document.getElementById("pvpToolbar");
  if (tb) return tb;

  tb = document.createElement("div");
  tb.id = "pvpToolbar";
  tb.className = "pvp-toolbar";
  tb.innerHTML =
    '<button type="button" class="pvp-btn" id="pvpBookmarkBtn" title="Bookmark">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>' +
      '</svg>' +
      '<span class="pvp-badge" id="pvpBookmarkBadge" style="display:none">0</span>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpNightBtn" title="حالت شب">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
      '</svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpZoomOut" title="کوچک">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
        '<line x1="5" y1="12" x2="19" y2="12"/>' +
      '</svg>' +
    '</button>' +
    '<span class="pvp-zoom-label" id="pvpZoomLabel">100%</span>' +
    '<button type="button" class="pvp-btn" id="pvpZoomIn" title="بزرگ">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
        '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' +
      '</svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpPrintBtn" title="چاپ">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<polyline points="6 9 6 2 18 2 18 9"/>' +
        '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>' +
        '<rect x="6" y="14" width="12" height="8"/>' +
      '</svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpShareBtn" title="اشتراک">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>' +
        '<polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>' +
      '</svg>' +
    '</button>' +
    '<button type="button" class="pvp-btn" id="pvpBookmarksListBtn" title="لیست">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
        '<line x1="8" y1="6" x2="21" y2="6"/>' +
        '<line x1="8" y1="12" x2="21" y2="12"/>' +
        '<line x1="8" y1="18" x2="21" y2="18"/>' +
        '<line x1="3" y1="6" x2="3.01" y2="6"/>' +
        '<line x1="3" y1="12" x2="3.01" y2="12"/>' +
        '<line x1="3" y1="18" x2="3.01" y2="18"/>' +
      '</svg>' +
    '</button>';

  var searchBar = document.getElementById("pdfSearchBar");
  var pageNav = document.getElementById("pdfPageNav");
  var body = sheet.querySelector(".pdf-viewer-body");

  if (searchBar && searchBar.parentNode) {
    searchBar.parentNode.insertBefore(tb, searchBar);
  } else if (pageNav && pageNav.parentNode) {
    pageNav.parentNode.insertBefore(tb, pageNav);
  } else if (body) {
    sheet.insertBefore(tb, body);
  } else {
    sheet.appendChild(tb);
  }

  /* Bind events */
  tb.querySelector("#pvpBookmarkBtn").addEventListener("click", pvpOnBookmarkClick);
  tb.querySelector("#pvpNightBtn").addEventListener("click", pvpToggleNight);
  tb.querySelector("#pvpZoomIn").addEventListener("click", function(){ pvpSetZoom(pvpZoomLevel + 0.25); });
  tb.querySelector("#pvpZoomOut").addEventListener("click", function(){ pvpSetZoom(pvpZoomLevel - 0.25); });
  tb.querySelector("#pvpPrintBtn").addEventListener("click", pvpPrint);
  tb.querySelector("#pvpShareBtn").addEventListener("click", pvpShare);
  tb.querySelector("#pvpBookmarksListBtn").addEventListener("click", pvpToggleBookmarksList);

  return tb;
}

/* ═══ Bookmark Click ═══ */
function pvpOnBookmarkClick() {
  if (!pvpCurrentPdfId) return;
  var page = (typeof pdfCurrentPage !== "undefined") ? pdfCurrentPage : 1;
  pvpToggleBookmark(pvpCurrentPdfId, page);
}

function pvpUpdateBookmarkBtn() {
  var btn = document.getElementById("pvpBookmarkBtn");
  if (!btn || !pvpCurrentPdfId) return;
  var page = (typeof pdfCurrentPage !== "undefined") ? pdfCurrentPage : 1;
  var isOn = pvpIsBookmarked(pvpCurrentPdfId, page);
  btn.classList.toggle("on", isOn);
}

function pvpUpdateBookmarkCount() {
  var badge = document.getElementById("pvpBookmarkBadge");
  if (!badge || !pvpCurrentPdfId) return;
  var count = pvpGetBookmarks(pvpCurrentPdfId).length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = "grid";
  } else {
    badge.style.display = "none";
  }
}

/* ═══ Night Mode ═══ */
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

/* ═══ Zoom ═══ */
function pvpSetZoom(level) {
  level = Math.max(0.5, Math.min(3.0, Math.round(level * 4) / 4));
  pvpZoomLevel = level;
  var lbl = document.getElementById("pvpZoomLabel");
  if (lbl) lbl.textContent = Math.round(level * 100) + "%";
  pvpApplyZoom();
}
function pvpApplyZoom() {
  var canvas = document.querySelector(".pdf-page-canvas");
  if (!canvas) return;
  var baseW = parseFloat(canvas.dataset.baseWidth || canvas.style.width) || canvas.clientWidth;
  if (!canvas.dataset.baseWidth) canvas.dataset.baseWidth = baseW;
  var newW = baseW * pvpZoomLevel;
  canvas.style.width = newW + "px";
  canvas.style.maxWidth = "none";
}

/* ═══ Print ═══ */
function pvpPrint() {
  var canvas = document.querySelector(".pdf-page-canvas");
  if (!canvas) {
    pvpToast("صفحه‌ای برای چاپ نیست");
    return;
  }
  var dataUrl = canvas.toDataURL("image/png");
  var win = window.open("", "_blank");
  if (!win) { pvpToast("پنجره چاپ باز نشد"); return; }
  win.document.write(
    '<html><head><title>Print PDF Page</title>' +
    '<style>body{margin:0;padding:0}img{width:100%;height:auto}</style>' +
    '</head><body><img src="' + dataUrl + '" onload="window.print();window.close();"/>' +
    '</body></html>'
  );
  win.document.close();
}

/* ═══ Share ═══ */
async function pvpShare() {
  if (!pvpCurrentPdfId) return;
  try {
    var rec = await pdfGet(pvpCurrentPdfId);
    if (!rec || !rec.blob) { pvpToast("PDF پیدا نشد"); return; }
    var file = new File([rec.blob], rec.name || "document.pdf", { type: "application/pdf" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: rec.title || rec.name,
        files: [file]
      });
    } else if (navigator.share) {
      await navigator.share({
        title: rec.title || rec.name,
        text: "PDF از Elekta Service"
      });
    } else {
      pvpToast("اشتراک‌گذاری پشتیبانی نمی‌شود");
    }
  } catch (e) {
    if (e && e.name === "AbortError") return;
    console.warn(e);
    pvpToast("خطا در اشتراک‌گذاری");
  }
}

/* ═══ Bookmarks List ═══ */
function pvpToggleBookmarksList() {
  var panel = document.getElementById("pvpBookmarksPanel");
  if (panel && panel.classList.contains("show")) {
    panel.classList.remove("show");
    return;
  }
  pvpShowBookmarksList();
}

function pvpShowBookmarksList() {
  if (!pvpCurrentPdfId) return;
  var panel = document.getElementById("pvpBookmarksPanel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "pvpBookmarksPanel";
    panel.className = "pvp-bm-panel";
    var sheet = document.getElementById("pdfViewerSheet");
    if (sheet) sheet.appendChild(panel);
  }
  var list = pvpGetBookmarks(pvpCurrentPdfId);
  var html = '<div class="pvp-bm-header">' +
    '<span>Bookmarkها (' + list.length + ')</span>' +
    '<button type="button" class="pvp-bm-close" onclick="document.getElementById(\'pvpBookmarksPanel\').classList.remove(\'show\')">✕</button>' +
    '</div>';
  if (!list.length) {
    html += '<div class="pvp-bm-empty">هنوز Bookmarkی نداری</div>';
  } else {
    html += '<div class="pvp-bm-list">' + list.map(function(b){
      return '<div class="pvp-bm-item" onclick="pvpJumpTo(' + b.page + ')">' +
        '<div class="pvp-bm-page">صفحه ' + b.page + '</div>' +
        (b.note ? '<div class="pvp-bm-note">' + b.note + '</div>' : '') +
        '<button type="button" class="pvp-bm-del" onclick="event.stopPropagation();pvpDeleteBookmark(' + b.page + ')">✕</button>' +
        '</div>';
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

/* ═══ Hook into openPdfViewer ═══ */
function pvpHookOpen() {
  if (typeof window.openPdfViewer !== "function") {
    setTimeout(pvpHookOpen, 300);
    return;
  }
  if (window.openPdfViewer.__pvp_hooked) return;

  var original = window.openPdfViewer;
  window.openPdfViewer = async function(id) {
    pvpCurrentPdfId = id;
    pvpZoomLevel = 1.0;
    await original.apply(this, arguments);
    setTimeout(function() {
      pvpEnsureToolbar();
      pvpApplyNight();
      pvpUpdateBookmarkBtn();
      pvpUpdateBookmarkCount();
      var lbl = document.getElementById("pvpZoomLabel");
      if (lbl) lbl.textContent = "100%";
    }, 200);
  };
  window.openPdfViewer.__pvp_hooked = true;
  console.log("✅ pvp: openPdfViewer hooked");
}

/* Hook after page render to update bookmark state */
function pvpHookRenderPage() {
  if (typeof window.renderPdfPage !== "function") {
    setTimeout(pvpHookRenderPage, 300);
    return;
  }
  if (window.renderPdfPage.__pvp_hooked) return;

  var original = window.renderPdfPage;
  window.renderPdfPage = async function(num) {
    var result = await original.apply(this, arguments);
    setTimeout(function() {
      pvpUpdateBookmarkBtn();
      var canvas = document.querySelector(".pdf-page-canvas");
      if (canvas) canvas.dataset.baseWidth = canvas.style.width;
    }, 50);
    return result;
  };
  window.renderPdfPage.__pvp_hooked = true;
  console.log("✅ pvp: renderPdfPage hooked");
}

/* ═══ Init ═══ */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(pvpHookOpen, 500);
    setTimeout(pvpHookRenderPage, 500);
  });
} else {
  setTimeout(pvpHookOpen, 500);
  setTimeout(pvpHookRenderPage, 500);
}

window.pvpToggleBookmark = pvpToggleBookmark;
window.pvpJumpTo = pvpJumpTo;
window.pvpDeleteBookmark = pvpDeleteBookmark;
window.pvpToggleNight = pvpToggleNight;

console.log("✅ pdfviewer-plus.js loaded");