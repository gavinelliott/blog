// Service Worker for offline capabilities and improved caching
const CACHE_NAME = 'gavin-elliott-blog-v1';

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/about',
  '/writing',
  '/speaking',
  '/recommended-reads',
  '/privacy-policy',
  '/favicon.ico',
  '/favicon.png',
  '/styles/global.css'
];

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
  // Don't cache admin requests or browser extensions
  if (
    event.request.url.includes('/admin') || 
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }
  
  // For HTML requests - try network first, fall back to cache
  if (event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
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
      return fetch(event.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Cache successful responses
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        
        return response;
      });
    })
  );
}); 