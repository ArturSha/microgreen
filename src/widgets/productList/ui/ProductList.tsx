import { ProductCard, ProductSkeleton, useGetProductsListQuery } from '@/entities/product';
import style from './ProductList.module.css';

export const ProductList = () => {
  const { data: productList, isFetching } = useGetProductsListQuery({ sort: 'name' });

  return (
    <div className={style.productList}>
      {isFetching ? (
        <ProductSkeleton />
      ) : (
        productList?.map((product) => <ProductCard product={product} key={product.id} />)
      )}
    </div>
  );
};
