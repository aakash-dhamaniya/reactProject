import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import LoginContext from "../../store/login-context";
import { useContext } from "react";
const MainNavigation = () => {
  const logctx = useContext(LoginContext);
  const isLoggedin = logctx.isLoggedin;
  function signOutHandler() {
    logctx.clearJwt();
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <button onClick={signOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
