import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './songSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;