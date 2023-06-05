import React, { useRef } from "react";
import classes from "./editExpense.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expensesActions } from "../../store/expense";
function EditExpense(props) {
  const dispatch = useDispatch();
  console.log(props.editData);
  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const url =
    "https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app";
  const email = localStorage.getItem("email").replace(/[@.]/g, "");

  async function editHandler(e) {
    e.preventDefault();
    const data = {
      expenseTitle: titleRef.current.value,
      expenseCategory: categoryRef.current.value,
      expensePrice: priceRef.current.value,
    };
    const resp = await axios.put(
      `${url}/${email}/expenses/${props.editData.id}.json`,
      data
    );
    if (resp.status === 200) {
      dispatch(
        expensesActions.editExpense({
          id: props.editData.id,
          item: data,
        })
      );
      props.cancel();
    }
  }
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={editHandler}>
        <label>Expense Title:</label>
        <input
          defaultValue={props.editData.expenseTitle}
          ref={titleRef}
          type="text"
          placeholder="Enter Expense Title"
        />

        <label>Category:</label>
        <input
          defaultValue={props.editData.category}
          ref={categoryRef}
          type="text"
          placeholder="Enter Category"
        />

        <label>Price:</label>
        <input
          defaultValue={props.editData.price}
          ref={priceRef}
          type="number"
          placeholder="Enter Price"
        />

        <div>
          <button>Update</button>
        </div>
      </form>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  );
}

export default EditExpense;
