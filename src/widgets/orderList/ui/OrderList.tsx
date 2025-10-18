import { OrderCard, useGetOrderListQuery } from '@/entities/order';
import style from './OrderList.module.css';

export const OrderList = () => {
  const { data } = useGetOrderListQuery({});
  return (
    <div className={style.orderList}>
      {data?.map((order) => (
        <OrderCard key={order.id} data={order} children={<></>} />
      ))}
    </div>
  );
};
