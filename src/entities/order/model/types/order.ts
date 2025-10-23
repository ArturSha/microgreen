import type { Customer } from '@/entities/customer';
import type { Product } from '@/entities/product';

export interface Order {
  customer: Customer;
  products: Product[];
  totalPrice: number;
  isDelivered: boolean;
  isPaid: boolean;
  id: string;
  deliveryDate: Date;
}

export type OrderPostForm = Omit<Order, 'id' | 'isPaid' | 'isDelivered' | 'totalPrice'>;
export type OrderPostBody = Omit<Order, 'id'>;
export type PatchOrder = Partial<OrderPostBody> & { id: string };

export interface OrderResponse {
  customer: Customer;
  products: Product[];
  totalPrice: number;
  isDelivered: boolean;
  isPaid: boolean;
  _id: string;
  deliveryDate: Date;
}
