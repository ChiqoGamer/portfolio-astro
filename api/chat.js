// Función de Vercel: POST /api/chat
// Responde en streaming (texto plano) para que el chat muestre la respuesta mientras se escribe.
// Corre en el mismo dominio que el portfolio, así que no necesita CORS ni un servidor aparte.

import { sanitizeMessages, streamReply, ChatInputError } from './_lib/chat.js';

export async function POST(request) {
  let messages;
  try {
    const body = await request.json();
    messages = sanitizeMessages(body?.messages);
  } catch (error) {
    const msg = error instanceof ChatInputError ? error.message : 'JSON inválido.';
    return Response.json({ error: msg }, { status: 400 });
  }

  let provider = '';
  const iterator = streamReply(messages, process.env, (p) => (provider = p));

  // Se espera el primer fragmento antes de responder: si ningún proveedor anda,
  // se devuelve un error 502 en vez de un stream vacío.
  let first;
  try {
    first = await iterator.next();
  } catch (error) {
    console.error('[chat] sin respuesta de ningún proveedor:', error?.message || error);
    return Response.json({ error: 'El asistente no está disponible en este momento.' }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (!first.done) controller.enqueue(encoder.encode(first.value));
        for await (const chunk of iterator) controller.enqueue(encoder.encode(chunk));
      } catch (error) {
        console.error('[chat] error a mitad de la respuesta:', error?.message || error);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Chat-Provider': provider, // qué modelo respondió (para verificar Groq/Gemini)
    },
  });
}
