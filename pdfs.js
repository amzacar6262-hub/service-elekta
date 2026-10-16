/* ═══════════════════════════════════════
   pdfs.js — کتابخانه PDF (IndexedDB)
   نسخه ۳ — اسکرول پیوسته
   ═══════════════════════════════════════ */

var PDF_CATS = [
  { id: "all", name: "pdfcat_all" },
  { id: "cmm", name: "pdfcat_cmm" },
  { id: "service", name: "pdfcat_service" },
  { id: "accept", name: "pdfcat_accept" },
  { id: "pm", name: "pdfcat_pm" },
  { id: "error", name: "pdfcat_error" },
  { id: "other", name: "pdfcat_other" }
];

var PDF_DB_NAME = "elekta-pdfs-db";
var PDF_STORE = "pdfs";
var PDF_MAX_MB = 80;

var pdfDB = null;
var localPdfs = [];
var pdfFilter = "all";
var pendingPdfFile = null;
var pendingPdfQueue = [];
var pdfViewerObjectUrl = null;

function pdfToast(msg) {
  try {
    if (typeof toast === "function") toast(msg);
    else if (typeof showToast === "function") showToast(msg);
    else window.alert(msg);
  } catch (e) { window.alert(msg); }
}

function pdfT(key, fallback) {
  if (typeof t === "function") {
    try { return t(key) || fallback; } catch (e) {}
  }
  return fallback;
}

function openPdfDB() {
  return new Promise(function (resolve, reject) {
    if (pdfDB) { resolve(pdfDB); return; }
    var req = indexedDB.open(PDF_DB_NAME, 1);
    req.onupgradeneeded = function (e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(PDF_STORE)) {
        var store = db.createObjectStore(PDF_STORE, { keyPath: "id" });
        store.createIndex("added", "added", { unique: false });
        store.createIndex("cat", "cat", { unique: false });
      }
    };
    req.onsuccess = function (e) { pdfDB = e.target.result; resolve(pdfDB); };
    req.onerror = function () { reject(req.error || new Error("IDB open failed")); };
  });
}

function pdfSave(rec) {
  return openPdfDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PDF_STORE, "readwrite");
      tx.objectStore(PDF_STORE).put(rec);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error || new Error("save failed")); };
      tx.onabort = function () { reject(tx.error || new Error("save aborted (quota?)")); };
    });
  });
}

function pdfGetAll() {
  return openPdfDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PDF_STORE, "readonly");
      var req = tx.objectStore(PDF_STORE).getAll();
      req.onsuccess = function () { resolve(req.result || []); };
      req.onerror = function () { reject(req.error); };
    });
  });
}

function pdfDelete(id) {
  return openPdfDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PDF_STORE, "readwrite");
      tx.objectStore(PDF_STORE).delete(id);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}

function pdfGet(id) {
  return openPdfDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PDF_STORE, "readonly");
      var req = tx.objectStore(PDF_STORE).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  });
}

async function loadLocalPdfs() {
  try {
    var arr = await pdfGetAll();
    localPdfs = (arr || []).sort(function (a, b) { return (b.added || 0) - (a.added || 0); });
  } catch (e) {
    console.warn("loadLocalPdfs failed:", e);
    localPdfs = [];
  }
}

function formatPdfSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function pdfCatLabel(id) {
  var fa = {
    all: "همه", cmm: "CMM / تعمیر", service: "سرویس",
    accept: "پذیرش", pm: "PM", error: "کد خطا", other: "سایر",
    pdfcat_all: "همه", pdfcat_cmm: "CMM / تعمیر", pdfcat_service: "سرویس",
    pdfcat_accept: "پذیرش", pdfcat_pm: "PM", pdfcat_error: "کد خطا", pdfcat_other: "سایر"
  };
  var c = PDF_CATS.find(function (x) { return x.id === id; });
  var key = c ? c.name : ("pdfcat_" + (id || "other"));
  var fallback = fa[id] || fa[key] || id || "";
  if (typeof t === "function") {
    try { var v = t(key); if (v && v !== key && String(v).indexOf("pdfcat_") !== 0) return v; } catch (e) {}
  }
  return fallback;
}

