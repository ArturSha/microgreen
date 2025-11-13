import { ProductCard, ProductSkeleton, useGetProductsListQuery } from '@/entities/product';
import style from './ProductList.module.css';

export const ProductList = () => {
  const { data: productList, isLoading } = useGetProductsListQuery({ sort: 'name' });

  return (
    <div className={style.productList}>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        productList?.map((product) => <ProductCard product={product} key={product.id} />)
      )}
    </div>
  );
};
