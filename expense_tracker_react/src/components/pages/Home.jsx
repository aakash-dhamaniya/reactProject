import React from "react";
import Classes from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthPage from "../Auth/AuthPage";
import AddExpense from "./AddExpense";
function Home() {
  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.clear();
    navigate("/");
  }
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
    </>
  );
}

export default Home;
