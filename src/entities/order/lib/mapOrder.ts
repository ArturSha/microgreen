import type { RestDBResponse } from '@/shared/api';
import type { Order, OrderResponse } from '../model/types/order';

export const mapOrder = (response: RestDBResponse<OrderResponse>): RestDBResponse<Order> => {
  const newData = response.data.map((order) => {
    const { _id, ...rest } = order;
    return { id: _id, ...rest };
  });
  return { data: newData, totals: response.totals };
};
