import { NavLink, useLocation } from 'react-router-dom';
import styles from './NavbarLinks.module.scss';

const NavbarLinks = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.navbarlinks}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.navbarlinks_text} ${styles.active}` : styles.navbarlinks_text
        }
      >
        {({ isActive }) => <span className={isActive ? styles.active : ''}>Products</span>}
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive ? `${styles.navbarlinks_text} ${styles.active}` : styles.navbarlinks_text
        }
      >
        {({ isActive }) => <span className={isActive ? styles.active : ''}>Categories</span>}
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? `${styles.navbarlinks_text} ${styles.active}` : styles.navbarlinks_text
        }
      >
        {({ isActive }) => <span className={isActive ? styles.active : ''}>About us</span>}
      </NavLink>
    </nav>
  );
};

export default NavbarLinks;
