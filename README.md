# Joel Morán — Portfolio

Portfolio migrado de Vanilla HTML/CSS/JS → **Astro + React + Tailwind CSS**

## 🚀 Setup

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en el navegador.

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
