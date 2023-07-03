import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInbox, getSentMail } from "./store/mails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import User from "./pages/User";

function App() {
  const mail = useSelector((state) => state.authentication.email);
  console.log(mail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInbox());
  }, [mail]);
  useEffect(() => {
    dispatch(getSentMail());
  }, [mail]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
