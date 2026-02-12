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
    'cta.desc': 'Rellena el formulario y te responderemos en menos de 24 horas. Analizaremos tu proyecto y te diremos exactamente cómo podemos ayudarte.',
    'cta.button': 'Reservar consulta gratuita',
    'cta.note': 'Sin compromiso · Respuesta en 24h',

    // Contact Form
    'form.name': 'Nombre',
    'form.name.placeholder': 'Tu nombre',
    'form.email': 'Email',
    'form.email.placeholder': 'tu@email.com',
    'form.company': 'Empresa',
    'form.company.placeholder': 'Nombre de tu empresa (opcional)',
    'form.service': 'Servicio de interés',
    'form.service.placeholder': 'Selecciona un servicio',
    'form.message': 'Mensaje',
    'form.message.placeholder': 'Cuéntanos sobre tu proyecto...',
    'form.submit': 'Enviar mensaje',
    'form.budget.title': 'Resumen del presupuesto estimado',

    // Budget Estimator
    'estimator.tagline': 'Presupuesto inteligente',
    'estimator.title': 'Calcula tu presupuesto en 1 minuto',
    'estimator.desc': 'Nuestro estimador te dará un rango de presupuesto aproximado basado en tus necesidades. Sin registro, sin compromiso.',
    'estimator.step1.title': '¿Qué tipo de proyecto necesitas?',
    'estimator.step1.desc': 'Selecciona el tipo de proyecto que mejor se ajuste a tu idea.',
    'estimator.type.web': 'Web / App Web',
    'estimator.type.web.detail': 'Páginas web, plataformas SaaS, e-commerce',
    'estimator.type.app': 'App Móvil',
    'estimator.type.app.detail': 'Apps nativas o híbridas para iOS y Android',
    'estimator.type.ai': 'Inteligencia Artificial',
    'estimator.type.ai.detail': 'Chatbots, automatización, modelos ML',
    'estimator.type.consulting': 'Consultoría',
    'estimator.type.consulting.detail': 'Auditoría técnica, hoja de ruta digital',
    'estimator.step2.title': '¿Cuál es la complejidad?',
    'estimator.step2.desc': 'Esto nos ayuda a estimar el alcance del proyecto.',
    'estimator.complexity.basic': 'Básico',
    'estimator.complexity.basic.detail': 'Funcionalidades estándar, diseño limpio',
    'estimator.complexity.medium': 'Intermedio',
    'estimator.complexity.medium.detail': 'Integraciones, lógica personalizada',
    'estimator.complexity.advanced': 'Avanzado',
    'estimator.complexity.advanced.detail': 'Arquitectura compleja, alta escalabilidad',
    'estimator.step3.title': '¿Qué funcionalidades necesitas?',
    'estimator.step3.desc': 'Selecciona todas las que apliquen a tu proyecto.',
    'estimator.feature.auth': 'Autenticación de usuarios',
    'estimator.feature.payments': 'Pasarela de pagos',
    'estimator.feature.dashboard': 'Panel de administración',
    'estimator.feature.api': 'API / Integraciones',
    'estimator.feature.ai': 'Integración de IA',
    'estimator.feature.multilang': 'Multiidioma',
    'estimator.feature.cms': 'Gestor de contenidos',
    'estimator.feature.realtime': 'Tiempo real / Chat',
    'estimator.next': 'Continuar',
    'estimator.step4.title': '¿Cuál es tu plazo ideal?',
    'estimator.step4.desc': 'El plazo puede afectar al presupuesto final.',
    'estimator.timeline.urgent': 'Urgente',
    'estimator.timeline.urgent.detail': 'Lo necesito para ayer',
    'estimator.timeline.normal': 'Normal',
    'estimator.timeline.normal.detail': '1-2 meses es perfecto',
    'estimator.timeline.flexible': 'Flexible',
    'estimator.timeline.flexible.detail': 'No hay prisa, calidad ante todo',
    'estimator.result.title': 'Tu presupuesto estimado',
    'estimator.result.project': 'Tipo de proyecto',
    'estimator.result.complexity': 'Complejidad',
    'estimator.result.features': 'Funcionalidades',
    'estimator.result.timeline': 'Plazo',
    'estimator.result.duration': 'Duración estimada',
    'estimator.result.disclaimer': '* Este es un rango orientativo. El presupuesto final se ajusta tras una consulta personalizada.',
    'estimator.result.comments': 'Comentarios adicionales',
    'estimator.result.comments.placeholder': 'Describe brevemente qué necesitas, detalles especiales...',
    'estimator.result.cta': 'Solicitar presupuesto exacto',
    'estimator.result.restart': 'Volver a calcular',
    'estimator.back': 'Atrás',

    // Cookie Banner
    'cookies.banner.title': 'Usamos cookies',
    'cookies.banner.desc': 'Utilizamos cookies propias y de terceros para mejorar tu experiencia en nuestro sitio web. ',
    'cookies.banner.more': 'Más información',
    'cookies.banner.accept': 'Aceptar',
    'cookies.banner.reject': 'Rechazar',

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
    'cta.desc': 'Fill in the form and we\'ll respond within 24 hours. We\'ll analyze your project and tell you exactly how we can help.',
    'cta.button': 'Book free consultation',
    'cta.note': 'No obligation · Response within 24h',

    // Contact Form
    'form.name': 'Name',
    'form.name.placeholder': 'Your name',
    'form.email': 'Email',
    'form.email.placeholder': 'you@email.com',
    'form.company': 'Company',
    'form.company.placeholder': 'Your company name (optional)',
    'form.service': 'Service of interest',
    'form.service.placeholder': 'Select a service',
    'form.message': 'Message',
    'form.message.placeholder': 'Tell us about your project...',
    'form.submit': 'Send message',
    'form.budget.title': 'Estimated budget summary',

    // Budget Estimator
    'estimator.tagline': 'Smart budgeting',
    'estimator.title': 'Get your estimate in 1 minute',
    'estimator.desc': 'Our estimator will give you an approximate budget range based on your needs. No registration, no obligation.',
    'estimator.step1.title': 'What type of project do you need?',
    'estimator.step1.desc': 'Select the project type that best fits your idea.',
    'estimator.type.web': 'Web / Web App',
    'estimator.type.web.detail': 'Websites, SaaS platforms, e-commerce',
    'estimator.type.app': 'Mobile App',
    'estimator.type.app.detail': 'Native or hybrid apps for iOS and Android',
    'estimator.type.ai': 'Artificial Intelligence',
    'estimator.type.ai.detail': 'Chatbots, automation, ML models',
    'estimator.type.consulting': 'Consulting',
    'estimator.type.consulting.detail': 'Technical audit, digital roadmap',
    'estimator.step2.title': 'What\'s the complexity level?',
    'estimator.step2.desc': 'This helps us estimate the project scope.',
    'estimator.complexity.basic': 'Basic',
    'estimator.complexity.basic.detail': 'Standard features, clean design',
    'estimator.complexity.medium': 'Intermediate',
    'estimator.complexity.medium.detail': 'Integrations, custom logic',
    'estimator.complexity.advanced': 'Advanced',
    'estimator.complexity.advanced.detail': 'Complex architecture, high scalability',
    'estimator.step3.title': 'What features do you need?',
    'estimator.step3.desc': 'Select all that apply to your project.',
    'estimator.feature.auth': 'User authentication',
    'estimator.feature.payments': 'Payment gateway',
    'estimator.feature.dashboard': 'Admin dashboard',
    'estimator.feature.api': 'API / Integrations',
    'estimator.feature.ai': 'AI integration',
    'estimator.feature.multilang': 'Multi-language',
    'estimator.feature.cms': 'Content management',
    'estimator.feature.realtime': 'Real-time / Chat',
    'estimator.next': 'Continue',
    'estimator.step4.title': 'What\'s your ideal timeline?',
    'estimator.step4.desc': 'The timeline can affect the final budget.',
    'estimator.timeline.urgent': 'Urgent',
    'estimator.timeline.urgent.detail': 'I needed it yesterday',
    'estimator.timeline.normal': 'Normal',
    'estimator.timeline.normal.detail': '1-2 months is perfect',
    'estimator.timeline.flexible': 'Flexible',
    'estimator.timeline.flexible.detail': 'No rush, quality first',
    'estimator.result.title': 'Your estimated budget',
    'estimator.result.project': 'Project type',
    'estimator.result.complexity': 'Complexity',
    'estimator.result.features': 'Features',
    'estimator.result.timeline': 'Timeline',
    'estimator.result.duration': 'Estimated duration',
    'estimator.result.disclaimer': '* This is an indicative range. The final budget is adjusted after a personalized consultation.',
    'estimator.result.comments': 'Additional comments',
    'estimator.result.comments.placeholder': 'Briefly describe what you need, any special details...',
    'estimator.result.cta': 'Request exact quote',
    'estimator.result.restart': 'Recalculate',
    'estimator.back': 'Back',

    // Cookie Banner
    'cookies.banner.title': 'We use cookies',
    'cookies.banner.desc': 'We use our own and third-party cookies to improve your experience on our website. ',
    'cookies.banner.more': 'Learn more',
    'cookies.banner.accept': 'Accept',
    'cookies.banner.reject': 'Reject',

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
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${lang}${path}`;
}
