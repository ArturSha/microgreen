import type { UseFormSetValue } from 'react-hook-form';
import type { OrderPostForm } from '@/entities/order';
import type { Product } from '@/entities/product';

export interface HandleQuantityChangeProps {
  product: Product;
  newValue: number;
  setValue: UseFormSetValue<OrderPostForm>;
  products: Product[];
}

export const handleQuantityChange = ({
  newValue,
  product,
  setValue,
  products,
}: HandleQuantityChangeProps) => {
  const productName = product.name;
  const existing = products?.find((p) => p.name === productName);
  let newProducts = [...(products || [])];

  if (existing) {
    const updatedQuantity = Math.max(0, existing.quantity + newValue);

    if (updatedQuantity === 0) {
      newProducts = newProducts.filter((p) => p.name !== productName);
    } else {
      newProducts = newProducts.map((p) =>
        p.name === productName ? { ...p, quantity: updatedQuantity } : p,
      );
    }
  } else if (newValue > 0) {
    newProducts.push({ ...product, quantity: newValue });
  }

  setValue('products', newProducts);
};
