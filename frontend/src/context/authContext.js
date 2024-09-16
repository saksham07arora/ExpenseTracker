// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfigure' // Import loginRequest

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await instance.loginPopup(loginRequest); // Use loginRequest for scopes
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    instance.logoutPopup();
  };

  const isAuthenticated = accounts.length > 0;

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, accounts, isLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
