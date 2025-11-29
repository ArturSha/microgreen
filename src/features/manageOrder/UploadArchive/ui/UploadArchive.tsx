import { utils, writeFile } from 'xlsx';
import { useLazyGetOrderArchiveQuery } from '@/entities/order';
import { useGetProductsListQuery } from '@/entities/product';
import { CURRENCY } from '@/shared/const';
import { formatDate } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
// interface UploadArchiveProps {}

export const UploadArchive = () => {
  const [getArchive, { isLoading }] = useLazyGetOrderArchiveQuery({});
  const { data: productList } = useGetProductsListQuery({ sort: 'name' });

  const downloadExcel = async () => {
    if (!productList) {
      return;
    }
    try {
      const resp = await getArchive({ sort: 'deliveryDate' }).unwrap();
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
      writeFile(workbook, 'example.xlsx');
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
