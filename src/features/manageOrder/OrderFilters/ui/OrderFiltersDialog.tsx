import { useState } from 'react';
import { CustomerSelect, type Customer } from '@/entities/customer';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Dialog } from '@/shared/ui/Dialog';
import style from './OrderFiltersDialog.module.css';

interface OrderFiltersDialogProps {
  setCustomer: (customer: Customer | null) => void;
  setDateStart: (date: Date | null) => void;
  setDateEnd: (date: Date | null) => void;
}

export const OrderFiltersDialog = ({
  setCustomer,
  setDateEnd,
  setDateStart,
}: OrderFiltersDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerLocal, setCustomerLocal] = useState<Customer | null>(null);

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
        className={style.dialogContainer}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <CustomerSelect setCustomer={setCustomerLocal} value={customerLocal} />
        <div>
          <DatePicker
            value={dateStartLocal}
            clearIcon={null}
            calendarIcon={null}
            onChange={(value) => setDateStartLocal(value as Date | null)}
          />
          <DatePicker
            value={dateEndLocal}
            clearIcon={null}
            calendarIcon={null}
            onChange={(value) => setDateEndLocal(value as Date | null)}
          />
        </div>
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
