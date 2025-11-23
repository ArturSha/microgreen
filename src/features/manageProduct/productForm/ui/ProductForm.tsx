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
    reset,
    formState: { errors },
  } = useForm<ProductPostForm>();

  const [postProductTrigger, { isLoading }] = usePostProductMutation();

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = async (data: ProductPostForm) => {
    clearErrors();
    try {
      await postProductTrigger(data).unwrap();
      handleClose();
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
      <Button variant="tertiary" className={style.width} onClick={() => setIsOpen(true)}>
        Добавить новую культуру
      </Button>
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        maxWidth="40rem"
        isLoading={isLoading}
        panelClassName={style.dialog}
        toTopOnMobile
      >
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            variant="secondary"
            className={style.input}
            placeholder="Название культуры"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            variant="secondary"
            className={style.input}
            type="number"
            placeholder="Стоимость"
            {...register('price')}
            error={errors.price?.message}
          />
          <Input
            variant="secondary"
            className={style.input}
            type="number"
            placeholder="Кол-во на складе"
            {...register('quantity')}
            error={errors.quantity?.message}
          />
          <div className={style.btnContainer}>
            <Button isLoading={isLoading} disabled={isLoading} type="submit">
              Сохранить
            </Button>
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              variant="danger"
              type="submit"
              onClick={handleClose}
            >
              Отменить
            </Button>
          </div>
        </form>
        {clientError && <Text variant="error">{clientError}</Text>}
      </Dialog>
    </>
  );
};
