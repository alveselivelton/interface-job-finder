import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useAuthStore } from "../../app/authStore";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const auth = useAuthStore((state) => state.auth);
  const userId = useAuthStore((state) => state.userId);
  const checkUser = useAuthStore((state) => state.checkUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    checkUser();
  }, []);

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
              <Link to={`/post/${userId}`} className="btn">
                Abrir Vaga
              </Link>
            </li>
          )}
          <li onClick={handleToggleMenu}>
            <Link to={auth ? "/dashboard" : "/login"}>Perfil</Link>
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
