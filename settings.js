/* ═══════════════════════════════════════
   settings.js — تم و اندازه فونت
   ═══════════════════════════════════════ */

const THEME_KEY = "elekta_theme";
const FONT_KEY = "elekta_font";

let currentTheme = (window.Elekta && Elekta.storage)
  ? Elekta.storage.getRaw(THEME_KEY, "auto")
  : (localStorage.getItem(THEME_KEY) || "auto");
let currentFont = (window.Elekta && Elekta.storage)
  ? Elekta.storage.getRaw(FONT_KEY, "md")
  : (localStorage.getItem(FONT_KEY) || "md");

/* ── تم ── */
function applyTheme(theme){
  if(theme === "light" || theme === "dark"){
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } else {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.colorScheme = "";
  }
  /* به‌روزرسانی meta theme-color */
  var meta = document.querySelector('meta[name="theme-color"]');
  if(meta){
    var isDark = (theme === "dark") ||
      (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    meta.setAttribute("content", isDark ? "#000000" : "#F2F2F7");
  }
}

function setTheme(theme){
  currentTheme = theme;
  if (window.Elekta && Elekta.storage) Elekta.storage.setRaw(THEME_KEY, theme);
  else try { localStorage.setItem(THEME_KEY, theme); } catch(e){}
  applyTheme(theme);
  if(typeof applyGlassIntensity === "function") applyGlassIntensity(currentGlass);
  updateThemeSwitch();
  if(navigator.vibrate) navigator.vibrate(8);
  if(typeof toast === "function"){
    var msg = theme === "auto" ? "Auto"
      : (theme === "dark" ? (typeof t === "function" && t("row_theme") === "تم" ? "تاریک" : "Dark") : (typeof t === "function" && t("row_theme") === "تم" ? "روشن" : "Light"));
    toast(msg);
  }
}

function updateThemeSwitch(){
  var seg = document.getElementById("themeSeg");
  if(!seg) return;
  seg.querySelectorAll("button").forEach(function(b){
    b.classList.toggle("on", b.getAttribute("data-theme") === currentTheme);
  });
}

/* ── اندازه فونت ── */
function applyFontSize(size){
  if(size !== "sm" && size !== "md" && size !== "lg") size = "md";
  document.documentElement.setAttribute("data-font", size);
}

function setFontSize(size){
  currentFont = size;
  if (window.Elekta && Elekta.storage) Elekta.storage.setRaw(FONT_KEY, size);
  else try { localStorage.setItem(FONT_KEY, size); } catch(e){}
  applyFontSize(size);
  updateFontSwitch();
  if(navigator.vibrate) navigator.vibrate(8);
}

function updateFontSwitch(){
  var seg = document.getElementById("fontSeg");
  if(!seg) return;
  seg.querySelectorAll("button").forEach(function(b){
    b.classList.toggle("on", b.getAttribute("data-font") === currentFont);
  });
}

/* ── Initialize ── */

/* ── Liquid Glass intensity (iOS 27 style) ── */
const GLASS_KEY = "elekta_glass";
let currentGlass = 55;
try {
  var _g = (window.Elekta && Elekta.storage)
    ? Elekta.storage.getRaw(GLASS_KEY, "55")
    : (localStorage.getItem(GLASS_KEY) || "55");
  currentGlass = parseInt(_g, 10);
  if (isNaN(currentGlass)) currentGlass = 55;
} catch(e){ currentGlass = 55; }

function applyGlassIntensity(val){
  val = Math.max(0, Math.min(100, parseInt(val, 10) || 55));
  currentGlass = val;
  var root = document.documentElement;
  var t = val / 100;
  var alpha = 0.38 + t * 0.42;
  var alphaStrong = 0.52 + t * 0.38;
  var blur = Math.round(28 + (1 - t) * 24);
  var borderA = 0.08 + (1 - t) * 0.12;
  var specA = 0.12 + (1 - t) * 0.18;

  root.style.setProperty("--glass-blur", blur + "px");
  root.style.setProperty("--glass-bg", "rgba(28,28,30," + alpha.toFixed(2) + ")");
  root.style.setProperty("--glass-bg-strong", "rgba(28,28,30," + alphaStrong.toFixed(2) + ")");
  root.style.setProperty("--glass-border", "rgba(255,255,255," + borderA.toFixed(2) + ")");
  root.style.setProperty("--glass-spec", "rgba(255,255,255," + specA.toFixed(2) + ")");

  var isLight = root.getAttribute("data-theme") === "light" ||
    (!root.getAttribute("data-theme") && window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches);
  if (isLight) {
    var la = 0.50 + t * 0.40;
    var ls = 0.62 + t * 0.30;
    root.style.setProperty("--glass-bg", "rgba(255,255,255," + la.toFixed(2) + ")");
    root.style.setProperty("--glass-bg-strong", "rgba(255,255,255," + ls.toFixed(2) + ")");
    root.style.setProperty("--glass-border", "rgba(255,255,255," + (0.35 + t * 0.3).toFixed(2) + ")");
    root.style.setProperty("--glass-spec", "rgba(255,255,255," + (0.7 + t * 0.2).toFixed(2) + ")");
  }

  var slider = document.getElementById("glassSlider");
  if (slider && String(slider.value) !== String(val)) slider.value = val;
}

function setGlassIntensity(val){
  applyGlassIntensity(val);
  if (window.Elekta && Elekta.storage) Elekta.storage.setRaw(GLASS_KEY, String(currentGlass));
  else try { localStorage.setItem(GLASS_KEY, String(currentGlass)); } catch(e){}
  if (navigator.vibrate) navigator.vibrate(4);
}

function initSettings(){
  applyTheme(currentTheme);
  applyFontSize(currentFont);
  applyGlassIntensity(currentGlass);
  updateThemeSwitch();
  updateFontSwitch();
  var gs = document.getElementById("glassSlider");
  if(gs) gs.value = currentGlass;
}

if(window.matchMedia){
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
    if(currentTheme === "auto") {
      applyTheme("auto");
      applyGlassIntensity(currentGlass);
    }
  });
}

window.setTheme = setTheme;
window.setFontSize = setFontSize;
window.setGlassIntensity = setGlassIntensity;
window.applyGlassIntensity = applyGlassIntensity;
window.updateThemeSwitch = updateThemeSwitch;
window.updateFontSwitch = updateFontSwitch;
window.initSettings = initSettings;

initSettings();
