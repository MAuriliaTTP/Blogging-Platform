import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Implement the logic to check if the user is logged in
    // You can use the session cookie or localStorage to store the user token
    // For demo purposes, we'll use localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Assuming the token contains user information, set the user state
      // In a real-world scenario, you should validate the token on the server-side
      // and return the user information from the server.
      setUser({ username: 'JohnDoe' });
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Make a POST request to the server to log in
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful, handle next steps
        // Assuming the server returns a user object, set the user state
        const user = await response.json();
        setUser(user);

        // Save the token to localStorage for future authentication
        localStorage.setItem('token', user.token);
      } else {
        // Login failed, handle error
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
      // Handle network error
    }
  };

  const logout = () => {
    // Implement the logout logic on the server-side, and clear the user state
    // For demo purposes, we'll just remove the token from localStorage
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;