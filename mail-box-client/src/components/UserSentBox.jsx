import React from "react";
import { useSelector } from "react-redux";
import SentBoxContainer from "./SentBoxContainer";

function UserSentBox() {
  const sentBox = useSelector((state) => state.mails.sent);
  const sentEmails = sentBox.map((item) => {
    return (
      <SentBoxContainer
        key={item.id}
        id={item.id}
        to={item.to}
        subject={item.subject}
        message={item.message}
        time={item.time}
      />
    );
  });
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ alignItems: "center" }}>SentBox</h2>
      {sentEmails}
    </div>
  );
}

export default UserSentBox;
