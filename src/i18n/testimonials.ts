import type { Lang } from './translations';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export const testimonials: Record<Lang, Testimonial[]> = {
  es: [
    {
      name: 'María García',
      role: 'CEO',
      company: 'TechFlow',
      text: 'Lando transformó nuestra idea en un producto real en tiempo récord. La dedicación exclusiva se nota en cada detalle. Nuestro MVP estuvo listo en 3 semanas y ya hemos cerrado nuestra primera ronda de financiación.',
      avatar: 'MG',
    },
    {
      name: 'Carlos Rodríguez',
      role: 'CTO',
      company: 'DataPulse',
      text: 'La calidad técnica del equipo es excepcional. Implementaron una solución de IA que redujo nuestros costes operativos un 40%. El hecho de trabajar con solo 3 clientes marca una diferencia abismal.',
      avatar: 'CR',
    },
    {
      name: 'Laura Martínez',
      role: 'Fundadora',
      company: 'GreenPath',
      text: 'Necesitábamos validar nuestra idea rápidamente y Lando nos ayudó a lanzar un MVP funcional que nos permitió obtener tracción real antes de escalar. Su enfoque es directo, profesional y sin rodeos.',
      avatar: 'LM',
    },
    {
      name: 'Alejandro Vidal',
      role: 'Director de Producto',
      company: 'FinEdge',
      text: 'Trabajar con Lando fue un punto de inflexión. Su consultoría técnica nos ayudó a redefinir nuestra arquitectura y ahora manejamos 10x más tráfico sin problemas. Recomendable al 100%.',
      avatar: 'AV',
    },
    {
      name: 'Sofía Ruiz',
      role: 'COO',
      company: 'HealthSync',
      text: 'Lo que más valoro es la transparencia y la comunicación constante. Siempre sabes en qué punto está tu proyecto. El resultado superó nuestras expectativas con creces.',
      avatar: 'SR',
    },
  ],
  en: [
    {
      name: 'María García',
      role: 'CEO',
      company: 'TechFlow',
      text: 'Lando transformed our idea into a real product in record time. The exclusive dedication shows in every detail. Our MVP was ready in 3 weeks and we\'ve already closed our first funding round.',
      avatar: 'MG',
    },
    {
      name: 'Carlos Rodríguez',
      role: 'CTO',
      company: 'DataPulse',
      text: 'The team\'s technical quality is exceptional. They implemented an AI solution that reduced our operational costs by 40%. The fact that they work with only 3 clients makes a massive difference.',
      avatar: 'CR',
    },
    {
      name: 'Laura Martínez',
      role: 'Founder',
      company: 'GreenPath',
      text: 'We needed to validate our idea quickly and Lando helped us launch a functional MVP that allowed us to gain real traction before scaling. Their approach is direct, professional, and no-nonsense.',
      avatar: 'LM',
    },
    {
      name: 'Alejandro Vidal',
      role: 'Product Director',
      company: 'FinEdge',
      text: 'Working with Lando was a turning point. Their technical consulting helped us redefine our architecture and we now handle 10x more traffic without issues. 100% recommended.',
      avatar: 'AV',
    },
    {
      name: 'Sofía Ruiz',
      role: 'COO',
      company: 'HealthSync',
      text: 'What I value most is the transparency and constant communication. You always know where your project stands. The result exceeded our expectations by far.',
      avatar: 'SR',
    },
  ],
};
