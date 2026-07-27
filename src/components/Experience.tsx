import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Experience() {
  const lang = useStore(currentLang);
  const t = translations[lang].exp;
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggle = (index: number) =>
    setOpenIndexes((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <section
      id="experiencia"
      className="flex flex-col px-[5%] mb-16"
    >
      {/* Title */}
      <div className="flex items-center gap-4 mb-6 reveal">
        <svg
          role="img"
          fill="currentColor"
          style={{ width: '3rem', height: '2rem' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M100,100a12,12,0,0,1,12-12h32a12,12,0,0,1,0,24H112A12,12,0,0,1,100,100ZM236,68V196a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V68A20,20,0,0,1,40,48H76V40a28,28,0,0,1,28-28h48a28,28,0,0,1,28,28v8h36A20,20,0,0,1,236,68ZM100,48h56V40a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4ZM44,72v35.23A180.06,180.06,0,0,0,128,128a180,180,0,0,0,84-20.78V72ZM212,192V133.94A204.27,204.27,0,0,1,128,152a204.21,204.21,0,0,1-84-18.06V192Z" />
        </svg>
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>

      {/* Experience cards */}
      <div className="exp-timeline">
        {t.experiences.map((exp, index) => {
          const isOpen = !!openIndexes[index];
          return (
            <div
              key={index}
              className="exp-item reveal"
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
            <span className="exp-line" />
            <span className="exp-dot" />
            <button
              type="button"
              className={`exp-card ${isOpen ? 'is-open' : ''}`}
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span className="exp-date">{exp.date}</span>

              <div className="exp-main">
                <div className="exp-card-top">
                  <div className="exp-card-heading">
                    <h3 className="exp-title">{exp.title}</h3>
                    <p className="exp-inst">{exp.institution}</p>
                  </div>
                  <svg
                    className="exp-chevron"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                <div className="exp-desc">
                  <div className="exp-desc-inner">
                    <p>{exp.description}</p>
                  </div>
                </div>
              </div>
            </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}