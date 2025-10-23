import type { Order, OrderResponse } from '../model/types/order';

export const mapOrder = (order: OrderResponse): Order => {
  const { _id, ...rest } = order;
  return {
    id: _id,
    ...rest,
  };
};
