import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function SingleSentBox() {
  const sentBox = useSelector((state) => state.mails.sent);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const data = sentBox.find((item) => item.id === params.sentId);
  console.log(data);
  const goBackToInbox = () => {
    navigate("/user");
  };
  return (
    <>
      <Container
        m={1}
        style={{
          width: "90%",
          margin: "auto",
          padding: "1",
          borderRadius: "5px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Row>
          <Col style={{ textAlign: "end", padding: "0.3rem" }}>
            <Button onClick={goBackToInbox}>x</Button>
          </Col>
        </Row>
        <Row>
          {data && (
            <Col className="mb-5 " xs={12}>
              {data.to}
            </Col>
          )}
          {data && (
            <Col className="mb-3" xs={12}>
              {data.subject}
            </Col>
          )}
          {data && (
            <Col className="mb-3 d-flex justify-content" xs={12}>
              {data.message}
            </Col>
          )}
          {data && <Col style={{ textAlign: "end" }}>{data.time}</Col>}
        </Row>
      </Container>
    </>
  );
}

export default SingleSentBox;
