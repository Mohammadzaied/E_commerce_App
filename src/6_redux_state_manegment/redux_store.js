import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productSlice from "./product";
import LZString from "lz-string";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import localforage from "localforage";

// const productSpecificMiddleware = (store) => (next) => (action) => {
//   if (action.type.startsWith("product/")) {
//     return localStorageMiddleware(store)(next)(action);
//   }
//   return next(action);
// };

const persistConfig = {
  key: "root",
  //version: 1,
  storage: localforage,
  //whitelist: ["product"], //  only persist these reducers

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

// const localStorageMiddleware = (store) => (next) => (action) => {
//   const result = next(action);

//   // Apply middleware logic only if the action type matches the product slice
//   if (action.type.startsWith("product/")) {
//     try {
//       const state = store.getState();
//       //localStorage.removeItem("productState");
//       const compressedState = LZString.compress(
//         JSON.stringify({
//           watches: state.product.watches,
//           mobiles: state.product.mobiles,
//           clothes: state.product.clothes,
//           searchResults: [],
//         })
//       );
//       localStorage.setItem("productState", compressedState);
//     } catch (error) {
//       console.error("Could not save state", error);
//     }
//   }

//   return result;
// };
