/* ═══════════════════════════════════════
   qr.js — QR Scanner (Global Scope)
   کاملاً مستقل از app.js
   ═══════════════════════════════════════ */

var QR_MACHINES = {
  "ELEKTA-SYN-01":"Synergy",
  "ELEKTA-SYN-02":"Synergy",
  "ELEKTA-INF-01":"Infinity",
  "ELEKTA-INF-02":"Infinity",
  "ELEKTA-VHD-01":"Versa HD",
  "ELEKTA-AXS-01":"Axesse",
  "ELEKTA-UNI-01":"Unity",
  "ELEKTA-PRC-01":"Precise",
  "ELEKTA-CMP-01":"Compact",
  "ELEKTA-FLX-01":"Flexitron",
  "SYN":"Synergy",
  "INF":"Infinity",
  "VHD":"Versa HD",
  "AXS":"Axesse",
  "UNI":"Unity",
  "PRC":"Precise",
  "CMP":"Compact",
  "FLX":"Flexitron"
};
const ASSETS = ["./", "./index.html", "./manifest.json", "./style.css", "./data.js", "./data2.js", "./app.js", "./qr.js"];
var __scanStream = null;
var __scanDetector = null;
var __scanRAF = null;
var __scanFacingMode = "environment";

/* ── شروع اسکن ── */
function startScan(){
  var overlay = document.getElementById("scanOverlay");
  var video = document.getElementById("scanVideo");
  if(!overlay){
    console.warn("scanOverlay not found");
    if(typeof toast === "function") toast("صفحه اسکن یافت نشد");
    return;
  }
  overlay.classList.add("show");

  if(!("BarcodeDetector" in window)){
    if(typeof toast === "function") toast("اسکن خودکار پشتیبانی نمی‌شود");
    setTimeout(function(){
      stopScan();
      openManualQR();
    }, 800);
    return;
  }
  startCamera();
}

function startCamera(){
  var video = document.getElementById("scanVideo");
  if(!video) return;

  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    if(typeof toast === "function") toast("مرورگر از دوربین پشتیبانی نمی‌کند");
    setTimeout(openManualQR, 1200);
    return;
  }

  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: __scanFacingMode },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  }).then(function(stream){
    __scanStream = stream;
    video.srcObject = stream;
    video.play().catch(function(){});
    startDetection(video);
  }).catch(function(err){
    console.warn("Camera error:", err);
    var msg = "خطا در باز کردن دوربین";
    if(err.name === "NotAllowedError" || err.name === "PermissionDeniedError"){
      msg = "اجازه دوربین داده نشد — Settings → Safari → Camera → Allow";
    } else if(err.name === "NotFoundError"){
      msg = "دوربینی یافت نشد";
    } else if(err.name === "NotReadableError"){
      msg = "دوربین در دسترس نیست";
    }
    if(typeof toast === "function") toast(msg);
    setTimeout(openManualQR, 1800);
  });
}

function startDetection(video){
  var detector;
  try {
    detector = new BarcodeDetector({ formats: ["qr_code"] });
  } catch(e){
    setTimeout(openManualQR, 1200);
    return;
  }
  __scanDetector = detector;

  var tick = function(){
    if(!__scanStream || !video) return;
    detector.detect(video).then(function(codes){
      if(codes && codes.length && codes[0].rawValue){
        handleQRResult(codes[0].rawValue);
        return;
      }
      __scanRAF = requestAnimationFrame(tick);
    }).catch(function(){
      __scanRAF = requestAnimationFrame(tick);
    });
  };
  tick();
}

/* ── توقف اسکن ── */
function stopScan(){
  var overlay = document.getElementById("scanOverlay");
  if(overlay) overlay.classList.remove("show");
  if(__scanRAF){ cancelAnimationFrame(__scanRAF); __scanRAF = null; }
  if(__scanStream){
    __scanStream.getTracks().forEach(function(t){ t.stop(); });
    __scanStream = null;
  }
  var video = document.getElementById("scanVideo");
  if(video) video.srcObject = null;
  __scanDetector = null;
}

