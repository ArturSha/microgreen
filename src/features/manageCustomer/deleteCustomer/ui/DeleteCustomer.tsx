import { useState } from 'react';
import { useDeleteClientMutation } from '@/entities/customer';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './deleteCustomer.module.css';

interface DeleteCustomerProps {
  id: string;
  name: string;
}

export const DeleteCustomer = ({ id, name }: DeleteCustomerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState('');
  const [deleteTrigger, { isLoading }] = useDeleteClientMutation();
  const submit = async () => {
    try {
      await deleteTrigger({ id }).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setIsError('Упс... Что-от пошло не так');
    }
  };

  return (
    <>
      <Button
        variant="danger"
        className={style.deleteCustomer}
        onClick={() => setIsModalOpen(true)}
      >
        Удалить заведение
      </Button>
      <Dialog
        isOpen={isModalOpen}
        title={`Удалить заведение "${name}"`}
        onClose={() => setIsModalOpen(false)}
        closeButton
        maxWidth="40rem"
        className={style.container}
        isLoading={isLoading}
        errorText={isError}
      >
        <Button onClick={submit} isLoading={isLoading} disabled={isLoading}>
          Да
        </Button>
        <Button variant="danger" onClick={() => setIsModalOpen(false)} disabled={isLoading}>
          Нет
        </Button>
      </Dialog>
    </>
  );
};
