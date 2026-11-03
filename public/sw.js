/* BAC STE Tutor service worker.
   Keeps the app shell available offline and serves hashed assets from cache.
   Bump CACHE when the shell changes. */

const CACHE = "bacste-v5";
const SHELL = [
  "/",
  "/fr/",
  "/ar/",
  "/practice/",
  "/exam/",
  "/tutor/",
  "/progress/",
  "/guides/",
  "/guides/limits/",
  "/worksheets/",
  "/schools/",
  "/guides/derivatives/",
  "/guides/integrals/",
  "/guides/complex-numbers/",
  "/guides/tenses/",
  "/guides/conditionals/",
  "/guides/passive-voice/",
  "/guides/reported-speech/",
  "/pricing/",
  "/privacy/",
  "/thanks/",
  "/icon.svg",
  "/og.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Hashed build assets never change: cache first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
            return response;
          }),
      ),
    );
    return;
  }

  // Pages: try the network, fall back to the cached page, then to the home shell.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE);
          return (
            (await cache.match(request)) ||
            (await cache.match("/")) ||
            new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } })
          );
        }),
    );
    return;
  }

  // Everything else: cache first, refreshed in the background when possible.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => hit);
      return hit || network;
    }),
  );
});
