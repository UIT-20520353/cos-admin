export type IAccount = {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  role_id: number;
  host_id: number | null;
};

export type IManageAccount = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  host_id: number | null;
  role_name: string;
};
