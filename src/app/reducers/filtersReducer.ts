import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface FiltersState {
  value: Array<Tag>
}

const initialState: FiltersState = {
  value: []
};


export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    add: (state, action:PayloadAction<Tag>) => {
      state.value = !state.value.map(tag => tag.word).includes(action.payload.word) ? [...state.value, action.payload] : [...state.value]
    },
    remove: (state,action:PayloadAction<Tag>) => {
      state.value = state.value.filter(tag => tag.word !== action.payload.word)
    }
  },
});

export const { add, remove } = filtersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default filtersSlice.reducer;