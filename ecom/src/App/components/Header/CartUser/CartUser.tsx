import styles from './CartUser.module.scss';
import bag from 'assets/bag.svg';
import user from 'assets/user.svg';

const CartUser = () => {
  return (
    <div className={styles.cartuser}>
      <img src={bag} alt="Cart" />

      <img src={user} alt="User" />
    </div>
  );
};

export default CartUser;
