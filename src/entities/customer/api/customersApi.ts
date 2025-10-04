import { ApiTags, baseApi } from '@/shared/api';
import { mapCustomer } from '../lib/mapCustomer';
import type {
  Customer,
  CustomerGetParams,
  CustomerPostForm,
  CustomerResponse,
} from '../model/types/customer';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClientList: build.query<Customer[], CustomerGetParams>({
      query: (params) => ({
        url: '/clients',
        method: 'GET',
        params,
      }),
      transformResponse: (response: CustomerResponse[]) =>
        response.map((customer) => mapCustomer(customer)),
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
      transformResponse: (response: CustomerResponse) => mapCustomer(response),
      invalidatesTags: [ApiTags.CLIENTS],
    }),
  }),
});

export const { useGetClientListQuery, usePostClientMutation, usePutClientMutation } = customersApi;
