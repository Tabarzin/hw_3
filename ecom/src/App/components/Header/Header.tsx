import styles from './Header.module.scss';
import logo from '@assets/logo.svg';
import CartUser from './CartUser';
import { Link } from 'react-router-dom';
import NavbarLinks from '../NavbarLinks';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Lalasia Logo" />
      </Link>

      <NavbarLinks />
      <CartUser />
    </header>
  );
};

export default Header;
