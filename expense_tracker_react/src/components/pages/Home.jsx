import React from "react";
import Classes from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthPage from "../Auth/AuthPage";
function Home() {
  const navigate = useNavigate();
  const userlocalId = localStorage.getItem("localId");
  function logoutHandler() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      {userlocalId && (
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
      )}
      {!userlocalId && <AuthPage />}
    </>
  );
}

export default Home;
