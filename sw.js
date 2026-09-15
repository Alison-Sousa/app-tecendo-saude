// Tecendo Saúde - Service Worker for push notifications + OTA updates
const CACHE_NAME = 'tecendo-saude-offline-v2';
const APP_SHELL = [
  './',
  './index.html',
  './usuarios/usuarios.html',
  './profissionais/profissionais.html',
  './monitoramento/monitoramento.html',
  './monitoramento/monitoramento.js',
  './styles/styles.css',
  './env/env.js',
  './js/config.js',
  './js/utils.js',
  './js/components.js',
  './js/admin-gestao.js',
  './js/vendor/react.development.js',
  './js/vendor/react-dom.development.js',
  './js/vendor/babel.min.js',
  './js/vendor/tailwindcss.js',
  './js/vendor/dexie.js',
  './js/vendor/supabase.min.js',
  './js/vendor/chart.umd.min.js',
  './js/vendor/chartjs-plugin-datalabels.min.js',
  './js/vendor/jspdf.umd.min.js',
  './js/vendor/html2canvas.min.js',
  './js/vendor/uuidv4.min.js',
  './img/logo.png',
  './audios/Alerta.mp3',
  './audios/Gesta%C3%A7%C3%A3o.mp3',
  './audios/Hipertens%C3%A3o.mp3',
  './audios/Inf%C3%A2ncia.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(APP_SHELL.map(function(path) {
        return fetch(path, { cache: 'reload' }).then(function(response) {
          if (!response || !response.ok) throw new Error('Could not cache ' + path);
          return cache.put(path, response);
        }).catch(function(error) {
          console.warn('Offline cache skipped:', path, error);
        });
      }));
    }).then(function() { return self.skipWaiting(); })
  );
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
  var requestUrl = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (requestUrl.origin !== self.location.origin) return;
  // Update checks must always consult the network.
  if (requestUrl.pathname.endsWith('/version.json')) return;

  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response && response.status === 200) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
      }
      return response;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
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
