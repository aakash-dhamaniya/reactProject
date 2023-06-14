import { createSlice } from "@reduxjs/toolkit";
const initialState = { isActive: false, darkMode: false, brightMode: true };
const activeSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    activePremium(state) {
      state.isActive = true;
    },
    isDarkModetrue(state) {
      // console.log("dark mode call hua");
      state.darkMode = !state.darkMode;
      // console.log("darkMode", state.darkMode);
    },
    isBrightModetrue(state) {
      // console.log("bright mode call hua");
      state.brightMode = !state.brightMode;
      // console.log("brightMode", state.brightMode);
    },
  },
});

export default activeSlice.reducer;
export const activeActions = activeSlice.actions;
