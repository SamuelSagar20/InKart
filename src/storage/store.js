import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {inKartReducer} from './reducer';

//redux persist config
const persistConfig = {
  key: 'InKart',
  storage: AsyncStorage,
};

//middleware: Redux persist persisted reducer
const persistedReducer = persistReducer(persistConfig, inKartReducer);

//redux: store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

//middleware: Redux persist persister
let persister = persistStore(store);

//export
export {store,persister};

