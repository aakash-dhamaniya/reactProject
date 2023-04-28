import React, { useReducer } from "react";
import MediContext from "./medicine-context";
//this function will return saved value from local storage
function getData() {
  const data = JSON.parse(localStorage.getItem("cart"));
  getTotalAmount();
  if (data) {
    return data;
  } else return [];
}
function getTotalAmount() {
  const data = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = 0;
  if (data) {
    data.map((item) => {
      totalAmount = totalAmount + item.price * item.quantity;
    });
    console.log("get total amount", totalAmount);
    return totalAmount;
  } else return totalAmount;
}
const defaultMedState = {
  items: getData(),
  totalAmount: getTotalAmount(),
};
const medReducer = (state, action) => {
  //for adding itmes
  if (action.type === "ADD") {
    const existingMedItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
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
      state.totalAmount + action.item.price * action.item.quantity;
    localStorage.setItem("cart", JSON.stringify(updatedItems));
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
    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultMedState;
};
const MediProvider = (props) => {
  const [medState, dispatchMedAction] = useReducer(medReducer, defaultMedState);
  const addItemHandler = (item) => {
    dispatchMedAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchMedAction({ type: "REM", id: id });
  };
  const initialCartHandler = () => {};
  const mediContext = {
    items: medState.items,
    totalAmount: medState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemFromCartHandler,
    initialCart: initialCartHandler,
  };

  console.log("in provider", mediContext.totalAmount);
  // console.log(mediContext.items);
  return (
    <MediContext.Provider value={mediContext}>
      {props.children}
    </MediContext.Provider>
  );
};

export default MediProvider;
