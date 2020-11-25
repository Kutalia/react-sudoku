import { createStore } from 'redux';
import RootReducer from './reducers';

export const store = createStore(RootReducer);

export type RootState = ReturnType<typeof RootReducer>;
