/* ═══════════════════════════════════════
   codes.js
   ═══════════════════════════════════════ */
function renderCodeChips(){
  var el = $("#codeChips");
  if(!el) return;
  var sevs = [
    { id:"all",    n:i18n("sev_all", "همه") },
    { id:"red",    n:i18n("sev_red", "بحرانی") },
    { id:"orange", n:i18n("sev_orange", "هشدار") },
    { id:"blue",   n:i18n("sev_blue", "اطلاع") }
  ];
  el.innerHTML = sevs.map(function(s){
    return '<button class="chip ' + (codeFilter === s.id ? 'on' : '') + '" onclick="codeFilter=\'' + s.id + '\';renderCodeChips();renderCodes()">' + s.n + '</button>';
  }).join("");
}

function renderCodes(){
  var list = ERRORS.filter(function(c){ return codeFilter === "all" || c.sev === codeFilter; });
  if(codeQ.trim()){
    var q = codeQ.toLowerCase();
    list = list.filter(function(c){
      return (c.code + c.title + c.act + c.machine).toLowerCase().indexOf(q) !== -1;
    });
  }
  var el = $("#codeList");
  if(!el) return;
  if(!list.length){ el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--label2)">' + i18n("ref_empty", "کدی یافت نشد") + '</div>'; return; }
  var actPrefix = i18n("act_prefix", "اقدام: ");
  el.innerHTML = list.map(function(c, i){
    return '<div class="ecode" style="animation-delay:' + (i*.02) + 's">'
      + '<div class="ecode-code ' + c.sev + '">' + c.code + '</div>'
      + '<div class="ecode-body">'
      + '<div class="ecode-t">' + c.title + '</div>'
      + '<div class="ecode-s">' + c.machine + '</div>'
      + '<div class="ecode-s" style="color:var(--blue);margin-top:4px">' + actPrefix + c.act + '</div>'
      + '</div></div>';
  }).join("");
}

function renderFavs(){
  var list = MANUALS.filter(function(m){ return favs.has(m.id); });
  var el = $("#favList");
  if(!el) return;
  if(!list.length){
    el.innerHTML = emptyState(i18n("fav_empty", "هنوز چیزی ذخیره نکردی"), i18n("fav_empty_s", "روی ستاره بزن تا اینجا بیاد"));
    return;
  }
  el.innerHTML = list.map(function(m){ return manualCard(m, false, 0); }).join("");
}

function renderMachineList(){
  var el = $("#machineList");
  if(!el) return;
  var word = i18n("manuals_word", "منوال");
  el.innerHTML = MACHINES.map(function(m, i){
    var cnt = MANUALS.filter(function(x){ return x.machines.indexOf(m) !== -1; }).length;
    var colors = ["var(--blue)","var(--green)","var(--orange)","var(--purple)","var(--pink)","var(--teal)","var(--indigo)"];
    return '<button class="row" onclick="filterMachine(\'' + m + '\')">'
      + '<div class="row-icon" style="background:' + colors[i % 7] + '">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="6" rx="2"/><path d="M8 9v4a4 4 0 0 0 8 0V9"/><circle cx="12" cy="17" r="3"/></svg>'
      + '</div>'
      + '<div class="row-body"><div class="row-title">' + m + '</div><div class="row-sub">' + fa(cnt) + ' ' + word + '</div></div>'
      + '<div class="row-chev">' + ICONS.chev + '</div>'
      + '</button>';
  }).join("");
}

function emptyState(title, sub){
  return '<div class="empty">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
    + '</svg>'
    + '<div class="empty-t">' + title + '</div>'
    + '<div>' + sub + '</div>'
    + '</div>';
}

/* ═══════════════════════════════════════
   MANUAL SHEET
   ═══════════════════════════════════════ */
