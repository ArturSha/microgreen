import { useAppDispatch, useAppSelector } from '@/shared/model';
import { orderApi } from '../api/orderApi';
import type { Order } from '../model/types/order';

export const useUpdateOrderListCache = () => {
  const dispatch = useAppDispatch();

  const getOrderListState = useAppSelector((state) => {
    const queries = state.api.queries;
    const entries = Object.entries(queries).filter(([key]) => key.startsWith('getOrderList'));
    if (entries.length === 0) return undefined;
    const [, cache] = entries[0];
    return cache as ReturnType<ReturnType<typeof orderApi.endpoints.getOrderList.select>>;
  });

  const queryArg = getOrderListState?.originalArgs;

  const sortOrders = (orders: Order[]) => {
    return orders.sort((a, b) => {
      if (a.isDelivered !== b.isDelivered) {
        return a.isDelivered ? 1 : -1;
      }
      const dateA = new Date(a.deliveryDate).getTime();
      const dateB = new Date(b.deliveryDate).getTime();
      return dateA - dateB;
    });
  };

  const updateOrderInCache = (id: string, updates: Partial<Order>) => {
    if (!queryArg) return;
    dispatch(
      orderApi.util.updateQueryData('getOrderList', queryArg, (draft) => {
        const order = draft.data.find((o) => o.id === id);
        if (order) {
          Object.assign(order, updates);
        }
        draft.data = sortOrders(draft.data);
      }),
    );
  };

  const removeOrderFromCache = (id: string) => {
    if (!queryArg) {
      return;
    }

    dispatch(
      orderApi.util.updateQueryData('getOrderList', queryArg, (draft) => {
        draft.data = draft.data.filter((o) => o.id !== id);
        draft.totals.total -= 1;
      }),
    );
  };

  return { updateOrderInCache, removeOrderFromCache };
};
