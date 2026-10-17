/* ═══════════════════════════════════════
   library.js
   ═══════════════════════════════════════ */
function manualCard(m, compact, delay){
  if(delay === undefined) delay = 0;
  var cat = CATS.find(function(c){ return c.id === m.cat; }) || CATS[0];
  var isFav = favs.has(m.id);
  var grad = "linear-gradient(145deg," + cat.c1 + " 0%," + cat.c2 + " 100%)";
  return '<div class="manual" style="animation-delay:' + delay + 's" onclick="openManual(\'' + m.id + '\')">'
    + '<div class="manual-ic" style="background:' + grad + '">' + ICONS[cat.icon] + '</div>'
    + '<div class="manual-body">'
    + '<div class="manual-title">' + escHtml(m.title) + '</div>'
    + (compact ? '' : '<div class="manual-sub">' + escHtml(m.summary || '') + '</div>')
    + '<div class="manual-meta">'
    + '<span class="badge badge-code">' + escHtml(m.code || '') + '</span>'
    + (m.duration ? '<span class="badge badge-time">' + escHtml(m.duration) + '</span>' : '')
    + (m.level ? '<span class="badge badge-level badge-level-' + levelClass(m.level) + '">' + escHtml(m.level) + '</span>' : '')
    + '</div></div>'
    + '<button class="manual-fav ' + (isFav ? 'on' : '') + '" onclick="event.stopPropagation();toggleFav(\'' + m.id + '\')">'
    + (isFav ? ICONS.starFill : ICONS.star)
    + '</button></div>';
}

function renderLibChips(){
  var el = $("#libChips");
  if(!el) return;
  var all = [{ id:"all", name:i18n("chip_all", "همه") }].concat(CATS.map(function(c){
    return { id:c.id, name: i18n("cat_" + c.id, c.name) };
  }));
  el.innerHTML = all.map(function(c){
    return '<button class="chip ' + (libFilter === c.id ? 'on' : '') + '" onclick="libFilter=\'' + c.id + '\';renderLibChips();renderLib()">' + c.name + '</button>';
  }).join("");
}

function renderLib(){
  var list = MANUALS.filter(function(m){ return libFilter === "all" || m.cat === libFilter; });
  if(libQ.trim()){
    if (typeof filterManualsFast === "function") {
      list = filterManualsFast(list, libQ);
    } else {
      var q = libQ.toLowerCase();
      list = list.filter(function(m){
        return (m.title + (m.summary||"") + (m.code||"") + ((m.machines||[]).join(" "))).toLowerCase().indexOf(q) !== -1;
      });
    }
  }
  var el = $("#libList");
  if(!el) return;
  if(!list.length){ el.innerHTML = emptyState(i18n("ref_empty", "منوالی یافت نشد"), i18n("ref_empty_sub", "فیلتر را تغییر دهید")); return; }
  el.innerHTML = list.map(function(m, i){ return manualCard(m, false, i*.04); }).join("");
}

