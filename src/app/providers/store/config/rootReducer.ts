import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from '@/entities/auth';
import { baseApi } from '@/shared/api';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
});
