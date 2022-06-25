import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorState {
  value: string
}

const initialState: ErrorState = {
  value: ""
};


export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action:PayloadAction<string>) => {
      state.value = action.payload
    }
  },
});

export const { setError } = errorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default errorSlice.reducer;