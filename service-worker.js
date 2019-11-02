const CACHE_NAME = 'pocketnote-v0.0.1'
let urlsToCache = [
  '/',
  '/css/materialize.min.css',
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