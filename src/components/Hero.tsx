import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang } from '../i18n/store';
import { translations } from '../i18n/translations';
import PdfModal from './PdfModal';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  const lang = useStore(currentLang);
  const t = translations[lang].hero;
  const z = translations[lang].zen;
  const cvUrl = lang === 'es'
    ? '/JoelMoran_FullStackDeveloper.pdf'
    : '/JoelMoran_FullStackDeveloper_EN.pdf';

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  // Parallax de montañas + fade del texto del hero
  useEffect(() => {
    const onScroll = () => {
      const far = document.getElementById('mt-far');
      const mid = document.getElementById('mt-mid');
      const near = document.getElementById('mt-near');
      const txt = document.getElementById('hero-text');
      // En tablet/celular no aplicamos parallax ni fade: el hero queda fijo
      // y el botón "Visualizar CV" siempre visible y clickeable.
      if (window.innerWidth <= 1023) {
        [far, mid, near].forEach((el) => { if (el) el.style.transform = ''; });
        if (txt) { txt.style.transform = ''; txt.style.opacity = ''; }
        return;
      }
      const y = window.scrollY;
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
      <PdfModal url={cvUrl} open={modalOpen} onClose={() => setModalOpen(false)} downloadLabel={t.downloadCV} />
    </section>
  );
}
