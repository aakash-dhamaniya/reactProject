import React, { useReducer, useState } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//  cartReducer
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //for adding items
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item._id === action.item._id
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
  if (action.type === "CART") {
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
  const crudcrud = `https://crudcrud.com/api/bdcff6a88d584b5294a75be9630c6143${endPoint}`;

  const addItemToCartHandler = async (item) => {
    const resp = await fetch(crudcrud, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await resp.json();
    dispachCartAction({ type: "ADD", item: data });
  };
  const removeItemFormCartHandler = (id) => {
    console.log("in remove reducer", id);
    dispachCartAction({ type: "REM", id });
  };
  const emptyHandler = () => {
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
    setToken(null);
    localStorage.removeItem("token");
  };
  async function showItemCrudHandler() {
    const res = await fetch(crudcrud, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    data.map((item) => {
      initialCartfromCrud(item);
    });
  }
  function initialCartfromCrud(data) {
    dispachCartAction({ type: "CART", item: data });
  }
  console.log("in provider", cartState.items);
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
    showItem: showItemCrudHandler,
    initialCart: initialCartfromCrud,
  };
  console.log(cartState.items);
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
