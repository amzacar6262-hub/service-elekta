/* ═══════════════════════════════════════
   data3.js — جداول مرجع (Reference Tables)
   ═══════════════════════════════════════ */

const REF_TABLES = [
{
  id:"tol",
  title:"تلورانس‌های QA",
  icon:"target",
  color:["#FF3B30","#AF52DE"],
  desc:"مقادیر مجاز انحراف برای تست‌های روزانه تا سالانه طبق AAPM TG-142",
  rows:[
    {k:"دز خروجی روزانه",v:"± ۳٪",cat:"دزیمتری"},
    {k:"دز خروجی ماهانه",v:"± ۲٪",cat:"دزیمتری"},
    {k:"دز خروجی سالانه",v:"± ۱٪",cat:"دزیمتری"},
    {k:"انحراف Beam Energy",v:"± ۲٪",cat:"دزیمتری"},
    {k:"Flatness پروفایل",v:"< ۳٪",cat:"دزیمتری"},
    {k:"Symmetry پروفایل",v:"< ۲٪",cat:"دزیمتری"},
    {k:"Isocenter مکانیکی",v:"< ۱ mm",cat:"مکانیک"},
    {k:"Isocenter تابش",v:"< ۱ mm",cat:"مکانیک"},
    {k:"موقعیت MLC Leaf",v:"< ۱ mm",cat:"MLC"},
    {k:"Backlash MLC",v:"< ۰.۳ mm",cat:"MLC"},
    {k:"هم‌ترازی لیزر",v:"< ۱ mm در ۱m",cat:"مکانیک"},
    {k:"دقت Gantry Angle",v:"± ۰.۵°",cat:"مکانیک"},
    {k:"دقت Collimator",v:"± ۰.۵°",cat:"مکانیک"},
    {k:"دقت Couch Position",v:"± ۱ mm",cat:"مکانیک"},
    {k:"دقت kVp",v:"± ۲٪",cat:"تصویربرداری"},
    {k:"Uniformity تصویر",v:"< ۳٪",cat:"تصویربرداری"},
    {k:"دقت CBCT Isocenter",v:"< ۰.۵ mm",cat:"تصویربرداری"},
    {k:"دقت HexaPOD",v:"< ۱ mm و ۱°",cat:"SBRT"},
    {k:"انحراف In-Vivo",v:"< ۵٪",cat:"In-Vivo"},
    {k:"Gamma Pass Rate",v:"> ۹۵٪ (۳٪/۳mm)",cat:"IMRT"}
  ]
},
{
  id:"rf",
  title:"پارامترهای RF",
  icon:"check",
  color:["#FF9F0A","#FF6B00"],
  desc:"فرکانس، توان، ولتاژ و فشار در بخش RF — Synergy و Infinity",
  rows:[
    {k:"فرکانس پایه Magnetron",v:"۲۸۵۶ MHz",cat:"Magnetron"},
    {k:"توان خروجی Magnetron",v:"۵.۵ MW",cat:"Magnetron"},
    {k:"ولتاژ Filament",v:"~ ۱۰ V DC",cat:"Magnetron"},
    {k:"جریان Filament",v:"~ ۲۰ A",cat:"Magnetron"},
    {k:"فشار SF6 نرمال",v:"۳۰ psi",cat:"Waveguide"},
    {k:"حداقل فشار SF6",v:"۲۸ psi",cat:"Waveguide"},
    {k:"توان Klystron",v:"۵-۶ MW",cat:"Klystron"},
    {k:"ولتاژ Klystron Beam",v:"~ ۱۴۰ kV",cat:"Klystron"},
    {k:"Pulse Repetition Rate",v:"۲۰۰-۳۰۰ Hz",cat:"Modulator"},
    {k:"Pulse Width",v:"~ ۵ µs",cat:"Modulator"},
    {k:"AFC Voltage",v:"۰-۱۰ V DC",cat:"کنترل"},
    {k:"VSWR نرمال",v:"< ۱.۲",cat:"کنترل"}
  ]
},
{
  id:"cool",
  title:"سیستم خنک‌کننده",
  icon:"clock",
  color:["#5AC8FA","#0A84FF"],
  desc:"دما، جریان و فشار آب خنک‌کننده در Chiller و مدار داخلی",
  rows:[
    {k:"دمای آب ورودی",v:"۱۸-۲۲ °C",cat:"Chiller"},
    {k:"دمای آب خروجی",v:"۲۲-۲۸ °C",cat:"Chiller"},
    {k:"ΔT نرمال",v:"۳-۵ °C",cat:"Chiller"},
    {k:"جریان آب کل",v:"~ ۳۰-۴۰ L/min",cat:"Chiller"},
    {k:"فشار آب",v:"۲-۴ bar",cat:"Chiller"},
    {k:"ظرفیت مخزن",v:"~ ۲۰-۳۰ L",cat:"Chiller"},
    {k:"دمای محیط اتاق",v:"۲۰-۲۴ °C",cat:"محیط"},
    {k:"رطوبت نسبی",v:"۴۰-۶۰٪",cat:"محیط"},
    {k:"Conductivity آب",v:"< ۵ µS/cm",cat:"کیفیت"},
    {k:"pH آب",v:"۷-۸",cat:"کیفیت"}
  ]
},
{
  id:"mech",
  title:"محدودیت‌های مکانیکی",
  icon:"grid",
  color:["#BF5AF2","#5856D6"],
  desc:"سرعت، شتاب و محدوده حرکت اجزای مکانیکی",
  rows:[
    {k:"سرعت Gantry (نرمال)",v:"۰-۶ RPM",cat:"Gantry"},
    {k:"سرعت Gantry (VMAT)",v:"~ ۶ RPM",cat:"Gantry"},
    {k:"محدوده Gantry",v:"۰-۳۶۰°",cat:"Gantry"},
    {k:"محدوده Collimator",v:"± ۱۸۰°",cat:"Collimator"},
    {k:"محدوده Jaw X",v:"۰-۲۰ cm",cat:"Jaws"},
    {k:"محدوده Jaw Y",v:"۰-۴۰ cm",cat:"Jaws"},
    {k:"سرعت Jaw",v:"~ ۳ cm/s",cat:"Jaws"},
    {k:"محدوده Couch Long",v:"۰-۲۰۰ cm",cat:"Couch"},
    {k:"محدوده Couch Lat",v:"± ۲۰ cm",cat:"Couch"},
    {k:"محدوده Couch Vert",v:"~ ۵۰-۱۸۰ cm",cat:"Couch"},
    {k:"حداکثر وزن بیمار",v:"~ ۲۰۰ kg",cat:"Couch"},
    {k:"دقت HexaPOD X/Y",v:"± ۳ cm",cat:"HexaPOD"},
    {k:"دقت HexaPOD Z",v:"± ۲ cm",cat:"HexaPOD"},
    {k:"محدوده Pitch/Roll",v:"± ۳°",cat:"HexaPOD"},
    {k:"محدوده Yaw",v:"± ۳°",cat:"HexaPOD"}
  ]
},
{
  id:"energy",
  title:"انرژی و Dose Rate",
  icon:"warn",
  color:["#FFD60A","#FF9500"],
  desc:"انرژی‌های فوتون و الکترون، Dmax، PDD و Dose Rate",
  rows:[
    {k:"فوتون Synergy",v:"۶، ۱۰، ۱۸ MV",cat:"فوتون"},
    {k:"فوتون Infinity",v:"۶، ۱۰ MV (+ FFF)",cat:"فوتون"},
    {k:"فوتون Versa HD",v:"۶، ۱۰، ۱۸ MV (+ FFF)",cat:"فوتون"},
    {k:"الکترون",v:"۶، ۹، ۱۲، ۱۵، ۱۸، ۲۰ MeV",cat:"الکترون"},
    {k:"Dmax 6 MV",v:"۱.۵ cm",cat:"فوتون"},
    {k:"Dmax 10 MV",v:"۲.۴ cm",cat:"فوتون"},
    {k:"Dmax 18 MV",v:"۳.۲ cm",cat:"فوتون"},
    {k:"PDD₁₀ (۶ MV)",v:"~ ۶۷٪",cat:"فوتون"},
    {k:"PDD₁₀ (۱۰ MV)",v:"~ ۷۴٪",cat:"فوتون"},
    {k:"TPR₂₀/₁₀ (۶ MV)",v:"~ ۰.۶۷",cat:"فوتون"},
    {k:"Dose Rate نرمال",v:"۶۰۰ MU/min",cat:"Dose Rate"},
    {k:"Dose Rate FFF 6MV",v:"۱۴۰۰ MU/min",cat:"Dose Rate"},
    {k:"Dose Rate FFF 10MV",v:"۲۴۰۰ MU/min",cat:"Dose Rate"},
    {k:"SAD استاندارد",v:"۱۰۰ cm",cat:"Setup"},
    {k:"SSD استاندارد",v:"۱۰۰ cm",cat:"Setup"}
  ]
},
{
  id:"torque",
  title:"مقادیر Torque پیچ‌ها",
  icon:"wrench",
  color:["#32D74B","#28A745"],
  desc:"گشتاور مورد نیاز برای پیچ‌های کلیدی دستگاه",
  rows:[
    {k:"Magnetron (پیچ‌های نگه‌دارنده)",v:"۲۵ N·m",cat:"RF"},
    {k:"Klystron (پیچ‌های اصلی)",v:"۳۰ N·m",cat:"RF"},
    {k:"Circulator",v:"۱۵ N·m",cat:"RF"},
    {k:"Waveguide Flange",v:"۱۰ N·m",cat:"RF"},
    {k:"MLC Bank پیچ‌ها",v:"۸ N·m",cat:"MLC"},
    {k:"MLC Motor Leaf",v:"۲ N·m",cat:"MLC"},
    {k:"Target Holder",v:"۲۰ N·m",cat:"Head"},
    {k:"Head Panel پیچ‌ها",v:"۵ N·m",cat:"Head"},
    {k:"Couch پیچ‌ها",v:"۱۵ N·m",cat:"Couch"},
    {k:"Chiller Fitting",v:"۱۲ N·m",cat:"Chiller"}
  ]
},
{
  id:"parts",
  title:"کدهای قطعات رایج",
  icon:"cam",
  color:["#FF375F","#AF52DE"],
  desc:"Part Number قطعات پرمصرف — برای سفارش به Elekta Service",
  rows:[
    {k:"Magnetron MG6026",v:"۱۰۱۲۹۹۳۰۰",cat:"RF"},
    {k:"Klystron 5MW",v:"۱۰۱۲۹۹۴۰۰",cat:"RF"},
    {k:"MLCi2 Motor Leaf",v:"۱۵۲۰۴۵۰۰",cat:"MLC"},
    {k:"MLCi2 Encoder",v:"۱۵۲۰۴۶۰۰",cat:"MLC"},
    {k:"Agility Motor",v:"۱۵۳۰۵۰۰۰",cat:"MLC"},
    {k:"Agility Leaf",v:"۱۵۳۰۶۰۰۰",cat:"MLC"},
    {k:"Ion Chamber",v:"۱۰۴۵۰۰۱۰",cat:"Detector"},
    {k:"Target Tungsten",v:"۱۰۲۳۰۰۲۰",cat:"Head"},
    {k:"SF6 Gas (بسته)",v:"۸۰۴۵۰۱۰۰",cat:"Gas"},
    {k:"Coolant Elekta Original",v:"۹۰۱۲۰۰۱۰",cat:"Cooling"}
  ],
  warn:"شماره‌کدها نمونه‌اند — برای سفارش، حتماً از Elekta Service Portal استعلام کنید."
},
{
  id:"const",
  title:"ثابت‌های فیزیک",
  icon:"cal",
  color:["#00C7BE","#30B0C7"],
  desc:"فرمول‌ها و ضرایب در محاسبات دزیمتری",
  rows:[
    {k:"ضریب kTP",v:"((273.15+T)/293.15) × (101.3/P)",cat:"دزیمتری"},
    {k:"دمای مرجع",v:"۲۰ °C",cat:"دزیمتری"},
    {k:"فشار مرجع",v:"۱۰۱.۳ kPa",cat:"دزیمتری"},
    {k:"چگالی آب",v:"۱ g/cm³",cat:"دزیمتری"},
    {k:"انرژی یونش هوا W/e",v:"۳۳.۹۷ J/C",cat:"دزیمتری"},
    {k:"فاکتور تبدیل Roentgen",v:"۲.۵۸ × ۱۰⁻⁴ C/kg",cat:"دزیمتری"},
    {k:"۱ Gy",v:"۱۰۰ cGy = ۱۰۰ rad",cat:"تبدیل"},
    {k:"۱ Sv",v:"۱۰۰ rem",cat:"تبدیل"},
    {k:"۱ MeV",v:"۱.۶۰۲ × ۱۰⁻¹³ J",cat:"تبدیل"},
    {k:"سرعت نور c",v:"۳ × ۱۰⁸ m/s",cat:"ثابت"}
  ]
}
];

/* اگه REF_TABLES از قبل هست، merge کن */
if(typeof window !== "undefined" && window.REF_TABLES){
  window.REF_TABLES = window.REF_TABLES.concat(REF_TABLES);
} else if(typeof window !== "undefined"){
  window.REF_TABLES = REF_TABLES;
}

console.log("✅ data3.js loaded — " + REF_TABLES.length + " reference tables");