import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Navbar from "../Navbar";

import styles from "./styles.module.scss";

const Layout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
