import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://santix01.github.io',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
