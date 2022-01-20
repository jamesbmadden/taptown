// this is the production version of this file :)
// appVer is specific to THIS BUILD only and is used to manage caching.
// Files to cache is a list of the file names actually used in this version.
var appVer = '2022.0.20.1.19.41';
var filesToCache = [ '/app/index.html','/assets/Cafe.89231c7b.gltf','/assets/Road--l.cec3388c.gltf','/assets/Road-T.dd27be2f.gltf','/assets/Road-_l_.04dac8e2.gltf','/assets/Road-cross.c0149426.gltf','/assets/Road-down.3aa34828.gltf','/assets/Road-downright.2ee19715.gltf','/assets/Road-l-.8fa437e2.gltf','/assets/Road-left.e4d57c46.gltf','/assets/Road-leftdown.43e4587d.gltf','/assets/Road-right.05535041.gltf','/assets/Road-rightup.f9b3a2d6.gltf','/assets/Road-single.f2299542.gltf','/assets/Road-up.f33fbfbe.gltf','/assets/Road-upleft.8e8e8992.gltf','/assets/Road-x.25087994.gltf','/assets/Road-y.43b84893.gltf','/assets/ambient.6d469442.js','/assets/app.094664c2.css','/assets/app.79957490.js','/assets/buildings.a58a3922.js','/assets/db.ba7b3be2.js','/assets/landing.11d65904.css','/assets/landing.b6f501f9.js','/assets/outofbounds.54610d6d.gltf','/assets/people.9ab39b39.js','/assets/vendor.4f190134.js','/img/icons/logo-128.png','/img/icons/logo-192.png','/img/icons/logo-256.png','/img/icons/logo-32.png','/img/icons/logo-512.png','/img/icons/logo-64.png','/img/icons/logo-square-128.png','/img/icons/logo-square-192.png','/img/icons/logo-square-256.png','/img/icons/logo-square-32.png','/img/icons/logo-square-512.png','/img/icons/logo-square-64.png','/img/logo.png','/','/app/','/index.html' ];

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