import classNames from 'classnames';
import { useState } from 'react';
import { usePatchOrderMutation } from '@/entities/order';
import PaidSvg from '@/shared/assets/icons/paid.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './MarkOrderAsPaidButton.module.css';

interface MarkOrderAsPaidButtonProps {
  id: string;
  isDelivered: boolean;
  isPaid: boolean;
}

export const MarkOrderAsPaidButton = ({ id, isDelivered }: MarkOrderAsPaidButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const [paidTrigger, { isLoading }] = usePatchOrderMutation();

  const onPaid = async () => {
    try {
      await paidTrigger({ id, isPaid: true }).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      setError('Не удалось поменять статус заказа');
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="clear"
        className={classNames(style.btn, { [style.white]: isDelivered })}
        onClick={() => setIsModalOpen(true)}
      >
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
