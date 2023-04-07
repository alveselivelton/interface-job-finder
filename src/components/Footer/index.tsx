import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Job Finder &copy; 2023</p>
      <p>
        Criado por: <span>Elivelton Alves</span>
      </p>
    </footer>
  );
};

export default Footer;
