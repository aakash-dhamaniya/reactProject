import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
export default function Header() {
  const auth = useSelector((state) => state.authentication.token);
  const email = useSelector((state) => state.authentication.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("in header", auth);
  const logoutHandler = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>MailBox</Navbar.Brand>

        <Nav>
          {!auth && (
            <NavLink
              style={{ textDecoration: "none" }}
              className={" mx-3 text-light "}
              to={"/signup"}
            >
              Sign Up
            </NavLink>
          )}
          {!auth && (
            <NavLink
              className={"mx-3 text-light "}
              style={{ textDecoration: "none" }}
              to={"login"}
            >
              Log In
            </NavLink>
          )}
          <div className="d-flex align-items-center justify-content-between  ">
            {auth && <CgProfile className="text-light" />}
            {auth && (
              <div style={{ color: "white", margin: "0.3rem" }}>{email}</div>
            )}
          </div>
        </Nav>
        {auth && <Button onClick={logoutHandler}>Logout</Button>}
      </Container>
    </Navbar>
  );
}
