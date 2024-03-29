import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/userApi";

import styles from "../styles.module.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["userJobs"] });

  const navigate = useNavigate();

  const { mutate, data, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data.errors) {
        localStorage.setItem("user", JSON.stringify(data));
        queryClient.invalidateQueries({ queryKey: ["userJobs"] });
        return navigate("/dashboard");
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    mutate(user);
  };

  return (
    <section className={styles.container}>
      <h4>Entre com sua conta</h4>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.content}>
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
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {data?.errors && <p className="message">{data?.errors[0]}</p>}
          <button type="submit" className="btn" disabled={isLoading}>
            {!isLoading ? "Login" : "Aguarde"}
          </button>
        </div>
      </form>
      <p>
        Ainda não tem conta? <Link to="/register">Clique aqui</Link>
      </p>
    </section>
  );
};

export default Login;
