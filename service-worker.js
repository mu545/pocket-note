const CACHE_NAME = 'pocketnote-v0.0.1'
let urlsToCache = [
  '/',
  '/css/materialize.min.css',
  '/images/icon-72x72.png',
  '/images/icon-96x96.png',
  '/images/icon-128x128.png',
  '/images/icon-144x144.png',
  '/images/icon-192x192.png',
  '/images/icon-256x256.png',
  '/images/icon-384x384.png',
  '/images/icon-512x512.png',
  '/images/sick.png',
  '/images/business.jpg',
  '/images/note.jpg',
  '/js/materialize.min.js',
  '/js/index.js',
  '/index.html',
  '/nav.html',
  '/pages/home.html',
  '/pages/new.html',
  '/pages/help.html',
  '/pages/about.html'
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log(`Service worker: using asset from cache (${response.url})`)

          return response
        }

        console.log(`Service worker: load asset from server (${event.request.url})`)

        return fetch(event.request)
      })
  )
})

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log(`Service worker: cache ${cacheName} deleted`)

              return caches.delete(cacheName);
            }
          })
        )
      })
  )
})