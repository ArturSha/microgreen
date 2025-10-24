import { useState } from 'react';
import { useDeleteOrderMutation, usePatchOrderMutation } from '@/entities/order';
import DeliveredSvg from '@/shared/assets/icons/delivered.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './MarkOrderAsDeliveredButton.module.css';

interface MarkOrderAsDeliveredButtonProps {
  id: string;
  isPaid: boolean;
}

export const MarkOrderAsDeliveredButton = ({ id, isPaid }: MarkOrderAsDeliveredButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [updateOrder, { isLoading: isDeliveredLoading }] = usePatchOrderMutation();
  const [deleteOrder, { isLoading: isDeleteLoading }] = useDeleteOrderMutation();
  const isLoading = isDeliveredLoading || isDeleteLoading;

  const handleMarkAsDelivered = async () => {
    setError('');
    try {
      await updateOrder({ id, isDelivered: true }).unwrap();
      if (isPaid) {
        await deleteOrder({ id }).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setError('Не удалось изменить статус заказа');
    }
  };
  return (
    <>
      <Button className={style.btn} variant="clear" onClick={() => setIsModalOpen(true)}>
        <DeliveredSvg />
      </Button>
      <Dialog
        isOpen={isModalOpen}
        maxWidth="40rem"
        closeButton
        onClose={() => setIsModalOpen(false)}
        title="Заказ доставлен?"
        isLoading={isLoading}
        className={style.btnContainer}
        errorText={error}
      >
        <Button onClick={handleMarkAsDelivered} isLoading={isLoading} disabled={isLoading}>
          Да
        </Button>
        <Button disabled={isLoading} variant="secondary" onClick={() => setIsModalOpen(false)}>
          Нет
        </Button>
      </Dialog>
    </>
  );
};
