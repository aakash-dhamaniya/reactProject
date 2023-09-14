import React, { useEffect, useRef, useState } from "react";
import classes from "./ShowForm.module.css";
import axios from "axios";
import EditExpense from "./EditExpense";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expense";
function ShowForm(props) {
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.expenses.items);
  const isEmailChange = useSelector((state) => state.authentication.email);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState("");
  const url =
    "https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app";
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  //for showing data on screen
  const getData = async () => {
    const res = await axios.get(`${url}/${email}/expenses.json`);
    // console.log("in getData", res.data);
    const keys = Object.keys(res.data);
    const expenses = keys.map((key) => {
      return {
        id: key,
        expenseTitle: res.data[key].expenseTitle,
        expensePrice: res.data[key].expensePrice,
        expenseCategory: res.data[key].expenseCategory,
      };
    });
    // console.log("in showForm", expenses);
    const prices = expenses.map((item) => item.expensePrice);
    const initialTotal = prices.reduce((pre, cur) => {
      return +pre + +cur;
    }, 0);
    dispatch(expensesActions.initialExpenses(expenses));
    dispatch(expensesActions.updateTotal(initialTotal));
  };
  useEffect(() => {
    getData();
  }, [isEmailChange]);
  // for deleting item from expense
  async function deleteHandler(id) {
    console.log("id", id);
    const resp = await axios.delete(`${url}/${email}/expenses/${id}.json`);

    if (resp.status === 200) {
      dispatch(expensesActions.removeExpense(id));
    }
  }
  //for edit expense
  async function editHandler(et, id, ca, pr) {
    console.log(id);
    const data = { id: id, expenseTitle: et, category: ca, price: pr };
    setEditData(data);
    setEdit(true);
    console.log(data);
  }
  //to cancel the form
  function cancel() {
    setEdit(false);
  }
  const data = allItems.map((item) => {
    return (
      <tr key={item.id} className={classes.trData}>
        <td>{item.expenseTitle}</td>
        <td>{item.expenseCategory}</td>
        <td>{item.expensePrice}</td>
        <td>
          <button
            onClick={() => {
              deleteHandler(item.id);
            }}
          >
            Delete
          </button>
        </td>
        <td>
          {!edit && (
            <button
              onClick={() => {
                editHandler(
                  item.expenseTitle,
                  item.id,
                  item.expenseCategory,
                  item.expensePrice
                );
              }}
            >
              Edit
            </button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <div className={classes.container}>
      {edit && (
        <EditExpense
          cancel={cancel}
          editData={editData}
          onshowData={props.onshowData}
        />
      )}
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
}

export default ShowForm;
