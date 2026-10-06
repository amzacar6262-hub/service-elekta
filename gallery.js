/* ═══════════════════════════════════════
   gallery.js — گالری تصاویر واقعی
   برای اضافه کردن عکس جدید: فایل رو در ریپو
   با نام دلخواه آپلود کن و اینجا اضافه کن
   ═══════════════════════════════════════ */

const GALLERY_CATS = [
  { id:"all",       name:"همه" },
  { id:"parts",     name:"قطعات" },
  { id:"repair",    name:"تعمیرات" },
  { id:"install",   name:"نصب" },
  { id:"mlc",       name:"MLC" },
  { id:"rf",        name:"RF و Magnetron" },
  { id:"imaging",   name:"تصویربرداری" },
  { id:"cooling",   name:"خنک‌کننده" },
  { id:"tools",     name:"ابزار" }
];

/* ────────────────────────────────────────
   برای اضافه کردن عکس جدید:
   1. فایل رو در پوشه images/ ریپو آپلود کن
   2. اینجا یک آبجکت جدید اضافه کن:
      { id:"g_unique", src:"./images/file.jpg",
        title:"عنوان", cat:"parts" }
   ──────────────────────────────────────── */
const GALLERY_IMAGES = [
  /* نمونه — بعد از آپلود عکس‌های واقعی جایگزین کن */
  /* { id:"g1", src:"./images/magnetron.jpg", title:"Magnetron پس از تعویض", cat:"rf" }, */
];

let galleryFilter = "all";
let lightboxIndex = 0;
let lightboxList = [];

function renderGalleryChips(){
  const el = document.getElementById("galleryCats");
  if(!el) return;
  el.innerHTML = GALLERY_CATS.map(c => {
    const count = c.id === "all"
      ? GALLERY_IMAGES.length
      : GALLERY_IMAGES.filter(i => i.cat === c.id).length;
    if(c.id !== "all" && count === 0) return "";
    return '<button class="gallery-chip ' + (galleryFilter === c.id ? 'on' : '') + '" ' +
           'onclick="setGalleryFilter(\'' + c.id + '\')">' +
           c.name +
           '<span class="dot"></span>' +
           fa(count) +
           '</button>';
  }).join("");
}

function setGalleryFilter(id){
  galleryFilter = id;
  renderGalleryChips();
  renderGallery();
}

function renderGallery(){
  const el = document.getElementById("galleryGrid");
  if(!el) return;

  const list = galleryFilter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(i => i.cat === galleryFilter);

  if(!list.length){
    el.innerHTML =
      '<div class="gallery-empty">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
          '<circle cx="9" cy="9" r="2"/>' +
          '<path d="M21 15l-5-5L5 21"/>' +
        '</svg>' +
        '<div class="gallery-empty-t">گالری خالی است</div>' +
        '<div class="gallery-empty-s">برای اضافه کردن عکس، فایل رو در پوشه images ریپو آپلود کن و در فایل gallery.js اضافه کن</div>' +
      '</div>';
    return;
  }

  el.innerHTML = list.map((img, i) => {
    const cat = GALLERY_CATS.find(c => c.id === img.cat);
    const catName = cat ? cat.name : "";
    return '<div class="gallery-item" style="animation-delay:' + (i * .04) + 's" ' +
           'onclick="openLightbox(' + i + ')">' +
      '<img src="' + img.src + '" alt="' + (img.title || '') + '" loading="lazy" />' +
      '<div class="gallery-item-info">' +
        (catName ? '<span class="gallery-item-cat">' + catName + '</span>' : '') +
        '<div class="gallery-item-title">' + (img.title || '') + '</div>' +
      '</div>' +
    '</div>';
  }).join("");
}

/* ── Lightbox ── */
function openLightbox(index){
  lightboxList = galleryFilter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(i => i.cat === galleryFilter);
  if(!lightboxList.length) return;

  lightboxIndex = index;
  const lb = document.getElementById("lightbox");
  if(!lb) return;
  lb.classList.add("show");
  updateLightbox();
  if(navigator.vibrate) navigator.vibrate(8);
}

function closeLightbox(){
  const lb = document.getElementById("lightbox");
  if(lb) lb.classList.remove("show");
}

function updateLightbox(){
  const img = lightboxList[lightboxIndex];
  if(!img) return;
  const el = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  const cnt = document.getElementById("lightboxCounter");
  if(el){
    el.src = img.src;
    el.alt = img.title || "";
    el.style.animation = "none";
    setTimeout(() => el.style.animation = "", 10);
  }
  if(cap) cap.textContent = img.title || "";
  if(cnt) cnt.textContent = fa(lightboxIndex + 1) + " / " + fa(lightboxList.length);
}

function lightboxNext(){
  if(lightboxIndex < lightboxList.length - 1){
    lightboxIndex++;
    updateLightbox();
    if(navigator.vibrate) navigator.vibrate(5);
  }
}

function lightboxPrev(){
  if(lightboxIndex > 0){
    lightboxIndex--;
    updateLightbox();
    if(navigator.vibrate) navigator.vibrate(5);
  }
}

/* Swipe در Lightbox */
(function(){
  let startX = 0, startY = 0;
  document.addEventListener("touchstart", function(e){
    const lb = document.getElementById("lightbox");
    if(!lb || !lb.classList.contains("show")) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive:true });
  document.addEventListener("touchend", function(e){
    const lb = document.getElementById("lightbox");
    if(!lb || !lb.classList.contains("show")) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if(Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)){
      if(dx < 0) lightboxNext();
      else lightboxPrev();
    } else if(dy > 100 && Math.abs(dy) > Math.abs(dx)){
      closeLightbox();
    }
  }, { passive:true });
})();

/* راهنمای افزودن عکس */
function toggleGalleryEdit(){
  if(typeof toast === "function"){
    toast("برای افزودن عکس، فایل‌ها را در پوشه images آپلود کن");
  }
}

window.GALLERY_IMAGES = GALLERY_IMAGES;
window.renderGallery = renderGallery;
window.renderGalleryChips = renderGalleryChips;
window.setGalleryFilter = setGalleryFilter;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.lightboxNext = lightboxNext;
window.lightboxPrev = lightboxPrev;
window.toggleGalleryEdit = toggleGalleryEdit;

console.log("✅ gallery.js loaded");