function renderPdfCats() {
  var el = document.getElementById("pdfCats");
  if (!el) return;
  el.innerHTML = PDF_CATS.map(function (c) {
    return '<button type="button" class="gallery-chip ' + (pdfFilter === c.id ? "on" : "") +
      '" onclick="setPdfFilter(\'' + c.id + '\')">' + pdfCatLabel(c.id) + "</button>";
  }).join("");
}

function setPdfFilter(id) { pdfFilter = id; renderPdfCats(); renderPdfList(); }

function escapePdf(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderPdfList() {
  var el = document.getElementById("pdfList");
  var sub = document.getElementById("pdfSub");
  if (!el) return;
  var list = pdfFilter === "all" ? localPdfs : localPdfs.filter(function (p) { return p.cat === pdfFilter; });
  if (sub) {
    var cnt = pdfT("pdf_count", "تعداد PDF");
    if (!cnt || cnt === "pdf_count") cnt = "تعداد PDF";
    sub.textContent = cnt + ": " + localPdfs.length;
  }
  if (!list.length) {
    el.innerHTML =
      '<div class="gallery-empty" style="padding:32px 16px;text-align:center">' +
      '<div class="gallery-empty-t" style="font-weight:600;margin-bottom:8px">' +
      pdfT("pdf_empty", "هنوز PDFای نیست") + "</div>" +
      '<div class="gallery-empty-s" style="color:var(--label2);margin-bottom:16px">' +
      pdfT("pdf_empty_s", "با دکمه + فایل را اضافه کن") + "</div>" +
      '<button type="button" class="btn-primary" style="padding:12px 20px;border-radius:12px;background:var(--blue);color:#fff;font-weight:600;border:0" onclick="pickPdfFile()">' +
      pdfT("pdf_add", "افزودن PDF") + "</button></div>";
    return;
  }
  el.innerHTML = list.map(function (p) {
    return (
      '<div class="pdf-card" data-id="' + p.id + '">' +
      '<div class="pdf-card-icon" style="width:48px;height:48px;min-width:48px;flex-shrink:0">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
      '<polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/>' +
      '<line x1="8" y1="17" x2="14" y2="17"/></svg></div>' +
      '<div class="pdf-card-body" onclick="openPdfViewer(\'' + p.id + '\')">' +
      '<div class="pdf-card-title">' + escapePdf(p.title || p.name) + "</div>" +
      '<div class="pdf-card-meta">' +
      '<span class="pdf-chip">' + pdfCatLabel(p.cat) + "</span>" +
      "<span>" + formatPdfSize(p.size) + "</span>" +
      "</div>" +
      (p.note ? '<div class="pdf-card-note">' + escapePdf(p.note) + "</div>" : "") +
      "</div>" +
      '<div class="pdf-card-acts">' +
      '<button type="button" class="pdf-act" onclick="openPdfViewer(\'' + p.id + '\')">↗</button>' +
      '<button type="button" class="pdf-act danger" onclick="confirmDeletePdf(\'' + p.id + '\')">✕</button>' +
      "</div></div>"
    );
  }).join("");
}

function pickPdfFile() {
  var inp = document.getElementById("pdfFileInput");
  if (!inp) { pdfToast("input PDF پیدا نشد"); return; }
  inp.value = "";
  inp.click();
}

function onPdfFileSelected(ev) {
  var files = ev.target && ev.target.files;
  if (!files || !files.length) return;
  var list = [];
  for (var i = 0; i < files.length; i++) list.push(files[i]);
  var first = list[0];
  if (first.type && first.type !== "application/pdf" && !/\.pdf$/i.test(first.name)) {
    pdfToast(pdfT("pdf_bad_type", "فقط فایل PDF"));
    return;
  }
  if (first.size > PDF_MAX_MB * 1024 * 1024) {
    pdfToast(pdfT("pdf_too_big", "حجم زیاد") + " (حداکثر " + PDF_MAX_MB + " MB)");
    return;
  }
  pendingPdfFile = first;
  pendingPdfQueue = list.slice(1).filter(function (f) {
    return (!f.type || f.type === "application/pdf" || /\.pdf$/i.test(f.name)) &&
      f.size <= PDF_MAX_MB * 1024 * 1024;
  });
  openPdfAddSheet(first);
}

function openPdfAddSheet(file) {
  var sheet = document.getElementById("pdfAddSheet");
  var back = document.getElementById("pdfAddSheetBackdrop");
  var nameEl = document.getElementById("pdfAddTitle");
  var catEl = document.getElementById("pdfAddCat");
  var noteEl = document.getElementById("pdfAddNote");
  if (nameEl) nameEl.value = (file && file.name ? file.name : "").replace(/\.pdf$/i, "");
  if (noteEl) noteEl.value = "";
  if (catEl) {
    catEl.innerHTML = PDF_CATS.filter(function (c) { return c.id !== "all"; })
      .map(function (c) {
        return '<option value="' + c.id + '">' + pdfCatLabel(c.id) + "</option>";
      }).join("");
  }
  if (sheet) sheet.classList.add("show");
  if (back) back.classList.add("show");
}

function closePdfAddSheet() {
  var sheet = document.getElementById("pdfAddSheet");
  var back = document.getElementById("pdfAddSheetBackdrop");
  if (sheet) sheet.classList.remove("show");
  if (back) back.classList.remove("show");
  pendingPdfFile = null;
  pendingPdfQueue = [];
}

async function savePdfRecord(file, title, cat, note) {
  var buf = await file.arrayBuffer();
  var rec = {
    id: "pdf_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    name: file.name,
    title: (title || file.name).replace(/\.pdf$/i, "").trim() || file.name,
    cat: cat || "other",
    note: (note || "").trim(),
    size: file.size,
    type: "application/pdf",
    added: Date.now(),
    blob: new Blob([buf], { type: "application/pdf" })
  };
  await pdfSave(rec);
  return rec;
}

async function savePendingPdf() {
  if (!pendingPdfFile) { pdfToast("فایلی انتخاب نشده"); return; }
  var titleEl = document.getElementById("pdfAddTitle");
  var catEl = document.getElementById("pdfAddCat");
  var noteEl = document.getElementById("pdfAddNote");
  var title = titleEl ? titleEl.value : pendingPdfFile.name;
  var cat = catEl ? catEl.value : "other";
  var note = noteEl ? noteEl.value : "";
  var file = pendingPdfFile;
  var queue = pendingPdfQueue.slice();
  pendingPdfQueue = [];
  try {
    pdfToast("در حال ذخیره…");
    await savePdfRecord(file, title, cat, note);
    for (var i = 0; i < queue.length; i++) {
      await savePdfRecord(queue[i], queue[i].name, cat, "");
    }
    await loadLocalPdfs();
    closePdfAddSheet();
    renderPdfList();
    var n = 1 + queue.length;
    pdfToast(pdfT("pdf_saved", "PDF ذخیره شد") + (n > 1 ? " (" + n + ")" : ""));
  } catch (e) {
    console.error("savePendingPdf", e);
    var msg = (e && e.name === "QuotaExceededError")
      ? "حافظه پر است"
      : (pdfT("pdf_save_fail", "خطا در ذخیره") + (e && e.message ? ": " + e.message : ""));
    pdfToast(msg);
  }
}


/* ═══════════════════════════════════════
   PDF Viewer — اسکرول پیوسته
   ═══════════════════════════════════════ */

var pdfJsDoc = null;
var pdfJsPagesText = null;
var pdfSearchHits = [];
var pdfSearchHitIdx = 0;
var pdfCurrentBlobUrl = null;
var pdfCurrentPage = 1;
var pdfRenderedPages = {};
var pdfPageObserver = null;

function loadPdfJs() {
  return new Promise(function (resolve, reject) {
    if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = function () {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      } else reject(new Error("pdfjs missing"));
    };
    script.onerror = function () { reject(new Error("pdfjs load fail")); };
    document.head.appendChild(script);
  });
}

