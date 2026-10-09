/* ═══════════════════════════════════════
   i18n.js — دوزبانه (فارسی / English)
   نسخه ۴.۰ — سرویس‌محور
   ═══════════════════════════════════════ */

const I18N = {
  fa: {
    /* ── Tabs ── */
    tab_home:       "خانه",
    tab_lib:        "کتابخانه",
    tab_gallery:    "گالری",
    tab_codes:      "کد خطا",
    tab_fav:        "ذخیره",

    /* ── Home ── */
    home_sub:       "سرویس، تعمیر و نگهداری",
    stat_manuals:   "منوال",
    stat_errors:    "کد خطا",
    stat_saved:     "ذخیره",
    sec_categories: "دسته‌بندی‌های سرویس",
    sec_tools:      "ابزارها",
    sec_popular:    "پرتکرارترین",

    /* ── Tools ── */
    tool_ref:       "جداول مرجع",
    tool_pm:        "PM چک‌لیست",
    tool_gallery:   "گالری",
    tool_qr:        "اسکن QR",

    /* ── Library ── */
    lib_title:      "کتابخانه",
    search_ph:      "جستجو...",
    chip_all:       "همه",

    /* ── Codes ── */
    codes_title:    "کدهای خطا",
    sev_all:        "همه",
    sev_red:        "بحرانی",
    sev_orange:     "هشدار",
    sev_blue:       "اطلاع",
    act_prefix:     "اقدام: ",

    /* ── Reference ── */
    ref_title:      "جداول مرجع",
    ref_sub:        "تلورانس‌ها، پارامترها و مقادیر کلیدی",
    ref_search_ph:  "جستجو در جداول...",
    ref_empty:      "چیزی پیدا نشد",
    ref_empty_sub:  "عبارت دیگری را امتحان کنید",

    /* ── Gallery ── */
    gallery_title:  "گالری",
    gallery_sub:    "عکس‌های تعمیرات و قطعات",
    gallery_empty:  "گالری خالی است",
    gallery_empty_s:"با دکمه + اولین عکس سرویس را اضافه کن",
    gallery_local:  "محلی",

    /* ── Favorites ── */
    fav_title:      "ذخیره‌شده",
    fav_empty:      "هنوز چیزی ذخیره نکردی",
    fav_empty_s:    "روی ستاره بزن تا اینجا بیاد",

    /* ── More ── */
    more_title:     "بیش‌تر",
    row_version:    "نسخه",
    row_manuals:    "تعداد منوال",
    row_errors:     "تعداد کد خطا",
    row_status:     "وضعیت",
    status_online:  "آنلاین ✓",
    status_offline: "آفلاین",
    sec_repairs:    "تعمیرات",
    sec_devices:    "دستگاه‌ها",
    row_pm_title:   "نگهداری پیشگیرانه (PM)",
    row_pm_sub:     "چک‌لیست روزانه تا سالانه",
    row_lang:       "زبان / Language",
    footer_line1:   "Elekta Service — نسخه ۴.۰",
    footer_line2:   "ساخته‌شده برای iOS",
    item_suffix:    " مورد",
    manuals_word:   "منوال",

    /* ── PM ── */
    pm_title:       "نگهداری",
    pm_large:       "PM",
    pm_sub:         "چک‌لیست نگهداری پیشگیرانه",
    pm_empty:       "تسکی موجود نیست",
    pm_empty_sub:   "این دستگاه در این بازه PM خاصی ندارد",
    pm_complete:    "کامل شد",
    pm_done_of:     "از",
    pm_done_word:   "انجام شده",
    pm_critical:    "ضروری",
    pm_min:         "دقیقه",
    pm_confirm:     "همه تیک‌های این بازه پاک شود؟",
    pm_reset_done:  "ریست شد",
    pm_freq_daily:      "روزانه",
    pm_freq_weekly:     "هفتگی",
    pm_freq_monthly:    "ماهانه",
    pm_freq_quarterly:  "فصلی",
    pm_freq_semiannual: "۶ ماهه",
    pm_freq_annual:     "سالانه",
    pm_cat_safety:  "ایمنی",
    pm_cat_mech:    "مکانیک",
    pm_cat_dose:    "دزیمتری",
    pm_cat_rf:      "RF",
    pm_cat_img:     "تصویربرداری",
    pm_cat_cool:    "خنک‌کننده",
    pm_cat_mlc:     "MLC",
    pm_cat_misc:    "عمومی",

    /* ── Sheet ── */
    sheet_close:    "بستن",
    sheet_default:  "منوال",
    sheet_devices:  "دستگاه‌های مرتبط",
    sheet_tools:    "ابزار مورد نیاز",
    sheet_steps:    "مراحل",
    sheet_warning:  "هشدار ایمنی",

    /* ── QR ── */
    qr_title:       "اسکن QR دستگاه",
    qr_cancel:      "انصراف",
    qr_switch:      "تغییر",
    qr_hint:        "QR روی برچسب دستگاه را داخل کادر قرار دهید",
    qr_manual:      "وارد کردن دستی کد",
    qr_manual_t:    "کد دستگاه را وارد کنید",
    qr_manual_hint: "مثال: ELEKTA-SYN-01",
    qr_ok:          "تایید",
    qr_unknown:     "کد ناشناخته",
    qr_device_found:"دستگاه",
    qr_cam_err:     "خطا در باز کردن دوربین",
    qr_cam_denied:  "اجازه دوربین داده نشد",
    qr_no_barcode:  "اسکن خودکار پشتیبانی نمی‌شود",

    /* ── Add Photo ── */
    add_photo:      "افزودن عکس",
    add_cancel:     "انصراف",
    add_save:       "ذخیره",
    add_title_lbl:  "عنوان عکس",
    add_title_ph:   "مثلاً: تعویض Magnetron در Synergy",
    add_cat_lbl:    "دسته‌بندی",
    add_notes_lbl:  "یادداشت",
    add_notes_opt:  "(اختیاری)",
    add_notes_ph:   "جزئیات بیشتر...",
    add_dev_lbl:    "دستگاه",
    add_title_req:  "عنوان را وارد کنید",
    add_no_photo:   "عکسی انتخاب نشده",
    add_saved:      "عکس ذخیره شد",
    add_save_err:   "خطا در ذخیره عکس",
    add_deleted:    "عکس حذف شد",
    add_del_conf:   "این عکس حذف شود؟",
    add_process:    "در حال پردازش عکس...",
    add_img_only:   "فقط فایل تصویری مجاز است",
    add_img_err:    "خطا در پردازش عکس",

    /* ── Toast ── */
    t_saved:        "ذخیره شد",
    t_removed:      "حذف شد",

    /* ── Gallery Categories ── */
    gcat_all:       "همه",
    gcat_parts:     "قطعات",
    gcat_repair:    "تعمیرات",
    gcat_install:   "نصب",
    gcat_mlc:       "MLC",
    gcat_rf:        "RF و Magnetron",
    gcat_imaging:   "تصویربرداری",
    gcat_cooling:   "خنک‌کننده",
    gcat_tools:     "ابزار",

    /* ── Categories ── */
    cat_replace:    "تعویض قطعات",
    cat_trouble:    "عیب‌یابی",
    cat_synergy:    "Synergy",
    cat_infinity:   "Infinity",
    cat_rf:         "RF و Waveguide",
    cat_electronic: "الکترونیک و برد",
    cat_mech:       "مکانیک و میز",
    cat_software:   "نرم‌افزار",
    cat_emergency:  "اضطراری و ایمنی",
    cat_inventory:  "انبار و قطعات",
    cat_mlc:        "MLC و کولیما",
    cat_pm:         "PM و نگهداری"
    ,

    /* ── Service Log ── */
    log_title:          "لاگ سرویس",
    log_sub:            "تاریخچه سرویس‌های انجام‌شده",
    log_new:            "ثبت سرویس",
    log_register:       "ثبت سرویس",
    log_pdf:            "PDF",
    log_manual_lbl:     "منوال اجرا شده",
    log_machine_lbl:    "دستگاه",
    log_status_lbl:     "وضعیت",
    log_status_done:    "تکمیل",
    log_status_partial: "نیمه",
    log_status_failed:  "ناموفق",
    log_tech_lbl:       "تکنسین",
    log_notes_lbl:      "یادداشت",
    log_notes_ph:       "نکات خاص این منوال...",
    log_manual_notes:   "یادداشت شخصی",
    log_saved:          "سرویس ثبت شد ✓",
    log_empty:          "هنوز سرویسی ثبت نشده",
    log_empty_sub:      "از داخل هر منوال، دکمه «ثبت سرویس» رو بزن",
    log_exported:       "دانلود شد",
    log_reset_check:    "ریست چک‌لیست",
    log_reset_conf:     "همه تیک‌ها پاک شود؟",
    log_note_saved:     "یادداشت ذخیره شد",
    log_printing:       "در حال آماده‌سازی PDF...",
    log_select_manual:  "منوال انتخاب نشده",
    sec_service:        "سرویس",
    row_log_title:      "تاریخچه سرویس",
    row_log_sub:        "ثبت و مشاهده سرویس‌ها"
  },

  en: {
    /* ── Tabs ── */
    tab_home:       "Home",
    tab_lib:        "Library",
    tab_gallery:    "Gallery",
    tab_codes:      "Codes",
    tab_fav:        "Saved",

    /* ── Home ── */
    home_sub:       "Service, Repair & Maintenance",
    stat_manuals:   "Manuals",
    stat_errors:    "Codes",
    stat_saved:     "Saved",
    sec_categories: "Service Categories",
    sec_tools:      "Tools",
    sec_popular:    "Most Used",

    /* ── Tools ── */
    tool_ref:       "Reference Tables",
    tool_pm:        "PM Checklist",
    tool_gallery:   "Gallery",
    tool_qr:        "Scan QR",

    /* ── Library ── */
    lib_title:      "Library",
    search_ph:      "Search...",
    chip_all:       "All",

    /* ── Codes ── */
    codes_title:    "Error Codes",
    sev_all:        "All",
    sev_red:        "Critical",
    sev_orange:     "Warning",
    sev_blue:       "Info",
    act_prefix:     "Action: ",

    /* ── Reference ── */
    ref_title:      "Reference Tables",
    ref_sub:        "Tolerances, parameters and key values",
    ref_search_ph:  "Search tables...",
    ref_empty:      "Nothing found",
    ref_empty_sub:  "Try a different keyword",

    /* ── Gallery ── */
    gallery_title:  "Gallery",
    gallery_sub:    "Photos of repairs and parts",
    gallery_empty:  "Gallery is empty",
    gallery_empty_s:"Tap + to add your first service photo",
    gallery_local:  "local",

    /* ── Favorites ── */
    fav_title:      "Saved",
    fav_empty:      "Nothing saved yet",
    fav_empty_s:    "Tap the star to save manuals here",

    /* ── More ── */
    more_title:     "More",
    row_version:    "Version",
    row_manuals:    "Manuals",
    row_errors:     "Error Codes",
    row_status:     "Status",
    status_online:  "Online",
    status_offline: "Offline",
    sec_repairs:    "Maintenance",
    sec_devices:    "Devices",
    row_pm_title:   "Preventive Maintenance",
    row_pm_sub:     "Daily to annual checklist",
    row_lang:       "Language / زبان",
    footer_line1:   "Elekta Service — v4.0",
    footer_line2:   "Made for iOS",
    item_suffix:    " items",
    manuals_word:   "manuals",

    /* ── PM ── */
    pm_title:       "Maintenance",
    pm_large:       "PM",
    pm_sub:         "Preventive Maintenance Checklist",
    pm_empty:       "No tasks found",
    pm_empty_sub:   "No PM tasks for this device",
    pm_complete:    "Complete",
    pm_done_of:     "of",
    pm_done_word:   "done",
    pm_critical:    "Critical",
    pm_min:         "min",
    pm_confirm:     "Clear all checks in this interval?",
    pm_reset_done:  "Reset complete",
    pm_freq_daily:      "Daily",
    pm_freq_weekly:     "Weekly",
    pm_freq_monthly:    "Monthly",
    pm_freq_quarterly:  "Quarterly",
    pm_freq_semiannual: "6-Month",
    pm_freq_annual:     "Annual",
    pm_cat_safety:  "Safety",
    pm_cat_mech:    "Mechanical",
    pm_cat_dose:    "Dosimetry",
    pm_cat_rf:      "RF",
    pm_cat_img:     "Imaging",
    pm_cat_cool:    "Cooling",
    pm_cat_mlc:     "MLC",
    pm_cat_misc:    "General",

    /* ── Sheet ── */
    sheet_close:    "Close",
    sheet_default:  "Manual",
    sheet_devices:  "Related Devices",
    sheet_tools:    "Required Tools",
    sheet_steps:    "Steps",
    sheet_warning:  "Safety Warning",

    /* ── QR ── */
    qr_title:       "Scan Device QR",
    qr_cancel:      "Cancel",
    qr_switch:      "Flip",
    qr_hint:        "Place device QR code inside the frame",
    qr_manual:      "Enter code manually",
    qr_manual_t:    "Enter device code",
    qr_manual_hint: "Example: ELEKTA-SYN-01",
    qr_ok:          "Confirm",
    qr_unknown:     "Unknown code",
    qr_device_found:"Device",
    qr_cam_err:     "Failed to open camera",
    qr_cam_denied:  "Camera access denied",
    qr_no_barcode:  "Auto-scan not supported",

    /* ── Add Photo ── */
    add_photo:      "Add Photo",
    add_cancel:     "Cancel",
    add_save:       "Save",
    add_title_lbl:  "Photo Title",
    add_title_ph:   "e.g., Magnetron replacement on Synergy",
    add_cat_lbl:    "Category",
    add_notes_lbl:  "Notes",
    add_notes_opt:  "(optional)",
    add_notes_ph:   "Additional details...",
    add_dev_lbl:    "Device",
    add_title_req:  "Please enter a title",
    add_no_photo:   "No photo selected",
    add_saved:      "Photo saved",
    add_save_err:   "Failed to save photo",
    add_deleted:    "Photo deleted",
    add_del_conf:   "Delete this photo?",
    add_process:    "Processing image...",
    add_img_only:   "Only image files allowed",
    add_img_err:    "Failed to process image",

    /* ── Toast ── */
    t_saved:        "Saved",
    t_removed:      "Removed",

    /* ── Gallery Categories ── */
    gcat_all:       "All",
    gcat_parts:     "Parts",
    gcat_repair:    "Repairs",
    gcat_install:   "Install",
    gcat_mlc:       "MLC",
    gcat_rf:        "RF & Magnetron",
    gcat_imaging:   "Imaging",
    gcat_cooling:   "Cooling",
    gcat_tools:     "Tools",

    /* ── Categories ── */
    cat_replace:    "Parts Replacement",
    cat_trouble:    "Troubleshooting",
    cat_synergy:    "Synergy",
    cat_infinity:   "Infinity",
    cat_rf:         "RF & Waveguide",
    cat_electronic: "Electronics & Boards",
    cat_mech:       "Mechanics & Couch",
    cat_software:   "Software",
    cat_emergency:  "Emergency & Safety",
    cat_inventory:  "Inventory & Parts",
    cat_mlc:        "MLC & Collimator",
    cat_pm:         "PM & Maintenance"
    ,

    log_title:          "Service Log",
    log_sub:            "History of services performed",
    log_new:            "Register Service",
    log_register:       "Register",
    log_pdf:            "PDF",
    log_manual_lbl:     "Manual performed",
    log_machine_lbl:    "Device",
    log_status_lbl:     "Status",
    log_status_done:    "Complete",
    log_status_partial: "Partial",
    log_status_failed:  "Failed",
    log_tech_lbl:       "Technician",
    log_notes_lbl:      "Notes",
    log_notes_ph:       "Specific notes for this manual...",
    log_manual_notes:   "Personal Notes",
    log_saved:          "Service saved",
    log_empty:          "No services logged yet",
    log_empty_sub:      "Open any manual and tap 'Register'",
    log_exported:       "Downloaded",
    log_reset_check:    "Reset Checklist",
    log_reset_conf:     "Clear all checks?",
    log_note_saved:     "Note saved",
    log_printing:       "Preparing PDF...",
    log_select_manual:  "No manual selected",
    sec_service:        "Service",
    row_log_title:      "Service History",
    row_log_sub:        "Register and view services"
  }
};

