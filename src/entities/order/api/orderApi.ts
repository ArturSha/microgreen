import { ApiTags, baseApi, type BaseGetParams } from '@/shared/api';
import type { Order, OrderPostForm } from '../model/types/order';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderList: build.query<Order[], BaseGetParams>({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params,
      }),
      //   transformResponse: (response: CustomerResponse[]) =>
      //     response.map((customer) => mapCustomer(customer)),
      providesTags: [ApiTags.ORDERS],
    }),
    postOrder: build.mutation<Order, OrderPostForm>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      //   transformResponse: (response: CustomerResponse[]) =>
      //     response.map((customer) => mapCustomer(customer)),
      invalidatesTags: [ApiTags.ORDERS],
    }),
  }),
});

export const { useGetOrderListQuery, usePostOrderMutation } = orderApi;
