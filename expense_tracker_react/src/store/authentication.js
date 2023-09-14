import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    localId: localStorage.getItem("localId"),
  },
  reducers: {
    updateAuth(state, action) {
      console.log("state", state.token);
      state = action.payload;
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
