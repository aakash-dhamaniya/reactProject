import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  empty: () => {},
  clearCart: () => {},
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  showItem: () => {},
  initialCart: () => {},
});
export default CartContext;
