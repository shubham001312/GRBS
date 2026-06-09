// GRBS PWA Service Worker — v2.0
// Caches static assets for offline support

const CACHE_NAME = 'grbs-v2';
const STATIC_ASSETS = [
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
  './js/app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-192.svg',
  './assets/icon-512.svg'
];

// External CDN assets to cache
const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Lora:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
];

// Install — cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache static assets first (critical)
      return cache.addAll(STATIC_ASSETS).then(() => {
        // Try to cache CDN assets but don't fail install if they can't be fetched
        return Promise.allSettled(
          CDN_ASSETS.map(url => cache.add(url).catch(() => null))
        );
      });
    })
  );
  // Activate immediately without waiting for old SW to die
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  // Take control of all open tabs immediately
  self.clients.claim();
});

// Fetch — cache-first for static assets, network-first for everything else
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests for caching
  // Let cross-origin requests pass through (CDN fonts, etc.)
  if (url.origin !== location.origin && !CDN_ASSETS.some(a => request.url.startsWith(a.split('?')[0]))) {
    return;
  }

  // For navigation requests (HTML pages), try network first, fall back to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the fresh HTML
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // For static assets and CDN resources — cache first, network fallback
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        // Cache successful responses for same-origin or CDN
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Offline and not in cache — return a simple offline response
        if (request.destination === 'script' || request.destination === 'style') {
          return new Response('/* Offline */', {
            headers: { 'Content-Type': request.destination === 'script' ? 'application/javascript' : 'text/css' }
          });
        }
      });
    })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
