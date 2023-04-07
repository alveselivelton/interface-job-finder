export type UserProps = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type Data = {
  user?: UserProps;
  msg?: string;
  _id?: string;
  token?: string;
  errors?: string[];
};
