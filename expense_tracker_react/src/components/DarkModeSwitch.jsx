import { MdLightMode } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { activeActions } from "../store/active";

function DarkModeSwitch() {
  const dispatch = useDispatch();
  const bright = useSelector((state) => state.active.brightMode);
  const dark = useSelector((state) => state.active.darkMode);

  return (
    <>
      {bright && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(activeActions.isBrightModetrue());
            dispatch(activeActions.isDarkModetrue());
          }}
        >
          <MdLightMode />
        </div>
      )}
      {dark && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(activeActions.isDarkModetrue());
            dispatch(activeActions.isBrightModetrue());
          }}
        >
          <BsFillMoonFill />
        </div>
      )}
    </>
  );
}

export default DarkModeSwitch;
