import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import LoginContext from "../../store/login-context";
import { useHistory } from "react-router-dom";
const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const emailRef = useRef("");
  const passRef = useRef("");
  const logctx = useContext(LoginContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3SdlMOJM2gwGLZ_QIpH2ktOnRQdjKPUY`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3SdlMOJM2gwGLZ_QIpH2ktOnRQdjKPUY`;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: pass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      if (res.ok) {
        data.then((data) => {
          console.log(data.idToken);
          logctx.addJwt(data.idToken);
          history.replace("/");
        });
      }
      if (!res.ok) {
        setIsLoader(false);
        data.then((data) => {
          alert(data.error.message);
        });
        throw new Error("somthing is wrong");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passRef} />
        </div>
        <div className={classes.actions}>
          {!isLoader ? (
            <button>
              {isLogin ? "Login with existing account" : "Create new account"}
            </button>
          ) : (
            "Loading..."
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
