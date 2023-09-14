import React, { useCallback, useEffect, useRef, useState } from "react";
import Classes from "./Profile.module.css";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function Profile() {
  const nameRef = useRef();
  const profileRef = useRef();
  const verifyEmail = useRef();
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigate();
  // this function will fetch userData and pre field data to the input fields
  const getProfileData = useCallback(async () => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    setIsVerified(data.users[0].emailVerified);
    nameRef.current.value = data.users[0].displayName;
    profileRef.current.value = data.users[0].photoUrl;
    verifyEmail.current.value = data.users[0].email;
  }, []);
  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  //this function  will update user data
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
            displayName: name,
            photoUrl: profile,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    }
  }
  //this function  will verify email
  async function verifyHandler() {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCvG0gmGxlJl_RipQ1qG7lAgzkXH_rLC-0",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  }
  //for cancel the updating
  function cancelHandler() {
    navigation("/home");
  }
  return (
    <div className={Classes.profile}>
      <div className={Classes.heading}>
        <h1>Contact Details</h1>
        <div>
          <button onClick={cancelHandler} className={Classes.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
      {!isVerified && (
        <div className="">
          <label htmlFor="">Email:</label>
          <input ref={verifyEmail} type="email" />
          <button onClick={verifyHandler}>verify</button>
        </div>
      )}
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
