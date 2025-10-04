import { CustomerEditorForm } from '@/features/manageCustomer';
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
              <CustomerEditorForm id={customer.id} client={customer} variant="put" />
            </div>
          </CustomerCard>
        ))}
      </ul>
    </div>
  );
};
