import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
import expense from "./expense";
import active from "./active";
const store = configureStore({
  reducer: {
    expenses: expense,
    authentication: authentication,
    active: active,
  },
});

export default store;
