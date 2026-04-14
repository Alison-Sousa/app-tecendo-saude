// Tecendo Saúde - Service Worker for push notifications + OTA updates
const CACHE_NAME = 'tecendo-saude-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; }).map(function(n) { return caches.delete(n); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// Network-first fetch for app files (HTML, JS, CSS) so OTA updates work immediately
self.addEventListener('fetch', (event) => {
  var url = event.request.url;
  // Skip non-GET and external requests
  if (event.request.method !== 'GET') return;
  // Never cache version.json or env.js
  if (url.includes('version.json') || url.includes('env.js')) return;
  // Only cache same-origin app files
  if (!url.includes('app-tecendo.netlify.app') && !url.includes('localhost')) return;

  event.respondWith(
    fetch(event.request).then(function(response) {
      // Cache successful responses
      if (response && response.status === 200) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
      }
      return response;
    }).catch(function() {
      // Fallback to cache when offline
      return caches.match(event.request);
    })
  );
});

// Listen for cache-clear message from update checker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) { return caches.delete(n); }));
    }).then(function() {
      self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) { client.postMessage({ type: 'CACHE_CLEARED' }); });
      });
    });
    return;
  }

  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, tag, icon } = event.data;
    self.registration.showNotification(title, {
      body: body,
      icon: icon || './img/logo.png',
      tag: tag || 'tecendo-saude',
      badge: './img/logo.png',
      requireInteraction: true,
      vibrate: [300, 200, 300, 200, 500],
      actions: [
        { action: 'open', title: 'Abrir' },
        { action: 'dismiss', title: 'Dispensar' }
      ]
    });
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('usuarios.html') && 'focus' in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow('./usuarios/usuarios.html');
    })
  );
});

// Background sync for medication check
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'medication-check') {
    event.waitUntil(checkMedications());
  }
});

async function checkMedications() {
  // Periodic sync is limited - the main check runs in the app itself
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(client => {
    client.postMessage({ type: 'CHECK_MEDICATIONS' });
  });
}
