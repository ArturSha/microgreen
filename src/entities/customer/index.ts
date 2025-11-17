export {
  usePostClientMutation,
  useGetClientListQuery,
  usePatchClientMutation,
  useGetClientQuery,
  usePutClientMutation,
  useDeleteClientMutation,
} from './api/customersApi';
export type { CustomerPostForm, Customer } from './model/types/customer';
export { CustomerCard } from './ui/customerCard/CustomerCard';
export { CustomerSelectRHF } from './ui/customerSelectRHF/CustomerSelectRHF';
export { CustomerSelect } from './ui/customerSelect/CustomerSelect';
export { CustomerSkeleton } from './ui/customerSkeleton/CustomerSkeleton';
