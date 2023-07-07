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
import SingleEmailView from "./pages/SingleEmailView";
import SingleSentBox from "./pages/SingleSentBox";
import Check from "./components/check";
function App() {
  const mail = useSelector((state) => state.authentication.email);
  // console.log(mail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInbox());
    console.log("use effect run hua");
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
        <Route path="/user" element={<User />} />
        <Route path="/inbox/:mailId" element={<SingleEmailView />} />
        <Route path="/sentbox/:sentId" element={<SingleSentBox />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </div>
  );
}

export default App;
