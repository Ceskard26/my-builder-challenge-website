// Service Worker for PWA functionality
// César Carrasco Portfolio - Enhanced Caching Strategy

const CACHE_NAME = 'cesar-portfolio-v1.0.0';
const STATIC_CACHE = 'cesar-static-v1.0.0';
const DYNAMIC_CACHE = 'cesar-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/enhanced-script.js',
  '/manifest.json',
  '/foto-ibm.jpeg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Files that can be cached dynamically
const DYNAMIC_FILES = [
  'https://api.github.com/users/Ceskard26/repos',
  'https://www.credly.com/users/cesar-augusto-carrasco-rojas'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
  'https://eujpxsoz2tqoqqk6tnpiqgjbne0oxymx.lambda-url.us-east-2.on.aws/',
  'https://api.github.com/',
  'https://calendly.com/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different caching strategies
  if (isNetworkFirst(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isStatic(request.url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Caching Strategies

// Cache First - for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('📋 Cache hit:', request.url);
      return cachedResponse;
    }
    
    console.log('🌐 Cache miss, fetching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Cache first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network First - for dynamic content and APIs
async function networkFirst(request) {
  try {
    console.log('🌐 Network first:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📋 Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for API requests
    if (request.url.includes('api.github.com')) {
      return new Response(JSON.stringify({
        message: 'Offline - GitHub data unavailable',
        offline: true
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 503
      });
    }
    
    return new Response('Network error occurred', { status: 503 });
  }
}

// Stale While Revalidate - for general content
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.error('Background fetch failed:', error);
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    console.log('📋 Serving stale content:', request.url);
    return cachedResponse;
  }
  
  // Wait for network if no cache available
  console.log('🌐 No cache, waiting for network:', request.url);
  return fetchPromise;
}

// Helper Functions

function isStatic(url) {
  return STATIC_FILES.some(file => url.includes(file)) || 
         url.includes('fonts.googleapis.com') ||
         url.includes('cdnjs.cloudflare.com') ||
         url.endsWith('.css') ||
         url.endsWith('.js') ||
         url.endsWith('.png') ||
         url.endsWith('.jpg') ||
         url.endsWith('.jpeg') ||
         url.endsWith('.gif') ||
         url.endsWith('.svg');
}

function isNetworkFirst(url) {
  return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

// Background Sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB if implemented
    console.log('🔄 Syncing contact form submissions...');
    // Implementation would depend on form submission queuing
  } catch (error) {
    console.error('❌ Contact form sync failed:', error);
  }
}

// Push notification handler (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/foto-ibm.jpeg',
      badge: '/foto-ibm.jpeg',
      vibrate: [200, 100, 200],
      tag: 'portfolio-notification',
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/foto-ibm.jpeg'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('César Carrasco Portfolio', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Force cache update
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  console.log('🔄 Forcing cache update...');
  const cache = await caches.open(STATIC_CACHE);
  await cache.addAll(STATIC_FILES);
  console.log('✅ Cache updated successfully');
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('❌ Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Service Worker unhandled rejection:', event.reason);
});

console.log('🎉 Service Worker loaded successfully');
