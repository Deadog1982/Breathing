import React from 'react';
import { useAppContext } from '../AppContext';
import { ArrowLeft, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

export const Settings: React.FC = () => {
  const { setAppState } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen p-6 max-w-md mx-auto w-full"
    >
      <div className="flex items-center mb-8 pt-4">
        <button onClick={() => setAppState('home')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium ml-2 text-slate-800">Settings</h2>
      </div>

      <div className="space-y-6">
        <button 
          onClick={() => setAppState('support')}
          className="w-full flex items-center justify-between p-4 bg-sky-50 text-sky-700 rounded-2xl hover:bg-sky-100 transition-colors border border-sky-100"
        >
          <div className="flex items-center space-x-3">
            <Coffee className="w-5 h-5" />
            <span className="font-medium">Support the Developer</span>
          </div>
          <span className="text-sm font-medium uppercase tracking-wider">Ko-fi</span>
        </button>

        <div className="p-4">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">About</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Resilient Breath is designed for focused, science-aware breath training. 
            Always listen to your body and practice in a safe, comfortable environment. 
            Do not practice while driving or in water.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Support: React.FC = () => {
  const { setAppState } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col min-h-screen p-6 max-w-md mx-auto w-full"
    >
      <div className="flex items-center mb-6 pt-4">
        <button onClick={() => setAppState('home')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium ml-2 text-slate-800">Support</h2>
      </div>

      <div className="flex-1 w-full overflow-hidden rounded-2xl shadow-sm border border-slate-200 bg-[#f9f9f9]">
        <iframe 
          id='kofiframe' 
          src='https://ko-fi.com/illariong/?hidefeed=true&widget=true&embed=true&preview=true' 
          style={{ border: 'none', width: '100%', padding: '4px', background: '#f9f9f9' }} 
          height='712' 
          title='illariong'
        />
      </div>
    </motion.div>
  );
};
