import type { RootState } from '@/app/providers/store';
import { useAppSelector } from '@/shared/model';

const selectIsLogin = (state: RootState) => state.session.isLogged;
export const useIsLogin = () => useAppSelector(selectIsLogin);
