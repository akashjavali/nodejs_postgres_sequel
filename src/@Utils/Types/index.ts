export type UserT = {
  id?: number;
  name: string;
  email: string;
  password: string;
  roles?: {
    User: string;
  };
  refreshToken?: string;
};

export type ProductT = {
  id?: number;
  name: string;
  description: string;
  published: boolean;
  image: string;
  price: number;
  rating: number;
  createdBy: number;
  updatedBy?: number;
};

export type RoleT = {
  name: string;
  description: string | null;
};
