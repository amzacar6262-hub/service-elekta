/* ═══════════════════════════════════════
   gallery.js — گالری با ذخیره‌سازی محلی
   IndexedDB برای عکس‌های کاربر
   ═══════════════════════════════════════ */

const GALLERY_CATS = [
  { id:"all",     name:"همه" },
  { id:"parts",   name:"قطعات" },
  { id:"repair",  name:"تعمیرات" },
  { id:"install", name:"نصب" },
  { id:"mlc",     name:"MLC" },
  { id:"rf",      name:"RF و Magnetron" },
  { id:"imaging", name:"تصویربرداری" },
  { id:"cooling", name:"خنک‌کننده" },
  { id:"tools",   name:"ابزار" }
];

/* عکس‌های پیش‌فرض (اختیاری) — قابل نگه‌داشتن یا حذف */
const GALLERY_IMAGES = [];

/* ── متغیرهای state ── */
let galleryFilter = "all";
let lightboxIndex = 0;
let lightboxList = [];
let localPhotos = [];  /* عکس‌های ذخیره‌شده در IndexedDB */
let pendingPhoto = null;  /* عکس در حال افزودن */
let pendingCategory = "parts";
let pendingMachine = "";

/* ═══════════════════════════════════════
   IndexedDB
   ═══════════════════════════════════════ */
const PHOTO_DB = "elekta-gallery-db";
const PHOTO_STORE = "photos";
let photoDB = null;

function openPhotoDB(){
  return new Promise(function(resolve, reject){
    if(photoDB){ resolve(photoDB); return; }
    const req = indexedDB.open(PHOTO_DB, 1);
    req.onupgradeneeded = function(e){
      const db = e.target.result;
      if(!db.objectStoreNames.contains(PHOTO_STORE)){
        const store = db.createObjectStore(PHOTO_STORE, { keyPath:"id" });
        store.createIndex("added", "added", { unique:false });
      }
    };
    req.onsuccess = function(e){
      photoDB = e.target.result;
      resolve(photoDB);
    };
    req.onerror = function(){ reject(req.error); };
  });
}

async function photoSave(photo){
  const db = await openPhotoDB();
  return new Promise(function(resolve, reject){
    const tx = db.transaction(PHOTO_STORE, "readwrite");
    tx.objectStore(PHOTO_STORE).put(photo);
    tx.oncomplete = function(){ resolve(); };
    tx.onerror = function(){ reject(tx.error); };
  });
}

async function photoGetAll(){
  const db = await openPhotoDB();
  return new Promise(function(resolve, reject){
    const tx = db.transaction(PHOTO_STORE, "readonly");
    const req = tx.objectStore(PHOTO_STORE).getAll();
    req.onsuccess = function(){ resolve(req.result || []); };
    req.onerror = function(){ reject(req.error); };
  });
}

async function photoDelete(id){
  const db = await openPhotoDB();
  return new Promise(function(resolve, reject){
    const tx = db.transaction(PHOTO_STORE, "readwrite");
    tx.objectStore(PHOTO_STORE).delete(id);
    tx.oncomplete = function(){ resolve(); };
    tx.onerror = function(){ reject(tx.error); };
  });
}

/* بارگذاری عکس‌های محلی */
async function loadLocalPhotos(){
  try {
    const arr = await photoGetAll();
    /* مرتب‌سازی — جدیدترین اول */
    localPhotos = arr.sort(function(a, b){ return (b.added || 0) - (a.added || 0); });
  } catch(e){
    console.warn("loadLocalPhotos failed:", e);
    localPhotos = [];
  }
}

/* ═══════════════════════════════════════
   Resize + فشرده‌سازی عکس
   ═══════════════════════════════════════ */
