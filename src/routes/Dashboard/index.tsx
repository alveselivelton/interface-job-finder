import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../app/authStore";
import { getCurrentUser, getUserJobs } from "../../api/userApi";
import Job from "../../components/Job";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const token = useAuthStore((state) => state.token);
  const checkUser = useAuthStore((state) => state.checkUser);

  useEffect(() => {
    checkUser();
  }, []);

  const { data } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getCurrentUser(token),
    enabled: !!token,
  });

  const id = data?._id as string;

  const { data: JobsData, isLoading } = useQuery({
    queryKey: ["userJobs", id, token],
    queryFn: () => getUserJobs(id, token),
    enabled: !!id,
  });

  if (isLoading) return <p>Carregando</p>;

  return (
    <section className={styles.dashboard_container}>
      <p className={styles.title}>Olá {data?.name}, essas são as suas vagas</p>
      {JobsData?.errors && (
        <p className={styles.no_result}>{JobsData.errors[0]}</p>
      )}
      {JobsData?.jobs && <Job jobs={JobsData.jobs} />}
    </section>
  );
};

export default Dashboard;
