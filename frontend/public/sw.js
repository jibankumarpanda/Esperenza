// Simple service worker to handle avatar requests
self.addEventListener('fetch', (event) => {
  // Skip service worker for avatar requests to avoid conflicts
  if (event.request.url.includes('avatar.vercel.sh') || 
      event.request.url.includes('ui-avatars.com') ||
      event.request.url.includes('images.unsplash.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // For other requests, use network first strategy
  event.respondWith(
    fetch(event.request).catch(() => {
      // If network fails, try to serve from cache
      return caches.match(event.request);
    })
  );
});
