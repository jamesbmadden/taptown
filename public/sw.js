// These lines will be replaced on build.
var appVer = -1;
var filesToCache = [];

// the name to use for the cache
const cacheId = `tt-${appVer}`;

/**
 * when the service worker is activated, delete any older caches that do not reflect this build number (appVer from filesToCache)
 * and cache all required files
 */
self.addEventListener('activate', async (event) => {

  // loop through each cache and delete any that don't match the current version
  // use promise all to make it concurrent
  await Promise.all((await caches.keys()).map(cacheName => {
    if (cacheName !== cacheId) return caches.delete(cacheName);
  }));

  // open the cache for the current version
  const cache = await caches.open(cacheId);
  // add a period in front of urls to make sure service worker is looking in the right place
  const filesUrls = filesToCache.map(file => `.${file}`);
  // add ALL the required files to cache, that way everything is downloaded and can be served from cache
  await cache.addAll(filesUrls);

});

/**
 * Upon fetch, respond with fromNetwork
 */
self.addEventListener('fetch', event => {
  
  // return fromNetwork stuff
  event.respondWith(fromCache(event.request));

});

/**
 * SW IMPLEMENTATION #2: CACHE-FIRST
 * Gets data from cache first, then falls back to network otherwise.
 */
async function fromCache(request) {

  // read from the cache
  const cache = await caches.open(cacheId);
  // and open the specific file
  const response = cache.match(request.clone());

  // check if the cache worked
  if (response) {
    // great! return the response
    return response;
  } else {
    // okay, get it from network
    return await fetch(request);
  }


}

/** 
 * SW IMPLEMENTATION #1: NETWORK-FIRST
 * Gets data from network first, and falls back to cache otherwise.
 */
async function fromNetwork(request) {

  // try to get from network
  try {
    const response = await fetch(request.clone());

    // it worked! cache it and return it :)
    if (response.status < 400) {

      // open the cache
      const cache = await caches.open(cacheId);
      // and put the response and request in
      cache.put(request, response.clone());

      // finally, return the response :)
      return response;

    } else {
      // it didn't work, throw to move into the catch block
      throw 'Request failed, try cache';
    }
  } catch (error) {
    // something went wrong with the network, so lets try the cache to see if that helps
    const cache = await caches.open(cacheId);
    // return the request from cache :)
    return await cache.match(request);
  }


}