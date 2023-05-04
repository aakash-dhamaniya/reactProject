import React, { useRef } from "react";
import classes from "./Signup.module.css";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function submitForm(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password === confirmPassword) {
      const apiUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log("User Registered Successfully");
    } else {
      console.log("password not matched");
    }
  }
  return (
    <div className={classes.signup}>
      <form className={classes.form} onSubmit={submitForm}>
        <h1>SignUp</h1>
        <div className={classes.textFields}>
          <input type="text" ref={emailRef} placeholder="Email" required />

          <input
            type="text"
            ref={passwordRef}
            placeholder="password"
            required
          />

          <input
            type="text"
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            required
          />
          <div className={classes.signupContainer}>
            <button className={classes.signupButton}>Sign Up</button>
          </div>
        </div>
      </form>

      <button className={classes.loginButton}>Have an Account? Sign Up</button>
    </div>
  );
};

export default Signup;
