import axios from "axios";

import { Data, JobProps } from "../types/job";

const jobApi = axios.create({
  baseURL: "https://api-job-finder.vercel.app/api/jobs",
  headers: {
    "Content-Type": "application/json",
  },
});

export const create = async (data: JobProps): Promise<Data> => {
  const response = await jobApi
    .post<Data>("/", data)
    .catch((err) => err.response);

  return response.data;
};

export const getAll = async (): Promise<Data> => {
  const response = await jobApi.get<Data>("/").catch((err) => err.response);

  return response.data;
};

export const getById = async (id: string): Promise<Data> => {
  const response = await jobApi
    .get<Data>(`/${id}`)
    .catch((err) => err.response);

  return response.data;
};

export const search = async (query: string): Promise<Data> => {
  const response = await jobApi
    .get<Data>(`/search?q=${query}`)
    .catch((err) => err.response);

  return response.data;
};

export const update = async (data: Data, id: string): Promise<Data> => {
  const response = await jobApi
    .put<Data>(`/${id}`, data)
    .catch((err) => err.response);

  return response.data;
};

export const remove = async (id: string): Promise<Data> => {
  const response = await jobApi
    .delete<Data>(`/${id}`)
    .catch((err) => err.response);

  return response.data;
};
