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
readFolder(`${__dirname}/dist`, '', false);

// add index.html and / and /app/ to cacheList
fileList.push('/', '/app/', '/index.html');

// put quotes around the file list
const fileListFormatted = fileList.map(file => `'${file}'`);

// get the current time to use as the app version
const now = new Date(Date.now());

// NOW prepare lines to write into sw.js
const appVerLine = `var appVer = '${now.getFullYear()}.${now.getMonth()}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}';`;
const filesToCacheLine = `var filesToCache = [ ${fileListFormatted.join(',')} ];`;

// finally, open the file, split it into lines, write to them, then output
const swFile = fs.readFileSync(`${__dirname}/dist/sw.js`, { encoding: 'utf-8' }).split('\n');

// set the lines
swFile[0] = `// this is the production version of this file :)\n// appVer is specific to THIS BUILD only and is used to manage caching.\n// Files to cache is a list of the file names actually used in this version.`;
swFile[1] = appVerLine;
swFile[2] = filesToCacheLine;

// write the final file :)
fs.writeFileSync(`${__dirname}/dist/sw.js`, swFile.join('\n'));