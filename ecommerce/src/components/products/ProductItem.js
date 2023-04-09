import React, { useContext } from "react";
import "./productItem.css";
import { Button, Card } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { useHistory } from "react-router-dom";
const ProductItem = (props) => {
  const ctx = useContext(CartContext);
  const history = useHistory();
  const AddItemHandler = (e) => {
    ctx.addItem({ ...props, quantity: 1 });
  };
  function goToProductHandler() {
    let path = `/store/${props.id}`;
    history.push(path);
  }
  return (
    <div className="Card hover" margin-top="2rem" border>
      <Card className="card" onClick={goToProductHandler}>
        <Card.Img variant="top" src={props.imageUrl} alt={props.title} />
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
