import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'normal';
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('highContrast') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('highContrast', highContrast);
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, highContrast, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