function getPdfCanvasHost() {
  var body = document.querySelector("#pdfViewerSheet .pdf-viewer-body");
  if (!body) return null;
  var host = document.getElementById("pdfCanvasHost");
  if (!host) {
    /* حذف هر leftover */
    var oldNav = document.getElementById("pdfPageNav");
    if (oldNav && oldNav.parentNode) oldNav.parentNode.removeChild(oldNav);
    var oldHost = document.getElementById("pdfCanvasHost");
    if (oldHost && oldHost.parentNode) oldHost.parentNode.removeChild(oldHost);

    host = document.createElement("div");
    host.id = "pdfCanvasHost";
    host.className = "pdf-canvas-host pdf-scroll-host";
    body.innerHTML = "";
    body.appendChild(host);
  }
  /* حذف Nav Bar قبلی */
  var nav = document.getElementById("pdfPageNav");
  if (nav && nav.parentNode) nav.parentNode.removeChild(nav);

  var frame = document.getElementById("pdfViewerFrame");
  if (frame) frame.style.display = "none";
  return host;
}

async function renderAllPdfPages() {
  if (!pdfJsDoc) return;
  var host = getPdfCanvasHost();
  if (!host) return;
  host.innerHTML = "";
  pdfRenderedPages = {};

  var totalPages = pdfJsDoc.numPages;
  var hostW = host.clientWidth || window.innerWidth || 360;

  /* تخمین ارتفاع از صفحه اول */
  var firstPage = await pdfJsDoc.getPage(1);
  var vp1 = firstPage.getViewport({ scale: 1 });
  var scale0 = (hostW - 16) / vp1.width;
  var estHeight = Math.floor(vp1.height * scale0);

  /* ساخت placeholder برای همه صفحات */
  var frag = document.createDocumentFragment();
  for (var i = 1; i <= totalPages; i++) {
    var wrap = document.createElement("div");
    wrap.className = "pdf-page-wrapper";
    wrap.id = "pdfPage_" + i;
    wrap.dataset.pageNum = i;
    wrap.style.minHeight = estHeight + "px";
    wrap.innerHTML = '<div class="pdf-page-placeholder">صفحه ' + i + '</div>';
    frag.appendChild(wrap);
  }
  host.appendChild(frag);

  /* IntersectionObserver برای lazy render */
  if (pdfPageObserver) {
    try { pdfPageObserver.disconnect(); } catch(e){}
  }
  pdfPageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var n = parseInt(entry.target.dataset.pageNum, 10);
        if (n && !pdfRenderedPages[n]) {
          renderPageInto(n, entry.target);
        }
        if (n) {
          pdfCurrentPage = n;
          if (typeof window.pvpUpdateBookmarkBtn === "function") {
            try { window.pvpUpdateBookmarkBtn(); } catch(e){}
          }
        }
      }
    });
  }, {
    root: host,
    rootMargin: "400px 0px",
    threshold: 0.01
  });

  var wrappers = host.querySelectorAll(".pdf-page-wrapper");
  wrappers.forEach(function(w) { pdfPageObserver.observe(w); });

  /* Scroll listener برای به‌روزرسانی شماره صفحه جاری */
  host.addEventListener("scroll", onPdfScroll, { passive: true });

  console.log("pvp: rendered " + totalPages + " placeholders");
}

