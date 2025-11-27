import { utils, writeFile } from 'xlsx';
import { useLazyGetOrderArchiveQuery } from '@/entities/order';
import { useGetProductsListQuery } from '@/entities/product';
import { CURRENCY } from '@/shared/const';
import { formatDate } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
// interface UploadArchiveProps {}

export const UploadArchive = () => {
  const [getArchive] = useLazyGetOrderArchiveQuery({});
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
        const data = [
          [
            'Дата доставки',
            `Стоимость заказа, ${CURRENCY}`,
            ...productList.map((product) => product.name),
          ],
        ];
        resp[customerName].forEach((orderData) => {
          const date = formatDate(new Date(orderData.deliveryDate));
          const order = [date, String(orderData.totalPrice)];
          orderData.products.forEach((product) => {
            const index = data[0].indexOf(product.name);
            if (index) {
              order[index] = String(product.quantity);
            }
          });
          data.push(order);
        });
        console.log(resp[customerName]);
        const worksheet = utils.aoa_to_sheet(data);
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
    >
      Скачать
    </Button>
  );
};
