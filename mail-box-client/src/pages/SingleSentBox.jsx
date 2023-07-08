import HTMLReactParser from "html-react-parser";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { baseAddress } from "../utils/autKey/api";
import { getSentMail } from "../store/mails";
function SingleSentBox() {
  const sentBox = useSelector((state) => state.mails.sent);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authentication.email).replace(
    /[.@]/g,
    ""
  );
  console.log(params);
  const data = sentBox.find((item) => item.id === params.sentId);
  const id = data.id;
  console.log(data);
  const goBackToInbox = () => {
    navigate("/user");
  };
  const deleteMail = async () => {
    try {
      console.log("delete", email);
      const res = await axios.delete(
        `${baseAddress}/SentmailsData/${email}/emails/${id}.json`
      );
      console.log(res);
      toast.success("mail deleted ");
      dispatch(getSentMail());
      navigate("/user");
    } catch (error) {
      toast.error("unable to delete");
    }
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
            <Button onClick={goBackToInbox}>
              <RiArrowGoBackFill />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "end", padding: "0.3rem" }}>
            <Button variant="danger" onClick={deleteMail}>
              <AiOutlineDelete />
            </Button>
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
              {HTMLReactParser(data.message)}
            </Col>
          )}
          {data && <Col style={{ textAlign: "end" }}>{data.time}</Col>}
        </Row>
      </Container>
    </>
  );
}

export default SingleSentBox;
