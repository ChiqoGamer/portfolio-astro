// src/i18n/translations.ts
export const translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      experiencia: 'Experiencia',
      proyectos: 'Proyectos',
      educacion: 'Educación',
      skills: 'Skills',
      contacto: 'Contacto',
    },

    hero: {
      subtitle: 'Full Stack Developer',
      greeting: 'Hola, soy',
      desc: 'Full Stack Developer y Técnico Universitario en Programación (UTN FRGP). Antes de programar escucho: entiendo cómo trabaja el equipo o el cliente y diseño la solución que realmente necesita. Como JTP en la UTN aprendí a explicar lo complejo con claridad y a sostener al equipo bajo presión.',
      cvBtn: 'Visualizar CV',
      contactBtn: 'Contactame',
      downloadCV: 'Descargar CV',
    },

    zen: {
      ringEarth: 'El anillo de la Tierra · 01',
      ringWater: 'El anillo del Agua · 02',
      ringFire: 'El anillo del Fuego · 03',
      ringWind: 'El anillo del Viento · 04',
      ringVoid: 'El anillo del Vacío · 05',
      scroll: 'SCROLL',
      memTitle: 'En memoria de Plumita',
      memText: 'Mi compañera de caminatas y montañas. Sus huellas siguen marcando cada uno de mis senderos.',
      rings: 'Diseñado bajo los cinco anillos',
    },

    education: {
      title: 'Educación',
      certificateLabel: 'Ver certificado',
      certificateDownload: 'Descargar certificado',

      educationItems: [
         {
    title: 'Full Stack Developer',
    institution: 'Fundacion Pescar',
    date: 'JUN 2026 - DIC 2026',
    description:
      'Formación desde los fundamentos web hasta tecnologías como Python, Django, React, MongoDB e Ingeniería de Software con IA. Complementada con un enfoque integral en habilidades blandas: construcción de marca personal, autoconocimiento y desarrollo profesional..',
    lineClass: 'linea',
  },
  {
    title: 'Node JS',
    institution: '<TalentoTech>',
    date: 'ABR 2026 - JUL 2026',
    certificateUrl: 'https://openbadgefactory.com/obv3/credentials/367271366cbba71c2317e736f8a3de5c9e133d98',
    description:
      'Formación en desarrollo backend con Node.js, Express, bases de datos, autenticación y despliegue.',
    lineClass: 'linea',
  },
  {
    title: 'React JS',
    institution: '<TalentoTech>',
    date: 'JUL 2025 - DIC 2025',
    certificateUrl: 'https://openbadgefactory.com/obv3/credentials/cb6fec998dcd0dc7490b659442f54fa0f6943b1a',
    description:
      'Desarrollo frontend con React, hooks, rutas, CRUD, autenticación, consumo de APIs y aproximación a Bootstrap.',
    lineClass: 'linea',
  },
  {
    title: 'Front-End con JavaScript',
    institution: '<TalentoTech>',
    date: 'ABR 2025 - JUL 2025',
    certificateUrl: 'https://openbadgefactory.com/obv3/credentials/a2a1b6f5d20ad12e663041a1fdac0b6c1c7c1885',
    description: 'Formación en desarrollo web, HTML, CSS, JavaScript y diseño responsive.',
    lineClass: 'linea',
  },
  {
    title: 'Tecnico Universitario en Programación',
    institution: 'Universidad Tecnológica Nacional FRGP',
    date: 'AGO 2022 - DIC 2024',
    certificateUrl: '/certificados/tecnicatura-utn-frgp.pdf',
    description:
      'Formación técnica en programación, bases de datos, desarrollo web e ingeniería de software.',
    lineClass: 'linea3',
  },
      ],
    },

    exp: {
      title: 'Experiencia',

      experiences: [
        {
          title: 'Data Analytics',
          institution: '5411 LLC',
          date: 'JUL 2026 — SEP 2026',
          description:
            'Análisis de datos para la toma de decisiones del negocio: recolección, limpieza y modelado de datos, creación de dashboards y reportes, y generación de insights accionables para optimizar procesos y resultados.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'JTP (Jefe de Trabajos Prácticos) – Programación I C++',
          institution: 'Universidad Tecnológica Nacional FRGP',
          date: 'AGO 2023 — Actualmente',
          description:
            'Colaboro en el dictado de clases teóricas y prácticas, asistencia a estudiantes, corrección de evaluaciones y resolución de dudas.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'Profesor Particular de Programación',
          institution: 'Autónomo',
          date: 'ABR 2024 — Actualmente',
          description:
            'Brindo clases personalizadas a estudiantes universitarios, enfocadas en lógica de programación, diagramas de flujo y resolución de ejercicios prácticos, acompañando su formación académica.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'Developer',
          institution: 'Colidevs Startup',
          date: 'AGO 2024 — DIC 2025',
          description:
            'Desarrollo la landing page de la empresa con Astro y Tailwind CSS, enfocada en performance, diseño responsive y posicionamiento SEO, dentro de un equipo con visión de crecimiento y desarrollo de productos digitales.',
          lineClass: 'linea3-EXP',
        },
      ],
    },
    skill: {
      title1: 'Frontend',
      title2: 'Backend',
      title3: 'Bases de Datos & Herramientas',
      title4: 'Aprendiendo',
    },
    contact: {
  title: 'Contacto',

  infoTitle: 'Información de contacto',

  email: 'Email',
  phone: 'Teléfono',
  location: 'Ubicación',
  city: 'Buenos Aires, Argentina',

  formTitle: 'Envíame un mensaje',

  name: 'Nombre',
  namePlaceholder: 'Tu nombre',

  emailLabel: 'Email',
  emailPlaceholder: 'tuemail@ejemplo.com',

  message: 'Mensaje',
  messagePlaceholder: 'Escribe tu mensaje aquí',

  send: 'Enviar',

  alerts: {
    loading: 'Enviando mensaje...',
    success: '¡Mensaje enviado correctamente!',
    error: 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.',
  },
},
footer: {
  copyright: '© 2026 Joel Nicolás Morán. Todos los derechos reservados.',
  madeWith: 'Diseñado y desarrollado con 💚 y mucho ☕!',
},
projects: {
  title: 'Proyectos',
  website: 'Sitio Web',

  items: [
    {
      title: 'wouü Importaciones',
      subtitle: 'E-Commerce para Cliente Real | Tiendanube',
      description:
        'Tienda online en producción para una marca de accesorios deportivos. Diseñé y desarrollé una interfaz mobile-first a medida dentro de los límites de Tiendanube: un pipeline propio en Python genera los bloques de código, la UI sincroniza color, packs y precio en vivo con el carrito nativo, y cada publicación se valida con pruebas automatizadas en Playwright.',
    },
    {
      title: 'Origami Design',
      subtitle: 'Editor de Equipaciones en 3D | Producto Propio',
      description:
        'Producto propio: editor web donde un club diseña su equipación y la ve en 3D en tiempo real. Renderizo con Three.js y React Three Fiber un modelo GLB de la camiseta y geometría procedural para short y medias; un mismo canvas genera la textura del 3D y el archivo de impresión a 300 DPI. Estado con Zustand e Immer para deshacer y versionado, exportación en PNG y links para compartir.',
    },
    {
      title: 'React Botines',
      subtitle: 'E-Commerce + Panel de Administración (CRUD)',
      description:
        'SPA en React con panel de administración: login con ruta protegida y CRUD completo de productos contra una API REST (GET, POST, PUT y DELETE). La tienda consume ese catálogo con búsqueda, filtro por marca, orden por precio, paginación y carrito, con estado global en Context API y navegación con React Router.',
    },
    {
      title: 'Portfolio Personal',
      subtitle: 'Sitio Bilingüe con Asistente IA | Proyecto Destacado',
      description:
        'Sitio bilingüe (ES/EN) en Astro y React con arquitectura de islas: solo se hidrata lo interactivo. Incluye un asistente con IA propio, una función serverless en Vercel con cadena de modelos (Groq → Gemini) y respuesta en streaming, visor de PDF, SEO técnico (hreflang, sitemap, datos estructurados) y foco en accesibilidad y rendimiento.',
    },
    {
      title: 'Banco XYZ',
      subtitle: 'Sistema de Gestión Bancaria | Trabajo Integrador UTN',
      description:
        'Aplicación web en Java EE (JSP y Servlets) con arquitectura en capas (presentación, negocio, DAO y entidades) sobre MySQL. Roles de administrador y cliente: alta y baja de clientes y cuentas, transferencias, movimientos, pedido, aprobación y pago de préstamos, e informes. Desarrollada en equipo.',
    },
    {
      title: 'Hospital UTN FRGP',
      subtitle: 'Sistema de Gestión Hospitalaria | Trabajo Integrador UTN',
      description:
        'Aplicación web en ASP.NET Web Forms (C#) con arquitectura en tres capas y SQL Server. Login por rol: el administrador gestiona médicos, pacientes y turnos y genera informes; el médico consulta su agenda de turnos. Desarrollada en equipo.',
    },
    {
      title: 'Landing Colidevs',
      subtitle: 'Landing Corporativa en Producción | Startup',
      description:
        'Landing en producción para una startup de control y trazabilidad de la producción. Sitio estático en Astro y Tailwind CSS: carga rápida, diseño responsive, SEO y llamados a la acción orientados a conversión.',
    },
    {
      title: 'APX Electronics',
      subtitle: 'E-Commerce en JavaScript Puro | Proyecto Final TalentoTech',
      description:
        'Tienda online hecha con JavaScript puro, sin frameworks, que consume los productos desde la API de DummyJSON. Catálogo dinámico, carrito persistente en localStorage y diseño responsive. Proyecto final del curso Front-End de TalentoTech.',
    },
  ],
},
chat: {
  welcome:
    '¡Hola! Soy Plumita 🐾, la asistente virtual de Joel. Podés preguntarme sobre su experiencia, proyectos, tecnologías o cualquier cosa que quieras saber de él.',

  suggestions: [
    '¿En qué estás trabajando ahora?',
    '¿Qué tecnologías dominás?',
    '¿Qué proyectos tenés?',
    '¿Cómo te contacto?',
  ],

  header: {
    title: 'Plumita 🐾',
    status: '● Asistente virtual de Joel · IA activa',
  },

  inputPlaceholder: 'Preguntame algo sobre mi perfil...',

  errors: {
    connection: 'Error de conexión. Intentá de nuevo.',
    busy: 'Plumita está atendiendo muchas consultas 🐾. Probá de nuevo en un minuto o escribile a Joel desde Contacto.',
    noResponse: 'No pude generar una respuesta.',
  },

  footer: 'Powered by · joel.dev',
}
  },

  en: {
    nav: {
      inicio: 'Home',
      experiencia: 'Experience',
      proyectos: 'Projects',
      educacion: 'Education',
      skills: 'Skills',
      contacto: 'Contact',
    },

    hero: {
      subtitle: 'Full Stack Developer',
      greeting: "Hi, I'm",
      desc: 'Full Stack Developer and University Technician in Programming (UTN FRGP). I listen before I code: I learn how a team or client works, then design the solution they actually need. As a JTP (practical work lead) at UTN, I learned to explain complex ideas clearly and keep a team steady under pressure.',
      cvBtn: 'View CV',
      contactBtn: 'Contact me',
      downloadCV: 'Download CV',
    },

    zen: {
      ringEarth: 'The Ring of Earth · 01',
      ringWater: 'The Ring of Water · 02',
      ringFire: 'The Ring of Fire · 03',
      ringWind: 'The Ring of Wind · 04',
      ringVoid: 'The Ring of Void · 05',
      scroll: 'SCROLL',
      memTitle: 'In memory of Plumita',
      memText: 'My hiking and mountain companion. Her pawprints still mark every one of my trails.',
      rings: 'Designed under the five rings',
    },

    exp: {
      title: 'Experience',

      experiences: [
        {
          title: 'Data Analytics',
          institution: '5411 LLC',
          date: 'JUL 2026 — SEP 2026',
          description:
            'Data analysis to support business decision-making: data collection, cleaning, and modeling, dashboard and report building, and generating actionable insights to optimize processes and outcomes.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'JTP (Practical Work Lead) – Programming I (C++)',
          institution: 'National Technological University (UTN FRGP)',
          date: 'AUG 2023 — Present',
          description:
            'Assist in delivering theoretical and practical classes, support students, grade assessments, and help solve programming-related questions.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'Private Programming Tutor',
          institution: 'Freelance',
          date: 'APR 2024 — Present',
          description:
            'Provide personalized lessons to university students focused on programming logic, flowcharts, and practical problem-solving to support their academic progress.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'Front-end Developer',
          institution: 'Colidevs Startup',
          date: 'AUG 2024 — DEC 2025',
          description:
            'Develop the company landing page using Astro and Tailwind CSS, focusing on performance, responsive design, and SEO as part of a team building digital products.',
          lineClass: 'linea3-EXP',
        },
      ],
    },
    skill: {
      title1: 'Frontend',
      title2: 'Backend',
      title3: 'Databases & Tools',
      title4: 'Learning',
    },
    education: {
  title: 'Education',
  certificateLabel: 'View certificate',
  certificateDownload: 'Download certificate',

  educationItems: [
    {
      title: 'Full Stack Developer',
      institution: 'Foundation Pescar',
      date: 'JUN 2026 - DEC 2026',
      description:
        'Training covering web development fundamentals through technologies such as Python, Django, React, MongoDB, and AI-assisted Software Engineering. Complemented by a strong focus on soft skills, including personal branding, self-awareness, and professional development.',
      lineClass: 'linea',
    },
    {
      title: 'Node.js',
      institution: '<TalentTech>',
      date: 'APR 2026 - JUL 2026',
    certificateUrl: 'https://openbadgefactory.com/obv3/credentials/367271366cbba71c2317e736f8a3de5c9e133d98',
      description:
        'Backend development training with Node.js, Express, databases, authentication, and application deployment.',
      lineClass: 'linea',
    },
    {
      title: 'React.js',
      institution: '<TalentTech>',
      date: 'JUL 2025 - DEC 2025',
    certificateUrl: 'https://openbadgefactory.com/obv3/credentials/cb6fec998dcd0dc7490b659442f54fa0f6943b1a',
      description:
        'Frontend development with React, Hooks, routing, CRUD operations, authentication, API integration, and an introduction to Bootstrap.',
      lineClass: 'linea',
    },
    {
      title: 'Front-End with JavaScript',
      institution: '<TalentTech>',
      date: 'APR 2025 - JUL 2025',
    certificateUrl: 'https://openbadgefactory.com/obv3/credentials/a2a1b6f5d20ad12e663041a1fdac0b6c1c7c1885',
      description:
        'Training in web development, HTML, CSS, JavaScript, and responsive design.',
      lineClass: 'linea',
    },
    {
      title: 'University Technician in Programming',
      institution: 'National Technological University (UTN FRGP)',
      date: 'AUG 2022 - DEC 2024',
    certificateUrl: '/certificados/tecnicatura-utn-frgp.pdf',
      description:
        'Technical education in programming, databases, web development, and software engineering.',
      lineClass: 'linea3',
    },
  ],
},
contact: {
  title: 'Contact',

  infoTitle: 'Contact Information',

  email: 'Email',
  phone: 'Phone',
  location: 'Location',
  city: 'Buenos Aires, Argentina',

  formTitle: 'Send Me a Message',

  name: 'Name',
  namePlaceholder: 'Your name',

  emailLabel: 'Email',
  emailPlaceholder: 'your@email.com',

  message: 'Message',
  messagePlaceholder: 'Write your message here',

  send: 'Send',

  alerts: {
    loading: 'Sending message...',
    success: 'Message sent successfully!',
    error: 'Failed to send the message. Please try again later.',
  },
},
footer: {
  copyright: '© 2026 Joel Nicolás Morán. All rights reserved.',
  madeWith: 'Designed and developed with 💚 and lots of ☕!',
},
projects: {
  title: 'Projects',
  website: 'Website',

  items: [
    {
      title: 'wouü Importaciones',
      subtitle: 'Client E-Commerce | Tiendanube',
      description:
        'Live online store for a sports accessories brand. I designed and built a custom, mobile-first interface within Tiendanube’s constraints: a Python build pipeline generates the code blocks, the UI syncs color, bundles, and live pricing with the native cart, and every release is checked with automated Playwright tests.',
    },
    {
      title: 'Origami Design',
      subtitle: '3D Kit Editor | Own Product',
      description:
        'Own product: a web editor where a club designs its kit and sees it in 3D in real time. I render a GLB jersey model plus procedural geometry for shorts and socks with Three.js and React Three Fiber; a single canvas produces both the 3D texture and the 300 DPI print file. State with Zustand and Immer for undo and versioning, PNG export, and shareable links.',
    },
    {
      title: 'React Football Boots',
      subtitle: 'E-Commerce + Admin Dashboard (CRUD)',
      description:
        'React SPA with an admin dashboard: login with a protected route and full product CRUD against a REST API (GET, POST, PUT, and DELETE). The store consumes that catalog with search, brand filter, price sorting, pagination, and a cart, using Context API for global state and React Router for navigation.',
    },
    {
      title: 'Personal Portfolio',
      subtitle: 'Bilingual Site with AI Assistant | Featured Project',
      description:
        'Bilingual site (ES/EN) built with Astro and React using islands architecture: only interactive parts are hydrated. It includes a custom AI assistant, a Vercel serverless function with a model chain (Groq → Gemini) and streaming responses, a PDF viewer, technical SEO (hreflang, sitemap, structured data), and a focus on accessibility and performance.',
    },
    {
      title: 'XYZ Bank',
      subtitle: 'Bank Management System | UTN Capstone Project',
      description:
        'Java EE web application (JSP and Servlets) with a layered architecture (presentation, business, DAO, and entities) on MySQL. Admin and customer roles: create and close customers and accounts, transfers, account activity, loan requests, approval and payments, plus reports. Built as a team.',
    },
    {
      title: 'UTN FRGP Hospital',
      subtitle: 'Hospital Management System | UTN Capstone Project',
      description:
        'ASP.NET Web Forms (C#) web application with a three-layer architecture and SQL Server. Role-based login: the admin manages doctors, patients, and appointments and generates reports; doctors check their appointment schedule. Built as a team.',
    },
    {
      title: 'Colidevs Landing Page',
      subtitle: 'Live Corporate Landing Page | Startup',
      description:
        'Live landing page for a startup focused on production control and traceability. Static site built with Astro and Tailwind CSS: fast loading, responsive design, SEO, and conversion-focused calls to action.',
    },
    {
      title: 'APX Electronics',
      subtitle: 'Vanilla JavaScript E-Commerce | TalentoTech Final Project',
      description:
        'Online store built with plain JavaScript, no frameworks, consuming products from the DummyJSON API. Dynamic catalog, cart persisted in localStorage, and responsive design. Final project of TalentoTech’s Front-End course.',
    },
  ],
},
chat: {
  welcome:
    "Hi! I'm Plumita 🐾, Joel's virtual assistant. Feel free to ask me about his experience, projects, technologies, or anything you'd like to know about him.",

  suggestions: [
    'What are you working on right now?',
    'What technologies do you know?',
    'What projects have you built?',
    'How can I contact you?',
  ],

  header: {
    title: 'Plumita 🐾',
    status: "● Joel's virtual assistant · AI online",
  },

  inputPlaceholder: 'Ask me something about my profile...',

  errors: {
    connection: 'Connection error. Please try again.',
    busy: 'Plumita is handling a lot of questions right now 🐾. Please try again in a minute or reach Joel through Contact.',
    noResponse: "I couldn't generate a response.",
  },

  footer: 'Powered by · joel.dev',
}
  },
};

export type Lang = keyof typeof translations;