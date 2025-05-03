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
