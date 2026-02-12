import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://217.154.190.107',
  base: '/',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
