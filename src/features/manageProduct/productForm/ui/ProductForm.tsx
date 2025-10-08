import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePostProductMutation, type ProductPostForm } from '@/entities/product';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/Input';
import style from './ProductForm.module.css';

export const ProductForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register } = useForm<ProductPostForm>();

  const [postProductTrigger] = usePostProductMutation();

  const onSubmit = async (data: ProductPostForm) => {
    try {
      await postProductTrigger(data).unwrap();
    } catch (error) {
      console.log(error);
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
          <Input placeholder="Название культуры" {...register('name')} />
          <Input type="number" placeholder="Стоимость" {...register('price')} />
          <Input type="number" placeholder="Кол-во на складе" {...register('quantity')} />
          <Button type="submit">Сохранить</Button>
        </form>
      </Dialog>
    </>
  );
};
