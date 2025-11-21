import { useState } from 'react';
import { MarkOrderAsPaidButton, OrderFiltersDialog } from '@/features/manageOrder';
import { type Customer } from '@/entities/customer';
import {
  OrderCard,
  OrderSkeleton,
  // useBulkDeleteOrdersMutation,
  useGetOrderListQuery,
} from '@/entities/order';
import type { PaginationMeta } from '@/shared/api';
import { formatDate } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { Pagination } from '@/shared/ui/Pagination';
import { Text } from '@/shared/ui/Text';
import style from './OrderListArchive.module.css';

const limit = 100;

export const OrderListArchive = () => {
  const [page, setPage] = useState(1);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [showPaid, setShowPaid] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const skip = (page - 1) * limit;
  const { data: orderList, isFetching } = useGetOrderListQuery(
    {
      q: JSON.stringify({
        $and: [
          { isPaid: showPaid },
          { isDelivered: true },
          { 'customer.id': customer?.id },
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
    },
    { skip: !dateStart },
  );
  // const [deleteOrders] = useBulkDeleteOrdersMutation();

  // const handleDelete = async () => {
  //   try {
  //     await deleteOrders(selectedIds).unwrap();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const pagination: PaginationMeta = orderList?.totals ?? {
    count: 0,
    total: 0,
    skip,
    max: limit,
  };
  return (
    <div className={style.orderListArchive}>
      <OrderFiltersDialog
        setDateEnd={setDateEnd}
        setCustomer={setCustomer}
        setDateStart={setDateStart}
        setShowPaid={setShowPaid}
      />

      {orderList && (
        <div className={style.infoContainer}>
          <div>
            <Text>{customer?.name}</Text>
            <div className={style.dateContainer}>
              <Text color="blue">с {formatDate(dateStart)}</Text>
              <Text color="blue">по {formatDate(dateEnd)}</Text>
            </div>
            <Text color="blue">Кол-во заказов: {orderList.totals.total}</Text>
          </div>
          <div>
            <Button onClick={() => setIsDeleteMode(true)}>Выбрать</Button>
          </div>
        </div>
      )}
      {isFetching ? (
        <OrderSkeleton />
      ) : (
        orderList?.data.map((order) => (
          <OrderCard
            key={order.id}
            data={order}
            short
            selected={selectedIds.includes(order.id)}
            onClick={isDeleteMode ? () => toggleSelect(order.id) : undefined}
          >
            {!order.isPaid && (
              <MarkOrderAsPaidButton
                client={order.customer}
                id={order.id}
                isDelivered={order.isDelivered}
                orderPrice={order.totalPrice}
                className={style.paidBtn}
              />
            )}
          </OrderCard>
        ))
      )}
      <Pagination {...pagination} onPageChange={handlePageChange} />
    </div>
  );
};
