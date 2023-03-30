import React from "react";

function Products(props) {
  return (
    <li>
      {props.sellingPrice} {props.phoneName}
    </li>
  );
}

export default Products;
