export {
  useGetProductsListQuery,
  useLazyGetProductsListQuery,
  usePostProductMutation,
  useUpdateProductListMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} from './api/productApi';
export { ProductCard } from './ui/productCard/ProductCard';
export type { ProductPostForm, Product, ProductUpdateForm } from './model/types/product';
export { ProductQuantity } from './ui/productQuantity/ProductQuantity';
export { ProductSkeleton } from './ui/productSkeleton/ProductSkeleton';
export { useUpdateProductList } from './hooks/useUpdateProductList';
