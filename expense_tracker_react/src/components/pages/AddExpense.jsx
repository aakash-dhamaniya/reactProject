import React, { useRef } from "react";
import classes from "./AddForm.module.css";
import axios from "axios";
function AddExpense(props) {
  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  console.log(email);
  async function submitHandler(e) {
    e.preventDefault();
    const url = `https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expenses.json`;
    const resp = await axios.post(url, {
      data: {
        expenseTitle: titleRef.current.value,
        expenseCategory: categoryRef.current.value,
        expensePrice: priceRef.current.value,
      },
    });
    if (resp.status === 200) {
      const resp = await axios(url);
      console.log(resp.data);
      const formData = [];
      const data = resp.data;
      for (let item in data) {
        formData.push({
          expenseTitle: data[item].data.expenseTitle,
          expensePrice: data[item].data.expensePrice,
          expenseCategory: data[item].data.expenseCategory,
        });
      }
      props.onshowData(formData);
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