async function renderPageInto(pageNum, wrapper) {
  if (!pdfJsDoc || pdfRenderedPages[pageNum]) return;
  pdfRenderedPages[pageNum] = true;

  try {
    var page = await pdfJsDoc.getPage(pageNum);
    var host = document.getElementById("pdfCanvasHost");
    var hostW = host.clientWidth || window.innerWidth || 360;
    var unscaled = page.getViewport({ scale: 1 });
    var scale = (hostW - 16) / unscaled.width;
    var outputScale = Math.min(window.devicePixelRatio || 1, 2);
    var viewport = page.getViewport({ scale: scale });

    var canvas = document.createElement("canvas");
    canvas.className = "pdf-page-canvas";
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";

    var ctx = canvas.getContext("2d");
    var transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
      transform: transform
    }).promise;

    wrapper.innerHTML = "";
    wrapper.appendChild(canvas);
    wrapper.style.minHeight = "";
  } catch (e) {
    console.warn("render page " + pageNum, e);
  }
}

var pdfScrollTimer = null;
function onPdfScroll() {
  if (pdfScrollTimer) clearTimeout(pdfScrollTimer);
  pdfScrollTimer = setTimeout(function() {
    var host = document.getElementById("pdfCanvasHost");
    if (!host) return;
    var scrollTop = host.scrollTop;
    var wrappers = host.querySelectorAll(".pdf-page-wrapper");
    var bestPage = 1, bestDist = Infinity;
    for (var i = 0; i < wrappers.length; i++) {
      var w = wrappers[i];
      var dist = Math.abs(w.offsetTop - scrollTop);
      if (dist < bestDist) {
        bestDist = dist;
        bestPage = parseInt(w.dataset.pageNum, 10);
      }
    }
    pdfCurrentPage = bestPage;
    if (typeof window.pvpUpdateBookmarkBtn === "function") {
      try { window.pvpUpdateBookmarkBtn(); } catch(e){}
    }
  }, 100);
}

