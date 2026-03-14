import React from 'react';
import { useAppContext } from '../AppContext';
import { Check, Home } from 'lucide-react';
import { motion } from 'motion/react';

export const SessionComplete: React.FC = () => {
  const { setAppState, stats } = useAppContext();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col items-center min-h-screen p-6 max-w-md mx-auto w-full text-center"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10" />
        </div>
        
        <h2 className="text-3xl font-light mb-2 text-slate-800">Session Complete</h2>
        <p className="text-slate-500 mb-12">
          You've completed your breath training.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-3xl font-light text-slate-800 mb-1">{stats.completedRounds}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Rounds</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-3xl font-light text-slate-800 mb-1">{stats.totalBreaths}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Breaths</div>
          </div>
          <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-3xl font-light text-slate-800 mb-1">{formatTime(stats.elapsedSeconds)}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Total Time</div>
          </div>
        </div>

        <button 
          onClick={() => setAppState('home')}
          className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 transition-colors shadow-md"
        >
          <Home className="w-5 h-5" fill="currentColor" />
          <span className="text-lg font-medium">Return Home</span>
        </button>
      </div>

      <div className="pb-4 pt-8">
        <a href="https://ko-fi.com/H2H71VZG5W" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
          <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support me on Ko-fi" className="h-10" />
        </a>
      </div>
    </motion.div>
  );
};
