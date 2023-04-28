import React from "react";
import classes from "./cartItem.module.css";
function CartItem(props) {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.candyName}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.item.price}</span>
          <span className={classes.amount}>x {props.item.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
