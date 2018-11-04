var dataCacheName = 'jarod-v1';
var cacheName = 'jarod-final-1';
var filesToCache = [
  'index.html',
  'simple/index.html',
  'main/main.js',
  'main/main.css',
  'lib/bootstrap.min.css',
  'lib/bootstrap.min.js',
  'lib/faker.min.js',
  'lib/jquery-slim.min.js',
  'lib/qrious.min.js',
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-16x16.png',
  'icons/favicon-32x32.png',
  'icons/mstile-150x150.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
	console.log('[ServiceWorker] Fetch', event.request.url);
	event.respondWith(
		caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function(error) {
        console.error('Error: ', error);
      })
  );
});
