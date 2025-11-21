import { ApiTags, baseApi, type RestDBResponse, type BaseGetParams } from '@/shared/api';
import { mapOrder } from '../lib/mapOrder';
import type { Order, OrderPostBody, OrderResponse, PatchOrder } from '../model/types/order';

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
  usePostOrderMutation,
  useDeleteOrderMutation,
  usePatchOrderMutation,
  useBulkDeleteOrdersMutation,
} = orderApi;
