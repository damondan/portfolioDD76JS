import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',  // SPA fallback for dynamic routes
      precompress: false,
      strict: false            // Allows mixed prerendered and dynamic routes
    }),
    prerender: {
      handleHttpError: 'warn',   // Don't fail on HTTP errors
      handleMissingId: 'warn',   // Don't fail on missing IDs
      entries: [                 // Specify which routes to prerender
        '/',
        '/about',
        '/projects',
        // Add other static routes here
      ]
    }
  }
};

export default config;