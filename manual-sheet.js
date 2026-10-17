/* ═══════════════════════════════════════
   manual-sheet.js
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

  var checkState = getChecklistState(m.id);
  var note = getManualNote(m.id);

  var checksum = m.steps.map(function(s, i){
    return '<div class="step ' + (s.level || '') + (checkState[i] ? ' done' : '') + '" data-step="' + i + '">'
      + '<div class="step-check" onclick="toggleStep(\'' + m.id + '\', ' + i + ', this)">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      + '</div>'
      + '<div class="step-body"><div class="step-t">' + s.t + '</div>' + (s.note ? '<div class="step-note">' + s.note + '</div>' : '') + '</div>'
      + '</div>';
  }).join("");

  var doneCount = Object.keys(checkState).filter(function(k){ return checkState[k]; }).length;
  var total = m.steps.length;
  var progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  var svgPdf = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>';
  var svgLog = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';
  var svgReset = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';

  body.innerHTML =
    '<div class="detail-hero" style="background:' + grad + '">'
    + '<div class="detail-cat">' + i18n("cat_" + cat.id, cat.name) + '</div>'
    + '<div class="detail-title">' + escHtml(m.title) + '</div>'
    + '<div class="detail-sum">' + m.summary + '</div>'
    + '<div class="detail-meta">'
    + '<div class="detail-meta-item">' + ICONS.clock + '<span>' + m.duration + '</span></div>'
    + '<div class="detail-meta-item">' + ICONS.target + '<span>' + m.level + '</span></div>'
    + '</div></div>'

    + '<div class="sheet-actions">'
    +   '<button class="sheet-action-btn primary" onclick="openLogSheet(\'' + m.id + '\')">' + svgLog + ' ' + i18n("log_register", "ثبت سرویس") + '</button>'
    +   '<button class="sheet-action-btn" onclick="exportManualPDF()">' + svgPdf + ' ' + i18n("log_pdf", "PDF") + '</button>'
    + '</div>'

    + (m.warn ? '<div class="alert-box">' + ICONS.warn + '<div class="txt"><div class="t">' + i18n("sheet_warning", "هشدار ایمنی") + '</div>' + escHtml(m.warn) + '</div></div>' : "")

    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">' + i18n("sheet_devices", "دستگاه‌های مرتبط") + '</div></div>'
    + '<div class="tags" style="margin-bottom:16px">' + m.machines.map(function(x){ return '<span class="tag">' + x + '</span>'; }).join("") + '</div>'

    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">' + i18n("sheet_tools", "ابزار مورد نیاز") + '</div></div>'
    + '<div class="tags" style="margin-bottom:20px">' + m.tools.map(function(x){ return '<span class="tag">' + x + '</span>'; }).join("") + '</div>'

    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">'
    + i18n("sheet_steps", "مراحل") + ' — ' + fa(doneCount) + '/' + fa(total) + ' (' + fa(progressPct) + '%)</div></div>'

    + '<div id="stepsContainer" style="background:var(--card);border-radius:14px;padding:4px 16px;margin-bottom:16px">'
    + checksum
    + '</div>'

    + '<div class="sheet-actions" style="grid-template-columns:1fr">'
    +   '<button class="sheet-action-btn" onclick="resetChecklist(\'' + m.id + '\')">' + svgReset + ' ' + i18n("log_reset_check", "ریست چک‌لیست") + '</button>'
    + '</div>'

    + '<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">' + i18n("log_manual_notes", "یادداشت شخصی") + '</div></div>'
    + '<div class="manual-notes-section">'
    +   '<textarea id="manualNotesArea" class="manual-notes-area" '
    +     'placeholder="' + i18n("log_notes_ph", "نکات خاص این منوال...") + '" '
    +     'onchange="saveManualNote(\'' + m.id + '\', this.value)">' + escapeHtml(note || '') + '</textarea>'
    + '</div>';

  $("#backdrop").classList.add("show");
  $("#sheet").classList.add("show");
}

function closeSheet(){
  $("#backdrop").classList.remove("show");
  $("#sheet").classList.remove("show");
}

function toggleFav(id){
  if (!window.Elekta || !Elekta.state) return;
  favs = Elekta.state.favs;
  if(favs.has(id)){ favs.delete(id); toast(i18n("t_removed", "حذف شد")); }
  else { favs.add(id); toast(i18n("t_saved", "ذخیره شد ★")); }
  Elekta.saveFavs();
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
/* ═══════════════════════════════════════
   checklist + notes
   CHECKLIST per Manual
/* checklist — فقط Elekta.state */
var checklistData = (window.Elekta && Elekta.state && Elekta.state.checklistData)
  ? Elekta.state.checklistData
  : {};
