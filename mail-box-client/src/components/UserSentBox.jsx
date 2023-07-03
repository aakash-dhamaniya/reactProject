import React from "react";
import { useSelector } from "react-redux";

function UserSentBox() {
  const sentBox = useSelector((state) => state.mails.sent);
  return (
    <div>
      {sentBox.map((item) => {
        return (
          <div key={item.id}>
            <div>
              to: <span>{item.to}</span>
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

export default UserSentBox;
