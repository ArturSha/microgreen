import type { Customer } from '@/entities/customer';
import type { Product } from '@/entities/product';

export interface Order {
  customer: Customer;
  products: Product[];
  totalPrice: number;
  isDelivered: boolean;
  isPaid: boolean;
  id: string;
}

export type OrderPostForm = Omit<Order, 'id'>;