/* Jump to a specific page — با scroll */
async function renderPdfPage(num) {
  if (!pdfJsDoc) return;
  num = Math.max(1, Math.min(num, pdfJsDoc.numPages));
  pdfCurrentPage = num;
  var host = document.getElementById("pdfCanvasHost");
  if (!host) return;
  var wrapper = document.getElementById("pdfPage_" + num);
  if (!wrapper) return;
  /* اگه رندر نشده، رندر کن */
  if (!pdfRenderedPages[num]) {
    await renderPageInto(num, wrapper);
  }
  host.scrollTo({ top: wrapper.offsetTop - 8, behavior: "smooth" });
}

async function openPdfWithEngine(blobUrl) {
  var host = getPdfCanvasHost();
  if (host) host.innerHTML = '<div class="pdf-loading">در حال بارگذاری PDF…</div>';
  try {
    var pdfjsLib = await loadPdfJs();
    var doc = await pdfjsLib.getDocument({
      url: blobUrl,
      rangeChunkSize: 65536,
      disableAutoFetch: false
    }).promise;
    pdfJsDoc = doc;
    await renderAllPdfPages();
    indexPdfTextFromDoc(doc);
  } catch (e) {
    console.error("openPdfWithEngine", e);
    fallbackIframe(blobUrl);
    pdfToast("نمایش پیشرفته در دسترس نیست — حالت ساده");
  }
}

function fallbackIframe(blobUrl) {
  var body = document.querySelector("#pdfViewerSheet .pdf-viewer-body");
  if (!body) return;
  body.innerHTML = "";
  var frame = document.createElement("iframe");
  frame.id = "pdfViewerFrame";
  frame.title = "PDF";
  frame.src = blobUrl;
  body.appendChild(frame);
}

async function indexPdfTextFromDoc(doc) {
  try {
    var texts = [];
    var maxPages = Math.min(doc.numPages, 500);
    for (var i = 1; i <= maxPages; i++) {
      var page = await doc.getPage(i);
      var tc = await page.getTextContent();
      texts.push(tc.items.map(function (it) { return it.str; }).join(" "));
    }
    pdfJsPagesText = texts;
    var meta = document.getElementById("pdfSearchMeta");
    if (meta && meta.textContent === "…") meta.textContent = "✓";
  } catch (e) {
    console.warn("index text", e);
  }
}

