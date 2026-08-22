import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

interface Tech { name: string; }
interface Project {
  techs: Tech[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  hideGithub?: boolean;
}

const projects: Project[] = [
  {
    techs: [{ name: 'Next.js' }, { name: 'React' }, { name: 'TypeScript' }, { name: 'Three.js' }, { name: 'React Three Fiber' }, { name: 'Zustand' }, { name: 'Tailwind CSS' }],
    githubUrl: 'https://github.com/ChiqoGamer/kitdesign',
    image: '/kitdesign.png',
    hideGithub: true,
  },
  {
    techs: [{ name: 'React' }, { name: 'JavaScript' }, { name: 'Bootstrap' }, { name: 'MockAPI' }, { name: 'LocalStorage' }],
    githubUrl: 'https://github.com/ChiqoGamer/React-Botines/tree/master',
    liveUrl: 'https://react-botines.vercel.app',
    image: '/ecommerce-botines.png',
  },
  {
    techs: [{ name: 'Astro' }, { name: 'React' }, { name: 'Tailwind CSS' }, { name: 'TypeScript' }, { name: 'API Gemini' }, { name: 'Node JS' }, { name: 'Express' }],
    githubUrl: 'https://github.com/ChiqoGamer/portfolio-astro',
    liveUrl: 'https://www.joelmoran.com.ar',
    image: '/portfolio.jpeg',
  },
  {
    techs: [{ name: 'Java' }, { name: 'MySQL' }, { name: 'Eclipse' }, { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
    githubUrl: 'https://github.com/ChiqoGamer/Banco-XYZ',
    image: '/banco.png',
  },
  {
    techs: [{ name: 'C#' }, { name: 'Framework .NET' }, { name: 'SQL' }, { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'Visual Basic' }],
    githubUrl: 'https://github.com/ChiqoGamer/Hospital-UTN-FRGP',
    image: '/hospital.png',
  },
  {
    techs: [{ name: 'Astro' }, { name: 'Tailwind CSS' }, { name: 'JavaScript' }],
    githubUrl: 'https://github.com/ChiqoGamer/paginaColidevs',
    liveUrl: 'https://www.coli.com.ar',
    image: '/colidevs.png',
  },
  {
    techs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'DummyJson' }, { name: 'LocalStorage' }],
    githubUrl: 'https://github.com/ChiqoGamer/Ecommerce-Botines',
    liveUrl: 'https://chiqogamer.github.io/Ecommerce-Botines',
    image: '/tecnoflash.png',
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

export default function Projects() {
  const lang = useStore(currentLang);
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
                <div className="zen-proj-img" role="img" aria-label={item.title} style={{ backgroundImage: `url('${project.image}')` }} />
                <div className="zen-proj-body">
                  <h3 className="zen-proj-title">{item.title}</h3>
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
