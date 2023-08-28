import { Product } from "./Product";

export interface User {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
  name: string;
  cart?: Product[];
}