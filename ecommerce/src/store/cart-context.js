import React from "react";
const CartContext = React.createContext({
  items: [],
  selectedProduct: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  empty: () => {},
});
export default CartContext;
