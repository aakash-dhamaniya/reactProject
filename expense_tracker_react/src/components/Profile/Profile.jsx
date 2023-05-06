import React, { useRef } from "react";
import Classes from "./Profile.module.css";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";
function Profile() {
  const nameRef = useRef();
  const profileRef = useRef();

  async function onUpdate() {
    const name = nameRef.current.value;
    const profile = profileRef.current.value;
    const token = localStorage.getItem("token");
    if (name && profile) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: profile,
            photoUrl: profile,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    }
  }
  return (
    <div className={Classes.profile}>
      <div className={Classes.heading}>
        <h1>Contact Details</h1>
        <div>
          <button className={Classes.cancelButton}>Cancel</button>
        </div>
      </div>

      <div className={Classes.profileContainer}>
        <div className={Classes.profileInfo}>
          {" "}
          <AiFillGithub />
          <p>FullName:</p>
          <input ref={nameRef} type="text" />
        </div>
        <div className={Classes.profileInfo}>
          {" "}
          <AiOutlineGlobal />
          <p>Profile Photo URL:</p>
          <input ref={profileRef} type="text" />
        </div>
      </div>
      <div className={Classes.updateButton}>
        <button onClick={onUpdate}>update</button>
      </div>
    </div>
  );
}

export default Profile;
