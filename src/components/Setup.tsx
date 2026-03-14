import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { ArrowLeft, Play, Save, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SessionConfig } from '../types';

export const Setup: React.FC = () => {
  const { setAppState, config, setConfig, setQuickPreset } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);

  const updateConfig = (key: keyof SessionConfig, value: number | boolean) => {
    setConfig({ ...config, [key]: value });
  };

  const handleSavePreset = () => {
    setQuickPreset(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col min-h-screen p-6 max-w-md mx-auto w-full"
    >
      <div className="flex items-center justify-between mb-8 pt-4">
        <button onClick={() => setAppState('home')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium text-slate-800">Session Setup</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto pb-32 no-scrollbar">
        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-600">
            <span>Breaths per round</span>
            <span className="text-sky-600">{config.breathsPerRound}</span>
          </label>
          <input 
            type="range" 
            min="30" max="40" step="1"
            value={config.breathsPerRound}
            onChange={(e) => updateConfig('breathsPerRound', parseInt(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-600">
            <span>Number of rounds</span>
            <span className="text-sky-600">{config.totalRounds}</span>
          </label>
          <input 
            type="range" 
            min="1" max="10" step="1"
            value={config.totalRounds}
            onChange={(e) => updateConfig('totalRounds', parseInt(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-600">
            <span>Pacing (seconds per full breath)</span>
            <span className="text-sky-600">{(config.pace / 1000).toFixed(1)}s</span>
          </label>
          <input 
            type="range" 
            min="1000" max="3000" step="100"
            value={config.pace}
            onChange={(e) => updateConfig('pace', parseInt(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-600">
            <span>Base hold time</span>
            <span className="text-sky-600">{config.baseHoldTime}s</span>
          </label>
          <input 
            type="range" 
            min="15" max="120" step="5"
            value={config.baseHoldTime}
            onChange={(e) => updateConfig('baseHoldTime', parseInt(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm font-medium text-slate-600">
            <span>Hold increment per round</span>
            <span className="text-sky-600">+{config.holdIncrement}s</span>
          </label>
          <input 
            type="range" 
            min="0" max="30" step="5"
            value={config.holdIncrement}
            onChange={(e) => updateConfig('holdIncrement', parseInt(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>

        <button 
          onClick={handleSavePreset}
          className={`w-full border rounded-2xl py-3 px-6 flex items-center justify-center space-x-2 transition-colors shadow-sm mt-4 ${
            isSaved 
              ? 'bg-slate-100 text-black border-slate-300' 
              : 'bg-white hover:bg-sky-50 text-sky-600 border-sky-200'
          }`}
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span className="font-medium">{isSaved ? 'Saved as Quick Preset' : 'Save as Quick Preset'}</span>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-sky-50 via-sky-50 to-transparent">
        <div className="max-w-md mx-auto">
          <button 
            onClick={() => setAppState('session')}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 transition-colors shadow-md"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            <span className="text-lg font-medium">Start Session</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
