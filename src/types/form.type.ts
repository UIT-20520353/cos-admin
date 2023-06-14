export type ILoginForm = {
  username: string;
  password: string;
};

export type IAccountForm = {
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  host_id: number | null;
  username: string;
  host_name: string;
};

export type IHostForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
};
