import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../api/userApi";

import styles from "../styles.module.scss";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const { mutate, data, isLoading } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (!data.errors) {
        return navigate("/login");
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    mutate(user);
  };

  return (
    <section className={styles.container}>
      <h4>Crie sua conta</h4>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.content}>
          <label>
            Nome / Empresa
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Confirme sua senha
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {data?.errors && <p className="message">{data?.errors[0]}</p>}
          <button type="submit" className="btn" disabled={isLoading}>
            {!isLoading ? "Criar conta" : "Aguarde"}
          </button>
        </div>
      </form>
      <p>
        Já possue conta? <Link to="/login">Clique aqui</Link>
      </p>
    </section>
  );
};

export default Register;
