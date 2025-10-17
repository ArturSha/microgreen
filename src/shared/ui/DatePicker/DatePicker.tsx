import { DatePicker as DatePickerLib } from 'react-date-picker';
import type { DatePickerProps } from 'react-date-picker';
import style from './DatePicker.module.css';

export const DatePicker = (props: DatePickerProps) => {
  return <DatePickerLib className={style.calendar} {...props} />;
};
