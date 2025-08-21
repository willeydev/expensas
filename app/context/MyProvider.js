// Context.js
import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const [currentModalTitle, setCurrentModalTitle] = useState('');

  

  return (
    <MyContext.Provider value={
      { menuOpen, setMenuOpen, 
        currentModal, setCurrentModal, 
        currentModalTitle, setCurrentModalTitle,

      }
    }>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};