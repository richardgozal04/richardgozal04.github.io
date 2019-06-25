'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          './index.html','./bootstrap.min.css','./chart.min.js','./jquery-3.3.1.js','./worker.js',
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match('index.html');
          })
    );
});