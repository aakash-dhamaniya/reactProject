import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: { caratIsVisible: false },
  reducers: {
    toggle(state) {
      state.caratIsVisible = !state.caratIsVisible;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice;
