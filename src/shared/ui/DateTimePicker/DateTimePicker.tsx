import {
  DateTimePicker as DateTimePickerLib,
  type DateTimePickerProps,
} from 'react-datetime-picker';
import Calendar from '../../assets/icons/calendar.svg';
import { i18n } from '../../lib';
import style from './DateTimePicker.module.css';

export const DateTimePicker = (props: DateTimePickerProps) => {
  return (
    <DateTimePickerLib
      calendarProps={{
        className: style.reactCalendar,
        tileClassName: ({ date, view, activeStartDate }) => {
          const observedMonth = activeStartDate.getMonth() === date.getMonth();
          if (view === 'month' && observedMonth) {
            const day = date.getDay();
            return day === 0 || day === 6 ? style.weekend : '';
          }
        },
      }}
      locale={i18n.language}
      calendarIcon={<Calendar />}
      {...props}
    />
  );
};
