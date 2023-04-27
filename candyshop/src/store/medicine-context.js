import React from "react";
const MediContext = React.createContext({
  items: [],
  totalAmmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});
export default MediContext;
