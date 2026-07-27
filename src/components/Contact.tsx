import { useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

type AlertState = { message: string; visible: boolean; type: 'success' | 'error' | 'loading'; };

export default function Contact() {
  const lang = useStore(currentLang);
  const t = translations[lang].contact;
  const z = translations[lang].zen;

  const formRef = useRef<HTMLFormElement>(null);
  const [alert, setAlert] = useState<AlertState>({ message: '', visible: false, type: 'success' });

  const mostrarAlerta = (mensaje: string, type: AlertState['type'] = 'success') => {
    setAlert({ message: mensaje, visible: true, type });
    if (type !== 'loading') setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailjs = (window as any).emailjs;
    if (!emailjs || !formRef.current) return;
    mostrarAlerta(t.alerts.loading, 'loading');
    emailjs.sendForm('default_service', 'template_ryjs36n', formRef.current).then(
      () => { mostrarAlerta(t.alerts.success, 'success'); formRef.current?.reset(); },
      (err: unknown) => { mostrarAlerta(t.alerts.error, 'error'); console.error(err); }
    );
  };

  const alertClass = [
    'alerta-oculta',
    alert.visible ? 'alerta-mostrar' : '',
    alert.type === 'error' ? 'alerta-error' : '',
    alert.type === 'loading' ? 'alerta-cargando' : '',
  ].filter(Boolean).join(' ');

  return (
    <section id="contacto" className="zen-section">
      <div className="zen-wrap">
        <div className="zen-head reveal">
          <span className="zen-kanji">空</span>
          <div>
            <div className="zen-ring-label">{z.ringVoid}</div>
            <h2 className="zen-h2">{t.title}</h2>
          </div>
        </div>
        <div className="zen-headrule" />

        <div className="zen-contact-grid">
          {/* Info + redes */}
          <div className="zen-contact-col reveal">
            <a href="mailto:joel.programador@hotmail.com" className="zen-info-card">
              <span className="zen-info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                <span className="zen-info-label">{t.email}</span>
                <span className="zen-info-value">joel.programador@hotmail.com</span>
              </span>
            </a>

            <div className="zen-info-card">
              <span className="zen-info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6.5 3h-2A2.5 2.5 0 0 0 2 5.7C2 14.1 9.9 22 18.3 22a2.5 2.5 0 0 0 2.7-2.5v-2l-4.5-2-2.2 2.2a15.5 15.5 0 0 1-6-6L10.5 9.5 8.5 5Z" />
                </svg>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="zen-info-label">{t.phone}</span>
                <span className="zen-info-value">+54 11 2544-2653</span>
              </span>
            </div>

            <div className="zen-info-card">
              <span className="zen-info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s7.5-6.2 7.5-12A7.5 7.5 0 0 0 4.5 10c0 5.8 7.5 12 7.5 12Z" /><circle cx="12" cy="9.8" r="2.6" />
                </svg>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="zen-info-label">{t.location}</span>
                <span className="zen-info-value">{t.city}</span>
              </span>
            </div>

            <div className="zen-social-row">
              <a href="https://www.linkedin.com/in/joel-moran" target="_blank" rel="noopener noreferrer" className="zen-social">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
                </svg>LinkedIn
              </a>
              <a href="https://github.com/ChiqoGamer" target="_blank" rel="noopener noreferrer" className="zen-social">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.25.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>GitHub
              </a>
            </div>
          </div>

          {/* Formulario EmailJS */}
          <form ref={formRef} onSubmit={handleSubmit} className="zen-form reveal">
            <h3 className="zen-form-title">{t.formTitle}</h3>
            <input className="zen-input" type="text" name="nombre" placeholder={t.name} aria-label={t.name} required />
            <input className="zen-input" type="email" name="correo" placeholder={t.emailLabel} aria-label={t.emailLabel} required />
            <textarea className="zen-textarea" name="mensaje" rows={6} placeholder={t.message} aria-label={t.message} required />
            <button type="submit" className="zen-submit">{t.send}</button>
          </form>
        </div>
      </div>

      <div id="alerta" className={alertClass}>{alert.message}</div>
    </section>
  );
}
