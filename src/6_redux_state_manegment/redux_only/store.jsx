// store.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user state
};

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export default store;
