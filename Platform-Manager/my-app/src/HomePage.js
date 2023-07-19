import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access the protected content.</p>
      )}
    </div>
  );
};

export default HomePage;