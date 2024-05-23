import styles from './CartUser.module.scss';
import userPlaceholderImage from '@assets/user.svg';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from '@components/Header/CartUser/CartIcon';
import userLoggedInImage from '@assets/user_logged.svg';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/AuthStore';

const CartUser = observer(() => {
  const isAuthenticated = authStore.isAuthenticated;
  const userImage = isAuthenticated ? userLoggedInImage : userPlaceholderImage;

  return (
    <div className={styles.cartuser}>
      <CartIcon />
      <NavLink to="/profile">
        <img src={userImage} alt="User" className={styles.user} />
      </NavLink>
    </div>
  );
});

export default CartUser;
