import type { CustomerResponse, Customer } from '../model/types/customer';

export const mapCustomer = (data: CustomerResponse): Customer => {
  const newObj = {
    id: data._id,
    name: data.name,
    address: data.address,
    contactPerson: data.contactPerson,
    phone: data.phone,
    debt: data.debt,
    notes: data.notes,
    createdAt: data._created,
    updatedAt: data._changed,
  };

  return newObj;
};
