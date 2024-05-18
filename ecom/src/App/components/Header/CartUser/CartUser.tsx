import styles from './CartUser.module.scss';
import bag from '@assets/bag.svg';
import user from '@assets/user.svg';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cartStore } from '@stores/CartStore';
import CartIcon from '@components/Header/CartUser/CartIcon';

const CartUser = () => {
  return (
    <div className={styles.cartuser}>
      <CartIcon />
      <img src={user} alt="User" />
    </div>
  );
};

export default CartUser;
