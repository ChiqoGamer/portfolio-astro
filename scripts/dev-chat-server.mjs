// Servidor local del chat de Plumita (solo para desarrollo).
// En producción el chat corre como función de Vercel (api/chat.js); este servidor usa
// exactamente la misma lógica y el mismo prompt (api/_lib), así que lo que probás acá
// es lo que se publica.
//
// Uso: npm run dev:chat  →  http://localhost:3001/api/chat
// Variables (.env): GROQ_API_KEY, GEMINI_API_KEY (con una alcanza), GROQ_MODEL, GEMINI_MODEL

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

loadLocalEnv();

const { sanitizeMessages, streamReply, configuredProviders, ChatInputError } = await import(
  '../api/_lib/chat.js'
);

const PORT = Number(process.env.CHAT_DEV_PORT || 3001);

const mockReplies = {
  es: 'Modo desarrollo: no hay GROQ_API_KEY ni GEMINI_API_KEY válidas en tu .env, así que esta es una respuesta de prueba. Agregá alguna clave y reiniciá npm run dev:chat para ver respuestas reales.',
  en: 'Development mode: there is no valid GROQ_API_KEY or GEMINI_API_KEY in your .env, so this is a test reply. Add a key and restart npm run dev:chat to see real answers.',
};

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return void res.writeHead(204).end();
  if (req.method !== 'POST' || req.url !== '/api/chat') return sendJson(res, 404, { error: 'Not found' });

  let body;
  let messages;
  try {
    body = JSON.parse((await readBody(req)) || '{}');
    messages = sanitizeMessages(body.messages);
  } catch (error) {
    const msg = error instanceof ChatInputError ? error.message : 'JSON inválido.';
    return sendJson(res, 400, { error: msg });
  }

  const lang = body.lang === 'en' ? 'en' : 'es';
  const started = Date.now();

  try {
    let provider = '';
    const iterator = streamReply(messages, process.env, (p) => (provider = p));
    const first = await iterator.next(); // si ningún proveedor anda, salta al catch
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Chat-Provider': provider });
    if (!first.done) res.write(first.value);
    for await (const chunk of iterator) res.write(chunk);
    res.end();
    console.log(`[chat] ${provider} respondió en ${Date.now() - started} ms`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[chat] sin respuesta real:', msg);
    if (res.headersSent) return void res.end();
    // En local, si no hay claves (o fallan) se responde un mensaje de prueba en el idioma activo
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Chat-Mock': 'true' });
    res.end(`${mockReplies[lang]}\n\n(${msg})`);
  }
});

server.listen(PORT, () => {
  const providers = configuredProviders().map((p) => `${p.name} (${p.model})`);
  console.log(`Local chat API running at http://localhost:${PORT}/api/chat`);
  console.log(providers.length ? `Proveedores: ${providers.join(' → ')}` : 'Sin claves de IA: se usan respuestas de prueba.');
});

function readBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolveBody(data));
    req.on('error', rejectBody);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function loadLocalEnv() {
  const envPath = resolve('.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    // Se ignoran los valores de ejemplo del .env.example
    if (/^tu_api_key/i.test(value)) value = '';
    if (!process.env[key] && value) process.env[key] = value;
  }
}
