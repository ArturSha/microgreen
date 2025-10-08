export interface Product {
  name: string;
  price: number;
  quantity: number;
  id: string;
}

export type ProductPostForm = Omit<Product, 'id'>;

export interface ProductResponse {
  name: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface ProductGetParams {
  metafields?: boolean;
}
