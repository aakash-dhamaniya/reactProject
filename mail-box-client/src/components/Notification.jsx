import { useState } from "react";
import Toast from "react-bootstrap/Toast";

function Notification(props) {
  const [show, setShow] = useState(true);
  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>{props.text}</Toast.Body>
    </Toast>
  );
}

export default Notification;