async function indexPdfText(blobUrl) {
  if (pdfJsDoc) { await indexPdfTextFromDoc(pdfJsDoc); return pdfJsPagesText; }
  try {
    var pdfjsLib = await loadPdfJs();
    var doc = await pdfjsLib.getDocument({ url: blobUrl }).promise;
    pdfJsDoc = doc;
    await indexPdfTextFromDoc(doc);
    return pdfJsPagesText;
  } catch (e) { pdfJsPagesText = null; return null; }
}

function ensurePdfSearchBar() {
  var sheet = document.getElementById("pdfViewerSheet");
  if (!sheet) return null;
  var bar = document.getElementById("pdfSearchBar");
  if (bar) return bar;
  bar = document.createElement("div");
  bar.id = "pdfSearchBar";
  bar.className = "pdf-search-bar";
  bar.innerHTML =
    '<input type="search" id="pdfSearchInput" placeholder="جستجو در PDF..." enterkeyhint="search" />' +
    '<span class="pdf-search-meta" id="pdfSearchMeta"></span>' +
    '<button type="button" id="pdfSearchPrev">قبلی</button>' +
    '<button type="button" id="pdfSearchNext">بعدی</button>';
  var body = sheet.querySelector(".pdf-viewer-body");
  /* درج قبل از toolbar اگه هست، وگرنه قبل از body */
  var tb = document.getElementById("pvpToolbar");
  if (tb && tb.parentNode === sheet) sheet.insertBefore(bar, tb);
  else if (body) sheet.insertBefore(bar, body);
  else sheet.appendChild(bar);

  var input = bar.querySelector("#pdfSearchInput");
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); runPdfSearch(input.value, false); }
  });
  bar.querySelector("#pdfSearchNext").addEventListener("click", function () {
    if (pdfSearchHits.length) goPdfSearchHit(1);
    else runPdfSearch(input.value, false);
  });
  bar.querySelector("#pdfSearchPrev").addEventListener("click", function () {
    if (pdfSearchHits.length) goPdfSearchHit(-1);
    else runPdfSearch(input.value, true);
  });
  return bar;
}

async function runPdfSearch(q, reverse) {
  q = (q || "").trim();
  var meta = document.getElementById("pdfSearchMeta");
  if (!q) { pdfSearchHits = []; if (meta) meta.textContent = ""; return; }
  if (!pdfJsPagesText) {
    if (meta) meta.textContent = "…";
    if (pdfJsDoc) await indexPdfTextFromDoc(pdfJsDoc);
    else if (pdfCurrentBlobUrl) await indexPdfText(pdfCurrentBlobUrl);
  }
  if (!pdfJsPagesText) { if (meta) meta.textContent = "—"; pdfToast("جستجو آماده نیست"); return; }
  var low = q.toLowerCase();
  pdfSearchHits = [];
  for (var i = 0; i < pdfJsPagesText.length; i++) {
    if (pdfJsPagesText[i].toLowerCase().indexOf(low) !== -1) pdfSearchHits.push(i + 1);
  }
  if (!pdfSearchHits.length) { if (meta) meta.textContent = "۰"; pdfToast("موردی یافت نشد"); return; }
  pdfSearchHitIdx = reverse ? pdfSearchHits.length - 1 : 0;
  goPdfSearchHit(0);
}

function goPdfSearchHit(delta) {
  if (!pdfSearchHits.length) return;
  pdfSearchHitIdx = (pdfSearchHitIdx + delta + pdfSearchHits.length) % pdfSearchHits.length;
  var page = pdfSearchHits[pdfSearchHitIdx];
  var meta = document.getElementById("pdfSearchMeta");
  if (meta) meta.textContent = (pdfSearchHitIdx + 1) + "/" + pdfSearchHits.length;
  renderPdfPage(page);
}

function jumpPdfToPage(page) { renderPdfPage(page); }

