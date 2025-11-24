import classNames from 'classnames';
import { useState } from 'react';
import { usePatchClientMutation, type Customer } from '@/entities/customer';
import { useDeleteOrderMutation, useUpdateOrderListCache } from '@/entities/order';
import { useGetProductsListQuery, useUpdateProductList, type Product } from '@/entities/product';
import DeleteSvg from '@/shared/assets/icons/delete.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './DeleteOrder.module.css';

interface DeleteOrderProps {
  id: string;
  isDelivered: boolean;
  client: Customer;
  orderPrice: number;
  products: Product[];
}

export const DeleteOrder = ({
  id,
  isDelivered,
  client,
  orderPrice,
  products,
}: DeleteOrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { removeOrderFromCache } = useUpdateOrderListCache();

  const { updateProducts, isUpdatingProducts } = useUpdateProductList();

  const { data: actualProductList, isLoading: isProductListLoading } = useGetProductsListQuery(
    { sort: 'name' },
    { skip: !isModalOpen },
  );

  const [deleteOrderTrigger, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [updateDebt, { isLoading: isUpdatingDebt }] = usePatchClientMutation();
  const isLoading = isDeleting || isUpdatingDebt || isProductListLoading || isUpdatingProducts;

  const onDelete = async () => {
    setErrorMessage('');
    try {
      await updateDebt({
        id: client.id,
        body: { $inc: { debt: orderPrice } },
      }).unwrap();
      try {
        await updateProducts({
          actualProductList,
          orderProducts: products,
          setError: setErrorMessage,
          mode: 'increase',
        });
        await deleteOrderTrigger({ id }).unwrap();
        removeOrderFromCache(id);
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
        setErrorMessage('Не удалось удалить заказ');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Не удалось списать долг');
    }
  };

  return (
    <>
      <Button
        variant="clear"
        className={classNames(style.btn, { [style.blue]: isDelivered })}
        onClick={() => setIsModalOpen(true)}
      >
        <DeleteSvg />
      </Button>
      <Dialog
        isOpen={isModalOpen}
        closeButton
        maxWidth="40rem"
        onClose={() => setIsModalOpen(false)}
        title="Удалить заказ?"
        className={style.btnContainer}
        isLoading={isLoading}
        errorText={errorMessage}
      >
        <Button isLoading={isLoading} disabled={isLoading} onClick={onDelete}>
          Да
        </Button>
        <Button disabled={isLoading} variant="danger" onClick={() => setIsModalOpen(false)}>
          Нет
        </Button>
      </Dialog>
    </>
  );
};
