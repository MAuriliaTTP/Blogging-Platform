import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, history } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from the AuthContext to perform the login
      await login(email, password);

      // Redirect to the homepage upon successful login
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;