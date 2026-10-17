/* ═══════════════════════════════════════
   i18n.js — دوزبانه (فارسی / English)
   نسخه ۵.۰ — با آموزش
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
    tool_ref:       "مرجع",
    tool_pm:        "PM",
    tool_gallery:   "گالری",
    tool_qr:        "QR",

    /* ── PDF library ── */
    tool_pdfs:      "PDFهای اصلی",
    tab_pdfs:       "PDF",
    pdf_title:      "PDFهای اصلی",
    pdf_sub:        "اسناد اصلی سرویس — ذخیره محلی",
    pdf_empty:      "هنوز PDFای نیست",
    pdf_empty_s:    "با دکمه + فایل اصلی را اضافه کن",
    pdf_add:        "افزودن PDF",
    pdf_count:      "تعداد PDF",
    pdf_field_title:"عنوان",
    pdf_field_cat:  "دسته‌بندی",
    pdf_field_note: "یادداشت (اختیاری)",
    pdf_hint:       "فایل روی همین دستگاه ذخیره می‌شود (حداکثر حدود ۶۰ مگابایت) و آفلاین در دسترس است.",
    pdf_saved:      "PDF ذخیره شد",
    pdf_save_fail:  "خطا در ذخیره PDF",
    pdf_deleted:    "PDF حذف شد",
    pdf_del_confirm:"این PDF حذف شود؟",
    pdf_bad_type:   "فقط فایل PDF مجاز است",
    pdf_too_big:    "حجم فایل زیاد است",
    pdf_too_big_hint:"فایل کوچک‌تر بفرست یا چند بخش کن",
    pdf_large_warn: "فایل حجیم است",
    pdf_large_warn_hint:"ذخیره ممکن است طول بکشد",
    pdf_some_skipped:"بعضی فایل‌ها رد شدند (حجم یا نوع نادرست)",
    pdf_quota_hint: "چند PDF قدیمی را از لیست حذف کن و دوباره تلاش کن",
    pdf_search_ph:  "جستجو در PDF...",
    pdf_prev:       "قبلی",
    pdf_next:       "بعدی",
    pdf_close:      "بستن",
    pdf_loading:    "در حال بارگذاری PDF…",
    pdf_page_of:    "از",
    pdf_search_none:"موردی یافت نشد",
    pdf_search_not_ready:"جستجو آماده نیست",
    pdf_no_file:    "فایلی انتخاب نشده",
    pdf_saving:     "در حال ذخیره…",
    pdf_quota:      "حافظه پر است",
    pdf_not_found:  "PDF پیدا نشد",
    pdf_open_fail:  "خطا در باز کردن PDF",
    pdfcat_all:     "همه",
    pdfcat_cmm:     "CMM / تعمیر",
    pdfcat_service: "سرویس",
    pdfcat_accept:  "پذیرش",
    pdfcat_pm:      "PM",
    pdfcat_error:   "کد خطا",
    pdfcat_other:   "سایر",

    /* ── PDF viewer plus ── */
    pvp_bookmark:   "نشانک",
    pvp_night:      "حالت شب",
    pvp_night_on:   "حالت شب",
    pvp_night_off:  "حالت روز",
    pvp_zoom_in:    "بزرگ‌نمایی",
    pvp_zoom_out:   "کوچک‌نمایی",
    pvp_print:      "چاپ",
    pvp_share:      "اشتراک",
    pvp_bookmarks:  "نشانک‌ها",
    pvp_page:       "صفحه",
    pvp_bm_removed: "حذف شد",
    pvp_bm_empty:   "هنوز نشانکی نداری",
    pvp_print_none: "صفحه‌ای برای چاپ نیست",
    pvp_print_fail: "پنجره چاپ باز نشد",
    pvp_share_unsupported: "اشتراک‌گذاری پشتیبانی نمی‌شود",
    pvp_share_fail: "خطا در اشتراک",

    /* ── Library ── */
    lib_title:      "کتابخانه",
    search_ph:      "جستجو...",
    gs_ph:          "جستجوی سراسری...",
    gs_hint:        "منوال، کد خطا، فلوچارت یا PDF را جستجو کن",
    gs_empty:       "نتیجه‌ای یافت نشد",
    gs_manuals:     "منوال‌ها",
    gs_errors:      "کدهای خطا",
    gs_flows:       "فلوچارت‌ها",
    gs_pdfs:        "PDFها",
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
    sec_service:    "سرویس",
    sec_settings:   "تنظیمات",
    sec_learning:   "آموزش",
    row_pm_title:   "نگهداری پیشگیرانه (PM)",
    row_pm_sub:     "چک‌لیست روزانه تا سالانه",
    row_lang:       "زبان / Language",
    row_theme:      "تم",
    row_glass:      "شیشه مایع",
    row_glass_sub:  "شفاف ← مات",
    glass_clear:    "شفاف",
    glass_tinted:   "مات",
    row_font:       "فونت",
    footer_line1:   "Elekta Service — نسخه ۵.۰",
    footer_line2:   "ساخته‌شده برای iOS",
    item_suffix:    " مورد",
    manuals_word:   "منوال",

    /* ── Learning ── */
    learn_title:    "آموزش",
    learn_sub:      "مسیرهای یادگیری سرویس",

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
    cat_rf:         "RF",
    cat_electronic: "الکترونیک",
    cat_mech:       "مکانیک",
    cat_software:   "نرم‌افزار",
    cat_emergency:  "اضطراری",
    cat_inventory:  "انبار",
    cat_mlc:        "MLC",
    cat_pm:         "PM",

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
    row_log_title:      "تاریخچه سرویس",
    row_log_sub:        "ثبت و مشاهده سرویس‌ها",

    /* ── Flowcharts ── */
    flow_title:     "عیب‌یابی گام‌به‌گام",
    flow_sub:       "درخت تصمیم برای مشکلات رایج",
    sec_flow:       "عیب‌یابی سریع",
    flow_start:     "شروع",
    flow_restart:   "شروع دوباره",
    flow_back:      "مرحله قبل",
    flow_end:       "پایان",
    flow_continue:  "ادامه"
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
    tool_ref:       "Reference",
    tool_pm:        "PM",
    tool_gallery:   "Gallery",
    tool_qr:        "QR",

    /* ── PDF library ── */
    tool_pdfs:      "Source PDFs",
    tab_pdfs:       "PDFs",
    pdf_title:      "Source PDFs",
    pdf_sub:        "Original manuals — stored on device",
    pdf_empty:      "No PDFs yet",
    pdf_empty_s:    "Tap + to add a PDF from your device",
    pdf_add:        "Add PDF",
    pdf_count:      "PDF count",
    pdf_field_title:"Title",
    pdf_field_cat:  "Category",
    pdf_field_note: "Note (optional)",
    pdf_hint:       "Files are stored on this device (max about 60 MB) and available offline.",
    pdf_saved:      "PDF saved",
    pdf_save_fail:  "Failed to save PDF",
    pdf_deleted:    "PDF deleted",
    pdf_del_confirm:"Delete this PDF?",
    pdf_bad_type:   "Only PDF files are allowed",
    pdf_too_big:    "File is too large",
    pdf_too_big_hint:"Use a smaller file or split it",
    pdf_large_warn: "Large file",
    pdf_large_warn_hint:"Saving may take a while",
    pdf_some_skipped:"Some files were skipped (size or type)",
    pdf_quota_hint: "Delete some old PDFs and try again",
    pdf_search_ph:  "Search in PDF...",
    pdf_prev:       "Prev",
    pdf_next:       "Next",
    pdf_close:      "Close",
    pdf_loading:    "Loading PDF…",
    pdf_page_of:    "of",
    pdf_search_none:"No matches",
    pdf_search_not_ready:"Search not ready",
    pdf_no_file:    "No file selected",
    pdf_saving:     "Saving…",
    pdf_quota:      "Storage full",
    pdf_not_found:  "PDF not found",
    pdf_open_fail:  "Could not open PDF",
    pdfcat_all:     "All",
    pdfcat_cmm:     "CMM / Repair",
    pdfcat_service: "Service",
    pdfcat_accept:  "Acceptance",
    pdfcat_pm:      "PM",
    pdfcat_error:   "Error codes",
    pdfcat_other:   "Other",

    /* ── PDF viewer plus ── */
    pvp_bookmark:   "Bookmark",
    pvp_night:      "Night mode",
    pvp_night_on:   "Night mode",
    pvp_night_off:  "Day mode",
    pvp_zoom_in:    "Zoom in",
    pvp_zoom_out:   "Zoom out",
    pvp_print:      "Print",
    pvp_share:      "Share",
    pvp_bookmarks:  "Bookmarks",
    pvp_page:       "Page",
    pvp_bm_removed: "Removed",
    pvp_bm_empty:   "No bookmarks yet",
    pvp_print_none: "No page to print",
    pvp_print_fail: "Could not open print window",
    pvp_share_unsupported: "Sharing not supported",
    pvp_share_fail: "Share failed",

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
    sec_service:    "Service",
    sec_settings:   "Settings",
    sec_learning:   "Learning",
    row_pm_title:   "Preventive Maintenance",
    row_pm_sub:     "Daily to annual checklist",
    row_lang:       "Language / زبان",
    row_theme:      "Theme",
    row_glass:      "Liquid Glass",
    row_glass_sub:  "Clear ← Tinted",
    glass_clear:    "Clear",
    glass_tinted:   "Tinted",
    row_font:       "Font",
    footer_line1:   "Elekta Service — v5.0",
    footer_line2:   "Made for iOS",
    item_suffix:    " items",
    manuals_word:   "manuals",

    /* ── Learning ── */
    learn_title:    "Learning",
    learn_sub:      "Service learning paths",

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
    cat_replace:    "Parts",
    cat_trouble:    "Diagnostics",
    cat_synergy:    "Synergy",
    cat_infinity:   "Infinity",
    cat_rf:         "RF",
    cat_electronic: "Electronics",
    cat_mech:       "Mechanics",
    cat_software:   "Software",
    cat_emergency:  "Emergency",
    cat_inventory:  "Inventory",
    cat_mlc:        "MLC",
    cat_pm:         "PM",

    /* ── Service Log ── */
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
    row_log_title:      "Service History",
    row_log_sub:        "Register and view services",

    /* ── Flowcharts ── */
    flow_title:     "Step-by-Step Troubleshooting",
    flow_sub:       "Decision tree for common issues",
    sec_flow:       "Quick Troubleshooting",
    flow_start:     "Start",
    flow_restart:   "Restart",
    flow_back:      "Previous Step",
    flow_end:       "End",
    flow_continue:  "Continue"
  }
};

