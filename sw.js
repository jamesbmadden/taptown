// this is the production version of this file :)
// appVer is specific to THIS BUILD only and is used to manage caching.
// Files to cache is a list of the file names actually used in this version.
var appVer = '2022.1.26.4.17.16';
var filesToCache = [ '/app/index.html','/assets/Cafe.5a05628e.gltf','/assets/Road--l.cec3388c.gltf','/assets/Road-T.dd27be2f.gltf','/assets/Road-_l_.04dac8e2.gltf','/assets/Road-cross.c0149426.gltf','/assets/Road-down.3aa34828.gltf','/assets/Road-downright.2ee19715.gltf','/assets/Road-l-.8fa437e2.gltf','/assets/Road-left.e4d57c46.gltf','/assets/Road-leftdown.43e4587d.gltf','/assets/Road-right.05535041.gltf','/assets/Road-rightup.f9b3a2d6.gltf','/assets/Road-single.f2299542.gltf','/assets/Road-up.f33fbfbe.gltf','/assets/Road-upleft.8e8e8992.gltf','/assets/Road-x.25087994.gltf','/assets/Road-y.43b84893.gltf','/assets/ambient.84990750.js','/assets/app.2593248b.css','/assets/app.e1adf504.js','/assets/buildings.8fb26608.js','/assets/landing.991a0d65.css','/assets/landing.c45aa8f7.js','/assets/modulepreload-polyfill.b7f2da20.js','/assets/outofbounds.8b7ad541.gltf','/assets/people.2a8a57fd.js','/assets/vendor.fcf43544.js','/icons/close.png','/img/icons/logo-128.png','/img/icons/logo-192.png','/img/icons/logo-256.png','/img/icons/logo-32.png','/img/icons/logo-512.png','/img/icons/logo-64.png','/img/icons/logo-square-128.png','/img/icons/logo-square-192.png','/img/icons/logo-square-256.png','/img/icons/logo-square-32.png','/img/icons/logo-square-512.png','/img/icons/logo-square-64.png','/img/logo.png','/img/ui/popup.png','/img/ui/tile-newsave.png','/img/ui/tile-pwa.png','/img/ui/tile-save.png','/','/app/','/index.html' ];

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
 * @param {Request} request
 */
async function fromCache(request) {

  // read from the cache
  const cache = await caches.open(cacheId);
  // and open the specific file
  // if the file contains a search query (?save=) at the end, STRIP IT OUT because it will just mess up the cache reading
  const response = await cache.match(request.url.split('?')[0]);

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
 * @param {Request} request
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