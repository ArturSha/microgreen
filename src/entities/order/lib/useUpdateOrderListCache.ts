import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { orderApi } from '../api/orderApi';
import type { Order } from '../model/types/order';

export const useUpdateOrderListCache = () => {
  const dispatch = useAppDispatch();

  const allQueryArgs = useAppSelector((state) => {
    const queries = state.api.queries;
    const entries = Object.entries(queries).filter(([key]) => key.startsWith('getOrderList'));
    return entries.map(
      ([, cache]) =>
        (cache as ReturnType<ReturnType<typeof orderApi.endpoints.getOrderList.select>>)
          .originalArgs,
    );
  });

  const sortOrders = (orders: Order[]) => {
    return orders.sort((a, b) => {
      if (a.isDelivered !== b.isDelivered) {
        return a.isDelivered ? 1 : -1;
      }
      const dateA = new Date(a.deliveryDate).getTime();
      const dateB = new Date(b.deliveryDate).getTime();
      return dateB - dateA;
    });
  };

  const updateOrderInCache = (id: string, updates: Partial<Order>) => {
    if (!allQueryArgs.length) return;

    allQueryArgs.forEach((queryArg) => {
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
    });
  };

  const removeOrderFromCache = (id: string) => {
    if (!allQueryArgs.length) {
      return;
    }

    allQueryArgs.forEach((queryArg) => {
      if (!queryArg) return;
      dispatch(
        orderApi.util.updateQueryData('getOrderList', queryArg, (draft) => {
          draft.data = draft.data.filter((o) => o.id !== id);
          draft.totals.total -= 1;
        }),
      );
    });
  };

  return { updateOrderInCache, removeOrderFromCache };
};
