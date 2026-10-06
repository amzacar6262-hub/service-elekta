/* ========== ICONS ========== */
const ICONS = {
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 1 5.4 5.4l-9.7 9.7-5.4-5.4 9.7-9.7z"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 15.1 8.6 22 9.3 17 14.2 18.2 21 12 17.7 5.8 21 7 14.2 2 9.3 8.9 8.6 12 2"/></svg>',
  starFill:'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.1 8.6 22 9.3 17 14.2 18.2 21 12 17.7 5.8 21 7 14.2 2 9.3 8.9 8.6 12 2"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
  chev:'<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="transform:scaleX(-1)"><polyline points="2 2 6 7 2 12"/></svg>'
};

/* ========== CATEGORIES ========== */
const CATS = [
  {id:"daily",name:"QA روزانه",c1:"#FF9F0A",c2:"#FF6B00",icon:"check"},
  {id:"weekly",name:"QA هفتگی",c1:"#5AC8FA",c2:"#0A84FF",icon:"cal"},
  {id:"monthly",name:"QA ماهانه",c1:"#BF5AF2",c2:"#5856D6",icon:"clock"},
  {id:"mlc",name:"MLC و کولیما",c1:"#FF375F",c2:"#AF52DE",icon:"grid"},
  {id:"calib",name:"کالیبراسیون",c1:"#FFD60A",c2:"#FF9500",icon:"target"},
  {id:"imaging",name:"تصویربرداری",c1:"#00C7BE",c2:"#30B0C7",icon:"cam"},
  {id:"replace",name:"تعویض قطعات",c1:"#32D74B",c2:"#28A745",icon:"wrench"},
  {id:"trouble",name:"عیب‌یابی",c1:"#FF453A",c2:"#D70015",icon:"warn"}
];

