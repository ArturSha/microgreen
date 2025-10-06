import type { Product, ProductResponse } from '../model/types/product';

export const mapCustomer = (data: ProductResponse): Product => ({
  id: data._id,
  name: data.name,
  price: data.price,
  quantity: data.quantity,
});
