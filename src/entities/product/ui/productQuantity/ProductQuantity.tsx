import type { UseFormSetValue } from 'react-hook-form';
import type { HandleQuantityChangeProps } from '@/features/manageOrder';
import type { OrderPostForm } from '@/entities/order';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import type { Product } from '../../model/types/product';
import style from './ProductQuantity.module.css';

interface ProductQuantityProps {
  product: Product;
  quantity: number;
  products: Product[];
  setValue: UseFormSetValue<OrderPostForm>;
  onChange: ({ newValue, product, setValue, products }: HandleQuantityChangeProps) => void;
}

export const ProductQuantity = ({
  product,
  quantity,
  products,
  onChange,
  setValue,
}: ProductQuantityProps) => {
  return (
    <div className={style.productRow}>
      <Text>{product.name}</Text>

      <div className={style.quantityControls}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onChange({ newValue: -1, product, products, setValue })}
        >
          −
        </Button>

        <Input
          type="number"
          min={0}
          className={style.quantityInput}
          value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            const validValue = isNaN(value) ? 0 : Math.max(0, value);
            onChange({
              newValue: validValue - quantity,
              product,
              products,
              setValue,
            });
          }}
        />

        <Button
          type="button"
          variant="secondary"
          onClick={() => onChange({ newValue: 1, product, products, setValue })}
        >
          +
        </Button>
      </div>
    </div>
  );
};