/* ========== MANUALS ========== */
const MANUALS = [
{id:"m1",title:"چک‌لیست QA روزانه دستگاه خطی",cat:"daily",machines:["Versa HD","Infinity","Synergy"],code:"QA-D-100",duration:"۱۵ دقیقه",level:"پایه",summary:"بررسی‌های روزانه صبحگاهی قبل از شروع درمان بیماران، شامل تست دزیمتری ساده، ایمنی و عملکرد مکانیکی.",warn:"انجام این چک‌لیست قبل از هر جلسه درمان الزامی است.",tools:["دزیمتر یونیزاسیون","فانتوم روزانه"],steps:[{t:"روشن کردن دستگاه و انتظار برای اتمام Warm-up (۱۰–۱۵ دقیقه)"},{t:"بررسی وضعیت چراغ‌های نشانگر پنل اصلی",note:"در صورت خطای قرمز، کد را در تب کدهای خطا بررسی کنید."},{t:"تست عملکرد Emergency Stop",note:"دکمه را با چرخش بازگردانید.",level:"warn"},{t:"اندازه‌گیری دز خروجی با فانتوم — مرجع ۱۰۰ cGy",note:"انحراف مجاز ± ۲٪",level:"warn"},{t:"بررسی حرکت گانتری ۳۶۰ درجه و بازوی سقفی"},{t:"تست عملکرد میز درمان"},{t:"بررسی سیستم تصویربرداری kV/MV"},{t:"بررسی فیلترها و MLC"},{t:"ثبت نتایج و امضا"}]},
{id:"m2",title:"تست ایمنی اتاق درمان و اینترلاک‌ها",cat:"daily",machines:["Versa HD","Infinity","Synergy","Unity"],code:"QA-D-105",duration:"۸ دقیقه",level:"پایه",summary:"بررسی روزانه اینترلاک درب، CCTV، ارتباط با بیمار و چراغ‌های هشدار.",warn:"هر نقص در اینترلاک درب باید بلافاصله گزارش شود.",tools:["تست لامپ هشدار","کلید درب"],steps:[{t:"بررسی چراغ قرمز بیرونی اتاق"},{t:"تست اینترلاک درب",level:"danger",note:"زمان قطع باید زیر ۱۰۰ms باشد."},{t:"تست صدای هشدار اتاق"},{t:"بررسی CCTV و ارتباط دوطرفه"},{t:"تست Emergency Stop داخل اتاق"},{t:"بررسی تابلو علائم ایمنی"}]},
{id:"m3",title:"QA هفتگی دزیمتری — خروجی و پروفایل پرتو",cat:"weekly",machines:["Versa HD","Infinity","Synergy"],code:"QA-W-200",duration:"۴۵ دقیقه",level:"متوسط",summary:"اندازه‌گیری خروجی مطلق، پروفایل پرتو و بررسی انرژی با فانتوم آب.",warn:"انحراف بیش از ۲٪ نیازمند کالیبراسیون فوری است.",tools:["فانتوم آب","اتاقک Farmer","الکترومتر","دماسنج","بارومتر"],steps:[{t:"آماده‌سازی فانتوم آب روی ۲۰°C"},{t:"قرارگیری اتاقک در عمق ۱۰cm، SAD=100cm"},{t:"تابش ۱۰۰ MU با میدان ۱۰×۱۰",level:"warn",note:"مرجع: ۱۰۰ cGy ± ۲٪"},{t:"تکرار برای انرژی‌های ۱۰ و ۱۸ MV"},{t:"اندازه‌گیری پروفایل عرضی"},{t:"بررسی Flatness و Symmetry",note:"مسطح بودن زیر ۳٪"},{t:"اندازه‌گیری PDD"},{t:"ثبت در فرم QA"}]},
{id:"m4",title:"QA هفتگی سیستم EPID",cat:"weekly",machines:["Versa HD","Infinity"],code:"QA-W-210",duration:"۳۰ دقیقه",level:"متوسط",summary:"بررسی کیفیت تصویر EPID شامل Uniformity، Resolution و موقعیت.",tools:["فانتوم EPID","فانتوم Las Vegas"],steps:[{t:"راه‌اندازی EPID در SID=150cm"},{t:"تصویر Dark و Flood Field"},{t:"تصویر فانتوم Las Vegas"},{t:"بررسی Uniformity در ۹ نقطه"},{t:"تست موقعیت مرکز تصویر"},{t:"مقایسه و ثبت"}]},
{id:"m5",title:"QA ماهانه MLC و کولیما",cat:"mlc",machines:["Versa HD","Infinity","Synergy","Axesse"],code:"QA-M-300",duration:"۹۰ دقیقه",level:"پیشرفته",summary:"بررسی جامع MLC شامل دقت هر Leaf، سرعت، هم‌ترازی و Picket Fence.",warn:"خطای موقعیت هر Leaf باید زیر ۱mm باشد.",tools:["فانتوم Picket Fence","فیلم EBT3","اسکنر فیلم"],steps:[{t:"تست Picket Fence با همه Leafها",level:"warn",note:"انحراف هر Leaf زیر ۱mm"},{t:"تست حرکت تکی هر Leaf"},{t:"بررسی هم‌ترازی MLC با کولیما"},{t:"تست Gantry Angle با MLC"},{t:"تست IMRT/VMAT با Matrixx",level:"warn",note:"انحراف ۳٪ / ۳mm"},{t:"بررسی روانکاری ریل‌ها"},{t:"پاکیزگی Leafها"},{t:"ثبت گزارش"}]},
{id:"m6",title:"کالیبراسیون ماهانه Imaging kV",cat:"imaging",machines:["Versa HD","Infinity","Axesse"],code:"QA-M-310",duration:"۶۰ دقیقه",level:"پیشرفته",summary:"کالیبراسیون kVp، mA، زمان تابش و یکنواختی تصویر.",tools:["مولتی‌متر kV","فانتوم هم‌ترازی"],steps:[{t:"ورود به Service → Imaging → Calibration"},{t:"اندازه‌گیری kVp",note:"انحراف مجاز ± ۲٪"},{t:"کالیبراسیون Dark و Gain"},{t:"بررسی یکنواختی Flat Field"},{t:"کالیبراسیون مرکز تصویر"},{t:"تست Offset",note:"زیر ۱mm"},{t:"ذخیره و ری‌استارت"}]},
{id:"m7",title:"کالیبراسیون دز خروجی — Output Factor",cat:"calib",machines:["Versa HD","Infinity","Synergy","Unity","Axesse","Precise"],code:"CAL-400",duration:"۱۲۰ دقیقه",level:"پیشرفته",summary:"کالیبراسیون دز مطلق با پروتکل TRS-398 IAEA.",warn:"فقط توسط فیزیک‌دان پزشکی یا مهندس مجاز.",tools:["اتاقک Farmer","الکترومتر","فانتوم آب","دماسنج","بارومتر"],steps:[{t:"آماده‌سازی شرایط مرجع"},{t:"ثبت دما و فشار، محاسبه kTP"},{t:"تابش ۱۰۰ MU × ۳ بار"},{t:"محاسبه دز جذبی"},{t:"مقایسه با مرجع",note:"زیر ۱٪"},{t:"اعمال ضریب در Monaco/RayStation"},{t:"تکرار برای همه انرژی‌ها",level:"warn"},{t:"تست صحت پس از کالیبراسیون"},{t:"ثبت و امضا"}]},
{id:"m8",title:"کالیبراسیون لیزرهای اتاق",cat:"calib",machines:["Versa HD","Infinity","Synergy","Axesse"],code:"CAL-410",duration:"۴۵ دقیقه",level:"متوسط",summary:"کالیبراسیون لیزرها با فانتوم Isocenter.",tools:["فانتوم هم‌ترازی","فیلر"],steps:[{t:"قرارگیری فانتوم روی Isocenter"},{t:"بررسی سه لیزر دیواری و سقفی",note:"انحراف زیر ۱mm در ۱m"},{t:"کالیبراسیون لیزر عرضی"},{t:"کالیبراسیون لیزر طولی و عمودی"},{t:"بازبینی نهایی"}]},
{id:"m9",title:"تعویض Magnetron",cat:"replace",machines:["Versa HD","Infinity","Synergy","Precise"],code:"REP-500",duration:"۳–۴ ساعت",level:"پیشرفته",summary:"رویه تعویض Magnetron و بازگرداندن سیستم به عملکرد نرمال.",warn:"قبل از شروع، دستگاه را حداقل ۲ ساعت خاموش و بریکر را قطع کنید.",tools:["دستکش ESD","آچار تورک","فیلر","گریس وکیوم"],steps:[{t:"خاموشی کامل، قطع بریکر، انتظار ۳۰ دقیقه",level:"danger",note:"مرگ‌بار در صورت عدم رعایت"},{t:"باز کردن پنل Modulator و برچسب‌گذاری کابل‌ها"},{t:"جدا کردن کابل‌های HV، Heater و Filament"},{t:"باز کردن پیچ‌ها",note:"تورک ۲۵ N·m"},{t:"برداشتن Magnetron قدیمی",level:"warn"},{t:"نصب Magnetron جدید با گریس وکیوم"},{t:"اتصال کابل‌ها و بستن پنل"},{t:"اجرای Auto-Conditioning",note:"۳۰–۶۰ دقیقه"},{t:"تنظیم AFC",level:"warn"},{t:"کالیبراسیون و QA نهایی"}]},
{id:"m10",title:"تعویض اتاقک یونیزاسیون مانیتور",cat:"replace",machines:["Versa HD","Infinity","Synergy"],code:"REP-505",duration:"۲ ساعت",level:"متوسط",summary:"تعویض Transmission Chamber در مسیر پرتو.",warn:"پس از تعویض، کالیبراسیون مجدد دز الزامی است.",tools:["پیچ‌گوشتی Torx","دستکش","فیلر"],steps:[{t:"خاموشی و سرد شدن دستگاه"},{t:"باز کردن پنل Head"},{t:"جدا کردن کابل HV و سیگنال"},{t:"باز کردن پیچ‌های اتاقک"},{t:"خارج کردن اتاقک قدیمی و بازرسی"},{t:"نصب اتاقک جدید",level:"warn",note:"مرکز روی محور پرتو"},{t:"اتصال و بستن پنل"},{t:"اجرای Daily QA"},{t:"کالیبراسیون مجدد",level:"warn"}]},
{id:"m11",title:"عیب‌یابی توقف پرتو در حین درمان",cat:"trouble",machines:["Versa HD","Infinity","Synergy","Unity","Axesse"],code:"TRB-600",duration:"متغیر",level:"متوسط",summary:"راهنمای عیب‌یابی توقف ناگهانی Beam و کدهای رایج.",warn:"بیمار باید از اتاق خارج و دز اعمال‌شده ثبت شود.",tools:["دفتر خطا","لاگ سیستم","مولتی‌متر"],steps:[{t:"ثبت کد خطا از پنل"},{t:"بازبینی Service → Logs"},{t:"بررسی سطح آب خنک‌کننده",note:"دمای ورودی زیر ۳۰°C"},{t:"بررسی فشار SF6",level:"warn",note:"بالای ۲۸ psi"},{t:"بررسی AFC و Magnetron/Klystron"},{t:"گزارش به Elekta اگر تکرار شد"},{t:"QA روزانه قبل از ادامه درمان",level:"warn"}]},
{id:"m12",title:"عیب‌یابی خطاهای MLC",cat:"trouble",machines:["Versa HD","Infinity","Synergy"],code:"TRB-610",duration:"۴۵ دقیقه",level:"متوسط",summary:"رفع خطاهای گیرکردن Leaf، Motor و Encoder.",warn:"قبل از دسترسی دستی، MLC را Home کنید.",tools:["برس نرم","هوای فشرده","گریس MLC"],steps:[{t:"شناسایی شماره Leaf مشکل‌دار"},{t:"اجرای Auto-Home"},{t:"بررسی مسیر Leaf"},{t:"تمیزکاری ریل و Leaf",level:"warn",note:"بدون حلال قوی"},{t:"بررسی Motor"},{t:"بازبینی Encoder اگر تکرار شد"},{t:"اجرای Picket Fence"}]},
{id:"m13",title:"کالیبراسیون هندسی CBCT",cat:"imaging",machines:["Versa HD","Infinity","Unity","Axesse"],code:"IMG-700",duration:"۹۰ دقیقه",level:"پیشرفته",summary:"کالیبراسیون کامل CBCT شامل Isocenter و موقعیت‌یابی سه‌بعدی.",warn:"باید توسط تیم Elekta Service انجام شود.",tools:["فانتوم CatPhan","ابزار کالیبراسیون"],steps:[{t:"قرارگیری فانتوم در Isocenter"},{t:"Service → CBCT → Geometry Calibration"},{t:"اسکن ۳۶۰ درجه"},{t:"بازبینی Calibration",level:"warn",note:"انحراف زیر ۰.۵mm"},{t:"Reconstruction با CatPhan"},{t:"تست دقت با Marker در ۶ جهت"},{t:"ذخیره و تست نهایی"}]},
{id:"m14",title:"عیب‌یابی سیستم خنک‌کننده",cat:"trouble",machines:["Versa HD","Infinity","Synergy","Precise"],code:"TRB-620",duration:"۶۰ دقیقه",level:"متوسط",summary:"رفع مشکلات Chiller، پمپ، رادیاتور و افت فشار.",warn:"قبل از باز کردن، فشار را تخلیه کنید.",tools:["مولتی‌متر","متر دما","فشارسنج"],steps:[{t:"بررسی سطح مایع و نشتی"},{t:"اندازه‌گیری ΔT",note:"۳–۵°C"},{t:"بررسی پمپ و جریان"},{t:"بازبینی فیلترها"},{t:"تست سنسور دما و اینترلاک"},{t:"تعویض مایع در صورت نیاز",level:"warn"},{t:"QA پس از رفع"}]},
{id:"m15",title:"Warm-up و Standby روزانه دستگاه",cat:"daily",machines:["Versa HD","Infinity","Synergy","Axesse","Precise"],code:"QA-D-110",duration:"۲۰ دقیقه",level:"پایه",summary:"رویه استاندارد روشن کردن دستگاه، انجام Warm-up کامل و قرار دادن دستگاه در وضعیت Standby در پایان روز.",warn:"هرگز دستگاه را بدون انجام Warm-up کامل وارد حالت درمان نکنید.",tools:["دماسنج محیط","چک‌لیست روزانه"],steps:[{t:"بررسی دمای محیط اتاق درمان (باید ۲۰–۲۴°C باشد)"},{t:"روشن کردن مانیتورها به ترتیب شماره‌گذاری (۱، ۲، ۳، ۴)"},{t:"ورود به اپلیکیشن iGuide با کاربر Clinical",note:"از منوی Start → iGuide استفاده کنید."},{t:"انتظار برای تکمیل Warm-up خودکار (حداقل ۱۰ دقیقه)",note:"چراغ وضعیت روی پنل باید سبز شود.",level:"warn"},{t:"بررسی سبز بودن پس‌زمینه مانیتور Integrity",note:"در صورت قرمز بودن، کد خطا را بررسی کنید."},{t:"اجرای تست Reset Motors از پنل اتاق",level:"warn"},{t:"قرار دادن MLC در وضعیت Park قبل از خاموشی",note:"در انتهای روز، از منوی Park MLC استفاده کنید."},{t:"خاموش کردن مانیتورها به ترتیب معکوس (۴، ۳، ۲، ۱)",note:"بین هر خاموشی چند ثانیه صبر کنید."}]},
{id:"m16",title:"پشتیبان‌گیری هفتگی پایگاه داده بیماران",cat:"weekly",machines:["Versa HD","Infinity","Synergy","Unity","Axesse"],code:"QA-W-220",duration:"۳۰ دقیقه",level:"متوسط",summary:"رویه پشتیبان‌گیری از پایگاه داده بیماران و تنظیمات سیستم در iGuide، XVI و iViewGT.",warn:"پشتیبان‌گیری باید روی حافظه خارجی (USB) انجام شود و کپی آن در جای امن نگهداری شود.",tools:["حافظه USB فرمت‌شده","دسترسی ادمین"],steps:[{t:"ورود به سیستم به عنوان کاربر Administrator"},{t:"در iGuide: کلیک روی آیکون Backup",note:"معمولاً جمعه‌شب‌ها انجام می‌شود."},{t:"انتخاب مقصد پشتیبان (USB)"},{t:"انتظار برای تکمیل فرآیند (۱۰–۱۵ دقیقه)"},{t:"بررسی لاگ سیستم برای تأیید موفقیت‌آمیز بودن"},{t:"پشتیبان‌گیری از تنظیمات XVI",note:"از مسیر Administration → Backup استفاده کنید."},{t:"پشتیبان‌گیری از داده‌های iViewGT"},{t:"برچسب‌گذاری USB با تاریخ و نام اپراتور"}]},
{id:"m17",title:"کالیبراسیون ماهانه دزیمتری و کیفیت پرتو",cat:"monthly",machines:["Versa HD","Infinity","Synergy","Unity","Axesse","Precise"],code:"QA-M-320",duration:"۹۰ دقیقه",level:"پیشرفته",summary:"کالیبراسیون کامل Beam Output، کیفیت پرتو (PDD/TPR)، پروفایل عرضی و بررسی Flatness/Symmetry.",warn:"این رویه فقط باید توسط فیزیک‌دان پزشکی یا با نظارت ایشان انجام شود.",tools:["فانتوم آب","اتاقک Farmer","الکترومتر","دماسنج","بارومتر"],steps:[{t:"آماده‌سازی فانتوم آب با دمای ۲۰°C"},{t:"قرارگیری اتاقک در عمق ۱۰cm، SSD=100cm"},{t:"ورود به Service Mode → Dose Cal"},{t:"فعال‌سازی Dose Reference Calculator"},{t:"تابش ۱۰۰ MU با میدان ۱۰×۱۰ cm²",note:"مرجع: ۱۰۰ cGy ± ۲٪",level:"warn"},{t:"ثبت مقادیر دما و فشار و محاسبه kTP"},{t:"محاسبه دز جذبی و مقایسه با مرجع",note:"در صورت انحراف بیش از ۲٪، کالیبراسیون Output الزامی است."},{t:"اندازه‌گیری PDD در عمق‌های مختلف",note:"انحراف مجاز ± ۱٪"},{t:"اندازه‌گیری پروفایل عرضی",note:"Flatness زیر ۳٪، Symmetry زیر ۲٪"},{t:"تکرار برای تمام انرژی‌های فوتون و الکترون"},{t:"ذخیره نتایج و ثبت در فرم QA"}]},
{id:"m18",title:"تعویض Klystron دستگاه خطی",cat:"replace",machines:["Versa HD","Infinity","Synergy","Precise"],code:"REP-510",duration:"۴–۶ ساعت",level:"پیشرفته",summary:"رویه کامل تعویض Klystron، تنظیم مجدد RF Drive و بازگرداندن سیستم به عملکرد نرمال.",warn:"قبل از شروع، دستگاه را حداقل ۲ ساعت خاموش و بریکر اصلی را قطع کنید. تخلیه خازن‌های High Voltage الزامی است.",tools:["دستکش عایق HV","آچار تورک","مولتی‌متر HV","گریس وکیوم","چک‌لیست Elekta"],steps:[{t:"خاموشی کامل دستگاه و قطع بریکر اصلی",level:"danger",note:"مرگ‌بار در صورت عدم رعایت"},{t:"انتظار ۳۰ دقیقه برای تخلیه کامل خازن‌ها"},{t:"باز کردن پنل محفظه Klystron و برچسب‌گذاری کابل‌ها",note:"قبل از جدا کردن، از تمام اتصالات عکس بگیرید."},{t:"جدا کردن کابل‌های HV، Filament، Heater و RF"},{t:"باز کردن پیچ‌های نگه‌دارنده Klystron",note:"تورک استاندارد: ۳۰ N·m"},{t:"خارج کردن Klystron قدیمی با استفاده از جرثقیل سقفی",level:"warn",note:"وزن Klystron حدود ۵۰ کیلوگرم است."},{t:"بررسی اتصالات Waveguide و تمیزکاری"},{t:"نصب Klystron جدید و اعمال گریس وکیوم روی اورینگ‌ها"},{t:"اتصال کابل‌ها طبق برچسب‌ها"},{t:"روشن کردن و اجرای رویه Auto-Conditioning",note:"ممکن است ۶۰–۹۰ دقیقه طول بکشد."},{t:"تنظیم RF Drive و بررسی پایداری Beam",level:"warn"},{t:"اجرای کالیبراسیون کامل و QA ماهانه به عنوان تست نهایی"}]},
{id:"m19",title:"عیب‌یابی خطای Gantry Interlock (i70)",cat:"trouble",machines:["Versa HD","Infinity","Synergy","Precise"],code:"TRB-630",duration:"۳۰–۶۰ دقیقه",level:"متوسط",summary:"راهنمای تشخیص و رفع خطای i70 (Gantry Interlock) که معمولاً در اثر مشکل در Encoder، Motor یا کابل‌های ارتباطی رخ می‌دهد.",warn:"قبل از بررسی، Gantry را در وضعیت Home قرار دهید.",tools:["مولتی‌متر","چک‌لیست Encoder","لاگ سیستم"],steps:[{t:"ثبت کد خطای دقیق از پنل Service"},{t:"بررسی لاگ سیستم در Service → Logs"},{t:"اجرای رویه Reset Motors از پنل اتاق"},{t:"بررسی اتصالات کابل Encoder Gantry",level:"warn"},{t:"اندازه‌گیری ولتاژ Encoder (باید بین ۵–۲۴V باشد)"},{t:"بررسی عملکرد Motor Gantry در حرکت آهسته"},{t:"در صورت تکرار خطا، کالیبراسیون Gantry Angle را انجام دهید"},{t:"اجرای QA روزانه پس از رفع خطا"}]}
];

