import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Trash2, ChevronDown, Bot, AlertTriangle } from 'lucide-react';
import { useGeminiChat } from '../hooks/useGeminiChat';
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';
import './NotebookAI.css';

interface Props {
  lang: 'en' | 'ar';
  voiceEnabled: boolean;
}

const NotebookAI: React.FC<Props> = ({ lang, voiceEnabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, isLoading, error, apiReady, sendMessage, clearHistory } = useGeminiChat({ lang });
  const { speak } = useVoiceInteraction(lang);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const response = await sendMessage(text);
    if (response && voiceEnabled) {
      speak(response, lang);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const isRtl = lang === 'ar';

  return (
    <>
      {/* Floating trigger button */}
      <button
        id="notebook-ai-toggle"
        className={`notebook-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="NeuroQuest AI Assistant"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <ChevronDown size={22} /> : <Sparkles size={22} />}
        {!isOpen && <span className="fab-label">AI</span>}
      </button>

      {/* Chat panel */}
      <div className={`notebook-panel glass ${isOpen ? 'panel-open' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="panel-header">
          <div className="panel-title">
            <Bot size={20} />
            <span>{isRtl ? 'مساعد NeuroQuest الذكي' : 'NeuroQuest AI'}</span>
          </div>
          <div className="panel-actions">
            {messages.length > 0 && (
              <button
                className="icon-btn"
                onClick={clearHistory}
                title={isRtl ? 'مسح المحادثة' : 'Clear chat'}
              >
                <Trash2 size={16} />
              </button>
            )}
            <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* No API key warning */}
        {!apiReady && (
          <div className="api-warning">
            <AlertTriangle size={18} />
            <span>
              {isRtl
                ? 'أضف VITE_GEMINI_API_KEY إلى ملف .env.local لتفعيل المساعد'
                : 'Add VITE_GEMINI_API_KEY to .env.local to activate the AI assistant'}
            </span>
          </div>
        )}

        {/* Messages */}
        <div className="panel-messages" id="chat-messages">
          {messages.length === 0 && (
            <div className="empty-state">
              <Sparkles size={36} />
              <p>
                {isRtl
                  ? 'مرحباً! أنا مساعدك الذكي في NeuroQuest. كيف يمكنني مساعدتك اليوم؟'
                  : "Hi! I'm your NeuroQuest AI assistant. Ask me anything about the app, math concepts, or how I can help you learn!"}
              </p>
              <div className="suggestion-pills">
                {(isRtl
                  ? ['ما هو NeuroQuest؟', 'ساعدني في الرياضيات', 'كيف يعمل قياس الإحباط؟']
                  : ['What is NeuroQuest?', 'Help me with math', 'How does frustration tracking work?']
                ).map((pill) => (
                  <button key={pill} className="suggestion-pill" onClick={() => { setInputText(pill); textareaRef.current?.focus(); }}>
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
              {msg.role === 'model' && <Bot size={16} className="bubble-icon" />}
              <div className="bubble-text">{msg.text}</div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble bubble-ai">
              <Bot size={16} className="bubble-icon" />
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          )}

          {error && (
            <div className="chat-error">
              <AlertTriangle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="panel-input-area">
          <textarea
            ref={textareaRef}
            id="chat-input"
            className="chat-input"
            placeholder={isRtl ? 'اكتب سؤالك هنا...' : 'Ask anything...'}
            value={inputText}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={!apiReady || isLoading}
          />
          <button
            id="chat-send-btn"
            className="send-btn"
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading || !apiReady}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="panel-footer-note">
          {isRtl ? 'مدعوم بـ Gemini AI · Enter للإرسال' : 'Powered by Gemini AI · Enter to send'}
        </p>
      </div>
    </>
  );
};

export default NotebookAI;
