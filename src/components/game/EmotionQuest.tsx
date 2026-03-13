import React, { useState } from 'react';
import { Brain, Star, Award, ChevronRight } from 'lucide-react';
import './EmotionQuest.css';
import { useUDL } from '../../context/UDLContext';

// --- Types ---
type Emotion = 'happy' | 'frustrated' | 'sad' | 'excited' | 'calm';

interface Scenario {
  id: string;
  npcText: string;
  options: { text: string; trait: string; atl: string; correctEmotion: Emotion }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    npcText: "Marhaba! I am Zara. I built a beautiful sandcastle, but the wind blew it away. How should I feel?",
    options: [
      { text: "It's okay to feel sad, we can build it again!", trait: "Caring", atl: "Self-management", correctEmotion: 'sad' },
      { text: "Yell at the wind!", trait: "None", atl: "None", correctEmotion: 'frustrated' },
      { text: "Ignore it and walk away.", trait: "None", atl: "None", correctEmotion: 'calm' }
    ]
  },
  {
    id: 's2',
    npcText: "My friend shared their dates with me today during break. What emotion am I showing?",
    options: [
      { text: "You look happy and grateful!", trait: "Communicator", atl: "Social", correctEmotion: 'happy' },
      { text: "You look scared.", trait: "None", atl: "None", correctEmotion: 'sad' }
    ]
  },
  {
    id: 's3',
    npcText: "I'm trying to solve this tricky puzzle, but I keep making mistakes. It's making my heart beat fast.",
    options: [
      { text: "Take a deep breath. It's okay to feel frustrated.", trait: "Thinker", atl: "Self-management", correctEmotion: 'frustrated' },
      { text: "Just give up.", trait: "None", atl: "None", correctEmotion: 'sad' },
      { text: "Cry loudly.", trait: "None", atl: "None", correctEmotion: 'sad' }
    ]
  }
];

export const EmotionQuest: React.FC = () => {
  const { state } = useUDL();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [learnerPoints, setLearnerPoints] = useState(0);
  const [atlPoints, setAtlPoints] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const scenario = SCENARIOS[currentScenarioIndex];

  const handleOptionSelect = (option: typeof scenario.options[0]) => {
    if (option.trait !== "None") {
      setLearnerPoints(prev => Math.min(prev + 20, 100));
      setAtlPoints(prev => Math.min(prev + 20, 100));
      setFeedback(`Great job! You showed the ${option.trait} trait and practiced ${option.atl} skills.`);
      
      // Auto advance
      setTimeout(() => {
        setFeedback(null);
        if (currentScenarioIndex < SCENARIOS.length - 1) {
          setCurrentScenarioIndex(prev => prev + 1);
        } else {
          setFeedback("You've completed the Who We Are module! Island Mastered.");
        }
      }, 3000);
    } else {
      setFeedback("That might not be the best choice. Let's think about how Zara feels.");
    }
  };

  return (
    <div className={`emotion-quest-container ${state.sensorySafeMode ? 'sensory-safe-game' : ''}`}>
      <div className="game-header">
        <div className="game-title">
          <h2>PYP: Who We Are</h2>
          <p>Emotion Quest Island</p>
        </div>
        
        <div className="progress-dashboard glass">
          <div className="progress-item">
            <div className="progress-label">
              <Star size={16} /> IB Learner Profile
              <span>{learnerPoints}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill lp-fill" style={{ width: `${learnerPoints}%` }}></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <Brain size={16} /> ATL Progress
              <span>{atlPoints}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill atl-fill" style={{ width: `${atlPoints}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="game-world glass">
        {/* Isometric 3D World Container */}
        <div className="isometric-stage">
          <div className="desert-background">
            <div className="dune dune-1"></div>
            <div className="dune dune-2"></div>
            <div className="sun"></div>
          </div>
          
          <div className="npc-container">
            {/* SVG Zara the Camel - Modest, stylized */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="zara-svg">
              {/* Camel Body */}
              <path d="M50 120 Q50 80 80 80 Q100 60 120 80 Q150 80 150 120 L150 160 L130 160 L130 120 Q100 140 70 120 L70 160 L50 160 Z" fill="#D4A373" />
              {/* Modest scarf/blanket */}
              <path d="M70 90 Q100 80 130 90 L130 110 Q100 120 70 110 Z" fill="#2A9D8F" />
              {/* Camel Head & Neck */}
              <path d="M140 90 Q160 50 170 50 Q180 50 180 60 Q180 80 160 100 Z" fill="#D4A373" />
              {/* Eye */}
              <circle cx="165" cy="65" r="4" fill="#264653" />
              {/* Cute smile */}
              <path d="M170 70 Q175 75 180 70" stroke="#264653" strokeWidth="2" fill="none" />
            </svg>
            
            <div className="npc-bubble bubble-glass">
              <p>{feedback || scenario.npcText}</p>
            </div>
          </div>
        </div>

        <div className="game-controls">
          {!feedback || feedback.includes("might not be") ? (
            <div className="options-grid">
              {scenario.options.map((opt, i) => (
                <button 
                  key={i} 
                  className="game-btn primary-btn"
                  onClick={() => handleOptionSelect(opt)}
                >
                  {opt.text} <ChevronRight size={18} />
                </button>
              ))}
            </div>
          ) : (
             <div className="success-message">
               <Award size={48} color="var(--success)" className="bounce" />
               <p>{feedback}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