/* ========== ERROR CODES ========== */
const ERRORS = [
{code:"E-101",sev:"red",machine:"Versa HD / Infinity / Synergy",title:"خطای Magnetron — فشار گاز پایین",act:"بررسی فشار SF6، در صورت نیاز شارژ مجدد"},
{code:"E-102",sev:"orange",machine:"Versa HD / Infinity",title:"کاهش توان RF",act:"بررسی AFC، تنظیم مجدد در سرویس مود"},
{code:"E-115",sev:"red",machine:"همه Linacها",title:"دما بیش از حد Modulator",act:"بررسی فن‌ها و سیستم خنک‌کننده"},
{code:"E-120",sev:"orange",machine:"Versa HD / Synergy",title:"افت فشار آب خنک‌کننده",act:"بررسی پمپ و سطح مایع"},
{code:"E-205",sev:"orange",machine:"Versa HD / Infinity / Axesse",title:"خطای موقعیت MLC Leaf",act:"اجرای Auto-Home و کالیبراسیون MLC"},
{code:"E-210",sev:"red",machine:"Versa HD / Axesse",title:"عدم تطابق Encoder MLC",act:"تعویض Encoder و کالیبراسیون"},
{code:"E-305",sev:"blue",machine:"Infinity / Synergy",title:"هشدار Imaging — Dark Field",act:"کالیبراسیون Dark و Gain"},
{code:"E-310",sev:"orange",machine:"Versa HD / Infinity",title:"خطای Flat Panel Detector",act:"بررسی اتصالات و ری‌استارت"},
{code:"E-410",sev:"red",machine:"Unity MR-Linac",title:"افت میدان مغناطیسی",act:"بررسی Cryostat و سطح هلیوم"},
{code:"E-415",sev:"orange",machine:"Unity",title:"دمای Magnet بالاتر از حد مجاز",act:"بررسی سیستم خنک‌کننده MR"},
{code:"E-505",sev:"orange",machine:"همه Linacها",title:"خطای دزیمتری — انحراف خروجی",act:"کالیبراسیون مجدد Output"},
{code:"E-510",sev:"red",machine:"همه Linacها",title:"عدم تطابق دز مانیتور",act:"توقف درمان، بررسی اتاقک‌های یونیزاسیون"},
{code:"E-605",sev:"red",machine:"همه Linacها",title:"خطای اینترلاک درب اتاق",act:"عدم استفاده از دستگاه تا رفع"},
{code:"E-610",sev:"orange",machine:"Versa HD / Axesse",title:"خطای دکمه Emergency Stop",act:"بررسی و ریست دکمه‌ها"},
{code:"E-705",sev:"orange",machine:"Versa HD / Infinity / Axesse",title:"خطای سیستم تصویربرداری kV",act:"کالیبراسیون kV و Flat Panel"},
{code:"E-710",sev:"blue",machine:"Infinity / Synergy",title:"هشدار تصویر نویزی",act:"بررسی دز تصویربرداری"},
{code:"E-805",sev:"orange",machine:"همه Linacها",title:"قطع ارتباط با کنسول اصلی",act:"بررسی کابل شبکه و ری‌استارت سرویس"},
{code:"E-810",sev:"blue",machine:"Versa HD / Unity",title:"هشدار خطای نرم‌افزار Monaco",act:"بازبینی لاگ و به‌روزرسانی نرم‌افزار"},
{code:"E-905",sev:"red",machine:"همه Linacها",title:"خطای سیستم موقعیت‌یابی میز",act:"کالیبراسیون Encoder میز"},
{code:"E-910",sev:"orange",machine:"Versa HD / Axesse",title:"ناهم‌ترازی گانتری",act:"کالیبراسیون Gantry Angle"},
{code:"i70",sev:"red",machine:"Versa HD / Infinity / Synergy",title:"Gantry Interlock",act:"بررسی Encoder و Motor Gantry — Reset Motors"},
{code:"i517",sev:"orange",machine:"Precise",title:"Sctr Limit Interlock",act:"بررسی محدودیت‌های Sector و کالیبراسیون"},
{code:"i116",sev:"orange",machine:"همه Linacها",title:"Scan Heat Limit",act:"کاهش فریم‌های تصویربرداری یا افزایش زمان"},
{code:"i138",sev:"blue",machine:"همه Linacها",title:"پروجکشن ناکافی برای بازسازی",act:"افزایش AcquisitionInterval یا Gantry Travel"},
{code:"i140",sev:"orange",machine:"همه Linacها",title:"FlexMap منقضی شده",act:"کالیبراسیون مجدد FlexMap"},
{code:"i605",sev:"red",machine:"همه Linacها",title:"اینترلاک درب اتاق",act:"بررسی میکروسوئیچ درب"},
{code:"i805",sev:"orange",machine:"همه Linacها",title:"قطع ارتباط کنسول",act:"بررسی کابل شبکه و ری‌استارت سرویس"},
{code:"i905",sev:"red",machine:"همه Linacها",title:"خطای موقعیت‌یابی میز",act:"کالیبراسیون Encoder میز"},
{code:"i910",sev:"orange",machine:"Versa HD / Axesse",title:"ناهم‌ترازی گانتری",act:"کالیبراسیون Gantry Angle"},
{code:"i101",sev:"red",machine:"Versa HD / Infinity",title:"Gantry Collision Risk",act:"بررسی اینترلاک‌های ایمنی — توقف فوری"}
];

