import { defineConfig } from 'astro/config';

const site = process.env.ASTRO_SITE || 'http://217.154.190.107';
const base = process.env.ASTRO_BASE || '/';

export default defineConfig({
  site,
  base,
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
