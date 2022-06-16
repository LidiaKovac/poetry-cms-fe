import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import poemsReducer from './reducers/poemsReducer';

export const store = configureStore({
  reducer: {
    poems: poemsReducer,
    loading: loadingReducer,
    error: errorReducer
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
