import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomerSelectRHF, usePatchClientMutation } from '@/entities/customer';
import { usePostOrderMutation, type OrderPostBody, type OrderPostForm } from '@/entities/order';
import {
  ProductQuantity,
  ProductSkeleton,
  useGetProductsListQuery,
  useUpdateProductList,
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
  const { data: productList, isLoading: isProductListLoading } = useGetProductsListQuery(
    { sort: 'name' },
    { skip: !isModalOpen },
  );

  const [postOrder, { isLoading: isLoadingOrder }] = usePostOrderMutation();
  const [updateDebt, { isLoading: isUpdatingDebt }] = usePatchClientMutation();
  const { updateProducts, isUpdatingProducts } = useUpdateProductList();

  const isLoading = isLoadingOrder || isUpdatingDebt || isUpdatingProducts;
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

  const onSubmit = async (data: OrderPostForm) => {
    setError('');
    const preparedData: OrderPostBody = { isDelivered: false, isPaid: false, totalPrice, ...data };
    try {
      await postOrder(preparedData).unwrap();
      try {
        await updateDebt({
          id: data.customer.id,
          body: { $inc: { debt: -totalPrice } },
        }).unwrap();
        await updateProducts({
          actualProductList: productList,
          setError,
          orderProducts: data.products,
          mode: 'decrease',
        });
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
      <Button variant="tertiary" onClick={() => setIsModalOpen(true)} className={style.width}>
        Добавить новый заказ
      </Button>

      <Dialog
        maxWidth="50rem"
        isOpen={isModalOpen}
        onClose={onCloseHandler}
        panelClassName={style.panel}
        isLoading={isLoading}
        errorText={error}
        toTopOnMobile
      >
        <FormProvider {...methods}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.wrapper}>
              <CustomerSelectRHF name="customer" />
              <DatePickerRHF />
            </div>

            <div className={style.productContainer}>
              {isProductListLoading ? (
                <ProductSkeleton />
              ) : (
                productList?.map((product) => {
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
                })
              )}
            </div>
            <Text bold color="beige" className={style.padding10}>
              {'Стоимость заказа: ' + totalPrice + CURRENCY}
            </Text>

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
