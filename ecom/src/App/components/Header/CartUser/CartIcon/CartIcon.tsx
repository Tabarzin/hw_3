import { observer } from 'mobx-react-lite';
import { cartStore } from '@stores/CartStore';
import React from 'react';
import { NavLink } from 'react-router-dom';
import bag from '@assets/bag.svg';
import styles from './CartIcon.module.scss';

const CartIcon = observer(() => {
  const { cartItemCount } = cartStore;

  return (
    <div className={styles.cartIcon}>
      <NavLink to="/cart">
        <img src={bag} alt="Cart" />
        {cartItemCount > 0 && <span className={styles.itemCount}>{cartItemCount}</span>}
      </NavLink>
    </div>
  );
});

export default CartIcon;
