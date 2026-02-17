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
      name: 'Pieter V.',
      role: 'Engineering Manager',
      company: 'Telecom · Holanda',
      text: 'Lideraron la migración de nuestra plataforma legacy a microservicios sin interrupciones de servicio. La dedicación exclusiva se nota: entendieron nuestro negocio como si fueran parte del equipo interno.',
      avatar: 'PV',
    },
    {
      name: 'Elena T.',
      role: 'Directora de Tecnología',
      company: 'Fintech · Madrid',
      text: 'La arquitectura de APIs que diseñaron para nuestra banca digital es sólida y escalable. Procesamos ahora 5x más transacciones con la misma infraestructura. Su enfoque en calidad es excepcional.',
      avatar: 'ET',
    },
    {
      name: 'Marco R.',
      role: 'VP of Engineering',
      company: 'Search AI · Asturias',
      text: 'Integraron modelos de NLP en nuestro motor de búsqueda en tiempo récord. El hecho de trabajar con solo 3 clientes marca una diferencia abismal en la velocidad y profundidad del trabajo.',
      avatar: 'MR',
    },
    {
      name: 'Ana B.',
      role: 'Product Owner',
      company: 'PropTech · Madrid',
      text: 'Necesitábamos mejorar nuestro sistema de recomendaciones y entregaron una solución que aumentó el engagement un 35%. Profesionales, directos y sin rodeos.',
      avatar: 'AB',
    },
    {
      name: 'David S.',
      role: 'CTO',
      company: 'Inversión · Madrid',
      text: 'Desarrollaron nuestra plataforma de inversión automatizada desde cero. Lo que más valoro es la transparencia: siempre sabes en qué punto está tu proyecto. El resultado superó nuestras expectativas.',
      avatar: 'DS',
    },
  ],
  en: [
    {
      name: 'Pieter V.',
      role: 'Engineering Manager',
      company: 'Telecom · Netherlands',
      text: 'They led the migration of our legacy platform to microservices with zero downtime. The exclusive dedication shows: they understood our business as if they were part of the internal team.',
      avatar: 'PV',
    },
    {
      name: 'Elena T.',
      role: 'Director of Technology',
      company: 'Fintech · Madrid',
      text: 'The API architecture they designed for our digital banking is solid and scalable. We now process 5x more transactions with the same infrastructure. Their focus on quality is exceptional.',
      avatar: 'ET',
    },
    {
      name: 'Marco R.',
      role: 'VP of Engineering',
      company: 'Search AI · Asturias',
      text: 'They integrated NLP models into our search engine in record time. The fact that they work with only 3 clients makes a massive difference in the speed and depth of the work.',
      avatar: 'MR',
    },
    {
      name: 'Ana B.',
      role: 'Product Owner',
      company: 'PropTech · Madrid',
      text: 'We needed to improve our recommendation system and they delivered a solution that increased engagement by 35%. Professional, direct, and no-nonsense.',
      avatar: 'AB',
    },
    {
      name: 'David S.',
      role: 'CTO',
      company: 'Investment · Madrid',
      text: 'They built our automated investment platform from scratch. What I value most is the transparency: you always know where your project stands. The result exceeded our expectations.',
      avatar: 'DS',
    },
  ],
  ca: [
    {
      name: 'Pieter V.',
      role: 'Engineering Manager',
      company: 'Telecom · Holanda',
      text: 'Van liderar la migració de la nostra plataforma legacy a microserveis sense interrupcions de servei. La dedicació exclusiva es nota: van entendre el nostre negoci com si fossin part de l\'equip intern.',
      avatar: 'PV',
    },
    {
      name: 'Elena T.',
      role: 'Directora de Tecnologia',
      company: 'Fintech · Madrid',
      text: 'L\'arquitectura d\'APIs que van dissenyar per a la nostra banca digital és sòlida i escalable. Processem ara 5x més transaccions amb la mateixa infraestructura. El seu enfocament en qualitat és excepcional.',
      avatar: 'ET',
    },
    {
      name: 'Marco R.',
      role: 'VP of Engineering',
      company: 'Search AI · Astúries',
      text: 'Van integrar models de NLP al nostre motor de cerca en temps rècord. El fet de treballar amb només 3 clients marca una diferència abismal en la velocitat i profunditat del treball.',
      avatar: 'MR',
    },
    {
      name: 'Ana B.',
      role: 'Product Owner',
      company: 'PropTech · Madrid',
      text: 'Necessitàvem millorar el nostre sistema de recomanacions i van lliurar una solució que va augmentar l\'engagement un 35%. Professionals, directes i sense embuts.',
      avatar: 'AB',
    },
    {
      name: 'David S.',
      role: 'CTO',
      company: 'Inversió · Madrid',
      text: 'Van desenvolupar la nostra plataforma d\'inversió automatitzada des de zero. El que més valoro és la transparència: sempre saps en quin punt està el teu projecte. El resultat va superar les nostres expectatives.',
      avatar: 'DS',
    },
  ],
  eu: [
    {
      name: 'Pieter V.',
      role: 'Engineering Manager',
      company: 'Telecom · Herbehereak',
      text: 'Gure legacy plataformaren migrazioa mikrozerbitzuetara zuzendu zuten zerbitzu etenik gabe. Dedikazio esklusiboa nabaritzen da: gure negozioa ulertzen zuten barne taldeko kide izango balira bezala.',
      avatar: 'PV',
    },
    {
      name: 'Elena T.',
      role: 'Teknologia Zuzendaria',
      company: 'Fintech · Madril',
      text: 'Gure banka digitalerako diseinatu zuten API arkitektura sendoa eta eskalagarria da. Orain 5 aldiz transakzio gehiago prozesatzen ditugu azpiegitura berarekin. Kalitatearen gaineko ikuspegia bikaina da.',
      avatar: 'ET',
    },
    {
      name: 'Marco R.',
      role: 'VP of Engineering',
      company: 'Search AI · Asturias',
      text: 'NLP modeloak gure bilaketa-motorrean integratu zituzten denbora errekorrean. 3 bezerorekin bakarrik lan egiteak desberdintasun izugarria dakar lanaren abiadura eta sakontasunean.',
      avatar: 'MR',
    },
    {
      name: 'Ana B.',
      role: 'Product Owner',
      company: 'PropTech · Madril',
      text: 'Gure gomendio-sistema hobetu behar genuen eta engagemendua %35 handitu zuen irtenbidea eman ziguten. Profesionalak, zuzenak eta zalantzarik gabekoak.',
      avatar: 'AB',
    },
    {
      name: 'David S.',
      role: 'CTO',
      company: 'Inbertsioa · Madril',
      text: 'Gure inbertsio-plataforma automatizatua hutsetik garatu zuten. Gehien baloratzen dudana gardentasuna da: beti dakizu zure proiektua non dagoen. Emaitzak gure itxaropenak gainditu zituen.',
      avatar: 'DS',
    },
  ],
};
