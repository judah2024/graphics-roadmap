import React, { createContext, useContext } from 'react';
import useProgressTracker from '../hooks/useProgressTracker';

const ProgressContext = createContext();

export const ProgressProvider = ({ children, data }) => {
  const progressTracker = useProgressTracker();
  
  return (
    <ProgressContext.Provider value={{ ...progressTracker, data }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
