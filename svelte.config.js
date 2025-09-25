import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '404.html'  // GitHub Pages fallback
    }),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    },
    prerender: {
      handleHttpError: 'warn'  // Add this to handle 404 errors during prerender
    }
  }
};

export default config;