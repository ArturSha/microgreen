import { CustomerCard, useGetClientListQuery } from '@/entities/customer';
import style from './CustomerList.module.css';

export const CustomerList = () => {
  const { data } = useGetClientListQuery({ metafields: true });
  if (!data) {
    return null;
  }
  return (
    <div className={style.customerList}>
      <ul>
        {data.map((customer) => (
          <CustomerCard data={customer} key={customer.id} />
        ))}
      </ul>
    </div>
  );
};
