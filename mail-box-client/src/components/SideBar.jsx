import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./sideBar.css";
import { mailsAction } from "../store/mails";
import { useDispatch } from "react-redux";
export default function SideBar() {
  const dispatch = useDispatch();
  const composetoggle = () => {
    dispatch(mailsAction.usercomposeState());
  };
  const inboxtoggle = () => {
    dispatch(mailsAction.userinboxState());
  };
  const sentmailtoggle = () => {
    dispatch(mailsAction.usersentState());
  };
  return (
    <div className="sidebar">
      <Row style={{ border: "1px solid black" }}>
        <Col style={{ border: "1px solid green" }}>
          <Button onClick={composetoggle}>compose</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={inboxtoggle}>inbox</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={sentmailtoggle}>sent mail</Button>
        </Col>
      </Row>
    </div>
  );
}
