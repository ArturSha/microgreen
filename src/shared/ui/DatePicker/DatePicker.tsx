import { DatePicker as DatePickerLib } from 'react-date-picker';
import type { DatePickerProps } from 'react-date-picker';

export const DatePicker = (props: DatePickerProps) => {
  return <DatePickerLib className={props.className} {...props} />;
};
