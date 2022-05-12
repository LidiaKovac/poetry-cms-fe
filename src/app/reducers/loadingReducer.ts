import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

export interface LoadingState {
  value: Boolean
}

const initialState: LoadingState = {
  value: true
};


export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction<Boolean>) => {
      state.value = action.payload
    }
  },
});

export const { setLoading } = loadingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default loadingSlice.reducer;