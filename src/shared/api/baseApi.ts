import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiTags, type ApiTag } from './types/apiTags';

const isLocalDev = import.meta.env.VITE_IS_LOCAL !== 'true';
console.log(import.meta.env.VITE_IS_LOCAL);
const baseQuery = fetchBaseQuery({
  baseUrl: isLocalDev ? import.meta.env.VITE_BASE_API_URL_DEV : import.meta.env.VITE_BASE_API_URL,
  prepareHeaders: (headers) => {
    const apiKey = isLocalDev
      ? import.meta.env.VITE_BASE_API_KEY_DEV
      : import.meta.env.VITE_BASE_API_KEY;
    if (apiKey) {
      headers.set('x-apikey', apiKey);
    }
    return headers;
  },
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    return searchParams.toString();
  },
});

export const baseApi = createApi({
  tagTypes: Object.values(ApiTags) as ApiTag[],
  reducerPath: 'api',
  keepUnusedDataFor: 600,
  baseQuery,
  endpoints: () => ({}),
});
