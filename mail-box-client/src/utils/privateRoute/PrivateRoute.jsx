import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.authentication.token);

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}
