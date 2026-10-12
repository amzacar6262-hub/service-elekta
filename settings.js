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
function initSettings(){
  applyTheme(currentTheme);
  applyFontSize(currentFont);
  updateThemeSwitch();
  updateFontSwitch();
}

/* ── گوش دادن به تغییر تم سیستم ── */
if(window.matchMedia){
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
    if(currentTheme === "auto") applyTheme("auto");
  });
}

/* ── Export ── */
window.setTheme = setTheme;
window.setFontSize = setFontSize;
window.updateThemeSwitch = updateThemeSwitch;
window.updateFontSwitch = updateFontSwitch;
window.initSettings = initSettings;

/* ── Init فوری (قبل از دیگر اسکریپت‌ها) ── */
initSettings();

console.log("✅ settings.js loaded — theme: " + currentTheme + ", font: " + currentFont);