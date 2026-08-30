import { defineConfig } from 'astro/config';

export default defineConfig({
  // Ramzey's own domain. Update if the host changes.
  site: 'https://ramzeyburdette.com',

  // Nothing is shipped to the browser. No islands, no client directives.
  build: { inlineStylesheets: 'never', format: 'directory' },

  // The browser floor is roughly 2017 (Edge 15, Safari 10.1, Firefox 52).
  // Astro's default esbuild target would emit modern syntax; there is no JS in
  // the output, but this keeps the CSS transform conservative too.
  vite: {
    build: { cssTarget: ['edge79', 'safari11', 'firefox60', 'chrome64'] }
  }
});
