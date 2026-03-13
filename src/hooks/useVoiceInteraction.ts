import { useState, useEffect, useCallback } from 'react';

// Interfaces for Web Speech API (as TypeScript doesn't always have full typings globally)
interface IWindow extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

export function useVoiceInteraction(lang: string = 'en') {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        const SpeechRec = (window as unknown as IWindow).SpeechRecognition || (window as unknown as IWindow).webkitSpeechRecognition;
        if (!SpeechRec) {
            setIsSupported(false);
            return;
        }

        const rec = new SpeechRec();
        rec.continuous = false;
        rec.interimResults = false;
        // Map Arabic/English shortcodes
        rec.lang = lang === 'ar' ? 'ar-AE' : 'en-US';

        rec.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
        };

        rec.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        rec.onend = () => {
            setIsListening(false);
        };

        setRecognition(rec);
    }, [lang]);

    const startListening = useCallback(() => {
        if (recognition) {
            setTranscript('');
            setIsListening(true);
            recognition.start();
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition]);

    const speak = useCallback((text: string, langCode: string = 'en-US') => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // clear queue
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = langCode === 'ar' ? 'ar-AE' : 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    return {
        isListening,
        isSupported,
        transcript,
        startListening,
        stopListening,
        speak,
        setTranscript
    };
}
