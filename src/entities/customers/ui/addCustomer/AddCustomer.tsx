import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import type { AddCustomerI } from '../../model/types/addCustomer';
import style from './AddCustomer.module.css';

export const AddCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogState = () => setIsOpen((prev) => !prev);
  const { register, handleSubmit } = useForm<AddCustomerI>();

  const onSubmit = (data: AddCustomerI) => {
    console.log(data);
  };
  return (
    <>
      <Button className={style.width} onClick={handleDialogState}>
        Добавить новое заведение
      </Button>
      <Dialog
        maxWidth="40rem"
        isOpen={isOpen}
        className={style.addCustomer}
        closeButton
        onClose={handleDialogState}
        title="Данные о заказчике"
      >
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Название заведения" {...register('name')} />
          <Input placeholder="Адрес" {...register('address')} />
          <Input placeholder="Контактное лицо" {...register('contactPerson')} />
          <Input placeholder="Номер телефона" type="tel" {...register('phone')} />
          <Input placeholder="Заметка" {...register('notes')} />
        </form>
      </Dialog>
    </>
  );
};
