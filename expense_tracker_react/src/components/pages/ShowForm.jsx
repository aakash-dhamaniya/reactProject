import React, { useRef, useState } from "react";
import classes from "./ShowForm.module.css";
import axios from "axios";
import EditExpense from "./EditExpense";
function ShowForm(props) {
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState("");
  const { showData } = props;
  console.log(showData);
  const url =
    "https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app";
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  // for deleting item from expense
  async function deleteHandler(id) {
    const resp = await axios.delete(`${url}/${email}/expenses/${id}.json`);

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
    }
  }
  //for edit expense
  async function editHandler(et, id, ca, pr) {
    // const resp = await axios.put(`${url}/${email}/expenses/${id}.json`);
    const data = { id: id, expenseTitle: et, category: ca, price: pr };
    setEditData(data);
    setEdit(true);
    console.log(data);
  }
  //to cancel the form
  function cancel() {
    setEdit(false);
  }
  const data = showData.map((item) => {
    return (
      <tr key={item.expenseId} className={classes.trData}>
        <td>{item.expenseTitle}</td>
        <td>{item.expenseCategory}</td>
        <td>{item.expensePrice}</td>
        <td>
          <button
            onClick={() => {
              deleteHandler(
                item.expenseId,
                item.expenseTitle,
                item.expenseCategory,
                item.expensePrice
              );
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
                  item.expenseId,
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
