import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

// configureStore is used to creat store
export const store = configureStore({
  reducer: {
    userData: userReducer,
  },
  //disable devTools for production
  // devTools:false
});

export default store;