function getChecklistState(manualId){
  checklistData = (window.Elekta && Elekta.state) ? Elekta.state.checklistData : checklistData;
  return checklistData[manualId] || {};
}
function saveChecklist(){
  if (window.Elekta && Elekta.state) {
    Elekta.state.checklistData = checklistData;
    Elekta.saveChecklist();
  }
}
function toggleStep(manualId, stepIndex, el){
  if(!checklistData[manualId]) checklistData[manualId] = {};
  if(checklistData[manualId][stepIndex]){
    delete checklistData[manualId][stepIndex];
    el.parentElement.classList.remove("done");
  } else {
    checklistData[manualId][stepIndex] = Date.now();
    el.parentElement.classList.add("done");
    if(navigator.vibrate) navigator.vibrate(8);
  }
  saveChecklist();
  var m = MANUALS.find(function(x){ return x.id === manualId; });
  if(m){
    var st = getChecklistState(manualId);
    var doneCount = Object.keys(st).filter(function(k){ return st[k]; }).length;
    var total = m.steps.length;
    var pct = total ? Math.round((doneCount/total)*100) : 0;
    var allHeaders = document.querySelectorAll("#sheetBody .section-t");
    for(var i=0; i<allHeaders.length; i++){
      if(allHeaders[i].textContent.indexOf(i18n("sheet_steps", "مراحل")) !== -1){
        allHeaders[i].textContent = i18n("sheet_steps", "مراحل") + ' — ' + fa(doneCount) + '/' + fa(total) + ' (' + fa(pct) + '%)';
        break;
      }
    }
  }
}
function resetChecklist(manualId){
  if(!confirm(i18n("log_reset_conf", "همه تیک‌ها پاک شود؟"))) return;
  delete checklistData[manualId];
  saveChecklist();
  openManual(manualId);
}

/* ═══════════════════════════════════════
   NOTES per Manual
/* notes — فقط Elekta.state */
var manualNotes = (window.Elekta && Elekta.state && Elekta.state.manualNotes)
  ? Elekta.state.manualNotes
  : {};
function getManualNote(manualId){
  manualNotes = (window.Elekta && Elekta.state) ? Elekta.state.manualNotes : manualNotes;
  return manualNotes[manualId] || "";
}
function saveManualNote(manualId, value){
  manualNotes = (window.Elekta && Elekta.state) ? Elekta.state.manualNotes : manualNotes;
  if(value && value.trim()){
    manualNotes[manualId] = value.trim();
  } else {
    delete manualNotes[manualId];
  }
  if (window.Elekta) {
    Elekta.state.manualNotes = manualNotes;
    Elekta.saveNotes();
  }
  if(typeof toast === "function") toast(i18n("log_note_saved", "یادداشت ذخیره شد"));
}

/* ═══════════════════════════════════════
   PDF Export
   ═══════════════════════════════════════ */
function exportManualPDF(){
  if(!curSheetManual) return;
  if(typeof toast === "function") toast(i18n("log_printing", "در حال آماده‌سازی PDF..."));
  setTimeout(function(){
    window.print();
  }, 300);
}

/* ═══════════════════════════════════════
   ═══════════════════════════════════════ */
