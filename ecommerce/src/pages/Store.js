import React from "react";
import AvailableProducts from "../components/products/AvailableProducts";
const Store = (props) => {
  return <AvailableProducts getData={props.getData} />;
};

export default Store;
