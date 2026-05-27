import { useState, useRef, useEffect } from 'react';
const API_URL = import.meta.env.PUBLIC_CHAT_API_URL;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function JoelAvatar({ size = 56, pulse = false }: { size?: number; pulse?: boolean }) {
  // Para el botón sticky usamos la imagen completa, para el header del chat un círculo recortado
  const isLarge = size >= 100;

  if (isLarge) {
    return (
      <div style={{ position: 'relative', width: size, height: size * 1.5 }}>
        {pulse && (
          <span style={{
            position: 'absolute',
            bottom: '42%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'rgba(0,254,155,0.25)',
            animation: 'pulse-ring 2s ease-out infinite',
            zIndex: 0,
          }} />
        )}
        <img
          src="/avatar.png"
          alt="Joel avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  // Versión pequeña — recorta solo la cara de Plumita
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      background: '#1d1c22',
      border: '1.5px solid rgba(0,254,155,0.4)',
      flexShrink: 0,
    }}>
      <img
        src="/plumita.png"
        alt="Plumita"
        style={{
          width: '110%',
          height: '120%',
          objectFit: 'cover',
          objectPosition: '30% 80%',
          marginLeft: '-10%',
        }}
      />
    </div>
  );

}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '10px 14px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#00fe9b',
          animation: `typingBounce 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
          display: 'block',
        }} />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      if (messages.length === 0) {
        setMessages([{
          role: 'assistant',
          content: '¡Hola! Soy Plumita 🐾 la asistente virtual de Joel. Podés preguntarme sobre su experiencia, proyectos, tecnologías o cualquier cosa que quieras saber de él.'
        }]);
      }
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      // Agregá estas dos líneas para ver qué devuelve el servidor
      console.log('Status:', response.status);
      const data = await response.json();
      console.log('Data:', data);  // ← mirá esto en el DevTools

      const reply = data.reply || 'No pude generar una respuesta.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Error completo:', err);  // ← y esto
      setError('Error de conexión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    '¿En qué estás trabajando ahora?',
    '¿Qué tecnologías dominás?',
    '¿Qué proyectos tenés?',
    '¿Cómo te contacto?',
  ];

  return (
    <>
      {/* ── CSS injected ── */}
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-chat-scrollbar::-webkit-scrollbar { width: 4px; }
        .ai-chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .ai-chat-scrollbar::-webkit-scrollbar-thumb { background: #3a3850; border-radius: 4px; }
        .ai-msg-user   { animation: msgFadeIn 0.25s ease; }
        .ai-msg-bot    { animation: msgFadeIn 0.25s ease; }
        .ai-input-area { resize: none; outline: none; }
        .ai-input-area:focus { box-shadow: 0 0 0 1px rgba(0,254,155,0.4); }
        .ai-send-btn:hover:not(:disabled) { background: #00d882 !important; }
        .ai-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .ai-suggestion:hover { background: rgba(0,254,155,0.12) !important; border-color: rgba(0,254,155,0.5) !important; }
        .ai-toggle-btn:hover { transform: scale(1.05); }
        .ai-toggle-btn { transition: transform 0.2s ease; }
      `}</style>

      {/* ── Sticky toggle button ── */}

      <button
        className="ai-toggle-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Chat con Joel IA"
        style={{
          position: 'fixed',
          bottom: 0,          // <- pegado al borde inferior
          right: 0,          // <- más a la derecha
          zIndex: 9000,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          filter: open ? 'drop-shadow(0 0 14px rgba(0,254,155,0.6))' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
        }}
      >
        <JoelAvatar size={150} pulse={!open} />
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 120,
            width: 370,
            maxWidth: 'calc(100vw - 40px)',
            height: 520,
            zIndex: 8999,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 20,
            overflow: 'hidden',
            animation: 'chatSlideUp 0.3s ease',
            background: '#16151e',
            border: '1px solid rgba(0,254,155,0.2)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,254,155,0.06)',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            background: 'rgba(0,254,155,0.05)',
            borderBottom: '1px solid rgba(0,254,155,0.12)',
            flexShrink: 0,
          }}>
            <JoelAvatar size={36} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: 'white', fontFamily: 'Raleway, sans-serif' }}>
                Plumita 🐾
              </p>
              <p style={{ margin: 0, fontSize: 11, color: '#00fe9b', fontFamily: 'Raleway, sans-serif' }}>
                ● Asistente virtual de Joel · IA activa
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#666', fontSize: 18, lineHeight: 1, padding: 4,
                borderRadius: 6,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="ai-chat-scrollbar"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 14px 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {/* Suggestion chips — only if 1 message (welcome) */}
            {messages.length === 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                {suggestions.map(s => (
                  <button
                    key={s}
                    className="ai-suggestion"
                    onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    style={{
                      background: 'rgba(0,254,155,0.06)',
                      border: '1px solid rgba(0,254,155,0.25)',
                      borderRadius: 20,
                      padding: '5px 12px',
                      fontSize: 11,
                      color: '#ccc',
                      cursor: 'pointer',
                      fontFamily: 'Raleway, sans-serif',
                      transition: '0.2s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 8,
                  alignItems: 'flex-end',
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{ flexShrink: 0, marginBottom: 2 }}>
                    <JoelAvatar size={26} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '78%',
                    padding: '9px 13px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #00fe9b, #00d87a)'
                      : 'rgba(255,255,255,0.06)',
                    color: msg.role === 'user' ? '#0d1a12' : '#e8e8f0',
                    fontSize: 13,
                    lineHeight: 1.55,
                    fontFamily: 'Raleway, sans-serif',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-msg-bot" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <JoelAvatar size={26} />
                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '16px 16px 16px 4px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {error && (
              <p style={{ color: '#ff6b6b', fontSize: 12, textAlign: 'center', fontFamily: 'Raleway, sans-serif' }}>
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            gap: 8,
            alignItems: 'flex-end',
            background: '#13121a',
            flexShrink: 0,
          }}>
            <textarea
              ref={inputRef}
              className="ai-input-area"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Preguntame algo sobre mi perfil..."
              rows={1}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '9px 12px',
                color: 'white',
                fontSize: 13,
                fontFamily: 'Raleway, sans-serif',
                maxHeight: 90,
                lineHeight: 1.5,
                transition: '0.2s',
              }}
              onInput={e => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 90) + 'px';
              }}
            />
            <button
              className="ai-send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: '#00fe9b',
                border: 'none',
                borderRadius: 12,
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: '0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="#0d1a12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#0d1a12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Footer branding */}
          <div style={{
            textAlign: 'center',
            padding: '4px 0 8px',
            fontSize: 10,
            color: '#444',
            fontFamily: 'Raleway, sans-serif',
            background: '#13121a',
            flexShrink: 0,
          }}>
            Powered by · joel.dev
          </div>
        </div>
      )}
    </>
  );
}
