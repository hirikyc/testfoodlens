const CACHE_NAME = "foodlens-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/styles.css",
  "/styles/responsive.css",
  "/scripts/index.js",
  "/images/Logo-App/food_lens_logo.jpg"
  // Tambahkan file statis lain yang penting jika perlu
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});
