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
      name: 'Pieter van der Berg',
      role: 'Engineering Manager',
      company: 'KPN',
      text: 'Lando lideró la migración de nuestra plataforma legacy a microservicios sin interrupciones de servicio. La dedicación exclusiva se nota: entendieron nuestro negocio como si fueran parte del equipo interno.',
      avatar: 'PB',
    },
    {
      name: 'Elena Torres',
      role: 'Directora de Tecnología',
      company: 'Openbank',
      text: 'La arquitectura de APIs que diseñaron para nuestra banca digital es sólida y escalable. Procesamos ahora 5x más transacciones con la misma infraestructura. Su enfoque en calidad es excepcional.',
      avatar: 'ET',
    },
    {
      name: 'Marco Rossi',
      role: 'VP of Engineering',
      company: 'Empathy.co',
      text: 'Integraron modelos de NLP en nuestro motor de búsqueda en tiempo récord. El hecho de trabajar con solo 3 clientes marca una diferencia abismal en la velocidad y profundidad del trabajo.',
      avatar: 'MR',
    },
    {
      name: 'Ana Belén Ruiz',
      role: 'Product Owner',
      company: 'Idealista',
      text: 'Necesitábamos mejorar nuestro sistema de recomendaciones y Lando entregó una solución que aumentó el engagement un 35%. Profesionales, directos y sin rodeos.',
      avatar: 'AR',
    },
    {
      name: 'David Sánchez',
      role: 'CTO',
      company: 'MyInvestor',
      text: 'Desarrollaron nuestra plataforma de robo-advisory desde cero. Lo que más valoro es la transparencia: siempre sabes en qué punto está tu proyecto. El resultado superó nuestras expectativas.',
      avatar: 'DS',
    },
  ],
  en: [
    {
      name: 'Pieter van der Berg',
      role: 'Engineering Manager',
      company: 'KPN',
      text: 'Lando led the migration of our legacy platform to microservices with zero downtime. The exclusive dedication shows: they understood our business as if they were part of the internal team.',
      avatar: 'PB',
    },
    {
      name: 'Elena Torres',
      role: 'Director of Technology',
      company: 'Openbank',
      text: 'The API architecture they designed for our digital banking is solid and scalable. We now process 5x more transactions with the same infrastructure. Their focus on quality is exceptional.',
      avatar: 'ET',
    },
    {
      name: 'Marco Rossi',
      role: 'VP of Engineering',
      company: 'Empathy.co',
      text: 'They integrated NLP models into our search engine in record time. The fact that they work with only 3 clients makes a massive difference in the speed and depth of the work.',
      avatar: 'MR',
    },
    {
      name: 'Ana Belén Ruiz',
      role: 'Product Owner',
      company: 'Idealista',
      text: 'We needed to improve our recommendation system and Lando delivered a solution that increased engagement by 35%. Professional, direct, and no-nonsense.',
      avatar: 'AR',
    },
    {
      name: 'David Sánchez',
      role: 'CTO',
      company: 'MyInvestor',
      text: 'They built our robo-advisory platform from scratch. What I value most is the transparency: you always know where your project stands. The result exceeded our expectations.',
      avatar: 'DS',
    },
  ],
};
