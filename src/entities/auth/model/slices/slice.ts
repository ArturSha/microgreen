import { createSlice } from '@reduxjs/toolkit';

type SessionSliceState = {
  isLogged: boolean;
};

const initialState: SessionSliceState = {
  isLogged: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsLoggedOut: (state) => {
      state.isLogged = false;
    },
    setIsLoggedIn: (state) => {
      state.isLogged = true;
    },
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = sessionSlice.actions;
