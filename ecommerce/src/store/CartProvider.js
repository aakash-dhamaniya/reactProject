import React, { useReducer, useState } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //for adding items
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[exisitingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updateItem;
    } else {
      //adding new item for the first time
      // updatedItems = { ...state.items };
      updatedItems = state.items.concat(action.item);
    }
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "REM") {
    let updatedItems;
    let updatedTotalAmount;
    let amount;
    //for checking existing item
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisistingItem = state.items[exisitingCartItemIndex];
    amount = exisistingItem.price * exisistingItem.quantity; //it will grap total amount of pertiular item
    updatedTotalAmount = state.totalAmount - amount;
    updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action === "EMPTY") {
    return { items: [], totalAmount: 0 };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [cartState, dispachCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const userIsIsLoggedIn = !!token;

  const addItemToCartHandler = (item) => {
    dispachCartAction({ type: "ADD", item: item });
  };
  const removeItemFormCartHandler = (id) => {
    console.log("in remove reducer", id);
    dispachCartAction({ type: "REM", id });
  };
  const emptyHandler = () => {
    dispachCartAction("EMPTY");
  };
  const loginHandler = (token) => {
    console.log(token);
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFormCartHandler,
    empty: emptyHandler,
    token: token,
    isLoggedIn: userIsIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
