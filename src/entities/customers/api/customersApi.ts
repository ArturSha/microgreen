import { baseApi } from '@/shared/api';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClientList: build.query<string, string>({
      query: () => ({
        url: `/clients`,
        method: 'GET',
      }),
    }),
    postClient: build.mutation<string, string>({
      query: () => ({
        url: `/clients`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLazyGetClientListQuery, usePostClientMutation } = customersApi;
