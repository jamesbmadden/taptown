/**
 * set base to allow vite to work on Github Pages
 */

import { defineConfig } from 'vite'

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
      base: '/taptown/'
    }
  }
});