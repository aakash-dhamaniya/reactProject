import React, { useState } from "react";
import LoginContext from "./login-context";
function LoginProvider(props) {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;
  const addJwtHandler = (item) => {
    console.log(item);
    setToken(item);
  };
  const clearJwtHandler = () => {
    setToken(null);
  };
  const loginContext = {
    jwt: token,
    isLoggedin: userIsLoggedIn,
    addJwt: addJwtHandler,
    clearJwt: clearJwtHandler,
  };
  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
