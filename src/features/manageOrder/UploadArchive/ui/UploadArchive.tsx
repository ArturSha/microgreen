import * as XLSX from 'xlsx';
import { useLazyGetOrderArchiveQuery } from '@/entities/order';
import { CURRENCY } from '@/shared/const';
import { formatDate } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
// interface UploadArchiveProps {}

export const UploadArchive = () => {
  const [getArchive] = useLazyGetOrderArchiveQuery({});

  const downloadExcel = async () => {
    try {
      const resp = await getArchive({ sort: 'deliveryDate' }).unwrap();
      const workbook = XLSX.utils.book_new();
      const keys = Object.keys(resp);
      keys.forEach((customerName) => {
        const data = [['Дата доставки', `Стоимость заказа, ${CURRENCY}`]];
        resp[customerName].forEach((orderData) => {
          const date = formatDate(new Date(orderData.deliveryDate));
          const order = [date, String(orderData.totalPrice)];
          data.push(order);
        });
        console.log(resp[customerName]);
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        worksheet['!cols'] = [{ wch: 15 }, { wch: 18 }];

        XLSX.utils.book_append_sheet(workbook, worksheet, customerName);
      });
      XLSX.writeFile(workbook, 'example.xlsx');
    } catch (error) {
      console.error('Не удалось загрузить данные с сервера', error);
    }
  };
  return <Button icon="download" variant="clear" onClick={downloadExcel} />;
};
