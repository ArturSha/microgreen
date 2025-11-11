import classNames from 'classnames';
import { useState } from 'react';
import { usePatchClientMutation, type Customer } from '@/entities/customer';
import { useDeleteOrderMutation } from '@/entities/order';
import DeleteSvg from '@/shared/assets/icons/delete.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './DeleteOrder.module.css';

interface DeleteOrderProps {
  id: string;
  isDelivered: boolean;
  client: Customer;
  orderPrice: number;
}

export const DeleteOrder = ({ id, isDelivered, client, orderPrice }: DeleteOrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteOrderTrigger, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [updateDebt, { isLoading: isUpdatingDebt }] = usePatchClientMutation();
  const isLoading = isDeleting || isUpdatingDebt;

  const onDelete = async () => {
    setErrorMessage('');
    try {
      await updateDebt({
        id: client.id,
        body: { $inc: { debt: orderPrice } },
      }).unwrap();
      try {
        await deleteOrderTrigger({ id }).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
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
