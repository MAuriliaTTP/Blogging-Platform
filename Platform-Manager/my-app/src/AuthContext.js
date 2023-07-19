import React, { createContext, useState, useEffect } from 'react';
import { loginUser } from './api';
import useAuth from './useAuth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Destructuring the values from useAuth()
  const { user, login, logout } = useAuth();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    // and set the user state accordingly
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/check-authentication');
        if (response.ok) {
          const userData = await response.json();
          setAuthenticatedUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const userData = await loginUser(credentials);
      setAuthenticatedUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout');
      setAuthenticatedUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const authContextValue = {
    user: authenticatedUser,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    // Providing the authContextValue to be consumed by other components
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;