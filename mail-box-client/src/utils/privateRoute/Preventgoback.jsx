import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Preventgoback({ children }) {
  const auth = useSelector((state) => state.authentication.token);
  if (auth) {
    return <Navigate to={"/user"} />;
  }
  return children;
}
