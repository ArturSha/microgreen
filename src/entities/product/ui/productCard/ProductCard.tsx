import { useEffect, useState } from 'react';
import { CURRENCY } from '@/shared/const';
import { useDebounce } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import type { Product } from '../../model/types/product';
import style from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, quantity } = product;
  const [productQuantity, setProductQuantity] = useState(quantity);
  const debounce = useDebounce(productQuantity);

  useEffect(() => {
    if (debounce) {
      console.log('Отправляем запрос:', debounce);
    }
  }, [debounce]);

  return (
    <div className={style.productCard}>
      <Text className={style.cell} as="span">
        {name}
      </Text>
      <Text className={style.cell} as="span">
        {price} {CURRENCY}
      </Text>
      <div className={style.controlPanel}>
        <Button variant="clear" onClick={() => setProductQuantity((prev) => prev - 1)}>
          -
        </Button>
        <Text as="span">{productQuantity}</Text>
        <Button variant="clear" onClick={() => setProductQuantity((prev) => prev + 1)}>
          +
        </Button>
      </div>
    </div>
  );
};
