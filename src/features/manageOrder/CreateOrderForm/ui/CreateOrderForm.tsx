import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomerSelect } from '@/entities/customer';
import type { OrderPostForm } from '@/entities/order';
import { useGetProductsListQuery } from '@/entities/product';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Text } from '@/shared/ui/Text';
import style from './CreateOrderForm.module.css';

export const CreateOrderForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: productList } = useGetProductsListQuery({});
  const methods = useForm<OrderPostForm>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: OrderPostForm) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className={style.width}>
        Добавить новый заказ
      </Button>
      <Dialog
        maxWidth="40rem"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeButton
      >
        <FormProvider {...methods}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <CustomerSelect name="customer" />
            {productList?.map((product) => {
              return (
                <div key={product.id}>
                  <Text>{product.name}</Text>
                </div>
              );
            })}
            <div className={style.btnContainer}>
              <Button type="submit">Оформить заказ</Button>
              <Button variant="danger" onClick={() => setIsModalOpen(false)}>
                Отменить
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};
