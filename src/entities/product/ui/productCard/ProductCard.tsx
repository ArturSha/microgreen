import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import type { Product } from '../../model/types/product';
import style from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, quantity } = product;
  return (
    <div className={style.productCard}>
      <Text className={style.cell} as="span">
        {name}
      </Text>
      <Text className={style.cell} as="span">
        {price} &#8382;
      </Text>
      <div className={style.controlPanel}>
        <Button variant="clear">-</Button>
        <Text as="span">{quantity}</Text>
        <Button variant="clear">+</Button>
      </div>
    </div>
  );
};
