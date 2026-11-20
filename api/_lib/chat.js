// Lógica del chat de Plumita, compartida por la función de Vercel (api/chat.js)
// y por el servidor local de desarrollo (scripts/dev-chat-server.mjs).
//
// Proveedores (ambos con plan gratuito):
//   1. Groq   → principal, muy rápido.            Variables: GROQ_API_KEY, GROQ_MODEL (uno o varios, separados por coma)
//   2. Gemini → respaldo si Groq falla o no está. Variables: GEMINI_API_KEY, GEMINI_MODEL
// Si el principal falla antes de mandar texto, responde el siguiente.
// El plan gratis de Groq limita los tokens por minuto POR MODELO, así que se encadenan dos
// modelos de Groq (cada uno con su propia cuota) antes de pasar a Gemini.
const DEFAULT_GROQ_MODELS = 'openai/gpt-oss-120b,openai/gpt-oss-20b,qwen/qwen3.8-27b';

import { SYSTEM_PROMPT } from './prompt.js';

const MAX_MESSAGES = 12; // historial que se manda al modelo
const MAX_CHARS = 1000; // largo máximo de cada mensaje
const MAX_OUTPUT_TOKENS = 400; // las respuestas son cortas; además cuenta para el límite por minuto de Groq
const MAX_RETRY_WAIT_MS = 3000; // si Groq pide esperar menos que esto, se espera y se reintenta

export class ChatInputError extends Error {}

/** Valida y recorta los mensajes que llegan del navegador. */
export function sanitizeMessages(raw) {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new ChatInputError('El campo "messages" es requerido y debe ser un array.');
  }
  const valid = raw.every(
    (m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
  );
  if (!valid) {
    throw new ChatInputError('Cada mensaje debe tener role ("user" | "assistant") y content (string).');
  }

  let messages = raw
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  // Los modelos esperan que la conversación empiece con el usuario (se saca el saludo inicial)
  while (messages.length && messages[0].role === 'assistant') messages = messages.slice(1);
  if (!messages.length || messages.at(-1).role !== 'user') {
    throw new ChatInputError('El último mensaje debe ser del usuario.');
  }
  return messages;
}

/** Proveedores configurados, en orden de preferencia. */
export function configuredProviders(env = process.env) {
  const list = [];
  if (env.GROQ_API_KEY) {
    const models = (env.GROQ_MODEL || DEFAULT_GROQ_MODELS).split(',').map((m) => m.trim()).filter(Boolean);
    for (const model of models) list.push({ name: 'groq', model, key: env.GROQ_API_KEY, stream: streamGroq });
  }
  if (env.GEMINI_API_KEY) {
    list.push({ name: 'gemini', model: env.GEMINI_MODEL || 'gemini-2.5-flash-lite', key: env.GEMINI_API_KEY, stream: streamGemini });
  }
  return list;
}

/**
 * Genera la respuesta en partes (streaming). Prueba cada proveedor en orden;
 * si uno falla antes de emitir texto, pasa al siguiente.
 */
export async function* streamReply(messages, env = process.env, onProvider = () => {}) {
  const providers = configuredProviders(env);
  if (!providers.length) throw new Error('No hay GROQ_API_KEY ni GEMINI_API_KEY configuradas.');

  const errors = [];
  for (const provider of providers) {
    let emitted = false;
    try {
      for await (const chunk of provider.stream(messages, provider)) {
        if (!chunk) continue;
        if (!emitted) onProvider(`${provider.name}:${provider.model}`);
        emitted = true;
        yield chunk;
      }
      if (emitted) return;
      errors.push(`${provider.name}: respuesta vacía`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      // Si ya se mandó texto no se puede cambiar de proveedor a mitad de respuesta
      if (emitted) throw error;
      errors.push(`${provider.name}:${provider.model}: ${msg.slice(0, 160)}`);
      console.error(`[chat] ${provider.name}:${provider.model} falló, probando el siguiente:`, msg.slice(0, 160));
    }
  }
  throw new Error(errors.join(' | '));
}

// ─── Groq (API compatible con OpenAI) ────────────────────────────────────────
async function* streamGroq(messages, { key, model }) {
  const body = {
    model,
    stream: true,
    temperature: 0.6,
    max_completion_tokens: MAX_OUTPUT_TOKENS,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
  };
  // Los modelos gpt-oss razonan antes de responder: se pide poco razonamiento y que no lo devuelva
  if (model.startsWith('openai/gpt-oss')) {
    body.reasoning_effort = 'low';
    body.include_reasoning = false;
  }
  // Qwen también razona: se oculta el razonamiento
  if (model.startsWith('qwen/')) body.reasoning_format = 'hidden';

  const send = () =>
    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });
  let res = await send();
  // Límite por minuto: si Groq indica una espera corta, se espera y se reintenta una vez
  if (res.status === 429) {
    const waitMs = Number(res.headers.get('retry-after')) * 1000;
    if (waitMs > 0 && waitMs <= MAX_RETRY_WAIT_MS) {
      await new Promise((r) => setTimeout(r, waitMs));
      res = await send();
    }
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await safeText(res)}`);

  for await (const data of readSSE(res)) {
    if (data === '[DONE]') return;
    const json = JSON.parse(data);
    yield json.choices?.[0]?.delta?.content || '';
  }
}

// ─── Gemini ──────────────────────────────────────────────────────────────────
async function* streamGemini(messages, { key, model }) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.6, maxOutputTokens: MAX_OUTPUT_TOKENS },
      }),
    }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await safeText(res)}`);

  for await (const data of readSSE(res)) {
    const json = JSON.parse(data);
    const parts = json.candidates?.[0]?.content?.parts || [];
    yield parts.map((p) => p.text || '').join('');
  }
}

// ─── Utilidades ──────────────────────────────────────────────────────────────
/** Lee una respuesta Server-Sent Events y devuelve el contenido de cada línea "data:". */
async function* readSSE(res) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (line.startsWith('data:')) yield line.slice(5).trim();
    }
  }
  const rest = buffer.trim();
  if (rest.startsWith('data:')) yield rest.slice(5).trim();
}

async function safeText(res) {
  try {
    return (await res.text()).slice(0, 300);
  } catch {
    return '';
  }
}
