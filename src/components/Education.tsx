import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Education() {
  const lang = useStore(currentLang);
  const t = translations[lang].education;
  const z = translations[lang].zen;

  return (
    <section id="educacion" className="zen-section band">
      <div className="zen-wrap">
        <div className="zen-head reveal">
          <span className="zen-kanji">風</span>
          <div>
            <div className="zen-ring-label">{z.ringWind}</div>
            <h2 className="zen-h2">{t.title}</h2>
          </div>
        </div>
        <div className="zen-headrule" />

        <div className="zen-timeline">
          {t.educationItems.map((item, i) => (
            <div className="zen-titem reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="zen-dot" />
              <div className="zen-tdate">{item.date}</div>
              <h3 className="zen-ttitle">{item.title}</h3>
              <div className="zen-tinst">{item.institution}</div>
              <p className="zen-tdesc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
