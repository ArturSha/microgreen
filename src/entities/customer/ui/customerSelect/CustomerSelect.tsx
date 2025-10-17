import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Select, selectStyle } from '@/shared/ui/Select';
import { Text } from '@/shared/ui/Text';
import { useGetClientListQuery } from '../../api/customersApi';
import type { Customer } from '../../model/types/customer';
import style from './CustomerSelect.module.css';

interface CustomerSelectProps<T extends FieldValues> {
  name: Path<T>;
}

export const CustomerSelect = <T extends FieldValues>({ name }: CustomerSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const { data: customerList, isLoading } = useGetClientListQuery({});

  const formattedOptions = customerList?.map((customer) => ({
    label: customer.name,
    value: customer,
  }));

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: { message: 'Это поле является обязательным', value: true } }}
      render={({ field, fieldState: { error } }) => {
        const selectedCustomer = field.value as Customer;
        return (
          <div className={style.container}>
            <Select
              {...field}
              styles={selectStyle}
              isLoading={isLoading}
              options={formattedOptions}
              placeholder="Выбрать заведение"
              onChange={(option) => field.onChange(option?.value)}
              value={formattedOptions?.find((opt) => opt.value?.id === field.value?.id) || null}
            />
            {selectedCustomer && (
              <div>
                <Text color="green">
                  {`${selectedCustomer?.contactPerson ?? ''} ${selectedCustomer?.phone ?? ''}`}
                </Text>
                {selectedCustomer?.address && (
                  <Text color="green">{'Адрес: ' + selectedCustomer?.address}</Text>
                )}
                {selectedCustomer?.notes && (
                  <Text color="green">{'Заметка: ' + selectedCustomer?.notes}</Text>
                )}
              </div>
            )}
            {error && <Text variant="error">{error.message}</Text>}
          </div>
        );
      }}
    />
  );
};
