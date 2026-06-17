import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Footer() {
  const lang = useStore(currentLang);
  const t = translations[lang].footer;
  return (
    <footer
      className="text-center mt-20 lg:mt-40 flex flex-col items-center"
      style={{ color: 'white' }}
    >
      <div
        className="line-footer"
        style={{ borderTop: '1px solid var(--bg-secondary)', width: '88%' }}
      />
      <div
        className="footer-container flex flex-col lg:flex-row justify-between items-center"
        style={{ width: '88%' }}
      >
        <p className="mt-8 mb-0 lg:my-8 text-sm md:text-base">
          {t.copyright}
        </p>
        <p className="mt-1 mb-8 lg:my-8 text-sm md:text-base">
          {t.madeWith}
        </p>
      </div>
    </footer>
  );
}