const MACHINES = ["Versa HD","Infinity","Synergy","Unity","Axesse","Precise","Compact"];

/* ========== STATE ========== */
const fa = n => String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const $ = s => document.querySelector(s);
let libFilter = "all", libQ = "", codeFilter = "all", codeQ = "";
let favs = new Set(JSON.parse(localStorage.getItem("favs") || "[]"));
let curSheetManual = null;

/* ========== RENDER ========== */
function renderStats(){
  $("#stM").textContent = fa(MANUALS.length);
  $("#stE").textContent = fa(ERRORS.length);
  $("#stF").textContent = fa(favs.size);
  $("#abM").textContent = fa(MANUALS.length) + " مورد";
  $("#abE").textContent = fa(ERRORS.length) + " مورد";
}
function renderCats(){
  $("#catGrid").innerHTML = CATS.map((c,i) =>
    '<button class="cat" style="background:linear-gradient(145deg,'+c.c1+' 0%,'+c.c2+' 100%);animation-delay:'+(i*.04)+'s" onclick="goCat(\''+c.id+'\')">'
    +'<div class="cat-ic">'+ICONS[c.icon]+'</div>'
    +'<div class="cat-n">'+c.name+'</div>'
    +'</button>'
  ).join("");
}
function renderHomePop(){
  const ids = ["m1","m5","m7","m11","m15","m17"];
  $("#homePop").innerHTML = ids.map(id => MANUALS.find(m => m.id === id)).filter(Boolean)
    .map((m,i) => manualCard(m, true, i*.06)).join("");
}
function manualCard(m, compact, delay){
  if(delay===undefined) delay=0;
  const cat = CATS.find(c => c.id === m.cat);
  const isFav = favs.has(m.id);
  const grad = "linear-gradient(145deg,"+cat.c1+" 0%,"+cat.c2+" 100%)";
  return '<div class="manual" style="animation-delay:'+delay+'s" onclick="openManual(\''+m.id+'\')">'
    +'<div class="manual-ic" style="background:'+grad+'">'+ICONS[cat.icon]+'</div>'
    +'<div class="manual-body">'
    +'<div class="manual-title">'+m.title+'</div>'
    +(compact?'':'<div class="manual-sub">'+m.summary+'</div>')
    +'<div class="manual-meta">'
    +'<span class="badge">'+m.code+'</span>'
    +'<span>'+m.duration+'</span>'
    +'<span>'+m.level+'</span>'
    +'</div></div>'
    +'<button class="manual-fav '+(isFav?'on':'')+'" onclick="event.stopPropagation();toggleFav(\''+m.id+'\')">'
    +(isFav ? ICONS.starFill : ICONS.star)
    +'</button></div>';
}
function renderLibChips(){
  const all = [{id:"all",name:"همه"}].concat(CATS);
  $("#libChips").innerHTML = all.map(c =>
    '<button class="chip '+(libFilter===c.id?'on':'')+'" onclick="libFilter=\''+c.id+'\';renderLibChips();renderLib()">'+c.name+'</button>'
  ).join("");
}
function renderLib(){
  let list = MANUALS.filter(m => libFilter === "all" || m.cat === libFilter);
  if(libQ.trim()){
    const q = libQ.toLowerCase();
    list = list.filter(m => (m.title+m.summary+m.code+m.machines.join(" ")).toLowerCase().includes(q));
  }
  const el = $("#libList");
  if(!list.length){ el.innerHTML = emptyState("منوالی یافت نشد","فیلتر را تغییر دهید"); return; }
  el.innerHTML = list.map((m,i) => manualCard(m, false, i*.04)).join("");
}
function renderCodeChips(){
  const sevs = [{id:"all",n:"همه"},{id:"red",n:"بحرانی"},{id:"orange",n:"هشدار"},{id:"blue",n:"اطلاع"}];
  $("#codeChips").innerHTML = sevs.map(s =>
    '<button class="chip '+(codeFilter===s.id?'on':'')+'" onclick="codeFilter=\''+s.id+'\';renderCodeChips();renderCodes()">'+s.n+'</button>'
  ).join("");
}
function renderCodes(){
  let list = ERRORS.filter(c => codeFilter === "all" || c.sev === codeFilter);
  if(codeQ.trim()){
    const q = codeQ.toLowerCase();
    list = list.filter(c => (c.code+c.title+c.act+c.machine).toLowerCase().includes(q));
  }
  const el = $("#codeList");
  if(!list.length){ el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--label2)">کدی یافت نشد</div>'; return; }
  el.innerHTML = list.map((c,i) => '<div class="ecode" style="animation-delay:'+(i*.02)+'s">'
    +'<div class="ecode-code '+c.sev+'">'+c.code+'</div>'
    +'<div class="ecode-body">'
    +'<div class="ecode-t">'+c.title+'</div>'
    +'<div class="ecode-s">'+c.machine+'</div>'
    +'<div class="ecode-s" style="color:var(--blue);margin-top:4px">اقدام: '+c.act+'</div>'
    +'</div></div>').join("");
}
function renderFavs(){
  const list = MANUALS.filter(m => favs.has(m.id));
  const el = $("#favList");
  if(!list.length){ el.innerHTML = emptyState("هنوز چیزی ذخیره نکردی","روی ستاره بزن تا اینجا بیاد"); return; }
  el.innerHTML = list.map(m => manualCard(m, false, 0)).join("");
}
function renderMachineList(){
  $("#machineList").innerHTML = MACHINES.map((m,i) => {
    const cnt = MANUALS.filter(x => x.machines.includes(m)).length;
    const colors = ["var(--blue)","var(--green)","var(--orange)","var(--purple)","var(--pink)","var(--teal)","var(--indigo)"];
    return '<button class="row" onclick="filterMachine(\''+m+'\')">'
      +'<div class="row-icon" style="background:'+colors[i%7]+'">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="6" rx="2"/><path d="M8 9v4a4 4 0 0 0 8 0V9"/><circle cx="12" cy="17" r="3"/></svg>'
      +'</div>'
      +'<div class="row-body"><div class="row-title">'+m+'</div><div class="row-sub">'+fa(cnt)+' منوال</div></div>'
      +'<div class="row-chev">'+ICONS.chev+'</div>'
      +'</button>';
  }).join("");
}
function emptyState(t, s){
  return '<div class="empty">'
    +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
    +'</svg>'
    +'<div class="empty-t">'+t+'</div>'
    +'<div>'+s+'</div>'
    +'</div>';
}

