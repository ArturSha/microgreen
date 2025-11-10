import { CustomerEditorForm, DeleteCustomer } from '@/features/manageCustomer';
import { CustomerCard, CustomerSkeleton, useGetClientListQuery } from '@/entities/customer';
import style from './CustomerList.module.css';

export const CustomerList = () => {
  const { data, isFetching } = useGetClientListQuery({ metafields: true, sort: 'name' });

  return (
    <div>
      {isFetching ? (
        <CustomerSkeleton />
      ) : (
        <div>
          {data?.map((customer, index) => (
            <CustomerCard
              data={customer}
              key={customer.id}
              className={data.length === index + 1 ? style.border : undefined}
            >
              <div className={style.wrapper}>
                <CustomerEditorForm id={customer.id} client={customer} variant="put" />
                <DeleteCustomer id={customer.id} name={customer.name} />
              </div>
            </CustomerCard>
          ))}
        </div>
      )}
    </div>
  );
};
