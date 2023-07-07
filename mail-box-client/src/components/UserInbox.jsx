import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import InboxContainer from "./InboxContainer";

function UserInbox() {
  const inbox = useSelector((state) => state.mails.inbox);

  const inboxItems = inbox.map((item) => {
    return (
      <InboxContainer
        key={item.id}
        id={item.id}
        from={item.senderEmail}
        subject={item.subject}
        message={item.message}
        read={item.read}
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
      <h2 style={{ alignItems: "center" }}>Inbox</h2>
      {inboxItems}
    </div>
  );
}

export default UserInbox;
