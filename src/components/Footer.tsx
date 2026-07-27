import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Footer() {
  const lang = useStore(currentLang);
  const t = translations[lang].footer;
  const z = translations[lang].zen;

  return (
    <footer className="zen-footer">
      <div aria-hidden="true" className="zen-waves">
        <div className="zen-wave" style={{ height: 200, animation: 'waveSlide 26s linear infinite' }}>
          <svg viewBox="0 0 2880 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0 70 C 240 20 480 110 720 70 C 960 30 1200 100 1440 70 C 1680 20 1920 110 2160 70 C 2400 30 2640 100 2880 70 L2880 120 L0 120 Z" style={{ fill: 'var(--mt1)' }} opacity=".55" />
          </svg>
        </div>
        <div className="zen-wave" style={{ height: 170, animation: 'waveSlide 17s linear infinite reverse' }}>
          <svg viewBox="0 0 2880 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0 80 C 200 40 400 110 720 80 C 1000 50 1180 105 1440 80 C 1640 40 1840 110 2160 80 C 2440 50 2620 105 2880 80 L2880 120 L0 120 Z" style={{ fill: 'var(--accent)' }} opacity=".22" />
          </svg>
        </div>
        <div className="zen-wave" style={{ height: 135, animation: 'waveSlide 11s linear infinite' }}>
          <svg viewBox="0 0 2880 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M0 90 C 300 60 500 115 720 92 C 940 70 1140 112 1440 90 C 1740 60 1940 115 2160 92 C 2380 70 2580 112 2880 90 L2880 120 L0 120 Z" style={{ fill: 'var(--bg2)' }} />
          </svg>
        </div>
      </div>

      <div className="zen-foot-inner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="zen-foot-name">Joel Nicolás Morán</div>
          <div className="zen-foot-role">Full Stack Developer</div>
        </div>
        <div className="zen-mem reveal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="zen-mem-title">{z.memTitle}</div>
            <p className="zen-mem-text">{z.memText}</p>
          </div>
          <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" style={{ flexShrink: 0, marginBottom: 2 }}>
            <circle cx="10" cy="12" r="4" style={{ fill: 'var(--accent)' }} />
            <circle cx="20" cy="8" r="4" style={{ fill: 'var(--accent)' }} />
            <circle cx="30" cy="12" r="4" style={{ fill: 'var(--accent)' }} />
            <ellipse cx="20" cy="26" rx="9" ry="7" style={{ fill: 'var(--accent)' }} />
          </svg>
        </div>
      </div>

      <div className="zen-foot-bottom">
        {t.copyright}<br />{z.rings} — 地 水 火 風 空
      </div>
    </footer>
  );
}
