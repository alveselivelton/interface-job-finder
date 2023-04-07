import { Link } from "react-router-dom";
import { Data } from "../../types/job";

import styles from "./styles.module.scss";

const Job = (data: Data) => {
  return (
    <ul className={styles.job}>
      {data?.jobs?.map((job) => (
        <li className={styles.job_info} key={job._id}>
          <img src="img/company.svg" alt="Ícone de um prédio" />
          <div className={styles.description}>
            <p>
              Contratante: <span>{job.company}</span>
            </p>
            <h4>{job.title}</h4>
            <p>
              Nível de experiência: <span>{job.experience}</span>
            </p>
          </div>
          <Link to={`/job/${job._id}`} className="btn">
            Ver Vaga
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Job;
