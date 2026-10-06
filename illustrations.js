/* ═══════════════════════════════════════
   illustrations.js — تصاویر SVG برای اپ
   ═══════════════════════════════════════ */

var ILLUSTRATIONS = {

/* ── Hero برای صفحه Home ── */
hero: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">'
  + '<defs>'
  +   '<linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">'
  +     '<stop offset="0" stop-color="#0A84FF"/>'
  +     '<stop offset="0.5" stop-color="#5E5CE6"/>'
  +     '<stop offset="1" stop-color="#AF52DE"/>'
  +   '</linearGradient>'
  +   '<radialGradient id="hglow" cx="0.5" cy="0.5" r="0.7">'
  +     '<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.35"/>'
  +     '<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>'
  +   '</radialGradient>'
  + '</defs>'
  + '<rect width="400" height="180" fill="url(#hg)"/>'
  + '<ellipse cx="80" cy="90" rx="200" ry="180" fill="url(#hglow)"/>'
  // Gantry arc
  + '<path d="M 60 130 A 140 140 0 0 1 340 130" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9"/>'
  // Head block
  + '<rect x="160" y="80" width="80" height="44" rx="10" fill="#FFFFFF"/>'
  + '<rect x="172" y="90" width="56" height="5" rx="2.5" fill="#5E5CE6" opacity="0.65"/>'
  + '<rect x="172" y="100" width="56" height="5" rx="2.5" fill="#5E5CE6" opacity="0.65"/>'
  + '<rect x="172" y="110" width="56" height="5" rx="2.5" fill="#5E5CE6" opacity="0.65"/>'
  // Beam
  + '<rect x="198" y="124" width="4" height="32" fill="#FFFFFF" opacity="0.85"/>'
  // Target circle
  + '<circle cx="200" cy="160" r="12" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.9"/>'
  // Couch
  + '<rect x="80" y="172" width="240" height="6" rx="3" fill="#FFFFFF" opacity="0.7"/>'
  // Dots decoration
  + '<circle cx="60" cy="30" r="3" fill="#FFFFFF" opacity="0.5"/>'
  + '<circle cx="340" cy="40" r="2" fill="#FFFFFF" opacity="0.4"/>'
  + '<circle cx="320" cy="20" r="4" fill="#FFFFFF" opacity="0.3"/>'
  + '<circle cx="50" cy="150" r="2" fill="#FFFFFF" opacity="0.35"/>'
+ '</svg>',

/* ── تصویر برای هر دسته‌بندی ── */
daily: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">'
  +   '<rect x="34" y="34" width="132" height="132" rx="16"/>'
  +   '<polyline points="60,100 90,130 145,72"/>'
  + '</g>'
+ '</svg>',

weekly: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">'
  +   '<rect x="30" y="44" width="140" height="130" rx="14"/>'
  +   '<line x1="30" y1="80" x2="170" y2="80"/>'
  +   '<line x1="64" y1="30" x2="64" y2="56"/>'
  +   '<line x1="136" y1="30" x2="136" y2="56"/>'
  +   '<circle cx="70" cy="112" r="7" fill="#000"/>'
  +   '<circle cx="100" cy="112" r="7" fill="#000"/>'
  +   '<circle cx="130" cy="112" r="7" fill="#000"/>'
  +   '<circle cx="70" cy="142" r="7" fill="#000"/>'
  +   '<circle cx="100" cy="142" r="7" fill="#000"/>'
  + '</g>'
+ '</svg>',

monthly: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="14" stroke-linecap="round" opacity="0.28">'
  +   '<circle cx="100" cy="100" r="70"/>'
  +   '<polyline points="100,58 100,100 130,120"/>'
  + '</g>'
+ '</svg>',

mlc: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g stroke="#000" stroke-width="9" stroke-linecap="round" opacity="0.28">'
  +   '<line x1="40" y1="40" x2="40" y2="160"/>'
  +   '<line x1="60" y1="30" x2="60" y2="100"/>'
  +   '<line x1="80" y1="30" x2="80" y2="140"/>'
  +   '<line x1="100" y1="30" x2="100" y2="90"/>'
  +   '<line x1="120" y1="30" x2="120" y2="150"/>'
  +   '<line x1="140" y1="30" x2="140" y2="110"/>'
  +   '<line x1="160" y1="40" x2="160" y2="160"/>'
  + '</g>'
+ '</svg>',

calib: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="12" opacity="0.28">'
  +   '<circle cx="100" cy="100" r="70"/>'
  +   '<circle cx="100" cy="100" r="42"/>'
  +   '<circle cx="100" cy="100" r="14" fill="#000"/>'
  + '</g>'
+ '</svg>',

imaging: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">'
  +   '<path d="M 30 70 L 60 70 L 72 45 L 128 45 L 140 70 L 170 70 L 170 160 L 30 160 Z"/>'
  +   '<circle cx="100" cy="112" r="26"/>'
  +   '<circle cx="100" cy="112" r="10" fill="#000"/>'
  + '</g>'
+ '</svg>',

replace: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">'
  +   '<path d="M 130 40 A 40 40 0 0 1 175 90 L 130 135 L 95 100 Z" fill="#000" opacity="0.28"/>'
  +   '<path d="M 95 100 L 40 155 L 55 170 L 110 115"/>'
  + '</g>'
+ '</svg>',

trouble: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">'
  +   '<path d="M 100 30 L 175 165 L 25 165 Z"/>'
  +   '<line x1="100" y1="80" x2="100" y2="120"/>'
  +   '<circle cx="100" cy="142" r="6" fill="#000"/>'
  + '</g>'
+ '</svg>',

/* ── پیش‌فرض ── */
default: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">'
  + '<g fill="none" stroke="#000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">'
  +   '<circle cx="100" cy="100" r="70"/>'
  + '</g>'
+ '</svg>'
};

/* آسان‌سازی دسترسی از app.js */
window.ILLUSTRATIONS = ILLUSTRATIONS;

console.log("✅ illustrations.js loaded");