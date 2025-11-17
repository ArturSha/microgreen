import { useState } from 'react';
import { OrderFiltersDialog } from '@/features/manageOrder';
import { type Customer } from '@/entities/customer';
import { OrderCard, OrderSkeleton, useGetOrderListQuery } from '@/entities/order';
import type { PaginationMeta } from '@/shared/api';
import { Button } from '@/shared/ui/Button';
import { Pagination } from '@/shared/ui/Pagination';
import style from './OrderListArchive.module.css';

const limit = 50;

export const OrderListArchive = () => {
  const [page, setPage] = useState(1);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);

  const skip = (page - 1) * limit;
  const { data, isFetching } = useGetOrderListQuery({
    q: JSON.stringify({
      $and: [
        { isPaid: true },
        { isDelivered: true },
        { 'customer.name': customer?.name },
        {
          deliveryDate: {
            $gt: { $date: dateStart },
            $lt: { $date: dateEnd },
          },
        },
      ],
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
      <div className={style.btnContainer}>
        <OrderFiltersDialog
          setDateEnd={setDateEnd}
          setCustomer={setCustomer}
          setDateStart={setDateStart}
        />
        <Button variant="tertiary">Выбрать</Button>
      </div>
      {isFetching ? (
        <OrderSkeleton />
      ) : (
        data?.data.map((order) => (
          <OrderCard key={order.id} data={order} short>
            {null}
          </OrderCard>
        ))
      )}
      <Pagination {...pagination} onPageChange={handlePageChange} />
    </div>
  );
};
