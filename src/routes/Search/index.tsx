import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { search } from "../../api/jobApi";
import Job from "../../components/Job";
import { Data } from "../../types/job";

import styles from "./styles.module.scss";

const Search = () => {
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") as string;

  const { data } = useQuery<Data>({
    queryKey: ["search", q],
    queryFn: () => search(q),
  });

  return (
    <section className={styles.search_container}>
      <p className={styles.title}>
        Você pesquisou por: <span>{q}</span>
      </p>
      {data?.errors && <p className={styles.no_result}>{data.errors[0]}</p>}
      {data?.jobs && <Job jobs={data.jobs} />}
    </section>
  );
};

export default Search;
