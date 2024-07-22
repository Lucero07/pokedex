import React, { createContext, useContext, useState, ReactNode } from 'react';

type BackgroundColorContextType = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const BackgroundColorContext = createContext<BackgroundColorContextType | undefined>(undefined);

export const BackgroundColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#DC0A2D'); // Default color

  return (
    <BackgroundColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = (): BackgroundColorContextType => {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    throw new Error('useBackgroundColor must be used within a BackgroundColorProvider');
  }
  return context;
};
