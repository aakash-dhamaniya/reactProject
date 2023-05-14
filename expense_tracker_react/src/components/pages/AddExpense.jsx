import React from "react";
import classes from "./AddForm.module.css";
function AddExpense() {
  return (
    <div className={classes.AddForm}>
      <form className={classes.form}>
        <div>
          <label>Expense Title</label>
          <input type="text" placeholder="Enter Expense Title" />
        </div>
        <div>
          <label>Category</label>
          <input type="text" placeholder="Enter Category" />
        </div>
        <div>
          <label>Price</label>
          <input type="number" placeholder="Enter Price" />
        </div>
        <div>
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
