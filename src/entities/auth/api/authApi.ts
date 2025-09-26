import { baseApi } from '@/shared/api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<string, string>({
      query: (id) => ({
        url: `/auth/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetUserQuery } = authApi;
