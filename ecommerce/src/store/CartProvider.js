import React, { useReducer, useState } from "react";
import CartContext from "./cart-context";
import { baseAddress } from "../utils/api";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//  cartReducer
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //for adding items
    console.log("addAction", action.item.price);
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
      updatedItems = { ...state.items };
      updatedItems = state.items.concat(action.item);
    }
    console.log("action mai ae ", action.item.price);
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
    console.log(exisitingCartItemIndex);
    const exisistingItem = state.items[exisitingCartItemIndex];
    amount = exisistingItem.price * exisistingItem.quantity; //it will grape total amount of particular item
    updatedTotalAmount = state.totalAmount - amount;
    updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "EMPTY") {
    return { items: [], totalAmount: 0 };
  }
  if (action.type === "GETDATA") {
    const totalAmount = action.data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return {
      items: action.data,
      totalAmount: totalAmount,
    };
  }
  return defaultCartState;
};

///cartProvider
const CartProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEndPoint = localStorage.getItem("endpoint");
  const [token, setToken] = useState(initialToken);
  const [endPoint, setEndpoint] = useState(initialEndPoint);
  const [cartState, dispachCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const userIsIsLoggedIn = !!token;
  const crudcrud = `${baseAddress}${endPoint}`;

  const addItemToCartHandler = (item) => {
    dispachCartAction({ type: "ADD", item: item });
  };
  const removeItemFormCartHandler = (id) => {
    dispachCartAction({ type: "REM", id });
    console.log(id);
  };
  const emptyHandler = async () => {
    const keys = cartState.items.map((id) => {
      return id._id;
    });
    console.log("emptyHandler");
    console.log("in if");
    keys.forEach(async (element) => {
      console.log(element);
      const resp = await fetch(`${crudcrud}/${element}`, {
        method: "DELETE",
      });
    });

    dispachCartAction("EMPTY");
  };
  const loginHandler = (token, end) => {
    console.log(token);
    setToken(token);
    setEndpoint(end);
    localStorage.setItem("token", token);
    localStorage.setItem("endpoint", end);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("endpoint");
    setToken(null);
    clearCartHandler();
  };

  function clearCartHandler() {
    dispachCartAction("EMPTY");
  }
  function getDataHandler(data) {
    console.log(data);
    dispachCartAction({ type: "GETDATA", data: data });
  }
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
    clearCart: clearCartHandler,
    getCartData: getDataHandler,
  };
  console.log("in reducer", cartContext.items);
  // console.log(cartContext.items);
  // const data = getCartItems();
  // console.log(data.map((item) => item));

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
