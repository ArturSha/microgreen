import { utils, writeFile } from 'xlsx';
import { useLazyGetOrderArchiveQuery } from '@/entities/order';
import { useLazyGetProductsListQuery } from '@/entities/product';
import { CURRENCY } from '@/shared/const';
import { formatDate } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';

interface UploadArchiveProps {
  showUnPaid: boolean;
  customerId?: string;
  dateStart: Date | null;
  dateEnd: Date | null;
  customerName?: string;
}

const formatFileDate = (date: Date | null) => {
  if (!date) return '';
  return date?.toLocaleDateString().split('T')[0];
};

export const UploadArchive = ({
  dateEnd,
  dateStart,
  showUnPaid,
  customerId,
  customerName,
}: UploadArchiveProps) => {
  const [getArchive, { isFetching: isOrdersLoading }] = useLazyGetOrderArchiveQuery();
  const [getProductList, { isFetching: isProductsLoading }] = useLazyGetProductsListQuery();
  const isLoading = isOrdersLoading || isProductsLoading;

  const downloadExcel = async () => {
    const productList = await getProductList({ sort: 'name' }).unwrap();
    if (!productList) {
      return;
    }
    try {
      const resp = await getArchive({
        q: JSON.stringify({
          $and: [
            showUnPaid ? { isPaid: !showUnPaid } : '',
            { isDelivered: true },
            { 'customer.id': customerId },
            {
              deliveryDate: {
                $gt: { $date: dateStart },
                $lt: { $date: dateEnd },
              },
            },
          ],
        }),
        sort: ['customer.name', 'deliveryDate'],
        dir: [1, 1],
      }).unwrap();
      const workbook = utils.book_new();
      const keys = Object.keys(resp);
      keys.forEach((customerName) => {
        const data: (string | number)[][] = [
          [
            'Дата доставки',
            `Стоимость заказа, ${CURRENCY}`,
            ...productList.map((product) => product.name),
          ],
        ];
        resp[customerName].forEach((orderData) => {
          const date = formatDate(new Date(orderData.deliveryDate));
          const row: (string | number)[] = [date, orderData.totalPrice];
          orderData.products.forEach((product) => {
            const index = data[0].indexOf(product.name);
            if (index) {
              row[index] = product.quantity;
            }
          });
          data.push(row);
        });
        data.push(['Итого:']);
        const worksheet = utils.aoa_to_sheet(data);
        const lastRow = data.length;
        for (let col = 1; col < data[0].length; col++) {
          const colLetter = utils.encode_col(col);
          worksheet[`${colLetter}${lastRow}`] = {
            t: 'f',
            f: `SUM(${colLetter}2:${colLetter}${lastRow - 1})`,
          };
        }
        worksheet['!cols'] = [{ wch: 15 }, { wch: 18 }];

        utils.book_append_sheet(workbook, worksheet, customerName);
      });
      writeFile(
        workbook,
        `${formatFileDate(dateStart)}-${formatFileDate(dateEnd)}${customerName ? '-' + customerName : ''}.xlsx`,
      );
    } catch (error) {
      console.error('Не удалось загрузить данные с сервера', error);
    }
  };
  return (
    <Button
      style={{ borderRadius: '8px', textTransform: 'capitalize' }}
      variant="tertiary"
      onClick={downloadExcel}
      isLoading={isLoading}
      disabled={isLoading}
    >
      Скачать
    </Button>
  );
};
