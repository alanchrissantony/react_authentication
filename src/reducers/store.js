import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RegisterReducer from './user/registerSlice'
import LoginReducer from './user/authSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig ={
    key: 'root',
    version: 1,
    storage
}

const rootReducers = combineReducers({
    UserRegister: RegisterReducer,
    UserLogin: LoginReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            ignoredPaths: ['register'],
          },
        }),
})

export const persistor = persistStore(store);

export default store;