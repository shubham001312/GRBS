// TalkBuzz Service Worker — v4.0.0
const APP_VERSION = '4.0.0';
const CACHE_NAME = `talkbuzz-v${APP_VERSION}`;
const PREVIOUS_CACHE_PREFIX = 'talkbuzz-v';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/utils.js',
  './js/auth.js',
  './js/presence.js',
  './js/rooms.js',
  './js/chat.js',
  './js/admin.js',
  './js/search.js',
  './js/profile.js',
  './js/app.js',
  './manifest.json',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  console.log(`[SW] Installing TalkBuzz v${APP_VERSION}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log(`[SW] Activating TalkBuzz v${APP_VERSION}`);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key.startsWith(PREVIOUS_CACHE_PREFIX))
          .map(key => {
            console.log(`[SW] Deleting old cache: ${key}`);
            return caches.delete(key);
          })
      )
    ).then(() => {
      // Notify all clients that SW has been updated
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED', version: APP_VERSION });
        });
      });
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network-first for Firebase/API requests
  if (url.hostname.includes('firebaseio.com') || url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com') || url.hostname.includes('firebase')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Network-first for same-origin requests (forces updates on old devices)
  // Falls back to cache when offline
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request).then(cached => {
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      }))
    );
    return;
  }

  // Cache-first for external CDN assets (fonts, icons)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
