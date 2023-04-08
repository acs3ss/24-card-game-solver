// From https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/

// This would be Typescript with additions from https://joshuatz.com/posts/2021/strongly-typed-service-workers/,
// except I can't figure out how to get Webpack to compile it correctly.

// TypeScript needs this to be a module, so just export something useless.
// export {};

// We are a Service Worker, not a generic Web Worker.
// https://github.com/microsoft/TypeScript/issues/14877
// declare const self: ServiceWorkerGlobalScope & typeof globalThis;

const CACHE_NAME = `24-card-game-v1`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const images = [];
      for (const theme of ["light", "dark"]) {
        for (let i = 1; i <= 13; i++) {
          images.push(
            `/assets/images/${theme}/${i}C.svg`,
            `/assets/images/${theme}/${i}D.svg`,
            `/assets/images/${theme}/${i}H.svg`,
            `/assets/images/${theme}/${i}S.svg`
          );
        }
      }

      const cache = await caches.open(CACHE_NAME);
      cache.addAll(["/", ...images]);
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        // If we don't have a cached response, then actually fetch and then cache it.
        const fetchResponse = await fetch(event.request);

        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      }
    })()
  );
});
