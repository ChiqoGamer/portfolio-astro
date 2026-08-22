import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Experience() {
  const lang = useStore(currentLang);
  const t = translations[lang].exp;
  const z = translations[lang].zen;

  return (
    <section id="experiencia" className="zen-section">
      {/* Bonsái decorativo (elemento Tierra) */}
      <div className="zen-earth-bonsai" aria-hidden="true" />

      <div className="zen-wrap">
        <div className="zen-head reveal">
          <span className="zen-kanji">地</span>
          <div>
            <div className="zen-ring-label">{z.ringEarth}</div>
            <h2 className="zen-h2">{t.title}</h2>
          </div>
        </div>
        <div className="zen-headrule" />

        <div className="zen-timeline">
          {t.experiences.map((exp, i) => (
            <div className="zen-titem reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="zen-dot" />
              <div className="zen-tdate">{exp.date}</div>
              <h3 className="zen-ttitle">{exp.title}</h3>
              <div className="zen-tinst">{exp.institution}</div>
              <p className="zen-tdesc">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
