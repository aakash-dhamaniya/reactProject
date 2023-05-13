import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import AuthPage from "./components/Auth/AuthPage";
import Profile from "./components/Profile/Profile";
import PrivateRoutes from "./utils/PrivateRoutes";
import ForgotPassword from "./components/Auth/ForgotPassword";
const App = () => {
  const auth = localStorage.getItem("token");
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/"
            element={!auth ? <AuthPage /> : <Navigate to="/home" />}
          />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
