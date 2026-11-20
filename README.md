# Joel Morán — Portfolio

Portfolio migrado de Vanilla HTML/CSS/JS → **Astro + React + Tailwind CSS**

## 🚀 Setup

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en el navegador.

### Chat IA (Plumita)

El chat corre como **función de Vercel** en este mismo repo: `api/chat.js`. El prompt con todo el contexto está en `api/_lib/prompt.js` (actualizalo cuando cambie tu experiencia, educación o proyectos) y la lógica de los modelos en `api/_lib/chat.js`.

- **Groq** es el modelo principal (gratis y muy rápido) y **Gemini** el respaldo: si uno falla o se queda sin cuota, responde el otro.
- La respuesta llega en streaming, así que se ve mientras se escribe.
- En producción el chat llama a `/api/chat` del mismo dominio, sin servidor aparte (ya no se usa Render).

**Variables en Vercel** (Settings → Environment Variables): `GROQ_API_KEY` y `GEMINI_API_KEY`. Opcionales: `GROQ_MODEL`, `GEMINI_MODEL`.

**En desarrollo**, levantá el servidor local del chat en otra terminal (usa la misma lógica y el mismo prompt):

```bash
npm run dev:chat
```

Copiá `.env.example` a `.env` y poné al menos una clave. Sin claves, el servidor local responde un mensaje de prueba en el idioma activo. Después de cambiar el `.env`, reiniciá `npm run dev:chat`.

## 📁 Estructura

```
src/
├── components/
│   ├── Header.tsx       ← Navbar glass + hamburguesa (React state)
│   ├── Hero.tsx         ← Sección inicio + modal PDF del CV
│   ├── Experience.tsx   ← Timeline de experiencia laboral
│   ├── Projects.tsx     ← Tarjetas de proyectos
│   ├── Education.tsx    ← Timeline de educación
│   ├── Skills.tsx       ← Cajas de tecnologías con efecto spotlight
│   ├── Contact.tsx      ← Formulario EmailJS + toast alert
│   └── Footer.tsx
├── layouts/
│   └── Layout.astro     ← HTML base, meta tags, scripts globales
├── pages/
│   └── index.astro      ← Ensambla todos los componentes
└── styles/
    └── global.css       ← Variables CSS, animaciones, estilos base
```

## 📦 Assets estáticos

Copiá estos archivos a la carpeta `/public/`:
- `foto.webp` — foto de perfil
- `icono.png` — favicon
- `JoelMoran_FullStackDeveloper.pdf` — CV en PDF
- `banco.webp` — captura proyecto Banco XYZ
- `hospital.webp` — captura proyecto Hospital
- `ecommerce.png` — captura proyecto React Botines
- `tecnoflash.webp` — captura proyecto TecnoFlash

## ⚙️ Directivas de Astro

| Componente | Directiva | Por qué |
|---|---|---|
| `Header` | `client:load` | Necesita IntersectionObserver y estado del menú |
| `Hero` | `client:load` | Maneja el modal y PDF.js |
| `Skills` | `client:load` | Efecto spotlight con mousemove |
| `Contact` | `client:load` | EmailJS y estado del toast |
| `Experience`, `Projects`, `Education`, `Footer` | — (SSR) | Solo HTML estático |

## 🛠️ Tecnologías

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS](https://www.emailjs.com/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
