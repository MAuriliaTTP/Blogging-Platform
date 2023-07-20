import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/routes/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        // Registration successful, now log in the user with the registered credentials
        await login({ email, password });

        // Redirect to the homepage after successful registration and login
        // The AuthProvider should update the user state upon successful login and redirect to the homepage
      } else {
        // Registration failed, handle error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      // Handle network error
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;