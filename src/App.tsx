import React from 'react';
import { AppProvider, useAppContext } from './AppContext';
import { Home } from './components/Home';
import { Setup } from './components/Setup';
import { Session } from './components/Session';
import { RoundComplete } from './components/RoundComplete';
import { SessionComplete } from './components/SessionComplete';
import { Settings, Support } from './components/Settings';
import { AnimatePresence } from 'motion/react';

const AppContent = () => {
  const { appState } = useAppContext();

  return (
    <AnimatePresence mode="wait">
      {appState === 'home' && <Home key="home" />}
      {appState === 'setup' && <Setup key="setup" />}
      {appState === 'session' && <Session key="session" />}
      {appState === 'round_complete' && <RoundComplete key="round_complete" />}
      {appState === 'session_complete' && <SessionComplete key="session_complete" />}
      {appState === 'settings' && <Settings key="settings" />}
      {appState === 'support' && <Support key="support" />}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-sky-50 text-slate-900 font-sans selection:bg-sky-500/30 overflow-hidden">
        <AppContent />
      </div>
    </AppProvider>
  );
}
