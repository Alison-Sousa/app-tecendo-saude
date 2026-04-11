// Tecendo Saúde - Service Worker for push notifications
const CACHE_NAME = 'tecendo-saude-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
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
