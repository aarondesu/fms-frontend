export type AdminUser = {
  id: number;
  username: string;
  created_at: string;
};

export type Service = {
  id: number;
  name: string;
  unit_type: string;
  rate: number;
};

export type PaginateQueryResults<T> = {
  list: T[];
  lastPage: number;
};

export type PaginateQueryArgs = {
  page?: number;
  search?: string;
};

export type AdminUserLoginArgs = {
  username: string;
  password: string;
};

export type AdminUserChangePasswordArgs = {
  oldPassword: string;
  newPassword: string;
};
