import React from "react";
import classes from "./ShowForm.module.css";
function ShowForm(props) {
  const { showData } = props;
  console.log(showData);

  //  const data=  {showData.map((item) => {
  //      return (
  //        <div className={classes.ShowFormContainer}>
  //          <div>{item.expenseTitle}</div>
  //        <div>{item.expensePrice}</div>
  //          <div>{item.expenseCategory}</div>
  //       </div>
  //      );
  //    }
  const data = showData.map((item) => {
    return (
      <tr className={classes.trData}>
        <td>{item.expenseTitle}</td>
        <td>{item.expenseCategory}</td>
        <td>{item.expensePrice}</td>
      </tr>
    );
  });
  return (
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
  );
}

export default ShowForm;
