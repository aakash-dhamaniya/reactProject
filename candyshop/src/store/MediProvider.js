import React, { useReducer } from "react";
import MediContext from "./medicine-context";
const defaultMedState = {
  items: [],
  totalAmount: 0,
};
const medReducer = (state, action) => {
  //for adding itmes
  if (action.type === "ADD") {
    const existingMedItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log("exit", existingMedItemIndex);
    const existingMedItem = state.items[existingMedItemIndex];
    let updatedItems;
    if (existingMedItemIndex !== -1) {
      //id items exist already
      console.log("yes there", existingMedItem);
      const updateItem = {
        ...existingMedItem,
        quantity: existingMedItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingMedItemIndex] = updateItem;
    } else {
      //adding new item for the first time
      updatedItems = state.items.concat(action.item);
    }
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  } //Add action end here
  if (action.type === "REM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultMedState;
};
const MediProvider = (porps) => {
  const [medState, dispatchMedAction] = useReducer(medReducer, defaultMedState);
  const addItemHandler = (item) => {
    console.log("add handler", item.quantity);
    dispatchMedAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchMedAction({ type: "REM", id: id });
  };
  const mediContext = {
    items: medState.items,
    totalAmount: medState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <MediContext.Provider value={mediContext}>
      {porps.children}
    </MediContext.Provider>
  );
};

export default MediProvider;
