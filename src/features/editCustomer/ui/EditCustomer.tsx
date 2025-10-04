import { Button } from '@/shared/ui/Button';
import style from './EditCustomer.module.css';

interface EditCustomerProps {
  id: string;
}

export const EditCustomer = ({ id }: EditCustomerProps) => {
  console.log(id);

  return <Button className={style.editCustomer}>Редактировать заведение</Button>;
};
