// Simple service worker that doesn't interfere with API calls
self.addEventListener('fetch', (event) => {
  // Only handle requests for static assets, not API calls
  if (event.request.url.includes('/api/')) {
    return; // Let API calls pass through normally
  }
  
  // For other requests, use default behavior
  event.respondWith(fetch(event.request));
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
