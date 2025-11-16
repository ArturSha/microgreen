import classNames from 'classnames';
import { useState } from 'react';
import { usePatchClientMutation, type Customer } from '@/entities/customer';
import { usePatchOrderMutation, useUpdateOrderListCache } from '@/entities/order';
import PaidSvg from '@/shared/assets/icons/paid.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './MarkOrderAsPaidButton.module.css';

interface MarkOrderAsPaidButtonProps {
  id: string;
  client: Customer;
  orderPrice: number;
  isDelivered: boolean;
}

export const MarkOrderAsPaidButton = ({
  id,
  client,
  orderPrice,
  isDelivered,
}: MarkOrderAsPaidButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { updateOrderInCache, removeOrderFromCache } = useUpdateOrderListCache();

  const [patchOrder, { isLoading: isUpdatingOrderLoading }] = usePatchOrderMutation();
  const [patchClientDebt, { isLoading: isUpdatingClientDebtLoading }] = usePatchClientMutation();

  const isLoading = isUpdatingOrderLoading || isUpdatingClientDebtLoading;

  const handleMarkAsPaid = async () => {
    setErrorMessage('');
    try {
      await patchClientDebt({
        id: client.id,
        body: { $inc: { debt: orderPrice } },
      }).unwrap();
      try {
        await patchOrder({ id, isPaid: true }).unwrap();
        updateOrderInCache(id, { isPaid: true });
        if (isDelivered) {
          removeOrderFromCache(id);
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
        title="Заказ оплачен?"
        isLoading={isLoading}
        className={style.btnContainer}
        errorText={errorMessage}
      >
        <Button isLoading={isLoading} disabled={isLoading} onClick={handleMarkAsPaid}>
          Да
        </Button>
        <Button variant="danger" disabled={isLoading} onClick={() => setIsModalOpen(false)}>
          Нет
        </Button>
      </Dialog>
    </>
  );
};
