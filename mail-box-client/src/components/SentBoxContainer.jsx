import React from "react";
import "./sentBoxContainer.css";
import { useNavigate } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
function SentBoxContainer(props) {
  const navigate = useNavigate();

  console.log(props);
  function view() {
    navigate(`/sentbox/${props.id}`);
  }
  return (
    <div className="sentBoxContiner" onClick={view}>
      <span className="to">{props.to}</span>
      <span className="subject">{props.subject}</span>
      <span className="message">{HTMLReactParser(props.message)}</span>
      <span className="">{props.time}</span>
    </div>
  );
}

export default SentBoxContainer;
