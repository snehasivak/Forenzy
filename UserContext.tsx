import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext<any>(null);

// Create the Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Create the custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};