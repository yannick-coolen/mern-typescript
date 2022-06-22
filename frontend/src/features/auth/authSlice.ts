import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { I_Credentials, I_InitState } from '../../interface/PropsCollection';

import authService from './authService';

const init: I_InitState = {
  entity: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

const user: string = JSON.parse(String(localStorage.getItem('user')));

const initialState = {
  user: user ? user : (init.entity as null),
  isError: init.isError,
  isSuccess: init.isSuccess,
  isLoading: init.isLoading,
  message: init.message
};

// Register user
export const register = createAsyncThunk<any, I_Credentials, {}>(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string =
          (error.response &&
            error.response.data &&
            (error.response.data as any).message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Login user
export const login = createAsyncThunk<any, I_Credentials, {}>(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string =
          (error.response &&
            error.response.data &&
            (error.response.data as any).message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Actions
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        (state as any).message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        (state as any).message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
