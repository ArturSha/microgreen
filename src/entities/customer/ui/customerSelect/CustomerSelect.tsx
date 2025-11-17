import { Select, selectStyle } from '@/shared/ui/Select';
import { useGetClientListQuery } from '../../api/customersApi';
import type { Customer } from '../../model/types/customer';
import style from './CustomerSelect.module.css';

interface CustomerSelectProps {
  setCustomer: (customer: Customer | null) => void;
  value: Customer | null;
}

export const CustomerSelect = ({ setCustomer, value }: CustomerSelectProps) => {
  const { data: customerList, isLoading } = useGetClientListQuery({ sort: 'name' });

  const formattedOptions = customerList?.map((customer) => ({
    label: customer.name,
    value: customer,
  }));
  return (
    <Select
      className={style.select}
      isLoading={isLoading}
      styles={selectStyle}
      value={{ label: value?.name, value: value }}
      placeholder="Выбрать заведение"
      options={formattedOptions}
      onChange={(option) => setCustomer(option?.value ?? null)}
      isClearable
    />
  );
};
