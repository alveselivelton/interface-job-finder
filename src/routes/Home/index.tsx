import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../api/jobApi";

import Banner from "../../components/Banner";
import Job from "../../components/Job";

import { Data } from "../../types/job";

import styles from "./styles.module.scss";

const Home = () => {
  const { data } = useQuery<Data>({
    queryKey: ["jobs"],
    queryFn: () => getAll(),
  });

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
