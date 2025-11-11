import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { CURRENCY } from '@/shared/const';
import { useDebounce } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { PopoverButton, Popover, PopoverPanel } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';
import { useDeleteProductMutation, usePatchProductMutation } from '../../api/productApi';
import type { Product } from '../../model/types/product';
import style from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, quantity, id } = product;
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [errorMessage, setErrorMessage] = useState('');
  const debounce = useDebounce(productQuantity);
  const [updateProductQuantity, { isLoading: isUpdatingQuantity }] = usePatchProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const isFirstRender = useRef(true);

  const onDeleteClick = async () => {
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const update = async () => {
      try {
        setErrorMessage('');
        await updateProductQuantity({ body: { quantity: debounce }, id }).unwrap();
      } catch (error) {
        console.error(error);
        setErrorMessage('Не удалось обновить кол-во');
      }
    };
    update();
  }, [debounce, updateProductQuantity, id]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const parsed = value === '' ? 0 : Number(value);

    setProductQuantity(Math.max(0, parsed));
  };

  return (
    <div className={style.productCard}>
      <Popover className={style.popover}>
        <PopoverButton className={style.popoverBtn}>
          <Text bold as="span">
            {name}
          </Text>
        </PopoverButton>
        <PopoverPanel anchor="bottom">
          <Button
            variant="danger"
            onClick={onDeleteClick}
            isLoading={isDeleting}
            disabled={isDeleting}
          >
            Удалить "{name}"
          </Button>
        </PopoverPanel>
      </Popover>
      <Text bold className={style.cell}>
        {price}
        {CURRENCY}
      </Text>
      <div>
        <div className={style.controlPanel}>
          <Button
            variant="clear"
            onClick={() => setProductQuantity((prev) => prev - 1)}
            icon="minus"
          />

          <Input
            className={style.input}
            inputMode="numeric"
            variant="secondary"
            value={productQuantity}
            onChange={handleInput}
            isLoading={isUpdatingQuantity}
          />
          <Button
            variant="clear"
            onClick={() => setProductQuantity((prev) => prev + 1)}
            icon="plus"
          />
        </div>
        <Text variant="error">{errorMessage}</Text>
      </div>
    </div>
  );
};
