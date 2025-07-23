import { combineReducers, configureStore } from '@reduxjs/toolkit';
import hotelSlice from './slices/hotelSlice';
import searchSlice from './slices/searchSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { usersAPI } from '@/Features/users/userAPI';
import { loginAPI } from '@/Features/login/loginAPI';
import { bookingsAPI } from '@/Features/bookings/bookingsAPI';
import userSlice from '@/Features/login/userSlice'
import { roomsAPI } from '@/Features/rooms/roomsAPI';
// 1. Combine all your slices and API reducers
const rootReducer = combineReducers({
  hotels: hotelSlice,
  search: searchSlice,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [bookingsAPI.reducerPath] : bookingsAPI.reducer,
  [roomsAPI.reducerPath]: roomsAPI.reducer,

  user: userSlice
});

// 2. Set up persistence
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [ 'user'], // only persist these, not the API slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
  .concat(usersAPI.middleware)
  .concat(loginAPI.middleware)
  .concat(bookingsAPI.middleware)
  .concat(roomsAPI.middleware)
});


// 4. Create the persistor
export const persistedStore = persistStore(store);

// 5. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
