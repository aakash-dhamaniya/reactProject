import React from "react";
import Classes from "./Home.module.css";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div className={Classes.header}>
      <p>Welcome to Expense Tracker</p>
      <div className={Classes.profileClickContainer}>
        <p>Your profile is incomplete.</p>
        <NavLink to="/profile">
          <p className={Classes.link}>Complete Now</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
