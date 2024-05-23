import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/AuthStore';
import { useState } from 'react';
import avatar from '@assets/avatar.png';

import LoginRegisterForm from './LoginRegisterForm';
import Header from '@components/Header';
import Button from '@components/Button';
import styles from './UserProfile.module.scss';

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
      {' '}
      <Header />
      <div className={styles.user_profile}>
        {showLoginRegister ? (
          <div className={styles.login_register_form}>
            <LoginRegisterForm onLogin={handleLogin} onRegister={handleRegister} />
          </div>
        ) : user ? (
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src={avatar} alt="Avatar" />
            </div>
            <div className={styles.details}>
              <h2>Привет!</h2>
              <p>{user.email}</p>
              <Button className={styles.logout_button} onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <p>Please, check your email.</p>
        )}

        {!showLoginRegister && user && (
          <div className={styles.orders}>
            <h3>Your Orders</h3>

            <div className={styles.order}>
              <p>Order #12345</p>
              <p>Status: Shipped</p>
              <p>Total: $99.99</p>
            </div>
            <div className={styles.order}>
              <p>Order #67890</p>
              <p>Status: Processing</p>
              <p>Total: $49.99</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default UserProfile;
