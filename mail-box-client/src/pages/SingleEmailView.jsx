import React from "react";
import { Button, Col, Container, Row, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { getInbox } from "../store/mails";
import { baseAddress } from "../utils/autKey/api";
import axios from "axios";
import { toast } from "react-toastify";
function SingleEmailView() {
  const inbox = useSelector((state) => state.mails.inbox);
  const email = useSelector((state) => state.authentication.email).replace(
    /[.@]/g,
    ""
  );
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.mailId;
  const data = inbox.find((element) => element.id === id);
  console.log(data);

  const goBackToInbox = () => {
    navigate("/user");
  };
  const deleteMail = async () => {
    try {
      console.log("delete", email);
      const res = await axios.delete(
        `${baseAddress}/mailsData/${email}/emails/${id}.json`
      );
      console.log(res);
      toast.success("mail deleted ");
      dispatch(getInbox());
      navigate("/user");
    } catch (error) {
      toast.error("unable to delete");
    }
  };
  return (
    <>
      <ToastContainer />
      <Container
        m={1}
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "2rem",
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
              {data.senderEmail}
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

export default SingleEmailView;
