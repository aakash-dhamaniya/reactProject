import React, { useRef } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authSignIn } from "../utils/autKey/api";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/auth";
import { Watch } from "react-loader-spinner";
export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const pasRef = useRef();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.authentication.loading);
  const signInHandler = async (e) => {
    e.preventDefault();
    dispatch(authAction.loader());
    if (pasRef.current.value.length < 6) {
      toast.error("password must have at least 6 character");
      return;
    }
    const user = {
      email: emailRef.current.value,
      password: pasRef.current.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(authSignIn, user);

      dispatch(
        authAction.login({
          token: response.data.idToken,
          email: response.data.email,
        })
      );
      dispatch(authAction.loader());
      navigate("/user");
      console.log(response);
    } catch (error) {
      dispatch(authAction.loader());
      const message = error.response.data.error.message;
      console.log(error.response.data.error.message);
      toast.error(message);
    }
  };
  return (
    <>
      <ToastContainer />
      <Card className=" p-2 mx-auto text-center col-md-6 col-lg-4 mt-5">
        <Card.Header>{"Sign In"}</Card.Header>
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

            <Button variant="success" onClick={signInHandler} type={"submit"}>
              {loader ? (
                <Watch
                  height="25"
                  width="25"
                  radius="48"
                  color="white"
                  ariaLabel="watch-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Card.Body>
        <p className=" my-2 text-dark rounded-3">
          Don't have an account? Sign Up{" "}
          <span style={{ cursor: "pointer" }} className="text-danger">
            <Link to={"/SignUp"}>SignUp</Link>
          </span>
        </p>
      </Card>
    </>
  );
}
