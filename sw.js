// GRBS PWA Service Worker - v6.0
// Updated: June 13, 2026 - Study Timer + Pomodoro + Session History

var APP_VERSION = '6.1.0';
var CACHE_NAME = 'grbs-cache-' + APP_VERSION;
var PREVIOUS_CACHE_PREFIX = 'grbs-cache-';
var STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/data.js',
  './js/state.js',
  './js/dashboard.js',
  './js/roadmap.js',
  './js/projects.js',
  './js/progress.js',
  './js/goals.js',
  './js/about.js',
  './js/gist-sync.js',
  './js/notes.js',
  './js/weekly-digest.js',
  './js/ai-timeline.js',
  './js/command-palette.js',
  './js/achievements.js',
  './js/smart-recommendations.js',
  './js/difficulty-predictor.js',
  './js/resource-ratings.js',
  './js/command-palette.js',
  './js/achievements.js',
  './js/smart-recommendations.js',
  './js/difficulty-predictor.js',
  './js/resource-ratings.js',
  './js/timer.js',
  './js/app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-192.svg',
  './assets/icon-512.svg'
];

var CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Lora:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS).then(function() {
        return Promise.allSettled(CDN_ASSETS.map(function(url) { return cache.add(url).catch(function() { return null; }); }));
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME && (key.indexOf(PREVIOUS_CACHE_PREFIX) === 0 || key === 'grbs-v1' || key === 'grbs-v2'); }).map(function(key) { return caches.delete(key); })
      );
    }).then(function() { return self.clients.claim(); })
    .then(function() { return self.clients.matchAll({ type: 'window' }); })
    .then(function(clients) {
      clients.forEach(function(client) { client.postMessage({ type: 'SW_UPDATED', version: APP_VERSION }); });
    })
  );
});

self.addEventListener('fetch', function(event) {
  var request = event.request;
  var url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function(response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(request, clone); });
        return response;
      }).catch(function() { return caches.match('./index.html'); })
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(function(cached) {
      if (cached) return cached;
      return fetch(request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(request, clone); });
        }
        return response;
      }).catch(function() {
        if (request.destination === 'script' || request.destination === 'style') {
          return new Response('/* Offline */', {
            headers: { 'Content-Type': request.destination === 'script' ? 'application/javascript' : 'text/css' }
          });
        }
      });
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data && event.data.type === 'GET_VERSION' && event.ports && event.ports[0]) event.ports[0].postMessage({ version: APP_VERSION });
});
