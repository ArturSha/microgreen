import {
  DeleteOrder,
  MarkOrderAsDeliveredButton,
  MarkOrderAsPaidButton,
} from '@/features/manageOrder';
import { OrderCard, useGetOrderListQuery } from '@/entities/order';
import style from './OrderList.module.css';

export const OrderList = () => {
  const { data } = useGetOrderListQuery({});

  return (
    <div className={style.orderList}>
      {data?.map((order) => (
        <OrderCard
          key={order.id}
          data={order}
          children={
            <div className={style.btnContainer}>
              {!order.isDelivered && <MarkOrderAsDeliveredButton id={order.id} />}
              {!order.isPaid && (
                <MarkOrderAsPaidButton
                  id={order.id}
                  isDelivered={order.isDelivered}
                  isPaid={order.isPaid}
                />
              )}
              <DeleteOrder id={order.id} isDelivered={order.isDelivered} isPaid={order.isPaid} />
            </div>
          }
        />
      ))}
    </div>
  );
};
