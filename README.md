# TapTown Game

![](https://i.imgur.com/aUdFiSL.png)
*Early work in progress version of the game*

Inspired by Sim City and Cities Skylines, TapTown is a simple game built on Web technologies like WebGL, IndexedDB, and Web Workers.

Way for me to learn more about WebGL, the GLTF file format, and multithreading web pages.

## Browser Support

TapTown should work in all modern browsers, and is tested in modern versions of Chrome, Firefox, and Safari. Development builds (```npm run dev```) do not work in Firefox and older versions of other browsers as they use module workers, but production builds are bundled to prevent this issue. 