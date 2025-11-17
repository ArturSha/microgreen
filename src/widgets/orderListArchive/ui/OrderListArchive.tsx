import { useState } from 'react';
import { CustomerSelect, type Customer } from '@/entities/customer';
import { OrderCard, OrderSkeleton, useGetOrderListQuery } from '@/entities/order';
import type { PaginationMeta } from '@/shared/api';
import { Pagination } from '@/shared/ui/Pagination';
import style from './OrderListArchive.module.css';

const limit = 50;

export const OrderListArchive = () => {
  const [page, setPage] = useState(1);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const skip = (page - 1) * limit;
  const { data, isFetching } = useGetOrderListQuery({
    q: JSON.stringify({
      $and: [{ isPaid: true }, { isDelivered: true }, { 'customer.name': customer?.name }],
    }),
    sort: ['deliveryDate'],
    dir: [-1],
    totals: true,
    max: limit,
    skip,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const pagination: PaginationMeta = data?.totals ?? {
    count: 0,
    total: 0,
    skip,
    max: limit,
  };
  return (
    <div className={style.orderListArchive}>
      <CustomerSelect setCustomer={setCustomer} />
      {isFetching ? (
        <OrderSkeleton />
      ) : (
        data?.data.map((order) => (
          <OrderCard key={order.id} data={order}>
            ''
          </OrderCard>
        ))
      )}
      <Pagination {...pagination} onPageChange={handlePageChange} />
    </div>
  );
};
