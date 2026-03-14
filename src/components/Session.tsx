import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../AppContext';
import { X, Pause, Play, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../services/audio';

type Phase = 'intro' | 'breathing' | 'retention' | 'recovery_inhale' | 'recovery_hold' | 'recovery_exhale';

export const Session: React.FC = () => {
  const { setAppState, config, stats, setStats } = useAppContext();
  
  const [round] = useState(stats.completedRounds + 1);
  const [breath, setBreath] = useState(1);
  const [phase, setPhase] = useState<Phase>('intro');
  const [timeLeft, setTimeLeft] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [breathingState, setBreathingState] = useState<'inhale' | 'exhale'>('inhale');

  const sessionTimeRef = useRef(stats.elapsedSeconds);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      sessionTimeRef.current += 1;
    }, 1000);
    return () => clearInterval(t);
  }, [isPaused]);

  const playSound = useCallback((type: 'inhale' | 'exhale' | 'chime' | 'extended_exhale' | 'extended_inhale') => {
    if (type === 'inhale') audio.playInhale(config.pace / 2000);
    if (type === 'exhale') audio.playExhale(config.pace / 2000);
    if (type === 'chime') audio.playChime();
    if (type === 'extended_exhale') audio.playExhale(4);
    if (type === 'extended_inhale') audio.playInhale(4);
  }, [config.pace]);

  useEffect(() => {
    if (isPaused) return;

    let timeoutId: number;

    if (phase === 'intro') {
      if (timeLeft > 0) {
        timeoutId = window.setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        setPhase('breathing');
        setBreath(1);
        setBreathingState('inhale');
        playSound('inhale');
      }
    } 
    else if (phase === 'breathing') {
      const halfPace = config.pace / 2;
      
      timeoutId = window.setTimeout(() => {
        if (breathingState === 'inhale') {
          setBreathingState('exhale');
          playSound('exhale');
        } else {
          if (breath < config.breathsPerRound) {
            setBreath(b => b + 1);
            setBreathingState('inhale');
            playSound('inhale');
          } else {
            playSound('chime');
            playSound('extended_exhale');
            setPhase('retention');
            setTimeLeft(config.baseHoldTime + (round - 1) * config.holdIncrement);
          }
        }
      }, halfPace);
    }
    else if (phase === 'retention') {
      if (timeLeft > 0) {
        timeoutId = window.setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        playSound('chime');
        playSound('extended_inhale');
        setPhase('recovery_inhale');
        setTimeLeft(2);
      }
    }
    else if (phase === 'recovery_inhale') {
      if (timeLeft > 0) {
        timeoutId = window.setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        setPhase('recovery_hold');
        setTimeLeft(config.recoveryHoldTime);
      }
    }
    else if (phase === 'recovery_hold') {
      if (timeLeft > 0) {
        timeoutId = window.setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        playSound('chime');
        playSound('extended_exhale');
        setPhase('recovery_exhale');
        setTimeLeft(2);
      }
    }
    else if (phase === 'recovery_exhale') {
      if (timeLeft > 0) {
        timeoutId = window.setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        setStats(prev => ({
          completedRounds: round,
          totalBreaths: prev.totalBreaths + config.breathsPerRound,
          elapsedSeconds: sessionTimeRef.current
        }));
        
        if (round < config.totalRounds) {
          setAppState('round_complete');
        } else {
          setAppState('session_complete');
        }
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [
    phase, timeLeft, isPaused, breathingState, breath, round, 
    config.pace, config.breathsPerRound, config.baseHoldTime, 
    config.holdIncrement, config.recoveryHoldTime, config.totalRounds,
    playSound, setAppState, setStats
  ]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const skipPhase = () => {
    if (phase === 'retention') {
      playSound('chime');
      playSound('extended_inhale');
      setPhase('recovery_inhale');
      setTimeLeft(2);
    } else if (phase === 'recovery_hold') {
      playSound('chime');
      playSound('extended_exhale');
      setPhase('recovery_exhale');
      setTimeLeft(2);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-md mx-auto w-full relative">
      <div className="flex justify-between items-center pt-4 z-10">
        <button onClick={() => setAppState('home')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600">
          <X className="w-6 h-6" />
        </button>
        <div className="text-sm font-medium text-slate-500">
          Round {round} / {config.totalRounds}
        </div>
        <button onClick={() => setIsPaused(!isPaused)} className="p-2 -mr-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600">
          {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <AnimatePresence>
            {phase === 'breathing' && (
              <motion.div
                key="breathing-ring"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: breathingState === 'inhale' ? 1 : 0.5,
                  opacity: 1
                }}
                transition={{ 
                  duration: config.pace / 2000, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 rounded-full border-4 border-sky-400/40 bg-sky-400/10"
              />
            )}
          </AnimatePresence>

          <div className="z-10 text-center text-slate-800">
            {phase === 'intro' && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl font-light">
                {timeLeft}
              </motion.div>
            )}
            
            {phase === 'breathing' && (
              <div className="flex flex-col items-center">
                <div className="text-6xl font-light mb-2">{breath}</div>
                <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">
                  {breathingState}
                </div>
              </div>
            )}

            {phase === 'retention' && (
              <div className="flex flex-col items-center">
                <div className="text-6xl font-light mb-2">{formatTime(timeLeft)}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                  Hold
                </div>
              </div>
            )}

            {phase === 'recovery_inhale' && (
              <div className="flex flex-col items-center">
                <div className="text-4xl font-light mb-2">Deep Breath In</div>
              </div>
            )}

            {phase === 'recovery_hold' && (
              <div className="flex flex-col items-center">
                <div className="text-6xl font-light mb-2">{timeLeft}</div>
                <div className="text-sm font-medium text-sky-600 uppercase tracking-widest">
                  Recovery Hold
                </div>
              </div>
            )}

            {phase === 'recovery_exhale' && (
              <div className="flex flex-col items-center">
                <div className="text-4xl font-light mb-2">Let it go</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-24 flex items-center justify-center z-10">
        {(phase === 'retention' || phase === 'recovery_hold') && (
          <button 
            onClick={skipPhase}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm border border-slate-200"
          >
            <SkipForward className="w-5 h-5" />
            <span className="font-medium">Skip Hold</span>
          </button>
        )}
      </div>
    </div>
  );
};
