import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePostClientMutation, type CustomerPostForm } from '@/entities/customer';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import style from './AddCustomer.module.css';

export const AddCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [postClient] = usePostClientMutation();

  const handleDialogState = () => setIsOpen((prev) => !prev);
  const { register, handleSubmit, reset } = useForm<CustomerPostForm>();

  const onSubmit = async (data: CustomerPostForm) => {
    if (!data.name) {
      return;
    }

    const postData: CustomerPostForm = {
      name: data.name,
      ...(data.address ? { address: data.address } : {}),
      ...(data.contactPerson ? { contactPerson: data.contactPerson } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.notes ? { notes: data.notes } : {}),
      debt: 0,
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
          <Input placeholder="Название заведения" {...register('name', { required: true })} />
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
