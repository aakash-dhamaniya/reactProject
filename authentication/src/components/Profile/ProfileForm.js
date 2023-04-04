import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import LoginContext from "../../store/login-context";
import { useHistory } from "react-router-dom";
const ProfileForm = () => {
  const history = useHistory();
  const passwordref = useRef("");
  const logctx = useContext(LoginContext);
  console.log(logctx.jwt);
  async function onSubmitHandler(e) {
    e.preventDefault();
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD3SdlMOJM2gwGLZ_QIpH2ktOnRQdjKPUY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: logctx.jwt,
          password: passwordref.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.json();
    if (res.ok) {
      alert("password change successfully");
      history.replace("/");
    }
    if (!res.ok) {
      data.then((data) => {
        console.log(data.error);
      });
    }
  }
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
