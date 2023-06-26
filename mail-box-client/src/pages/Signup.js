import React, { useRef, useState } from "react";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authKey } from "../utils/autKey/api";
import axios from "axios";
import Notification from "../components/Notification";
export default function Signup() {
  const [notification, setNotification] = useState(false);
  const emailRef = useRef();
  const pasRef = useRef();
  const confirmPassRef = useRef();
  const signUpHandler = async (e) => {
    e.preventDefault();

    const enteredMail = emailRef.current.value.trim();
    const enteredPassword = pasRef.current.value.trim();
    const enteredConfirmPass = confirmPassRef.current.value.trim();
    if (
      enteredMail.length === 0 ||
      enteredPassword.length === 0 ||
      enteredConfirmPass.length === 0
    ) {
      alert("Please Enter all the fields");
      return;
    }
    if (enteredPassword !== enteredConfirmPass) {
      alert("your confirmation password did not match");
      return;
    }
    const user = {
      email: enteredMail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    console.log(user);
    try {
      const response = await axios.post(authKey, user);
      console.log(response.data);
      console.log("User has successfully signed up");
      emailRef.current.value = "";
      pasRef.current.value = "";
      confirmPassRef.current.value = "";
      setNotification(true);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error.message);
      } else {
        alert("request failed");
      }
      return;
    }
  };
  return (
    <Card className=" p-2 mx-auto text-center col-md-6 col-lg-4 mt-5">
      {notification && <Notification text="Account created successfully" />}
      <Card.Header>{"Sign Up"}</Card.Header>
      <Card.Body>
        <Form>
          <InputGroup className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Email"
              required
              ref={emailRef}
              type="email"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Password"
              type="password"
              required
              ref={pasRef}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          {/* <Card.Title>Confirm Password</Card.Title> */}
          <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Confirm Password"
              required
              ref={confirmPassRef}
              type="password"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          <Button variant="success" onClick={signUpHandler} type={"submit"}>
            Create Account
          </Button>
        </Form>
      </Card.Body>
      <p className=" my-2 text-dark rounded-3">
        Have an Account?{" "}
        <span style={{ cursor: "pointer" }} className="text-danger">
          <Link to={"/login"}>Log in</Link>
        </span>
      </p>
    </Card>
  );
}
