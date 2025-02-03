import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "./userSlice";
import guestReducer from "./guestSlice";

import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { thunk } from "redux-thunk";
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user", "guest"],
};
const rootReducer = combineReducers({
  user: userReducer,
  guest: guestReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
