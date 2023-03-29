import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./productItem.css";
import { Button, Card } from "react-bootstrap";
import CartContext from "../../store/cart-context";
const ProductItem = (props) => {
  const ctx = useContext(CartContext);
  let navigate = useNavigate();
  const AddItemHandler = (e) => {
    ctx.addItem({ ...props, quantity: 1 });
  };

  function goToProductHandler() {
    let showItems = {
      image: props.image,
      title: props.title,
      price: props.price,
    };
    props.getData(showItems);
    let path = "/ProductPage";
    navigate(path);
    console.log("click");
  }
  return (
    <div className="Card hover" margin-top="2rem" border>
      <Card className="card" onClick={goToProductHandler}>
        <Card.Img variant="top" src={props.image} alt={props.title} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle>
            <span>${props.price}</span>
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <Button className="addTocart" onClick={AddItemHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductItem;