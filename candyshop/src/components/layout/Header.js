import React from "react";
import clasess from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton.js";
const Header = (props) => {
  return (
    <>
      <header className={clasess.header}>
        <h1>CandyShop</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </>
  );
};

export default Header;
