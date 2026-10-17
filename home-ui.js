/* ═══════════════════════════════════════
   home-ui.js
   ═══════════════════════════════════════ */
function renderStats(){
  var stM = $("#stM"), stE = $("#stE"), stF = $("#stF");
  var abM = $("#abM"), abE = $("#abE");
  if(stM) stM.textContent = fa(MANUALS.length);
  if(stE) stE.textContent = fa(ERRORS.length);
  if(stF) stF.textContent = fa(favs.size);
  if(abM) abM.textContent = fa(MANUALS.length) + i18n("item_suffix", " مورد");
  if(abE) abE.textContent = fa(ERRORS.length) + i18n("item_suffix", " مورد");
}

function renderCats(){
  var el = $("#catGrid");
  if(!el) return;
  el.innerHTML = CATS.map(function(c, i){
    var name = i18n("cat_" + c.id, c.name);
    return '<button class="cat" style="background:linear-gradient(145deg,' + c.c1 + ' 0%,' + c.c2 + ' 100%);animation-delay:' + (i*.04) + 's" onclick="goCat(\'' + c.id + '\')">'
      + '<div class="cat-ic">' + ICONS[c.icon] + '</div>'
      + '<div class="cat-n">' + name + '</div>'
      + '</button>';
  }).join("");
}

function renderHomeFlow(){
  var el = document.getElementById("homeFlowGrid");
  if(!el) return;
  if(typeof FLOWCHARTS === "undefined" || !FLOWCHARTS.length){
    var section = el.closest(".section");
    if(section) section.style.display = "none";
    return;
  }
  var ids = ["fc-beam", "fc-mlc"];
  var list = ids.map(function(id){
    return FLOWCHARTS.find(function(f){ return f.id === id; });
  }).filter(Boolean);
  el.innerHTML = list.map(function(fc, i){
    return '<button class="cat cat-mini" ' +
      'style="background:linear-gradient(145deg,' + fc.c1 + ' 0%,' + fc.c2 + ' 100%);animation-delay:' + (i*.04) + 's" ' +
      'onclick="openFlowchart(\'' + fc.id + '\')">' +
      '<div class="cat-ic">' + (ICONS[fc.icon] || ICONS.warn) + '</div>' +
      '<div class="cat-n">' + fc.title + '</div>' +
    '</button>';
  }).join("");
}

function renderToolGrid(){
  var tools = [
    { id:"ref",     name:i18n("tool_ref",     "جداول مرجع"),   c1:"#FF3B30", c2:"#AF52DE", icon:"target", action:"go('ref')" },
    { id:"pm",      name:i18n("tool_pm",      "PM چک‌لیست"),   c1:"#32D74B", c2:"#248A3D", icon:"check",  action:"go('pm')" },
    { id:"gallery", name:i18n("tool_gallery", "گالری تصاویر"), c1:"#FF375F", c2:"#AF52DE", icon:"cam",    action:"go('gallery')" },
    { id:"pdfs",    name:i18n("tool_pdfs",    "PDFهای اصلی"),  c1:"#FF9F0A", c2:"#FF453A", icon:"doc",    action:"go('pdfs')" },
    { id:"qr",      name:i18n("tool_qr",      "اسکن QR"),      c1:"#5AC8FA", c2:"#0A84FF", icon:"grid",   action:"startScan()" }
  ];

  var html = tools.map(function(tt, i){
    return '<button class="cat cat-mini" ' +
      'style="background:linear-gradient(145deg,' + tt.c1 + ' 0%,' + tt.c2 + ' 100%);animation-delay:' + (i*.04) + 's" ' +
      'onclick="' + tt.action + '">' +
      '<div class="cat-ic">' + ICONS[tt.icon] + '</div>' +
      '<div class="cat-n">' + tt.name + '</div>' +
    '</button>';
  }).join("");

  var elHome = document.getElementById("homeToolGrid");
  if(elHome) elHome.innerHTML = html;
  var elMore = document.getElementById("toolGrid");
  if(elMore) elMore.innerHTML = html;
}

function renderHomePop(){
  var el = document.getElementById("homePop");
  if(!el) return;
  var ids = ["r1", "t1", "s1", "i1"];
  var list = ids
    .map(function(id){ return MANUALS.find(function(m){ return m.id === id; }); })
    .filter(Boolean);

  el.innerHTML = list.map(function(m, i){
    var cat = CATS.find(function(c){ return c.id === m.cat; }) || CATS[0];
    return '<button class="cat cat-mini" ' +
      'style="background:linear-gradient(145deg,' + cat.c1 + ' 0%,' + cat.c2 + ' 100%);animation-delay:' + (i*.04) + 's" ' +
      'onclick="openManual(\'' + m.id + '\')">' +
      '<span class="cat-badge-top">' + m.code + '</span>' +
      '<div class="cat-ic">' + ICONS[cat.icon] + '</div>' +
      '<div class="cat-n">' + escHtml(m.title) + '</div>' +
    '</button>';
  }).join("");
}

function levelClass(level){
  if(!level) return "mid";
  var s = String(level);
  if(s.indexOf("پیشرفته") !== -1 || /advanced/i.test(s)) return "high";
  if(s.indexOf("مبتدی") !== -1 || s.indexOf("پایه") !== -1 || /beginner/i.test(s)) return "low";
  return "mid";
}

