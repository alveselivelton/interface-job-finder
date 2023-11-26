import axios from "axios";
import { Data, UserProps } from "../types/user";
import { Data as JobsData } from "../types/job";

const userApi = axios.create({
  baseURL: "https://jobfinder-hrnl.onrender.com/api/users",
  headers: {
    "Content-type": "application/json",
  },
});

export const register = async (data: UserProps): Promise<Data> => {
  const response = await userApi
    .post<Data>("/register", data)
    .catch((err) => err.response);

  return response.data;
};

export const login = async (data: UserProps): Promise<Data> => {
  const response = await userApi
    .post<Data>("/login", data)
    .catch((err) => err.response);

  return response.data;
};

export const getCurrentUser = async (token: string): Promise<UserProps> => {
  const response = await userApi
    .get<UserProps>("/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => err.response);

  return response.data;
};

export const getUserJobs = async (
  id: string,
  token: string
): Promise<JobsData> => {
  const response = await userApi
    .get<JobsData>(`/dashboard/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => err.response);

  return response.data;
};
