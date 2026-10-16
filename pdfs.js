/* ═══════════════════════════════════════
   pdfs.js — کتابخانه PDF اصلی
   ذخیره محلی در IndexedDB (آفلاین)
   ═══════════════════════════════════════ */

const PDF_CATS = [
  { id: "all", name: "pdfcat_all" },
  { id: "cmm", name: "pdfcat_cmm" },
  { id: "service", name: "pdfcat_service" },
  { id: "accept", name: "pdfcat_accept" },
  { id: "pm", name: "pdfcat_pm" },
  { id: "error", name: "pdfcat_error" },
  { id: "other", name: "pdfcat_other" }
];

const PDF_DB_NAME = "elekta-pdfs-db";
const PDF_STORE = "pdfs";
const PDF_MAX_MB = 120; /* iOS Safari quota varies; keep under practical limit */

function pdfToast(msg) {
  if (typeof toast === "function") toast(msg);
  else if (typeof showToast === "function") showToast(msg);
}

let pdfDB = null;
let localPdfs = [];
let pdfFilter = "all";
let pendingPdfFile = null;

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
    req.onerror = function () { reject(req.error); };
  });
}

function pdfSave(rec) {
  return openPdfDB().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PDF_STORE, "readwrite");
      tx.objectStore(PDF_STORE).put(rec);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
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
    localPdfs = arr.sort(function (a, b) { return (b.added || 0) - (a.added || 0); });
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
  if (typeof t === "function") return t(c.name);
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
    return '<button class="gallery-chip ' + (pdfFilter === c.id ? "on" : "") + '" onclick="setPdfFilter(\'' + c.id + '\')">' +
      pdfCatLabel(c.id) + "</button>";
  }).join("");
}

function setPdfFilter(id) {
  pdfFilter = id;
  renderPdfCats();
  renderPdfList();
}

function renderPdfList() {
  var el = document.getElementById("pdfList");
  var sub = document.getElementById("pdfSub");
  if (!el) return;
  var list = pdfFilter === "all" ? localPdfs : localPdfs.filter(function (p) { return p.cat === pdfFilter; });
  if (sub) {
    var n = localPdfs.length;
    sub.textContent = (typeof t === "function" ? t("pdf_count") : "تعداد PDF") + ": " + n;
  }
  if (!list.length) {
    el.innerHTML =
      '<div class="gallery-empty">' +
      '<div class="gallery-empty-t">' + (typeof t === "function" ? t("pdf_empty") : "هنوز PDFای نیست") + "</div>" +
      '<div class="gallery-empty-s">' + (typeof t === "function" ? t("pdf_empty_s") : "با دکمه + فایل اصلی را اضافه کن") + "</div>" +
      '<button class="btn-primary" style="margin-top:14px" onclick="pickPdfFile()">' +
      (typeof t === "function" ? t("pdf_add") : "افزودن PDF") + "</button></div>";
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
      '<span>' + formatPdfSize(p.size) + "</span>" +
      (p.pages ? "<span>" + p.pages + " ص</span>" : "") +
      "</div>" +
      (p.note ? '<div class="pdf-card-note">' + escapePdf(p.note) + "</div>" : "") +
      "</div>" +
      '<div class="pdf-card-acts">' +
      '<button class="pdf-act" onclick="openPdfViewer(\'' + p.id + '\')" title="Open">↗</button>' +
      '<button class="pdf-act danger" onclick="confirmDeletePdf(\'' + p.id + '\')" title="Delete">✕</button>' +
      "</div></div>"
    );
  }).join("");
}

