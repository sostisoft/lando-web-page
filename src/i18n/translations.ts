import { SITE } from '../config/site';

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
    'nav.faq': 'FAQ',
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

    // Team
    'team.tagline': 'Nuestro equipo',
    'team.title': 'Ingenieros con experiencia real',
    'team.subtitle': 'Profesionales senior que han liderado proyectos en las empresas tecnológicas más exigentes de Europa.',
    'team.role1': 'Senior Software Engineer',
    'team.experience1': 'Java · Kotlin · Cloud · Microservicios',
    'team.desc1': 'Especializado en arquitecturas de microservicios y Domain-Driven Design. Proyectos de alta escala en retail, banca y real estate.',
    'team.role2': 'Solution Architect & Tech Lead',
    'team.experience2': '+25 años · Java Full-Stack · DevOps',
    'team.desc2': 'Arquitecto de software con más de 25 años de experiencia liderando equipos y diseñando sistemas para telecomunicaciones, logística y fintech a nivel europeo.',
    'team.role3': 'Frontend Engineer',
    'team.experience3': '+8 años · React · TypeScript · UX',
    'team.desc3': 'Especialista en interfaces de alto rendimiento y accesibilidad. Experiencia creando dashboards complejos, design systems y aplicaciones SPA/SSR para fintech y e-commerce.',
    'team.role4': 'Backend Engineer',
    'team.experience4': '+10 años · Node.js · Python · APIs',
    'team.desc4': 'Experto en diseño de APIs escalables, sistemas event-driven y arquitecturas serverless. Proyectos en banca digital, marketplaces y plataformas de datos en tiempo real.',
    'team.role5': 'DevOps & Cloud Engineer',
    'team.experience5': '+7 años · AWS · Kubernetes · CI/CD',
    'team.desc5': 'Ingeniero de infraestructura cloud con enfoque en automatización, pipelines CI/CD y observabilidad. Migración y operación de sistemas críticos en producción.',

    // Clients
    'clients.tagline': 'Clientes que confían en nosotros',
    'clients.title': 'Empresas con las que hemos trabajado',
    'clients.desc.kpn': 'Migración de plataforma de telecomunicaciones a microservicios',
    'clients.desc.inditex': 'Optimización del sistema de e-commerce y logística omnicanal',
    'clients.desc.mercadona': 'Desarrollo de plataforma de gestión de cadena de suministro',
    'clients.desc.openbank': 'Arquitectura de banca digital y APIs de pagos',
    'clients.desc.myinvestor': 'Plataforma de inversión automatizada y robo-advisory',
    'clients.desc.nttdata': 'Consultoría en transformación digital para clientes enterprise',
    'clients.desc.kroger': 'Sistema de inventario en tiempo real con integración IoT',
    'clients.desc.idealista': 'Motor de búsqueda inmobiliaria y sistema de recomendaciones',
    'clients.desc.brinks': 'Plataforma de monitorización y gestión de seguridad',
    'clients.desc.qbuzz': 'Sistema de ticketing digital y planificación de rutas',
    'clients.desc.empathy': 'Motor de búsqueda con IA y procesamiento de lenguaje natural',

    // Cookie Banner
    'cookies.banner.title': 'Usamos cookies',
    'cookies.banner.desc': 'Utilizamos cookies propias y de terceros para mejorar tu experiencia en nuestro sitio web. ',
    'cookies.banner.more': 'Más información',
    'cookies.banner.accept': 'Aceptar todas',
    'cookies.banner.reject': 'Rechazar todas',
    'cookies.banner.preferences': 'Personalizar',
    'cookies.prefs.title': 'Preferencias de cookies',
    'cookies.prefs.desc': 'Elige qué categorías de cookies quieres aceptar. Las cookies necesarias no se pueden desactivar porque son esenciales para el funcionamiento del sitio.',
    'cookies.prefs.necessary': 'Necesarias',
    'cookies.prefs.necessary.desc': 'Esenciales para el funcionamiento del sitio web. Incluyen la preferencia de idioma y el consentimiento de cookies.',
    'cookies.prefs.necessary.always': 'Siempre activas',
    'cookies.prefs.analytics': 'Analíticas',
    'cookies.prefs.analytics.desc': 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web, de forma anónima y sin rastreo personal.',
    'cookies.prefs.save': 'Guardar preferencias',
    'cookies.prefs.change': 'Preferencias de cookies',

    // Footer
    'footer.description': 'Consultoría tecnológica de alto impacto. Transformamos ideas en productos digitales extraordinarios.',
    'footer.services': 'Servicios',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    'footer.legal.notice': 'Aviso Legal',
    'footer.rights': `© ${new Date().getFullYear()} ${SITE.name}. Todos los derechos reservados.`,

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
    'nav.faq': 'FAQ',
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

    // Team
    'team.tagline': 'Our team',
    'team.title': 'Engineers with real-world experience',
    'team.subtitle': 'Senior professionals who have led projects at Europe\'s most demanding tech companies.',
    'team.role1': 'Senior Software Engineer',
    'team.experience1': 'Java · Kotlin · Cloud · Microservices',
    'team.desc1': 'Specialized in microservices architectures and Domain-Driven Design. Large-scale projects in retail, banking, and real estate.',
    'team.role2': 'Solution Architect & Tech Lead',
    'team.experience2': '+25 years · Java Full-Stack · DevOps',
    'team.desc2': 'Software architect with over 25 years of experience leading teams and designing systems for telecommunications, logistics, and fintech across Europe.',
    'team.role3': 'Frontend Engineer',
    'team.experience3': '+8 years · React · TypeScript · UX',
    'team.desc3': 'Specialist in high-performance interfaces and accessibility. Experience building complex dashboards, design systems, and SPA/SSR applications for fintech and e-commerce.',
    'team.role4': 'Backend Engineer',
    'team.experience4': '+10 years · Node.js · Python · APIs',
    'team.desc4': 'Expert in scalable API design, event-driven systems, and serverless architectures. Projects in digital banking, marketplaces, and real-time data platforms.',
    'team.role5': 'DevOps & Cloud Engineer',
    'team.experience5': '+7 years · AWS · Kubernetes · CI/CD',
    'team.desc5': 'Cloud infrastructure engineer focused on automation, CI/CD pipelines, and observability. Migration and operation of critical production systems.',

    // Clients
    'clients.tagline': 'Trusted by',
    'clients.title': 'Companies we\'ve worked with',
    'clients.desc.kpn': 'Telecom platform migration to microservices',
    'clients.desc.inditex': 'E-commerce optimization and omnichannel logistics',
    'clients.desc.mercadona': 'Supply chain management platform development',
    'clients.desc.openbank': 'Digital banking architecture and payment APIs',
    'clients.desc.myinvestor': 'Automated investment platform and robo-advisory',
    'clients.desc.nttdata': 'Digital transformation consulting for enterprise clients',
    'clients.desc.kroger': 'Real-time inventory system with IoT integration',
    'clients.desc.idealista': 'Real estate search engine and recommendation system',
    'clients.desc.brinks': 'Security monitoring and management platform',
    'clients.desc.qbuzz': 'Digital ticketing system and route planning',
    'clients.desc.empathy': 'AI-powered search engine and NLP processing',

    // Cookie Banner
    'cookies.banner.title': 'We use cookies',
    'cookies.banner.desc': 'We use our own and third-party cookies to improve your experience on our website. ',
    'cookies.banner.more': 'Learn more',
    'cookies.banner.accept': 'Accept all',
    'cookies.banner.reject': 'Reject all',
    'cookies.banner.preferences': 'Customize',
    'cookies.prefs.title': 'Cookie preferences',
    'cookies.prefs.desc': 'Choose which cookie categories you want to accept. Necessary cookies cannot be disabled because they are essential for the site to function.',
    'cookies.prefs.necessary': 'Necessary',
    'cookies.prefs.necessary.desc': 'Essential for the website to function. Includes language preference and cookie consent.',
    'cookies.prefs.necessary.always': 'Always active',
    'cookies.prefs.analytics': 'Analytics',
    'cookies.prefs.analytics.desc': 'Help us understand how visitors interact with the website, anonymously and without personal tracking.',
    'cookies.prefs.save': 'Save preferences',
    'cookies.prefs.change': 'Cookie preferences',

    // Footer
    'footer.description': 'High-impact tech consulting. We transform ideas into extraordinary digital products.',
    'footer.services': 'Services',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.legal.notice': 'Legal Notice',
    'footer.rights': `© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.`,

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
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = url.pathname.replace(base, '');
  const [, lang] = pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(lang: Lang, path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${lang}${path}`;
}
