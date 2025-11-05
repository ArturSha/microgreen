import { ApiTags, baseApi, type BaseGetParams } from '@/shared/api';
import { mapCustomer } from '../lib/mapProduct';
import type {
  Product,
  ProductPostForm,
  ProductResponse,
  ProductUpdateForm,
} from '../model/types/product';

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
    postProduct: build.mutation<Product, ProductPostForm>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ProductResponse) => mapCustomer(response),
      invalidatesTags: [ApiTags.PRODUCT],
    }),
    updateProductList: build.mutation<Product, ProductUpdateForm[]>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
        params: { validate: false },
      }),
      transformResponse: (response: ProductResponse) => mapCustomer(response),
      invalidatesTags: [ApiTags.PRODUCT],
    }),
  }),
});

export const { useGetProductsListQuery, usePostProductMutation, useUpdateProductListMutation } =
  productApi;
