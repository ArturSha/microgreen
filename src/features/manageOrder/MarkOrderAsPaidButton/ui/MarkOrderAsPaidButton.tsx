import { useState } from 'react';
import { usePatchOrderMutation } from '@/entities/order';
import PaidSvg from '@/shared/assets/icons/paid.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './MarkOrderAsPaidButton.module.css';

interface MarkOrderAsPaidButtonProps {
  id: string;
}

export const MarkOrderAsPaidButton = ({ id }: MarkOrderAsPaidButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const [paidTrigger, { isLoading }] = usePatchOrderMutation();

  const onPaid = async () => {
    try {
      await paidTrigger({ id, isPaid: true });
    } catch (error) {
      setError('Не удалось поменять статус заказа');
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="clear" style={{ width: '2.8rem' }} onClick={() => setIsModalOpen(true)}>
        <PaidSvg />
      </Button>
      <Dialog
        isOpen={isModalOpen}
        maxWidth="40rem"
        closeButton
        onClose={() => setIsModalOpen(false)}
        title="Оплачено?"
        isLoading={isLoading}
        className={style.btnContainer}
        errorText={error}
      >
        <Button isLoading={isLoading} disabled={isLoading} onClick={onPaid}>
          Да
        </Button>
        <Button disabled={isLoading}>Нет</Button>
      </Dialog>
    </>
  );
};
