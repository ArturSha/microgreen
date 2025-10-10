import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { OrderPostForm } from '@/entities/order';
import { useGetProductsListQuery } from '@/entities/product';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Text } from '@/shared/ui/Text';
import style from './CreateOrder.module.css';

export const CreateOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: productList } = useGetProductsListQuery({});
  const { handleSubmit } = useForm<OrderPostForm>();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          {productList?.map((product) => {
            return (
              <div key={product.id}>
                <Text>{product.name}</Text>
              </div>
            );
          })}
        </form>
      </Dialog>
    </>
  );
};
