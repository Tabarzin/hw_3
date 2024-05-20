import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/AuthStore';
import { useState } from 'react';
import avatar from '@assets/avatar.png';

import LoginRegisterForm from './LoginRegisterForm';
import Header from '@components/Header';

const UserProfile = observer(() => {
  const { session } = authStore;
  const user = session?.user;
  const [showLoginRegister, setShowLoginRegister] = useState(!user);

  const handleLogin = () => {
    // Handle login logic here
    setShowLoginRegister(false);
  };

  const handleRegister = () => {
    // Handle registration logic here
    setShowLoginRegister(false);
  };

  return (
    <div>
      <Header />
      {showLoginRegister ? (
        <LoginRegisterForm onLogin={handleLogin} onRegister={handleRegister} />
      ) : user ? (
        <div>
          <div>
            <img src={avatar} alt="Avatar" />
          </div>
          <div>
            <h2>Привет!</h2>
            <p>{user.email}</p>
          </div>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
});

export default UserProfile;
