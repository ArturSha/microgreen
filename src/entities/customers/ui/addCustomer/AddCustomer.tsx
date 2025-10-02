import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import { usePostClientMutation } from '../../api/customersApi';
import type { AddCustomerI } from '../../model/types/addCustomer';
import style from './AddCustomer.module.css';

export const AddCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [postClient] = usePostClientMutation();

  const handleDialogState = () => setIsOpen((prev) => !prev);
  const { register, handleSubmit, reset } = useForm<AddCustomerI>();

  const onSubmit = async (data: AddCustomerI) => {
    console.log(data);

    if (!data.name) {
      return;
    }
    const postData: AddCustomerI = {
      name: data.name,
      address: data.address,
      contactPerson: data.contactPerson,
      phone: data.phone,
      notes: data.notes,
    };
    try {
      await postClient(postData).unwrap();
      setIsOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button className={style.width} onClick={handleDialogState}>
        Добавить новое заведение
      </Button>
      <Dialog
        maxWidth="40rem"
        isOpen={isOpen}
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
          <Button type="submit">Сохранить</Button>
        </form>
      </Dialog>
    </>
  );
};
