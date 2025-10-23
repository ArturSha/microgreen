export {
  usePostClientMutation,
  useGetClientListQuery,
  useGetClientQuery,
  usePutClientMutation,
  useDeleteClientMutation,
} from './api/customersApi';
export type { CustomerPostForm, Customer } from './model/types/customer';
export { CustomerCard } from './ui/customerCard/CustomerCard';
export { CustomerSelect } from './ui/customerSelect/CustomerSelect';
