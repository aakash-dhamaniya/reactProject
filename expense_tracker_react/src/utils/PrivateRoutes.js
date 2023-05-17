import React from "react";
import { Navigate } from "react-router-dom";
function PrivateRoutes(props) {
  let auth = localStorage.getItem("token");
  if (!auth) {
    return <Navigate to="/" />;
  }
  return props.children;
}

export default PrivateRoutes;
