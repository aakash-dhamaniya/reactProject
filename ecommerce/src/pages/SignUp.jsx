import React, { useContext, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import CartContext from "../store/cart-context";
import { useHistory } from "react-router-dom";
export default function SignUp() {
  const history = useHistory();
  const ctx = useContext(CartContext);
  const emailRef = useRef("");
  const passRef = useRef("");
  async function signUpHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3SdlMOJM2gwGLZ_QIpH2ktOnRQdjKPUY`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      console.log("signUp successful");
      const email = data.email;
      const token = data.idToken;
      const endpoint = `/cart${email.replace(/\.|@/g, "")}`;
      ctx.login(token, endpoint);
      console.log("in login");
      history.replace("/store");
    }
    if (!res.ok) {
      alert(data.error.message);
    }
  }
  return (
    <Container style={{ marginTop: "90px" }}>
      <Form onSubmit={signUpHandler}>
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
          SignUp
        </Button>
      </Form>
    </Container>
  );
}
