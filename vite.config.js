/**
 * set base to allow vite to work on Github Pages
 */

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev specific config
      // base should be root
      base: '/'

    }
  } else {
    // command === 'build'
    return {
      // build specific config
      // base should be /taptown/
      base: '/taptown/',

      
      build: {
        rollupOptions: {
          // set entry points
          input: {
            app: resolve(__dirname, 'app/index.html'),
            landing: resolve(__dirname, 'index.html')
          }
        }
      }

    }
  }
});
