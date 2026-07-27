import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const currentPdfUrlRef = useRef<string | null>(null);
  const scaleRef = useRef(1.4);
  const pageNum = 1;

  const lang = useStore(currentLang);
  const t = translations[lang].hero;
  const z = translations[lang].zen;
  const cvUrl = lang === 'es'
    ? '/JoelMoran_FullStackDeveloper.pdf'
    : '/JoelMoran_FullStackDeveloper_EN.pdf';
  const cvFileName = cvUrl.replace('/', '');

  const loadPdf = (url: string) => {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) { setTimeout(() => loadPdf(url), 300); return; }
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
    const canvas = pdfCanvasRef.current;
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
    if (!pdfDocRef.current || currentPdfUrlRef.current !== cvUrl) loadPdf(cvUrl);
    else renderPage(pageNum);
  };
  const closeModal = () => setModalOpen(false);
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal')) closeModal();
  };
  const zoomIn = () => { scaleRef.current += 0.2; renderPage(pageNum); };
  const zoomOut = () => { scaleRef.current = Math.max(0.5, scaleRef.current - 0.2); renderPage(pageNum); };

  useEffect(() => { if (modalOpen && pdfDocRef.current) renderPage(pageNum); }, [modalOpen]);
  useEffect(() => { if (modalOpen) loadPdf(cvUrl); }, [cvUrl, modalOpen]);

  // Parallax de montañas + fade del texto del hero
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const far = document.getElementById('mt-far');
      const mid = document.getElementById('mt-mid');
      const near = document.getElementById('mt-near');
      const txt = document.getElementById('hero-text');
      if (far) far.style.transform = `translateY(${y * 0.28}px)`;
      if (mid) mid.style.transform = `translateY(${y * 0.16}px)`;
      if (near) near.style.transform = `translateY(${y * 0.06}px)`;
      if (txt) { txt.style.transform = `translateY(${y * 0.35}px)`; txt.style.opacity = String(Math.max(0, 1 - y / 550)); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Canvas de partículas (brasas)
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let parts: any[] = [];
    let raf = 0;
    const spawn = (W: number, H: number) => Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.4 + Math.random() * 1.1),
      ph: Math.random() * Math.PI * 2,
    }));
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      if (parts.length === 0) parts = spawn(W, H);
      ctx.clearRect(0, 0, W, H);
      const time = performance.now() / 1000;
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 8; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 8; if (p.x > W + 10) p.x = -8;
        const a = 0.35 + 0.4 * Math.abs(Math.sin(time * 2 + p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,120,60,${a})`;
        ctx.fill();
      }
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="inicio" className="zen-hero">
      <canvas ref={heroCanvasRef} className="zen-hero-canvas" />
      <div aria-hidden="true" className="zen-hero-kanji">山の道</div>

      <div id="hero-text" className="zen-hero-text">
        <div className="zen-eyebrow">フルスタック · {t.subtitle}</div>
        <h1 className="zen-h1">{t.greeting}<br />Joel Nicolás Morán</h1>
        <div className="zen-rule" />
        <p className="zen-bio">{t.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <button onClick={openModal} className="zen-cv">{t.cvBtn}</button>
        </div>
      </div>

      <div className="zen-photo-outer">
        <div className="zen-photo-wrap">
          <svg aria-hidden="true" viewBox="0 0 100 100" className="zen-photo-ring">
            <circle cx="50" cy="50" r="48.5" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round"
              strokeDasharray="30 9 8 16 42 6 14 22 5 11 36 18 10 7 24 13 4 20 17 8" />
          </svg>
          <img src="/foto.png" alt="Joel Morán" className="zen-photo" />
        </div>
      </div>

      <svg id="mt-far" viewBox="0 0 1440 320" preserveAspectRatio="none" className="zen-mt" style={{ height: '48vh', zIndex: 1 }}>
        <polygon points="0,320 0,190 140,120 260,180 420,80 560,170 720,60 880,160 1040,90 1200,180 1330,130 1440,190 1440,320" style={{ fill: 'var(--mt1)' }} />
      </svg>
      <svg id="mt-mid" viewBox="0 0 1440 320" preserveAspectRatio="none" className="zen-mt" style={{ height: '36vh', zIndex: 2 }}>
        <polygon points="0,320 0,230 180,150 340,220 520,120 700,210 860,140 1040,230 1220,160 1440,240 1440,320" style={{ fill: 'var(--mt2)' }} />
      </svg>
      <svg id="mt-near" viewBox="0 0 1440 320" preserveAspectRatio="none" className="zen-mt" style={{ height: '26vh', zIndex: 3 }}>
        <polygon points="0,320 0,270 160,200 320,260 540,180 760,260 940,200 1160,270 1340,230 1440,260 1440,320" style={{ fill: 'var(--mt3)' }} />
      </svg>
      <div className="zen-scroll">▼ {z.scroll}</div>

      {/* ===== CV Modal (PDF.js) ===== */}
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
            <canvas ref={pdfCanvasRef} id="pdfCanvas" className="pdf-page-canvas" />
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
  );
}
