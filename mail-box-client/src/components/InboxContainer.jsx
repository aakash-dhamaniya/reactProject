import React from "react";
import { useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { baseAddress } from "../utils/autKey/api";
import { useSelector } from "react-redux";
import axios from "axios";
function InboxContainer(props) {
  const navigate = useNavigate();
  let email = useSelector((state) => state.authentication.email);
  email = email.replace(/[@.]/g, "");
  console.log("from inbox conatiner", email);
  const mailOpenHandler = async () => {
    try {
      const newData = {
        message: props.message,
        read: true,
        senderEmail: props.from,
        subject: props.subject,
      };
      const res = await axios.put(
        `${baseAddress}/mailsData/${email}/emails/${props.id}.json`,
        newData
      );
    } catch (error) {
      alert("something went wrong");
    }
    let path = `/inbox/${props.id}`;
    navigate(path);
  };
  console.log("inbox", props);
  return (
    <div className="sentBoxContiner" onClick={mailOpenHandler}>
      {!props.read && (
        <BsDot
          style={{
            color: "blue",
            fontSize: "25",
            position: "absolute",
          }}
        />
      )}
      <span className="to">{props.from}</span>
      <span className="subject">{props.subject}</span>
      <span className="message">{props.message}</span>
      <span className="">{props.time}</span>
    </div>
  );
}

export default InboxContainer;
