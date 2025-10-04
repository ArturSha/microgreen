import { EditCustomer } from '@/features/editCustomer';
import { CustomerCard, useGetClientListQuery } from '@/entities/customer';
import style from './CustomerList.module.css';

export const CustomerList = () => {
  const { data } = useGetClientListQuery({ metafields: true });
  if (!data) {
    return null;
  }
  return (
    <div>
      <ul>
        {data.map((customer) => (
          <CustomerCard data={customer} key={customer.id}>
            <div className={style.wrapper}>
              <EditCustomer id={customer.id} />
              <EditCustomer id={customer.id} />
            </div>
          </CustomerCard>
        ))}
      </ul>
    </div>
  );
};
