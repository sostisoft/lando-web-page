export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const translations = {
  es: {
    // Nav
    'nav.services': 'Servicios',
    'nav.method': 'Método',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',
    'nav.lang': 'EN',

    // Hero
    'hero.tagline': 'Consultoría tecnológica de alto impacto',
    'hero.title.line1': 'Transformamos ideas',
    'hero.title.line2': 'en productos digitales',
    'hero.title.highlight': 'extraordinarios',
    'hero.description': 'Trabajamos con un máximo de 3 clientes simultáneamente para garantizar resultados óptimos. Tu proyecto merece atención exclusiva.',
    'hero.cta': 'Agenda una consulta gratuita',
    'hero.cta.secondary': 'Descubre nuestro método',

    // Services
    'services.tagline': 'Lo que hacemos',
    'services.title': 'Servicios diseñados para impulsar tu negocio',
    'services.consulting.title': 'Consultoría Técnica',
    'services.consulting.desc': 'Te ayudamos a tomar las decisiones tecnológicas correctas. Analizamos tu situación actual y diseñamos la hoja de ruta hacia tus objetivos.',
    'services.web.title': 'Desarrollo Web & Apps',
    'services.web.desc': 'Creamos experiencias digitales a medida. Desde webs corporativas con dashboards avanzados hasta aplicaciones móviles nativas para iOS y Android.',
    'services.ai.title': 'Inteligencia Artificial',
    'services.ai.desc': 'Integramos soluciones de IA para automatizar procesos, optimizar operaciones y crear ventajas competitivas reales en tu negocio.',
    'services.mvp.title': 'MVP & Producto',
    'services.mvp.desc': 'Lanzamos tu producto mínimo viable en 3 semanas. Validamos tu idea de negocio con usuarios reales antes de invertir a gran escala.',

    // Method
    'method.tagline': 'Por qué Lando',
    'method.title': 'Un método pensado para resultados reales',
    'method.exclusive.number': '3',
    'method.exclusive.label': 'clientes máximo',
    'method.exclusive.title': 'Dedicación exclusiva',
    'method.exclusive.desc': 'Solo trabajamos con 3 clientes a la vez. Esto nos permite garantizar la máxima calidad y atención personalizada en cada proyecto.',
    'method.mvp.number': '3',
    'method.mvp.label': 'semanas',
    'method.mvp.title': 'MVP en tiempo récord',
    'method.mvp.desc': 'Tu producto mínimo viable listo desde 3 semanas. Validamos rápido, iteramos con datos reales y escalamos con confianza.',
    'method.quality.number': '100',
    'method.quality.label': '% compromiso',
    'method.quality.title': 'Calidad sin concesiones',
    'method.quality.desc': 'Código limpio, arquitectura escalable y las mejores prácticas del sector. Tu producto nace preparado para crecer.',

    // Testimonials
    'testimonials.tagline': 'Clientes satisfechos',
    'testimonials.title': 'Lo que dicen de nosotros',

    // CTA
    'cta.title': '¿Listo para dar el siguiente paso?',
    'cta.desc': 'Reserva una consulta gratuita y sin compromiso. Analizaremos tu proyecto y te diremos exactamente cómo podemos ayudarte.',
    'cta.button': 'Reservar consulta gratuita',
    'cta.note': 'Sin compromiso · Respuesta en 24h',

    // Footer
    'footer.description': 'Consultoría tecnológica de alto impacto. Transformamos ideas en productos digitales extraordinarios.',
    'footer.services': 'Servicios',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    'footer.legal.notice': 'Aviso Legal',
    'footer.rights': '© 2025 Lando. Todos los derechos reservados.',

    // Legal pages
    'legal.privacy.title': 'Política de Privacidad',
    'legal.cookies.title': 'Política de Cookies',
    'legal.notice.title': 'Aviso Legal',
    'legal.back': '← Volver al inicio',
  },
  en: {
    // Nav
    'nav.services': 'Services',
    'nav.method': 'Method',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.lang': 'ES',

    // Hero
    'hero.tagline': 'High-impact tech consulting',
    'hero.title.line1': 'We transform ideas',
    'hero.title.line2': 'into extraordinary',
    'hero.title.highlight': 'digital products',
    'hero.description': 'We work with a maximum of 3 clients simultaneously to guarantee optimal results. Your project deserves exclusive attention.',
    'hero.cta': 'Book a free consultation',
    'hero.cta.secondary': 'Discover our method',

    // Services
    'services.tagline': 'What we do',
    'services.title': 'Services designed to boost your business',
    'services.consulting.title': 'Technical Consulting',
    'services.consulting.desc': 'We help you make the right technology decisions. We analyze your current situation and design the roadmap to your goals.',
    'services.web.title': 'Web & App Development',
    'services.web.desc': 'We create custom digital experiences. From corporate websites with advanced dashboards to native mobile apps for iOS and Android.',
    'services.ai.title': 'Artificial Intelligence',
    'services.ai.desc': 'We integrate AI solutions to automate processes, optimize operations, and create real competitive advantages for your business.',
    'services.mvp.title': 'MVP & Product',
    'services.mvp.desc': 'We launch your minimum viable product in 3 weeks. We validate your business idea with real users before investing at scale.',

    // Method
    'method.tagline': 'Why Lando',
    'method.title': 'A method designed for real results',
    'method.exclusive.number': '3',
    'method.exclusive.label': 'max clients',
    'method.exclusive.title': 'Exclusive dedication',
    'method.exclusive.desc': 'We only work with 3 clients at a time. This allows us to guarantee the highest quality and personalized attention on every project.',
    'method.mvp.number': '3',
    'method.mvp.label': 'weeks',
    'method.mvp.title': 'MVP in record time',
    'method.mvp.desc': 'Your minimum viable product ready from 3 weeks. We validate fast, iterate with real data, and scale with confidence.',
    'method.quality.number': '100',
    'method.quality.label': '% commitment',
    'method.quality.title': 'Uncompromising quality',
    'method.quality.desc': 'Clean code, scalable architecture, and industry best practices. Your product is born ready to grow.',

    // Testimonials
    'testimonials.tagline': 'Happy clients',
    'testimonials.title': 'What they say about us',

    // CTA
    'cta.title': 'Ready to take the next step?',
    'cta.desc': 'Book a free, no-obligation consultation. We\'ll analyze your project and tell you exactly how we can help.',
    'cta.button': 'Book free consultation',
    'cta.note': 'No obligation · Response within 24h',

    // Footer
    'footer.description': 'High-impact tech consulting. We transform ideas into extraordinary digital products.',
    'footer.services': 'Services',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.legal.notice': 'Legal Notice',
    'footer.rights': '© 2025 Lando. All rights reserved.',

    // Legal pages
    'legal.privacy.title': 'Privacy Policy',
    'legal.cookies.title': 'Cookie Policy',
    'legal.notice.title': 'Legal Notice',
    'legal.back': '← Back to home',
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations[defaultLang][key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}
