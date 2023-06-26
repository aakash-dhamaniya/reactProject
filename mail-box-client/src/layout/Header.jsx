import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>MailBox</Navbar.Brand>

        <Nav>
          <NavLink className={" mx-3 text-light"} to={"/signup"}>
            Sign Up
          </NavLink>
          <NavLink className={"mx-3 text-light"} to={"login"}>
            Log In
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
