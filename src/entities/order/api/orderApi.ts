import { ApiTags, baseApi, type RestDBResponse, type BaseGetParams } from '@/shared/api';
import { mapOrder } from '../lib/mapOrder';
import type {
  Order,
  OrderListGroupBy,
  OrderPostBody,
  OrderResponse,
  PatchOrder,
} from '../model/types/order';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderList: build.query<RestDBResponse<Order>, BaseGetParams>({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params,
      }),
      transformResponse: (response: RestDBResponse<OrderResponse>) => mapOrder(response),
      providesTags: [ApiTags.ORDERS],
    }),
    getOrderSum: build.query<{ sumTotalPrice: number }, BaseGetParams>({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params: { ...params, h: JSON.stringify({ $aggregate: ['SUM:totalPrice'] }) },
      }),
      transformResponse: (res: Record<string, number>) => ({
        sumTotalPrice: res['SUM totalPrice'],
      }),
      providesTags: [ApiTags.ORDERS],
    }),
    getOrderArchive: build.query<OrderListGroupBy, BaseGetParams>({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params: { ...params, h: JSON.stringify({ $groupby: ['customer.name'] }) },
      }),
      providesTags: [ApiTags.ORDERS],
    }),
    postOrder: build.mutation<Order, OrderPostBody>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ApiTags.ORDERS],
    }),
    patchOrder: build.mutation<Order, PatchOrder>({
      query: ({ id, ...rest }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: rest,
      }),
    }),
    deleteOrder: build.mutation<Order, { id: string }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
    }),
    bulkDeleteOrders: build.mutation<string[], string[]>({
      query: (ids) => ({
        url: '/orders/*',
        method: 'DELETE',
        body: ids,
      }),
      invalidatesTags: [ApiTags.ORDERS],
    }),
  }),
});

export const {
  useGetOrderListQuery,
  useGetOrderSumQuery,
  useLazyGetOrderArchiveQuery,
  usePostOrderMutation,
  useDeleteOrderMutation,
  usePatchOrderMutation,
  useBulkDeleteOrdersMutation,
} = orderApi;
