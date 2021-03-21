var static = "soroniuxF7-v1";
var cacheassets = [
  "index.html", 
  "img/image-1.jpg",
  "img/image-2.jpg",
  "img/image-3.jpg",
  "img/image-4.jpg",
  "img/image-5.jpg",
  "img/image-6.jpg",
  "img/background1.png",
  "img/background2.png",
  "img/user-1.jpg",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(static).then(function (cache) {
            cache.addAll(cacheassets);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});
self.addEventListener("activate", function (event) {});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    );
});