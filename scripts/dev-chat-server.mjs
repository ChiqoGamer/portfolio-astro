import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.CHAT_DEV_PORT || 3001);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

loadLocalEnv();

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';

const languageInstructions = {
  es: 'Responde siempre en español. Usa un tono claro, cercano y profesional.',
  en: 'Always respond in English. Use a clear, friendly, and professional tone.',
};

// Contexto del perfil de Joel que Plumita usa para responder.
// Mantener actualizado cuando cambie experiencia, educación o proyectos.
const profileContext = `
PERFIL
Joel Nicolás Morán — Full Stack Developer con base en la Tecnicatura Universitaria en Programación (UTN FRGP).
Antes de programar busca escuchar: entiende cómo trabaja un equipo o un cliente para diseñar después la solución que realmente se adapte a sus necesidades. Su rol como docente auxiliar en la facultad desarrolló en él una capacidad poco común entre developers: explicar lo complejo con claridad y sostener el trabajo en equipo bajo presión. Hoy busca crecer no solo en lo técnico, sino en su capacidad de coordinar equipos y aportar una mirada humana al desarrollo de software.

EXPERIENCIA (de más reciente a más antigua)
- Data Analytics — 5411 LLC (jul 2026 - Actualidad). ES SU EXPERIENCIA ACTUAL Y MÁS IMPORTANTE. Análisis de datos para la toma de decisiones del negocio: recolección, limpieza y modelado de datos, creación de dashboards y reportes, y generación de insights accionables para optimizar procesos y resultados.
- Docente Auxiliar – Programación I (C++) — Universidad Tecnológica Nacional FRGP (ago 2023 - Actualidad). Dicta clases teóricas y prácticas, asiste a estudiantes, corrige evaluaciones y resuelve dudas.
- Profesor Particular de Programación — Autónomo (abr 2024 - Actualidad). Clases personalizadas a estudiantes universitarios sobre lógica de programación, diagramas de flujo y ejercicios prácticos.
- Developer — Colidevs Startup (ago 2024 - dic 2025). Desarrolló la landing page de la empresa con Astro y Tailwind CSS, enfocada en performance, diseño responsive y SEO.

EDUCACIÓN (de más reciente a más antigua)
- Full Stack Developer — Fundación Pescar (jun 2026 - dic 2026). ES LO QUE ESTÁ CURSANDO ACTUALMENTE. Formación desde los fundamentos web hasta Python, Django, React, MongoDB e Ingeniería de Software con IA, complementada con habilidades blandas: marca personal, autoconocimiento y desarrollo profesional.
- Node JS — TalentoTech (mar 2026 - jul 2026). Backend con Node.js, Express, bases de datos, autenticación y despliegue.
- React JS — TalentoTech (ago 2025 - nov 2025). React, hooks, rutas, CRUD, autenticación, consumo de APIs y Bootstrap.
- Front-End con JavaScript — TalentoTech (mar 2025 - jul 2025). HTML, CSS, JavaScript y diseño responsive.
- Técnico Universitario en Programación — UTN FRGP (ago 2022 - dic 2024). Programación, bases de datos, desarrollo web e ingeniería de software.

PROYECTOS DESTACADOS
- Portfolio Personal (destacado): Astro, React, Tailwind y TypeScript. Incluye un chat con IA (API de Gemini) con backend propio en Node.js y Express, formulario con EmailJS y CV en PDF.
- React Botines: e-commerce de fútbol con React, JavaScript, Bootstrap y MockAPI (catálogo, paginación, carrito persistente).
- Landing Colidevs: landing corporativa para una startup de servicios TI, con Astro, Tailwind y JavaScript.
- Banco XYZ: sistema de gestión bancaria (Java, MySQL) — trabajo integrador UTN FRGP.
- Hospital UTN FRGP: sistema de gestión hospitalaria (C#, .NET, SQL).
- APX Electronics: e-commerce de tecnología (HTML, CSS, JavaScript) — proyecto final de TalentoTech.

STACK Y TECNOLOGÍAS
Frontend: React, Astro, Tailwind CSS, TypeScript, JavaScript, HTML, CSS, Bootstrap.
Backend: Node.js, Express. Bases de datos: MySQL, SQL, MongoDB. Otros: Java, C#, .NET, Git.
Aprendiendo actualmente: Python, Django, MongoDB, UX/UI e Ingeniería de Software con IA.

CONTACTO
Email: joel.programador@hotmail.com · Teléfono: +54 11 2544-2653 · Ubicación: Buenos Aires, Argentina.
LinkedIn: linkedin.com/in/joel-moran · GitHub: github.com/ChiqoGamer.
`.trim();

