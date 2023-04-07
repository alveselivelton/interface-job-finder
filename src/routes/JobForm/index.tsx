import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../../api/jobApi";

import styles from "./styles.module.scss";

const JobForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [salary, setSalary] = useState<number>();
  const [experience, setExperience] = useState<string>("");
  const [workingModel, setWorkingModel] = useState<string>("");

  const { userId } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, data, isLoading } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      if (!data.errors) {
        queryClient.invalidateQueries({ queryKey: ["userJobs"] });
        return navigate("/dashboard");
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const job = {
      title,
      description,
      company,
      email,
      salary,
      experience,
      workingModel,
      userId,
    };

    mutate(job);
  };

  return (
    <section className={styles.container}>
      <h4>Crie sua vaga</h4>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.content}>
          <label>
            Título da vaga
            <input
              type="text"
              placeholder="Pense em um bom título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Contratante
            <input
              type="text"
              placeholder="Digite o nome da empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <label>
            Salário oferecido
            <input
              type="number"
              placeholder="Apenas números, sem vírgula. Ex: 3000"
              value={salary || ""}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </label>
          <label>
            E-mail para contato
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Tipo de Trabalho
            <select
              name="workingModel"
              value={workingModel}
              onChange={(e) => setWorkingModel(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </label>
          <label>
            Nível de experiência
            <select
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Estagiário">Estagiário</option>
              <option value="Júnior">Júnior</option>
              <option value="Pleno">Pleno</option>
              <option value="Sênior">Sênior</option>
            </select>
          </label>
          <label>
            Descreava a vaga
            <textarea
              rows={6}
              placeholder="Faça uma breve descrição sobre a vaga"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          {data?.errors && <p className="message">{data?.errors[0]}</p>}
          <button type="submit" className="btn" disabled={isLoading}>
            {!isLoading ? "Criar vaga" : "Aguarde"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default JobForm;
