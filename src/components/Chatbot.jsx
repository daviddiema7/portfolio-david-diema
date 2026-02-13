import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `Tu es l'assistant de David Diema, un développeur Full-Stack en 3e année de BUT Informatique. 
Ta personnalité : Parle de manière très naturelle, humaine et chaleureuse. Interdiction absolue d'utiliser des phrases de robot comme "Comment puis-je vous aider ?". Fais des réponses courtes, fluides et directes.
Les infos : David a son stage et cherche une alternance pour 2026-2027 en Île-de-France. 
Technos : React, Node.js, Java, Python, SQL, MongoDB, API REST (Swagger), n8n, Docker et Flutter. 
Si on demande le CV : Bouton "Mon CV" en haut de page.`;

export default function Chatbot({ currentTheme, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Salut ! Je suis l'assistant de David. Tu veux savoir quoi sur son parcours ou ses projets ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...newMessages];

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: apiMessages,
          temperature: 0.85,
          max_tokens: 256
        })
      });

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content || "Oups, petit souci technique...";
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, j'ai eu un petit bug. Tu peux répéter ?" }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* BOUTON FLOTTANT - Positionné au-dessus du bouton thème */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hide-on-mobile-open"
        style={{
          position: 'fixed', bottom: '11.5rem', right: '2rem', width: '56px', height: '56px',
          borderRadius: '16px', background: currentTheme.accent, color: '#FFF',
          border: 'none', cursor: 'pointer', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${currentTheme.accent}40`, transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'rotate(90deg) scale(0.9)' : 'scale(1)'
        }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '24px', height: '24px' }}><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
            <path d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.64 2.64 1 4.127 1Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 10h.01M15 10h.01M9 15c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* FENÊTRE DE CHAT - Design Glassmorphism */}
      {isOpen && (
        <div 
          className="chatbot-window"
          style={{
            position: 'fixed', 
            zIndex: 99, 
            display: 'flex', 
            flexDirection: 'column', 
            background: `${currentTheme.bgSecondary}CC`, 
            backdropFilter: 'blur(12px)',
            border: `1px solid ${currentTheme.border}`, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', 
            overflow: 'hidden', 
            animation: 'chatShow 0.4s ease-out',
            // Ces valeurs vont être surchargées par le CSS en bas pour le mobile
            bottom: '2rem', 
            right: '7rem', 
            width: '380px', 
            maxHeight: '70vh',
            borderRadius: '24px',
          }}
        >
          {/* HEADER */}
          <div style={{ 
            padding: '1rem 1.25rem', 
            borderBottom: `1px solid ${currentTheme.border}`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: `${currentTheme.bgSecondary}90`,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Icône Petit Robot */}
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: `linear-gradient(135deg, ${currentTheme.accent}, #4f46e5)`,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${currentTheme.accent}30`
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ 
                  fontWeight: 800, 
                  fontSize: '0.9rem', 
                  color: currentTheme.textPrimary, 
                  // Police style "Code/Tech" universelle
                  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
                }}>
                  Assistant IA
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      width: '7px', 
                      height: '7px', 
                      background: '#22c55e', 
                      borderRadius: '50%',
                    }} />
                    <span style={{ 
                      position: 'absolute',
                      width: '7px', 
                      height: '7px', 
                      background: '#22c55e', 
                      borderRadius: '50%',
                      animation: 'pulseStatus 2s infinite' 
                    }} />
                  </div>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    color: '#22c55e', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    En ligne
                  </span>
                </div>
              </div>
            </div>
         
            
            {/* BOUTON FERMER EN HAUT À DROITE */}
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: currentTheme.textSecondary, 
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '20px', height: '20px' }}>
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? currentTheme.accent : `${currentTheme.bgTertiary}80`,
                color: msg.role === 'user' ? '#FFF' : currentTheme.textPrimary,
                padding: '0.8rem 1.2rem', borderRadius: msg.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                maxWidth: '85%', fontSize: '0.95rem', lineHeight: '1.5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', padding: '0.8rem 1.2rem', background: `${currentTheme.bgTertiary}40`, borderRadius: '18px', display: 'flex', gap: '4px' }}>
                <span className="dot" style={{ width: '4px', height: '4px', background: currentTheme.textMuted, borderRadius: '50%', animation: 'pulse 1.4s infinite' }} />
                <span className="dot" style={{ width: '4px', height: '4px', background: currentTheme.textMuted, borderRadius: '50%', animation: 'pulse 1.4s infinite 0.2s' }} />
                <span className="dot" style={{ width: '4px', height: '4px', background: currentTheme.textMuted, borderRadius: '50%', animation: 'pulse 1.4s infinite 0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <form onSubmit={sendMessage} style={{ padding: '1.25rem', background: `${currentTheme.bgPrimary}40` }}>
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              background: currentTheme.bgSecondary, 
              padding: '0.5rem', 
              borderRadius: '14px', 
              border: `1px solid ${currentTheme.border}` 
            }}>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                style={{ 
                  flex: 1, 
                  padding: '0.6rem 0.8rem', 
                  border: 'none', 
                  background: 'transparent', 
                  color: currentTheme.textPrimary, 
                  outline: 'none', 
                  fontSize: '0.9rem' 
                }}
              />
              <button 
                type="submit" 
                disabled={isLoading} 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: currentTheme.accent, 
                  color: '#FFF', 
                  border: 'none', 
                  borderRadius: '10px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '18px', height: '18px' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Styles pour l'animation de la fenêtre */}
      <style>{`
      @media (max-width: 600px) {
          .hide-on-mobile-open {
            /* Si isOpen est vrai, on cache (display: none), sinon on affiche (display: flex) */
            display: ${isOpen ? 'none' : 'flex'} !important;
          }
          
          .chatbot-window {
            right: 10px !important;
            left: 10px !important;
            width: auto !important;
            max-height: 85vh !important;
            bottom: 10px !important;
            z-index: 9999 !important;
          }
        }

        @keyframes pulseStatus {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </>
  );
}