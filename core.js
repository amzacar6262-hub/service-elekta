/* ═══════════════════════════════════════
   core.js — هسته مشترک (نسخه بهبودیافته)
   - Namespace مرکزی
   - State متمرکز
   - escapeHtml امن
   - Storage با error handling
   - Helperهای امن DOM
   ═══════════════════════════════════════ */

(function (global) {
  "use strict";

  /* ── Namespace ── */
  var Elekta = global.Elekta || {};
  global.Elekta = Elekta;

  /* ── State مرکزی ── */
  Elekta.state = {
    libFilter: "all",
    libQ: "",
    codeFilter: "all",
    codeQ: "",
    refQ: "",
    favs: new Set(),
    curSheetManual: null,
    checklistData: {},
    manualNotes: {},
    serviceLog: [],
    currentTheme: "auto",
    currentFont: "md",
    lang: "fa",
    ready: false
  };

  /* ── Utils ── */
  Elekta.utils = {
    /** escape متن برای جلوگیری از XSS */
    escapeHtml: function (str) {
      if (str == null) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },

    /** تبدیل اعداد به فارسی */
    fa: function (n) {
      if (n == null) return "";
      var s = String(n);
      if (typeof t === "function" && t("dir") === "ltr") return s;
      return s.replace(/\d/g, function (d) {
        return "۰۱۲۳۴۵۶۷۸۹"[d];
      });
    },

    /** querySelector کوتاه */
    $: function (sel, root) {
      return (root || document).querySelector(sel);
    },

    /** querySelectorAll به صورت آرایه */
    $$: function (sel, root) {
      return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    },

    /** ساخت element امن */
    el: function (tag, attrs, children) {
      var node = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          if (k === "className") node.className = attrs[k];
          else if (k === "text") node.textContent = attrs[k];
          else if (k === "html") node.innerHTML = attrs[k]; // فقط برای محتوای trusted
          else if (k === "style" && typeof attrs[k] === "object") {
            Object.assign(node.style, attrs[k]);
          } else if (k.startsWith("on") && typeof attrs[k] === "function") {
            node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
          } else {
            node.setAttribute(k, attrs[k]);
          }
        });
      }
      if (children) {
        (Array.isArray(children) ? children : [children]).forEach(function (c) {
          if (c == null) return;
          if (typeof c === "string") node.appendChild(document.createTextNode(c));
          else node.appendChild(c);
        });
      }
      return node;
    },

    /** template امن: فقط مقادیر escape می‌شوند */
    html: function (strings) {
      var values = Array.prototype.slice.call(arguments, 1);
      var out = "";
      for (var i = 0; i < strings.length; i++) {
        out += strings[i];
        if (i < values.length) {
          var v = values[i];
          // اگر با ! شروع شود یعنی trusted HTML
          if (typeof v === "string" && v.charAt(0) === "!") {
            out += v.slice(1);
          } else {
            out += Elekta.utils.escapeHtml(v);
          }
        }
      }
      return out;
    },

    /** debounce ساده */
    debounce: function (fn, ms) {
      var t;
      return function () {
        var args = arguments;
        var ctx = this;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(ctx, args); }, ms);
      };
    }
  };

  /* ── Storage امن ── */
  Elekta.storage = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        if (raw == null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        console.warn("[Elekta.storage] get failed:", key, e);
        return fallback;
      }
    },

    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn("[Elekta.storage] set failed:", key, e);
        // احتمالاً quota پر شده
        if (typeof toast === "function") {
          toast(typeof i18n === "function" ? i18n("storage_full", "حافظه پر است") : "Storage full");
        }
        return false;
      }
    },

    remove: function (key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.warn("[Elekta.storage] remove failed:", key, e);
        return false;
      }
    },

    /** برای مقادیر ساده (رشته) */
    getRaw: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v == null ? fallback : v;
      } catch (e) {
        return fallback;
      }
    },

    setRaw: function (key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.warn("[Elekta.storage] setRaw failed:", key, e);
        return false;
      }
    }
  };

  /* ── بارگذاری اولیه state از storage ── */
  function loadState() {
    var S = Elekta.state;
    try {
      var favArr = Elekta.storage.get("favs", []);
      S.favs = new Set(Array.isArray(favArr) ? favArr : []);
    } catch (e) {
      S.favs = new Set();
    }
    S.checklistData = Elekta.storage.get("elekta_checklist_v1", {}) || {};
    S.manualNotes = Elekta.storage.get("elekta_notes_v1", {}) || {};
    S.serviceLog = Elekta.storage.get("elekta_service_log_v1", []) || [];
    if (!Array.isArray(S.serviceLog)) S.serviceLog = [];
    S.currentTheme = Elekta.storage.getRaw("elekta_theme", "auto");
    S.currentFont = Elekta.storage.getRaw("elekta_font", "md");
    S.lang = Elekta.storage.getRaw("elekta_lang", "fa");
  }

  /* ── ذخیره علاقه‌مندی‌ها ── */
  Elekta.saveFavs = function () {
    return Elekta.storage.set("favs", Array.from(Elekta.state.favs));
  };

  /* ── ذخیره چک‌لیست ── */
  Elekta.saveChecklist = function () {
    return Elekta.storage.set("elekta_checklist_v1", Elekta.state.checklistData);
  };

  /* ── ذخیره یادداشت‌ها ── */
  Elekta.saveNotes = function () {
    return Elekta.storage.set("elekta_notes_v1", Elekta.state.manualNotes);
  };

  /* ── ذخیره لاگ سرویس ── */
  Elekta.saveLog = function () {
    return Elekta.storage.set("elekta_service_log_v1", Elekta.state.serviceLog);
  };

  /**
   * فاز A: ارجاع‌های ماژول‌ها را به همان objectهای state بچسبان
   * تا varهای قدیمی (favs, serviceLog, …) همان مرجع Elekta.state باشند.
   */
  Elekta.syncRefs = function (refs) {
    if (!refs || typeof refs !== "object") return;
    var S = Elekta.state;
    if (refs.favs !== undefined) refs.favs = S.favs;
    if (refs.checklistData !== undefined) refs.checklistData = S.checklistData;
    if (refs.manualNotes !== undefined) refs.manualNotes = S.manualNotes;
    if (refs.serviceLog !== undefined) refs.serviceLog = S.serviceLog;
  };

  /** ثبت‌نام توابع رفرش UI برای زبان/تم */
  Elekta._uiRefreshers = [];
  Elekta.onUIRefresh = function (fn) {
    if (typeof fn === "function") Elekta._uiRefreshers.push(fn);
  };
  Elekta.refreshUI = function () {
    Elekta._uiRefreshers.forEach(function (fn) {
      try { fn(); } catch (e) { console.warn("[Elekta.refreshUI]", e); }
    });
  };

  /* ── محافظت از init تکراری ── */
  Elekta._initDone = false;

  Elekta.safeInit = function (fn) {
    if (Elekta._initDone) return;
    try {
      loadState();
      fn();
      Elekta.state.ready = true;
      Elekta._initDone = true;
    } catch (err) {
      console.error("[Elekta] Init failed:", err);
      // حتی در صورت خطا، صفحه را تا حد ممکن قابل استفاده نگه دار
      try {
        var main = document.getElementById("main");
        if (main && !main.querySelector(".init-error")) {
          var div = document.createElement("div");
          div.className = "init-error";
          div.style.cssText = "padding:20px;text-align:center;color:#ff453a;font-size:14px";
          div.textContent = "خطا در بارگذاری — صفحه را رفرش کنید";
          main.insertBefore(div, main.firstChild);
        }
      } catch (e2) {}
    }
  };

  /* ── سازگاری با کد قدیمی (proxy) ── */
  // این‌ها بعداً در app.js به state وصل می‌شوند
  global.escapeHtml = Elekta.utils.escapeHtml;
  global.fa = Elekta.utils.fa;
  global.$ = Elekta.utils.$;

  // بارگذاری اولیه
  loadState();

})(typeof window !== "undefined" ? window : this);
