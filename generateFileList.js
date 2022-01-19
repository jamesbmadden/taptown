/**
 * This is a NODE file, NOT a web file.
 * It looks at the output from Vite and uses it to generate a list of files for sw.js to cache.
 */

const fs = require('fs');

const fileList = [];

/**
 * get recursive list of all files in directory
 */
function readFolder (dir, url, pushThisLevel) {

  // read each file in the directory
  fs.readdirSync(dir).forEach(filePath => {

    // check the file
    let file = fs.statSync(`${dir}/${filePath}`);

    // if it's a folder, run readFolder on it
    if (file && file.isDirectory()) {

      readFolder(`${dir}/${filePath}`, `${url}/${filePath}`, true);

    } 
    // otherwise, IF we are pushing files on this level, add it to the list
    else if (pushThisLevel) fileList.push(`${url}/${filePath}`);


  });

}

// read from the "dist" dir
readFolder(`${__dirname}/dist`, '', false)

// put quotes around the file list
const fileListFormatted = fileList.map(file => `'${file}'`);

// NOW, write this to dist/filesToCache.js
const filesToCacheContent = `// This is the production version of this file.\nvar filesToCache = [ ${fileListFormatted.join(',')} ];`;

// finally, write it out
fs.writeFileSync(`${__dirname}/dist/filesToCache.js`, filesToCacheContent);