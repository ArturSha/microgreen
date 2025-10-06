import { ApiTags, baseApi, type BaseGetParams } from '@/shared/api';
import { mapCustomer } from '../lib/mapProduct';
import type { Product, ProductResponse } from '../model/types/product';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductsList: build.query<Product[], BaseGetParams>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      transformResponse: (response: ProductResponse[]) => response.map(mapCustomer),
      providesTags: [ApiTags.PRODUCT],
    }),
  }),
});

export const { useGetProductsListQuery } = productApi;
