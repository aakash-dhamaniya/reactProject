import React from "react";
import Classes from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import AddExpense from "./AddExpense";
import ShowForm from "./ShowForm";
import { useDispatch, useSelector } from "react-redux";
import { activeActions } from "../../store/active";
import DarkModeSwitch from "../DarkModeSwitch";
import { CSVLink } from "react-csv";
function Home() {
  const navigate = useNavigate();
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const isActive = useSelector((state) => state.active.isActive);
  const expenseData = useSelector((state) => state.expenses.items);
  const isDarkTheme = useSelector((state) => state.active.darkMode);
  const dispatch = useDispatch();
  console.log("isDark", isDarkTheme);
  function logoutHandler() {
    navigate("/");
    localStorage.clear();
  }
  const headers = [
    {
      label: "Title",
      key: "expenseTitle",
    },
    {
      label: "Price",
      key: "expensePrice",
    },
    {
      label: "Category",
      key: "expenseCategory",
    },
  ];
  const csvLink = {
    headers: headers,
    data: expenseData,
    filename: "csvfile.csv",
  };
  //getting theme conditionally
  const themeClass = isDarkTheme ? `${Classes.Home}` : "";
  return (
    <div className={themeClass}>
      <div className={Classes.header}>
        <p>Welcome to Expense Tracker</p>
        <button onClick={logoutHandler}>Logout</button>
        {isActive && <DarkModeSwitch />}
        <div className={Classes.profileClickContainer}>
          <p>Your profile is incomplete.</p>

          <NavLink to="/profile">
            <p className={Classes.link}>Complete Now</p>
          </NavLink>
        </div>
      </div>
      <AddExpense />
      <div>
        {totalAmount > 10000 && !isActive && (
          <button
            onClick={() => {
              dispatch(activeActions.activePremium());
            }}
          >
            Active premium
          </button>
        )}
        {isActive && (
          <div>
            <button>
              <CSVLink {...csvLink}>Export to CSV</CSVLink>
            </button>
          </div>
        )}
      </div>
      <ShowForm />
    </div>
  );
}

export default Home;
