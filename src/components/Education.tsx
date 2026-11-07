import { useState } from 'react';
import type { Lang } from '../i18n/translations';
import { translations } from '../i18n/translations';
import PdfModal from './PdfModal';

export default function Education({ lang }: { lang: Lang }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
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
              {'certificateUrl' in item && item.certificateUrl && (
                <a
                  href={item.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zen-btn-ghost zen-cert-btn"
                  onClick={(e) => {
                    // Los PDF propios se ven en el mismo visor que el CV
                    if (item.certificateUrl.endsWith('.pdf')) {
                      e.preventDefault();
                      setPdfUrl(item.certificateUrl);
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="9" r="6" />
                    <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
                  </svg>
                  {t.certificateLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <PdfModal
        url={pdfUrl ?? ''}
        open={pdfUrl !== null}
        onClose={() => setPdfUrl(null)}
        downloadLabel={t.certificateDownload}
      />
    </section>
  );
}
