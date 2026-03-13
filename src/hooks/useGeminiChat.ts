import { useState, useCallback, useEffect } from 'react';
import { sendGeminiMessage, hasApiKey, type ChatMessage } from '../services/geminiService';

const SESSION_KEY = 'neuroquest_chat_history';

interface UseGeminiChatOptions {
  lang?: 'en' | 'ar';
}

export function useGeminiChat({ lang = 'en' }: UseGeminiChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiReady = hasApiKey();

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // sessionStorage might be full or unavailable
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      if (!apiReady) {
        setError('API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.');
        return;
      }

      const userMessage: ChatMessage = { role: 'user', text: text.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Pass the history WITHOUT the new user message (the service adds it)
        const historyForApi = messages;
        const responseText = await sendGeminiMessage(historyForApi, text.trim(), lang);
        const aiMessage: ChatMessage = { role: 'model', text: responseText };
        setMessages((prev) => [...prev, aiMessage]);
        return responseText;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(errMsg);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [messages, lang, apiReady]
  );

  const clearHistory = useCallback(() => {
    setMessages([]);
    setError(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return { messages, isLoading, error, apiReady, sendMessage, clearHistory };
}
