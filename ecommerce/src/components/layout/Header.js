import React, { useContext } from "react";
import "./Header.css";
import {
  Container,
  Nav,
  Navbar,
  Row,
  Col,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cart from "../cart/Cart";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "../../store/cart-context";

function Header() {
  const history = useHistory();
  const cartCtx = useContext(CartContext);
  const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  function logoutHandler() {
    cartCtx.logout();
    history.replace("/login");
  }
  return (
    <div>
      <Navbar
        style={{ zIndex: "1", height: "80px" }}
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <NavLink to={"/"}>Best4U </NavLink>
          </Navbar.Brand>
          <NavLink activeClassName="border-1" to={"/store"}>
            Store
          </NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          {cartCtx.isLoggedIn ? (
            <Navbar.Text style={{ cursor: "pointer" }} onClick={logoutHandler}>
              Logout
            </Navbar.Text>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}

          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success">
                <FaShoppingCart
                  color="white"
                  fontSize={"25px"}
                ></FaShoppingCart>
                <Badge color="white">{numberOfCartItem}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 370 }}>
                <Cart></Cart>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
