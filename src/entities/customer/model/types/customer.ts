export interface Customer {
  address?: string;
  contactPerson?: string;
  debt: number;
  name: string;
  notes?: string;
  phone?: string;
  updatedAt: string;
  createdAt: string;
  id: string;
}

export type CustomerPostForm = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

export interface CustomerResponse {
  address?: string;
  contactPerson?: string;
  debt: number;
  name: string;
  notes?: string;
  phone?: string;
  _changed: string;
  _changedby: string;
  _created: string;
  _createdby: string;
  _id: string;
  _keywords: string[];
  _tags: string;
  _version: number;
}

export interface CustomerGetParams {
  metafields: boolean;
}
