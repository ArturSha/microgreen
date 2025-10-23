import { useState } from 'react';
import { useGetClientQuery, type Customer } from '@/entities/customer';
import { usePatchOrderMutation } from '@/entities/order';
import DeliveredSvg from '@/shared/assets/icons/delivered.svg?react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Text } from '@/shared/ui/Text';
import style from './MarkOrderAsDeliveredButton.module.css';

interface MarkOrderAsDeliveredButtonProps {
  id: string;
  isPaid: boolean;
  customer: Customer;
}

export const MarkOrderAsDeliveredButton = ({
  id,
  isPaid,
  customer,
}: MarkOrderAsDeliveredButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [patchDeliveredTrigger, { isLoading }] = usePatchOrderMutation();
  const { id: customerId, debt } = customer;

  const shouldSkip = !isModalOpen || !isPaid;

  const { data: clientData } = useGetClientQuery({ id: customerId }, { skip: shouldSkip });
  console.log(clientData);

  const handleMarkAsDelivered = async () => {
    try {
      await patchDeliveredTrigger({ id, isDelivered: true }).unwrap();
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
        <Button disabled={isLoading} variant="secondary">
          Нет
        </Button>
        <Text>{'долг:' + debt}</Text>
      </Dialog>
    </>
  );
};