const fallbackReplies = {
  es:
    'Modo desarrollo activo. Para probar respuestas reales de Gemini, agregá GEMINI_API_KEY en tu .env y reiniciá npm run dev:chat. El selector de idioma está funcionando: esta respuesta salió en español.',
  en:
    'Development mode is active. To test real Gemini responses, add GEMINI_API_KEY to your .env and restart npm run dev:chat. The language switch is working: this reply was generated in English.',
};

function buildDevelopmentFallback(lang, reason) {
  if (lang === 'en') {
    return [
      'Development fallback response in English.',
      'Gemini could not answer from the local server right now.',
      `Reason: ${reason}`,
      'The portfolio language switch is working; once the Gemini quota/key/model is fixed, real AI replies will use this same language.',
    ].join('\n');
  }

  return [
    'Respuesta fallback de desarrollo en español.',
    'Gemini no pudo responder desde el servidor local en este momento.',
    `Motivo: ${reason}`,
    'El cambio de idioma del portfolio está funcionando; cuando corrijas la cuota/key/modelo de Gemini, las respuestas reales usarán este mismo idioma.',
  ].join('\n');
}

const server = createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  try {
    const body = await readJson(req);
    const lang = body.lang === 'en' ? 'en' : 'es';
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!API_KEY) {
      sendJson(res, 200, { reply: fallbackReplies[lang], mock: true });
      return;
    }

    try {
      const reply = await generateGeminiReply({ lang, messages });
      sendJson(res, 200, { reply });
    } catch (error) {
      if (process.env.CHAT_DEV_STRICT_ERRORS === 'true') throw error;

      const message = error instanceof Error ? error.message : 'Unexpected Gemini error';
      sendJson(res, 200, {
        reply: buildDevelopmentFallback(lang, message),
        mock: true,
        upstreamError: message,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    sendJson(res, 500, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`Local chat API running at http://localhost:${PORT}/api/chat`);
  console.log(API_KEY ? `Gemini model: ${MODEL}` : 'No GEMINI_API_KEY found. Using language-aware mock replies.');
});

async function generateGeminiReply({ lang, messages }) {
  const contents = messages
    .filter((message) => message?.role && message?.content)
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(message.content) }],
    }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: [
                'Sos Plumita, la asistente virtual del portfolio de Joel Nicolás Morán.',
                'Respondés preguntas sobre su perfil, experiencia, educación, proyectos, tecnologías y formas de contacto,',
                'basándote únicamente en la información del contexto que aparece abajo.',
                'Si te preguntan por lo que está haciendo ahora, destacá que trabaja como Data Analytics en 5411 LLC y que cursa el Full Stack Developer en Fundación Pescar.',
                'Si algo no está en el contexto, decí con naturalidad que no tenés ese dato e invitá a contactarlo.',
                'Sé conciso y evitá inventar información.',
                languageInstructions[lang],
                '\n\n=== CONTEXTO DEL PERFIL ===\n',
                profileContext,
              ].join(' '),
            },
          ],
        },
        contents,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini API error: ${response.status}`);
  }

  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('') || fallbackReplies[lang];
}

function readJson(req) {
  return new Promise((resolveJson, rejectJson) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolveJson(body ? JSON.parse(body) : {});
      } catch (error) {
        rejectJson(error);
      }
    });

    req.on('error', rejectJson);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function loadLocalEnv() {
  const envPath = resolve('.env');
  if (!existsSync(envPath)) return;

  const env = readFileSync(envPath, 'utf8');

  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

    if (!process.env[key]) process.env[key] = value;
  }
}
