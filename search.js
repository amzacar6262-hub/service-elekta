/* ═══════════════════════════════════════
   search.js — جستجوی سراسری + ایندکس سبک
   منوال / کد خطا / فلوچارت / PDF محلی
   ═══════════════════════════════════════ */

var _searchIndex = null; /* { manuals, errors, flows } */
var _searchTimer = null;
var _lastGlobalQ = "";

function searchNorm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSearchIndex() {
  var manuals = [];
  if (typeof MANUALS !== "undefined" && Array.isArray(MANUALS)) {
    manuals = MANUALS.map(function (m) {
      var blob = searchNorm(
        [m.title, m.summary, m.code, m.cat, (m.machines || []).join(" "), m.level, m.duration].join(" ")
      );
      return { id: m.id, type: "manual", title: m.title, code: m.code, cat: m.cat, blob: blob, ref: m };
    });
  }

  var errors = [];
  if (typeof ERRORS !== "undefined" && Array.isArray(ERRORS)) {
    errors = ERRORS.map(function (c) {
      var blob = searchNorm([c.code, c.title, c.act, c.machine, c.sev].join(" "));
      return { id: c.code, type: "error", title: c.title, code: c.code, sev: c.sev, blob: blob, ref: c };
    });
  }

  var flows = [];
  if (typeof FLOWCHARTS !== "undefined" && Array.isArray(FLOWCHARTS)) {
    flows = FLOWCHARTS.map(function (f) {
      var blob = searchNorm([f.title, f.subtitle, f.id].join(" "));
      return { id: f.id, type: "flow", title: f.title, code: f.subtitle || "", blob: blob, ref: f };
    });
  } else if (typeof flowcharts !== "undefined" && Array.isArray(flowcharts)) {
    flows = flowcharts.map(function (f) {
      var blob = searchNorm([f.title, f.subtitle, f.id].join(" "));
      return { id: f.id, type: "flow", title: f.title, code: f.subtitle || "", blob: blob, ref: f };
    });
  }

  _searchIndex = { manuals: manuals, errors: errors, flows: flows, builtAt: Date.now() };
  return _searchIndex;
}

function getSearchIndex() {
  if (!_searchIndex) buildSearchIndex();
  return _searchIndex;
}

/** جستجوی سریع روی ایندکس از قبل ساخته‌شده */
function searchIndexed(list, q, limit) {
  limit = limit || 30;
  q = searchNorm(q);
  if (!q) return [];
  var tokens = q.split(" ").filter(Boolean);
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var ok = true;
    for (var t = 0; t < tokens.length; t++) {
      if (item.blob.indexOf(tokens[t]) === -1) { ok = false; break; }
    }
    if (ok) {
      out.push(item);
      if (out.length >= limit) break;
    }
  }
  return out;
}

function searchPdfsLocal(q, limit) {
  limit = limit || 10;
  q = searchNorm(q);
  if (!q || typeof localPdfs === "undefined" || !Array.isArray(localPdfs)) return [];
  var out = [];
  for (var i = 0; i < localPdfs.length; i++) {
    var p = localPdfs[i];
    var blob = searchNorm([p.title, p.name, p.cat, p.note].join(" "));
    if (blob.indexOf(q) !== -1 || q.split(" ").every(function (tok) { return blob.indexOf(tok) !== -1; })) {
      out.push({ id: p.id, type: "pdf", title: p.title || p.name, code: p.cat || "PDF", blob: blob, ref: p });
      if (out.length >= limit) break;
    }
  }
  return out;
}

