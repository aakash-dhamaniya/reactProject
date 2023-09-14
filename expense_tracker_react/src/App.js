import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AuthPage from "./components/Auth/AuthPage";
import Profile from "./components/Profile/Profile";
import PrivateRoutes from "./utils/PrivateRoutes";
import ForgotPassword from "./components/Auth/ForgotPassword";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
