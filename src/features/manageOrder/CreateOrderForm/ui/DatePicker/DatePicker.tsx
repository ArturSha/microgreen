import { useFormContext, Controller } from 'react-hook-form';
import type { OrderPostForm } from '@/entities/order';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Text } from '@/shared/ui/Text';
import style from './DatePicker.module.css';

export const DatePickerRHF = () => {
  const { control } = useFormContext<OrderPostForm>();

  return (
    <Controller
      control={control}
      name="deliveryDate"
      rules={{ required: 'Выберите дату' }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <DatePicker
            {...field}
            onChange={field.onChange}
            value={field.value}
            minDate={new Date()}
            clearIcon={null}
            calendarIcon={null}
            className={style.calendar}
          />
          {error && <Text variant="error">{error.message}</Text>}
        </div>
      )}
    />
  );
};
