import React from "react";
import Classes from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import AddExpense from "./AddExpense";
import ShowForm from "./ShowForm";
import { useSelector } from "react-redux";
function Home() {
  const navigate = useNavigate();
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  function logoutHandler() {
    navigate("/");
    localStorage.clear();
  }
  console.log(totalAmount);
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
      <AddExpense />
      {totalAmount > 10000 && <button>Active premium</button>}
      <ShowForm />
    </>
  );
}

export default Home;
