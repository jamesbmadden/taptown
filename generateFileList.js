/**
 * This is a NODE file, NOT a web file.
 * It looks at the output from Vite and uses it to generate a list of files for sw.js to cache.
 */

import fs from 'fs';

const fileList = [];

/**
 * get recursive list of all files in directory
 */
function readFolder (dir) {

}

// read from the "dist" dir
readFolder(__dirname + 'dist');

console.log(fileList);