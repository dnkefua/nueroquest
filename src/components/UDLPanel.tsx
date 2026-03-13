import React, { useState } from 'react';
import { Settings, Volume2, Type, Sun, Shield, Wind, X } from 'lucide-react';
import { useUDL } from '../context/UDLContext';
import './UDLPanel.css';

export const UDLPanel: React.FC = () => {
  const { state, setTextSize, setBrightness, setVolume, setSensorySafeMode } = useUDL();
  const [isOpen, setIsOpen] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);

  return (
    <>
      <button 
        className="udl-toggle-btn glass" 
        onClick={() => setIsOpen(!isOpen)}
        title="Accessibility Settings"
      >
        <Settings size={28} />
      </button>

      {isOpen && (
        <div className="udl-panel glass">
          <div className="udl-header">
            <h3>Accessibility (UDL)</h3>
            <button className="icon-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="udl-controls">
            {/* Text Size Slider */}
            <div className="udl-control-group">
              <label>
                <Type size={18} /> Text Size
              </label>
              <input 
                type="range" 
                min="80" 
                max="150" 
                value={state.textSize} 
                onChange={(e) => setTextSize(Number(e.target.value))}
              />
            </div>

            {/* Brightness Slider */}
            <div className="udl-control-group">
              <label>
                <Sun size={18} /> Brightness
              </label>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={state.brightness} 
                onChange={(e) => setBrightness(Number(e.target.value))}
              />
            </div>

            {/* Volume Slider */}
            <div className="udl-control-group">
              <label>
                <Volume2 size={18} /> Volume
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={state.volume} 
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>

            {/* Sensory Safe Mode Toggle */}
            <div className="udl-toggle-group">
              <label>
                <Shield size={18} /> Sensory Safe Mode
              </label>
              <div 
                className={`custom-toggle ${state.sensorySafeMode ? 'active' : ''}`}
                onClick={() => setSensorySafeMode(!state.sensorySafeMode)}
              >
                <div className="toggle-thumb" />
              </div>
            </div>

            {/* Quick Calm Breathing */}
            <div className="udl-breathing-group">
              <button 
                className="btn secondary-btn" 
                onClick={() => setShowBreathing(true)}
              >
                <Wind size={18} /> Quick Calm Breathing (30s)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breathing Overlay */}
      {showBreathing && (
        <div className="breathing-overlay">
          <div className="breathing-container">
            <h3>Breathe with the circle</h3>
            <div className="breathing-circle"></div>
            <button 
              className="btn" 
              onClick={() => setShowBreathing(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
