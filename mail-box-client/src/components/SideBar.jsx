import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./sideBar.css";
import { mailsAction } from "../store/mails";
import { useDispatch, useSelector } from "react-redux";
export default function SideBar() {
  const dispatch = useDispatch();

  const inbox = useSelector((state) => state.mails.inbox);
  const totalInbox = inbox.length;

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
      <Row>
        <Col>
          <Button className="sButton text-wrap" onClick={composetoggle}>
            compose
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="sButton" onClick={inboxtoggle}>
            inbox({totalInbox})
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="sButton" onClick={sentmailtoggle}>
            sent mail
          </Button>
        </Col>
      </Row>
    </div>
  );
}