let LANG = (window.Elekta && Elekta.storage)
  ? Elekta.storage.getRaw("elekta_lang", "fa")
  : ((typeof localStorage !== "undefined" && localStorage.getItem("elekta_lang")) || "fa");

function t(key){
  const dict = I18N[LANG] || I18N.fa;
  return dict[key] || key;
}

function getLang(){ return LANG; }

function setLanguage(lang){
  if(lang !== "fa" && lang !== "en") lang = "fa";
  LANG = lang;
  if (window.Elekta && Elekta.storage) Elekta.storage.setRaw("elekta_lang", lang);
  else try { localStorage.setItem("elekta_lang", lang); } catch(e){}
  if (window.Elekta && Elekta.state) Elekta.state.lang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "fa") ? "rtl" : "ltr";

  if (window.Elekta && typeof Elekta.refreshUI === "function") {
    Elekta.refreshUI();
  } else {
    if(typeof applyStaticTranslations === "function") applyStaticTranslations();
    if(typeof updateLangSwitch === "function") updateLangSwitch();
  }

  var psi = document.getElementById("pdfSearchInput");
  if (psi) {
    try { psi.placeholder = t("pdf_search_ph") || t("gs_ph") || psi.placeholder; } catch(e){}
  }
  var pPrev = document.getElementById("pdfSearchPrev");
  var pNext = document.getElementById("pdfSearchNext");
  if (pPrev) pPrev.textContent = t("pdf_prev") || pPrev.textContent;
  if (pNext) pNext.textContent = t("pdf_next") || pNext.textContent;

  if(typeof toast === "function") toast(lang === "fa" ? "زبان: فارسی" : "Language: English");
}

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