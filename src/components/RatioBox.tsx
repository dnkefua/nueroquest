import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import Alert from './Alert';
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { InteractiveCube } from './InteractiveCube';
import './RatioBox.css';

interface Props {
    onError: () => void;
    onSuccess: () => void;
    t: (key: string) => string;
    lang: string;
    voiceEnabled: boolean;
}

const RatioBox: React.FC<Props> = ({ onError, onSuccess, t, lang, voiceEnabled }) => {
    const [targetVal, setTargetVal] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);
    const { isListening, isSupported, transcript, startListening, stopListening, setTranscript } = useVoiceInteraction(lang);

    const options = [3, 4, 5, 6];
    const expectedVal = 4; // Because 2/5 = 4/10

    // Handle Voice Input parsing
    useEffect(() => {
        if (transcript) {
            const lowerTrans = transcript.toLowerCase();

            // Map common spoken numbers in English and Arabic to digits
            const wordToNumber: Record<string, number> = {
                'three': 3, 'four': 4, 'five': 5, 'six': 6,
                '3': 3, '4': 4, '5': 5, '6': 6,
                'ثلاثة': 3, 'أربعة': 4, 'خمسة': 5, 'ستة': 6,
                'تلاتة': 3, 'اربعة': 4, 'خمسة ': 5, 'ستة ': 6
            };

            let foundNum: number | null = null;

            // Check for explicit numbers
            const match = lowerTrans.match(/\d+/);
            if (match) {
                foundNum = parseInt(match[0], 10);
            } else {
                // Check word dictionary map
                for (const [word, num] of Object.entries(wordToNumber)) {
                    if (lowerTrans.includes(word)) {
                        foundNum = num;
                        break;
                    }
                }
            }

            if (foundNum !== null && (options.includes(foundNum) || foundNum === expectedVal)) {
                setTargetVal(foundNum);
            }

            stopListening();
            setTranscript('');
        }
    }, [transcript, stopListening, setTranscript, options, expectedVal]);

    const handleSelectCube = (val: number) => {
        setTargetVal(val);
    };

    const checkAnswer = (e: React.MouseEvent) => {
        e.stopPropagation(); // so it doesn't count as a generic telemetry click

        // Prevent checking if no value is set
        if (targetVal === null) return;

        if (targetVal === expectedVal) {
            setAlert({ msg: t('correct_alert'), type: 'success' });
            setTimeout(() => {
                setTargetVal(null);
                setAlert(null);
                onSuccess();
            }, 2500);
        } else {
            setAlert({ msg: t('wrong_alert'), type: 'error' });
            onError();
            setTimeout(() => setAlert(null), 2500);
        }
    };

    return (
        <section className="learning-area glass">
            <div className="module-header">
                <h2>{t('module_title')}</h2>
                <p>{t('module_desc')}</p>
            </div>

            <div className="ratio-box-container">
                <div className="ratio-equation">
                    <div className="ratio-side">
                        <div className="number">2</div>
                        <div className="fraction-line"></div>
                        <div className="number">5</div>
                    </div>
                    <div className="equals">=</div>
                    <div className="ratio-side">
                        {/* Target Display Area */}
                        <div className="target-value-display">
                            {targetVal !== null ? (
                                <div className="selected-number">{targetVal}</div>
                            ) : (
                                <div className="empty-slot">?</div>
                            )}
                        </div>
                        <div className="fraction-line"></div>
                        <div className="number">10</div>
                    </div>
                </div>

                {/* True 3D Canvas Area */}
                <div className="canvas-container">
                    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Environment preset="city" />

                        {/* Rendering 3D Option Cubes */}
                        <group position={[-3, 0, 0]}>
                            {options.map((opt, i) => (
                                <InteractiveCube
                                    key={opt}
                                    value={opt}
                                    position={[i * 2, 0, 0]}
                                    onSelect={handleSelectCube}
                                />
                            ))}
                        </group>
                    </Canvas>
                </div>
            </div>

            <div className="voice-controls" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {isSupported && voiceEnabled && (
                    <button
                        className={`btn ${isListening ? 'primary-btn' : ''}`}
                        onClick={isListening ? stopListening : startListening}
                        title={isListening ? t('voice_stop') : t('voice_start')}
                    >
                        {isListening ? <Mic size={24} /> : <MicOff size={24} />}
                    </button>
                )}
                <button className="btn primary-btn check-btn" onClick={checkAnswer}>
                    {t('check_answer')}
                </button>
            </div>

            {alert && <Alert message={alert.msg} type={alert.type} />}
        </section>
    );
};

export default RatioBox;
