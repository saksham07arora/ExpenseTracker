import { useState } from 'react';
import { useMsal } from '@azure/msal-react';

export const useAuth = () => {
  const { instance, accounts } = useMsal();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isAuthenticated = accounts.length > 0;

  const login = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await instance.loginPopup({
        scopes: ['https://aiexpense.onmicrosoft.com/Expense/Read'],
        prompt: 'select_account',
      });
    } catch (error) {
      console.error('Login error:', error);
      console.log('Error details:', JSON.stringify(error, null, 2));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    instance.logoutPopup();
  };

  return { isAuthenticated, login, logout, isLoggingIn };
};
