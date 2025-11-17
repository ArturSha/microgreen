import { Select, selectStyle } from '@/shared/ui/Select';
import { useGetClientListQuery } from '../../api/customersApi';
import type { Customer } from '../../model/types/customer';

interface CustomerSelectProps {
  setCustomer: (customer: Customer | null) => void;
}

export const CustomerSelect = ({ setCustomer }: CustomerSelectProps) => {
  const { data: customerList, isLoading } = useGetClientListQuery({ sort: 'name' });

  const formattedOptions = customerList?.map((customer) => ({
    label: customer.name,
    value: customer,
  }));
  return (
    <Select
      isLoading={isLoading}
      styles={selectStyle}
      placeholder="Выбрать заведение"
      options={formattedOptions}
      onChange={(option) => setCustomer(option?.value ?? null)}
      isClearable
    ></Select>
  );
};
