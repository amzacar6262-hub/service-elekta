/* ═══════════════════════════════════════
   app.js — bootstrap + init
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
window.renderHomeFlow = renderHomeFlow;
window.toggleStep = toggleStep;
window.resetChecklist = resetChecklist;
window.saveManualNote = saveManualNote;
window.exportManualPDF = exportManualPDF;
window.openLogSheet = openLogSheet;
window.closeLogSheet = closeLogSheet;
window.selectLogMachine = selectLogMachine;
window.selectLogStatus = selectLogStatus;
window.saveLogEntry = saveLogEntry;
window.renderLog = renderLog;
window.openLogEntry = openLogEntry;
window.exportLogJSON = exportLogJSON;

/* فاز A: رفرش UI متمرکز */
if (window.Elekta && Elekta.onUIRefresh) {
  Elekta.onUIRefresh(function () {
    try {
      if (typeof renderTabbar === "function") renderTabbar();
      if (typeof renderStats === "function") renderStats();
      if (typeof renderCats === "function") renderCats();
      if (typeof renderToolGrid === "function") renderToolGrid();
      if (typeof renderHomeFlow === "function") renderHomeFlow();
      if (typeof renderHomePop === "function") renderHomePop();
      if (typeof renderLibChips === "function") renderLibChips();
      if (typeof renderLib === "function") renderLib();
      if (typeof renderCodeChips === "function") renderCodeChips();
      if (typeof renderCodes === "function") renderCodes();
      if (typeof renderFavs === "function") renderFavs();
      if (typeof renderMachineList === "function") renderMachineList();
      if (typeof renderRef === "function") renderRef();
      if (typeof renderLog === "function") renderLog();
      if (typeof renderGalleryChips === "function") renderGalleryChips();
      if (typeof renderGallery === "function") renderGallery();
      if (typeof renderPMFreqChips === "function") renderPMFreqChips();
      if (typeof renderPMMachineChips === "function") renderPMMachineChips();
      if (typeof renderPMProgress === "function") renderPMProgress();
      if (typeof renderPMList === "function") renderPMList();
      if (typeof renderPdfCats === "function") renderPdfCats();
      if (typeof renderPdfList === "function") renderPdfList();
      if (typeof renderLearnPaths === "function") renderLearnPaths();
      if (typeof applyStaticTranslations === "function") applyStaticTranslations();
      if (typeof updateLangSwitch === "function") updateLangSwitch();
      if (typeof updateOnline === "function") updateOnline();
      if (typeof pvpApplyToolbarI18n === "function") pvpApplyToolbarI18n();
    } catch (e) { console.warn(e); }
  });
}


/* ═══════════════════════════════════════
   INIT (با محافظت از خطا)
   ═══════════════════════════════════════ */
function _doInit(){
  bindElektaState();
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
  renderHomeFlow();
  renderLog();
  if(typeof renderGalleryChips === "function") renderGalleryChips();
  if(typeof renderGallery === "function") renderGallery();
  if(typeof renderPMFreqChips === "function") renderPMFreqChips();
  if(typeof renderPMMachineChips === "function") renderPMMachineChips();
  if(typeof renderPMProgress === "function") renderPMProgress();
  if(typeof renderPMList === "function") renderPMList();
  if(typeof applyStaticTranslations === "function") applyStaticTranslations();
  updateLangSwitch();
  updateOnline();
}

function showDataHealthBanner(){
  try {
    var n = (typeof MANUALS !== "undefined" && MANUALS) ? MANUALS.length : 0;
    var e = (typeof ERRORS !== "undefined" && ERRORS) ? ERRORS.length : 0;
    if (n > 0) {
      var old = document.getElementById("dataHealthBanner");
      if (old && old.parentNode) old.parentNode.removeChild(old);
      return;
    }
    if (document.getElementById("dataHealthBanner")) return;
    var bar = document.createElement("div");
    bar.id = "dataHealthBanner";
    bar.setAttribute("role", "alert");
    bar.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;padding:12px 16px;background:#FF453A;color:#fff;font-size:14px;font-weight:600;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.3)";
    bar.innerHTML = "داده منوال بارگذاری نشد (۰ مورد). صفحه را رفرش کن یا کش را پاک کن." +
      ' <button type="button" style="margin-inline-start:8px;padding:6px 12px;border:0;border-radius:8px;background:#fff;color:#FF453A;font-weight:700" onclick="location.reload()">رفرش</button>';
    document.body.appendChild(bar);
    console.error("[Elekta] MANUALS empty after init. Check data*.js scripts.");
  } catch (err) {
    console.warn(err);
  }
}

if (window.Elekta && typeof Elekta.safeInit === "function") {
  Elekta.safeInit(function(){
    _doInit();
    setTimeout(showDataHealthBanner, 500);
    if (typeof buildSearchIndex === "function") setTimeout(buildSearchIndex, 600);
  });
} else {
  try {
    _doInit();
    setTimeout(showDataHealthBanner, 500);
    if (typeof buildSearchIndex === "function") setTimeout(buildSearchIndex, 600);
  } catch(e){ console.error("Init error:", e); }
}