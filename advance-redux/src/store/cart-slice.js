import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    change: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      state.change = true;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.change = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const getCartData = () => {
  console.log("call hua");
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("in fetch data");
      const response = await fetch(
        "https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      console.log("in try");
      const cartData = await fetchData();
      console.log(cartData);
      if ((cartData.length = !0)) {
        dispatch(
          cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity,
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.shoNotification({
          status: "error",
          title: "Error!",
          message: "Fetching  cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  console.log("in sendCart data", cart);
  return async (dispatch) => {
    dispatch(
      uiActions.shoNotification({
        status: "pending",
        title: "sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.shoNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.shoNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
export const cartActions = cartSlice.actions;

export default cartSlice;
