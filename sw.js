const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/food.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

self.addEventListener("install", (event) => {
  // console.log("Service Worker has been installed.");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker has been activated.");
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete())
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // console.log("Fetch Event", event);
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});
