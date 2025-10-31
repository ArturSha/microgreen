import { CustomerEditorForm, DeleteCustomer } from '@/features/manageCustomer';
import { CustomerCard, useGetClientListQuery } from '@/entities/customer';
import { LoaderSimple } from '@/shared/ui/Loader';
import style from './CustomerList.module.css';

export const CustomerList = () => {
  const { data, isFetching } = useGetClientListQuery({ metafields: true, sort: 'name' });

  return (
    <div>
      {isFetching ? (
        <LoaderSimple />
      ) : (
        <ul>
          {data?.map((customer) => (
            <CustomerCard data={customer} key={customer.id}>
              <div className={style.wrapper}>
                <CustomerEditorForm id={customer.id} client={customer} variant="put" />
                <DeleteCustomer id={customer.id} name={customer.name} />
              </div>
            </CustomerCard>
          ))}
        </ul>
      )}
    </div>
  );
};