let LANG = (typeof localStorage !== "undefined" && localStorage.getItem("elekta_lang")) || "fa";

function t(key){
  const dict = I18N[LANG] || I18N.fa;
  return dict[key] || key;
}

function getLang(){ return LANG; }

function setLanguage(lang){
  if(lang !== "fa" && lang !== "en") lang = "fa";
  LANG = lang;
  try { localStorage.setItem("elekta_lang", lang); } catch(e){}
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "fa") ? "rtl" : "ltr";

  /* رندر مجدد کل UI */
  if(typeof renderTabbar === "function") renderTabbar();
  if(typeof renderStats === "function") renderStats();
  if(typeof renderCats === "function") renderCats();
  if(typeof renderToolGrid === "function") renderToolGrid();
  if(typeof renderHomePop === "function") renderHomePop();
  if(typeof renderLibChips === "function") renderLibChips();
  if(typeof renderLib === "function") renderLib();
  if(typeof renderCodeChips === "function") renderCodeChips();
  if(typeof renderCodes === "function") renderCodes();
  if(typeof renderFavs === "function") renderFavs();
  if(typeof renderMachineList === "function") renderMachineList();
  if(typeof renderRef === "function") renderRef();
  if(typeof renderGalleryChips === "function") renderGalleryChips();
  if(typeof renderGallery === "function") renderGallery();
  if(typeof renderPMFreqChips === "function") renderPMFreqChips();
  if(typeof renderPMMachineChips === "function") renderPMMachineChips();
  if(typeof renderPMProgress === "function") renderPMProgress();
  if(typeof renderPMList === "function") renderPMList();
  if(typeof applyStaticTranslations === "function") applyStaticTranslations();
  if(typeof updateLangSwitch === "function") updateLangSwitch();
  if(typeof toast === "function") toast(lang === "fa" ? "زبان: فارسی" : "Language: English");
}

/* ترجمه عناصر با data-i18n */
function applyStaticTranslations(){
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var key = el.getAttribute("data-i18n");
    var val = t(key);
    if(val && val !== key) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
    var key = el.getAttribute("data-i18n-ph");
    var val = t(key);
    if(val && val !== key) el.setAttribute("placeholder", val);
  });
}

window.I18N = I18N;
window.t = t;
window.setLanguage = setLanguage;
window.getLang = getLang;
window.applyStaticTranslations = applyStaticTranslations;

console.log("✅ i18n.js loaded — lang: " + LANG);