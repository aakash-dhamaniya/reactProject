import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
import expense from "./expense";
const store = configureStore({
  reducer: {
    expenses: expense,
    authentication: authentication,
  },
});
export default store;
