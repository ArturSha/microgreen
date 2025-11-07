import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomerSelect, usePatchClientMutation } from '@/entities/customer';
import { usePostOrderMutation, type OrderPostBody, type OrderPostForm } from '@/entities/order';
import {
  ProductQuantity,
  useGetProductsListQuery,
  useUpdateProductListMutation,
  type ProductUpdateForm,
} from '@/entities/product';
import { CURRENCY } from '@/shared/const';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { Text } from '@/shared/ui/Text';
import { handleQuantityChange } from '../../lib/handleQuantityChange';
import { DatePickerRHF } from '../DatePicker/DatePicker';
import style from './CreateOrderForm.module.css';

export const CreateOrderForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const { data: productList } = useGetProductsListQuery({}, { skip: !isModalOpen });
  const [postOrder, { isLoading: isLoadingOrder }] = usePostOrderMutation();
  const [updateDebt, { isLoading: isUpdatingDebt }] = usePatchClientMutation();
  const [updateProduct] = useUpdateProductListMutation();

  const isLoading = isLoadingOrder || isUpdatingDebt;
  const methods = useForm<OrderPostForm>({
    defaultValues: {
      customer: undefined,
      products: [],
      deliveryDate: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      })(),
    },
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const products = watch('products');
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const onCloseHandler = () => {
    reset();
    setIsModalOpen(false);
  };

  const updateProductList = async (data: OrderPostForm) => {
    if (!productList) return;

    const updatedProducts = data.products
      .map((orderProduct) => {
        const product = productList.find((p) => p.id === orderProduct.id);
        if (!product) return null;

        const { id, quantity, name, price } = product;
        return {
          _id: id,
          price,
          quantity: quantity - orderProduct.quantity,
          name,
        };
      })
      .filter(Boolean) as ProductUpdateForm[];

    if (!updatedProducts.length) return;

    try {
      await updateProduct(updatedProducts).unwrap();
    } catch (error) {
      console.error('Ошибка при обновлении продуктов:', error);
      setError('Ошибка при обновлении продуктов');
    }
  };

  const onSubmit = async (data: OrderPostForm) => {
    setError('');
    const preparedData: OrderPostBody = { isDelivered: false, isPaid: false, totalPrice, ...data };
    try {
      await postOrder(preparedData).unwrap();
      try {
        updateProductList(data);
        await updateDebt({
          id: data.customer.id,
          body: { $inc: { debt: -totalPrice } },
        }).unwrap();
        onCloseHandler();
      } catch (error) {
        console.error(error);
        setError('Не удалось произвести списание');
      }
    } catch (error) {
      setError('Не удалось создать заказ');
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className={style.width}>
        Добавить новый заказ
      </Button>

      <Dialog
        maxWidth="50rem"
        isOpen={isModalOpen}
        onClose={onCloseHandler}
        panelClassName={style.panel}
        isLoading={isLoading}
        errorText={error}
      >
        <FormProvider {...methods}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.wrapper}>
              <CustomerSelect name="customer" />
              <DatePickerRHF />
            </div>

            <div className={style.productContainer}>
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
            </div>
            <Text className={style.padding10}>{'Стоимость заказа: ' + totalPrice + CURRENCY}</Text>

            <div className={style.btnContainer}>
              <Button type="submit" isLoading={isLoading} disabled={isLoading || !totalPrice}>
                Оформить заказ
              </Button>
              <Button disabled={isLoading} type="button" variant="danger" onClick={onCloseHandler}>
                Отменить
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};
