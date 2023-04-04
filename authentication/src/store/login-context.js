import React from "react";
const LoginContext = React.createContext({
  jwt: "",
  isLoggedin: false,
  addJwt: (item) => {},
  clearJwt: (item) => {},
});
export default LoginContext;
