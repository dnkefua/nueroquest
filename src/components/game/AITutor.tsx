import React, { useState } from 'react';
import { Bot, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import './AITutor.css';
import { useUDL } from '../../context/UDLContext';

const MOCK_EMOTIONS = ['Happy', 'Frustrated', 'Confused', 'Focused', 'Calm'];
const MOCK_ADVICE: Record<string, string> = {
  'Happy': "You're doing great! Keep up the positive energy. Ready for a harder challenge?",
  'Frustrated': "It's okay to feel stuck. Let's take a deep breath. Would you like a hint?",
  'Confused': "This part can be tricky. Look at the last step we did together.",
  'Focused': "Excellent concentration! You're really mastering this concept.",
  'Calm': "Perfect state for learning. Let's tackle the next puzzle."
};

export const AITutor: React.FC = () => {
  const { state } = useUDL();
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);

  const simulateDetection = () => {
    setIsDetecting(true);
    setCurrentEmotion(null);
    
    // Simulate ML Kit face processing time
    setTimeout(() => {
      const randomEmotion = MOCK_EMOTIONS[Math.floor(Math.random() * MOCK_EMOTIONS.length)];
      setCurrentEmotion(randomEmotion);
      setIsDetecting(false);
    }, 2000);
  };

  return (
    <div className={`ai-tutor-panel glass ${state.sensorySafeMode ? 'sensory-safe-tutor' : ''}`}>
      <div className="tutor-header">
        <Bot size={24} color="var(--primary)" />
        <h3>AI Companion Tutor</h3>
      </div>
      
      <div className="tutor-content">
        <div className="camera-feed-sim">
          {isDetecting ? (
            <div className="detecting-state">
              <RefreshCw size={32} className="spinner" />
              <p>Analyzing facial expressions (Secure, On-device)...</p>
            </div>
          ) : currentEmotion ? (
            <div className="result-state">
              <div className="emotion-badge">
                <AlertCircle size={16} /> Detected: {currentEmotion}
              </div>
            </div>
          ) : (
             <div className="idle-state">
               <p>Camera standby.</p>
             </div>
          )}
        </div>

        {currentEmotion && !isDetecting && (
          <div className="tutor-response">
            <div className="gemini-badge">
              <Zap size={14} /> AI Response
            </div>
            <p>{MOCK_ADVICE[currentEmotion]}</p>
          </div>
        )}

        <button 
          className="btn primary-btn detection-btn"
          onClick={simulateDetection}
          disabled={isDetecting}
        >
          {isDetecting ? 'Processing...' : 'Simulate Emotion Detection'}
        </button>
      </div>
    </div>
  );
};
