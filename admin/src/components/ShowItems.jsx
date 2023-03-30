import React from "react";
import Products from "./Products";

function ShowItems(props) {
  const items = props.items.map((item) => (
    <Products
      key={item.productId}
      sellingPrice={item.sellingPhone}
      phoneName={item.phoneName}
    />
  ));
  return <ul>{items}</ul>;
}

export default ShowItems;
