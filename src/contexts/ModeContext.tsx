import React, { createContext, useContext, useState, useEffect } from 'react';

interface ModeContextType {
  mode: 'writer' | 'buyer';
  setMode: (mode: 'writer' | 'buyer') => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'writer' | 'buyer'>('buyer');

  useEffect(() => {
    const savedMode = localStorage.getItem('userMode');
    if (savedMode) {
      setMode(savedMode as 'writer' | 'buyer');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userMode', mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
