import { Product } from './Product';
export interface Order {
    shippingDetails: {
      name: string;
      address: string;
    };
    cart: Product[];
    total: number;
  }
  