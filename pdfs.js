/* ═══════════════════════════════════════
   pdfs.js — کتابخانه PDF (IndexedDB)
   شیت‌ها با کلاس show باز می‌شوند (مثل بقیه برنامه)
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
  } catch (e) {
    window.alert(msg);
  }
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
    req.onsuccess = function (e) {
      pdfDB = e.target.result;
      resolve(pdfDB);
    };
    req.onerror = function () { reject(req.error || new Error("IDB open failed")); };
  });
}

function pdfSave(rec) {
  return openPdfDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PDF_STORE, "readwrite");
      var store = tx.objectStore(PDF_STORE);
      var req = store.put(rec);
      req.onsuccess = function () {};
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
  var c = PDF_CATS.find(function (x) { return x.id === id; });
  if (!c) return id || "";
  if (typeof t === "function") {
    try { var v = t(c.name); if (v) return v; } catch (e) {}
  }
  var fa = {
    pdfcat_all: "همه", pdfcat_cmm: "CMM / تعمیر", pdfcat_service: "سرویس",
    pdfcat_accept: "پذیرش", pdfcat_pm: "PM", pdfcat_error: "کد خطا", pdfcat_other: "سایر"
  };
  return fa[c.name] || id;
}

function renderPdfCats() {
  var el = document.getElementById("pdfCats");
  if (!el) return;
  el.innerHTML = PDF_CATS.map(function (c) {
    return '<button type="button" class="gallery-chip ' + (pdfFilter === c.id ? "on" : "") +
      '" onclick="setPdfFilter(\'' + c.id + '\')">' + pdfCatLabel(c.id) + "</button>";
  }).join("");
}

function setPdfFilter(id) {
  pdfFilter = id;
  renderPdfCats();
  renderPdfList();
}

function escapePdf(s) {
  return String(s || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPdfList() {
  var el = document.getElementById("pdfList");
  var sub = document.getElementById("pdfSub");
  if (!el) return;
  var list = pdfFilter === "all" ? localPdfs : localPdfs.filter(function (p) { return p.cat === pdfFilter; });
  if (sub) {
    sub.textContent = pdfT("pdf_count", "تعداد PDF") + ": " + localPdfs.length;
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
      '<div class="pdf-card-icon">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
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
  if (!inp) {
    pdfToast("input PDF پیدا نشد — index را چک کن");
    return;
  }
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
  /* مهم: کلاس show مثل بقیه شیت‌های برنامه */
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
  if (!pendingPdfFile) {
    pdfToast("فایلی انتخاب نشده");
    return;
  }
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
      ? "حافظه پر است — PDF کوچک‌تر امتحان کن یا چند فایل قدیمی را حذف کن"
      : (pdfT("pdf_save_fail", "خطا در ذخیره") + (e && e.message ? ": " + e.message : ""));
    pdfToast(msg);
  }
}

async function openPdfViewer(id) {
  try {
    var rec = await pdfGet(id);
    if (!rec || !rec.blob) {
      pdfToast("PDF پیدا نشد");
      return;
    }
    if (pdfViewerObjectUrl) {
      try { URL.revokeObjectURL(pdfViewerObjectUrl); } catch (e) {}
    }
    var url = URL.createObjectURL(rec.blob);
    pdfViewerObjectUrl = url;
    var frame = document.getElementById("pdfViewerFrame");
    var title = document.getElementById("pdfViewerTitle");
    var sheet = document.getElementById("pdfViewerSheet");
    var back = document.getElementById("pdfViewerBackdrop");
    if (title) title.textContent = rec.title || rec.name;
    if (frame) {
      frame.src = url;
    }
    var dl = document.getElementById("pdfViewerDownload");
    if (dl) {
      dl.href = url;
      dl.download = rec.name || "document.pdf";
    }
    if (sheet) sheet.classList.add("show");
    if (back) back.classList.add("show");
  } catch (e) {
    console.error(e);
    pdfToast("خطا در باز کردن PDF");
  }
}

function closePdfViewer() {
  var frame = document.getElementById("pdfViewerFrame");
  var sheet = document.getElementById("pdfViewerSheet");
  var back = document.getElementById("pdfViewerBackdrop");
  if (frame) frame.src = "about:blank";
  if (pdfViewerObjectUrl) {
    try { URL.revokeObjectURL(pdfViewerObjectUrl); } catch (e) {}
    pdfViewerObjectUrl = null;
  }
  if (sheet) sheet.classList.remove("show");
  if (back) back.classList.remove("show");
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
  } catch (e) {
    console.error(e);
    pdfToast("خطا در حذف");
  }
}

async function initPdfs() {
  try {
    if (navigator.storage && navigator.storage.persist) {
      try { await navigator.storage.persist(); } catch (e) {}
    }
    await loadLocalPdfs();
    renderPdfCats();
    renderPdfList();
  } catch (e) {
    console.warn("initPdfs", e);
  }
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

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(initPdfs, 300); });
  } else {
    setTimeout(initPdfs, 300);
  }
}

console.log("✅ pdfs.js ready (sheet class: show)");
