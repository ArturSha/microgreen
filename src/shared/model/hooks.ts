import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux';
import { type AppDispatch, type RootState } from '@/app/providers/store';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
