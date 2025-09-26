import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiTags, type ApiTag } from './types/apiTags';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  prepareHeaders: (headers) => {
    const apiKey = import.meta.env.VITE_BASE_API_KEY;
    if (apiKey) {
      headers.set('x-apikey', apiKey);
    }
    return headers;
  },
});

export const baseApi = createApi({
  tagTypes: Object.values(ApiTags) as ApiTag[],
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
