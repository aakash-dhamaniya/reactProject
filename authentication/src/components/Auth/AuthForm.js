import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoder, setIsLoader] = useState(false);
  const emailRef = useRef("");
  const passRef = useRef("");
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (isLogin) {
    } else {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3SdlMOJM2gwGLZ_QIpH2ktOnRQdjKPUY`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: pass,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = res.json();
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
          {!isLoder ? (
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
