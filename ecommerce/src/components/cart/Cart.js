import React, { useContext } from "react";
import "../cart/Cart.css";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
function Cart() {
  const ctx = useContext(CartContext);
  const TotalAmount = ctx.totalAmount;
  const producst = ctx.items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      image={item.imageUrl}
      quantity={item.quantity}
    />
  ));
  function purchaseHandler(e) {
    e.preventDefault();
    console.log(e);
    ctx.items.length === 0
      ? alert("cart is empty")
      : alert("Order placed succesfulyy");
    ctx.empty();
  }
  return (
    <Container className="cart">
      <form onSubmit={purchaseHandler}>
        <Row>
          <Col className="text-center cart-text">Cart</Col>
        </Row>
        <Row>
          <Col className="text-center">
            {/* There is no item in this cart click <Link to={"store"}>here</Link> to
          shope */}
            <Table responsive="sm">
              <thead>
                <tr className="th">
                  <th className="item">ITEM</th>
                  <th className="price">PRICE</th>
                  <th className="quantity">QUANTITY</th>
                </tr>
              </thead>
              <tbody>{producst}</tbody>
            </Table>
            <div>
              {" "}
              <span>Total</span> <span>${TotalAmount}</span>{" "}
            </div>
            <div>
              <Button type="onSubmit">PURCHESE</Button>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default Cart;
