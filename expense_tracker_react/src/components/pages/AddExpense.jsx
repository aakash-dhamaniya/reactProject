import React, { useRef } from "react";
import classes from "./AddForm.module.css";
import axios from "axios";
import { expensesActions } from "../../store/expense";
import { useDispatch } from "react-redux";

function AddExpense(props) {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  console.log(email);
  async function submitHandler(e) {
    e.preventDefault();
    const url = `https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expenses.json`;
    const item = {
      expenseTitle: titleRef.current.value,
      expenseCategory: categoryRef.current.value,
      expensePrice: priceRef.current.value,
    };
    const resp = await axios.post(url, item);
    if (resp.status === 200) {
      const severItem = { ...item, id: resp.data.name };
      dispatch(expensesActions.addExpense(severItem));
    }
  }

  return (
    <div className={classes.AddForm}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <label>Expense Title</label>
          <input ref={titleRef} type="text" placeholder="Enter Expense Title" />
        </div>
        <div>
          <label>Category</label>
          <input ref={categoryRef} type="text" placeholder="Enter Category" />
        </div>
        <div>
          <label>Price</label>
          <input ref={priceRef} type="number" placeholder="Enter Price" />
        </div>
        <div>
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
