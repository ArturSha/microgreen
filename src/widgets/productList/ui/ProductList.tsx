import { ProductCard, useGetProductsListQuery } from '@/entities/product';
import style from './ProductList.module.css';

export const ProductList = () => {
  const { data } = useGetProductsListQuery({});

  return (
    <div className={style.productList}>
      {data?.map((product) => (
        <ProductCard name={product.name} />
      ))}
    </div>
  );
};
