import {
  DeleteOrder,
  MarkOrderAsDeliveredButton,
  MarkOrderAsPaidButton,
} from '@/features/manageOrder';
import { OrderCard, OrderSkeleton, useGetOrderListQuery } from '@/entities/order';
import style from './OrderList.module.css';

export const OrderList = () => {
  const { data, isLoading } = useGetOrderListQuery({
    sort: ['isDelivered', 'deliveryDate'],
    dir: [1, 1],
    totals: true,
    max: 20,
  });

  return (
    <div className={style.orderList}>
      {isLoading ? (
        <OrderSkeleton />
      ) : (
        data?.data.map((order) => (
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
        ))
      )}
    </div>
  );
};
