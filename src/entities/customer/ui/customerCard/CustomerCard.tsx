import { Text } from '@/shared/ui/Text';
import type { Customer } from '../../model/types/customer';
import style from './CustomerCard.module.css';

interface CustomerProps {
  data: Customer;
}

export const CustomerCard = (props: CustomerProps) => {
  const { name, debt } = props.data;
  return (
    <div className={style.customerCard}>
      <Text as="span">{name}</Text>
      <Text as="span">{debt}</Text>
    </div>
  );
};
