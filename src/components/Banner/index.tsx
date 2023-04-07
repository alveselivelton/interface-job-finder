import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const Banner = () => {
  const [search, setSearch] = useState<string | null>("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      return navigate(`/search?q=${search}`);
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <h1>Encontre o emprego dos seus sonhos</h1>
        <p>Somos o site com mais vagas de tecnologia do mercado</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search || ""}
          placeholder="Digite a vaga que está buscando"
        />
        <button type="submit" className="btn">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Banner;
