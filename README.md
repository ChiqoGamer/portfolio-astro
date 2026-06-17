# Joel Morán — Portfolio

Portfolio migrado de Vanilla HTML/CSS/JS → **Astro + React + Tailwind CSS**

## 🚀 Setup

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en el navegador.

### Chat IA en desarrollo

Para probar el chat localmente, levantá el servidor del chat en otra terminal:

```bash
npm run dev:chat
```

Tu `.env` debe tener esta URL:

```bash
PUBLIC_CHAT_API_URL=http://localhost:3001/api/chat
```

Si agregás `GEMINI_API_KEY=tu_api_key_de_gemini`, el chat usa Gemini real en desarrollo. Si no hay API key, responde con un mock en el idioma activo para poder probar el cambio entre español e inglés sin subir a producción.

Después de cambiar variables en `.env`, reiniciá `npm run dev:chat` para que el servidor local vuelva a leerlas. Si Gemini devuelve un error de cuota, key o red, el servidor local responde con un fallback en el idioma activo e incluye el motivo del error.

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
- `foto.png` — foto de perfil
- `icono.png` — favicon
- `JoelMoran_FullStackDeveloper.pdf` — CV en PDF
- `banco.png` — captura proyecto Banco XYZ
- `hospital.png` — captura proyecto Hospital
- `ecommerce.png` — captura proyecto React Botines
- `tecnoflash.png` — captura proyecto TecnoFlash

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
