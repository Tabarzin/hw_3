import styles from './Header.module.scss';
import logo from '@assets/logo.svg';
import CartUser from './CartUser';
import { Link } from 'react-router-dom';
import NavbarLinks from '../NavbarLinks';
import { useState } from 'react';

// const Header = () => {
//   return (
//     <header className={styles.header}>
//       <Link to="/">
//         <img src={logo} alt="Lalasia Logo" />
//       </Link>

//       <NavbarLinks />
//       <CartUser />
//     </header>
//   );
// };

// export default Header;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Lalasia Logo" />
      </Link>

      <div className={styles.burgerMenu} onClick={toggleMenu}>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
      </div>

      <nav className={isMenuOpen ? styles.navOpen : styles.navClosed}>
        <NavbarLinks />
      </nav>

      <CartUser />
    </header>
  );
};

export default Header;