function runGlobalSearch(q) {
  q = (q || "").trim();
  _lastGlobalQ = q;
  var box = document.getElementById("globalSearchResults");
  if (!box) return;

  if (!q) {
    box.innerHTML =
      '<div class="gs-empty">' +
      (typeof t === "function" ? (t("gs_hint") !== "gs_hint" ? t("gs_hint") : "منوال، کد خطا، فلوچارت یا PDF را جستجو کن") : "منوال، کد خطا، فلوچارت یا PDF را جستجو کن") +
      "</div>";
    return;
  }

  var idx = getSearchIndex();
  var manuals = searchIndexed(idx.manuals, q, 25);
  var errors = searchIndexed(idx.errors, q, 20);
  var flows = searchIndexed(idx.flows, q, 10);
  var pdfs = searchPdfsLocal(q, 10);

  if (!manuals.length && !errors.length && !flows.length && !pdfs.length) {
    box.innerHTML =
      '<div class="gs-empty">' +
      (typeof t === "function" && t("gs_empty") !== "gs_empty" ? t("gs_empty") : "نتیجه‌ای یافت نشد") +
      "</div>";
    return;
  }

  var esc = typeof escHtml === "function" ? escHtml : (typeof escapeHtml === "function" ? escapeHtml : function (s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  });

  function section(title, items, clickFn) {
    if (!items.length) return "";
    return (
      '<div class="gs-section">' +
      '<div class="gs-section-t">' + esc(title) + " (" + items.length + ")</div>" +
      items.map(function (it) {
        return (
          '<button type="button" class="gs-item" onclick="' + clickFn(it) + '">' +
          '<span class="gs-item-code">' + esc(it.code || it.type) + "</span>" +
          '<span class="gs-item-title">' + esc(it.title || "") + "</span>" +
          "</button>"
        );
      }).join("") +
      "</div>"
    );
  }

  var html = "";
  html += section(
    typeof t === "function" && t("gs_manuals") !== "gs_manuals" ? t("gs_manuals") : "منوال‌ها",
    manuals,
    function (it) { return "closeGlobalSearch();openManual('" + String(it.id).replace(/'/g, "") + "')"; }
  );
  html += section(
    typeof t === "function" && t("gs_errors") !== "gs_errors" ? t("gs_errors") : "کدهای خطا",
    errors,
    function (it) { return "closeGlobalSearch();go('codes');codeQ='" + String(it.code).replace(/'/g, "") + "';if(typeof renderCodes==='function')renderCodes();"; }
  );
  html += section(
    typeof t === "function" && t("gs_flows") !== "gs_flows" ? t("gs_flows") : "فلوچارت‌ها",
    flows,
    function (it) { return "closeGlobalSearch();if(typeof openFlowchart==='function')openFlowchart('" + String(it.id).replace(/'/g, "") + "')"; }
  );
  html += section(
    typeof t === "function" && t("gs_pdfs") !== "gs_pdfs" ? t("gs_pdfs") : "PDFها",
    pdfs,
    function (it) { return "closeGlobalSearch();go('pdfs');if(typeof openPdfViewer==='function')openPdfViewer('" + String(it.id).replace(/'/g, "") + "')"; }
  );

  box.innerHTML = html;
}

function onGlobalSearchInput(val) {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(function () {
    runGlobalSearch(val);
  }, 180);
}

function openGlobalSearch() {
  var ov = document.getElementById("globalSearchOverlay");
  if (!ov) return;
  ov.classList.add("show");
  buildSearchIndex();
  var inp = document.getElementById("globalSearchInput");
  if (inp) {
    inp.value = _lastGlobalQ || "";
    setTimeout(function () { inp.focus(); }, 80);
  }
  runGlobalSearch(_lastGlobalQ || "");
}

function closeGlobalSearch() {
  var ov = document.getElementById("globalSearchOverlay");
  if (ov) ov.classList.remove("show");
}

/** برای کتابخانه: استفاده از ایندکس به‌جای اسکن خام هر بار */
function filterManualsFast(list, q) {
  q = searchNorm(q);
  if (!q) return list;
  var idx = getSearchIndex();
  var idSet = {};
  searchIndexed(idx.manuals, q, 500).forEach(function (it) { idSet[it.id] = true; });
  return list.filter(function (m) { return idSet[m.id]; });
}

window.buildSearchIndex = buildSearchIndex;
window.openGlobalSearch = openGlobalSearch;
window.closeGlobalSearch = closeGlobalSearch;
window.onGlobalSearchInput = onGlobalSearchInput;
window.runGlobalSearch = runGlobalSearch;
window.filterManualsFast = filterManualsFast;

console.log("✅ search.js — global search ready");
