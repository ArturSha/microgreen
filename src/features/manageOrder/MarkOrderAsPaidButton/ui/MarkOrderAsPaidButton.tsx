import classNames from 'classnames';
import { useState } from 'react';
import { usePatchClientMutation, type Customer } from '@/entities/customer';
import { useDeleteOrderMutation, usePatchOrderMutation } from '@/entities/order';
import PaidSvg from '@/shared/assets/icons/paid.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './MarkOrderAsPaidButton.module.css';

interface MarkOrderAsPaidButtonProps {
  id: string;
  isDelivered: boolean;
  client: Customer;
  orderPrice: number;
}

export const MarkOrderAsPaidButton = ({
  id,
  isDelivered,
  client,
  orderPrice,
}: MarkOrderAsPaidButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [patchOrder, { isLoading: isUpdatingOrderLoading }] = usePatchOrderMutation();
  const [patchClientDebt, { isLoading: isUpdatingClientDebtLoading }] = usePatchClientMutation();
  const [deleteOrder, { isLoading: isDeletingOrder }] = useDeleteOrderMutation();

  const isLoading = isUpdatingOrderLoading || isUpdatingClientDebtLoading || isDeletingOrder;

  const handleMarkAsPaid = async () => {
    setErrorMessage('');
    try {
      await patchClientDebt({
        id: client.id,
        body: { $inc: { debt: orderPrice } },
      }).unwrap();
      try {
        if (!isDelivered) {
          await patchOrder({ id, isPaid: true }).unwrap();
        } else {
          await deleteOrder({ id }).unwrap();
        }
        setIsModalOpen(false);
      } catch (error) {
        setErrorMessage('Не удалось поменять статус заказа');
        console.error(error);
      }
    } catch (error) {
      setErrorMessage('Не удалось списать долг');
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="clear"
        className={classNames(style.btn, { [style.blue]: isDelivered })}
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
        errorText={errorMessage}
      >
        <Button isLoading={isLoading} disabled={isLoading} onClick={handleMarkAsPaid}>
          Да
        </Button>
        <Button variant="secondary" disabled={isLoading}>
          Нет
        </Button>
      </Dialog>
    </>
  );
};
