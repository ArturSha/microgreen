import { ApiTags, baseApi, type BaseGetParams } from '@/shared/api';
import { mapCustomer } from '../lib/mapCustomer';
import type { Customer, CustomerPostForm, CustomerResponse } from '../model/types/customer';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClientList: build.query<Customer[], BaseGetParams>({
      query: (params) => ({
        url: '/clients',
        method: 'GET',
        params,
      }),
      transformResponse: (response: CustomerResponse[]) =>
        response.map((customer) => mapCustomer(customer)),
      providesTags: [ApiTags.CLIENTS],
    }),
    getClient: build.query<Customer, { params: BaseGetParams; id: string }>({
      query: ({ params, id }) => ({
        url: `/clients/${id}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: CustomerResponse) => mapCustomer(response),
      providesTags: [ApiTags.CLIENTS],
    }),
    postClient: build.mutation<Customer, CustomerPostForm>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        body,
      }),
      transformResponse: (response: CustomerResponse) => mapCustomer(response),
      invalidatesTags: [ApiTags.CLIENTS],
    }),
    putClient: build.mutation<Customer, { body: CustomerPostForm; id: string }>({
      query: ({ body, id }) => ({
        url: `/clients/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [ApiTags.CLIENTS],
    }),
    deleteClient: build.mutation<Customer, { id: string }>({
      query: ({ id }) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ApiTags.CLIENTS],
    }),
  }),
});

export const {
  useGetClientListQuery,
  useGetClientQuery,
  usePostClientMutation,
  usePutClientMutation,
  useDeleteClientMutation,
} = customersApi;
