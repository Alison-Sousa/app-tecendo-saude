// Tecendo Saúde - PWA Service Worker (cache + notifications)
const CACHE_NAME = 'tecendo-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/usuarios/usuarios.html',
  '/profissionais/profissionais.html',
  '/monitoramento/monitoramento.html',
  '/manifest.json',
  '/img/logo.png',
  '/styles/styles.css',
  '/js/config.js',
  '/js/utils.js',
  '/js/components.js',
  '/env/env.js'
];

// Install: cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Cache what we can, skip failures (CDN files cached on fetch)
        return Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url).catch(() => {})));
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

// Fetch: network-first for API/Supabase, cache-first for static
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and Supabase API calls (always network)
  if (event.request.method !== 'GET') return;
  if (url.hostname.includes('supabase')) return;

  // CDN resources: cache-first (they don't change)
  if (url.hostname !== location.hostname) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Local files: network-first (so updates arrive fast)
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});

// Handle notification messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, tag, icon } = event.data;
    self.registration.showNotification(title, {
      body,
      icon: icon || '/img/logo.png',
      tag: tag || 'default',
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 300],
      badge: '/img/logo.png'
    });
  }
  // Force update check
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle notification click - open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
      } else {
        self.clients.openWindow('/usuarios/usuarios.html');
      }
    })
  );
});
