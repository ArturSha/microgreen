import {
  DeleteOrder,
  MarkOrderAsDeliveredButton,
  MarkOrderAsPaidButton,
} from '@/features/manageOrder';
import { OrderCard, useGetOrderListQuery } from '@/entities/order';
import style from './OrderList.module.css';

export const OrderList = () => {
  const { data } = useGetOrderListQuery({ sort: ['isDelivered', 'deliveryDate'], dir: [1, 1] });

  return (
    <div className={style.orderList}>
      {data?.map((order) => (
        <OrderCard
          key={order.id}
          data={order}
          children={
            <div className={style.btnContainer}>
              {!order.isDelivered && (
                <MarkOrderAsDeliveredButton id={order.id} isPaid={order.isPaid} />
              )}
              {!order.isPaid && (
                <MarkOrderAsPaidButton
                  id={order.id}
                  client={order.customer}
                  orderPrice={order.totalPrice}
                  isDelivered={order.isDelivered}
                />
              )}
              {!order.isDelivered && !order.isPaid && (
                <DeleteOrder
                  id={order.id}
                  client={order.customer}
                  orderPrice={order.totalPrice}
                  isDelivered={order.isDelivered}
                />
              )}
            </div>
          }
        />
      ))}
    </div>
  );
};
