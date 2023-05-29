import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialCounterState = { counter: 0, toggle: true };
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    increase: (state, action) => {
      state.counter += action.amount;
    },
    toggleCounter: (state) => {
      state.toggle = !state.toggle;
    },
  },
});
const initialAuthState = { auth: false };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.auth = true;
      console.log("login hua", state.isAuthenticated);
    },
    logout(state) {
      state.auth = false;
      console.log("logout hua", state.isAuthenticated);
    },
  },
});
const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterAction = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
