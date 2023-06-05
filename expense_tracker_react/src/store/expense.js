import { createSlice } from "@reduxjs/toolkit";
const defaultExpense = { items: [], totalAmount: 0 };
const expensesSlice = createSlice({
  name: "expenses",
  initialState: defaultExpense,
  reducers: {
    addExpense(state, action) {
      // console.log("in addExpense", action.payload);
      state.items.push(action.payload);
      state.totalAmount += Number(action.payload.expensePrice);
      console.log("in Add", state.totalAmount);
    },
    removeExpense(state, action) {
      const id = action.payload;
      const reqIndex = state.items.findIndex((item) => item.id === id);
      state.totalAmount -= state.items[reqIndex].expensePrice;
      state.items.splice(reqIndex, 1);
      console.log(state.totalAmount);
    },
    editExpense(state, action) {
      const id = action.payload.id;
      const reqIndex = state.items.findIndex((item) => item.id === id);
      if (reqIndex !== -1) {
        state.totalAmount =
          state.totalAmount -
          Number(state.items[reqIndex].expensePrice) +
          Number(action.payload.item.expensePrice);

        state.items[reqIndex] = { ...action.payload.item, id: id };
      }
    },

    updateTotal(state, action) {
      state.totalAmount = Number(action.payload);
    },
    initialExpenses(state, action) {
      // console.log(action.payload);
      state.items = action.payload;
    },
  },
});
export default expensesSlice.reducer;
export const expensesActions = expensesSlice.actions;
