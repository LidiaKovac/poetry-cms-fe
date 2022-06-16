import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

export interface PoemsState {
  all: Array<Poem>,
  filtered: Array<Poem>,
  error: string,
  tags: Array<Tag>,
  query: string
}

const initialState: PoemsState = {
  all: [],
  filtered: [],
  error: "",
  tags: [],
  query: ""
};



export const poemsSlice = createSlice({
  name: 'poems',
  initialState,
  reducers: {
    //error
    throwError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    //poetry
    set: (state, action: PayloadAction<Array<Poem>>) => {
      state.all = action.payload
    },
    //query
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    //query - tags
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags = !state.tags.map(tag => tag.word).includes(action.payload.word) ? [...state.tags, action.payload] : [...state.tags]
    },
    removeTag: (state, action: PayloadAction<Tag>) => {
      state.tags = state.tags.filter(tag => tag.word !== action.payload.word)
    },
    setTags: (state, action: PayloadAction<Array<Poem>>) => {
      if (state.filtered.length > 0) {
        let newPoems: Array<Poem> = []

        let currentIds = state.filtered.map(poem => poem._id)

        action.payload.forEach(poem => {
          let currentId = poem._id
          if (currentIds.includes(currentId)) {
            newPoems.push(poem)
          }
        })
        state.filtered = newPoems
      } else {
        state.filtered = action.payload
      }
    },
    ///query - setters
    setFiltered: (state, action: PayloadAction<{type:string, query: string}>) => {
      if (state.filtered.length > 0 && action.payload.query.length > 0) {
        state.filtered = state.filtered.filter(poem => {
          let current =  poem[action.payload.type as keyof Poem] as string
         return current.toLowerCase().includes(action.payload.query.toLowerCase())})
      } else {
        state.filtered = state.all.filter(poem => {
          let current =  poem[action.payload.type as keyof Poem] as string
         return current.toLowerCase().includes(action.payload.query.toLowerCase())})
      }
    }
    
  },
});

export const { set, setFiltered, setTags, addTag, removeTag, throwError, changeQuery } = poemsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default poemsSlice.reducer;