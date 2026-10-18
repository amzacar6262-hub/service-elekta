/* ═══════════════════════════════════════
   ui-shared.js — helpers + state
   ═══════════════════════════════════════ */
/* ═══════════════════════════════════════
   app.js — منطق و رندر
   ═══════════════════════════════════════ */

/* ═══ ICONS ═══ */
const ICONS = {
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
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
function escHtml(str) {
  if (typeof escapeHtml === "function") return escapeHtml(str);
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function fa(n){
  var lang = (typeof getLang === "function") ? getLang() : "fa";
  var s = String(n);
  if(lang === "fa"){
    return s.replace(/\d/g, function(d){ return "۰۱۲۳۴۵۶۷۸۹"[d]; });
  }
  return s;
}
const $ = s => document.querySelector(s);
function i18n(key, fallback){
  if(typeof t === "function"){
    try {
      var v = t(key);
      if(v && v !== key) return v;
    } catch(e){}
  }
  return fallback || key;
}

/* ═══ State ═══ */
/* ── فاز A: state فقط از Elekta.state ── */
var libFilter = "all", libQ = "", codeFilter = "all", codeQ = "", refQ = "";
var favs = (window.Elekta && Elekta.state && Elekta.state.favs instanceof Set)
  ? Elekta.state.favs
  : new Set();
var curSheetManual = null;

function bindElektaState() {
  if (!window.Elekta || !Elekta.state) return;
  var S = Elekta.state;
  favs = S.favs;
  if (typeof checklistData !== "undefined") checklistData = S.checklistData;
  if (typeof manualNotes !== "undefined") manualNotes = S.manualNotes;
  if (typeof serviceLog !== "undefined") serviceLog = S.serviceLog;
  /* فیلترهای UI روی state هم mirror شوند */
  S.libFilter = libFilter; S.libQ = libQ;
  S.codeFilter = codeFilter; S.codeQ = codeQ;
  S.refQ = refQ;
}

/* ═══════════════════════════════════════
   RENDER FUNCTIONS
   ═══════════════════════════════════════ */
