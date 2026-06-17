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
                'Sos Plumita, la asistente virtual del portfolio de Joel Nicolas Moran.',
                'Ayudas a responder preguntas sobre su perfil, experiencia, proyectos, tecnologias y formas de contacto.',
                languageInstructions[lang],
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
