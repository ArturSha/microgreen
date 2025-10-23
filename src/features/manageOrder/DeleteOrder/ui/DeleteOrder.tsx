import { useState } from 'react';
import { useDeleteOrderMutation } from '@/entities/order';
import DeleteSvg from '@/shared/assets/icons/delete.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './DeleteOrder.module.css';
interface DeleteOrderProps {
  id: string;
}

export const DeleteOrder = ({ id }: DeleteOrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrderTrigger, { isLoading }] = useDeleteOrderMutation();
  const onDelete = async () => {
    try {
      await deleteOrderTrigger({ id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="clear" style={{ width: '2.8rem' }} onClick={() => setIsModalOpen(true)}>
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
      >
        <Button isLoading={isLoading} disabled={isLoading} onClick={onDelete} variant="danger">
          Да
        </Button>
        <Button disabled={isLoading}>Нет</Button>
      </Dialog>
    </>
  );
};
