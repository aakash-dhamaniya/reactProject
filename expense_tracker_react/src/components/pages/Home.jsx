import React, { useEffect, useState } from "react";
import Classes from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import AddExpense from "./AddExpense";
import axios from "axios";
import ShowForm from "./ShowForm";
function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  async function allData() {
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    const url = `https://expense-tracker-69a2b-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expenses.json`;
    const resp = await axios(url);
    const data = resp.data;
    const formData = [];

    for (let item in data) {
      formData.push({
        expenseId: item,
        expenseTitle: data[item].data.expenseTitle,
        expensePrice: data[item].data.expensePrice,
        expenseCategory: data[item].data.expenseCategory,
      });
      // console.log(formData);
      setData(formData);
    }
  }
  function showDataHandler(data) {
    setData(data);
  }
  function logoutHandler() {
    navigate("/");
    localStorage.clear();
  }
  useEffect(() => {
    allData();
    console.log("hello");
  }, []);

  return (
    <>
      {" "}
      <div className={Classes.header}>
        <p>Welcome to Expense Tracker</p>
        <button onClick={logoutHandler}>Logout</button>
        <div className={Classes.profileClickContainer}>
          <p>Your profile is incomplete.</p>
          <NavLink to="/profile">
            <p className={Classes.link}>Complete Now</p>
          </NavLink>
        </div>
      </div>
      <AddExpense onshowData={showDataHandler} />
      <ShowForm onshowData={showDataHandler} showData={data} />
    </>
  );
}

export default Home;
