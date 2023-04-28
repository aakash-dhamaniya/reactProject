import React from "react";
const MediContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  initialCart: (item) => {},
});
export default MediContext;
