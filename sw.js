// GRBS PWA Service Worker — v4.0
// Updated: June 12, 2026 — refined roadmap v4.0 with Personal AI Assistant thread

// Increment this version on every deployment to force cache invalidation
const APP_VERSION = '4.0.0';
const CACHE_NAME = `grbs-cache-${APP_VERSION}`;
const PREVIOUS_CACHE_PREFIX = 'grbs-cache-';
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
  console.log(`[SW] Installing v${APP_VERSION}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).then(() => {
        return Promise.allSettled(
          CDN_ASSETS.map(url => cache.add(url).catch(() => null))
        );
      });
    })
  );
  // Activate immediately without waiting for old SW to die
  self.skipWaiting();
});

// Activate — clean up ALL old caches and notify tabs
self.addEventListener('activate', event => {
  console.log(`[SW] Activating v${APP_VERSION}`);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key === CACHE_NAME ? false : key.startsWith(PREVIOUS_CACHE_PREFIX) || key === 'grbs-v1' || key === 'grbs-v2')
          .map(key => {
            console.log(`[SW] Deleting old cache: ${key}`);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'SW_UPDATED', version: APP_VERSION });
      });
    })
  );
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
    console.log('[SW] Skip waiting requested');
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: APP_VERSION });
  }
});
