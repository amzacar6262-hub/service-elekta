/* ═══════════════════════════════════════
   data-loader.js — فاز C
   لایهٔ سبک روی MANUALS / ERRORS
   - متادیتای جستجو (بدون steps)
   - دسترسی یکپارچه getManual / getError
   - آماده برای لود JSON در آینده
   ═══════════════════════════════════════ */

(function (global) {
  "use strict";

  function safeArr(x) {
    return Array.isArray(x) ? x : [];
  }

  /** فقط فیلدهای لازم برای لیست و جستجو */
  function toManualMeta(m) {
    if (!m || !m.id) return null;
    return {
      id: m.id,
      title: m.title || "",
      code: m.code || "",
      cat: m.cat || "",
      machines: safeArr(m.machines).slice(),
      level: m.level || "",
      duration: m.duration || "",
      summary: (m.summary || "").slice(0, 160)
    };
  }

  function toErrorMeta(e) {
    if (!e) return null;
    return {
      code: e.code || "",
      title: e.title || "",
      sev: e.sev || "",
      machine: e.machine || "",
      act: (e.act || "").slice(0, 120)
    };
  }

  function rebuildMeta() {
    var manuals = safeArr(global.MANUALS);
    var errors = safeArr(global.ERRORS);

    global.MANUALS_META = manuals.map(toManualMeta).filter(Boolean);
    global.ERRORS_META = errors.map(toErrorMeta).filter(Boolean);

    /* ایندکس id → manual برای دسترسی O(1) */
    var byId = Object.create(null);
    for (var i = 0; i < manuals.length; i++) {
      if (manuals[i] && manuals[i].id) byId[manuals[i].id] = manuals[i];
    }
    global.MANUALS_BY_ID = byId;

    var byCode = Object.create(null);
    for (var j = 0; j < errors.length; j++) {
      if (errors[j] && errors[j].code) byCode[String(errors[j].code)] = errors[j];
    }
    global.ERRORS_BY_CODE = byCode;

    if (typeof console !== "undefined" && console.log) {
      console.log(
        "[data-loader] manuals:", manuals.length,
        "errors:", errors.length,
        "meta:", global.MANUALS_META.length
      );
    }
    return {
      manuals: manuals.length,
      errors: errors.length
    };
  }

  function getManual(id) {
    if (global.MANUALS_BY_ID && global.MANUALS_BY_ID[id]) {
      return global.MANUALS_BY_ID[id];
    }
    var list = safeArr(global.MANUALS);
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === id) return list[i];
    }
    return null;
  }

  function getError(code) {
    var c = String(code || "");
    if (global.ERRORS_BY_CODE && global.ERRORS_BY_CODE[c]) {
      return global.ERRORS_BY_CODE[c];
    }
    var list = safeArr(global.ERRORS);
    for (var i = 0; i < list.length; i++) {
      if (list[i] && String(list[i].code) === c) return list[i];
    }
    return null;
  }

  /**
   * لود اختیاری JSON (برای فاز بعد)
   * مثال: loadManualsJson("./data/manuals-extra.json")
   * فرمت: [ { id, title, ... steps } , ... ]
   */
  function loadManualsJson(url) {
    return fetch(url, { cache: "force-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (arr) {
        if (!Array.isArray(arr)) throw new Error("JSON must be array");
        if (!global.MANUALS) global.MANUALS = [];
        for (var i = 0; i < arr.length; i++) {
          var m = arr[i];
          if (!m || !m.id) continue;
          var exists = global.MANUALS.some(function (x) { return x.id === m.id; });
          if (!exists) global.MANUALS.push(m);
        }
        rebuildMeta();
        if (typeof buildSearchIndex === "function") buildSearchIndex();
        return arr.length;
      });
  }

  global.ElektaData = {
    rebuildMeta: rebuildMeta,
    getManual: getManual,
    getError: getError,
    loadManualsJson: loadManualsJson
  };

  global.getManual = getManual;
  global.getError = getError;
  global.rebuildDataMeta = rebuildMeta;

  /* بعد از data*.js اجرا می‌شود */
  rebuildMeta();

})(typeof window !== "undefined" ? window : this);
