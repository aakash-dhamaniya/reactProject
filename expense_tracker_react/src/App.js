import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AuthPage from "./components/Auth/AuthPage";
import Profile from "./components/Profile/Profile";
import PrivateRoutes from "./utils/PrivateRoutes";
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
