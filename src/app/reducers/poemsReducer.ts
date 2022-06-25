import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface PoemsState {
  all: Array<Poem>,
  filtered: Array<Poem>,
  error: string,
  count: number,
  sources: Array<string>
  pages: Array<number>
}

const initialState: PoemsState = {
  all: [],
  filtered: [],
  error: "",
  count: 0,
  sources: [],
  pages: []
};



export const poemsSlice = createSlice({
  name: 'poems',
  initialState,
  reducers: {
    //poetry
    set: (state, action: PayloadAction<{ poems: Array<Poem>, count: number }>) => {
      const { poems, count } = action.payload
      state.all = poems
      state.count = count
      let allSrcs = poems.map(poem => poem.source)
      let unique = new Set(allSrcs)
      state.sources = [...unique]
      state.pages = []
      for (let i = 0; i < count / 15; i++) {
        state.pages = [...state.pages, i + 1]
      }
    }

  },
});

export const { set } = poemsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default poemsSlice.reducer;