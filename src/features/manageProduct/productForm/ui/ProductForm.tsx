import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePostProductMutation, type ProductPostForm } from '@/entities/product';
import type { ValidationErrorResponse } from '@/shared/api/types/validationErrorResponse';
import { handleServerErrors } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import style from './ProductForm.module.css';

export const ProductForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientError, setClientError] = useState('');
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProductPostForm>();

  const [postProductTrigger] = usePostProductMutation();

  const onSubmit = async (data: ProductPostForm) => {
    clearErrors();
    try {
      await postProductTrigger(data).unwrap();
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
      <Button className={style.width} onClick={() => setIsOpen(true)}>
        Добавить новую культуру
      </Button>
      <Dialog
        onClose={() => setIsOpen(false)}
        title="Данные о культуре"
        isOpen={isOpen}
        closeButton
        maxWidth="40rem"
        className={style.productForm}
      >
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Название культуры"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            type="number"
            placeholder="Стоимость"
            {...register('price')}
            error={errors.price?.message}
          />
          <Input
            type="number"
            placeholder="Кол-во на складе"
            {...register('quantity')}
            error={errors.quantity?.message}
          />
          <Button type="submit">Сохранить</Button>
        </form>
        {clientError && <Text variant="error">{clientError}</Text>}
      </Dialog>
    </>
  );
};
