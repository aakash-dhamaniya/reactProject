import React, { useRef, useState } from "react";
import classes from "./AuthPage.module.css";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isSignupScreen, setIsSignupScreen] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function saveToken(data) {
    const resp = await data.json();
    const token = resp.idToken;
    localStorage.setItem("token", token);
    navigate("/");
  }
  async function submitForm(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const confirmPassword = confirmPasswordRef.current.value;
    let apiUrl;
    if (isSignupScreen && password === confirmPasswordRef.current.value) {
      apiUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0";
    } else if (
      isSignupScreen &&
      password !== confirmPasswordRef.current.value
    ) {
      setError("password and Confirm Password not matching");
    } else {
      apiUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0";
    }
    console.log(apiUrl);
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
    if (response.ok) {
      saveToken(response);
    } else {
      const data = await response.json();
      setError(data.error.message);
    }
  }
  function toggleSignup() {
    setError("");
    setIsSignupScreen((pre) => !pre);
  }
  return (
    <div className={classes.signup}>
      <form className={classes.form} onSubmit={submitForm}>
        <h1>{isSignupScreen ? "SignUp" : "Login "}</h1>
        <div className={classes.textFields}>
          <input type="text" ref={emailRef} placeholder="Email" required />

          <input
            type="text"
            ref={passwordRef}
            placeholder="password"
            required
          />
          {isSignupScreen && (
            <input
              type="text"
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
              required
            />
          )}

          <div className={classes.signupContainer}>
            <button className={classes.signupButton}>
              {isSignupScreen ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </form>

      <button onClick={toggleSignup} className={classes.loginButton}>
        {isSignupScreen
          ? "Have an Account? Login"
          : "Dont have an Account? Sign up"}
      </button>
      <p>{error}</p>
    </div>
  );
};

export default AuthPage;