function escapePdf(s) {
  return String(s || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pickPdfFile() {
  var inp = document.getElementById("pdfFileInput");
  if (inp) {
    inp.value = "";
    inp.click();
  }
}

function onPdfFileSelected(ev) {
  var files = ev.target.files;
  if (!files || !files.length) return;
  /* پشتیبانی چند فایل: اولی با شیت جزئیات؛ بقیه با عنوان نام فایل */
  var list = Array.prototype.slice.call(files);
  var first = list[0];
  if (first.type !== "application/pdf" && !/\.pdf$/i.test(first.name)) {
    pdfToast(typeof t === "function" ? t("pdf_bad_type") : "فقط فایل PDF");
    return;
  }
  if (first.size > PDF_MAX_MB * 1024 * 1024) {
    pdfToast((typeof t === "function" ? t("pdf_too_big") : "حجم زیاد") + " (max " + PDF_MAX_MB + " MB)");
    return;
  }
  pendingPdfFile = first;
  pendingPdfQueue = list.slice(1).filter(function (f) {
    return (f.type === "application/pdf" || /\.pdf$/i.test(f.name)) && f.size <= PDF_MAX_MB * 1024 * 1024;
  });
  openPdfAddSheet(first);
}

var pendingPdfQueue = [];

function openPdfAddSheet(file) {
  var sheet = document.getElementById("pdfAddSheet");
  var back = document.getElementById("pdfAddSheetBackdrop");
  var nameEl = document.getElementById("pdfAddTitle");
  var catEl = document.getElementById("pdfAddCat");
  var noteEl = document.getElementById("pdfAddNote");
  if (nameEl) nameEl.value = (file.name || "").replace(/\.pdf$/i, "");
  if (noteEl) noteEl.value = "";
  if (catEl) {
    catEl.innerHTML = PDF_CATS.filter(function (c) { return c.id !== "all"; })
      .map(function (c) {
        return '<option value="' + c.id + '">' + pdfCatLabel(c.id) + "</option>";
      }).join("");
  }
  if (sheet) sheet.classList.add("open");
  if (back) back.classList.add("open");
}

function closePdfAddSheet() {
  var sheet = document.getElementById("pdfAddSheet");
  var back = document.getElementById("pdfAddSheetBackdrop");
  if (sheet) sheet.classList.remove("open");
  if (back) back.classList.remove("open");
  pendingPdfFile = null;
}

async function savePdfRecord(file, title, cat, note) {
  var buf = await file.arrayBuffer();
  var rec = {
    id: "pdf_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    name: file.name,
    title: (title || file.name).trim() || file.name,
    cat: cat || "other",
    note: (note || "").trim(),
    size: file.size,
    type: file.type || "application/pdf",
    added: Date.now(),
    blob: new Blob([buf], { type: "application/pdf" })
  };
  await pdfSave(rec);
  return rec;
}

async function savePendingPdf() {
  if (!pendingPdfFile) return;
  var title = (document.getElementById("pdfAddTitle") || {}).value || pendingPdfFile.name;
  var cat = (document.getElementById("pdfAddCat") || {}).value || "other";
  var note = (document.getElementById("pdfAddNote") || {}).value || "";
  var file = pendingPdfFile;
  var queue = pendingPdfQueue.slice();
  pendingPdfQueue = [];
  try {
    await savePdfRecord(file, title, cat, note);
    /* بقیه فایل‌های انتخاب‌شده با همان دسته، عنوان = نام فایل */
    for (var i = 0; i < queue.length; i++) {
      await savePdfRecord(queue[i], queue[i].name.replace(/\.pdf$/i, ""), cat, "");
    }
    await loadLocalPdfs();
    closePdfAddSheet();
    renderPdfList();
    var n = 1 + queue.length;
    pdfToast((typeof t === "function" ? t("pdf_saved") : "PDF ذخیره شد") + (n > 1 ? " (" + n + ")" : ""));
  } catch (e) {
    console.error(e);
    pdfToast(typeof t === "function" ? t("pdf_save_fail") : "خطا در ذخیره — حافظه دستگاه ممکن است پر باشد");
  }
}

async function openPdfViewer(id) {
  var rec = await pdfGet(id);
  if (!rec || !rec.blob) {
    pdfToast("PDF not found");
    return;
  }
  var url = URL.createObjectURL(rec.blob);
  var frame = document.getElementById("pdfViewerFrame");
  var title = document.getElementById("pdfViewerTitle");
  var sheet = document.getElementById("pdfViewerSheet");
  var back = document.getElementById("pdfViewerBackdrop");
  if (title) title.textContent = rec.title || rec.name;
  if (frame) {
    frame.src = url;
    frame.dataset.url = url;
  }
  var dl = document.getElementById("pdfViewerDownload");
  if (dl) {
    dl.href = url;
    dl.download = rec.name || "document.pdf";
  }
  if (sheet) sheet.classList.add("open");
  if (back) back.classList.add("open");
}

function closePdfViewer() {
  var frame = document.getElementById("pdfViewerFrame");
  var sheet = document.getElementById("pdfViewerSheet");
  var back = document.getElementById("pdfViewerBackdrop");
  if (frame) {
    if (frame.dataset.url) {
      try { URL.revokeObjectURL(frame.dataset.url); } catch (e) {}
      frame.dataset.url = "";
    }
    frame.src = "about:blank";
  }
  if (sheet) sheet.classList.remove("open");
  if (back) back.classList.remove("open");
}

function confirmDeletePdf(id) {
  var msg = typeof t === "function" ? t("pdf_del_confirm") : "این PDF حذف شود؟";
  if (!confirm(msg)) return;
  deletePdfById(id);
}

async function deletePdfById(id) {
  try {
    await pdfDelete(id);
    await loadLocalPdfs();
    renderPdfList();
    pdfToast(typeof t === "function" ? t("pdf_deleted") : "حذف شد");
  } catch (e) {
    console.error(e);
  }
}

async function initPdfs() {
  await loadLocalPdfs();
  renderPdfCats();
  renderPdfList();
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
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(initPdfs, 200);
    });
  } else {
    setTimeout(initPdfs, 200);
  }
}

console.log("✅ pdfs.js — PDF library ready");
