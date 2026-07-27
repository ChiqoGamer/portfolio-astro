import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

const dv = (n: string, v?: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-${v || 'original'}.svg`;

export default function Skills() {
  const lang = useStore(currentLang);
  const t = translations[lang].skill;
  const z = translations[lang].zen;

  const groups = [
    {
      grupo: t.title1,
      items: [
        { name: 'HTML', icon: dv('html5') }, { name: 'CSS', icon: dv('css3') }, { name: 'JavaScript', icon: dv('javascript') },
        { name: 'Astro', icon: dv('astro') }, { name: 'ReactJS', icon: dv('react') }, { name: 'Bootstrap', icon: dv('bootstrap') },
      ],
    },
    {
      grupo: t.title2,
      items: [
        { name: 'Node JS', icon: dv('nodejs') }, { name: 'C#', icon: dv('csharp') }, { name: 'C++', icon: dv('cplusplus') },
        { name: 'Java', icon: dv('java') }, { name: '.NET', icon: dv('dotnetcore') },
      ],
    },
    {
      grupo: t.title3,
      items: [
        { name: 'Git', icon: dv('git') }, { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/e9e4d8' }, { name: 'SQL', icon: dv('microsoftsqlserver', 'plain') },
        { name: 'MySQL', icon: dv('mysql') }, { name: 'n8n', icon: 'https://cdn.simpleicons.org/n8n/EA4B71' }, { name: 'VS Code', icon: dv('vscode') },
      ],
    },
    {
      grupo: t.title4,
      items: [
        { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/e9e4d8' }, { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/e9e4d8' }, { name: 'TailwindCSS', icon: dv('tailwindcss') },
        { name: 'Figma', icon: dv('figma') }, { name: 'TypeScript', icon: dv('typescript') },
      ],
    },
  ];

  // Glow que sigue el cursor dentro de cada tarjeta
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.zen-skill-card'));
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const light = card.querySelector<HTMLElement>('.zen-skill-glow');
      if (!light) return;
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        light.style.transform = `translate(${e.clientX - r.left}px,${e.clientY - r.top}px)`;
      };
      const enter = () => { light.style.opacity = '1'; };
      const leave = () => { light.style.opacity = '0'; };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [lang]);

  return (
    <section id="skills" className="zen-section">
      <div className="zen-wrap">
        <div className="zen-head reveal">
          <span className="zen-kanji">火</span>
          <div>
            <div className="zen-ring-label">{z.ringFire}</div>
            <h2 className="zen-h2">Skills</h2>
          </div>
        </div>
        <div className="zen-headrule" />

        <div className="zen-skill-grid">
          {groups.map((g, i) => (
            <div className="zen-skill-card reveal" key={g.grupo} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="zen-skill-glow" aria-hidden="true" />
              <div style={{ position: 'relative' }}>
                <h3 className="zen-skill-title">{g.grupo}</h3>
                <div className="zen-skill-items">
                  {g.items.map((s) => (
                    <div className="zen-skill-item" key={s.name}>
                      <img className="zen-skill-icon" src={s.icon} alt={s.name} loading="lazy" />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