function openManual(id){
  const m = MANUALS.find(x => x.id === id);
  if(!m) return;
  curSheetManual = m;
  const cat = CATS.find(c => c.id === m.cat);
  const isFav = favs.has(m.id);
  const fb = $("#sheetFav");
  fb.innerHTML = isFav ? ICONS.starFill : ICONS.star;
  fb.style.color = isFav ? "var(--yellow)" : "var(--blue)";
  fb.style.opacity = 1;
  fb.onclick = () => { toggleFav(m.id); openManual(m.id); };
  $("#sheetTitle").textContent = m.code;
  const grad = "linear-gradient(145deg,"+cat.c1+" 0%,"+cat.c2+" 100%)";
  $("#sheetBody").innerHTML =
    '<div class="detail-hero" style="background:'+grad+'">'
    +'<div class="detail-cat">'+cat.name+'</div>'
    +'<div class="detail-title">'+m.title+'</div>'
    +'<div class="detail-sum">'+m.summary+'</div>'
    +'<div class="detail-meta">'
    +'<div class="detail-meta-item">'+ICONS.clock+'<span>'+m.duration+'</span></div>'
    +'<div class="detail-meta-item">'+ICONS.target+'<span>'+m.level+'</span></div>'
    +'</div></div>'
    +(m.warn ? '<div class="alert-box">'+ICONS.warn+'<div class="txt"><div class="t">هشدار ایمنی</div>'+m.warn+'</div></div>' : "")
    +'<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">دستگاه‌های مرتبط</div></div>'
    +'<div class="tags" style="margin-bottom:16px">'+m.machines.map(x => '<span class="tag">'+x+'</span>').join("")+'</div>'
    +'<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">ابزار مورد نیاز</div></div>'
    +'<div class="tags" style="margin-bottom:20px">'+m.tools.map(x => '<span class="tag">'+x+'</span>').join("")+'</div>'
    +'<div class="section-h" style="padding-right:0"><div class="section-t" style="font-size:13px;color:var(--label2)">مراحل ('+fa(m.steps.length)+')</div></div>'
    +'<div style="background:var(--card);border-radius:14px;padding:4px 16px;margin-bottom:16px">'
    +m.steps.map((s,i) => '<div class="step '+(s.level||'')+'">'
      +'<div class="step-n">'+fa(i+1)+'</div>'
      +'<div class="step-body"><div class="step-t">'+s.t+'</div>'+(s.note?'<div class="step-note">'+s.note+'</div>':'')+'</div>'
      +'</div>').join("")
    +'</div>';
  $("#backdrop").classList.add("show");
  $("#sheet").classList.add("show");
}
function closeSheet(){
  $("#backdrop").classList.remove("show");
  $("#sheet").classList.remove("show");
}
function toggleFav(id){
  if(favs.has(id)){ favs.delete(id); toast("حذف شد"); }
  else { favs.add(id); toast("ذخیره شد ★"); }
  localStorage.setItem("favs", JSON.stringify([...favs]));
  renderStats(); renderHomePop(); renderLib(); renderFavs();
  if(curSheetManual){
    const fb = $("#sheetFav");
    const isFav = favs.has(curSheetManual.id);
    fb.innerHTML = isFav ? ICONS.starFill : ICONS.star;
    fb.style.color = isFav ? "var(--yellow)" : "var(--blue)";
  }
}
function filterMachine(m){
  libFilter = "all"; libQ = m;
  renderLibChips(); renderLib();
  go("lib");
}
function goCat(id){
  libFilter = id; renderLibChips(); renderLib(); go("lib");
}

