import React from "react";
import "./sentBoxContainer.css";
function SentBoxContainer(props) {
  console.log(props);
  return (
    <div className="sentBoxContiner">
      <span className="to">{props.to}</span>
      <span className="subject">{props.subject}</span>
      <span className="message">{props.message}</span>
    </div>
  );
}

export default SentBoxContainer;
