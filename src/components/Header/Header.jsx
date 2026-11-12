import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h2 className={styles.logo}>
          Deep<span className={styles.logoHighlight}>Plot</span>
        </h2>
      </Link>

      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink}${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive ? `${styles.navLink}${styles.active}` : styles.navLink
              }
            >
              Favoritos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;