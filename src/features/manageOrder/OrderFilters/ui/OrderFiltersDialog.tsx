import { useState } from 'react';
import { CustomerSelect, type Customer } from '@/entities/customer';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Dialog } from '@/shared/ui/Dialog';
import style from './OrderFiltersDialog.module.css';

interface OrderFiltersDialogProps {
  setCustomer: (customer: Customer | null) => void;
  setDateStart: (date: Date | null) => void;
  setDateEnd: (date: Date | null) => void;
  setShowPaid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderFiltersDialog = ({
  setCustomer,
  setDateEnd,
  setDateStart,
  setShowPaid,
}: OrderFiltersDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerLocal, setCustomerLocal] = useState<Customer | null>(null);
  const [showPaidLocal, setShowPaidLocal] = useState(true);

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [dateStartLocal, setDateStartLocal] = useState<Date | null>(firstDayOfMonth);
  const [dateEndLocal, setDateEndLocal] = useState<Date | null>(today);

  const applyFilters = () => {
    setCustomer(customerLocal);
    setDateStart(dateStartLocal);
    let end = null;
    if (dateEndLocal) {
      end = new Date(dateEndLocal);
      end.setHours(23, 59, 59, 999);
    }
    setDateEnd(end);
    setIsDialogOpen(false);
    setShowPaid(showPaidLocal);
  };

  const resetFilters = () => {
    setCustomer(null);
    setDateStartLocal(firstDayOfMonth);
    setDateEndLocal(today);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button variant="tertiary" onClick={() => setIsDialogOpen(true)}>
        Фильтр
      </Button>
      <Dialog
        panelClassName={style.dialog}
        className={style.dialogContainer}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="50rem"
      >
        <CustomerSelect setCustomer={setCustomerLocal} value={customerLocal} />
        <div className={style.datePickerContainer}>
          <DatePicker
            value={dateStartLocal}
            clearIcon={null}
            calendarIcon={null}
            className={style.datePicker}
            onChange={(value) => setDateStartLocal(value as Date | null)}
          />
          <DatePicker
            value={dateEndLocal}
            clearIcon={null}
            calendarIcon={null}
            className={style.datePicker}
            onChange={(value) => setDateEndLocal(value as Date | null)}
          />
        </div>
        <Checkbox checked={showPaidLocal} onChange={setShowPaidLocal} className={style.checkbox}>
          Показать оплаченные заказы
        </Checkbox>
        <div className={style.btnContainer}>
          <Button onClick={applyFilters}>Применить</Button>
          <Button variant="danger" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </Dialog>
    </>
  );
};
