import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const authPersistConfig = {
  key: 'auth',
  storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,  // Persisted Reducer 사용
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor 생성
export const persistor = persistStore(store);

// RootState 및 AppDispatch 타입
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
