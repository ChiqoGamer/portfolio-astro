// SVG icons as strings for tech badges
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
  </svg>
);

interface Tech {
  name: string;
}

interface Project {
  title: string;
  subtitle: string;
  techs: Tech[];
  description: string;
  githubUrl: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
}

const projects: Project[] = [
  {
    title: 'React Botines',
    subtitle: 'E-Commerce',
    techs: [
      { name: 'React' },
      { name: 'JavaScript' },
      { name: 'Bootstrap' },
      { name: 'MockAPI' },
      { name: 'LocalStorage' },
    ],
    description:
      'Tienda en línea funcional enfocada en productos de fútbol, con catálogo dinámico y paginación, carrito de compras persistente, formulario de contacto operativo y navegación responsiva, diseñada como prototipo de e-commerce completo.',
    githubUrl: 'https://github.com/ChiqoGamer/React-Botines/tree/master',
    liveUrl: 'https://react-botines.vercel.app',
    image: '/ecommerce-botines.png',
    imageAlt: 'Captura del proyecto React Botines',
  },
  {
    title: 'Banco XYZ',
    subtitle: 'Sistema de gestión bancaria',
    techs: [
      { name: 'Java' },
      { name: 'MySQL' },
      { name: 'Eclipse' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
    ],
    description:
      'Aplicación web desarrollada como trabajo integrador en la UTN FRGP para simular operaciones bancarias clave: manejo de clientes, cuentas corrientes y cajas de ahorro, gestión de depósitos, extracciones y transferencias, todo con una interfaz clara, organizada y validaciones en línea.',
    githubUrl: 'https://github.com/ChiqoGamer/Banco-XYZ',
    image: '/banco.png',
    imageAlt: 'Captura del proyecto Banco XYZ',
    reversed: true,
  },
  {
    title: 'Hospital UTN FRGP',
    subtitle: 'Sistema de gestión hospitalaria',
    techs: [
      { name: 'C#' },
      { name: 'Framework .NET' },
      { name: 'SQL' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Visual Basic' },
    ],
    description:
      'Aplicación web académica que permite administrar pacientes, médicos, especialidades y turnos, con vistas detalladas, formularios validados y navegación fluida entre pantallas; diseñada para simular un entorno funcional de gestión hospitalaria.',
    githubUrl: 'https://github.com/ChiqoGamer/Hospital-UTN-FRGP',
    image: '/hospital.png',
    imageAlt: 'Captura del proyecto Hospital UTN FRGP',
  },
  {
    title: 'APX Electronics',
    subtitle: 'E-Commerce - Proyecto Final | TalentoTech',
    techs: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'DummyJson' },
      { name: 'LocalStorage' },
    ],
    description:
      'Tienda en línea funcional enfocada en productos tecnológicos, con catálogo dinámico y paginación, carrito de compras persistente, formulario de contacto operativo y navegación responsiva, diseñada como prototipo de e-commerce completo en entorno educativo.',
    githubUrl: 'https://github.com/ChiqoGamer/Ecommerce-Botines',
    liveUrl: 'https://chiqogamer.github.io/Ecommerce-Botines',
    image: '/tecnoflash.png',
    imageAlt: 'Captura del proyecto APX Electronics',
    reversed: true,
  },
  {
  title: 'Landing Colidevs',
  subtitle: 'Landing Page Corporativa | Startup de Servicios TI',
  techs: [
    { name: 'Astro' },
    { name: 'Tailwind CSS' },
    { name: 'JavaScript' },
  ],
  description:
    'Landing page institucional desarrollada para Colidevs, startup de servicios TI orientada a digitalización y automatización de negocios. Diseñada con foco en conversión y claridad de propuesta de valor, presenta los servicios de la empresa con navegación fluida, diseño responsivo y llamados a la acción estratégicos. ',
  githubUrl: 'https://github.com/ChiqoGamer/paginaColidevs',
  liveUrl: 'https://www.coli.com.ar',
  image: '/colidevs.png',
  imageAlt: 'Captura de la landing page de Colidevs',
},
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
    className={`flex justify-center mb-12 gap-4 flex-wrap ${
    project.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
  } flex-col-reverse`}
      // className="flex justify-between mb-12 gap-8"
      // style={{ flexDirection: project.reversed ? 'row-reverse' : 'row',
      //   flexWrap: 'wrap',
      //  }}
    >
      {/* Info */}
      <div className="proyecto-info w-full lg:w-[45%] flex flex-col">
        <h3 style={{ fontSize: '1.5rem', margin: '0 0 5px' }}>{project.title}</h3>
        <p className="subtitulo" style={{ fontSize: '1rem', color: 'gray', margin: '0 0 10px' }}>
          {project.subtitle}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techs.map((tech) => (
            <span
              key={tech.name}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm"
              style={{ background: 'var(--bg-secondary)' }}
            >
              {tech.name}
            </span>
          ))}
        </div>

        <p className="descripcion" style={{ fontSize: '0.95rem', lineHeight: '1.8', margin: 0, marginBottom: '1rem' }}>
          {project.description}
        </p>

        {/* Buttons */}
        <div className="contenedor-btn-proyectos mt-auto mb-2 md:[mt-auto] flex gap-8">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github" style={{ width: '50%' }}>
            <GithubIcon />
            <span style={{ marginLeft: '0.5rem' }}>GitHub</span>
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-live" style={{ width: '50%' }}>
              <GlobeIcon />
              <span style={{ marginLeft: '0.5rem' }}>Sitio Web</span>
            </a>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="proyecto-img w-full lg:w-[40%]">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <img src={project.image} alt={project.imageAlt} />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="proyectos" className="flex flex-col px-[5%] mb-16" style={{ height: 'auto' }}>
      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <svg
          role="img"
          fill="currentColor"
          style={{ width: '3rem', height: '2rem' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,178.57,87.73l-72-39.42Zm0,78.83L56,76,81.56,62l72,39.41ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l24-13.13V152a12,12,0,0,0,24,0V109.92l24-13.13v76.65Z" />
        </svg>
        <h2 className="text-2xl font-bold">Proyectos</h2>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
}
