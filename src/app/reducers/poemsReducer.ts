import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

export interface PoemsState {
  all: Array<Poem>,
  filtered: Array<Poem>,
  error: string
}

const initialState: PoemsState = {
  all: [],
  filtered: [],
  error: ""
};



export const poemsSlice = createSlice({
  name: 'poems',
  initialState,
  reducers: {
    throwError: (state, action: PayloadAction<string>)=> {
      state.error = action.payload
    },
    set: (state, action: PayloadAction<Array<Poem>>) => {
      state.all = action.payload
    },
    setFiltered: (state, action: PayloadAction<string>) => {
      if(state.filtered.length > 0) {
        state.filtered = state.filtered.filter(poem => poem.title.toLowerCase().includes(action.payload ? action.payload.toLowerCase() : ""))
      } else {
        state.filtered = state.all.filter(poem => poem.title.toLowerCase().includes(action.payload ? action.payload.toLowerCase() : ""))
      }
    },
    setBySource: (state, action: PayloadAction<string>) => {
      if(state.filtered.length > 0) {
        state.filtered = state.filtered.filter(poem => poem.source.toLowerCase() === action.payload.toLowerCase())
      } else {
        state.filtered = state.all.filter(poem => poem.source.toLowerCase() === action.payload.toLowerCase())
      }
    },
    setTags: (state, action: PayloadAction<Array<Poem>>) => {
      if(state.filtered.length > 0) {
        let newPoems:Array<Poem> = []
        
        let currentIds = state.filtered.map(poem => poem._id)
        
        action.payload.forEach(poem => {
          let currentId = poem._id
          if(currentIds.includes(currentId)) {
            newPoems.push(poem)
          }
        })
        state.filtered = newPoems
      } else {
        state.filtered = action.payload
      }
    }
  },
});

export const { set, setFiltered, setBySource, setTags, throwError } = poemsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default poemsSlice.reducer;