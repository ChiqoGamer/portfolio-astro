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
      desc: 'Full Stack Developer con base en la Tecnicatura Universitaria en Programación (UTN FRGP), que antes de programar busca escuchar: entender cómo trabaja un equipo o un cliente para diseñar después la solución que realmente se adapte a sus necesidades. Mi rol como docente auxiliar en la facultad desarrolló en mí una capacidad poco común en developers: explicar lo complejo con claridad y sostener el trabajo en equipo bajo presión. Hoy busco crecer no solo en lo técnico, sino en mi capacidad de coordinar equipos y aportar una mirada humana al desarrollo de software.',
      cvBtn: 'Visualizar CV',
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
    date: 'MAR 2026 - JUL 2026',
    description:
      'Formación en desarrollo backend con Node.js, Express, bases de datos, autenticación y despliegue.',
    lineClass: 'linea',
  },
  {
    title: 'React JS',
    institution: '<TalentoTech>',
    date: 'AGO 2025 - NOV 2025',
    description:
      'Desarrollo frontend con React, hooks, rutas, CRUD, autenticación, consumo de APIs y aproximación a Bootstrap.',
    lineClass: 'linea',
  },
  {
    title: 'Front-End con JavaScript',
    institution: '<TalentoTech>',
    date: 'MAR 2025 - JUL 2025',
    description: 'Formación en desarrollo web, HTML, CSS, JavaScript y diseño responsive.',
    lineClass: 'linea',
  },
  {
    title: 'Tecnico Universitario en Programación',
    institution: 'Universidad Tecnológica Nacional FRGP',
    date: 'AGO 2022 - DIC 2024',
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
          date: 'JUL 2026 — Actualmente',
          description:
            'Análisis de datos para la toma de decisiones del negocio: recolección, limpieza y modelado de datos, creación de dashboards y reportes, y generación de insights accionables para optimizar procesos y resultados.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'Docente Auxiliar – Programación I C++',
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
      title: 'KitDesign',
      subtitle: 'Diseñador de Equipaciones 3D',
      description:
        'Editor web para que clubes amateur diseñen su equipación de fútbol y la vean en 3D, sin depender de un diseñador. Un mismo canvas 2D (el layout UV son las piezas de corte) genera la textura del visor 3D y el archivo de impresión a 300 DPI, con deshacer/versionado y un render determinista.',
    },
    {
      title: 'React Botines',
      subtitle: 'E-Commerce',
      description:
        'Tienda en línea funcional enfocada en productos de fútbol, con catálogo dinámico y paginación, carrito de compras persistente, formulario de contacto operativo y navegación responsiva, diseñada como prototipo de e-commerce completo.',
    },
    {
      title: 'Portfolio Personal',
      subtitle: 'Landing Page Personal | Proyecto Destacado',
      description:
        'Portfolio personal desarrollado con Astro, React y Tailwind CSS, migrado desde JavaScript Vanilla para maximizar el rendimiento con mínimo JavaScript en el cliente. Integra un chat con IA potenciado por la API de Gemini mediante un backend propio en Node.js y Express, además de un formulario de contacto con EmailJS y visualización directa del CV en PDF.',
    },
    {
      title: 'Banco XYZ',
      subtitle: 'Sistema de gestión bancaria',
      description:
        'Aplicación web desarrollada como trabajo integrador en la UTN FRGP para simular operaciones bancarias: gestión de clientes, cuentas, depósitos, extracciones y transferencias, con una interfaz clara y validaciones en línea.',
    },
    {
      title: 'Hospital UTN FRGP',
      subtitle: 'Sistema de gestión hospitalaria',
      description:
        'Aplicación web académica para administrar pacientes, médicos, especialidades y turnos, con formularios validados y navegación fluida entre pantallas.',
    },
    {
      title: 'Landing Colidevs',
      subtitle: 'Landing Page Corporativa | Startup de Servicios TI',
      description:
        'Landing page institucional desarrollada para Colidevs, startup orientada a la digitalización y automatización de negocios, con foco en conversión, diseño responsive y llamados a la acción.',
    },
    {
      title: 'APX Electronics',
      subtitle: 'E-Commerce - Proyecto Final | TalentoTech',
      description:
        'Tienda online de productos tecnológicos con catálogo dinámico, carrito persistente, formulario de contacto y diseño responsive desarrollada como proyecto final.',
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
      desc: 'Full Stack Developer with a foundation in the University Technical Degree in Programming (UTN FRGP), who listens before coding: understanding how a team or a client works in order to then design the solution that truly fits their needs. My role as a teaching assistant at the university developed in me a skill uncommon among developers: explaining the complex with clarity and holding teamwork together under pressure. Today I aim to grow not only technically, but also in my ability to coordinate teams and bring a human perspective to software development.',
      cvBtn: 'View CV',
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
          date: 'JUL 2026 — Present',
          description:
            'Data analysis to support business decision-making: data collection, cleaning, and modeling, dashboard and report building, and generating actionable insights to optimize processes and outcomes.',
          lineClass: 'linea-EXP',
        },
        {
          title: 'Teaching Assistant – Programming I (C++)',
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
      date: 'MAR 2026 - JUL 2026',
      description:
        'Backend development training with Node.js, Express, databases, authentication, and application deployment.',
      lineClass: 'linea',
    },
    {
      title: 'React.js',
      institution: '<TalentTech>',
      date: 'AUG 2025 - NOV 2025',
      description:
        'Frontend development with React, Hooks, routing, CRUD operations, authentication, API integration, and an introduction to Bootstrap.',
      lineClass: 'linea',
    },
    {
      title: 'Front-End with JavaScript',
      institution: '<TalentTech>',
      date: 'MAR 2025 - JUL 2025',
      description:
        'Training in web development, HTML, CSS, JavaScript, and responsive design.',
      lineClass: 'linea',
    },
    {
      title: 'University Technician in Programming',
      institution: 'National Technological University (UTN FRGP)',
      date: 'AUG 2022 - DEC 2024',
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
      title: 'KitDesign',
      subtitle: '3D Football Kit Designer',
      description:
        'Web editor for amateur clubs to design their football kit and preview it in 3D, without needing a designer. A single 2D canvas (the UV layout is the garment cut pattern) produces both the 3D viewer texture and the 300 DPI print file, with undo/versioning and a deterministic renderer.',
    },
    {
      title: 'React Football Boots',
      subtitle: 'E-Commerce',
      description:
        'Fully functional online football store featuring a dynamic catalog with pagination, persistent shopping cart, working contact form, and responsive navigation, designed as a complete e-commerce prototype.',
    },
    {
      title: 'Personal Portfolio',
      subtitle: 'Personal Landing Page | Featured Project',
      description:
        'Personal portfolio built with Astro, React, and Tailwind CSS, migrated from Vanilla JavaScript to maximize performance with minimal client-side JavaScript. It includes an AI-powered chat using the Gemini API with a custom Node.js and Express backend, EmailJS contact form integration, and embedded PDF resume viewing.',
    },
    {
      title: 'XYZ Bank',
      subtitle: 'Bank Management System',
      description:
        'Web application developed as a final university project to simulate banking operations including customer management, accounts, deposits, withdrawals, and transfers through a clean and intuitive interface.',
    },
    {
      title: 'UTN FRGP Hospital',
      subtitle: 'Hospital Management System',
      description:
        'Academic web application for managing patients, doctors, specialties, and appointments with validated forms and intuitive navigation.',
    },
    {
      title: 'Colidevs Landing Page',
      subtitle: 'Corporate Landing Page | IT Services Startup',
      description:
        'Corporate landing page developed for Colidevs, an IT startup focused on business digitalization and automation, emphasizing conversion, responsive design, and clear value proposition.',
    },
    {
      title: 'APX Electronics',
      subtitle: 'E-Commerce - Final Project | TalentTech',
      description:
        'Functional online electronics store featuring a dynamic catalog, persistent shopping cart, working contact form, and responsive design, developed as a final educational project.',
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
    noResponse: "I couldn't generate a response.",
  },

  footer: 'Powered by · joel.dev',
}
  },
};

export type Lang = keyof typeof translations;