// Carga un script externo una sola vez, recién cuando se necesita.
const cache = new Map<string, Promise<void>>();

export function loadScript(src: string): Promise<void> {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => {
          cache.delete(src);
          reject(new Error(`No se pudo cargar ${src}`));
        };
        document.head.appendChild(s);
      })
    );
  }
  return cache.get(src)!;
}

export const PDFJS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
export const PDFJS_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
export const EMAILJS_SRC = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js';
export const EMAILJS_PUBLIC_KEY = 'n5R3fiRRMyiPp10nv';
