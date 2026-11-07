import { useState, useEffect, useRef } from 'react';
import { loadScript, PDFJS_SRC, PDFJS_WORKER_SRC } from '../lib/loadScript';

type Props = {
  url: string;
  open: boolean;
  onClose: () => void;
  downloadLabel: string;
  fileName?: string;
};

// Visor de PDF en modal (PDF.js), compartido por el CV y los certificados.
export default function PdfModal({ url, open, onClose, downloadLabel, fileName }: Props) {
  const [pageCount, setPageCount] = useState(1);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<any>(null);
  const currentPdfUrlRef = useRef<string | null>(null);
  const scaleRef = useRef(1.4);
  const zoomTimerRef = useRef<number | undefined>(undefined);
  const pageNum = 1;
  const name = fileName ?? url.split('/').pop() ?? url;

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

  const loadPdf = async (pdfUrl: string) => {
    // PDF.js se descarga recién la primera vez que se abre un PDF
    await loadScript(PDFJS_SRC);
    const pdfjsLib = (window as any).pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
    pdfjsLib.getDocument(pdfUrl).promise.then((pdf: any) => {
      pdfDocRef.current = pdf;
      currentPdfUrlRef.current = pdfUrl;
      setPageCount(pdf.numPages || 1);
      renderPage(pageNum);
    });
  };

  // Al abrir (o si cambia el PDF con el modal abierto): escala inicial y render
  useEffect(() => {
    if (!open) return;
    scaleRef.current = window.innerWidth < 768 ? 0.6 : 1.4;
    if (!pdfDocRef.current || currentPdfUrlRef.current !== url) loadPdf(url);
    else renderPage(pageNum);
  }, [open, url]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal')) onClose();
  };

  // Zoom suave: transición CSS inmediata + re-render nítido al terminar
  const zoomTo = (target: number) => {
    const clamped = Math.min(4, Math.max(0.3, target));
    const canvas = pdfCanvasRef.current;
    const prev = scaleRef.current;
    scaleRef.current = clamped;
    if (canvas && prev) {
      canvas.style.transition = 'transform 0.25s ease';
      canvas.style.transform = `scale(${clamped / prev})`;
    }
    window.clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = window.setTimeout(() => {
      if (canvas) { canvas.style.transition = 'none'; canvas.style.transform = 'none'; }
      renderPage(pageNum);
    }, 260);
  };
  const zoomIn = () => zoomTo(scaleRef.current + 0.2);
  const zoomOut = () => zoomTo(scaleRef.current - 0.2);
  const fitToScreen = () => {
    const pdfDoc = pdfDocRef.current;
    const viewer = viewerRef.current;
    if (!pdfDoc || !viewer) return;
    pdfDoc.getPage(pageNum).then((page: any) => {
      const base = page.getViewport({ scale: 1 });
      const cs = getComputedStyle(viewer);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const availW = viewer.clientWidth - padX;
      zoomTo(availW / base.width);
    });
  };

  return (
    <div className={`modal ${open ? 'open' : ''}`} onClick={handleModalClick}>
      <div className="modal-content">
        <div className="pdf-topbar">
          <div className="pdf-file-info">
            <button className="pdf-icon-button" onClick={onClose} aria-label="Cerrar modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
            <span className="pdf-badge">PDF</span>
            <span className="pdf-file-name">{name}</span>
          </div>
          <div className="pdf-actions">
            <a href={url} download className="pdf-icon-button" aria-label={downloadLabel}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="pdf-viewer" ref={viewerRef}>
          <canvas ref={pdfCanvasRef} className="pdf-page-canvas" />
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
          <button onClick={fitToScreen} aria-label="Ajustar a pantalla" title="Ajustar a pantalla">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4" />
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
  );
}
