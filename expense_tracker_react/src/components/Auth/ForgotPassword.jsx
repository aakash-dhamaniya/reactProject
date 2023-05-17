import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthPage.module.css";
function ForgotPassword() {
  const enteredEmail = useRef();
  const navigate = useNavigate();
  async function submitHendler() {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      alert("check your mail box");
      navigate("/");
    }
  }
  return (
    <div className={classes.signup}>
      <div className={classes.form}>
        <h1>Forgot password</h1>
        <input ref={enteredEmail} type="email" placeholder="Enter email id" />
        <button className={classes.signupButton} onClick={submitHendler}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
