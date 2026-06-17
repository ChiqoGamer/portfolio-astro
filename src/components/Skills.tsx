import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

interface Tech {
  src: string;
  alt: string;
  label: string;
  isSvg?: boolean;
  svgContent?: React.ReactNode;
}

interface SkillBox {
  title: string;
  techs: Tech[];
}

const GitHubSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 30 30">
                                <path fill="white" d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                            </svg>
);



export default function Skills() {
  const lang = useStore(currentLang);
  const t = translations[lang].skill;

  const skillBoxes: SkillBox[] = [
  {
    title: t.title1,
    techs: [
      { src: 'https://img.icons8.com/?size=100&id=20909&format=png&color=000000', alt: 'HTML', label: 'HTML' },
      { src: 'https://img.icons8.com/?size=100&id=21278&format=png&color=000000', alt: 'CSS', label: 'CSS' },
      { src: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000', alt: 'JS', label: 'JavaScript' },
      { src: 'https://astro.build/assets/press/astro-icon-light-gradient.svg', alt: 'Astro', label: 'Astro' },
      { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png', alt: 'React', label: 'ReactJS' },
      { src: 'https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png', alt: 'Bootstrap', label: 'Bootstrap' },
    ],
  },
  {
    title: t.title2,
    techs: [
      { src: 'https://img.icons8.com/fluency/48/node-js.png', alt: 'NodeJS', label: 'Node JS' },
      { src: 'https://cdn.worldvectorlogo.com/logos/c--4.svg', alt: 'C#', label: 'C#' },
      { src: 'https://img.icons8.com/?size=48&id=40669&format=png', alt: 'C++', label: 'C++' },
      { src: 'https://img.icons8.com/?size=100&id=13679&format=png&color=000000', alt: 'Java', label: 'Java' },
      { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/3840px-.NET_Core_Logo.svg.png', alt: '.NET', label: '.NET' },
    ],
  },
  {
    title: t.title3,
    techs: [
      { src: 'https://img.icons8.com/?size=100&id=20906&format=png&color=000000', alt: 'Git', label: 'Git' },
      { src: 'https://img.icons8.com/?size=48&id=laYYF3dV0Iew&format=png', alt: 'SQL', label: 'SQL' },
      { src: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/n8n-color.png', alt: 'n8n', label: 'n8n' },
      { src: '', alt: 'GitHub', label: 'GitHub', isSvg: true },
      { src: 'https://img.icons8.com/fluency/48/mysql-logo.png', alt: 'MySQL', label: 'MySQL' },
      { src: 'https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000', alt: 'VSCode', label: 'VS Code' },
    ],
  },
  {
    title: t.title4,
    techs: [
      { src: 'https://expressjs.com/images/logos/logo-dark.svg', alt: 'Express.js', label: 'Express.js' },
      { src: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/nextjs.png', alt: 'Next.js', label: 'Next.js' },
      { src: 'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000', alt: 'TailwindCSS', label: 'TailwindCSS' },
      { src: 'https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000', alt: 'Figma', label: 'Figma' },
      { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/3840px-Typescript_logo_2020.svg.png', alt: 'TS', label: 'TypeScript' },
    ],
  },
];  
  // Spotlight hover effect
  useEffect(() => {
    const cajas = document.querySelectorAll<HTMLDivElement>('.caja-tecno');

    const handleMouseMove = (e: MouseEvent, caja: HTMLDivElement) => {
      const rect = caja.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      caja.style.setProperty('--x', `${x}px`);
      caja.style.setProperty('--y', `${y}px`);
    };

    const handleMouseLeave = (caja: HTMLDivElement) => {
      caja.style.setProperty('--x', '100%');
      caja.style.setProperty('--y', '0%');
    };

    cajas.forEach((caja) => {
      const move = (e: MouseEvent) => handleMouseMove(e, caja);
      const leave = () => handleMouseLeave(caja);
      caja.addEventListener('mousemove', move);
      caja.addEventListener('mouseleave', leave);
    });

    return () => {
      cajas.forEach((caja) => {
        caja.replaceWith(caja.cloneNode(true));
      });
    };
  }, []);

  return (
    <section id="skills" className="flex flex-col px-[5%] mb-16" style={{ height: 'auto' }}>
      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          style={{ width: '3rem', height: '2rem' }}
          viewBox="0 0 16 16"
        >
          <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z" />
          <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z" />
        </svg>
        <h2 className="text-2xl font-bold">Skills</h2>
      </div>

      {/* Grid */}
      <div
        className="contenedor-tecno"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        {skillBoxes.map((box) => (
          <div className="caja-tecno" key={box.title}>
            <h3>{box.title}</h3>
            <div className="cont-tecnologias">
              {box.techs.map((tech) => (
                <div className="tecno-sola" key={tech.label}>
                  {tech.isSvg ? (
                    <GitHubSvg />
                  ) : (
                    <img src={tech.src} alt={tech.alt} width="48" height="48" />
                  )}
                  <p>{tech.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
