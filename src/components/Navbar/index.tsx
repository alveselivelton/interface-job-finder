import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../app/authStore";
import { HiMenu } from "react-icons/hi";

import styles from "./styles.module.scss";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { _id } = useAuthStore((state) => state.user);
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const handleToggleMenu = () => {
    if (!openMenu) {
      setOpenMenu(true);
      return;
    }

    setOpenMenu(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo} onClick={() => setOpenMenu(false)}>
          Job Finder
        </Link>
        <ul
          className={openMenu ? `${styles.menu} ${styles.active}` : styles.menu}
        >
          <li onClick={handleToggleMenu}>
            <Link to="/">Home</Link>
          </li>
          {auth && (
            <li onClick={handleToggleMenu}>
              <Link to={`/post/${_id}`} className="btn">
                Abrir Vaga
              </Link>
            </li>
          )}
          <li onClick={handleToggleMenu}>
            <Link to={auth ? "/dashboard" : "/login"}>Dashboard</Link>
          </li>
          {auth && (
            <li onClick={handleToggleMenu}>
              <Link
                to="/"
                onClick={() => {
                  logout(), handleToggleMenu();
                }}
              >
                Sair
              </Link>
            </li>
          )}
        </ul>
        <button className={styles.hamburger} onClick={handleToggleMenu}>
          <HiMenu />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
