import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import poemsReducer from './reducers/poemsReducer';
import queryReducer from './reducers/queryReducer';

export const store = configureStore({
  reducer: {
    poems: poemsReducer,
    loading: loadingReducer,
    error: errorReducer,
    query: queryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
