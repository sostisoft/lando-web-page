import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.ASTRO_SITE || 'https://landofirm.com';
const base = process.env.ASTRO_BASE || '/';

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
