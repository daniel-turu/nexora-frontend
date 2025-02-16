import React, { createContext, useState, useContext } from 'react';

// Create ShowAboveContext
const ShowAboveContext = createContext();

// ShowAboveProvider Component
export const ShowAboveProvider = ({ children }) => {
  const [belowComponent, setBelowComponent] = useState(null);

  return (
    <ShowAboveContext.Provider value={{ belowComponent, setBelowComponent }}>
      {children}
      {belowComponent}
    </ShowAboveContext.Provider>
  );
};

// Hook to use ShowAboveContext
export const useShowAbove = () => useContext(ShowAboveContext);