async function openPdfViewer(id) {
  try {
    var rec = await pdfGet(id);
    if (!rec || !rec.blob) { pdfToast("PDF پیدا نشد"); return; }
    if (pdfViewerObjectUrl) {
      try { URL.revokeObjectURL(pdfViewerObjectUrl); } catch (e) {}
    }
    var url = URL.createObjectURL(rec.blob);
    pdfViewerObjectUrl = url;
    var frame = document.getElementById("pdfViewerFrame");
    var title = document.getElementById("pdfViewerTitle");
    var sheet = document.getElementById("pdfViewerSheet");
    var back = document.getElementById("pdfViewerBackdrop") || document.getElementById("pdfViewerSheetBackdrop");
    if (title) title.textContent = rec.title || rec.name;
    if (frame) frame.style.display = "none";
    var dl = document.getElementById("pdfViewerDownload");
    if (dl) { dl.href = url; dl.setAttribute("download", rec.name || "document.pdf"); }
    if (sheet) sheet.classList.add("show");
    if (back) back.classList.add("show");
    ensurePdfSearchBar();
    pdfCurrentBlobUrl = url;
    pdfSearchHits = [];
    pdfSearchHitIdx = 0;
    pdfJsPagesText = null;
    var meta = document.getElementById("pdfSearchMeta");
    if (meta) meta.textContent = "";
    var sin = document.getElementById("pdfSearchInput");
    if (sin) sin.value = "";
    openPdfWithEngine(url);
  } catch (e) {
    console.error(e);
    pdfToast("خطا در باز کردن PDF");
  }
}

function closePdfViewer() {
  try {
    var frame = document.getElementById("pdfViewerFrame");
    var sheet = document.getElementById("pdfViewerSheet");
    var back = document.getElementById("pdfViewerBackdrop") || document.getElementById("pdfViewerSheetBackdrop");
    if (frame) { try { frame.src = "about:blank"; } catch (e) {} }
    if (pdfPageObserver) { try { pdfPageObserver.disconnect(); } catch(e){} pdfPageObserver = null; }
    pdfRenderedPages = {};
    var host = document.getElementById("pdfCanvasHost");
    if (host) host.innerHTML = "";
    pdfJsDoc = null;
    pdfCurrentPage = 1;
    if (pdfViewerObjectUrl) { try { URL.revokeObjectURL(pdfViewerObjectUrl); } catch (e) {} pdfViewerObjectUrl = null; }
    if (sheet) sheet.classList.remove("show");
    if (back) back.classList.remove("show");
    pdfCurrentBlobUrl = null;
    pdfJsPagesText = null;
    pdfSearchHits = [];
    pdfJsDoc = null;
  } catch (e) { console.error(e); }
}

function confirmDeletePdf(id) {
  var msg = pdfT("pdf_del_confirm", "این PDF حذف شود؟");
  if (!window.confirm(msg)) return;
  deletePdfById(id);
}

async function deletePdfById(id) {
  try {
    await pdfDelete(id);
    await loadLocalPdfs();
    renderPdfList();
    pdfToast(pdfT("pdf_deleted", "حذف شد"));
  } catch (e) { console.error(e); pdfToast("خطا در حذف"); }
}

async function initPdfs() {
  try {
    if (navigator.storage && navigator.storage.persist) {
      try { await navigator.storage.persist(); } catch (e) {}
    }
    await loadLocalPdfs();
    renderPdfCats();
    renderPdfList();
  } catch (e) { console.warn("initPdfs", e); }
}

window.pickPdfFile = pickPdfFile;
window.onPdfFileSelected = onPdfFileSelected;
window.setPdfFilter = setPdfFilter;
window.openPdfViewer = openPdfViewer;
window.closePdfViewer = closePdfViewer;
window.closePdfAddSheet = closePdfAddSheet;
window.savePendingPdf = savePendingPdf;
window.confirmDeletePdf = confirmDeletePdf;
window.initPdfs = initPdfs;
window.runPdfSearch = runPdfSearch;
window.renderPdfPage = renderPdfPage;

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(initPdfs, 300); });
  } else {
    setTimeout(initPdfs, 300);
  }
}

console.log("✅ pdfs.js v3 ready — continuous scroll");