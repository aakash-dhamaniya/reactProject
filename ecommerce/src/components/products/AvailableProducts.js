import React from "react";
import ProductItem from "./ProductItem";
import "./AvailableProducts.css";
export const productsArr = [
  {
    id: "m1",
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },

  {
    id: "m2",
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },

  {
    id: "m3",
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },

  {
    id: "m4",
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];
function AvailableProducts(props) {
  const producst = productsArr.map((item) => (
    <ProductItem
      getData={props.getData}
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      imageUrl={item.imageUrl}
    />
  ));
  return (
    <div className="store">
      <div className="productContainer">{producst}</div>
    </div>
  );
}

export default AvailableProducts;
