import { useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';



type AlertState = {
  message: string;
  visible: boolean;
  type: 'success' | 'error' | 'loading';
};

export default function Contact() {
const lang = useStore(currentLang);
const t = translations[lang].contact;

  const formRef = useRef<HTMLFormElement>(null);
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    visible: false,
    type: 'success',
  });

  const mostrarAlerta = (mensaje: string, type: AlertState['type'] = 'success') => {
    setAlert({ message: mensaje, visible: true, type });

    if (type !== 'loading') {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailjs = (window as any).emailjs;
    if (!emailjs || !formRef.current) return;

    const serviceID = 'default_service';
    const templateID = 'template_ryjs36n';

    mostrarAlerta(t.alerts.loading, 'loading');

    emailjs.sendForm(serviceID, templateID, formRef.current).then(
      () => {
        mostrarAlerta(t.alerts.success, 'success');
        formRef.current?.reset();
      },
      (err: unknown) => {
        mostrarAlerta(t.alerts.error, 'error');
        console.error(err);
      }
    );
  };

  const alertClass = [
    'alerta-oculta',
    alert.visible ? 'alerta-mostrar' : '',
    alert.type === 'error' ? 'alerta-error' : '',
    alert.type === 'loading' ? 'alerta-cargando' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id="contacto" className="flex flex-col px-[5%] mb-16" style={{ height: 'auto' }}>
      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <svg
          role="img"
          fill="currentColor"
          style={{ width: '3rem', height: '2rem' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z" />
        </svg>
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>

      {/* Cards container */}
      <div
        className="flex justify-between flex-wrap gap-y-8 w-full"
        style={{ height: 'auto' }}
      >
        {/* Contact info */}
        <div
          className="info-contacto flex flex-col justify-between"
          style={{
            borderRadius: '1rem',
            border: '1px solid var(--primary-color)',
            padding: '2rem',
            boxSizing: 'border-box',
            flex: '1',
            minWidth: '400px',
            maxWidth: '48%',
            height: 'auto',
          }}
        >
          <h3 className="mt-0 mb-4">{t.infoTitle}</h3>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="info-svg flex items-center justify-center"
              style={{ background: 'var(--bg-secondary)', height: '4rem', width: '4rem', borderRadius: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '8px' }}>{t.email}</h4>
              <p style={{ margin: '8px', fontWeight: 'lighter', fontSize: '14px' }}>
                joel.programador@hotmail.com
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="info-svg flex items-center justify-center"
              style={{ background: 'var(--bg-secondary)', height: '4rem', width: '4rem', borderRadius: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '8px' }}>{t.phone}</h4>
              <p style={{ margin: '8px', fontWeight: 'lighter', fontSize: '14px' }}>+54 11 2544-2653</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <div className="info-svg flex items-center justify-center"
              style={{ background: 'var(--bg-secondary)', height: '4rem', width: '4rem', borderRadius: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '8px' }}>{t.location}</h4>
              <p style={{ margin: '8px', fontWeight: 'lighter', fontSize: '14px' }}>{t.city}</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div
          className="mensaje-contacto"
          style={{
            borderRadius: '1rem',
            border: '1px solid var(--primary-color)',
            padding: '2rem',
            boxSizing: 'border-box',
            flex: '1',
            minWidth: '400px',
            maxWidth: '48%',
            height: 'auto',
          }}
        >
          <h3 className="mt-0 mb-4">{t.formTitle}</h3>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col h-full justify-start"
            style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
          >
            <label htmlFor="nombre" style={{ fontWeight: 'lighter' }}>{t.name}</label>
            <input type="text" id="nombre" name="nombre" placeholder={t.namePlaceholder} required />

            <label htmlFor="correo" style={{ fontWeight: 'lighter' }}>{t.emailLabel}</label>
            <input type="email" id="correo" name="correo" placeholder={t.emailPlaceholder} required />

            <label htmlFor="mensaje" style={{ fontWeight: 'lighter' }}>{t.message}</label>
            <textarea id="mensaje" name="mensaje" placeholder={t.messagePlaceholder} required />

            <button
              type="submit"
              className="mt-4"
              style={{
                borderRadius: '1rem',
                height: '3rem',
                border: '0',
                background: 'var(--bg-secondary)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '1rem',
                fontFamily: 'Raleway, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#5a576b')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
            >
              {t.send}
            </button>
          </form>
        </div>
      </div>

      {/* Toast alert */}
      <div id="alerta" className={alertClass}>
        {alert.message}
      </div>
    </section>
  );
}
