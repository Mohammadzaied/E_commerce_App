import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productSlice from "./product";
//import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import localforage from "localforage";

const persistConfig = {
  key: "root",
  //version: 1,
  storage: localforage,
  whitelist: [], //  only persist these reducers
  //storage
};

const reducer = combineReducers({
  product: productSlice,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productSpecificMiddleware),
});

export default store;
