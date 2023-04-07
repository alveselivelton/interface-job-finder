export type JobProps = {
  _id?: string;
  title: string;
  description?: string;
  company: string;
  email?: string;
  experience: string;
  workingModel?: string;
  salary?: number;
  userId?: string;
};

export type Data = {
  job?: JobProps;
  jobs?: JobProps[];
  msg?: string;
  errors?: string[];
};
