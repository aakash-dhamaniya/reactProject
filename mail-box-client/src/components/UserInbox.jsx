import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
function UserInbox() {
  const inbox = useSelector((state) => state.mails.inbox);
  console.log(inbox);
  return (
    <div>
      {inbox.map((item) => {
        return (
          <div key={item.id}>
            <div>
              from: <span>{item.senderEmail}</span>
            </div>
            <div>
              subject: <span>{item.subject}</span>
            </div>
            <div>
              message: <span>{item.message}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserInbox;
