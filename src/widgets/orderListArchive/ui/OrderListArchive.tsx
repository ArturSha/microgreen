import { useState } from 'react';
import { MarkOrderAsPaidButton, OrderFiltersDialog, UploadArchive } from '@/features/manageOrder';
import { type Customer } from '@/entities/customer';
import {
  OrderCard,
  OrderSkeleton,
  useBulkDeleteOrdersMutation,
  useGetOrderListQuery,
  useGetOrderSumQuery,
  type Order,
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
  const [showUnPaid, setShowUnPaid] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTotal, setSelectedTotal] = useState(0);

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const skip = (page - 1) * limit;
  const { data: orderList, isFetching } = useGetOrderListQuery(
    {
      q: JSON.stringify({
        $and: [
          showUnPaid ? { isPaid: !showUnPaid } : '',
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
    { skip: !dateStart, refetchOnMountOrArgChange: true },
  );

  const { data: totalPrice, isFetching: isLoadingTotalPrice } = useGetOrderSumQuery(
    {
      q: JSON.stringify({
        $and: [
          showUnPaid ? { isPaid: !showUnPaid } : '',
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
    },
    { skip: !dateStart, refetchOnMountOrArgChange: true },
  );

  const [deleteOrders, { isLoading: isDeleting }] = useBulkDeleteOrdersMutation();

  const handleDelete = async () => {
    try {
      await deleteOrders(selectedIds).unwrap();
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSelect = (order: Order) => {
    setSelectedIds((prev) => {
      const alreadySelected = prev.includes(order.id);
      if (alreadySelected) {
        setSelectedTotal((prevTotal) => prevTotal - order.totalPrice);
        return prev.filter((item) => item !== order.id);
      } else {
        setSelectedTotal((prevTotal) => prevTotal + order.totalPrice);
        return [...prev, order.id];
      }
    });
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
        setShowUnPaid={setShowUnPaid}
      />

      {orderList && (
        <div className={style.flex}>
          <div className={style.infoContainer}>
            <Text color="blue" bold className={style.lineHeight}>
              {customer?.name ? customer?.name : 'Все заведения'}
            </Text>
            <div className={style.dateContainer}>
              <Text color="blue" bold className={style.lineHeight}>
                с {formatDate(dateStart)}
              </Text>
              <Text color="blue" bold className={style.lineHeight}>
                по {formatDate(dateEnd)}
              </Text>
            </div>
            <Text
              color={selectedIds.length === 0 ? 'blue' : 'red'}
              bold
              className={style.lineHeight}
            >
              Количество заказов:{' '}
              {selectedIds.length === 0 ? orderList.totals.total : selectedIds.length}
            </Text>
            <Text
              color={selectedIds.length === 0 ? 'blue' : 'red'}
              bold
              className={style.lineHeight}
            >
              Общая стоимость:{' '}
              {isLoadingTotalPrice
                ? 'Ведем подсчет'
                : selectedIds.length === 0
                  ? totalPrice?.sumTotalPrice
                  : selectedTotal}
            </Text>
          </div>
          <div className={style.flexColumn}>
            {!isDeleteMode && (
              <>
                <Button
                  variant="tertiary"
                  onClick={() => setIsDeleteMode(true)}
                  className={style.chooseBtn}
                >
                  Выбрать
                </Button>
                <UploadArchive />
              </>
            )}
            {isDeleteMode && (
              <Button
                variant="primary"
                onClick={() => {
                  setIsDeleteMode(false);
                  setSelectedIds([]);
                  setSelectedTotal(0);
                }}
              >
                Отменить
              </Button>
            )}
            {isDeleteMode && (
              <Button
                disabled={selectedIds.length === 0 || isDeleting}
                isLoading={isDeleting}
                variant="danger"
                onClick={handleDelete}
              >
                Удалить
              </Button>
            )}
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
            short={order.isPaid}
            selected={selectedIds.includes(order.id)}
            onClick={isDeleteMode ? () => toggleSelect(order) : undefined}
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
