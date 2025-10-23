import { ApiTags, baseApi, type BaseGetParams } from '@/shared/api';
import { mapOrder } from '../lib/mapOrder';
import type { Order, OrderPostForm, OrderResponse, PatchOrder } from '../model/types/order';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderList: build.query<Order[], BaseGetParams>({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params,
      }),
      transformResponse: (response: OrderResponse[]) =>
        response.map((customer) => mapOrder(customer)),
      providesTags: [ApiTags.ORDERS],
    }),
    postOrder: build.mutation<Order, OrderPostForm>({
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
      invalidatesTags: [ApiTags.ORDERS],
    }),
    deleteOrder: build.mutation<Order, { id: string }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
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
} = orderApi;
