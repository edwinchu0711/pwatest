// 快取名稱
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  // 其他需要快取的資源
];

// 修改後的代碼：
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './styles.css',
        './scripts.js',
        // 確保所有路徑都是正確的
      ])
      .catch(error => {
        console.error('快取添加失敗:', error);
        // 即使某些資源失敗，也可以繼續安裝 Service Worker
      });
    })
  );
});

// 攔截網路請求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在快取中找到回應，則返回快取的回應
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // 檢查是否為有效回應
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 複製回應
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// 更新 Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match('offline.html');
      })
  );
});