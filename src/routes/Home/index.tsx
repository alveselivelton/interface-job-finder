import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../api/jobApi";
import { Data } from "../../types/job";

import Banner from "../../components/Banner";
import Job from "../../components/Job";
import Loading from "../../components/Loading";

import styles from "./styles.module.scss";
import { useAuthStore } from "../../app/authStore";
import { useEffect } from "react";

const Home = () => {
  const checkUser = useAuthStore((state) => state.checkUser);

  useEffect(() => {
    checkUser();
  }, []);

  const { data, isLoading } = useQuery<Data>({
    queryKey: ["jobs"],
    queryFn: () => getAll(),
  });

  if (isLoading) return <Loading />;

  return (
    <section className={styles.container}>
      <Banner />
      <h2>Veja as nossas vagas mais recentes</h2>
      {!data?.jobs && <p className={styles.no_result}>Ainda não há vagas</p>}
      {data?.jobs && <Job jobs={data.jobs} />}
    </section>
  );
};

export default Home;
