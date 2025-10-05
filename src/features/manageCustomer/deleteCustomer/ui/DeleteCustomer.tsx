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
  const [deleteTrigger, { isLoading }] = useDeleteClientMutation();
  const submit = async () => {
    try {
      await deleteTrigger({ id }).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
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
        title={`Удалить заведение: ${name}`}
        onClose={() => setIsModalOpen(false)}
        closeButton
        maxWidth="40rem"
        className={style.container}
        isLoading={isLoading}
      >
        <Button variant="danger" onClick={submit} isLoading={isLoading} disabled={isLoading}>
          Удалить
        </Button>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isLoading}>
          Отмена
        </Button>
      </Dialog>
    </>
  );
};
