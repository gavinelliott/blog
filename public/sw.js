// Service Worker for offline capabilities and improved caching
const CACHE_NAME = 'gavin-elliott-blog-v2';

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  '/',
  '/about/',
  '/writing/',
  '/speaking/',
  '/recommended-reads/',
  '/privacy-policy/',
  '/favicon.ico',
  '/favicon.png'
];

// Cache only successful public responses, and bound storage even as the site grows.
function cacheResponse(event, response) {
  if (response.status === 200 && response.type === 'basic' &&
      !/no-store|private/i.test(response.headers.get('Cache-Control') || '') &&
      response.headers.get('Vary') !== '*') {
    const responseClone = response.clone();
    event.waitUntil(caches.open(CACHE_NAME).then(async cache => {
      await cache.put(event.request, responseClone);
      const keys = await cache.keys();
      await Promise.all(keys.slice(0, Math.max(0, keys.length - 150)).map(key => cache.delete(key)));
    }).catch(() => {
      // Storage limits must not prevent a successful network response from loading.
    }));
  }
  return response;
}

// Install event - precache key assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('gavin-elliott-blog-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network and cache
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Don't cache admin requests or browser extensions
  if (
    event.request.method !== 'GET' ||
    url.pathname.startsWith('/admin') ||
    url.origin !== self.location.origin ||
    url.search ||
    event.request.headers.has('Authorization') ||
    event.request.cache === 'no-store'
  ) {
    return;
  }
  
  // For HTML requests - try network first, fall back to cache
  if (event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => cacheResponse(event, response))
        .catch(() => {
          return caches.match(event.request).then(cachedResponse => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // For non-HTML requests - use cache-first strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return from cache if available
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Otherwise fetch from network
      return fetch(event.request).then(response => cacheResponse(event, response));
    })
  );
});
