var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/',
  '/PWA_Test/index.html',
  '/PWA_Test/scripts/app.js',
  '/PWA_Test/styles/inline.css',
  '/PWA_Test/images/clear.png',
  '/PWA_Test/images/cloudy-scattered-showers.png',
  '/PWA_Test/images/cloudy.png',
  '/PWA_Test/images/fog.png',
  '/PWA_Test/images/ic_add_white_24px.svg',
  '/PWA_Test/images/ic_refresh_white_24px.svg',
  '/PWA_Test/images/partly-cloudy.png',
  '/PWA_Test/images/rain.png',
  '/PWA_Test/images/scattered-showers.png',
  '/PWA_Test/images/sleet.png',
  '/PWA_Test/images/snow.png',
  '/PWA_Test/images/thunderstorm.png',
  '/PWA_Test/images/wind.png'
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
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});