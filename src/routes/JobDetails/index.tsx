import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getById } from "../../api/jobApi";
import { Data } from "../../types/job";
import { remove } from "../../api/jobApi";
import { useAuthStore } from "../../app/authStore";

import Loading from "../../components/Loading";

import styles from "./styles.module.scss";

const JobDetails = () => {
  const auth = useAuthStore((state) => state.auth);
  const userId = useAuthStore((state) => state.userId);
  const checkUser = useAuthStore((state) => state.checkUser);

  useEffect(() => {
    checkUser();
  }, []);

  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Data>({
    queryKey: ["job", id],
    queryFn: () => getById(String(id)),
  });

  const { mutate } = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userJobs"] });
      navigate("/dashboard");
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (isLoading) return <Loading />;

  return (
    <section className={styles.job_details}>
      <img src="../img/company.svg" alt="Ícone de um prédio" />
      <div className={styles.info}>
        <h4 className={styles.title}>{data?.job?.title}</h4>
        <p>
          <strong>Descrição da vaga:</strong> {data?.job?.description}
        </p>
        <p>
          <strong>Contratante:</strong> <span>{data?.job?.company}</span>
        </p>
        <p>
          <strong>Tipo de trabalho:</strong> {data?.job?.workingModel}
        </p>
        <p>
          <strong>Nível de experiência exigido:</strong> {data?.job?.experience}
        </p>
        <p>
          <strong>Salário:</strong> R$ {data?.job?.salary},00
        </p>
        <p>
          <strong>Envie seu currículo para:</strong>{" "}
          <span>{data?.job?.email}</span>
        </p>
      </div>
      {auth && data?.job?.userId === userId && (
        <div className={styles.actions}>
          <Link
            to={`/edit/${data?.job?._id}/${data?.job?.userId}`}
            className="btn"
          >
            Editar
          </Link>
          <button
            className="btn"
            onClick={() => handleDelete(String(data?.job?._id))}
          >
            Deletar
          </button>
        </div>
      )}
    </section>
  );
};

export default JobDetails;
