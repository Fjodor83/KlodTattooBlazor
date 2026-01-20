// ========================================
// Service Worker for Klod Tattoo Studio
// Cache Strategy: Network First with Fallback
// ========================================

const CACHE_NAME = 'klod-tattoo-v1.0.1';
const RUNTIME_CACHE = 'klod-tattoo-runtime';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/site.min.css',
    '/lib/bootstrap/dist/css/bootstrap.min.css',
    '/js/site.min.js',
    '/favicon.ico',
    '/favicon.png',
    '/images/klod_logo.png',
    '/manifest.json'
];

// Install Event - Cache static assets
self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        // Delete old caches
                        return cacheName.startsWith('klod-tattoo-') && cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                    })
                    .map(cacheName => {
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Network First, fallback to Cache
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Skip Blazor framework files - always fetch fresh
    if (request.url.includes('_framework/')) {
        return event.respondWith(fetch(request));
    }

    // API calls - Network only (no caching)
    if (request.url.includes('/api/')) {
        return event.respondWith(fetch(request));
    }

    // For navigation requests, use Network First strategy
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache the new version
                    caches.open(RUNTIME_CACHE).then(cache => {
                        cache.put(request, responseToCache);
                    });

                    return response;
                })
                .catch(() => {
                    // Network failed, try cache
                    return caches.match(request)
                        .then(response => response || caches.match('/index.html'));
                })
        );
        return;
    }

    // For other requests (CSS, JS, images), use Cache First strategy
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Fetch from network
                return fetch(request).then(response => {
                    // Don't cache if not a success
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache it for next time
                    caches.open(RUNTIME_CACHE).then(cache => {
                        cache.put(request, responseToCache);
                    });

                    return response;
                });
            })
            .catch(() => {
                // Both cache and network failed
                // Return a fallback page for navigation
                if (request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Message Event - Allow page to skip waiting
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background Sync (future enhancement)
// self.addEventListener('sync', event => {
//   if (event.tag === 'sync-bookings') {
//     event.waitUntil(syncBookings());
//   }
// });
