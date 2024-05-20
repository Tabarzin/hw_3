import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/AuthStore';
import { useState } from 'react';
import avatar from '@assets/avatar.png';

import LoginRegisterForm from './LoginRegisterForm';
import Header from '@components/Header';
import Button from '@components/Button';

const UserProfile = observer(() => {
  const { session, logout } = authStore;
  const user = session?.user;
  const [showLoginRegister, setShowLoginRegister] = useState(!user);

  const handleLogin = () => {
    setShowLoginRegister(false);
  };

  const handleLogout = async () => {
    await logout();
    setShowLoginRegister(true);
  };

  const handleRegister = () => {
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
            <Button onClick={handleLogout}> Log out</Button>
          </div>
        </div>
      ) : (
        <p>Please, check your email.</p>
      )}
    </div>
  );
});

export default UserProfile;
