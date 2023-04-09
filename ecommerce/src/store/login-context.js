import React from "react";

const LoginContext = React.createContext({
  token: "",
  login: (item) => {},
  logout: (item) => {},
});
