import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: { value: APIQuery } = {
    value: {
        source: "",
        sort: "title_asc",
        tags: [],
        title: "",
        page: 1
    }
};



export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {

        setQuery: (state, action: PayloadAction<APIQuery>) => {
            state.value = { ...action.payload }
        },
        //query - tags
        addTag: (state, action: PayloadAction<Tag>) => {
            state.value.page = 1
            if (!state.value.tags.includes(action.payload)) {
                let copyOfTags = state.value.tags
                copyOfTags.push(action.payload)
                state.value.tags = copyOfTags
            }
        },
        removeTag: (state, action: PayloadAction<Tag>) => {
            state.value.page = 1
            state.value.tags = state.value.tags.filter((tag) => {
                let copyOfTag = tag as Tag
                return copyOfTag._id !== action.payload._id
            })
        },

    },
});

export const { addTag, removeTag, setQuery } = querySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default querySlice.reducer;