/* ── تغییر دوربین ── */
function toggleScanCamera(){
  __scanFacingMode = (__scanFacingMode === "environment") ? "user" : "environment";
  stopScan();
  setTimeout(startScan, 200);
}

/* ── پردازش نتیجه ── */
function handleQRResult(value){
  var clean = String(value || "").trim().toUpperCase();
  if(!clean) return;

  if(navigator.vibrate) navigator.vibrate(30);
  flashScanSuccess();

  var machine = QR_MACHINES[clean];

  if(!machine && clean.indexOf("ELEKTA-") === 0){
    var parts = clean.split("-");
    if(parts.length >= 3){
      var mid = parts[1];
      if(QR_MACHINES[mid]) machine = QR_MACHINES[mid];
      else if(QR_MACHINES["ELEKTA-" + mid + "-01"]) machine = QR_MACHINES["ELEKTA-" + mid + "-01"];
    }
  }

  setTimeout(function(){
    stopScan();
    if(machine){
      try {
        if(typeof libFilter !== "undefined") libFilter = "all";
        if(typeof libQ !== "undefined") libQ = machine;
        if(typeof renderLibChips === "function") renderLibChips();
        if(typeof renderLib === "function") renderLib();
        if(typeof go === "function") go("lib");
        var inp = document.querySelector("#page-lib .search-inner input");
        if(inp) inp.value = machine;
      } catch(e){ console.warn(e); }
      if(typeof toast === "function") toast("دستگاه: " + machine);
    } else {
      if(typeof toast === "function") toast("کد ناشناخته: " + clean);
      setTimeout(openManualQR, 400);
    }
  }, 250);
}

function flashScanSuccess(){
  var f = document.querySelector(".scan-success-flash");
  if(!f){
    f = document.createElement("div");
    f.className = "scan-success-flash";
    document.body.appendChild(f);
  }
  f.classList.add("show");
  setTimeout(function(){ f.classList.remove("show"); }, 350);
}

/* ── ورود دستی ── */
function openManualQR(){
  var overlay = document.getElementById("qrInputOverlay");
  if(!overlay){
    overlay = document.createElement("div");
    overlay.id = "qrInputOverlay";
    overlay.className = "qr-input-overlay";
    overlay.innerHTML =
      '<div class="qr-input-box">' +
        '<div class="qr-input-title">کد دستگاه را وارد کنید</div>' +
        '<div class="qr-input-hint">مثال: ELEKTA-SYN-01 یا SYN</div>' +
        '<input type="text" id="qrManualInput" class="qr-input-field" placeholder="ELEKTA-XXX-XX" autocomplete="off" />' +
        '<div class="qr-input-actions">' +
          '<button class="qr-btn-cancel" id="qrCancel">انصراف</button>' +
          '<button class="qr-btn-ok" id="qrOk">تایید</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    document.getElementById("qrCancel").addEventListener("click", function(){
      overlay.classList.remove("show");
    });
    document.getElementById("qrOk").addEventListener("click", function(){
      var v = document.getElementById("qrManualInput").value;
      overlay.classList.remove("show");
      if(v.trim()) handleQRResult(v);
    });
    document.getElementById("qrManualInput").addEventListener("keydown", function(e){
      if(e.key === "Enter") document.getElementById("qrOk").click();
    });
  }
  overlay.classList.add("show");
  setTimeout(function(){
    var inp = document.getElementById("qrManualInput");
    if(inp) inp.focus();
  }, 150);
}

function closeQRInput(){
  var o = document.getElementById("qrInputOverlay");
  if(o) o.classList.remove("show");
}

function submitQRManual(){
  var inp = document.getElementById("qrManualInput");
  if(!inp) return;
  var v = inp.value.trim();
  if(!v){ if(typeof toast === "function") toast("کدی وارد نشده"); return; }
  closeQRInput();
  handleQRResult(v);
}

/* ── Export to global ── */
window.startScan = startScan;
window.stopScan = stopScan;
window.toggleScanCamera = toggleScanCamera;
window.openManualQR = openManualQR;
window.closeQRInput = closeQRInput;
window.submitQRManual = submitQRManual;
window.handleQRResult = handleQRResult;

console.log("✅ qr.js loaded — startScan available globally");