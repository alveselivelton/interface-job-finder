import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../app/authStore";
import { getCurrentUser, getUserJobs } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

import Job from "../../components/Job";
import Loading from "../../components/Loading";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const { token, _id } = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const checkUser = useAuthStore((state) => state.checkUser);

  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const { data } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getCurrentUser(token),
    enabled: !!token,
    onSuccess: (data) => {
      if (!data._id) {
        logout();
        return navigate("/login");
      }
    },
  });

  const { data: JobsData, isLoading } = useQuery({
    queryKey: ["userJobs", _id, token],
    queryFn: () => getUserJobs(_id, token),
    enabled: !!_id,
  });

  if (isLoading) return <Loading />;

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
