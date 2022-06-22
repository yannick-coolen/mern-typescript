import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { I_Credentials, I_InitState } from '../../interface/PropsCollection';
import goalService from './goalService';

const init: I_InitState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

const initialState = {
  goals: [],
  isError: init.isError,
  isSuccess: init.isSuccess,
  isLoading: init.isLoading,
  message: init.message
};

interface reducerState {
  user: {
    token: string;
  };
}

// Create a new goal
export const createGoal = createAsyncThunk<unknown, I_InitState, {}>(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token: string = (thunkAPI.getState() as { auth: reducerState }).auth
        .user.token;
      return await goalService.createGoal(goalData, token);
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

// Get user goals
export const getGoals = createAsyncThunk<unknown, I_InitState, {}>(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as { auth: reducerState }).auth.user
        .token;
      return await goalService.getGoals(token);
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

// Delete user goal
export const deleteGoal = createAsyncThunk<any, I_Credentials, {}>(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as { auth: reducerState }).auth.user
        .token;
      return await goalService.deleteGoal(id, token);
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

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        (state.goals as any).push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        (state.goals as any) = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = (state.goals as any).filter(
          (goal: any) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
      });
  }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
