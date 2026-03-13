import React, { useEffect, useRef } from 'react';
import { Bot, Volume2 } from 'lucide-react';
import type { TelemetryData } from '../App';
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';
import './TelemetryPanel.css';

interface Props {
    telemetry: TelemetryData;
    t: (key: string) => string;
    lang: string;
    voiceEnabled: boolean;
}

const TelemetryPanel: React.FC<Props> = ({ telemetry, t, lang, voiceEnabled }) => {
    const { speak } = useVoiceInteraction(lang);
    const hasSpokenHint = useRef(false);
    // Synthesize Frustration Score
    const score = (telemetry.errors * 20) + (telemetry.clicks * 1.5) + (telemetry.timeSpent * 0.5);

    let frustrationLevel = 'low';
    let frustText = t('level_low');
    let width = '10%';

    if (score > 80) {
        frustrationLevel = 'high';
        frustText = t('level_high');
        width = '90%';
    } else if (score > 40) {
        frustrationLevel = 'med';
        frustText = t('level_med');
        width = '50%';
    }

    useEffect(() => {
        if (score > 40 && voiceEnabled && !hasSpokenHint.current) {
            speak(t('ai_help_msg'), lang);
            hasSpokenHint.current = true;
        }
        // Reset the spoken hint tracking if they succeed and score resets
        if (score === 0) {
            hasSpokenHint.current = false;
        }
    }, [score, speak, t, lang, voiceEnabled]);

    return (
        <aside className="telemetry-panel glass">
            <h3>{t('telemetry_title')}</h3>

            <div className="stat-row">
                <span>{t('clicks')}</span>
                <strong>{telemetry.clicks}</strong>
            </div>

            <div className="stat-row">
                <span>{t('errors')}</span>
                <strong>{telemetry.errors}</strong>
            </div>

            <div className="stat-row">
                <span>{t('time_spent')}</span>
                <strong>{telemetry.timeSpent}s</strong>
            </div>

            <div className="frustration-meter">
                <div className="meter-label">
                    <span>{t('frustration_level')}</span>
                    <strong>{frustText}</strong>
                </div>
                <div className="bar-container">
                    <div className={`bar - fill ${frustrationLevel} `} style={{ width }}></div>
                </div>
            </div>

            {score > 40 && (
                <div className="ai-box fade-in">
                    <Bot size={24} className="bot-icon" />
                    <p>{t('ai_help_msg')}</p>
                    {voiceEnabled && (
                        <button className="icon-btn" onClick={() => speak(t('ai_help_msg'), lang)} title="Read Aloud" style={{ marginLeft: 'auto' }}>
                            <Volume2 size={20} />
                        </button>
                    )}
                </div>
            )}
        </aside>
    );
};

export default TelemetryPanel;
