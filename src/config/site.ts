export const SITE = {
  name: 'Lando',
  domain: 'landofirm.com',
  url: 'https://landofirm.com',
  email: 'info@landofirm.com',
  formEndpoint: '/api/contact',

  company: {
    legalName: 'Sosti Soft SL',
    taxId: 'B70829700',
    address: 'Calle Humanitarias 19 1A, 28025 Madrid',
    country: { es: 'España', en: 'Spain' },
    registry: {
      es: 'Registro Mercantil de Madrid',
      en: 'Commercial Registry of Madrid',
    },
  },
} as const;
