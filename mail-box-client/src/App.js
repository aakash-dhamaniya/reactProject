import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInbox, getSentMail } from "./store/mails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import User from "./pages/User";
import SingleEmailView from "./pages/SingleEmailView";
import SingleSentBox from "./pages/SingleSentBox";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/privateRoute/PrivateRoute";
import Preventgoback from "./utils/privateRoute/Preventgoback";
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
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <Preventgoback>
              <Signup />
            </Preventgoback>
          }
        />
        <Route
          path="/login"
          element={
            <Preventgoback>
              <Login />
            </Preventgoback>
          }
        />

        <Route path="/forget" element={<Forget />} />
        <Route
          path="/inbox/:mailId"
          element={
            <PrivateRoute>
              <SingleEmailView />
            </PrivateRoute>
          }
        />
        <Route
          path="/sentbox/:sentId"
          element={
            <PrivateRoute>
              <SingleSentBox />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
