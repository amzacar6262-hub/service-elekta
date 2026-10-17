/* ═══════════════════════════════════════
   Elekta Service — Service Worker
   نسخه کش را با هر انتشار عوض کن (v94 → v95 …)
   ═══════════════════════════════════════ */

const CACHE = "elekta-service-v101";

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./hero.png",
  "./style.css",
  "./core.js",
  "./settings.js",
  "./i18n.js",
  "./data.js",
  "./data3.js",
  "./data4.js",
  "./data5.js",
  "./data6.js",
  "./data7.js",
  "./data8.js",
  "./data9.js",
  "./data10.js",
  "./data11.js",
  "./data12.js",
  "./data-loader.js",
  "./flowcharts.js",
  "./learn.js",
  "./search.js",
  "./app.js",
  "./qr.js",
  "./gallery.js",
  "./pm.js",
  "./pdfs.js",
  "./pdfviewer-plus.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE.map(function (u) {
        return new Request(u, { cache: "reload" });
      })).catch(function (err) {
        console.warn("[SW] precache partial fail", err);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/** JS/CSS: شبکه اول (تا نسخه قدیمی نماند) — بقیه: کش اول */
function isVersionedAsset(url) {
  return /\.(js|css)(\?|$)/i.test(url.pathname);
}

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;

  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  if (isVersionedAsset(url)) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(e.request);
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (cached) {
      var network = fetch(e.request).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return cached || caches.match("./index.html");
      });
      return cached || network;
    })
  );
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});
