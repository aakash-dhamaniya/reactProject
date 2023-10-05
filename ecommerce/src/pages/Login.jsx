import React, { useContext, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import CartContext from "../store/cart-context";
import { useHistory } from "react-router-dom";
import { key } from "../utils/api";
function Login() {
  const ctx = useContext(CartContext);
  const history = useHistory();
  const emailRef = useRef("");
  const passRef = useRef("");
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
  useEffect(() => {
    ctx.clearCart();
  }, [ctx.items]);
  const loginHander = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;
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

    const data = await res.json();
    if (res.ok) {
      console.log("login successfully");
      // data.then((data) => {
      //   ctx.login(data.idToken);
      //   localStorage.setItem("email", data.email);
      // });
      const email = data.email;
      const token = data.idToken;
      const endpoint = `${email.replace(/\.|@/g, "")}`;
      ctx.login(token, endpoint);
      console.log("in login");
      history.replace("/store");
    }

    if (!res.ok) {
      console.log(data);
      alert(data.error.message);
    }
  };
  function SignUpHandler() {
    history.replace("/signup");
  }
  return (
    <Container style={{ marginTop: "90px" }}>
      <Form onSubmit={loginHander}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailRef}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Form.Text onClick={SignUpHandler}>SignUp</Form.Text>
      </Form>
    </Container>
  );
}

export default Login;
