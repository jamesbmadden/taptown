// get the list of files to be put into cache on activation
importScripts('./filesToCache.js');

/**
 * when the service worker is activated, trim the cache to only the files that are needed for this build
 */
self.addEventListener('activate', async (event) => {

  // the part to trim from the start of filepaths
  // the slash at the end should be kept
  const urlBase = location.toString().slice(0, location.toString().length - 6);

  // open the cache
  const cache = await caches.open('taptown');
  (await cache.keys()).forEach(file => {

    // just get the section of the filename we want
    const fileName = file.url.slice(urlBase.length, file.url.length);

    // if the list of files to keep doesn't include this file, DELETE IT
    if (!filesToCache.includes(fileName)) cache.delete(file);
    

  });

});

/**
 * Upon fetch, respond with fromNetwork
 */
self.addEventListener('fetch', event => {
  
  // return fromNetwork stuff
  event.respondWith(fromNetwork(event.request));

});

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
      const cache = await caches.open('taptown');
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
    const cache = await caches.open('taptown');
    // return the request from cache :)
    return await cache.match(request);
  }


}