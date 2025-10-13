import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomerSelect } from '@/entities/customer';
import type { OrderPostForm } from '@/entities/order';
import { ProductQuantity, useGetProductsListQuery } from '@/entities/product';
import { CURRENCY } from '@/shared/const';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Text } from '@/shared/ui/Text';
import { handleQuantityChange } from '../lib/handleQuantityChange';
import style from './CreateOrderForm.module.css';

export const CreateOrderForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: productList } = useGetProductsListQuery({});
  const methods = useForm<OrderPostForm>({
    defaultValues: {
      customer: undefined,
      products: [],
    },
  });

  const { handleSubmit, setValue, watch } = methods;
  const products = watch('products');

  const onSubmit = async (data: OrderPostForm) => {
    try {
      const filteredProducts = data.products?.filter((p) => p.quantity > 0);
      console.log('Отправляем:', { ...data, products: filteredProducts });
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
              const item = products?.find((p) => p.name === product.name);
              const quantity = item?.quantity || 0;

              return (
                <ProductQuantity
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  products={products}
                  setValue={setValue}
                  onChange={handleQuantityChange}
                />
              );
            })}
            <Text>
              {'Стоимость заказа: ' +
                products.reduce((acc, p) => acc + p.price * p.quantity, 0) +
                CURRENCY}
            </Text>

            <div className={style.btnContainer}>
              <Button type="submit">Оформить заказ</Button>
              <Button type="button" variant="danger" onClick={() => setIsModalOpen(false)}>
                Отменить
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};
