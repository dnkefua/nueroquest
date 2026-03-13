import { GoogleGenerativeAI, type Content } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set. Please add it to your .env.local file.');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

const SYSTEM_PROMPT = `You are NeuroQuest AI, a warm and encouraging learning assistant for NeuroQuest Academy — an adaptive education platform designed specifically for children on the autism spectrum.

Your role:
- Help students understand math concepts in simple, clear, friendly language
- Provide positive reinforcement and encouragement
- Answer questions about the NeuroQuest app and its features (telemetry, emotion detection, 3D interactive games, voice commands)
- Offer step-by-step guidance when a student is frustrated or stuck
- Keep responses short, friendly, and easy to understand

NeuroQuest features you know about:
- Interactive 3D math games with sphere-based puzzles
- Real-time frustration/emotion telemetry (tracks errors, time, clicks)
- Voice command support in English and Arabic
- Bilingual interface (English and Arabic)
- Personalized adaptive learning

Always be patient, positive, and supportive. If a question is off-topic, gently redirect to learning.`;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function sendGeminiMessage(
  history: ChatMessage[],
  userMessage: string,
  lang: 'en' | 'ar' = 'en'
): Promise<string> {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: SYSTEM_PROMPT + (lang === 'ar' ? '\n\nIMPORTANT: Always respond in Arabic, since the student is using the Arabic interface.' : ''),
  });

  // Convert our history format to Gemini's Content format (excluding the latest user message)
  const geminiHistory: Content[] = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));

  const chat = model.startChat({ history: geminiHistory });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}

export function hasApiKey(): boolean {
  return Boolean(apiKey && apiKey.length > 0);
}
