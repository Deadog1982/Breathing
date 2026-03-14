import React from 'react';
import { useAppContext } from '../AppContext';
import { Wind, Settings, Coffee, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { audio } from '../services/audio';

export const Home: React.FC = () => {
  const { setAppState, setStats, quickPreset, setConfig } = useAppContext();

  const startSession = () => {
    audio.init();
    setAppState('setup');
  };

  const handleQuickStart = () => {
    audio.init();
    setConfig(quickPreset);
    setStats({ completedRounds: 0, totalBreaths: 0, elapsedSeconds: 0 });
    setAppState('session');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <Wind className="w-24 h-24 mb-8 text-sky-500" strokeWidth={1} />
        <h1 className="text-4xl font-light tracking-tight mb-2 text-slate-800">Resilient Breath</h1>
        <p className="text-slate-500 text-center mb-12">
          Calm, focused, science-aware breath training.
        </p>

        <button 
          onClick={startSession}
          className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 transition-colors mb-4 shadow-sm"
        >
          <Play className="w-5 h-5" fill="currentColor" />
          <span className="text-lg font-medium">Setup Session</span>
        </button>

        <button 
          onClick={handleQuickStart}
          className="w-full bg-white hover:bg-sky-50 text-sky-700 rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 transition-colors mb-8 shadow-sm border border-sky-100"
        >
          <span className="text-lg font-medium">Quick Preset ({quickPreset.totalRounds} Rounds, {quickPreset.baseHoldTime}s Hold)</span>
        </button>

        <div className="flex space-x-4 w-full">
          <button 
            onClick={() => setAppState('settings')}
            className="flex-1 bg-white hover:bg-slate-50 rounded-2xl py-3 flex flex-col items-center justify-center transition-colors shadow-sm border border-slate-100"
          >
            <Settings className="w-6 h-6 mb-1 text-slate-400" />
            <span className="text-sm font-medium text-slate-500">Settings</span>
          </button>
          <button 
            onClick={() => setAppState('support')}
            className="flex-1 bg-white hover:bg-sky-50 rounded-2xl py-3 flex flex-col items-center justify-center transition-colors shadow-sm border border-sky-100"
          >
            <Coffee className="w-6 h-6 mb-1 text-sky-500" />
            <span className="text-sm font-medium text-slate-500">Support</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
