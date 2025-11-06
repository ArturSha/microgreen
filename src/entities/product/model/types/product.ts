import type { MongoUpdateOperators } from '@/shared/api';

export interface Product {
  name: string;
  price: number;
  quantity: number;
  id: string;
}

export type ProductUpdateForm = Omit<Product, 'id'> & { _id: string };
export type ProductPostForm = Omit<Product, 'id'>;
export type ProductPatch = Partial<ProductPostForm> | MongoUpdateOperators<ProductPostForm>;

export interface ProductResponse {
  name: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface ProductGetParams {
  metafields?: boolean;
}
