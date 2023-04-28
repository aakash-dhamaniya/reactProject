import React, { useContext } from "react";
import Modal from "../Ui/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import MediContext from "../../store/medicine-context";
function Cart(props) {
  const cartcnt = useContext(MediContext);
  console.log(cartcnt.totalAmount);
  const totalAmount = `₹${cartcnt.totalAmount.toFixed(2)}`;
  const hasItems = cartcnt.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartcnt.addItem({ ...item, quantity: 1 });
    console.log(item.id);
  };
  const cartItemRmoveHandler = (id) => {
    console.log(id);
    cartcnt.removeItem(id);
  };
  const carItems = (
    <ul className={classes["cart-item"]}>
      {cartcnt.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onRemove={cartItemRmoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          ></CartItem>
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {carItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button-close"]}>
          Close
        </button>
        {hasItems && <button className={classes["button-order"]}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
