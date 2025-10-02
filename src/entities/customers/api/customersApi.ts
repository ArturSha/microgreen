import { baseApi } from '@/shared/api';
import type { AddCustomerI } from '../model/types/addCustomer';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClientList: build.query<string, string>({
      query: () => ({
        url: `/clients`,
        method: 'GET',
      }),
    }),
    postClient: build.mutation<string, AddCustomerI>({
      query: (body) => ({
        url: `/clients`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetClientListQuery, usePostClientMutation } = customersApi;