const TABS = [
  {id:"home",label:"خانه",icon:ICONS.home},
  {id:"lib",label:"کتابخانه",icon:ICONS.book},
  {id:"codes",label:"کد خطا",icon:ICONS.warn},
  {id:"fav",label:"ذخیره",icon:ICONS.star},
  {id:"more",label:"بیشتر",icon:ICONS.more}
];
function renderTabbar(){
  const cur = document.querySelector(".page.on").id.replace("page-","");
  $("#tabbar").innerHTML = TABS.map(t =>
    '<button class="tab '+(t.id===cur?'active':'')+'" onclick="go(\''+t.id+'\')">'+t.icon+'<span>'+t.label+'</span></button>'
  ).join("");
}
function go(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("on"));
  document.getElementById("page-"+id).classList.add("on");
  document.getElementById("main").scrollTop = 0;
  document.querySelectorAll("[data-nav]").forEach(n => n.classList.remove("scrolled"));
  renderTabbar();
  if(id === "fav") renderFavs();
  if(id === "lib") renderLib();
  if(id === "codes") renderCodes();
}

function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1800);
}
function updateOnline(){
  const el = $("#onlineStatus");
  if(!el) return;
  if(navigator.onLine){ el.textContent = "فعال ✓"; el.style.color = "var(--green)"; }
  else { el.textContent = "آفلاین — کش"; el.style.color = "var(--blue)"; }
}
window.addEventListener("online", updateOnline);
window.addEventListener("offline", updateOnline);

document.getElementById("main").addEventListener("scroll", e => {
  const top = e.target.scrollTop;
  const nav = document.querySelector(".page.on [data-nav]");
  if(!nav) return;
  nav.classList.toggle("scrolled", top > 24);
});

document.addEventListener("click", e => {
  const tab = e.target.closest(".tab");
  if(!tab) return;
  const rect = tab.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size/2) + "px";
  ripple.style.top  = (e.clientY - rect.top  - size/2) + "px";
  tab.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
  if(navigator.vibrate) navigator.vibrate(8);
}, { passive:true });

document.addEventListener("touchstart", e => {
  const card = e.target.closest(".cat");
  if(!card) return;
  const rect = card.getBoundingClientRect();
  const touch = e.touches[0];
  card.style.setProperty('--x', ((touch.clientX - rect.left) / rect.width * 100) + '%');
  card.style.setProperty('--y', ((touch.clientY - rect.top) / rect.height * 100) + '%');
}, { passive:true });

if("serviceWorker" in navigator){
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(()=>{}));
}

renderTabbar();
renderStats();
renderCats();
renderHomePop();
renderLibChips();
renderLib();
renderCodeChips();
renderCodes();
renderFavs();
renderMachineList();
updateOnline();