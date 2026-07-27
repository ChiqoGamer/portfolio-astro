import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

const KANJI: Record<string, string> = {
  inicio: '山',
  experiencia: '地',
  proyectos: '水',
  skills: '火',
  educacion: '風',
  contacto: '空',
};

export default function Header() {
  const [activeSection, setActiveSection] = useState('inicio');
  const lang = useStore(currentLang);
  const t = translations[lang].nav;

  const setLanguage = (next: 'es' | 'en') => {
    currentLang.set(next);
    try { localStorage.setItem('lang', next); } catch (e) {}
  };

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'es' | 'en' | null;
    if (saved) currentLang.set(saved);
  }, []);

  // Scroll-spy: resalta la sección activa
  useEffect(() => {
    const ids = ['inicio', 'experiencia', 'proyectos', 'skills', 'educacion', 'contacto'];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveSection(en.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  const navItems = [
    { href: '#inicio', id: 'inicio', label: t.inicio },
    { href: '#experiencia', id: 'experiencia', label: t.experiencia },
    { href: '#proyectos', id: 'proyectos', label: t.proyectos },
    { href: '#skills', id: 'skills', label: t.skills },
    { href: '#educacion', id: 'educacion', label: t.educacion },
    { href: '#contacto', id: 'contacto', label: t.contacto },
  ];

  return (
    <nav className="zen-nav" aria-label="Navegación principal">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`zen-navlink ${activeSection === item.id ? 'active' : ''}`}
        >
          {KANJI[item.id]} {item.label}
        </a>
      ))}

      <div className="zen-nav-divider" />

      <div className="zen-lang" title="Cambiar idioma / Switch language">
        <button type="button" className={`zen-lang-btn ${lang === 'es' ? 'on' : ''}`} onClick={() => setLanguage('es')}>
          {lang === 'es' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M12 3v8" /><path d="M6.3 6.3a8 8 0 1 0 11.4 0" />
            </svg>
          )}
          ES
        </button>
        <button type="button" className={`zen-lang-btn ${lang === 'en' ? 'on' : ''}`} onClick={() => setLanguage('en')}>
          {lang === 'en' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M12 3v8" /><path d="M6.3 6.3a8 8 0 1 0 11.4 0" />
            </svg>
          )}
          EN
        </button>
      </div>
    </nav>
  );
}
