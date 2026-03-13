import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface UDLState {
  textSize: number;
  brightness: number;
  volume: number;
  sensorySafeMode: boolean;
}

interface UDLContextType {
  state: UDLState;
  setTextSize: (size: number) => void;
  setBrightness: (brightness: number) => void;
  setVolume: (volume: number) => void;
  setSensorySafeMode: (safeMode: boolean) => void;
}

const defaultState: UDLState = {
  textSize: 100, // percentage
  brightness: 100, // percentage
  volume: 50, // percentage
  sensorySafeMode: false,
};

const UDLContext = createContext<UDLContextType | undefined>(undefined);

export const UDLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UDLState>(defaultState);

  const setTextSize = (textSize: number) => setState(prev => ({ ...prev, textSize }));
  const setBrightness = (brightness: number) => setState(prev => ({ ...prev, brightness }));
  const setVolume = (volume: number) => setState(prev => ({ ...prev, volume }));
  
  const setSensorySafeMode = (sensorySafeMode: boolean) => {
    setState(prev => ({
      ...prev,
      sensorySafeMode,
      // If turning on sensory safe mode, lower volume and brightness to safe levels if they are high
      volume: sensorySafeMode ? Math.min(prev.volume, 30) : prev.volume,
      brightness: sensorySafeMode ? Math.min(prev.brightness, 85) : prev.brightness
    }));
  };

  // Apply visual effects globally
  useEffect(() => {
    document.documentElement.style.setProperty('--udl-text-size', `${state.textSize}%`);
    document.documentElement.style.setProperty('--udl-brightness', `${state.brightness}%`);
    
    if (state.sensorySafeMode) {
      document.body.classList.add('sensory-safe');
    } else {
      document.body.classList.remove('sensory-safe');
    }
  }, [state.textSize, state.brightness, state.sensorySafeMode]);

  return (
    <UDLContext.Provider value={{ state, setTextSize, setBrightness, setVolume, setSensorySafeMode }}>
      {children}
    </UDLContext.Provider>
  );
};

export const useUDL = () => {
  const context = useContext(UDLContext);
  if (context === undefined) {
    throw new Error('useUDL must be used within a UDLProvider');
  }
  return context;
};
