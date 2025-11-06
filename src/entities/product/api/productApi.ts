import { ApiTags, baseApi, type BaseGetParams } from '@/shared/api';
import { mapCustomer } from '../lib/mapProduct';
import type {
  Product,
  ProductPatch,
  ProductPostForm,
  ProductResponse,
  ProductUpdateForm,
} from '../model/types/product';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductsList: build.query<Product[], BaseGetParams>({
      query: (params) => ({
        url: '/products1',
        method: 'GET',
        params,
      }),
      transformResponse: (response: ProductResponse[]) => response.map(mapCustomer),
      providesTags: [ApiTags.PRODUCT],
    }),
    postProduct: build.mutation<Product, ProductPostForm>({
      query: (body) => ({
        url: '/products1',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ProductResponse) => mapCustomer(response),
      invalidatesTags: [ApiTags.PRODUCT],
    }),
    updateProductList: build.mutation<Product, ProductUpdateForm[]>({
      query: (body) => ({
        url: '/products1',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ApiTags.PRODUCT],
    }),
    patchProduct: build.mutation<Product, { body: ProductPatch; id: string }>({
      query: ({ body, id }) => ({
        url: `/products1/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [ApiTags.PRODUCT],
      transformResponse: (response: ProductResponse) => mapCustomer(response),
    }),
    deleteProduct: build.mutation<Product, string>({
      query: (id) => ({
        url: `/products1/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ApiTags.PRODUCT],
      transformResponse: (response: ProductResponse) => mapCustomer(response),
    }),
  }),
});

export const {
  useGetProductsListQuery,
  usePostProductMutation,
  useUpdateProductListMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = productApi;
