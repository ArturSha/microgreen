import classNames from 'classnames';
import { useState } from 'react';
import { useGetClientQuery, usePatchClientMutation, type Customer } from '@/entities/customer';
import { usePatchOrderMutation } from '@/entities/order';
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
  const [error, setError] = useState('');

  const [paidTrigger, { isLoading: isPaidLoading }] = usePatchOrderMutation();
  const [updateClient, { isLoading: isUpdatingClientLoading }] = usePatchClientMutation();
  const { data: clientData, isLoading: isClientLoading } = useGetClientQuery(
    { id: client.id },
    { skip: !isModalOpen },
  );
  const isLoading = isPaidLoading || isUpdatingClientLoading || isClientLoading;

  const onPaid = async () => {
    if (!clientData) {
      setError('Не удалось загрузить информацию о клиенте');
      return;
    }
    setError('');
    try {
      await updateClient({ id: client.id, body: { debt: clientData.debt + orderPrice } }).unwrap();
      try {
        await paidTrigger({ id, isPaid: true }).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        setError('Не удалось поменять статус заказа');
        console.error(error);
      }
    } catch (error) {
      setError('Не удалось списать долг');
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
        <Button variant="secondary" disabled={isLoading}>
          Нет
        </Button>
      </Dialog>
    </>
  );
};
