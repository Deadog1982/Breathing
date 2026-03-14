import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import { Play, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

export const RoundComplete: React.FC = () => {
  const { setAppState, stats, hasTipped } = useAppContext();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (!hasTipped && stats.completedRounds % 2 === 0) {
      setShowAd(true);
    }
  }, [hasTipped, stats.completedRounds]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center min-h-screen p-6 max-w-md mx-auto w-full text-center"
    >
      <h2 className="text-3xl font-light mb-2 text-slate-800">Round {stats.completedRounds} Complete</h2>
      <p className="text-slate-500 mb-12">
        Great job. Take a moment to notice how you feel.
      </p>

      {showAd ? (
        <div className="w-full h-64 bg-slate-200 rounded-2xl flex flex-col items-center justify-center mb-12 border border-slate-300 relative overflow-hidden">
          <span className="text-xs text-slate-400 uppercase tracking-widest mb-2">Advertisement</span>
          <div className="text-slate-500 mb-4">AdMob Placeholder</div>
          <button 
            onClick={() => setAppState('support')}
            className="absolute bottom-4 flex items-center space-x-2 text-sm text-sky-600 hover:text-sky-700 transition-colors"
          >
            <Coffee className="w-4 h-4" />
            <span>Remove ads by leaving a tip</span>
          </button>
        </div>
      ) : (
        <div className="w-full h-64 flex items-center justify-center mb-12">
          <div className="w-32 h-32 rounded-full border-4 border-sky-400/20 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-sky-400/20" />
          </div>
        </div>
      )}

      <button 
        onClick={() => setAppState('session')}
        className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 transition-colors shadow-md"
      >
        <Play className="w-5 h-5" fill="currentColor" />
        <span className="text-lg font-medium">
          Start Round {stats.completedRounds + 1}
        </span>
      </button>
    </motion.div>
  );
};
