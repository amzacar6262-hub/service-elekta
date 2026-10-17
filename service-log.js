/* ═══════════════════════════════════════
   service-log.js
/* service log — فقط Elekta.state */
var serviceLog = (window.Elekta && Elekta.state && Array.isArray(Elekta.state.serviceLog))
  ? Elekta.state.serviceLog
  : [];
let logSelectedManualId = null;
let logSelectedMachine = "Synergy";
let logSelectedStatus = "done";

function saveServiceLog(){
  if (window.Elekta && Elekta.state) {
    Elekta.state.serviceLog = serviceLog;
    Elekta.saveLog();
  }
}

function openLogSheet(manualId){
  logSelectedManualId = manualId;
  logSelectedMachine = (curSheetManual && curSheetManual.machines[0]) || "Synergy";
  logSelectedStatus = "done";

  var m = MANUALS.find(function(x){ return x.id === manualId; });
  var disp = document.getElementById("logManualDisplay");
  if(disp) disp.textContent = m ? (m.code + ' — ' + m.title) : "—";

  var techEl = document.getElementById("logTech");
  if(techEl) techEl.value = localStorage.getItem("elekta_tech") || "";
  var notesEl = document.getElementById("logNotes");
  if(notesEl) notesEl.value = "";

  renderLogMachineChips();
  renderLogStatusChips();

  var sheet = document.getElementById("logSheet");
  var backdrop = document.getElementById("logSheetBackdrop");
  if(sheet) sheet.classList.add("show");
  if(backdrop) backdrop.classList.add("show");
}

function closeLogSheet(){
  var sheet = document.getElementById("logSheet");
  var backdrop = document.getElementById("logSheetBackdrop");
  if(sheet) sheet.classList.remove("show");
  if(backdrop) backdrop.classList.remove("show");
}

function renderLogMachineChips(){
  var el = document.getElementById("logMachineChips");
  if(!el) return;
  var machines = ["Synergy","Infinity","Versa HD","Unity","Axesse","Precise","Compact","Flexitron"];
  el.innerHTML = machines.map(function(m){
    return '<button class="add-photo-cat ' + (logSelectedMachine === m ? 'on' : '') + '" '
      + 'onclick="selectLogMachine(\'' + m + '\')">' + m + '</button>';
  }).join("");
}
function selectLogMachine(m){
  logSelectedMachine = m;
  renderLogMachineChips();
  if(navigator.vibrate) navigator.vibrate(5);
}
function renderLogStatusChips(){
  var el = document.getElementById("logStatusChips");
  if(!el) return;
  var statuses = [
    { id:"done",    label: i18n("log_status_done", "تکمیل") },
    { id:"partial", label: i18n("log_status_partial", "نیمه") },
    { id:"failed",  label: i18n("log_status_failed", "ناموفق") }
  ];
  el.innerHTML = statuses.map(function(s){
    return '<button class="add-photo-cat ' + (logSelectedStatus === s.id ? 'on' : '') + '" '
      + 'onclick="selectLogStatus(\'' + s.id + '\')">' + s.label + '</button>';
  }).join("");
}
function selectLogStatus(s){
  logSelectedStatus = s;
  renderLogStatusChips();
  if(navigator.vibrate) navigator.vibrate(5);
}

function saveLogEntry(){
  if(!logSelectedManualId){
    if(typeof toast === "function") toast(i18n("log_select_manual", "منوال انتخاب نشده"));
    return;
  }
  var m = MANUALS.find(function(x){ return x.id === logSelectedManualId; });
  var tech = (document.getElementById("logTech").value || "").trim();
  var notes = (document.getElementById("logNotes").value || "").trim();
  var entry = {
    id: "l_" + Date.now().toString(36),
    manualId: logSelectedManualId,
    manualCode: m ? m.code : "",
    manualTitle: m ? m.title : "",
    machine: logSelectedMachine,
    status: logSelectedStatus,
    tech: tech,
    notes: notes,
    at: Date.now()
  };
  serviceLog.unshift(entry);
  saveServiceLog();
  if(tech) localStorage.setItem("elekta_tech", tech);
  closeLogSheet();
  renderLog();
  if(typeof toast === "function") toast(i18n("log_saved", "سرویس ثبت شد ✓"));
  if(navigator.vibrate) navigator.vibrate([15, 30, 15]);
}

function renderLog(){
  var el = document.getElementById("logList");
  if(!el) return;
  if(!serviceLog || !Array.isArray(serviceLog)) serviceLog = [];
  if(!serviceLog.length){
    el.innerHTML = '<div class="log-empty">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
      + '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>'
      + '<polyline points="14 2 14 8 20 8"/>'
      + '</svg>'
      + '<div class="log-empty-t">' + i18n("log_empty", "هنوز سرویسی ثبت نشده") + '</div>'
      + '<div>' + i18n("log_empty_sub", "از داخل هر منوال، دکمه «ثبت سرویس» رو بزن") + '</div>'
      + '</div>';
    return;
  }
  var statusLabels = {
    done: i18n("log_status_done", "تکمیل"),
    partial: i18n("log_status_partial", "نیمه"),
    failed: i18n("log_status_failed", "ناموفق")
  };
  el.innerHTML = serviceLog.map(function(entry, i){
    var date = new Date(entry.at);
    var dateStr = date.toLocaleDateString("fa-IR") + " — " + date.toLocaleTimeString("fa-IR", { hour:"2-digit", minute:"2-digit" });
    return '<div class="log-entry" style="animation-delay:' + (i*.03) + 's" onclick="openLogEntry(\'' + entry.manualId + '\')">'
      + '<div class="log-head">'
      + '<div class="log-title">' + escHtml(entry.manualTitle || '') + '</div>'
      + '<span class="log-status ' + escHtml(entry.status || '') + '">' + escHtml(statusLabels[entry.status] || entry.status || '') + '</span>'
      + '</div>'
      + '<div class="log-meta">'
      + '<span>🏥 ' + escHtml(entry.machine || '') + '</span>'
      + (entry.tech ? '<span>👤 ' + escHtml(entry.tech) + '</span>' : '')
      + '<span>🕐 ' + dateStr + '</span>'
      + '<span>📋 ' + escHtml(entry.manualCode || '') + '</span>'
      + '</div>'
      + (entry.notes ? '<div class="log-notes">' + escHtml(entry.notes) + '</div>' : '')
      + '</div>';
  }).join("");
}

function openLogEntry(manualId){
  var m = MANUALS.find(function(x){ return x.id === manualId; });
  if(m) openManual(manualId);
}

function exportLogJSON(){
  var data = {
    exported: new Date().toISOString(),
    log: serviceLog,
    notes: manualNotes,
    checklist: checklistData
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "elekta-service-log-" + new Date().toISOString().slice(0,10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
  if(typeof toast === "function") toast(i18n("log_exported", "دانلود شد"));
}

/* ═══════════════════════════════════════
   EXPORT globals
   ═══════════════════════════════════════ */
