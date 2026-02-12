import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sostisoft.github.io',
  base: '/lando-web-page',
  outDir: './docs',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
