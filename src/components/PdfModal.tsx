import { useState, useEffect, useRef } from 'react';
import { loadScript, PDFJS_SRC, PDFJS_WORKER_SRC } from '../lib/loadScript';

type Props = {
  url: string;
  open: boolean;
  onClose: () => void;
  downloadLabel: string;
  fileName?: string;
  // 'page': al abrir, el zoom se ajusta para que la hoja entera entre en pantalla (certificados).
  // Sin valor: zoom fijo de lectura (CV).
  fit?: 'page';
};

// Visor de PDF en modal (PDF.js), compartido por el CV y los certificados.
export default function PdfModal({ url, open, onClose, downloadLabel, fileName, fit }: Props) {
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
      // Se dibuja a la densidad real de la pantalla (retina/celulares) para que se vea nítido
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const viewport = page.getViewport({ scale: scaleRef.current * dpr });
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.height = viewport.height;
      tempCanvas.width = viewport.width;
      page.render({ canvasContext: tempCtx, viewport }).promise.then(() => {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;
        canvas.getContext('2d')!.drawImage(tempCanvas, 0, 0);
      });
    });
  };

  // Zoom para que la hoja entera entre en el área visible del visor (ancho y alto)
  const pageFitScale = async () => {
    const pdfDoc = pdfDocRef.current;
    const viewer = viewerRef.current;
    if (!pdfDoc || !viewer) return null;
    const page = await pdfDoc.getPage(pageNum);
    const base = page.getViewport({ scale: 1 });
    const cs = getComputedStyle(viewer);
    const availW = viewer.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const availH = viewer.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (availW <= 0 || availH <= 0) return null;
    return Math.min(availW / base.width, availH / base.height);
  };

  const showFirstPage = async () => {
    if (fit === 'page') {
      const s = await pageFitScale();
      if (s) scaleRef.current = s;
    }
    renderPage(pageNum);
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
      showFirstPage();
    });
  };

  // Al abrir (o si cambia el PDF con el modal abierto): escala inicial y render
  useEffect(() => {
    if (!open) return;
    scaleRef.current = window.innerWidth < 768 ? 0.6 : 1.4;
    if (!pdfDocRef.current || currentPdfUrlRef.current !== url) loadPdf(url);
    else showFirstPage();
  }, [open, url]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal')) onClose();
  };

  // Zoom: cambia al instante el tamaño mostrado de la hoja (manteniendo fijo el punto bajo el
  // cursor, o el centro si se usan los botones) y después la vuelve a dibujar nítida.
  const zoomTo = (target: number, anchor?: { x: number; y: number }) => {
    const clamped = Math.min(5, Math.max(0.2, target));
    const canvas = pdfCanvasRef.current;
    const viewer = viewerRef.current;
    const prev = scaleRef.current;
    scaleRef.current = clamped;
    const shownW = canvas ? parseFloat(canvas.style.width) : NaN;
    if (canvas && viewer && prev && shownW) {
      const before = canvas.getBoundingClientRect();
      const vr = viewer.getBoundingClientRect();
      const ax = anchor?.x ?? vr.left + viewer.clientWidth / 2;
      const ay = anchor?.y ?? vr.top + viewer.clientHeight / 2;
      // Posición del punto de referencia dentro de la hoja (0 a 1)
      const fx = (ax - before.left) / before.width;
      const fy = (ay - before.top) / before.height;
      const baseW = shownW / prev;
      const baseH = parseFloat(canvas.style.height) / prev;
      canvas.style.width = `${baseW * clamped}px`;
      canvas.style.height = `${baseH * clamped}px`;
      const after = canvas.getBoundingClientRect();
      viewer.scrollLeft += after.left + fx * after.width - ax;
      viewer.scrollTop += after.top + fy * after.height - ay;
    }
    window.clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = window.setTimeout(() => renderPage(pageNum), 180);
  };

  // Rueda del mouse = zoom (como en Google Drive). Arrastrar con el click = moverse por la hoja.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!open || !viewer) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // deltaMode 1 = líneas (algunos mouse): se pasa a píxeles aproximados
      const dy = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      const factor = Math.exp(-Math.max(-120, Math.min(120, dy)) * 0.0022);
      zoomTo(scaleRef.current * factor, { x: e.clientX, y: e.clientY });
    };

    let drag: { x: number; y: number; left: number; top: number; id: number } | null = null;
    const onDown = (e: PointerEvent) => {
      // Solo mouse y botón izquierdo; en celular se mantiene el desplazamiento táctil normal
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      e.preventDefault();
      drag = { x: e.clientX, y: e.clientY, left: viewer.scrollLeft, top: viewer.scrollTop, id: e.pointerId };
      viewer.setPointerCapture(e.pointerId);
      viewer.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      viewer.scrollLeft = drag.left - (e.clientX - drag.x);
      viewer.scrollTop = drag.top - (e.clientY - drag.y);
    };
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      viewer.classList.remove('is-dragging');
      if (viewer.hasPointerCapture(e.pointerId)) viewer.releasePointerCapture(e.pointerId);
    };

    viewer.addEventListener('wheel', onWheel, { passive: false });
    viewer.addEventListener('pointerdown', onDown);
    viewer.addEventListener('pointermove', onMove);
    viewer.addEventListener('pointerup', onUp);
    viewer.addEventListener('pointercancel', onUp);
    return () => {
      viewer.removeEventListener('wheel', onWheel);
      viewer.removeEventListener('pointerdown', onDown);
      viewer.removeEventListener('pointermove', onMove);
      viewer.removeEventListener('pointerup', onUp);
      viewer.removeEventListener('pointercancel', onUp);
    };
  }, [open]);
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
