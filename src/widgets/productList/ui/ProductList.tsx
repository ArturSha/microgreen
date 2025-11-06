import { ProductCard, useGetProductsListQuery } from '@/entities/product';
import style from './ProductList.module.css';

export const ProductList = () => {
  const { data: productList } = useGetProductsListQuery({ sort: 'name' });

  return (
    <div className={style.productList}>
      {productList?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
