import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  usePostClientMutation,
  usePutClientMutation,
  type CustomerPostForm,
} from '@/entities/customer';
import type { ValidationErrorResponse } from '@/shared/api/types/validationErrorResponse';
import { handleServerErrors } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import style from './CustomerEditorForm.module.css';

type CustomerEditorFormProps =
  | {
      variant: 'post';
      id?: never;
      client?: never;
    }
  | {
      variant: 'put';
      id: string;
      client: CustomerPostForm;
    };

export const CustomerEditorForm = (props: CustomerEditorFormProps) => {
  const { variant, id, client } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [clientError, setClientError] = useState('');

  const [postClientTrigger] = usePostClientMutation();
  const [putClientTrigger] = usePutClientMutation();

  const handleDialogState = () => setIsOpen((prev) => !prev);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CustomerPostForm>({
    defaultValues: variant === 'put' && client ? client : {},
  });

  const onSubmit = async (data: CustomerPostForm) => {
    clearErrors();
    if (!data.name) {
      return;
    }

    const postData: CustomerPostForm = {
      name: data.name,
      ...(data.address ? { address: data.address } : {}),
      ...(data.contactPerson ? { contactPerson: data.contactPerson } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.notes ? { notes: data.notes } : {}),
      debt: variant === 'put' ? client.debt : 0,
    };

    try {
      if (id) {
        await putClientTrigger({ body: postData, id }).unwrap();
      } else {
        await postClientTrigger(postData).unwrap();
      }
      reset();
      setIsOpen(false);
    } catch (error) {
      const err = error as ValidationErrorResponse;
      if (err?.data?.name === 'ValidationError') {
        handleServerErrors(err.data?.list, setError);
      } else {
        console.error(error);
        setClientError('Что-то пошло не так, звоните Артуру :)');
      }
    }
  };

  return (
    <>
      <Button className={style.width} onClick={handleDialogState}>
        {variant === 'post' ? 'Добавить новое заведение' : 'Редактировать заведение'}
      </Button>
      <Dialog
        maxWidth="40rem"
        isOpen={isOpen}
        closeButton
        onClose={handleDialogState}
        title="Данные о заказчике"
      >
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Название заведения"
            {...register('name', { required: 'Это поле является обязательным' })}
            error={errors.name?.message}
          />
          <Input placeholder="Адрес" {...register('address')} error={errors.address?.message} />
          <Input
            placeholder="Контактное лицо"
            {...register('contactPerson')}
            error={errors.contactPerson?.message}
          />
          <Input
            placeholder="Номер телефона"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input placeholder="Заметка" {...register('notes')} error={errors.notes?.message} />
          <Button type="submit">Сохранить</Button>
          {clientError && <Text variant="error">{clientError}</Text>}
        </form>
      </Dialog>
    </>
  );
};
