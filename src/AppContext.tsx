import React, { createContext, useContext, useState } from 'react';
import { AppState, SessionConfig, SessionStats } from './types';

interface AppContextType {
  appState: AppState;
  setAppState: (state: AppState) => void;
  config: SessionConfig;
  setConfig: (config: SessionConfig) => void;
  quickPreset: SessionConfig;
  setQuickPreset: (config: SessionConfig) => void;
  stats: SessionStats;
  setStats: (stats: SessionStats) => void;
  hasTipped: boolean;
  setHasTipped: (hasTipped: boolean) => void;
}

const defaultConfig: SessionConfig = {
  breathsPerRound: 35,
  totalRounds: 4,
  pace: 2000,
  holdEnabled: true,
  baseHoldTime: 30,
  holdIncrement: 15,
  recoveryHoldTime: 15,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>('home');
  const [config, setConfig] = useState<SessionConfig>(defaultConfig);
  const [quickPreset, setQuickPreset] = useState<SessionConfig>(defaultConfig);
  const [stats, setStats] = useState<SessionStats>({ completedRounds: 0, totalBreaths: 0, elapsedSeconds: 0 });
  const [hasTipped, setHasTipped] = useState(false);

  return (
    <AppContext.Provider value={{ 
      appState, setAppState, 
      config, setConfig, 
      quickPreset, setQuickPreset,
      stats, setStats, 
      hasTipped, setHasTipped 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
