import JoditEditor from "jodit-react";
import React, { useRef } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { baseAddress } from "../utils/autKey/api";
import { ToastContainer, toast } from "react-toastify";
import { mailsAction } from "../store/mails";
import { useDispatch } from "react-redux";
export default function Compose() {
  const toRef = useRef("");
  const subRef = useRef("");
  const mesRef = useRef("");
  let email = useSelector((state) => state.authentication.email);
  console.log(email);
  const dispatch = useDispatch();
  function jd() {
    console.log(mesRef.current.value);
  }
  const config = {
    placeholder: "Enter Email",
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };
  const emailSubmitHandler = async () => {
    const senderEmail = email;
    const subject = subRef.current.value;
    const message = mesRef.current.value;
    console.log("checking", message);
    //removing . and @ from email so that it can be sent to firebase as data name
    const toMail = toRef.current.value.replace(/[@.]/g, "");
    const composedMail = {
      senderEmail,
      subject,
      message,
      read: false,
      time: new Date().toLocaleString("default", { time: "long" }),
    };
    //this is for checking email should be in correct form
    const emailcheck = toRef.current.value;
    const regex = /@.*\.com$/;
    if (!regex.test(emailcheck)) {
      toast.error("email address is incorrect");
      return;
    }
    //this is for sending emails
    try {
      const res = await axios.post(
        `${baseAddress}/mailsData/${toMail}/emails.json`,
        composedMail
      );
      toast.success("email sent");
      console.log("compose", res);
    } catch (error) {
      const message = error.response.data.error.message;
      toast.error(message);
      return;
    }
    //this is for keeping sent email record for specific user
    const sentMail = {
      subject,
      message,
      to: toRef.current.value,
      time: new Date().toLocaleString("default", { time: "long" }),
    };
    try {
      const senderMail = email.replace(/[@.]/g, "");
      const res = await axios.post(
        `${baseAddress}/SentmailsData/${senderMail}/emails.json`,
        sentMail
      );
      const datawithkey = { ...sentMail, id: res.data.name };
      console.log(res);
      dispatch(mailsAction.mailSent(datawithkey));
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="col-lg-8 h-75 mx-auto my-3 bg-opacity-10 bg-black p-3 border-rounded">
        <Row>
          <Col>
            <InputGroup className="mb-1">
              <InputGroup.Text>To :</InputGroup.Text>
              <Form.Control required type="email" ref={toRef} aria-label="to" />
            </InputGroup>
            <InputGroup className="mb-1">
              <InputGroup.Text>Subject :</InputGroup.Text>
              <Form.Control ref={subRef} aria-label="to" />
            </InputGroup>
            <div>
              <JoditEditor
                config={config}
                onChange={jd}
                tabIndex={1}
                ref={mesRef}
              />
            </div>
            <div className="py-2 ">
              <Button onClick={emailSubmitHandler}>
                <AiOutlineSend />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
