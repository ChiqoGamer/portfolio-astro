import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const currentPdfUrlRef = useRef<string | null>(null);
  const scaleRef = useRef(1.4);
  const pageNum = 1;

  const lang = useStore(currentLang);
  const t = translations[lang].hero;
  const cvUrl = lang === 'es'
    ? '/JoelMoran_FullStackDeveloper.pdf'
    : '/JoelMoran_FullStackDeveloper_EN.pdf';
  const cvFileName = cvUrl.replace('/', '');

  const loadPdf = (url: string) => {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) {
      setTimeout(() => loadPdf(url), 300);
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfjsLib.getDocument(url).promise.then((pdf: any) => {
      pdfDocRef.current = pdf;
      currentPdfUrlRef.current = url;
      setPageCount(pdf.numPages || 1);
      renderPage(pageNum);
    });
  };

  const renderPage = (num: number) => {
    const pdfDoc = pdfDocRef.current;
    const canvas = canvasRef.current;
    if (!pdfDoc || !canvas) return;
    pdfDoc.getPage(num).then((page: any) => {
      const viewport = page.getViewport({ scale: scaleRef.current });
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.height = viewport.height;
      tempCanvas.width = viewport.width;
      page.render({ canvasContext: tempCtx, viewport }).promise.then(() => {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.getContext('2d')!.drawImage(tempCanvas, 0, 0);
      });
    });
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    scaleRef.current = window.innerWidth < 768 ? 0.6 : 1.4;
    setModalOpen(true);
    if (!pdfDocRef.current || currentPdfUrlRef.current !== cvUrl) {
      loadPdf(cvUrl);
    } else {
      renderPage(pageNum);
    }
  };

  const closeModal = () => setModalOpen(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('modal')) closeModal();
  };

  const zoomIn = () => { scaleRef.current += 0.2; renderPage(pageNum); };
  const zoomOut = () => { scaleRef.current = Math.max(0.5, scaleRef.current - 0.2); renderPage(pageNum); };

  useEffect(() => {
    if (modalOpen && pdfDocRef.current) renderPage(pageNum);
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) loadPdf(cvUrl);
  }, [cvUrl, modalOpen]);

  return (
    <>
      <style>{`
        /* ── Desktop: layout original side by side ── */
        .hero-section {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0px 5% 4rem;
          gap: 4rem;
          min-height: 70vh;
        }

        .hero-content {
          flex: 1;
          text-align: left;
        }

        .hero-photo-desktop { flex-shrink: 0; }

        .hero-photo-desktop { display: block; }
        .hero-photo-mobile  { display: none; }

        .hero-subtitle-text {
          color: white;
          font-size: 20px;
          font-weight: 300;
          margin: 0 0 8px;
        }

        .hero-title-text {
          font-size: 50px;
          font-weight: 500;
          margin: 0 0 10px;
        }

        .hero-name-text {
          font-size: 50px;
          font-weight: 500;
          margin: 0 0 10px;
          color: var(--primary-color);
        }

        .hero-desc-text {
          font-size: 16px;
          margin: 20px 0 40px;
          line-height: 1.8;
          color: azure;
        }

        .hero-buttons-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        /* ── Tablet y mobile: columna, foto arriba, texto derecha ── */
        @media (max-width: 1023px) {
          .hero-section {
            flex-direction: column;
            align-items: center;
            padding: 0px 5% 3rem;
            min-height: unset;
            gap: 1.5rem;
          }

          .hero-content {
            max-width: 100%;
            width: 100%;
            text-align: left;
          }

          .hero-photo-desktop { display: none; }
          .hero-photo-mobile  { display: flex; justify-content: center; }

          .hero-buttons-row {
            justify-content: left;
            gap: 16px;
          }

          .perfil-wrapper {
            width: 340px !important;
            height: 340px !important;
          }

          .hero-title-text,
          .hero-name-text {
            font-size: 38px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .hero-section {
            padding: 0px 5% 2rem;
            gap: 1rem;
          }

          .hero-title-text,
          .hero-name-text {
            font-size: 30px;
          }

          .hero-subtitle-text { font-size: 15px; }

          .hero-desc-text {
            font-size: 14px;
            margin: 12px 0 24px;
          }

          .perfil-wrapper {
            width: 250px !important;
            height: 250px !important;
          }

          .btn-cv {
            width: 200px !important;
            font-size: 15px !important;
            height: 45px !important;
          }
        }

        /* ── Mobile chico ── */
        @media (max-width: 400px) {
          .hero-title-text,
          .hero-name-text { font-size: 26px; }

          .perfil-wrapper {
            width: 200px !important;
            height: 200px !important;
          }
        }
      `}</style>

      <section id="inicio" className="hero-section">

        {/* Foto mobile/tablet — visible solo en < 1024px */}
        <div className="hero-photo-mobile">
          <div className="perfil-wrapper">
            <img src="/foto.png" alt="Joel Morán" />
          </div>
        </div>

        {/* Contenido */}
        <div className="hero-content">
          <h3 className="hero-subtitle relative hero-subtitle-text">
            {t.subtitle}
          </h3>
          <h1 className="hero-title relative hero-title-text">
            {t.greeting}
          </h1>
          <h1 className="hero-name relative hero-name-text">
            Joel Nicolás Morán
          </h1>
          <p className="hero-desc relative hero-desc-text">
            {t.desc}
          </p>

          {/* Botones */}
          <div className="hero-buttons relative hero-buttons-row">
            <button onClick={openModal} className="btn-cv">
              {t.cvBtn}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707" />
              </svg>
            </button>

            <a href="https://www.linkedin.com/in/joel-moran" target="_blank" rel="noopener noreferrer" className="btn-social">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>

            <a href="https://github.com/ChiqoGamer" target="_blank" rel="noopener noreferrer" className="btn-social">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a>
          </div>
        </div>

        {/* Foto desktop — visible solo en >= 1024px */}
        <div className="hero-photo-desktop">
          <div className="perfil-wrapper">
            <img src="/foto.png" alt="Joel Morán" />
          </div>
        </div>

        {/* CV Modal */}
        <div className={`modal ${modalOpen ? 'open' : ''}`} onClick={handleModalClick}>
          <div className="modal-content">
            <div className="pdf-topbar">
              <div className="pdf-file-info">
                <button className="pdf-icon-button" onClick={closeModal} aria-label="Cerrar modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </button>
                <span className="pdf-badge">PDF</span>
                <span className="pdf-file-name">{cvFileName}</span>
              </div>

              <div className="pdf-actions">
                <a href={cvUrl} download className="pdf-icon-button" aria-label={t.downloadCV}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="pdf-viewer">
              <canvas ref={canvasRef} id="pdfCanvas" className="pdf-page-canvas" />
            </div>

            <div className="pdf-floating-controls">
              <span className="pdf-page-label">Page</span>
              <span className="pdf-page-current">{pageNum}</span>
              <span className="pdf-page-separator">/</span>
              <span className="pdf-page-total">{pageCount}</span>
              <span className="pdf-control-divider" />
              <button onClick={zoomOut} aria-label="Zoom out">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                </svg>
              </button>
              <button onClick={zoomIn} aria-label="Zoom in">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
