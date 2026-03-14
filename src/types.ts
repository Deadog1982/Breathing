export type AppState = 'home' | 'setup' | 'session' | 'round_complete' | 'session_complete' | 'settings' | 'support';

export interface SessionConfig {
  breathsPerRound: number;
  totalRounds: number;
  pace: number;
  holdEnabled: boolean;
  baseHoldTime: number;
  holdIncrement: number;
  recoveryHoldTime: number;
}

export interface SessionStats {
  completedRounds: number;
  totalBreaths: number;
  elapsedSeconds: number;
}
