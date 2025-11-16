import { useState } from 'react';
import {
  DeleteOrder,
  MarkOrderAsDeliveredButton,
  MarkOrderAsPaidButton,
} from '@/features/manageOrder';
import { OrderCard, OrderSkeleton, useGetOrderListQuery } from '@/entities/order';
import type { PaginationMeta } from '@/shared/api';
import { Pagination } from '@/shared/ui/Pagination';
import style from './OrderList.module.css';

const limit = 50;

export const OrderList = () => {
  const [page, setPage] = useState(1);

  const skip = (page - 1) * limit;
  const { data, isFetching } = useGetOrderListQuery({
    sort: ['isDelivered', 'deliveryDate'],
    dir: [1, -1],
    totals: true,
    max: limit,
    skip,
  });

  const pagination: PaginationMeta = data?.totals ?? {
    count: 0,
    total: 0,
    skip,
    max: limit,
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={style.orderList}>
      {isFetching ? (
        <OrderSkeleton />
      ) : (
        data?.data.map((order) => (
          <OrderCard
            key={order.id}
            data={order}
            children={
              <div className={style.btnContainer}>
                {!order.isDelivered && <MarkOrderAsDeliveredButton id={order.id} />}
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
      <Pagination {...pagination} onPageChange={handlePageChange} />
    </div>
  );
};
