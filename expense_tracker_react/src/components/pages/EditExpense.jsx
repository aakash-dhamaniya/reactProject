import React, { useRef } from "react";
import classes from "./editExpense.module.css";
import axios from "axios";
function EditExpense(props) {
  const titleRef = useRef("hello");
  const categoryRef = useRef();
  const priceRef = useRef();
  const url =
    "https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app";
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  async function editHandler(e) {
    e.preventDefault();
    const resp = await axios.put(
      `${url}/${email}/expenses/${props.editData.id}.json`,
      {
        data: {
          expenseTitle: titleRef.current.value,
          expenseCategory: categoryRef.current.value,
          expensePrice: priceRef.current.value,
        },
      }
    );
    if (resp.status === 200) {
      const resp = await axios(`${url}/${email}/expenses.json`);
      const respData = [];
      const data = resp.data;
      for (let item in data) {
        respData.push({
          expenseId: item,
          expenseTitle: data[item].data.expenseTitle,
          expensePrice: data[item].data.expensePrice,
          expenseCategory: data[item].data.expenseCategory,
        });
      }
      props.onshowData(respData);
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