function resizeImage(file, maxSize, quality){
  return new Promise(function(resolve, reject){
    const reader = new FileReader();
    reader.onload = function(e){
      const img = new Image();
      img.onload = function(){
        let w = img.width, h = img.height;
        if(w > maxSize || h > maxSize){
          const ratio = Math.min(maxSize / w, maxSize / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#1C1C1E";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = function(){ reject(new Error("image load failed")); };
      img.src = e.target.result;
    };
    reader.onerror = function(){ reject(reader.error); };
    reader.readAsDataURL(file);
  });
}

/* ═══════════════════════════════════════
   انتخاب عکس
   ═══════════════════════════════════════ */
function pickGalleryImage(){
  const inp = document.getElementById("galleryFileInput");
  if(!inp) return;
  inp.value = "";
  inp.click();
}

async function handleGalleryFileSelect(e){
  const file = e.target.files && e.target.files[0];
  if(!file) return;

  if(!file.type.startsWith("image/")){
    if(typeof toast === "function") toast("فقط فایل تصویری مجاز است");
    return;
  }

  if(typeof toast === "function") toast("در حال پردازش عکس...");

  try {
    /* Resize به حداکثر ۱۶۰۰px و کیفیت ۸۵٪ */
    const dataUrl = await resizeImage(file, 1600, 0.85);
    pendingPhoto = dataUrl;
    pendingCategory = "parts";
    pendingMachine = "";
    openAddPhotoSheet(dataUrl);
  } catch(err){
    console.warn(err);
    if(typeof toast === "function") toast("خطا در پردازش عکس");
  }
}

/* ═══════════════════════════════════════
   Sheet افزودن
   ═══════════════════════════════════════ */
function openAddPhotoSheet(dataUrl){
  const sheet = document.getElementById("addPhotoSheet");
  const backdrop = document.getElementById("addPhotoBackdrop");
  const preview = document.getElementById("addPhotoPreview");
  if(!sheet || !backdrop || !preview) return;

  preview.src = dataUrl;
  document.getElementById("addPhotoTitle").value = "";
  document.getElementById("addPhotoNotes").value = "";

  renderAddPhotoCats();
  renderAddPhotoMachines();

  backdrop.classList.add("show");
  sheet.classList.add("show");
}

function closeAddPhotoSheet(){
  const sheet = document.getElementById("addPhotoSheet");
  const backdrop = document.getElementById("addPhotoBackdrop");
  if(sheet) sheet.classList.remove("show");
  if(backdrop) backdrop.classList.remove("show");
  setTimeout(function(){ pendingPhoto = null; }, 350);
}

function renderAddPhotoCats(){
  const el = document.getElementById("addPhotoCats");
  if(!el) return;
  el.innerHTML = GALLERY_CATS
    .filter(function(c){ return c.id !== "all"; })
    .map(function(c){
      return '<button class="add-photo-cat ' + (pendingCategory === c.id ? 'on' : '') + '" ' +
             'onclick="selectAddPhotoCat(\'' + c.id + '\')">' +
             c.name +
             '</button>';
    }).join("");
}

function selectAddPhotoCat(id){
  pendingCategory = id;
  renderAddPhotoCats();
  if(navigator.vibrate) navigator.vibrate(5);
}

function renderAddPhotoMachines(){
  const el = document.getElementById("addPhotoMachines");
  if(!el) return;
  const machines = ["Synergy","Infinity","Versa HD","Axesse","Unity","Precise","Compact","Flexitron"];
  el.innerHTML = machines.map(function(m){
    return '<button class="add-photo-cat ' + (pendingMachine === m ? 'on' : '') + '" ' +
           'onclick="selectAddPhotoMachine(\'' + m + '\')">' +
           m +
           '</button>';
  }).join("");
}

function selectAddPhotoMachine(m){
  pendingMachine = (pendingMachine === m) ? "" : m;
  renderAddPhotoMachines();
  if(navigator.vibrate) navigator.vibrate(5);
}

/* ═══════════════════════════════════════
   ذخیره عکس جدید
   ═══════════════════════════════════════ */
async function saveNewPhoto(){
  if(!pendingPhoto){
    if(typeof toast === "function") toast("عکسی انتخاب نشده");
    return;
  }
  const title = (document.getElementById("addPhotoTitle").value || "").trim();
  if(!title){
    if(typeof toast === "function") toast("عنوان را وارد کنید");
    document.getElementById("addPhotoTitle").focus();
    return;
  }
  const notes = (document.getElementById("addPhotoNotes").value || "").trim();
  const photo = {
    id: "p_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7),
    src: pendingPhoto,
    title: title,
    notes: notes,
    cat: pendingCategory,
    machine: pendingMachine,
    added: Date.now(),
    local: true
  };

  try {
    await photoSave(photo);
    localPhotos.unshift(photo);
    closeAddPhotoSheet();
    renderGalleryChips();
    renderGallery();
    if(typeof toast === "function") toast("عکس ذخیره شد ✓");
    if(navigator.vibrate) navigator.vibrate([15, 30, 15]);
  } catch(err){
    console.warn(err);
    if(typeof toast === "function") toast("خطا در ذخیره عکس");
  }
}

/* ═══════════════════════════════════════
   رندر گالری
   ═══════════════════════════════════════ */
function getAllImages(){
  /* عکس‌های پیش‌فرض + عکس‌های محلی */
  return GALLERY_IMAGES.concat(localPhotos);
}

function renderGalleryChips(){
  const el = document.getElementById("galleryCats");
  if(!el) return;
  const all = getAllImages();
  el.innerHTML = GALLERY_CATS.map(function(c){
    const count = c.id === "all"
      ? all.length
      : all.filter(function(i){ return i.cat === c.id; }).length;
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
  const all = getAllImages();
  const list = galleryFilter === "all"
    ? all
    : all.filter(function(i){ return i.cat === galleryFilter; });

  if(!list.length){
    el.innerHTML =
      '<div class="gallery-empty">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
          '<circle cx="9" cy="9" r="2"/>' +
          '<path d="M21 15l-5-5L5 21"/>' +
        '</svg>' +
        '<div class="gallery-empty-t">گالری خالی است</div>' +
        '<div class="gallery-empty-s">با دکمه + بالا، اولین عکس سرویس را اضافه کن</div>' +
      '</div>';
    return;
  }

  el.innerHTML = list.map(function(img, i){
    const cat = GALLERY_CATS.find(function(c){ return c.id === img.cat; });
    const catName = cat ? cat.name : "";
    return '<div class="gallery-item" style="animation-delay:' + (i * .04) + 's" ' +
           'onclick="openLightbox(' + i + ')">' +
      '<img src="' + img.src + '" alt="' + (img.title || '') + '" loading="lazy" />' +
      (img.local ? '<span class="gallery-item-local-badge">محلی</span>' : '') +
      '<div class="gallery-item-info">' +
        (catName ? '<span class="gallery-item-cat">' + catName + '</span>' : '') +
        '<div class="gallery-item-title">' + (img.title || '') + '</div>' +
      '</div>' +
    '</div>';
  }).join("");
}

/* ═══════════════════════════════════════
   Lightbox
   ═══════════════════════════════════════ */
function openLightbox(index){
  const all = getAllImages();
  lightboxList = galleryFilter === "all"
    ? all
    : all.filter(function(i){ return i.cat === galleryFilter; });
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
  const delBtn = document.getElementById("lightboxDeleteBtn");
  if(el){
    el.src = img.src;
    el.alt = img.title || "";
    el.style.animation = "none";
    setTimeout(function(){ el.style.animation = ""; }, 10);
  }
  if(cap) cap.textContent = img.title || "";
  if(cnt) cnt.textContent = fa(lightboxIndex + 1) + " / " + fa(lightboxList.length);
  /* دکمه حذف فقط برای عکس‌های محلی */
  if(delBtn){
    delBtn.style.display = img.local ? "grid" : "none";
  }
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

/* حذف عکس فعلی */
async function deleteCurrentPhoto(){
  const img = lightboxList[lightboxIndex];
  if(!img || !img.local) return;
  if(!confirm("این عکس حذف شود؟")) return;

  try {
    await photoDelete(img.id);
    localPhotos = localPhotos.filter(function(p){ return p.id !== img.id; });

    /* به‌روزرسانی لیست lightbox */
    lightboxList = lightboxList.filter(function(p){ return p.id !== img.id; });

    if(!lightboxList.length){
      closeLightbox();
    } else {
      if(lightboxIndex >= lightboxList.length) lightboxIndex = lightboxList.length - 1;
      updateLightbox();
    }

    renderGalleryChips();
    renderGallery();
    if(typeof toast === "function") toast("عکس حذف شد");
    if(navigator.vibrate) navigator.vibrate([10, 40, 10]);
  } catch(err){
    console.warn(err);
    if(typeof toast === "function") toast("خطا در حذف");
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

/* اتصال input به event */
document.addEventListener("DOMContentLoaded", function(){
  const inp = document.getElementById("galleryFileInput");
  if(inp) inp.addEventListener("change", handleGalleryFileSelect);
});

/* Export */
window.pickGalleryImage = pickGalleryImage;
window.saveNewPhoto = saveNewPhoto;
window.closeAddPhotoSheet = closeAddPhotoSheet;
window.selectAddPhotoCat = selectAddPhotoCat;
window.selectAddPhotoMachine = selectAddPhotoMachine;
window.renderGallery = renderGallery;
window.renderGalleryChips = renderGalleryChips;
window.setGalleryFilter = setGalleryFilter;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.lightboxNext = lightboxNext;
window.lightboxPrev = lightboxPrev;
window.deleteCurrentPhoto = deleteCurrentPhoto;
window.loadLocalPhotos = loadLocalPhotos;

/* Init */
(async function initGallery(){
  await loadLocalPhotos();
  renderGalleryChips();
  renderGallery();
  console.log("✅ gallery.js ready — " + localPhotos.length + " local photos");
})();