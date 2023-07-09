import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { baseAddress } from "../utils/autKey/api";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import { getInbox, mailsAction } from "../store/mails";
function InboxContainer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let email = useSelector((state) => state.authentication.email);
  const mails = useSelector((state) => state.mails.inbox);
  email = email.replace(/[@.]/g, "");
  console.log("from inbox conatiner", email);
  // useEffect(() => {
  //   const timer = setInterval(dispatch(getInbox()), 20000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // });
  useEffect(() => {
    console.log(mails.length);
    const fetchMails = async () => {
      try {
        const response = await axios.get(
          `${baseAddress}/mailsData/${email}/emails.json`
        );
        const objectLength = Object.keys(response.data).length;
        console.log(objectLength);
        if (mails.length === objectLength) {
          console.log("return hua");
          return;
        }
        if (response.data) {
          dispatch(mailsAction.setRealTimeData(response.data));
        }
      } catch (error) {
        console.error("Error fetching mails:", error);
      } finally {
        // After fetching mails, initiate the next long-polling request
        //to enable this uncomment this fetchmails()
        // fetchMails();
      }
    };

    fetchMails();
  }, []);
  const mailOpenHandler = async () => {
    if (!props.read) {
      try {
        const newData = {
          message: props.message,
          read: true,
          senderEmail: props.from,
          subject: props.subject,
          time: props.time,
        };
        const res = await axios.put(
          `${baseAddress}/mailsData/${email}/emails/${props.id}.json`,
          newData
        );
        dispatch(getInbox());
      } catch (error) {
        alert("something went wrong");
      }
    }

    let path = `/inbox/${props.id}`;
    navigate(path);
  };

  //removing p tag from text
  const msg = HTMLReactParser(props.message);
  console.log("msg", msg);
  return (
    <>
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
        <span className="message"> {msg}</span>
        <span className="">{props.time}</span>
      </div>
    </>
  );
}

export default InboxContainer;
