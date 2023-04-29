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
    console.log("addAction", action.item._id);
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
      (item) => item._id === action.id
    );
    console.log(exisitingCartItemIndex);
    const exisistingItem = state.items[exisitingCartItemIndex];
    amount = exisistingItem.price * exisistingItem.quantity; //it will grape total amount of particular item
    updatedTotalAmount = state.totalAmount - amount;
    updatedItems = state.items.filter((item) => item._id !== action.id);
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
  const crudcrud = `https://crudcrud.com/api/9239aba3606842b8befaa0194fb29461${endPoint}`;

  const addItemToCartHandler = async (item) => {
    const resp = await fetch(crudcrud, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    const exisistingIndex = data.findIndex((id) => id.id === item.id);
    const exisistingItem = data[exisistingIndex];
    console.log("existingData", exisistingItem);
    console.log("checking data", data);
    if (exisistingItem) {
      const api = crudcrud + "/" + exisistingItem._id;
      const id = exisistingItem._id;
      console.log(id);
      console.log("in if", api);
      const updatedValue = {
        id: item.id,
        imageUrl: item.imageUrl,
        quantity: +exisistingItem.quantity + +item.quantity,
        price: item.price,
        title: item.title,
      };
      console.log(updatedValue);
      const res = await fetch(
        `https://crudcrud.com/api/9239aba3606842b8befaa0194fb29461/cartaakashkumar1332gmailcom/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValue),
        }
      );
    } else {
      console.log("in else");
      const resp = await fetch(crudcrud, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await resp.json();
      dispachCartAction({ type: "ADD", item: data });
    }
  };
  const removeItemFormCartHandler = async (id) => {
    const res = await fetch(`${crudcrud}/${id}`, {
      method: "Delete",
    });
    dispachCartAction({ type: "REM", id });
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
  async function showItemCrudHandler(check) {
    console.log(check, "showItem");
    const res = await fetch(crudcrud, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    data.map((item) => {
      initialCartfromCrud(item);
    });
  }
  function initialCartfromCrud(data) {
    console.log("initialCart");
    dispachCartAction({ type: "CART", item: data });
  }
  function clearCartHandler() {
    dispachCartAction("EMPTY");
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
    showItem: showItemCrudHandler,
    initialCart: initialCartfromCrud,
    clearCart: clearCartHandler,
  };
  console.log(cartContext.items);
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
