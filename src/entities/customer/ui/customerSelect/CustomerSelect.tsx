import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Select, selectStyle } from '@/shared/ui/Select';
import { Text } from '@/shared/ui/Text';
import { useGetClientListQuery } from '../../api/customersApi';

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
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            styles={selectStyle}
            isLoading={isLoading}
            options={formattedOptions}
            placeholder="Выбрать заведение"
            onChange={(option) => field.onChange(option?.value)}
            value={formattedOptions?.find((opt) => opt.value?.id === field.value?.id) || null}
          />
          {error && <Text variant="error">{error.message}</Text>}
        </>
      )}
    />
  );
};
