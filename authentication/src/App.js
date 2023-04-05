import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext, useEffect } from "react";
import LoginContext from "./store/login-context";

function App() {
  const logctx = useContext(LoginContext);
  useEffect(() => {
    const idToken = localStorage.getItem("auth");
    logctx.addJwt(idToken);
  }, []);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          {!logctx.isLoggedin && <AuthPage />}
          {logctx.isLoggedin && <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {logctx.isLoggedin && <UserProfile />}
          {!logctx.isLoggedin && <Redirect to="/auth" />}
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
