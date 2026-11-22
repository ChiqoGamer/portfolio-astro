import type { Lang } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface Tech { name: string; }
interface Project {
  techs: Tech[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  hideGithub?: boolean;
  // Logo al lado del título: un componente SVG o la ruta del favicon del sitio (en /public/logos)
  logo?: (() => JSX.Element) | string;
  logoRound?: boolean; // recorta el favicon en círculo (si trae fondo en las esquinas)
  logoWide?: boolean; // logo apaisado: se muestra a la altura del título, sin forzarlo a cuadrado
}

// Logo de Origami Design (el mismo del encabezado de origami-design-rosy.vercel.app):
// una camiseta de origami sobre un círculo de papel.
const OrigamiLogo = () => (
  <svg viewBox="0 0 100 100" width="28" height="28" aria-hidden="true" className="zen-proj-logo">
    <defs>
      <radialGradient id="origami-paper-portfolio" cx="50%" cy="45%" r="60%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#d9dbde" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#origami-paper-portfolio)" />
    <g transform="translate(50 51) scale(0.78) translate(-50 -51)" stroke="#eceef0" strokeWidth="1.6" strokeLinejoin="round">
      <polygon points="13,40 34,21 30,49" fill="#0b0d10" fillOpacity="0.82" />
      <polygon points="87,40 66,21 70,49" fill="#0b0d10" fillOpacity="0.62" />
      <polygon points="34,21 50,35 31,81" fill="#0b0d10" fillOpacity="0.9" />
      <polygon points="50,35 50,81 31,81" fill="#0b0d10" fillOpacity="1" />
      <polygon points="66,21 50,35 69,81" fill="#0b0d10" fillOpacity="1" />
      <polygon points="50,35 50,81 69,81" fill="#0b0d10" fillOpacity="0.72" />
    </g>
  </svg>
);

const projects: Project[] = [
  {
    techs: [{ name: 'Tiendanube' }, { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'Python' }, { name: 'Playwright' }],
    githubUrl: 'https://github.com/ChiqoGamer/wou-',
    liveUrl: 'https://wouustore.com',
    image: '/wouu.webp',
    logo: '/logos/wouu.webp',
    hideGithub: true, // el repo solo guarda imágenes y videos de la tienda
  },
  {
    techs: [{ name: 'Next.js' }, { name: 'React' }, { name: 'TypeScript' }, { name: 'Three.js' }, { name: 'React Three Fiber' }, { name: 'Zustand' }, { name: 'Immer' }, { name: 'Tailwind CSS' }],
    githubUrl: 'https://github.com/ChiqoGamer/kitdesign',
    liveUrl: 'https://origami-design-rosy.vercel.app/editor',
    image: '/kitdesign.webp',
    logo: OrigamiLogo,
  },
  {
    techs: [{ name: 'React' }, { name: 'React Router' }, { name: 'Context API' }, { name: 'React Bootstrap' }, { name: 'MockAPI (REST)' }, { name: 'Vite' }],
    githubUrl: 'https://github.com/ChiqoGamer/React-Botines/tree/master',
    liveUrl: 'https://react-botines.vercel.app',
    image: '/ecommerce-botines.webp',
    logo: '/logos/react-botines.webp',
  },
  {
    techs: [{ name: 'Astro' }, { name: 'React' }, { name: 'Tailwind CSS' }, { name: 'TypeScript' }, { name: 'API Gemini' }, { name: 'Node JS' }, { name: 'Vercel Functions' }],
    githubUrl: 'https://github.com/ChiqoGamer/portfolio-astro',
    liveUrl: 'https://www.joelmoran.com.ar',
    image: '/portfolio.webp',
    logo: '/favicon.png', // el favicon de este mismo portfolio
  },
  {
    techs: [{ name: 'Java' }, { name: 'MySQL' }, { name: 'Eclipse' }, { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    githubUrl: 'https://github.com/ChiqoGamer/Banco-XYZ',
    image: '/banco.webp',
  },
  {
    techs: [{ name: 'C#' }, { name: 'Framework .NET' }, { name: 'SQL' }, { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'Visual Basic' }],
    githubUrl: 'https://github.com/ChiqoGamer/Hospital-UTN-FRGP',
    image: '/hospital.webp',
  },
  {
    techs: [{ name: 'Astro' }, { name: 'Tailwind CSS' }, { name: 'JavaScript' }],
    githubUrl: 'https://github.com/ChiqoGamer/paginaColidevs',
    liveUrl: 'https://www.coli.com.ar',
    image: '/colidevs.webp',
    logo: '/logos/colidevs.webp',
    logoRound: true,
  },
  {
    techs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'DummyJson' }, { name: 'LocalStorage' }],
    githubUrl: 'https://github.com/ChiqoGamer/Ecommerce-Botines',
    liveUrl: 'https://chiqogamer.github.io/Ecommerce-Botines',
    image: '/tecnoflash.webp',
    logo: '/logos/apx-electronics.webp',
    logoWide: true,
  },
];

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.25.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2c2.5 2.7 4 6.3 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.3-4-10s1.5-7.3 4-10Z" />
  </svg>
);

export default function Projects({ lang }: { lang: Lang }) {
  const t = translations[lang].projects;
  const z = translations[lang].zen;

  return (
    <section id="proyectos" className="zen-section band">
      <div className="zen-wrap wide">
        <div className="zen-head reveal">
          <span className="zen-kanji">水</span>
          <div>
            <div className="zen-ring-label">{z.ringWater}</div>
            <h2 className="zen-h2">{t.title}</h2>
          </div>
        </div>
        <div className="zen-headrule" />

        <div className="zen-proj-grid">
          {projects.map((project, index) => {
            const item = t.items[index];
            return (
              <div className="zen-proj-card reveal" key={index} style={{ transitionDelay: `${(index % 3) * 0.08}s` }}>
                <img className="zen-proj-img" src={project.image} alt={item.title} loading="lazy" decoding="async" width="895" height="504" />
                <div className="zen-proj-body">
                  <h3 className="zen-proj-title">
                    {typeof project.logo === 'string' ? (
                      <img
                        src={project.logo}
                        alt=""
                        width={project.logoWide ? 70 : 28}
                        height="28"
                        loading="lazy"
                        className={`zen-proj-logo${project.logoRound ? ' round' : ''}${project.logoWide ? ' wide' : ''}`}
                      />
                    ) : (
                      project.logo && <project.logo />
                    )}
                    {item.title}
                  </h3>
                  <div className="zen-proj-type">{item.subtitle}</div>
                  <p className="zen-proj-desc">{item.description}</p>
                  <div className="zen-tags">
                    {project.techs.map((tech) => (
                      <span className="zen-tag" key={tech.name}>{tech.name}</span>
                    ))}
                  </div>
                  {(!project.hideGithub || project.liveUrl) && (
                    <div className="zen-proj-actions">
                      {!project.hideGithub && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="zen-btn-ghost">
                          <GithubIcon />GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="zen-btn-accent">
                          <GlobeIcon />{t.website}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
