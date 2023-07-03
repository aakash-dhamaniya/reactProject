import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Compose from "../components/Compose";
import UserInbox from "../components/UserInbox";
import UserSentBox from "../components/UserSentBox";
import { useSelector } from "react-redux";
import "./user.css";
function User() {
  const { compose, userinbox, sentmail } = useSelector((state) => state.mails);

  return (
    <div className="userHome">
      <SideBar />
      {compose && <Compose />}
      {userinbox && <UserInbox />}
      {sentmail && <UserSentBox />}
    </div>
  );
}

export default User;
